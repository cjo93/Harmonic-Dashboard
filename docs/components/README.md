# Component Documentation

This document provides comprehensive documentation for all React components in the Harmonic Dashboard application.

## Component Architecture

The application follows a modular component architecture organized into the following categories:

- **Layout Components**: Core layout structure (Header, Sidebar, Layout)
- **Feature Components**: Main functionality (Dashboard, Chat, Documentation)
- **UI Components**: Reusable interface elements

## Component Directory Structure

```
src/components/
├── layout/
│   ├── Layout.tsx          # Main layout wrapper
│   ├── Header.tsx          # Top navigation header
│   └── Sidebar.tsx         # Side navigation menu
├── chat/
│   └── Chat.tsx            # Chat interface component
├── documentation/
│   └── Documentation.tsx   # Documentation management
└── Dashboard.tsx           # Main dashboard overview
```

## Layout Components

### Layout

**File**: `src/components/layout/Layout.tsx`

Main layout component that provides the application structure with sidebar and header.

#### Props

```typescript
interface LayoutProps {
  children: React.ReactNode;
}
```

#### Usage

```tsx
import Layout from '@/components/layout/Layout'

export default function App() {
  return (
    <Layout>
      <YourPageContent />
    </Layout>
  )
}
```

#### Features

- Responsive flexbox layout
- Integrated sidebar navigation
- Header with status indicators
- Overflow handling for content areas
- Consistent spacing and styling

---

### Header

**File**: `src/components/layout/Header.tsx`

Top navigation header component displaying current page title and status indicators.

#### Props

No external props (uses internal state from Zustand store)

#### Usage

```tsx
import Header from '@/components/layout/Header'

// Used internally by Layout component
<Header />
```

#### Features

- Dynamic page title display
- Codespace connection status
- GitHub Copilot status indicator
- Responsive design
- Real-time status updates

---

### Sidebar

**File**: `src/components/layout/Sidebar.tsx`

Side navigation component providing access to main application sections.

#### Props

No external props (uses internal state from Zustand store)

#### Usage

```tsx
import Sidebar from '@/components/layout/Sidebar'

// Used internally by Layout component
<Sidebar />
```

#### Features

- Clean, minimal navigation design
- Active page highlighting
- Status indicators for Codespace and Copilot
- Hover effects and smooth transitions
- Branded header with logo

#### Navigation Items

- **Dashboard**: Main overview page
- **Chat**: AI-powered chat interface
- **Documentation**: Documentation management

---

## Feature Components

### Dashboard

**File**: `src/components/Dashboard.tsx`

Main dashboard component displaying statistics, quick actions, and system overview.

#### Props

No external props (uses internal state from Zustand store)

#### Usage

```tsx
import Dashboard from '@/components/Dashboard'

<Dashboard />
```

#### Features

- **Statistics Cards**: Display key metrics
  - Chat message count
  - Documentation count
  - Active development sessions
  - Recent activity
- **Quick Actions**: Fast access to common tasks
- **Status Indicators**: System health and connectivity
- **Recent Activity**: Latest actions and updates

#### Statistics Displayed

```typescript
interface Stat {
  name: string;
  value: string;
  icon: LucideIcon;
  color: string;
  trend: string;
}
```

---

### Chat

**File**: `src/components/chat/Chat.tsx`

Interactive chat interface for AI-powered development assistance.

#### Props

No external props (uses internal state from Zustand store)

#### Usage

```tsx
import Chat from '@/components/chat/Chat'

<Chat />
```

#### Features

- **Message Display**: Threaded conversation view
- **Message Types**: Support for different content types
  - Code snippets with syntax highlighting
  - Documentation responses
  - General assistance
- **Interactive Input**: Real-time message composition
- **Copy Functionality**: Copy code snippets to clipboard
- **Auto-scroll**: Automatic scrolling to latest messages
- **Typing Indicators**: Visual feedback during AI response generation

#### Message Rendering

The component handles different message types:

```typescript
// Code messages with syntax highlighting
{message.metadata?.type === 'code' && (
  <SyntaxHighlighter language="typescript" style={tomorrow}>
    {codeContent}
  </SyntaxHighlighter>
)}

// Documentation with markdown rendering
<ReactMarkdown>{message.content}</ReactMarkdown>
```

---

### Documentation

**File**: `src/components/documentation/Documentation.tsx`

Documentation management interface for creating, editing, and organizing docs.

#### Props

No external props (uses internal state from Zustand store)

#### Usage

```tsx
import Documentation from '@/components/documentation/Documentation'

<Documentation />
```

#### Features

- **Document List**: Organized view of all documentation
- **Search Functionality**: Full-text search across documents
- **Filter Options**: Filter by document type and tags
- **Document Editor**: Create and edit documentation
- **Tag Management**: Organize documents with tags
- **Type Categories**: Support for different document types
  - Markdown documents
  - Code documentation
  - API references

## Common Patterns

### State Management

All components use Zustand for state management:

```tsx
import { useStore } from '@/stores/useStore'

export default function Component() {
  const { currentPage, setCurrentPage, documents } = useStore()
  
  // Component logic
}
```

### Styling

Components use Tailwind CSS with custom design system:

```tsx
// Custom color palette
className="bg-harmonic-500 text-white"

// Responsive design
className="w-full md:w-1/2 lg:w-1/3"

// Interactive states
className="hover:bg-gray-100 focus:ring-2 focus:ring-harmonic-500"
```

### Icon Usage

Lucide React icons are used consistently:

```tsx
import { Home, MessageCircle, BookOpen } from 'lucide-react'

<Home className="w-5 h-5 text-gray-600" />
```

## Testing Components

All components can be tested using React Testing Library:

```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import Dashboard from '@/components/Dashboard'

describe('Dashboard Component', () => {
  it('renders statistics correctly', () => {
    render(<Dashboard />)
    expect(screen.getByText('Chat Messages')).toBeInTheDocument()
  })
})
```

## Accessibility

Components follow accessibility best practices:

- Semantic HTML elements
- ARIA labels and roles
- Keyboard navigation support
- Focus management
- Color contrast compliance

## Performance Considerations

- Components use React best practices for optimization
- Zustand provides efficient state updates
- Lazy loading for heavy components
- Memoization where appropriate
- Minimal re-renders

## Future Enhancements

Planned component improvements:

- [ ] Dark mode support
- [ ] Keyboard shortcuts
- [ ] Drag and drop functionality
- [ ] Advanced search filters
- [ ] Real-time collaboration features
- [ ] Mobile-optimized interfaces

---

For more information, see the [Development Guide](../guides/development.md) or [API Reference](../api/README.md).