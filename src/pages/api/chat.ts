import type { NextApiRequest, NextApiResponse } from 'next'

interface ChatRequest {
  message: string;
}

interface ChatResponse {
  response: string;
  type?: 'code' | 'documentation' | 'general';
  codeLanguage?: string;
  references?: string[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ChatResponse | { error: string }>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message }: ChatRequest = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Simulate Copilot-style responses based on message content
    let response: ChatResponse;

    if (message.toLowerCase().includes('code') || message.toLowerCase().includes('function')) {
      response = {
        response: `Here's a code example for your request:\n\n\`\`\`javascript\nfunction example() {\n  // Your code here\n  console.log("Hello from Copilot!");\n}\n\`\`\`\n\nThis function demonstrates the basic structure you asked about. You can modify it according to your specific needs.`,
        type: 'code',
        codeLanguage: 'javascript',
        references: ['JavaScript Functions', 'Best Practices']
      };
    } else if (message.toLowerCase().includes('documentation') || message.toLowerCase().includes('docs')) {
      response = {
        response: `I can help you create documentation! Here are some suggestions:\n\n## Documentation Structure\n\n1. **Getting Started** - Basic setup and installation\n2. **API Reference** - Detailed API documentation\n3. **Examples** - Code examples and use cases\n4. **Troubleshooting** - Common issues and solutions\n\nWould you like me to help you create documentation for a specific topic?`,
        type: 'documentation',
        references: ['Documentation Best Practices', 'Markdown Guide']
      };
    } else if (message.toLowerCase().includes('help') || message.toLowerCase().includes('how')) {
      response = {
        response: `I'm here to help! I can assist you with:\n\n- **Code Generation**: Write functions, classes, and components\n- **Documentation**: Create comprehensive guides and API docs\n- **Code Review**: Analyze and improve your code\n- **Debugging**: Help identify and fix issues\n- **Best Practices**: Suggest improvements and patterns\n\nWhat specific task would you like help with?`,
        type: 'general'
      };
    } else {
      response = {
        response: `I understand you're asking about "${message}". I'm here to help with your development needs!\n\nI can assist with:\n- Writing and reviewing code\n- Creating documentation\n- Explaining programming concepts\n- Debugging issues\n- Suggesting best practices\n\nCould you provide more details about what you'd like to work on?`,
        type: 'general'
      };
    }

    res.status(200).json(response);
  } catch (error) {
    console.error('Chat API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}