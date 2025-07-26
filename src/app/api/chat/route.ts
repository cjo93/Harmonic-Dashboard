import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { message, type = 'general' } = await request.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      )
    }

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1500))

    // Generate response based on message content
    let response = ''
    let responseType = type

    if (message.toLowerCase().includes('component') || message.toLowerCase().includes('react')) {
      responseType = 'code'
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

This component includes TypeScript interfaces, props for customization, and Tailwind CSS styling.`
    } else if (message.toLowerCase().includes('api') || message.toLowerCase().includes('endpoint')) {
      responseType = 'code'
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
    } else if (message.toLowerCase().includes('test') || message.toLowerCase().includes('testing')) {
      responseType = 'code'
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
    } else if (message.toLowerCase().includes('documentation') || message.toLowerCase().includes('docs')) {
      responseType = 'documentation'
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
- Troubleshooting guides`
    } else {
      response = `I'm here to help with your development questions! I can assist with:

🔧 **Code Generation**: React components, API endpoints, TypeScript interfaces
📚 **Documentation**: Writing guides, API docs, and best practices  
🧪 **Testing**: Unit tests, integration tests, and testing strategies
🚀 **Deployment**: Build processes, CI/CD, and optimization
🐛 **Debugging**: Error analysis and troubleshooting

What would you like help with today?`
    }

    return NextResponse.json({
      response,
      type: responseType,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}