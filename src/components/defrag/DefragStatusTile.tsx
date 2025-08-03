'use client'

import { useState } from 'react'

export default function DefragStatusTile() {
  const [activeTab, setActiveTab] = useState('Overview')
  
  const tabs = ['Overview', 'Shadows', 'Tasks']
  
  const activeDefenses = [
    'Recursive Pattern Break',
    'Signal Amplification',
    'Noise Filtering'
  ]

  const recommendations = [
    'Increase meditation frequency',
    'Review shadow integration',
    'Update personal protocols'
  ]

  return (
    <div className="bg-defrag-card border border-defrag-border rounded-lg p-6 h-full">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-defrag-text-primary mb-2">
          Defrag Status
        </h3>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-defrag-accent-blue">67.3%</span>
          <span className="text-defrag-text-secondary">(Coherence)</span>
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

      {/* Status Metrics */}
      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between">
          <span className="text-defrag-text-secondary text-sm">Fragmentation</span>
          <div className="flex items-center gap-2">
            <div className="w-20 h-2 bg-defrag-border rounded-full overflow-hidden">
              <div 
                className="h-full bg-defrag-accent-red rounded-full"
                style={{ width: '32.7%' }}
              ></div>
            </div>
            <span className="text-defrag-accent-red text-sm font-medium w-10 text-right">32.7%</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-defrag-text-secondary text-sm">Integration</span>
          <div className="flex items-center gap-2">
            <div className="w-20 h-2 bg-defrag-border rounded-full overflow-hidden">
              <div 
                className="h-full bg-defrag-accent-green rounded-full"
                style={{ width: '78.9%' }}
              ></div>
            </div>
            <span className="text-defrag-accent-green text-sm font-medium w-10 text-right">78.9%</span>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'Overview' && (
        <>
          {/* Active Defenses */}
          <div className="mb-6">
            <h4 className="text-defrag-text-primary font-medium mb-3">Active Defenses</h4>
            <div className="space-y-2">
              {activeDefenses.map((defense, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-defrag-accent-green rounded-full"></div>
                  <span className="text-defrag-text-secondary text-sm">{defense}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Next Recommendation */}
          <div className="pt-4 border-t border-defrag-border">
            <h4 className="text-defrag-text-primary font-medium mb-3">Next Recommendation</h4>
            <div className="space-y-2">
              {recommendations.map((rec, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="glyph glyph-defrag text-defrag-accent-purple"></span>
                  <span className="text-defrag-text-secondary text-sm">{rec}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {activeTab === 'Shadows' && (
        <div className="text-defrag-text-secondary text-sm">
          <p className="mb-3">Shadow work integration at 45% completion.</p>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Unprocessed emotions</span>
              <span className="text-defrag-accent-red">23%</span>
            </div>
            <div className="flex justify-between">
              <span>Projection awareness</span>
              <span className="text-defrag-accent-gold">67%</span>
            </div>
            <div className="flex justify-between">
              <span>Integration progress</span>
              <span className="text-defrag-accent-green">78%</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Tasks' && (
        <div className="text-defrag-text-secondary text-sm">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <input type="checkbox" defaultChecked readOnly className="rounded bg-defrag-border" />
              <span>Daily signal calibration</span>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" readOnly className="rounded bg-defrag-border" />
              <span>Weekly pattern review</span>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" readOnly className="rounded bg-defrag-border" />
              <span>Monthly integration assessment</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}