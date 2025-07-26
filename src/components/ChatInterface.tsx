import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Code, FileText, Loader2 } from 'lucide-react';
import { useDashboardStore } from '../lib/store';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const ChatInterface: React.FC = () => {
  const { chatMessages, addChatMessage } = useDashboardStore();
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [chatMessages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    
    // Add user message
    addChatMessage({
      role: 'user',
      content: userMessage,
      metadata: { type: 'general' }
    });

    setIsLoading(true);

    try {
      // Simulate Copilot response (in a real implementation, this would call the Copilot API)
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();
      
      addChatMessage({
        role: 'assistant',
        content: data.response || 'I\'m here to help you with code documentation and development questions!',
        metadata: { 
          type: data.type || 'general',
          codeLanguage: data.codeLanguage,
          references: data.references 
        }
      });
    } catch (error) {
      addChatMessage({
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        metadata: { type: 'general' }
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-harmonic-500 rounded-lg flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Copilot Chat</h2>
            <p className="text-sm text-gray-500">Ask about code, documentation, or get development help</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {chatMessages.length === 0 && (
          <div className="text-center py-12">
            <Bot className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Start a conversation</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Ask me about your code, request documentation, or get help with development tasks.
            </p>
          </div>
        )}

        {chatMessages.map((message) => (
          <div key={message.id} className="flex space-x-3">
            <div className="flex-shrink-0">
              {message.role === 'user' ? (
                <div className="w-8 h-8 bg-harmonic-500 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
              ) : (
                <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <p className="text-sm font-medium text-gray-900">
                  {message.role === 'user' ? 'You' : 'Copilot'}
                </p>
                {message.metadata?.type === 'code' && (
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <Code className="w-3 h-3" />
                    <span>{message.metadata.codeLanguage}</span>
                  </div>
                )}
                {message.metadata?.type === 'documentation' && (
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <FileText className="w-3 h-3" />
                    <span>Documentation</span>
                  </div>
                )}
              </div>
              <div className="prose prose-sm max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {message.content}
                </ReactMarkdown>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                {message.timestamp.toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex space-x-3">
            <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="flex items-center space-x-2 text-gray-500">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm">Copilot is thinking...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 px-6 py-4">
        <div className="flex space-x-3">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask Copilot about your code or documentation..."
            className="flex-1 resize-none border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-harmonic-500 focus:border-transparent"
            rows={1}
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={!input.trim() || isLoading}
            className="px-4 py-2 bg-harmonic-500 text-white rounded-lg hover:bg-harmonic-600 focus:outline-none focus:ring-2 focus:ring-harmonic-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;