import { render, screen, fireEvent } from '@testing-library/react'
import DefragStatusTile from '../components/defrag/DefragStatusTile'

describe('DefragStatusTile', () => {
  it('renders Defrag Status header and score', () => {
    render(<DefragStatusTile />)
    
    expect(screen.getByText('Defrag Status')).toBeInTheDocument()
    expect(screen.getByText('67.3%')).toBeInTheDocument()
    expect(screen.getByText('(Coherence)')).toBeInTheDocument()
  })

  it('renders navigation tabs', () => {
    render(<DefragStatusTile />)
    
    expect(screen.getByText('Overview')).toBeInTheDocument()
    expect(screen.getByText('Shadows')).toBeInTheDocument()
    expect(screen.getByText('Tasks')).toBeInTheDocument()
  })

  it('renders status metrics with correct percentages', () => {
    render(<DefragStatusTile />)
    
    expect(screen.getByText('Fragmentation')).toBeInTheDocument()
    expect(screen.getByText('32.7%')).toBeInTheDocument()
    
    expect(screen.getByText('Integration')).toBeInTheDocument()
    expect(screen.getByText('78.9%')).toBeInTheDocument()
  })

  it('shows Overview tab content by default', () => {
    render(<DefragStatusTile />)
    
    expect(screen.getByText('Active Defenses')).toBeInTheDocument()
    expect(screen.getByText('Recursive Pattern Break')).toBeInTheDocument()
    expect(screen.getByText('Signal Amplification')).toBeInTheDocument()
    expect(screen.getByText('Noise Filtering')).toBeInTheDocument()
    
    expect(screen.getByText('Next Recommendation')).toBeInTheDocument()
    expect(screen.getByText('Increase meditation frequency')).toBeInTheDocument()
  })

  it('switches to Shadows tab when clicked', () => {
    render(<DefragStatusTile />)
    
    const shadowsTab = screen.getByText('Shadows')
    fireEvent.click(shadowsTab)
    
    expect(screen.getByText('Shadow work integration at 45% completion.')).toBeInTheDocument()
    expect(screen.getByText('Unprocessed emotions')).toBeInTheDocument()
    expect(screen.getByText('23%')).toBeInTheDocument()
  })

  it('switches to Tasks tab when clicked', () => {
    render(<DefragStatusTile />)
    
    const tasksTab = screen.getByText('Tasks')
    fireEvent.click(tasksTab)
    
    expect(screen.getByText('Daily signal calibration')).toBeInTheDocument()
    expect(screen.getByText('Weekly pattern review')).toBeInTheDocument()
    expect(screen.getByText('Monthly integration assessment')).toBeInTheDocument()
  })
})