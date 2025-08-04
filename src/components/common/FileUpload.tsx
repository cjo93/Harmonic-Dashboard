'use client'

import { useState, useRef, useCallback } from 'react'
import { Upload, File, X, Loader2, Code, FileText, Image, AlertCircle, CheckCircle } from 'lucide-react'
import { fileProcessor, FileUploadResult } from '@/lib/fileProcessor'
import { useEnhancedStore } from '@/stores/useEnhancedStore'
import { formatFileSize } from '@/lib/database'

interface FileUploadProps {
  onFilesUploaded?: (files: FileUploadResult[]) => void
  maxFiles?: number
  className?: string
}

export default function FileUpload({ onFilesUploaded, maxFiles = 10, className = '' }: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const { addUploadedFile, setProcessingFiles, isProcessingFiles } = useEnhancedStore()

  const handleFiles = useCallback(async (files: FileList) => {
    if (files.length === 0) return
    
    setProcessingFiles(true)
    const results: FileUploadResult[] = []
    const newErrors: Record<string, string> = {}
    
    for (let i = 0; i < Math.min(files.length, maxFiles); i++) {
      const file = files[i]
      const fileId = `${file.name}-${Date.now()}`
      
      try {
        setUploadProgress(prev => ({ ...prev, [fileId]: 0 }))
        
        // Simulate progress for user feedback
        const progressInterval = setInterval(() => {
          setUploadProgress(prev => ({
            ...prev,
            [fileId]: Math.min((prev[fileId] || 0) + 10, 90)
          }))
        }, 100)
        
        const result = await fileProcessor.processFile(file)
        
        clearInterval(progressInterval)
        setUploadProgress(prev => ({ ...prev, [fileId]: 100 }))
        
        results.push(result)
        addUploadedFile(result)
        
        // Clear progress after a short delay
        setTimeout(() => {
          setUploadProgress(prev => {
            const newProgress = { ...prev }
            delete newProgress[fileId]
            return newProgress
          })
        }, 1000)
        
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error'
        newErrors[fileId] = errorMessage
        setErrors(prev => ({ ...prev, [fileId]: errorMessage }))
        
        setUploadProgress(prev => {
          const newProgress = { ...prev }
          delete newProgress[fileId]
          return newProgress
        })
      }
    }
    
    setProcessingFiles(false)
    onFilesUploaded?.(results)
  }, [maxFiles, addUploadedFile, setProcessingFiles, onFilesUploaded])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const files = e.dataTransfer.files
    handleFiles(files)
  }, [handleFiles])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      handleFiles(files)
    }
  }, [handleFiles])

  const getFileIcon = (fileName: string, language?: string) => {
    if (language === 'javascript' || language === 'typescript') {
      return <Code className="w-5 h-5 text-yellow-500" />
    }
    if (fileName.endsWith('.md') || fileName.endsWith('.txt')) {
      return <FileText className="w-5 h-5 text-blue-500" />
    }
    if (fileName.match(/\.(jpg|jpeg|png|gif|svg)$/i)) {
      return <Image className="w-5 h-5 text-green-500" />
    }
    return <File className="w-5 h-5 text-gray-500" />
  }

  const clearError = (fileId: string) => {
    setErrors(prev => {
      const newErrors = { ...prev }
      delete newErrors[fileId]
      return newErrors
    })
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Drop Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
        className={`
          relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200
          ${isDragOver 
            ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20' 
            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
          }
          ${isProcessingFiles ? 'pointer-events-none opacity-50' : ''}
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileSelect}
          className="hidden"
          accept=".js,.jsx,.ts,.tsx,.py,.rb,.go,.rs,.java,.c,.cpp,.h,.hpp,.cs,.php,.swift,.kt,.scala,.html,.css,.scss,.sass,.json,.xml,.yaml,.yml,.md,.txt,.sql,.sh,.bash"
        />
        
        <div className="flex flex-col items-center space-y-4">
          <div className={`p-3 rounded-full ${isDragOver ? 'bg-blue-100 dark:bg-blue-800' : 'bg-gray-100 dark:bg-gray-800'}`}>
            <Upload className={`w-8 h-8 ${isDragOver ? 'text-blue-500' : 'text-gray-500'}`} />
          </div>
          
          <div>
            <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
              {isDragOver ? 'Drop files here' : 'Upload files'}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Drag and drop files here, or click to select files
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
              Supports code files, documents, and text files (max {maxFiles} files, 10MB each)
            </p>
          </div>
        </div>
      </div>

      {/* Upload Progress */}
      {Object.keys(uploadProgress).length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
            Uploading files...
          </h4>
          {Object.entries(uploadProgress).map(([fileId, progress]) => {
            const fileName = fileId.split('-').slice(0, -1).join('-')
            return (
              <div key={fileId} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {fileName}
                  </div>
                  <div className="mt-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {progress}%
                </span>
              </div>
            )
          })}
        </div>
      )}

      {/* Errors */}
      {Object.keys(errors).length > 0 && (
        <div className="space-y-2">
          {Object.entries(errors).map(([fileId, error]) => {
            const fileName = fileId.split('-').slice(0, -1).join('-')
            return (
              <div key={fileId} className="flex items-start space-x-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-red-900 dark:text-red-100">
                    Error uploading {fileName}
                  </div>
                  <div className="text-sm text-red-700 dark:text-red-300 mt-1">
                    {error}
                  </div>
                </div>
                <button
                  onClick={() => clearError(fileId)}
                  className="text-red-500 hover:text-red-700 dark:hover:text-red-300"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

// File Preview Component
interface FilePreviewProps {
  file: FileUploadResult
  onRemove?: (id: string) => void
  onSaveAsDocument?: (file: FileUploadResult) => void
  className?: string
}

export function FilePreview({ file, onRemove, onSaveAsDocument, className = '' }: FilePreviewProps) {
  const [showAnalysis, setShowAnalysis] = useState(false)

  const getFileIcon = (fileName: string, language?: string) => {
    if (language === 'javascript' || language === 'typescript') {
      return <Code className="w-5 h-5 text-yellow-500" />
    }
    if (fileName.endsWith('.md') || fileName.endsWith('.txt')) {
      return <FileText className="w-5 h-5 text-blue-500" />
    }
    return <File className="w-5 h-5 text-gray-500" />
  }

  return (
    <div className={`border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-3 ${className}`}>
      {/* File Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          {getFileIcon(file.name, file.language)}
          <div>
            <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {file.name}
            </h4>
            <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
              <span>{formatFileSize(file.size)}</span>
              {file.language && (
                <>
                  <span>•</span>
                  <span className="capitalize">{file.language}</span>
                </>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {file.analysis && (
            <button
              onClick={() => setShowAnalysis(!showAnalysis)}
              className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
            >
              {showAnalysis ? 'Hide' : 'Show'} Analysis
            </button>
          )}
          
          {onSaveAsDocument && (
            <button
              onClick={() => onSaveAsDocument(file)}
              className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
            >
              Save as Doc
            </button>
          )}
          
          {onRemove && (
            <button
              onClick={() => onRemove(file.id)}
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Analysis */}
      {showAnalysis && file.analysis && (
        <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h5 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
            Code Analysis
          </h5>
          
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-gray-500 dark:text-gray-400">Lines:</span>
              <span className="ml-2 font-medium">{file.analysis.lineCount}</span>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">Functions:</span>
              <span className="ml-2 font-medium">{file.analysis.functions.length}</span>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">Complexity:</span>
              <span className="ml-2 font-medium">{file.analysis.complexity.cyclomatic}</span>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">Maintainability:</span>
              <span className="ml-2 font-medium">{file.analysis.complexity.maintainability}%</span>
            </div>
          </div>

          {file.analysis.issues.length > 0 && (
            <div className="mt-3">
              <h6 className="text-xs font-medium text-gray-900 dark:text-gray-100 mb-1">
                Issues ({file.analysis.issues.length})
              </h6>
              <div className="space-y-1">
                {file.analysis.issues.slice(0, 3).map((issue, index) => (
                  <div key={index} className="flex items-center space-x-2 text-xs">
                    <div className={`w-2 h-2 rounded-full ${
                      issue.type === 'error' ? 'bg-red-500' :
                      issue.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                    }`} />
                    <span className="text-gray-600 dark:text-gray-300">
                      Line {issue.line}: {issue.message}
                    </span>
                  </div>
                ))}
                {file.analysis.issues.length > 3 && (
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    +{file.analysis.issues.length - 3} more issues
                  </div>
                )}
              </div>
            </div>
          )}

          {file.analysis.suggestions.length > 0 && (
            <div className="mt-3">
              <h6 className="text-xs font-medium text-gray-900 dark:text-gray-100 mb-1">
                Suggestions
              </h6>
              <div className="space-y-1">
                {file.analysis.suggestions.slice(0, 2).map((suggestion, index) => (
                  <div key={index} className="flex items-start space-x-2 text-xs">
                    <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300">{suggestion}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
