# API Reference

This document provides comprehensive documentation for all API endpoints available in the Harmonic Dashboard application.

## Base URL

```
http://localhost:3000/api
```

## Authentication

Currently, the API does not require authentication. In production environments, you should implement proper authentication and authorization mechanisms.

## Response Format

All API responses follow a consistent JSON format:

```json
{
  "success": boolean,
  "data": object | array,
  "error": string | null,
  "timestamp": "ISO 8601 timestamp"
}
```

## Error Handling

The API uses standard HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `405` - Method Not Allowed
- `500` - Internal Server Error

Error responses include descriptive error messages:

```json
{
  "error": "Detailed error message",
  "status": 400
}
```

## Endpoints

### Chat API

#### POST /api/chat

Send a message to the AI-powered chat assistant.

**Request Body:**
```json
{
  "message": "string (required)",
  "type": "general | code | documentation (optional, default: general)"
}
```

**Example Request:**
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "How do I create a React component?",
    "type": "code"
  }'
```

**Response:**
```json
{
  "response": "Here's how to create a React component: ...",
  "type": "code",
  "timestamp": "2024-01-31T12:00:00.000Z"
}
```

**Response Types:**
- `code` - Programming-related responses with code examples
- `documentation` - Documentation and guide-related responses
- `general` - General development assistance

### Documentation API

#### GET /api/documentation

Retrieve documentation entries with optional filtering.

**Query Parameters:**
- `search` (optional) - Search term for title, content, or tags
- `type` (optional) - Filter by document type (`markdown`, `code`, `api`)

**Example Request:**
```bash
curl "http://localhost:3000/api/documentation?search=react&type=code"
```

**Response:**
```json
{
  "documents": [
    {
      "id": "string",
      "title": "string",
      "content": "string",
      "type": "markdown | code | api",
      "tags": ["string"],
      "createdAt": "ISO 8601 timestamp",
      "updatedAt": "ISO 8601 timestamp"
    }
  ],
  "total": number
}
```

#### POST /api/documentation

Create a new documentation entry.

**Request Body:**
```json
{
  "title": "string (required)",
  "content": "string (required)",
  "type": "markdown | code | api (optional, default: markdown)",
  "tags": ["string"] (optional, default: [])
}
```

**Example Request:**
```bash
curl -X POST http://localhost:3000/api/documentation \
  -H "Content-Type: application/json" \
  -d '{
    "title": "React Component Guide",
    "content": "# Creating React Components\n\nThis guide shows...",
    "type": "code",
    "tags": ["react", "components", "typescript"]
  }'
```

**Response:**
```json
{
  "success": true,
  "document": {
    "id": "generated-id",
    "title": "React Component Guide",
    "content": "# Creating React Components...",
    "type": "code",
    "tags": ["react", "components", "typescript"],
    "createdAt": "2024-01-31T12:00:00.000Z",
    "updatedAt": "2024-01-31T12:00:00.000Z"
  }
}
```

#### PUT /api/documentation

Update an existing documentation entry.

**Request Body:**
```json
{
  "id": "string (required)",
  "title": "string (optional)",
  "content": "string (optional)",
  "type": "markdown | code | api (optional)",
  "tags": ["string"] (optional)
}
```

**Example Request:**
```bash
curl -X PUT http://localhost:3000/api/documentation \
  -H "Content-Type: application/json" \
  -d '{
    "id": "doc-123",
    "title": "Updated React Component Guide",
    "content": "# Updated Creating React Components..."
  }'
```

**Response:**
```json
{
  "success": true,
  "document": {
    "id": "doc-123",
    "title": "Updated React Component Guide",
    "content": "# Updated Creating React Components...",
    "type": "code",
    "tags": ["react", "components", "typescript"],
    "createdAt": "2024-01-31T12:00:00.000Z",
    "updatedAt": "2024-01-31T12:05:00.000Z"
  }
}
```

#### DELETE /api/documentation

Delete a documentation entry.

**Query Parameters:**
- `id` (required) - The ID of the document to delete

**Example Request:**
```bash
curl -X DELETE "http://localhost:3000/api/documentation?id=doc-123"
```

**Response:**
```json
{
  "success": true,
  "message": "Document deleted successfully"
}
```

## Data Models

### ChatMessage

```typescript
interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  metadata?: {
    type?: 'code' | 'documentation' | 'general';
    codeLanguage?: string;
    references?: string[];
  };
}
```

### DocumentationItem

```typescript
interface DocumentationItem {
  id: string;
  title: string;
  content: string;
  type: 'markdown' | 'code' | 'api';
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  author?: string;
}
```

## Rate Limiting

Currently, there are no rate limits implemented. In production, consider implementing:

- Per-IP rate limiting
- User-based rate limiting
- Endpoint-specific limits

## Webhooks

The current implementation does not support webhooks. Future versions may include:

- Document creation/update notifications
- Chat message events
- System status updates

## SDK and Client Libraries

Currently, no official SDK is available. You can interact with the API using:

- Standard HTTP clients (fetch, axios, curl)
- Next.js API routes for server-side integration
- React Query for client-side data fetching

## Changelog

### v1.0.0
- Initial API implementation
- Chat endpoint with AI integration
- Full CRUD operations for documentation
- Search and filtering capabilities

---

For more information, see the [Development Guide](../guides/development.md) or [Component Documentation](../components/README.md).