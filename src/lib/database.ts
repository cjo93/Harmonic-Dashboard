// IndexedDB utility for persistent storage
export interface StoredMessage {
  id: string
  content: string
  type: 'user' | 'assistant'
  messageType: 'code' | 'documentation' | 'general'
  timestamp: number
  metadata?: {
    language?: string
    codeBlocks?: string[]
    tags?: string[]
  }
}

export interface StoredDocument {
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

export interface StoredProject {
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
}

class DatabaseManager {
  private db: IDBDatabase | null = null
  private readonly dbName = 'HarmonicDashboard'
  private readonly version = 1

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => {
        this.db = request.result
        resolve()
      }

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result

        // Messages store
        if (!db.objectStoreNames.contains('messages')) {
          const messageStore = db.createObjectStore('messages', { keyPath: 'id' })
          messageStore.createIndex('timestamp', 'timestamp')
          messageStore.createIndex('type', 'type')
          messageStore.createIndex('messageType', 'messageType')
        }

        // Documents store
        if (!db.objectStoreNames.contains('documents')) {
          const docStore = db.createObjectStore('documents', { keyPath: 'id' })
          docStore.createIndex('title', 'title')
          docStore.createIndex('type', 'type')
          docStore.createIndex('tags', 'tags', { multiEntry: true })
          docStore.createIndex('createdAt', 'createdAt')
          docStore.createIndex('updatedAt', 'updatedAt')
        }

        // Projects store
        if (!db.objectStoreNames.contains('projects')) {
          const projectStore = db.createObjectStore('projects', { keyPath: 'id' })
          projectStore.createIndex('name', 'name')
          projectStore.createIndex('lastActive', 'lastActive')
          projectStore.createIndex('languages', 'languages', { multiEntry: true })
        }

        // Analytics store
        if (!db.objectStoreNames.contains('analytics')) {
          const analyticsStore = db.createObjectStore('analytics', { keyPath: 'id' })
          analyticsStore.createIndex('timestamp', 'timestamp')
          analyticsStore.createIndex('event', 'event')
        }
      }
    })
  }

  // Messages CRUD
  async saveMessage(message: StoredMessage): Promise<void> {
    if (!this.db) throw new Error('Database not initialized')
    
    const transaction = this.db.transaction(['messages'], 'readwrite')
    const store = transaction.objectStore('messages')
    await store.put(message)
  }

  async getMessages(limit = 50): Promise<StoredMessage[]> {
    if (!this.db) throw new Error('Database not initialized')
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['messages'], 'readonly')
      const store = transaction.objectStore('messages')
      const index = store.index('timestamp')
      const request = index.openCursor(null, 'prev')
      
      const messages: StoredMessage[] = []
      let count = 0
      
      request.onsuccess = () => {
        const cursor = request.result
        if (cursor && count < limit) {
          messages.push(cursor.value)
          count++
          cursor.continue()
        } else {
          resolve(messages)
        }
      }
      
      request.onerror = () => reject(request.error)
    })
  }

  // Documents CRUD
  async saveDocument(document: StoredDocument): Promise<void> {
    if (!this.db) throw new Error('Database not initialized')
    
    const transaction = this.db.transaction(['documents'], 'readwrite')
    const store = transaction.objectStore('documents')
    await store.put(document)
  }

  async getDocuments(): Promise<StoredDocument[]> {
    if (!this.db) throw new Error('Database not initialized')
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['documents'], 'readonly')
      const store = transaction.objectStore('documents')
      const request = store.getAll()
      
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }

  async searchDocuments(query: string, tags?: string[]): Promise<StoredDocument[]> {
    const documents = await this.getDocuments()
    
    return documents.filter(doc => {
      const matchesQuery = query === '' || 
        doc.title.toLowerCase().includes(query.toLowerCase()) ||
        doc.content.toLowerCase().includes(query.toLowerCase())
      
      const matchesTags = !tags || tags.length === 0 || 
        tags.some(tag => doc.tags.includes(tag))
      
      return matchesQuery && matchesTags
    })
  }

  async deleteDocument(id: string): Promise<void> {
    if (!this.db) throw new Error('Database not initialized')
    
    const transaction = this.db.transaction(['documents'], 'readwrite')
    const store = transaction.objectStore('documents')
    await store.delete(id)
  }

  // Projects CRUD
  async saveProject(project: StoredProject): Promise<void> {
    if (!this.db) throw new Error('Database not initialized')
    
    const transaction = this.db.transaction(['projects'], 'readwrite')
    const store = transaction.objectStore('projects')
    await store.put(project)
  }

  async getProjects(): Promise<StoredProject[]> {
    if (!this.db) throw new Error('Database not initialized')
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['projects'], 'readonly')
      const store = transaction.objectStore('projects')
      const request = store.getAll()
      
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }

  // Analytics
  async logEvent(event: string, data: any): Promise<void> {
    if (!this.db) throw new Error('Database not initialized')
    
    const analyticsData = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      event,
      data,
      timestamp: Date.now()
    }
    
    const transaction = this.db.transaction(['analytics'], 'readwrite')
    const store = transaction.objectStore('analytics')
    await store.put(analyticsData)
  }

  async getAnalytics(days = 7): Promise<any[]> {
    if (!this.db) throw new Error('Database not initialized')
    
    const since = Date.now() - (days * 24 * 60 * 60 * 1000)
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['analytics'], 'readonly')
      const store = transaction.objectStore('analytics')
      const index = store.index('timestamp')
      const range = IDBKeyRange.lowerBound(since)
      const request = index.getAll(range)
      
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }

  async clearOldData(daysToKeep = 30): Promise<void> {
    if (!this.db) throw new Error('Database not initialized')
    
    const cutoff = Date.now() - (daysToKeep * 24 * 60 * 60 * 1000)
    
    // Clear old messages
    const messageTransaction = this.db.transaction(['messages'], 'readwrite')
    const messageStore = messageTransaction.objectStore('messages')
    const messageIndex = messageStore.index('timestamp')
    const messageRange = IDBKeyRange.upperBound(cutoff)
    await messageIndex.openCursor(messageRange)?.delete()
    
    // Clear old analytics
    const analyticsTransaction = this.db.transaction(['analytics'], 'readwrite')
    const analyticsStore = analyticsTransaction.objectStore('analytics')
    const analyticsIndex = analyticsStore.index('timestamp')
    const analyticsRange = IDBKeyRange.upperBound(cutoff)
    await analyticsIndex.openCursor(analyticsRange)?.delete()
  }
}

export const db = new DatabaseManager()

// Utility functions
export const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

export const formatFileSize = (bytes: number): string => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  if (bytes === 0) return '0 Bytes'
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i]
}
