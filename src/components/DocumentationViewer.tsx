import React, { useState } from 'react';
import { Search, Plus, FileText, Code, BookOpen, Tag, Calendar, User } from 'lucide-react';
import { useDashboardStore } from '../lib/store';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const DocumentationViewer: React.FC = () => {
  const { documentation, addDocumentation, activeDocSection, setActiveDocSection } = useDashboardStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newDoc, setNewDoc] = useState({
    title: '',
    content: '',
    type: 'markdown' as const,
    tags: [] as string[],
    author: 'Copilot'
  });

  const filteredDocs = documentation.filter(doc =>
    doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const activeDoc = documentation.find(doc => doc.id === activeDocSection);

  const handleAddDocument = () => {
    if (newDoc.title && newDoc.content) {
      addDocumentation(newDoc);
      setNewDoc({
        title: '',
        content: '',
        type: 'markdown',
        tags: [],
        author: 'Copilot'
      });
      setShowAddForm(false);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'code':
        return <Code className="w-4 h-4" />;
      case 'api':
        return <BookOpen className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const addTagToNewDoc = (tag: string) => {
    if (tag && !newDoc.tags.includes(tag)) {
      setNewDoc(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
    }
  };

  return (
    <div className="flex h-full bg-white">
      {/* Sidebar */}
      <div className="w-1/3 border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="border-b border-gray-200 px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Documentation</h2>
            <button
              onClick={() => setShowAddForm(true)}
              className="px-3 py-1 bg-harmonic-500 text-white rounded-lg hover:bg-harmonic-600 transition-colors text-sm flex items-center space-x-1"
            >
              <Plus className="w-4 h-4" />
              <span>Add</span>
            </button>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search documentation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-harmonic-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Document List */}
        <div className="flex-1 overflow-y-auto">
          {filteredDocs.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              <FileText className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm">No documentation found</p>
            </div>
          ) : (
            <div className="p-2 space-y-2">
              {filteredDocs.map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => setActiveDocSection(doc.id)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    activeDocSection === doc.id
                      ? 'bg-harmonic-50 border border-harmonic-200'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    <div className="flex-shrink-0 mt-1">
                      {getTypeIcon(doc.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {doc.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                        {doc.content.substring(0, 100)}...
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <div className="flex flex-wrap gap-1">
                          {doc.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                            >
                              {tag}
                            </span>
                          ))}
                          {doc.tags.length > 2 && (
                            <span className="text-xs text-gray-400">+{doc.tags.length - 2}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {showAddForm ? (
          <div className="p-6">
            <div className="max-w-2xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Documentation</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={newDoc.title}
                    onChange={(e) => setNewDoc(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-harmonic-500 focus:border-transparent"
                    placeholder="Enter documentation title..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select
                    value={newDoc.type}
                    onChange={(e) => setNewDoc(prev => ({ ...prev, type: e.target.value as any }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-harmonic-500 focus:border-transparent"
                  >
                    <option value="markdown">Markdown</option>
                    <option value="code">Code</option>
                    <option value="api">API</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                  <textarea
                    value={newDoc.content}
                    onChange={(e) => setNewDoc(prev => ({ ...prev, content: e.target.value }))}
                    rows={10}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-harmonic-500 focus:border-transparent"
                    placeholder="Enter documentation content (Markdown supported)..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                  <div className="flex space-x-2 mb-2">
                    {['getting-started', 'api', 'tutorial', 'reference', 'example'].map((tag) => (
                      <button
                        key={tag}
                        onClick={() => addTagToNewDoc(tag)}
                        className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {newDoc.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-harmonic-100 text-harmonic-800"
                      >
                        {tag}
                        <button
                          onClick={() => setNewDoc(prev => ({
                            ...prev,
                            tags: prev.tags.filter(t => t !== tag)
                          }))}
                          className="ml-1 text-harmonic-600 hover:text-harmonic-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={handleAddDocument}
                    disabled={!newDoc.title || !newDoc.content}
                    className="px-4 py-2 bg-harmonic-500 text-white rounded-lg hover:bg-harmonic-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Add Documentation
                  </button>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : activeDoc ? (
          <div className="flex-1 overflow-y-auto">
            {/* Document Header */}
            <div className="border-b border-gray-200 px-6 py-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    {getTypeIcon(activeDoc.type)}
                    <h1 className="text-xl font-semibold text-gray-900">{activeDoc.title}</h1>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{activeDoc.author || 'Unknown'}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{activeDoc.lastUpdated.toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Tags */}
              {activeDoc.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-3">
                  {activeDoc.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Document Content */}
            <div className="px-6 py-6">
              <div className="prose prose-sm max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {activeDoc.content}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select Documentation</h3>
              <p className="text-gray-500">Choose a document from the sidebar to view its content</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentationViewer;