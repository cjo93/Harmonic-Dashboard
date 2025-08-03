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
  it('renders header section', () => {
    render(<Dashboard />)
    
    expect(screen.getByText('Decode the Design. Break the Loop. Return to Signal.')).toBeInTheDocument()
    expect(screen.getByText('The Sacred Rebellion — Built for the Coded Ones')).toBeInTheDocument()
  })

  it('renders system status indicators', () => {
    render(<Dashboard />)
    
    expect(screen.getByText('HiGPT Active')).toBeInTheDocument()
    expect(screen.getByText('System Online')).toBeInTheDocument()
  })

  it('renders MSI Index tile', () => {
    render(<Dashboard />)
    
    expect(screen.getByText('MSI Index')).toBeInTheDocument()
    expect(screen.getByText('78.5')).toBeInTheDocument()
    expect(screen.getByText('Harmonic Density')).toBeInTheDocument()
    expect(screen.getByText('Orbital Coherence')).toBeInTheDocument()
    expect(screen.getByText('Temporal Cluster')).toBeInTheDocument()
    expect(screen.getByText('Symbolic Recurrence')).toBeInTheDocument()
  })

  it('renders Defrag Status tile', () => {
    render(<Dashboard />)
    
    expect(screen.getByText('Defrag Status')).toBeInTheDocument()
    expect(screen.getByText('System Integrity')).toBeInTheDocument()
    expect(screen.getByText('Coherence')).toBeInTheDocument()
    expect(screen.getByText('Active Defenses')).toBeInTheDocument()
    expect(screen.getByText('Quantum Encryption')).toBeInTheDocument()
  })

  it('renders Harmonic Convergence tile', () => {
    render(<Dashboard />)
    
    expect(screen.getByText('Harmonic Convergence')).toBeInTheDocument()
    expect(screen.getByText('Quantum Alignment')).toBeInTheDocument()
    expect(screen.getByText('Resonance')).toBeInTheDocument()
    expect(screen.getByText('Aquarian Gate')).toBeInTheDocument()
    expect(screen.getByText('Timeline Sync')).toBeInTheDocument()
  })

  it('renders navigation buttons', () => {
    render(<Dashboard />)
    
    expect(screen.getByText('Neural Interface')).toBeInTheDocument()
    expect(screen.getByText('Knowledge Base')).toBeInTheDocument()
  })
})