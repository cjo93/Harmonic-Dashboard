'use client'

import { useState } from 'react'

export default function HarmonicConvergenceTile() {
  const [activeTab, setActiveTab] = useState('Current')
  
  const tabs = ['Current', 'Upcoming', 'Timeline']
  
  const opportunities = [
    'Enhanced intuitive clarity',
    'Accelerated manifestation',
    'Deeper cosmic connection'
  ]

  const challenges = [
    'Information overload risk',
    'Grounding difficulty',
    'Reality distortion potential'
  ]

  const upcomingEvents = [
    { date: 'Feb 20, 2024', event: 'Jupiter-Saturn harmony' },
    { date: 'Mar 15, 2024', event: 'Venus-Neptune alignment' },
    { date: 'Apr 2, 2024', event: 'Mercury retrograde release' }
  ]

  return (
    <div className="bg-defrag-card border border-defrag-border rounded-lg p-6 h-full">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-defrag-text-primary mb-2">
          Harmonic Convergence
        </h3>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-defrag-accent-purple">78.5%</span>
          <span className="text-defrag-text-secondary">(Resonance)</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-6 bg-defrag-border rounded-lg p-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-all duration-200 ${
              activeTab === tab
                ? 'bg-defrag-card text-defrag-text-primary shadow-sm'
                : 'text-defrag-text-secondary hover:text-defrag-text-primary'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Current Tab Content */}
      {activeTab === 'Current' && (
        <>
          {/* Aquarian Gate Activation */}
          <div className="mb-6 p-4 bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-lg border border-purple-500/30">
            <div className="flex items-center gap-2 mb-2">
              <span className="glyph glyph-aquarian text-defrag-accent-purple text-lg"></span>
              <h4 className="text-defrag-text-primary font-medium">Aquarian Gate Activation</h4>
            </div>
            <p className="text-defrag-text-secondary text-sm mb-2">
              Feb 10 - Feb 25, 2024
            </p>
            <p className="text-defrag-text-secondary text-xs">
              A powerful cosmic gateway opening enhanced psychic sensitivity and interdimensional awareness. 
              Optimal for breakthrough consciousness work and reality restructuring.
            </p>
          </div>

          {/* Opportunities */}
          <div className="mb-6">
            <h4 className="text-defrag-text-primary font-medium mb-3">Opportunities</h4>
            <div className="space-y-2">
              {opportunities.map((opportunity, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-defrag-accent-green rounded-full"></div>
                  <span className="text-defrag-text-secondary text-sm">{opportunity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Challenges */}
          <div className="pt-4 border-t border-defrag-border">
            <h4 className="text-defrag-text-primary font-medium mb-3">Challenges</h4>
            <div className="space-y-2">
              {challenges.map((challenge, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-defrag-accent-red rounded-full"></div>
                  <span className="text-defrag-text-secondary text-sm">{challenge}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Upcoming Tab Content */}
      {activeTab === 'Upcoming' && (
        <div className="space-y-4">
          <h4 className="text-defrag-text-primary font-medium">Upcoming Convergences</h4>
          {upcomingEvents.map((event, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-defrag-border/50 rounded-lg">
              <div>
                <span className="text-defrag-text-primary text-sm font-medium">{event.event}</span>
                <p className="text-defrag-text-secondary text-xs">{event.date}</p>
              </div>
              <span className="glyph glyph-temporal text-defrag-accent-gold"></span>
            </div>
          ))}
        </div>
      )}

      {/* Timeline Tab Content */}
      {activeTab === 'Timeline' && (
        <div className="space-y-4">
          <h4 className="text-defrag-text-primary font-medium">Convergence Timeline</h4>
          <div className="relative">
            <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-defrag-border"></div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-4 h-4 bg-defrag-accent-purple rounded-full border-2 border-defrag-bg relative z-10"></div>
                <div>
                  <span className="text-defrag-text-primary text-sm">Current Phase</span>
                  <p className="text-defrag-text-secondary text-xs">Aquarian Gate Active</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-4 h-4 bg-defrag-border rounded-full border-2 border-defrag-bg relative z-10"></div>
                <div>
                  <span className="text-defrag-text-secondary text-sm">Next Phase</span>
                  <p className="text-defrag-text-muted text-xs">Harmonic Stabilization</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-4 h-4 bg-defrag-border rounded-full border-2 border-defrag-bg relative z-10"></div>
                <div>
                  <span className="text-defrag-text-secondary text-sm">Final Phase</span>
                  <p className="text-defrag-text-muted text-xs">Integration Complete</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}