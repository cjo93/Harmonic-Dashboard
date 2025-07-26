import { NextRequest, NextResponse } from 'next/server'

// In a real application, this would be stored in a database
// eslint-disable-next-line prefer-const
let documents: any[] = [
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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const search = url.searchParams.get('search')
    const type = url.searchParams.get('type')
    
    let filteredDocs = documents
    
    if (search) {
      filteredDocs = documents.filter(doc => 
        doc.title.toLowerCase().includes(search.toLowerCase()) ||
        doc.content.toLowerCase().includes(search.toLowerCase()) ||
        doc.tags.some((tag: string) => tag.toLowerCase().includes(search.toLowerCase()))
      )
    }
    
    if (type) {
      filteredDocs = filteredDocs.filter(doc => doc.type === type)
    }
    
    return NextResponse.json({
      documents: filteredDocs,
      total: filteredDocs.length
    })
  } catch (error) {
    console.error('Documentation GET error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, content, type = 'markdown', tags = [] } = await request.json()

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      )
    }

    const newDocument = {
      id: Math.random().toString(36).substring(7),
      title,
      content,
      type,
      tags,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    documents.push(newDocument)

    return NextResponse.json({
      success: true,
      document: newDocument
    }, { status: 201 })
  } catch (error) {
    console.error('Documentation POST error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, title, content, type, tags } = await request.json()

    if (!id) {
      return NextResponse.json(
        { error: 'Document ID is required' },
        { status: 400 }
      )
    }

    const docIndex = documents.findIndex(doc => doc.id === id)
    
    if (docIndex === -1) {
      return NextResponse.json(
        { error: 'Document not found' },
        { status: 404 }
      )
    }

    documents[docIndex] = {
      ...documents[docIndex],
      ...(title && { title }),
      ...(content && { content }),
      ...(type && { type }),
      ...(tags && { tags }),
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      document: documents[docIndex]
    })
  } catch (error) {
    console.error('Documentation PUT error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const id = url.searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Document ID is required' },
        { status: 400 }
      )
    }

    const docIndex = documents.findIndex(doc => doc.id === id)
    
    if (docIndex === -1) {
      return NextResponse.json(
        { error: 'Document not found' },
        { status: 404 }
      )
    }

    documents.splice(docIndex, 1)

    return NextResponse.json({
      success: true,
      message: 'Document deleted successfully'
    })
  } catch (error) {
    console.error('Documentation DELETE error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}