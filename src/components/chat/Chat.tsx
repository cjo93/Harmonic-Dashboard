'use client'

import { useState, useRef, useEffect } from 'react'
import { useStore } from '@/stores/useStore'
import { Send, Bot, User, Code, Copy, Check } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function Chat() {
  const { messages, isTyping, addMessage, setIsTyping } = useStore()
  const [input, setInput] = useState('')
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const simulateCopilotResponse = async (userMessage: string) => {
    setIsTyping(true)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000))
    
    let response = ''
    let type: 'code' | 'documentation' | 'general' = 'general'
    
    // Simple keyword-based responses
    if (userMessage.toLowerCase().includes('component') || userMessage.toLowerCase().includes('react')) {
      type = 'code'
      response = `Here's how to create a React component:

\`\`\`typescript
import React from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ 
  label, 
  onClick, 
  variant = 'primary' 
}) => {
  return (
    <button
      onClick={onClick}
      className={\`px-4 py-2 rounded-lg font-medium transition-colors \${
        variant === 'primary' 
          ? 'bg-blue-500 text-white hover:bg-blue-600' 
          : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
      }\`}
    >
      {label}
    </button>
  );
};
\`\`\`

This component includes:
- TypeScript interfaces for type safety
- Props for customization
- Tailwind CSS for styling
- Proper event handling`
    } else if (userMessage.toLowerCase().includes('api') || userMessage.toLowerCase().includes('endpoint')) {
      type = 'code'
      response = `Here's how to create an API endpoint in Next.js:

\`\`\`typescript
// app/api/example/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const data = {
      message: 'Hello from API',
      timestamp: new Date().toISOString(),
    };
    
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Process the request
    const result = {
      success: true,
      data: body,
    };
    
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}
\`\`\`

This API route supports both GET and POST methods with proper error handling.`
    } else if (userMessage.toLowerCase().includes('test') || userMessage.toLowerCase().includes('testing')) {
      type = 'code'
      response = `Here's how to write tests for your React components:

\`\`\`typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button Component', () => {
  it('renders with correct label', () => {
    render(<Button label="Click me" onClick={() => {}} />);
    
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button label="Click me" onClick={handleClick} />);
    
    fireEvent.click(screen.getByText('Click me'));
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies correct styling for variant', () => {
    render(<Button label="Primary" onClick={() => {}} variant="primary" />);
    
    const button = screen.getByText('Primary');
    expect(button).toHaveClass('bg-blue-500');
  });
});
\`\`\`

This includes unit tests for rendering, event handling, and styling.`
    } else if (userMessage.toLowerCase().includes('documentation') || userMessage.toLowerCase().includes('docs')) {
      type = 'documentation'
      response = `# Creating Good Documentation

## Best Practices

1. **Clear Structure**: Use headings to organize content hierarchically
2. **Code Examples**: Include practical examples with explanations
3. **Getting Started**: Provide a quick start guide for new users
4. **API Reference**: Document all functions, parameters, and return values

## Markdown Tips

- Use \`inline code\` for small snippets
- Use code blocks for larger examples
- Add tables for structured data
- Include links to related resources

## Documentation Types

### API Documentation
- Endpoint descriptions
- Request/response examples
- Error codes and handling

### User Guides
- Step-by-step tutorials
- Common use cases
- Troubleshooting guides

### Code Documentation
- Function descriptions
- Parameter explanations
- Usage examples`
    } else {
      response = `I'm here to help with your development questions! I can assist with:

🔧 **Code Generation**: React components, API endpoints, TypeScript interfaces
📚 **Documentation**: Writing guides, API docs, and best practices  
🧪 **Testing**: Unit tests, integration tests, and testing strategies
🚀 **Deployment**: Build processes, CI/CD, and optimization
🐛 **Debugging**: Error analysis and troubleshooting

What would you like help with today?`
    }
    
    setIsTyping(false)
    addMessage({ role: 'assistant', content: response, type })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    addMessage({ role: 'user', content: input })
    setInput('')
    
    // Simulate Copilot response
    await simulateCopilotResponse(input)
  }

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text)
    setCopiedCode(text)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-sm border border-gray-200">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">GitHub Copilot Assistant</h3>
            <p className="text-xs text-gray-500">AI-powered development help</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-xs text-green-600">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span>Online</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center py-8">
            <Bot className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">Welcome to Copilot Chat</h4>
            <p className="text-gray-600 max-w-md mx-auto">
              Ask me anything about coding, documentation, or development best practices. 
              I&apos;m here to help you build better software!
            </p>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-3xl ${message.role === 'user' ? 'order-2' : 'order-1'}`}>
              <div className="flex items-start space-x-3">
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}
                <div
                  className={`px-4 py-3 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-harmonic-500 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  {message.role === 'assistant' ? (
                    <div className="prose prose-sm max-w-none">
                      <ReactMarkdown
                        components={{
                          code: ({ inline, className, children, ...props }: any) => {
                            const match = /language-(\w+)/.exec(className || '')
                            const codeString = String(children).replace(/\n$/, '')
                            
                            if (!inline && match) {
                              return (
                                <div className="relative">
                                  <div className="flex items-center justify-between bg-gray-800 text-gray-200 px-4 py-2 rounded-t-lg">
                                    <span className="text-xs font-medium">{match[1]}</span>
                                    <button
                                      onClick={() => copyToClipboard(codeString)}
                                      className="text-gray-400 hover:text-white transition-colors"
                                    >
                                      {copiedCode === codeString ? (
                                        <Check className="w-4 h-4" />
                                      ) : (
                                        <Copy className="w-4 h-4" />
                                      )}
                                    </button>
                                  </div>
                                  <SyntaxHighlighter
                                    style={tomorrow}
                                    language={match[1]}
                                    PreTag="div"
                                    className="!mt-0 !rounded-t-none"
                                    {...props}
                                  >
                                    {codeString}
                                  </SyntaxHighlighter>
                                </div>
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
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <p>{message.content}</p>
                  )}
                  <p className="text-xs opacity-70 mt-2">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
                {message.role === 'user' && (
                  <div className="w-8 h-8 bg-harmonic-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-gray-100 rounded-lg px-4 py-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything about development..."
            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-harmonic-500 focus:border-transparent"
            disabled={isTyping}
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="px-4 py-2 bg-harmonic-500 text-white rounded-lg hover:bg-harmonic-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  )
}