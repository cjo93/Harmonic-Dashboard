// File upload and analysis utilities
import { db, generateId, StoredDocument } from './database'

export interface FileUploadResult {
  id: string
  name: string
  size: number
  type: string
  content: string
  language?: string
  analysis?: CodeAnalysis
}

export interface CodeAnalysis {
  language: string
  lineCount: number
  characterCount: number
  functions: FunctionInfo[]
  imports: string[]
  exports: string[]
  complexity: {
    cyclomatic: number
    cognitive: number
    maintainability: number
  }
  issues: CodeIssue[]
  suggestions: string[]
}

export interface FunctionInfo {
  name: string
  line: number
  parameters: string[]
  isAsync: boolean
  isExported: boolean
}

export interface CodeIssue {
  type: 'error' | 'warning' | 'info'
  message: string
  line: number
  severity: number
}

class FileProcessor {
  private readonly maxFileSize = 10 * 1024 * 1024 // 10MB
  private readonly supportedTypes = [
    'text/plain',
    'text/javascript',
    'text/typescript',
    'text/css',
    'text/html',
    'text/markdown',
    'application/json',
    'text/xml'
  ]

  async processFile(file: File): Promise<FileUploadResult> {
    // Validate file
    this.validateFile(file)
    
    // Read file content
    const content = await this.readFileContent(file)
    
    // Detect language
    const language = this.detectLanguage(file.name, content)
    
    // Analyze code if applicable
    const analysis = this.shouldAnalyzeCode(language) 
      ? await this.analyzeCode(content, language)
      : undefined
    
    const result: FileUploadResult = {
      id: generateId(),
      name: file.name,
      size: file.size,
      type: file.type,
      content,
      language,
      analysis
    }

    // Log file upload event
    await db.logEvent('file_upload', {
      fileName: file.name,
      fileSize: file.size,
      language,
      hasAnalysis: !!analysis
    })

    return result
  }

  async processMultipleFiles(files: FileList): Promise<FileUploadResult[]> {
    const results: FileUploadResult[] = []
    
    for (let i = 0; i < files.length; i++) {
      try {
        const result = await this.processFile(files[i])
        results.push(result)
      } catch (error) {
        console.error(`Failed to process file ${files[i].name}:`, error)
        // Continue with other files
      }
    }
    
    return results
  }

  private validateFile(file: File): void {
    if (file.size > this.maxFileSize) {
      throw new Error(`File size exceeds ${this.maxFileSize / 1024 / 1024}MB limit`)
    }
    
    if (!this.supportedTypes.includes(file.type) && !this.isTextFile(file.name)) {
      throw new Error(`Unsupported file type: ${file.type}`)
    }
  }

  private async readFileContent(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = () => reject(reader.error)
      reader.readAsText(file)
    })
  }

  private detectLanguage(fileName: string, content: string): string {
    const extension = fileName.split('.').pop()?.toLowerCase()
    
    const languageMap: Record<string, string> = {
      js: 'javascript',
      jsx: 'javascript',
      ts: 'typescript',
      tsx: 'typescript',
      py: 'python',
      rb: 'ruby',
      go: 'go',
      rs: 'rust',
      java: 'java',
      c: 'c',
      cpp: 'cpp',
      h: 'c',
      hpp: 'cpp',
      cs: 'csharp',
      php: 'php',
      swift: 'swift',
      kt: 'kotlin',
      scala: 'scala',
      html: 'html',
      css: 'css',
      scss: 'scss',
      sass: 'sass',
      json: 'json',
      xml: 'xml',
      yaml: 'yaml',
      yml: 'yaml',
      md: 'markdown',
      sql: 'sql',
      sh: 'bash',
      bash: 'bash',
      zsh: 'zsh',
      fish: 'fish'
    }

    if (extension && languageMap[extension]) {
      return languageMap[extension]
    }

    // Try to detect based on content
    if (content.includes('import React') || content.includes('from \'react\'')) {
      return 'javascript'
    }
    if (content.includes('interface ') && content.includes(': ')) {
      return 'typescript'
    }
    if (content.includes('def ') && content.includes(':')) {
      return 'python'
    }
    
    return 'text'
  }

  private isTextFile(fileName: string): boolean {
    const textExtensions = [
      'txt', 'md', 'markdown', 'json', 'xml', 'yaml', 'yml',
      'js', 'jsx', 'ts', 'tsx', 'py', 'rb', 'go', 'rs',
      'java', 'c', 'cpp', 'h', 'hpp', 'cs', 'php',
      'html', 'css', 'scss', 'sass', 'sql', 'sh', 'bash'
    ]
    
    const extension = fileName.split('.').pop()?.toLowerCase()
    return textExtensions.includes(extension || '')
  }

  private shouldAnalyzeCode(language: string): boolean {
    const analyzableLanguages = [
      'javascript', 'typescript', 'python', 'java', 'c', 'cpp', 'go'
    ]
    return analyzableLanguages.includes(language)
  }

  private async analyzeCode(content: string, language: string): Promise<CodeAnalysis> {
    const lines = content.split('\n')
    const lineCount = lines.length
    const characterCount = content.length

    // Basic analysis
    const functions = this.extractFunctions(content, language)
    const imports = this.extractImports(content, language)
    const exports = this.extractExports(content, language)
    
    // Complexity analysis
    const complexity = this.calculateComplexity(content, language)
    
    // Code issues detection
    const issues = this.detectIssues(content, language)
    
    // Generate suggestions
    const suggestions = this.generateSuggestions(content, language, issues)

    return {
      language,
      lineCount,
      characterCount,
      functions,
      imports,
      exports,
      complexity,
      issues,
      suggestions
    }
  }

  private extractFunctions(content: string, language: string): FunctionInfo[] {
    const functions: FunctionInfo[] = []
    const lines = content.split('\n')

    lines.forEach((line, index) => {
      let match: RegExpMatchArray | null = null

      switch (language) {
        case 'javascript':
        case 'typescript':
          // Function declarations and expressions
          match = line.match(/(?:function\s+|const\s+|let\s+|var\s+)?(\w+)\s*(?:=\s*)?\(([^)]*)\)\s*(?:=>\s*)?{/)
          if (match) {
            functions.push({
              name: match[1],
              line: index + 1,
              parameters: match[2] ? match[2].split(',').map(p => p.trim()) : [],
              isAsync: line.includes('async'),
              isExported: line.includes('export')
            })
          }
          break

        case 'python':
          match = line.match(/def\s+(\w+)\s*\(([^)]*)\):/)
          if (match) {
            functions.push({
              name: match[1],
              line: index + 1,
              parameters: match[2] ? match[2].split(',').map(p => p.trim()) : [],
              isAsync: line.includes('async'),
              isExported: true // Python doesn't have explicit exports
            })
          }
          break
      }
    })

    return functions
  }

  private extractImports(content: string, language: string): string[] {
    const imports: string[] = []
    const lines = content.split('\n')

    lines.forEach(line => {
      let match: RegExpMatchArray | null = null

      switch (language) {
        case 'javascript':
        case 'typescript':
          match = line.match(/import\s+.*?\s+from\s+['"]([^'"]+)['"]/)
          if (match) imports.push(match[1])
          break

        case 'python':
          match = line.match(/(?:import\s+|from\s+)([^\s]+)/)
          if (match) imports.push(match[1])
          break
      }
    })

    return [...new Set(imports)] // Remove duplicates
  }

  private extractExports(content: string, language: string): string[] {
    const exports: string[] = []
    const lines = content.split('\n')

    lines.forEach(line => {
      if (language === 'javascript' || language === 'typescript') {
        if (line.includes('export')) {
          const match = line.match(/export\s+(?:default\s+)?(?:function\s+|const\s+|class\s+)?(\w+)/)
          if (match) exports.push(match[1])
        }
      }
    })

    return [...new Set(exports)]
  }

  private calculateComplexity(content: string, language: string): CodeAnalysis['complexity'] {
    // Simplified complexity calculation
    const cyclomaticComplexity = this.calculateCyclomaticComplexity(content)
    const cognitiveComplexity = this.calculateCognitiveComplexity(content)
    const maintainability = this.calculateMaintainabilityIndex(content)

    return {
      cyclomatic: cyclomaticComplexity,
      cognitive: cognitiveComplexity,
      maintainability
    }
  }

  private calculateCyclomaticComplexity(content: string): number {
    // Count decision points
    const decisionPoints = [
      /\bif\b/g,
      /\belse\b/g,
      /\bwhile\b/g,
      /\bfor\b/g,
      /\bswitch\b/g,
      /\bcase\b/g,
      /\bcatch\b/g,
      /\b\?\b/g, // Ternary operator
      /\b&&\b/g,
      /\b\|\|\b/g
    ]

    let complexity = 1 // Base complexity

    decisionPoints.forEach(pattern => {
      const matches = content.match(pattern)
      if (matches) {
        complexity += matches.length
      }
    })

    return complexity
  }

  private calculateCognitiveComplexity(content: string): number {
    // Simplified cognitive complexity
    let complexity = 0
    let nesting = 0

    const lines = content.split('\n')
    lines.forEach(line => {
      if (line.includes('{')) nesting++
      if (line.includes('}')) nesting = Math.max(0, nesting - 1)
      
      if (line.includes('if') || line.includes('while') || line.includes('for')) {
        complexity += 1 + nesting
      }
    })

    return complexity
  }

  private calculateMaintainabilityIndex(content: string): number {
    const lineCount = content.split('\n').length
    const cyclomaticComplexity = this.calculateCyclomaticComplexity(content)
    
    // Simplified maintainability index (0-100 scale)
    const maintainability = Math.max(0, 
      100 - (cyclomaticComplexity * 2) - (lineCount / 10)
    )
    
    return Math.round(maintainability)
  }

  private detectIssues(content: string, language: string): CodeIssue[] {
    const issues: CodeIssue[] = []
    const lines = content.split('\n')

    lines.forEach((line, index) => {
      // Common issues across languages
      if (line.length > 120) {
        issues.push({
          type: 'warning',
          message: 'Line too long (>120 characters)',
          line: index + 1,
          severity: 2
        })
      }

      if (line.includes('console.log')) {
        issues.push({
          type: 'info',
          message: 'Debug statement found',
          line: index + 1,
          severity: 1
        })
      }

      if (line.includes('TODO') || line.includes('FIXME')) {
        issues.push({
          type: 'info',
          message: 'TODO or FIXME comment found',
          line: index + 1,
          severity: 1
        })
      }

      // Language-specific issues
      if (language === 'javascript' || language === 'typescript') {
        if (line.includes('== ') || line.includes('!= ')) {
          issues.push({
            type: 'warning',
            message: 'Use strict equality (=== or !==)',
            line: index + 1,
            severity: 3
          })
        }

        if (line.includes('var ')) {
          issues.push({
            type: 'warning',
            message: 'Use const or let instead of var',
            line: index + 1,
            severity: 2
          })
        }
      }
    })

    return issues
  }

  private generateSuggestions(content: string, language: string, issues: CodeIssue[]): string[] {
    const suggestions: string[] = []

    // Based on issues
    if (issues.some(issue => issue.message.includes('Line too long'))) {
      suggestions.push('Consider breaking long lines for better readability')
    }

    if (issues.some(issue => issue.message.includes('Debug statement'))) {
      suggestions.push('Remove debug statements before production')
    }

    // Based on analysis
    const functionCount = this.extractFunctions(content, language).length
    if (functionCount > 20) {
      suggestions.push('Consider splitting large files into smaller modules')
    }

    const lineCount = content.split('\n').length
    if (lineCount > 500) {
      suggestions.push('Large file detected - consider refactoring into smaller components')
    }

    return suggestions
  }

  async saveFileAsDocument(file: FileUploadResult, tags: string[] = []): Promise<string> {
    const document: StoredDocument = {
      id: generateId(),
      title: file.name,
      content: file.content,
      type: file.language === 'markdown' ? 'markdown' : 'code',
      tags: [...tags, file.language || 'text'],
      createdAt: Date.now(),
      updatedAt: Date.now(),
      version: 1,
      metadata: {
        language: file.language,
        difficulty: 'intermediate' // Could be determined by complexity
      }
    }

    await db.saveDocument(document)
    return document.id
  }
}

export const fileProcessor = new FileProcessor()

// Utility functions for file handling
export const createFileFromContent = (content: string, fileName: string, mimeType = 'text/plain'): File => {
  const blob = new Blob([content], { type: mimeType })
  return new File([blob], fileName, { type: mimeType })
}

export const downloadFile = (content: string, fileName: string, mimeType = 'text/plain'): void => {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  
  const a = document.createElement('a')
  a.href = url
  a.download = fileName
  document.body.appendChild(a)
  a.click()
  
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
