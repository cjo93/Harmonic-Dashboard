'use client'

export default function MSIIndexTile() {
  const metrics = [
    { name: 'Harmonic Density', value: 82, glyph: 'glyph-harmonic' },
    { name: 'Orbital Coherence', value: 91, glyph: 'glyph-orbital' },
    { name: 'Temporal Cluster', value: 73, glyph: 'glyph-temporal' },
    { name: 'Symbolic Recurrence', value: 67, glyph: 'glyph-symbolic' },
  ]

  const activeTriggers = [
    'Mercury conjunct Neptune',
    'Saturn trine Pluto',
    'Mars square Jupiter'
  ]

  return (
    <div className="bg-defrag-card border border-defrag-border rounded-lg p-6 h-full">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-defrag-text-primary mb-2">
          MSI Index
        </h3>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-defrag-accent-gold">78.5</span>
          <span className="text-defrag-text-secondary">(Initiation phase)</span>
        </div>
      </div>

      {/* Metrics */}
      <div className="space-y-4 mb-6">
        {metrics.map((metric) => (
          <div key={metric.name} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className={`glyph ${metric.glyph} text-defrag-accent-blue`}></span>
              <span className="text-defrag-text-secondary text-sm">{metric.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-20 h-2 bg-defrag-border rounded-full overflow-hidden">
                <div 
                  className="h-full bg-defrag-accent-green rounded-full transition-all duration-300"
                  style={{ width: `${metric.value}%` }}
                ></div>
              </div>
              <span className="text-defrag-text-primary text-sm font-medium w-8 text-right">
                {metric.value}%
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Active Triggers */}
      <div className="mb-6">
        <h4 className="text-defrag-text-primary font-medium mb-3">Active Triggers</h4>
        <div className="space-y-2">
          {activeTriggers.map((trigger, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-defrag-accent-purple rounded-full"></div>
              <span className="text-defrag-text-secondary text-sm">{trigger}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Next Significant Date */}
      <div className="pt-4 border-t border-defrag-border">
        <h4 className="text-defrag-text-primary font-medium mb-2">Next Significant Date</h4>
        <div className="flex items-center justify-between">
          <span className="text-defrag-text-secondary text-sm">Solar Eclipse Transit</span>
          <span className="text-defrag-accent-gold text-sm font-medium">Feb 15, 2024</span>
        </div>
      </div>
    </div>
  )
}