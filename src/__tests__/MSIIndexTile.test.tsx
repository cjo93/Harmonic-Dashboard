import { render, screen } from '@testing-library/react'
import MSIIndexTile from '../components/defrag/MSIIndexTile'

describe('MSIIndexTile', () => {
  it('renders MSI Index header and score', () => {
    render(<MSIIndexTile />)
    
    expect(screen.getByText('MSI Index')).toBeInTheDocument()
    expect(screen.getByText('78.5')).toBeInTheDocument()
    expect(screen.getByText('(Initiation phase)')).toBeInTheDocument()
  })

  it('renders all four metrics with correct percentages', () => {
    render(<MSIIndexTile />)
    
    expect(screen.getByText('Harmonic Density')).toBeInTheDocument()
    expect(screen.getByText('82%')).toBeInTheDocument()
    
    expect(screen.getByText('Orbital Coherence')).toBeInTheDocument()
    expect(screen.getByText('91%')).toBeInTheDocument()
    
    expect(screen.getByText('Temporal Cluster')).toBeInTheDocument()
    expect(screen.getByText('73%')).toBeInTheDocument()
    
    expect(screen.getByText('Symbolic Recurrence')).toBeInTheDocument()
    expect(screen.getByText('67%')).toBeInTheDocument()
  })

  it('renders active triggers section', () => {
    render(<MSIIndexTile />)
    
    expect(screen.getByText('Active Triggers')).toBeInTheDocument()
    expect(screen.getByText('Mercury conjunct Neptune')).toBeInTheDocument()
    expect(screen.getByText('Saturn trine Pluto')).toBeInTheDocument()
    expect(screen.getByText('Mars square Jupiter')).toBeInTheDocument()
  })

  it('renders next significant date section', () => {
    render(<MSIIndexTile />)
    
    expect(screen.getByText('Next Significant Date')).toBeInTheDocument()
    expect(screen.getByText('Solar Eclipse Transit')).toBeInTheDocument()
    expect(screen.getByText('Feb 15, 2024')).toBeInTheDocument()
  })
})