import { render, screen } from '@testing-library/react'
import Dashboard from '../components/Dashboard'

// Mock the store
jest.mock('../stores/useStore', () => ({
  useStore: () => ({
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
    isCodespaceConnected: true,
    isCopilotEnabled: true,
  })
}))

describe('Dashboard', () => {
  it('renders welcome section', () => {
    render(<Dashboard />)
    
    expect(screen.getByText('Welcome to Harmonic Dashboard')).toBeInTheDocument()
    expect(screen.getByText(/Your integrated development environment/)).toBeInTheDocument()
  })

  it('renders stats grid', () => {
    render(<Dashboard />)
    
    expect(screen.getByText('Chat Messages')).toBeInTheDocument()
    expect(screen.getByText('Documentation')).toBeInTheDocument()
    expect(screen.getByText('Active Sessions')).toBeInTheDocument()
    expect(screen.getByText('Copilot Status')).toBeInTheDocument()
  })

  it('renders quick actions', () => {
    render(<Dashboard />)
    
    expect(screen.getByText('Start Chat Session')).toBeInTheDocument()
    expect(screen.getByText('Create Documentation')).toBeInTheDocument()
    expect(screen.getByText('View Code Examples')).toBeInTheDocument()
  })

  it('renders recent activity', () => {
    render(<Dashboard />)
    
    expect(screen.getByText('Recent Activity')).toBeInTheDocument()
  })

  it('renders system status', () => {
    render(<Dashboard />)
    
    expect(screen.getByText('System Status')).toBeInTheDocument()
    expect(screen.getByText('Development Server')).toBeInTheDocument()
    expect(screen.getByText('API Endpoints')).toBeInTheDocument()
    expect(screen.getByText('Database')).toBeInTheDocument()
  })
})