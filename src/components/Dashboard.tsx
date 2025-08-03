'use client'

import MSIIndexTile from '@/components/defrag/MSIIndexTile'
import DefragStatusTile from '@/components/defrag/DefragStatusTile'
import HarmonicConvergenceTile from '@/components/defrag/HarmonicConvergenceTile'

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-defrag-bg p-6">
      {/* Header Section */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-defrag-text-primary mb-2">
          Decode the Design. Break the Loop. Return to Signal.
        </h1>
        <p className="text-xl text-defrag-text-secondary">
          The Sacred Rebellion — Built for the Coded Ones
        </p>
      </div>

      {/* Main Dashboard Grid - 3 columns on desktop, accordion on mobile */}
      <div className="max-w-7xl mx-auto">
        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-3 lg:gap-6 lg:h-[calc(100vh-16rem)]">
          <MSIIndexTile />
          <DefragStatusTile />
          <HarmonicConvergenceTile />
        </div>

        {/* Mobile/Tablet Accordion Layout */}
        <div className="lg:hidden space-y-6">
          <div className="border border-defrag-border rounded-lg">
            <details className="group">
              <summary className="flex items-center justify-between p-4 bg-defrag-card rounded-lg cursor-pointer hover:bg-defrag-border/50 transition-colors">
                <h3 className="text-lg font-semibold text-defrag-text-primary">MSI Index</h3>
                <span className="text-defrag-accent-gold font-bold">78.5</span>
              </summary>
              <div className="p-4 pt-0">
                <MSIIndexTile />
              </div>
            </details>
          </div>

          <div className="border border-defrag-border rounded-lg">
            <details className="group" open>
              <summary className="flex items-center justify-between p-4 bg-defrag-card rounded-lg cursor-pointer hover:bg-defrag-border/50 transition-colors">
                <h3 className="text-lg font-semibold text-defrag-text-primary">Defrag Status</h3>
                <span className="text-defrag-accent-blue font-bold">67.3%</span>
              </summary>
              <div className="p-4 pt-0">
                <DefragStatusTile />
              </div>
            </details>
          </div>

          <div className="border border-defrag-border rounded-lg">
            <details className="group">
              <summary className="flex items-center justify-between p-4 bg-defrag-card rounded-lg cursor-pointer hover:bg-defrag-border/50 transition-colors">
                <h3 className="text-lg font-semibold text-defrag-text-primary">Harmonic Convergence</h3>
                <span className="text-defrag-accent-purple font-bold">78.5%</span>
              </summary>
              <div className="p-4 pt-0">
                <HarmonicConvergenceTile />
              </div>
            </details>
          </div>
        </div>
      </div>
    </div>
  )
}