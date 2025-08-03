import { render, screen, fireEvent } from '@testing-library/react'
import HarmonicConvergenceTile from '../components/defrag/HarmonicConvergenceTile'

describe('HarmonicConvergenceTile', () => {
  it('renders Harmonic Convergence header and score', () => {
    render(<HarmonicConvergenceTile />)
    
    expect(screen.getByText('Harmonic Convergence')).toBeInTheDocument()
    expect(screen.getByText('78.5%')).toBeInTheDocument()
    expect(screen.getByText('(Resonance)')).toBeInTheDocument()
  })

  it('renders navigation tabs', () => {
    render(<HarmonicConvergenceTile />)
    
    expect(screen.getByText('Current')).toBeInTheDocument()
    expect(screen.getByText('Upcoming')).toBeInTheDocument()
    expect(screen.getByText('Timeline')).toBeInTheDocument()
  })

  it('shows Current tab content by default', () => {
    render(<HarmonicConvergenceTile />)
    
    expect(screen.getByText('Aquarian Gate Activation')).toBeInTheDocument()
    expect(screen.getByText('Feb 10 - Feb 25, 2024')).toBeInTheDocument()
    expect(screen.getByText(/A powerful cosmic gateway opening/)).toBeInTheDocument()
    
    expect(screen.getByText('Opportunities')).toBeInTheDocument()
    expect(screen.getByText('Enhanced intuitive clarity')).toBeInTheDocument()
    expect(screen.getByText('Accelerated manifestation')).toBeInTheDocument()
    expect(screen.getByText('Deeper cosmic connection')).toBeInTheDocument()
    
    expect(screen.getByText('Challenges')).toBeInTheDocument()
    expect(screen.getByText('Information overload risk')).toBeInTheDocument()
    expect(screen.getByText('Grounding difficulty')).toBeInTheDocument()
    expect(screen.getByText('Reality distortion potential')).toBeInTheDocument()
  })

  it('switches to Upcoming tab when clicked', () => {
    render(<HarmonicConvergenceTile />)
    
    const upcomingTab = screen.getByText('Upcoming')
    fireEvent.click(upcomingTab)
    
    expect(screen.getByText('Upcoming Convergences')).toBeInTheDocument()
    expect(screen.getByText('Jupiter-Saturn harmony')).toBeInTheDocument()
    expect(screen.getByText('Feb 20, 2024')).toBeInTheDocument()
    expect(screen.getByText('Venus-Neptune alignment')).toBeInTheDocument()
    expect(screen.getByText('Mercury retrograde release')).toBeInTheDocument()
  })

  it('switches to Timeline tab when clicked', () => {
    render(<HarmonicConvergenceTile />)
    
    const timelineTab = screen.getByText('Timeline')
    fireEvent.click(timelineTab)
    
    expect(screen.getByText('Convergence Timeline')).toBeInTheDocument()
    expect(screen.getByText('Current Phase')).toBeInTheDocument()
    expect(screen.getByText('Aquarian Gate Active')).toBeInTheDocument()
    expect(screen.getByText('Next Phase')).toBeInTheDocument()
    expect(screen.getByText('Harmonic Stabilization')).toBeInTheDocument()
    expect(screen.getByText('Final Phase')).toBeInTheDocument()
    expect(screen.getByText('Integration Complete')).toBeInTheDocument()
  })
})