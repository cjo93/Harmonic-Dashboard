# Development Guide

This comprehensive guide covers everything you need to know for developing and contributing to Harmonic Dashboard.

## Development Environment Setup

### Prerequisites

- **Node.js 20+**: Required for Next.js 15
- **npm 10+**: Package manager
- **Git**: Version control
- **VS Code**: Recommended editor (with extensions)

### Recommended VS Code Extensions

```json
{
  "recommendations": [
    "ms-vscode.vscode-typescript-next",
    "github.copilot",
    "github.copilot-chat",
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-eslint",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

### Local Development Setup

1. **Clone and Install**:
   ```bash
   git clone https://github.com/cjo93/Harmonic-Dashboard.git
   cd Harmonic-Dashboard
   npm install
   ```

2. **Environment Configuration**:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your settings
   ```

3. **Start Development**:
   ```bash
   npm run dev
   ```

## Project Structure

### Directory Organization

```
src/
├── app/                     # Next.js App Router
│   ├── api/                # API routes
│   │   ├── chat/           # Chat endpoints
│   │   └── documentation/  # Doc endpoints
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/             # React components
│   ├── layout/            # Layout components
│   │   ├── Layout.tsx     # Main layout wrapper
│   │   ├── Header.tsx     # Header component
│   │   └── Sidebar.tsx    # Sidebar navigation
│   ├── chat/              # Chat components
│   │   └── Chat.tsx       # Chat interface
│   ├── documentation/     # Documentation components
│   │   └── Documentation.tsx
│   └── Dashboard.tsx      # Dashboard component
├── stores/                # State management
│   └── useStore.ts        # Zustand store
├── types/                 # TypeScript definitions
│   └── index.ts           # Type definitions
├── lib/                   # Utilities
│   └── utils.ts           # Helper functions
└── styles/                # Additional styles
```

### File Naming Conventions

- **Components**: PascalCase (e.g., `Dashboard.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useStore.ts`)
- **Utilities**: camelCase (e.g., `utils.ts`)
- **Types**: camelCase with descriptive names (e.g., `chatTypes.ts`)
- **API Routes**: lowercase with hyphens (e.g., `chat/route.ts`)

## Development Workflow

### 1. Feature Development Process

```bash
# 1. Create feature branch
git checkout -b feature/your-feature-name

# 2. Develop your feature
# - Write code
# - Add tests
# - Update documentation

# 3. Test your changes
npm test
npm run lint
npm run build

# 4. Commit your changes
git add .
git commit -m "feat: add your feature description"

# 5. Push and create PR
git push origin feature/your-feature-name
```

### 2. Code Quality Standards

#### TypeScript Usage

- **Strict Mode**: All code must be TypeScript with strict mode enabled
- **Type Definitions**: Create interfaces for all data structures
- **Generic Types**: Use generics for reusable components

Example:
```typescript
// Good: Well-typed component
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  label, 
  onClick, 
  variant = 'primary',
  disabled = false 
}) => {
  // Implementation
}

// Good: Type-safe store
interface StoreState {
  messages: ChatMessage[];
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
}
```

#### React Best Practices

- **Functional Components**: Use function components with hooks
- **Custom Hooks**: Extract reusable logic into custom hooks
- **Memoization**: Use `useMemo` and `useCallback` when appropriate
- **Error Boundaries**: Implement error boundaries for robust UX

Example:
```typescript
// Good: Custom hook for API calls
const useChatAPI = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  const sendMessage = useCallback(async (message: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });
      return await response.json();
    } catch (error) {
      console.error('Chat API error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  return { sendMessage, isLoading };
};
```

### 3. State Management Guidelines

#### Zustand Store Structure

```typescript
// stores/useStore.ts
interface Store {
  // State
  currentPage: string;
  messages: ChatMessage[];
  
  // Actions
  setCurrentPage: (page: string) => void;
  addMessage: (message: ChatMessage) => void;
}

export const useStore = create<Store>((set) => ({
  // Initial state
  currentPage: 'dashboard',
  messages: [],
  
  // Actions
  setCurrentPage: (page) => set({ currentPage: page }),
  addMessage: (message) => set((state) => ({
    messages: [...state.messages, message]
  })),
}));
```

#### Store Best Practices

- **Single Store**: Use one main store for simplicity
- **Normalized State**: Keep data flat and normalized
- **Action Creators**: Create specific actions for state updates
- **Selectors**: Use selectors for computed values

### 4. Styling Guidelines

#### Tailwind CSS Usage

```typescript
// Good: Semantic class combinations
const buttonClasses = cn(
  "px-4 py-2 rounded-lg font-medium transition-colors",
  "focus:outline-none focus:ring-2 focus:ring-offset-2",
  variant === 'primary' 
    ? "bg-harmonic-500 text-white hover:bg-harmonic-600 focus:ring-harmonic-500"
    : "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500",
  disabled && "opacity-50 cursor-not-allowed"
);

// Good: Responsive design
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
```

#### Custom CSS

- **Minimal Custom CSS**: Prefer Tailwind utilities
- **Component-Specific Styles**: Use CSS modules for component styles
- **Global Styles**: Only for truly global styles in `globals.css`

## Testing Strategy

### Unit Tests

```typescript
// __tests__/Dashboard.test.tsx
import { render, screen } from '@testing-library/react';
import Dashboard from '@/components/Dashboard';

describe('Dashboard Component', () => {
  it('renders dashboard title', () => {
    render(<Dashboard />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });
  
  it('displays statistics cards', () => {
    render(<Dashboard />);
    expect(screen.getByText('Chat Messages')).toBeInTheDocument();
    expect(screen.getByText('Documentation')).toBeInTheDocument();
  });
});
```

### Integration Tests

```typescript
// __tests__/api/chat.test.ts
import { POST } from '@/app/api/chat/route';

describe('/api/chat', () => {
  it('returns valid response for code request', async () => {
    const request = new Request('http://localhost:3000/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message: 'Create a React component' })
    });
    
    const response = await POST(request);
    const data = await response.json();
    
    expect(response.status).toBe(200);
    expect(data.type).toBe('code');
    expect(data.response).toContain('React component');
  });
});
```

### Test Commands

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test
npm test -- Dashboard.test.tsx
```

## API Development

### Creating New Endpoints

1. **Create Route File**:
   ```typescript
   // app/api/your-endpoint/route.ts
   import { NextRequest, NextResponse } from 'next/server';
   
   export async function GET(request: NextRequest) {
     // Implementation
   }
   
   export async function POST(request: NextRequest) {
     // Implementation
   }
   ```

2. **Add Type Definitions**:
   ```typescript
   // types/api.ts
   export interface YourEndpointRequest {
     field: string;
   }
   
   export interface YourEndpointResponse {
     success: boolean;
     data: any;
   }
   ```

3. **Implement Error Handling**:
   ```typescript
   export async function POST(request: NextRequest) {
     try {
       const body = await request.json();
       
       // Validation
       if (!body.field) {
         return NextResponse.json(
           { error: 'Field is required' },
           { status: 400 }
         );
       }
       
       // Process request
       const result = await processRequest(body);
       
       return NextResponse.json({
         success: true,
         data: result
       });
     } catch (error) {
       console.error('API Error:', error);
       return NextResponse.json(
         { error: 'Internal server error' },
         { status: 500 }
       );
     }
   }
   ```

## Performance Guidelines

### React Performance

- **Minimize Re-renders**: Use `React.memo` for expensive components
- **Optimize Context**: Split contexts by update frequency
- **Lazy Loading**: Use `React.lazy` for route-based code splitting

### Bundle Optimization

- **Dynamic Imports**: Load heavy libraries dynamically
- **Tree Shaking**: Ensure proper ES module usage
- **Bundle Analysis**: Use `@next/bundle-analyzer`

```typescript
// Good: Dynamic import for heavy libraries
const HeavyComponent = lazy(() => import('./HeavyComponent'));

// Good: Dynamic library import
const processData = async (data: any) => {
  const { heavyLibrary } = await import('heavy-library');
  return heavyLibrary.process(data);
};
```

## Debugging

### Development Tools

1. **React Developer Tools**: Browser extension
2. **Next.js Dev Tools**: Built-in debugging
3. **VS Code Debugger**: Integrated debugging
4. **Network Tab**: API request debugging

### Logging Strategy

```typescript
// Good: Structured logging
const logger = {
  info: (message: string, data?: any) => {
    console.log(`[INFO] ${message}`, data);
  },
  error: (message: string, error?: Error) => {
    console.error(`[ERROR] ${message}`, error);
  }
};

// Usage
logger.info('User action', { action: 'create_document', userId: '123' });
logger.error('API call failed', error);
```

## Git Workflow

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
feat: add new chat interface
fix: resolve sidebar navigation issue
docs: update API documentation
style: format code with prettier
refactor: restructure component hierarchy
test: add dashboard component tests
chore: update dependencies
```

### Branch Naming

```bash
feature/chat-interface
bugfix/sidebar-navigation
hotfix/critical-security-issue
docs/api-documentation
```

### Pull Request Process

1. **Create Feature Branch**: From `main`
2. **Develop Feature**: Following coding standards
3. **Write Tests**: Ensure good coverage
4. **Update Documentation**: Keep docs current
5. **Create PR**: With detailed description
6. **Code Review**: Address feedback
7. **Merge**: After approval and CI passing

---

For deployment information, see the [Deployment Guide](../deployment/README.md) or [Contributing Guidelines](../contributing/README.md).