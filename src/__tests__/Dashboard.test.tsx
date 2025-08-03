import { render, screen } from '@testing-library/react'
import Dashboard from '../components/Dashboard'

describe('Dashboard', () => {
  it('renders the defrag astrology header', () => {
    render(<Dashboard />)
    
    expect(screen.getByText('Decode the Design. Break the Loop. Return to Signal.')).toBeInTheDocument()
    expect(screen.getByText('The Sacred Rebellion — Built for the Coded Ones')).toBeInTheDocument()
  })

  it('renders all three main tiles', () => {
    render(<Dashboard />)
    
    // MSI Index Tile
    expect(screen.getAllByText('MSI Index').length).toBeGreaterThan(0)
    expect(screen.getAllByText('78.5').length).toBeGreaterThan(0)
    
    // Defrag Status Tile  
    expect(screen.getAllByText('Defrag Status').length).toBeGreaterThan(0)
    expect(screen.getAllByText('67.3%').length).toBeGreaterThan(0)
    
    // Harmonic Convergence Tile
    expect(screen.getAllByText('Harmonic Convergence').length).toBeGreaterThan(0)
    expect(screen.getAllByText('78.5%').length).toBeGreaterThan(0)
  })

  it('renders astrology-specific content', () => {
    render(<Dashboard />)
    
    // Check for astrology-specific terms (using getAllByText due to desktop/mobile duplicates)
    expect(screen.getAllByText('Harmonic Density').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Orbital Coherence').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Temporal Cluster').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Symbolic Recurrence').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Aquarian Gate Activation').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Active Triggers').length).toBeGreaterThan(0)
  })

  it('renders correct percentage values as specified', () => {
    render(<Dashboard />)
    
    // Check specific percentage values from requirements (using getAllByText due to duplicates)
    expect(screen.getAllByText('82%').length).toBeGreaterThan(0) // Harmonic Density
    expect(screen.getAllByText('91%').length).toBeGreaterThan(0) // Orbital Coherence
    expect(screen.getAllByText('73%').length).toBeGreaterThan(0) // Temporal Cluster
    expect(screen.getAllByText('67%').length).toBeGreaterThan(0) // Symbolic Recurrence
    expect(screen.getAllByText('32.7%').length).toBeGreaterThan(0) // Fragmentation
    expect(screen.getAllByText('78.9%').length).toBeGreaterThan(0) // Integration
  })
})