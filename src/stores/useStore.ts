import { create } from 'zustand'
import { ChatMessage, DocumentationItem } from '@/types'

interface Store {
  // App state
  currentPage: 'dashboard' | 'chat' | 'documentation'
  isCodespaceConnected: boolean
  isCopilotEnabled: boolean
  isLoading: boolean

  // Chat state
  messages: ChatMessage[]
  isTyping: boolean
  
  // Documentation state
  documents: DocumentationItem[]
  selectedDocument: DocumentationItem | null
  searchTerm: string
  
  // Actions
  setCurrentPage: (page: Store['currentPage']) => void
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void
  setIsTyping: (isTyping: boolean) => void
  addDocument: (document: Omit<DocumentationItem, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateDocument: (id: string, updates: Partial<DocumentationItem>) => void
  deleteDocument: (id: string) => void
  setSelectedDocument: (document: DocumentationItem | null) => void
  setSearchTerm: (term: string) => void
  setCodespaceConnected: (connected: boolean) => void
  setCopilotEnabled: (enabled: boolean) => void
  setLoading: (loading: boolean) => void
}

export const useStore = create<Store>((set, get) => ({
  // Initial state
  currentPage: 'dashboard',
  isCodespaceConnected: true,
  isCopilotEnabled: true,
  isLoading: false,
  messages: [],
  isTyping: false,
  documents: [
    {
      id: '1',
      title: 'Getting Started',
      content: `# Getting Started with Harmonic Dashboard

Welcome to the Harmonic Dashboard! This modern interface integrates GitHub Copilot-powered features with comprehensive documentation management.

## Features
- 🤖 AI-powered chat assistant
- 📚 Markdown documentation management
- 🚀 Codespace integration
- 🎨 Modern, responsive design

## Quick Start
1. Navigate using the sidebar
2. Try the chat feature for development assistance
3. Create and manage documentation
4. Enjoy the seamless development experience!`,
      type: 'markdown',
      tags: ['getting-started', 'tutorial'],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      title: 'API Reference',
      content: `# API Reference

## Chat API

### POST /api/chat
Send a message to the Copilot assistant.

**Request Body:**
\`\`\`json
{
  "message": "How do I create a React component?",
  "type": "code" | "documentation" | "general"
}
\`\`\`

**Response:**
\`\`\`json
{
  "response": "To create a React component...",
  "type": "assistant"
}
\`\`\`

## Documentation API

### POST /api/documentation
Create a new documentation entry.

**Request Body:**
\`\`\`json
{
  "title": "Component Guide",
  "content": "# Component Guide...",
  "type": "markdown" | "code" | "api",
  "tags": ["components", "react"]
}
\`\`\``,
      type: 'api',
      tags: ['api', 'reference'],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  selectedDocument: null,
  searchTerm: '',
  
  // Actions
  setCurrentPage: (page) => set({ currentPage: page }),
  
  addMessage: (message) => {
    const newMessage: ChatMessage = {
      ...message,
      id: Math.random().toString(36).substring(7),
      timestamp: new Date(),
    }
    set(state => ({ messages: [...state.messages, newMessage] }))
  },
  
  setIsTyping: (isTyping) => set({ isTyping }),
  
  addDocument: (document) => {
    const newDocument: DocumentationItem = {
      ...document,
      id: Math.random().toString(36).substring(7),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    set(state => ({ documents: [...state.documents, newDocument] }))
  },
  
  updateDocument: (id, updates) => {
    set(state => ({
      documents: state.documents.map(doc =>
        doc.id === id ? { ...doc, ...updates, updatedAt: new Date() } : doc
      )
    }))
  },
  
  deleteDocument: (id) => {
    set(state => ({
      documents: state.documents.filter(doc => doc.id !== id),
      selectedDocument: state.selectedDocument?.id === id ? null : state.selectedDocument
    }))
  },
  
  setSelectedDocument: (document) => set({ selectedDocument: document }),
  
  setSearchTerm: (term) => set({ searchTerm: term }),
  
  setCodespaceConnected: (connected) => set({ isCodespaceConnected: connected }),
  
  setCopilotEnabled: (enabled) => set({ isCopilotEnabled: enabled }),
  
  setLoading: (loading) => set({ isLoading: loading }),
}))