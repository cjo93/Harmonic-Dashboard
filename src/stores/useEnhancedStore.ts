import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { db, StoredMessage, StoredDocument, StoredProject, generateId } from '@/lib/database'
import { FileUploadResult } from '@/lib/fileProcessor'
import { GitHubConfig, githubService } from '@/lib/github'

export interface Message {
  id: string
  content: string
  type: 'user' | 'assistant'
  messageType: 'code' | 'documentation' | 'general'
  timestamp: number
  metadata?: {
    language?: string
    codeBlocks?: string[]
    tags?: string[]
    fileAttachment?: FileUploadResult
  }
}

export interface Document {
  id: string
  title: string
  content: string
  type: 'markdown' | 'code' | 'api'
  tags: string[]
  createdAt: number
  updatedAt: number
  author?: string
  version: number
  metadata?: {
    language?: string
    framework?: string
    difficulty?: 'beginner' | 'intermediate' | 'advanced'
  }
}

export interface Project {
  id: string
  name: string
  description: string
  languages: string[]
  frameworks: string[]
  lastActive: number
  stats: {
    totalFiles: number
    totalLines: number
    testCoverage: number
    lastCommit: string
  }
  githubUrl?: string
}

export interface AppStats {
  totalMessages: number
  totalDocuments: number
  totalProjects: number
  codespaceUptime: number
  lastActivity: number
  activeFeatures: string[]
}

export interface SearchFilters {
  query: string
  tags: string[]
  type?: 'markdown' | 'code' | 'api'
  dateRange?: {
    start: number
    end: number
  }
}

interface AppStore {
  // UI State
  currentPage: 'dashboard' | 'chat' | 'documentation' | 'projects' | 'settings'
  isLoading: boolean
  error: string | null
  sidebarCollapsed: boolean
  
  // Connection Status
  isCodespaceConnected: boolean
  isCopilotEnabled: boolean
  isOnline: boolean
  
  // Data
  messages: Message[]
  documents: Document[]
  projects: Project[]
  currentProject: Project | null
  
  // Chat State
  isTyping: boolean
  chatInput: string
  
  // Documentation State
  searchFilters: SearchFilters
  selectedDocument: Document | null
  documentPreview: string | null
  
  // File Handling
  uploadedFiles: FileUploadResult[]
  isProcessingFiles: boolean
  
  // GitHub Integration
  githubConfig: GitHubConfig
  isGitHubConnected: boolean
  
  // Analytics
  appStats: AppStats
  
  // Actions
  setCurrentPage: (page: AppStore['currentPage']) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  toggleSidebar: () => void
  
  // Connection Actions
  updateConnectionStatus: () => void
  
  // Chat Actions
  addMessage: (content: string, type: Message['type'], messageType: Message['messageType'], metadata?: Message['metadata']) => void
  setIsTyping: (typing: boolean) => void
  setChatInput: (input: string) => void
  clearMessages: () => void
  
  // Document Actions
  addDocument: (document: Omit<Document, 'id' | 'createdAt' | 'updatedAt' | 'version'>) => Promise<string>
  updateDocument: (id: string, updates: Partial<Document>) => Promise<void>
  deleteDocument: (id: string) => Promise<void>
  setSelectedDocument: (document: Document | null) => void
  setDocumentPreview: (preview: string | null) => void
  searchDocuments: (filters: SearchFilters) => Promise<Document[]>
  
  // Project Actions
  addProject: (project: Omit<Project, 'id' | 'lastActive'>) => Promise<string>
  updateProject: (id: string, updates: Partial<Project>) => Promise<void>
  deleteProject: (id: string) => Promise<void>
  setCurrentProject: (project: Project | null) => void
  
  // File Actions
  addUploadedFile: (file: FileUploadResult) => void
  removeUploadedFile: (id: string) => void
  setProcessingFiles: (processing: boolean) => void
  clearUploadedFiles: () => void
  
  // GitHub Actions
  setGitHubConfig: (config: GitHubConfig) => void
  connectGitHub: () => Promise<boolean>
  disconnectGitHub: () => void
  
  // Analytics Actions
  updateStats: () => Promise<void>
  logActivity: (activity: string, data?: any) => Promise<void>
  
  // Initialization
  initialize: () => Promise<void>
}

export const useEnhancedStore = create<AppStore>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial State
        currentPage: 'dashboard',
        isLoading: false,
        error: null,
        sidebarCollapsed: false,
        
        isCodespaceConnected: typeof window !== 'undefined' && !!process.env.CODESPACE_NAME,
        isCopilotEnabled: false,
        isOnline: typeof window !== 'undefined' && navigator.onLine,
        
        messages: [],
        documents: [],
        projects: [],
        currentProject: null,
        
        isTyping: false,
        chatInput: '',
        
        searchFilters: {
          query: '',
          tags: [],
          type: undefined,
          dateRange: undefined
        },
        selectedDocument: null,
        documentPreview: null,
        
        uploadedFiles: [],
        isProcessingFiles: false,
        
        githubConfig: {},
        isGitHubConnected: false,
        
        appStats: {
          totalMessages: 0,
          totalDocuments: 0,
          totalProjects: 0,
          codespaceUptime: 0,
          lastActivity: Date.now(),
          activeFeatures: []
        },
        
        // Actions
        setCurrentPage: (page) => {
          set({ currentPage: page })
          get().logActivity('page_change', { page })
        },
        
        setLoading: (loading) => set({ isLoading: loading }),
        setError: (error) => set({ error }),
        toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
        
        updateConnectionStatus: () => {
          const isCodespaceConnected = typeof window !== 'undefined' && !!process.env.CODESPACE_NAME
          const isOnline = typeof window !== 'undefined' && navigator.onLine
          set({ isCodespaceConnected, isOnline })
        },
        
        // Chat Actions
        addMessage: async (content, type, messageType, metadata) => {
          const message: Message = {
            id: generateId(),
            content,
            type,
            messageType,
            timestamp: Date.now(),
            metadata
          }
          
          set((state) => ({ messages: [...state.messages, message] }))
          
          // Save to database
          try {
            await db.saveMessage({
              ...message,
              metadata: metadata as any
            } as StoredMessage)
            get().logActivity('message_sent', { type, messageType })
          } catch (error) {
            console.error('Failed to save message:', error)
          }
        },
        
        setIsTyping: (typing) => set({ isTyping: typing }),
        setChatInput: (input) => set({ chatInput: input }),
        clearMessages: () => set({ messages: [] }),
        
        // Document Actions
        addDocument: async (documentData) => {
          const document: Document = {
            ...documentData,
            id: generateId(),
            createdAt: Date.now(),
            updatedAt: Date.now(),
            version: 1
          }
          
          set((state) => ({ documents: [...state.documents, document] }))
          
          try {
            await db.saveDocument(document as StoredDocument)
            get().logActivity('document_created', { type: document.type, title: document.title })
            get().updateStats()
            return document.id
          } catch (error) {
            console.error('Failed to save document:', error)
            set((state) => ({ documents: state.documents.filter(d => d.id !== document.id) }))
            throw error
          }
        },
        
        updateDocument: async (id, updates) => {
          const updatedDoc = { ...updates, updatedAt: Date.now(), version: (updates.version || 1) + 1 }
          
          set((state) => ({
            documents: state.documents.map(d => 
              d.id === id ? { ...d, ...updatedDoc } : d
            )
          }))
          
          try {
            const document = get().documents.find(d => d.id === id)
            if (document) {
              await db.saveDocument(document as StoredDocument)
              get().logActivity('document_updated', { id, title: document.title })
            }
          } catch (error) {
            console.error('Failed to update document:', error)
            throw error
          }
        },
        
        deleteDocument: async (id) => {
          set((state) => ({ documents: state.documents.filter(d => d.id !== id) }))
          
          try {
            await db.deleteDocument(id)
            get().logActivity('document_deleted', { id })
            get().updateStats()
          } catch (error) {
            console.error('Failed to delete document:', error)
            throw error
          }
        },
        
        setSelectedDocument: (document) => set({ selectedDocument: document }),
        setDocumentPreview: (preview) => set({ documentPreview: preview }),
        
        searchDocuments: async (filters) => {
          try {
            const results = await db.searchDocuments(filters.query, filters.tags)
            let filteredResults = results
            
            if (filters.type) {
              filteredResults = results.filter(doc => doc.type === filters.type)
            }
            
            if (filters.dateRange) {
              filteredResults = filteredResults.filter(doc => 
                doc.createdAt >= filters.dateRange!.start && 
                doc.createdAt <= filters.dateRange!.end
              )
            }
            
            get().logActivity('documents_searched', { 
              query: filters.query, 
              resultCount: filteredResults.length 
            })
            
            return filteredResults as Document[]
          } catch (error) {
            console.error('Failed to search documents:', error)
            return []
          }
        },
        
        // Project Actions
        addProject: async (projectData) => {
          const project: Project = {
            ...projectData,
            id: generateId(),
            lastActive: Date.now()
          }
          
          set((state) => ({ projects: [...state.projects, project] }))
          
          try {
            await db.saveProject(project as StoredProject)
            get().logActivity('project_created', { name: project.name })
            get().updateStats()
            return project.id
          } catch (error) {
            console.error('Failed to save project:', error)
            set((state) => ({ projects: state.projects.filter(p => p.id !== project.id) }))
            throw error
          }
        },
        
        updateProject: async (id, updates) => {
          const updatedProject = { ...updates, lastActive: Date.now() }
          
          set((state) => ({
            projects: state.projects.map(p => 
              p.id === id ? { ...p, ...updatedProject } : p
            )
          }))
          
          try {
            const project = get().projects.find(p => p.id === id)
            if (project) {
              await db.saveProject(project as StoredProject)
              get().logActivity('project_updated', { id, name: project.name })
            }
          } catch (error) {
            console.error('Failed to update project:', error)
            throw error
          }
        },
        
        deleteProject: async (id) => {
          set((state) => ({ projects: state.projects.filter(p => p.id !== id) }))
          get().logActivity('project_deleted', { id })
          get().updateStats()
        },
        
        setCurrentProject: (project) => {
          set({ currentProject: project })
          if (project) {
            get().logActivity('project_selected', { id: project.id, name: project.name })
          }
        },
        
        // File Actions
        addUploadedFile: (file) => {
          set((state) => ({ uploadedFiles: [...state.uploadedFiles, file] }))
          get().logActivity('file_uploaded', { 
            name: file.name, 
            size: file.size, 
            language: file.language 
          })
        },
        
        removeUploadedFile: (id) => {
          set((state) => ({ uploadedFiles: state.uploadedFiles.filter(f => f.id !== id) }))
        },
        
        setProcessingFiles: (processing) => set({ isProcessingFiles: processing }),
        clearUploadedFiles: () => set({ uploadedFiles: [] }),
        
        // GitHub Actions
        setGitHubConfig: (config) => {
          set({ githubConfig: config })
          githubService.setConfig(config)
        },
        
        connectGitHub: async () => {
          try {
            const isValid = await githubService.validateToken()
            set({ isGitHubConnected: isValid })
            if (isValid) {
              get().logActivity('github_connected')
            }
            return isValid
          } catch (error) {
            console.error('GitHub connection failed:', error)
            set({ isGitHubConnected: false })
            return false
          }
        },
        
        disconnectGitHub: () => {
          set({ githubConfig: {}, isGitHubConnected: false })
          githubService.setConfig({})
          get().logActivity('github_disconnected')
        },
        
        // Analytics Actions
        updateStats: async () => {
          try {
            const messages = await db.getMessages(1000)
            const documents = await db.getDocuments()
            const projects = await db.getProjects()
            
            const stats: AppStats = {
              totalMessages: messages.length,
              totalDocuments: documents.length,
              totalProjects: projects.length,
              codespaceUptime: get().isCodespaceConnected ? Date.now() - (Date.now() % (24 * 60 * 60 * 1000)) : 0,
              lastActivity: Date.now(),
              activeFeatures: [
                get().isGitHubConnected ? 'github' : '',
                get().isCopilotEnabled ? 'copilot' : '',
                get().isCodespaceConnected ? 'codespace' : ''
              ].filter(Boolean)
            }
            
            set({ appStats: stats })
          } catch (error) {
            console.error('Failed to update stats:', error)
          }
        },
        
        logActivity: async (activity, data) => {
          try {
            await db.logEvent(activity, data)
            set((state) => ({
              appStats: { ...state.appStats, lastActivity: Date.now() }
            }))
          } catch (error) {
            console.error('Failed to log activity:', error)
          }
        },
        
        // Initialization
        initialize: async () => {
          try {
            set({ isLoading: true })
            
            // Initialize database
            await db.init()
            
            // Load data from database
            const [messages, documents, projects] = await Promise.all([
              db.getMessages(100),
              db.getDocuments(),
              db.getProjects()
            ])
            
            set({
              messages: messages as Message[],
              documents: documents as Document[],
              projects: projects as Project[]
            })
            
            // Update connection status
            get().updateConnectionStatus()
            
            // Update stats
            await get().updateStats()
            
            // Check Copilot status (simplified)
            set({ isCopilotEnabled: true }) // Assume enabled for demo
            
            get().logActivity('app_initialized')
            
          } catch (error) {
            console.error('Failed to initialize app:', error)
            set({ error: 'Failed to initialize application' })
          } finally {
            set({ isLoading: false })
          }
        }
      }),
      {
        name: 'harmonic-dashboard-enhanced',
        partialize: (state) => ({
          currentPage: state.currentPage,
          sidebarCollapsed: state.sidebarCollapsed,
          githubConfig: state.githubConfig,
          searchFilters: state.searchFilters
        })
      }
    ),
    { name: 'harmonic-dashboard-enhanced' }
  )
)
