import type { NextApiRequest, NextApiResponse } from 'next'

interface DocumentationRequest {
  title: string;
  content: string;
  type: 'markdown' | 'code' | 'api';
  tags: string[];
}

interface DocumentationResponse {
  id: string;
  success: boolean;
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DocumentationResponse | { error: string }>
) {
  switch (req.method) {
    case 'POST':
      return handleCreateDocumentation(req, res);
    case 'GET':
      return handleGetDocumentation(req, res);
    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
}

async function handleCreateDocumentation(
  req: NextApiRequest,
  res: NextApiResponse<DocumentationResponse | { error: string }>
) {
  try {
    const { title, content, type, tags }: DocumentationRequest = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    // In a real implementation, this would save to a database
    const id = crypto.randomUUID();

    res.status(201).json({
      id,
      success: true,
      message: 'Documentation created successfully'
    });
  } catch (error) {
    console.error('Documentation creation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function handleGetDocumentation(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // In a real implementation, this would fetch from a database
    const sampleDocs = [
      {
        id: '1',
        title: 'Getting Started with Harmonic Dashboard',
        content: `# Getting Started\n\nWelcome to Harmonic Dashboard! This guide will help you get up and running.\n\n## Installation\n\n\`\`\`bash\nnpm install\nnpm run dev\n\`\`\`\n\n## Features\n\n- Integrated Copilot chat\n- Documentation management\n- Code assistance\n- Codespace integration`,
        type: 'markdown',
        tags: ['getting-started', 'setup'],
        lastUpdated: new Date(),
        author: 'Copilot'
      },
      {
        id: '2',
        title: 'API Reference',
        content: `# API Reference\n\n## Chat API\n\n### POST /api/chat\n\nSend a message to the Copilot chat interface.\n\n**Request Body:**\n\`\`\`json\n{\n  "message": "Your message here"\n}\n\`\`\`\n\n**Response:**\n\`\`\`json\n{\n  "response": "Copilot response",\n  "type": "general",\n  "references": []\n}\n\`\`\``,
        type: 'api',
        tags: ['api', 'reference', 'endpoints'],
        lastUpdated: new Date(),
        author: 'System'
      }
    ];

    res.status(200).json(sampleDocs);
  } catch (error) {
    console.error('Documentation fetch error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}