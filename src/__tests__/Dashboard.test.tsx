import { render, screen } from '@testing-library/react'
import Dashboard from '../components/Dashboard'

// Mock the enhanced store
jest.mock('../stores/useEnhancedStore', () => ({
  useEnhancedStore: () => ({
    setCurrentPage: jest.fn(),
    messages: [],
    documents: [
      {
        id: '1',
        title: 'Test Doc',
        content: 'Test content',
        type: 'markdown',
        tags: ['test'],
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ],
    projects: [],
    isCodespaceConnected: true,
    isCopilotEnabled: false, // Set to false to match test expectations
    isGitHubConnected: false,
    appStats: {
      totalMessages: 0,
      totalDocuments: 0,
      activeProjects: 0,
      totalProjects: 0,
      copilotUsage: 0,
      lastActivity: null
    },
    updateStats: jest.fn(),
    addDocument: jest.fn(),
    addProject: jest.fn(),
    logActivity: jest.fn(),
  })
}))

// Mock the file processor
jest.mock('../lib/fileProcessor', () => ({
  fileProcessor: {
    processFile: jest.fn(),
  }
}))

// Mock the notification store
jest.mock('../stores/useNotificationStore', () => ({
  useNotificationStore: () => ({
    addNotification: jest.fn(),
    notifications: [],
    unreadCount: 0,
    markAsRead: jest.fn(),
    markAllAsRead: jest.fn(),
    removeNotification: jest.fn(),
    clearAll: jest.fn(),
  })
}))

describe('Dashboard', () => {
  it('renders dashboard header', () => {
    render(<Dashboard />)
    
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText(/Welcome back! Here's an overview/)).toBeInTheDocument()
  })

  it('renders stats grid', () => {
    render(<Dashboard />)
    
    expect(screen.getByText('Chat Messages')).toBeInTheDocument()
    expect(screen.getByText('Documentation')).toBeInTheDocument()
    expect(screen.getByText('Active Projects')).toBeInTheDocument()
    expect(screen.getByText('GitHub Status')).toBeInTheDocument()
  })

  it('renders quick actions section', () => {
    render(<Dashboard />)
    
    expect(screen.getByText('Quick Actions')).toBeInTheDocument()
    expect(screen.getByText('Start Chat')).toBeInTheDocument()
    expect(screen.getByText('Create Document')).toBeInTheDocument()
    expect(screen.getByText('New Project')).toBeInTheDocument()
    expect(screen.getByText('GitHub Setup')).toBeInTheDocument()
  })

  it('renders recent activity', () => {
    render(<Dashboard />)
    
    expect(screen.getByText('Recent Activity')).toBeInTheDocument()
  })

  it('displays system status', () => {
    render(<Dashboard />)
    
    expect(screen.getByText('Codespace Active')).toBeInTheDocument()
    expect(screen.getByText('Copilot Inactive')).toBeInTheDocument()
  })
})