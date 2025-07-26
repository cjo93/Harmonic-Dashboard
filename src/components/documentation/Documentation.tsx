'use client'

import { useState, useMemo } from 'react'
import { useStore } from '@/stores/useStore'
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  FileText, 
  Code, 
  Globe,
  Calendar,
  Tag
} from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { DocumentationItem } from '@/types'

export default function Documentation() {
  const { 
    documents, 
    selectedDocument, 
    searchTerm, 
    addDocument, 
    updateDocument, 
    deleteDocument, 
    setSelectedDocument, 
    setSearchTerm 
  } = useStore()

  const [isCreating, setIsCreating] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    title: '',
    content: '',
    type: 'markdown' as DocumentationItem['type'],
    tags: [] as string[]
  })
  const [newTag, setNewTag] = useState('')

  // Filter documents based on search term
  const filteredDocuments = useMemo(() => {
    if (!searchTerm) return documents
    
    return documents.filter(doc => 
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  }, [documents, searchTerm])

  const startCreating = () => {
    setEditForm({
      title: '',
      content: '',
      type: 'markdown',
      tags: []
    })
    setIsCreating(true)
    setIsEditing(false)
    setSelectedDocument(null)
  }

  const startEditing = (doc: DocumentationItem) => {
    setEditForm({
      title: doc.title,
      content: doc.content,
      type: doc.type,
      tags: [...doc.tags]
    })
    setIsEditing(true)
    setIsCreating(false)
  }

  const cancelEdit = () => {
    setIsCreating(false)
    setIsEditing(false)
    setEditForm({
      title: '',
      content: '',
      type: 'markdown',
      tags: []
    })
  }

  const saveDocument = () => {
    if (!editForm.title.trim() || !editForm.content.trim()) return

    if (isCreating) {
      addDocument(editForm)
    } else if (selectedDocument) {
      updateDocument(selectedDocument.id, editForm)
    }

    cancelEdit()
  }

  const handleDeleteDocument = (id: string) => {
    if (confirm('Are you sure you want to delete this document?')) {
      deleteDocument(id)
    }
  }

  const addTag = () => {
    if (newTag.trim() && !editForm.tags.includes(newTag.trim())) {
      setEditForm(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }))
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setEditForm(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const getTypeIcon = (type: DocumentationItem['type']) => {
    switch (type) {
      case 'code':
        return <Code className="w-4 h-4" />
      case 'api':
        return <Globe className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  const getTypeColor = (type: DocumentationItem['type']) => {
    switch (type) {
      case 'code':
        return 'text-purple-600 bg-purple-50'
      case 'api':
        return 'text-orange-600 bg-orange-50'
      default:
        return 'text-blue-600 bg-blue-50'
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
      {/* Document List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Documentation</h3>
          <button
            onClick={startCreating}
            className="p-2 bg-harmonic-500 text-white rounded-lg hover:bg-harmonic-600 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search documentation..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-harmonic-500 focus:border-transparent"
          />
        </div>

        {/* Document List */}
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {filteredDocuments.map((doc) => (
            <div
              key={doc.id}
              onClick={() => setSelectedDocument(doc)}
              className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                selectedDocument?.id === doc.id
                  ? 'border-harmonic-200 bg-harmonic-50'
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <div className={`p-1 rounded ${getTypeColor(doc.type)}`}>
                      {getTypeIcon(doc.type)}
                    </div>
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {doc.title}
                    </h4>
                  </div>
                  <p className="text-xs text-gray-500 mb-2 line-clamp-2">
                    {doc.content.substring(0, 100)}...
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {doc.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                      {doc.tags.length > 2 && (
                        <span className="text-xs text-gray-500">+{doc.tags.length - 2}</span>
                      )}
                    </div>
                    <span className="text-xs text-gray-400">
                      {doc.updatedAt.toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
        {(isCreating || isEditing) ? (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                {isCreating ? 'Create New Document' : 'Edit Document'}
              </h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={saveDocument}
                  disabled={!editForm.title.trim() || !editForm.content.trim()}
                  className="px-4 py-2 bg-harmonic-500 text-white rounded-lg hover:bg-harmonic-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
                >
                  <Save className="w-4 h-4 mr-2 inline" />
                  Save
                </button>
                <button
                  onClick={cancelEdit}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                >
                  <X className="w-4 h-4 mr-2 inline" />
                  Cancel
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter document title..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-harmonic-500 focus:border-transparent"
                />
              </div>

              {/* Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select
                  value={editForm.type}
                  onChange={(e) => setEditForm(prev => ({ ...prev, type: e.target.value as DocumentationItem['type'] }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-harmonic-500 focus:border-transparent"
                >
                  <option value="markdown">Markdown</option>
                  <option value="code">Code</option>
                  <option value="api">API</option>
                </select>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                <div className="flex items-center space-x-2 mb-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    placeholder="Add tag..."
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-harmonic-500 focus:border-transparent text-sm"
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                  >
                    <Tag className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {editForm.tags.map(tag => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2 py-1 bg-harmonic-100 text-harmonic-700 text-xs rounded cursor-pointer hover:bg-harmonic-200 transition-colors"
                      onClick={() => removeTag(tag)}
                    >
                      {tag}
                      <X className="w-3 h-3 ml-1" />
                    </span>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                <textarea
                  value={editForm.content}
                  onChange={(e) => setEditForm(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Write your documentation here..."
                  rows={20}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-harmonic-500 focus:border-transparent font-mono text-sm"
                />
              </div>
            </div>
          </div>
        ) : selectedDocument ? (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <div className={`p-2 rounded-lg ${getTypeColor(selectedDocument.type)}`}>
                    {getTypeIcon(selectedDocument.type)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{selectedDocument.title}</h3>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        Updated {selectedDocument.updatedAt.toLocaleDateString()}
                      </span>
                      <span>Type: {selectedDocument.type}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedDocument.tags.map(tag => (
                    <span key={tag} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => startEditing(selectedDocument)}
                  className="px-3 py-2 bg-harmonic-100 text-harmonic-700 rounded-lg hover:bg-harmonic-200 transition-colors text-sm"
                >
                  <Edit className="w-4 h-4 mr-2 inline" />
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteDocument(selectedDocument.id)}
                  className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm"
                >
                  <Trash2 className="w-4 h-4 mr-2 inline" />
                  Delete
                </button>
              </div>
            </div>

            <div className="prose prose-sm max-w-none">
              <ReactMarkdown
                components={{
                  code: ({ inline, className, children, ...props }: any) => {
                    const match = /language-(\w+)/.exec(className || '')
                    
                    if (!inline && match) {
                      return (
                        <SyntaxHighlighter
                          style={tomorrow}
                          language={match[1]}
                          PreTag="div"
                          {...props}
                        >
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                      )
                    }
                    
                    return (
                      <code className="bg-gray-200 px-1 py-0.5 rounded text-sm" {...props}>
                        {children}
                      </code>
                    )
                  },
                }}
              >
                {selectedDocument.content}
              </ReactMarkdown>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full p-6">
            <div className="text-center">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-900 mb-2">No Document Selected</h4>
              <p className="text-gray-600 mb-4">
                Select a document from the list to view its content, or create a new one.
              </p>
              <button
                onClick={startCreating}
                className="px-4 py-2 bg-harmonic-500 text-white rounded-lg hover:bg-harmonic-600 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2 inline" />
                Create New Document
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}