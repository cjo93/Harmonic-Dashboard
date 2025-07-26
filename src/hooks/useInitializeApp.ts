import { useEffect } from 'react';
import { useDashboardStore } from '../lib/store';

export const useInitializeApp = () => {
  const { addDocumentation, documentation } = useDashboardStore();

  useEffect(() => {
    // Only initialize if no documentation exists
    if (documentation.length === 0) {
      // Add sample documentation
      addDocumentation({
        title: 'Getting Started with Harmonic Dashboard',
        content: `# Getting Started

Welcome to Harmonic Dashboard! This guide will help you get up and running with your integrated development environment.

## Overview

Harmonic Dashboard combines the power of GitHub Copilot with a modern dashboard interface, providing:

- **Intelligent Chat**: Direct access to Copilot for code assistance
- **Documentation Management**: Create, organize, and search documentation
- **Codespace Integration**: Optimized for GitHub Codespaces

## Quick Setup

1. **Start the Development Server**
   \`\`\`bash
   npm run dev
   \`\`\`

2. **Open Your Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

3. **Explore the Interface**
   - Use the sidebar to navigate between sections
   - Try the chat interface for code assistance
   - Create and manage documentation

## Next Steps

- Read the [API Documentation](./api-reference)
- Explore [Code Examples](./examples)
- Learn about [Best Practices](./best-practices)`,
        type: 'markdown',
        tags: ['getting-started', 'setup', 'guide'],
        author: 'Harmonic Dashboard'
      });

      addDocumentation({
        title: 'API Reference',
        content: `# API Reference

## Chat API

### POST /api/chat

Send a message to the Copilot chat interface.

**Endpoint:** \`POST /api/chat\`

**Request Body:**
\`\`\`json
{
  "message": "Your message here"
}
\`\`\`

**Response:**
\`\`\`json
{
  "response": "Copilot response",
  "type": "general|code|documentation",
  "codeLanguage": "javascript",
  "references": ["relevant", "topics"]
}
\`\`\`

**Response Types:**
- \`general\`: General conversation or help
- \`code\`: Code-related responses with syntax highlighting
- \`documentation\`: Documentation-related assistance

## Documentation API

### POST /api/documentation

Create new documentation.

**Endpoint:** \`POST /api/documentation\`

**Request Body:**
\`\`\`json
{
  "title": "Document Title",
  "content": "Markdown content",
  "type": "markdown|code|api",
  "tags": ["tag1", "tag2"]
}
\`\`\`

### GET /api/documentation

Retrieve all documentation.

**Endpoint:** \`GET /api/documentation\`

**Response:**
\`\`\`json
[
  {
    "id": "uuid",
    "title": "Document Title",
    "content": "Markdown content",
    "type": "markdown",
    "tags": ["tag1"],
    "lastUpdated": "2024-01-01T00:00:00Z",
    "author": "Author Name"
  }
]
\`\`\``,
        type: 'api',
        tags: ['api', 'reference', 'endpoints'],
        author: 'System'
      });

      addDocumentation({
        title: 'Code Examples',
        content: `# Code Examples

## React Component Example

Here's a basic React component using TypeScript:

\`\`\`typescript
import React, { useState } from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ 
  label, 
  onClick, 
  variant = 'primary' 
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      await onClick();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={\`btn btn-\${variant} \${isLoading ? 'loading' : ''}\`}
    >
      {isLoading ? 'Loading...' : label}
    </button>
  );
};

export default Button;
\`\`\`

## API Integration Example

\`\`\`typescript
// Custom hook for API calls
import { useState, useEffect } from 'react';

interface ApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

function useApi<T>(url: string): ApiResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(\`HTTP error! status: \${response.status}\`);
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}

// Usage
const MyComponent = () => {
  const { data, loading, error } = useApi<User[]>('/api/users');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {data?.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
};
\`\`\`

## Zustand Store Example

\`\`\`typescript
import { create } from 'zustand';

interface CounterState {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

export const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));
\`\`\``,
        type: 'code',
        tags: ['examples', 'react', 'typescript', 'api'],
        author: 'Development Team'
      });

      addDocumentation({
        title: 'Deployment Guide',
        content: `# Deployment Guide

## Codespace Deployment

### Prerequisites

- GitHub repository with Codespace support
- Valid \`.devcontainer.json\` configuration
- Node.js 18+ environment

### Steps

1. **Prepare the Repository**
   \`\`\`bash
   git add .
   git commit -m "Add Harmonic Dashboard"
   git push origin main
   \`\`\`

2. **Configure Codespace**
   Ensure your \`.devcontainer.json\` includes:
   \`\`\`json
   {
     "image": "mcr.microsoft.com/devcontainers/javascript-node:1-20-bullseye",
     "features": {
       "ghcr.io/devcontainers/features/github-cli:1": {}
     },
     "customizations": {
       "vscode": {
         "extensions": [
           "GitHub.copilot",
           "GitHub.copilot-chat"
         ]
       }
     },
     "forwardPorts": [3000],
     "postCreateCommand": "npm install && npm run build"
   }
   \`\`\`

3. **Launch Codespace**
   - Go to your GitHub repository
   - Click "Code" → "Codespaces" → "Create codespace on main"
   - Wait for automatic setup completion

4. **Start the Application**
   \`\`\`bash
   npm run dev
   \`\`\`

## Production Deployment

### Vercel Deployment

1. **Connect Repository**
   - Import your project in Vercel
   - Connect your GitHub repository

2. **Configure Build Settings**
   - Framework: Next.js
   - Build Command: \`npm run build\`
   - Output Directory: \`.next\`

3. **Environment Variables**
   \`\`\`
   NEXT_PUBLIC_APP_NAME=Harmonic Dashboard
   NODE_ENV=production
   \`\`\`

### Docker Deployment

\`\`\`dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
\`\`\`

## Environment Configuration

### Development
\`\`\`bash
# .env.local
NEXT_PUBLIC_APP_NAME="Harmonic Dashboard (Dev)"
NEXT_PUBLIC_API_URL="http://localhost:3000/api"
\`\`\`

### Production
\`\`\`bash
# .env.production
NEXT_PUBLIC_APP_NAME="Harmonic Dashboard"
NEXT_PUBLIC_API_URL="https://your-domain.com/api"
\`\`\``,
        type: 'markdown',
        tags: ['deployment', 'codespace', 'production', 'docker'],
        author: 'DevOps Team'
      });
    }
  }, [addDocumentation, documentation.length]);
};