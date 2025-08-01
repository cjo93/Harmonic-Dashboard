import React, { useState, useEffect } from 'react';
import { ConvergenceData, fetchConvergenceData } from '../api/convergence';

interface ConvergenceTileProps {
  className?: string;
}

const ConvergenceTile: React.FC<ConvergenceTileProps> = ({ className = '' }) => {
  const [data, setData] = useState<ConvergenceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'current' | 'upcoming' | 'optimization' | 'actions'>('current');

  useEffect(() => {
    const loadData = async () => {
      try {
        const convergenceData = await fetchConvergenceData();
        setData(convergenceData);
      } catch (error) {
        console.error('Failed to load Convergence data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className={`bg-black/40 backdrop-blur-sm border border-gold/30 rounded-lg p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-6 bg-gold/20 rounded mb-4"></div>
          <div className="h-48 bg-gold/10 rounded"></div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className={`bg-black/40 backdrop-blur-sm border border-gold/30 rounded-lg p-6 ${className}`}>
        <p className="text-red-400">Failed to load Convergence data</p>
      </div>
    );
  }

  const getIntensityColor = (intensity: number) => {
    if (intensity >= 90) return 'text-purple-400';
    if (intensity >= 75) return 'text-blue-400';
    if (intensity >= 50) return 'text-green-400';
    return 'text-yellow-400';
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Personal': return 'bg-blue-500/20 text-blue-300';
      case 'Collective': return 'bg-green-500/20 text-green-300';
      case 'Cosmic': return 'bg-purple-500/20 text-purple-300';
      case 'Galactic': return 'bg-pink-500/20 text-pink-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'Transformational': return 'text-purple-400';
      case 'High': return 'text-red-400';
      case 'Medium': return 'text-yellow-400';
      case 'Low': return 'text-green-400';
      default: return 'text-white';
    }
  };

  return (
    <div className={`bg-black/40 backdrop-blur-sm border border-gold/30 rounded-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gold">Harmonic Convergence</h3>
        <div className="text-right">
          <div className="text-2xl font-bold text-white">{data.harmonicResonance.toFixed(1)}%</div>
          <div className="text-xs text-gray-400">Resonance</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-4 bg-black/30 rounded p-1">
        {[
          { key: 'current', label: 'Current' },
          { key: 'upcoming', label: 'Upcoming' },
          { key: 'optimization', label: 'Timeline' },
          { key: 'actions', label: 'Actions' }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`flex-1 py-2 px-3 rounded text-xs font-medium transition-all ${activeTab === tab.key
                ? 'bg-gold/20 text-gold'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="space-y-4">
        {activeTab === 'current' && (
          <div className="space-y-4">
            <div className="bg-black/30 rounded p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-white">{data.currentWindow.name}</h4>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded text-xs ${getTypeColor(data.currentWindow.type)}`}>
                    {data.currentWindow.type}
                  </span>
                  <span className={`font-bold ${getIntensityColor(data.currentWindow.intensity)}`}>
                    {data.currentWindow.intensity}%
                  </span>
                </div>
              </div>
              <p className="text-xs text-gray-400 mb-3">
                {data.currentWindow.startDate} - {data.currentWindow.endDate}
              </p>
              <p className="text-sm text-gray-300 mb-3">{data.currentWindow.recommendedFocus}</p>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <h5 className="text-xs font-semibold text-green-400 mb-1">Opportunities</h5>
                  <ul className="text-xs text-gray-300 space-y-1">
                    {data.currentWindow.opportunities.slice(0, 2).map((opp, i) => (
                      <li key={i}>• {opp}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="text-xs font-semibold text-red-400 mb-1">Challenges</h5>
                  <ul className="text-xs text-gray-300 space-y-1">
                    {data.currentWindow.challenges.slice(0, 2).map((challenge, i) => (
                      <li key={i}>• {challenge}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'upcoming' && (
          <div className="space-y-3">
            {data.upcomingWindows.map(window => (
              <div key={window.id} className="bg-black/30 rounded p-3">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-white text-sm">{window.name}</h4>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded text-xs ${getTypeColor(window.type)}`}>
                      {window.type}
                    </span>
                    <span className={`text-xs font-bold ${getIntensityColor(window.intensity)}`}>
                      {window.intensity}%
                    </span>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mb-2">
                  {window.startDate} - {window.endDate}
                </p>
                <p className="text-xs text-gray-300">{window.recommendedFocus}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'optimization' && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-black/30 rounded p-3 text-center">
                <div className="text-lg font-bold text-green-400">{data.timelineOptimization.coherenceScore}%</div>
                <div className="text-xs text-gray-400">Coherence</div>
              </div>
              <div className="bg-black/30 rounded p-3 text-center">
                <div className="text-lg font-bold text-blue-400">{data.timelineOptimization.alignmentFactor}%</div>
                <div className="text-xs text-gray-400">Alignment</div>
              </div>
              <div className="bg-black/30 rounded p-3 text-center">
                <div className="text-lg font-bold text-purple-400">{data.timelineOptimization.momentumDirection}</div>
                <div className="text-xs text-gray-400">Momentum</div>
              </div>
            </div>

            <div>
              <h5 className="text-sm font-semibold text-gold mb-2">Critical Decision Points</h5>
              <div className="space-y-2">
                {data.timelineOptimization.criticalDecisionPoints.slice(0, 2).map((point, i) => (
                  <div key={i} className="bg-black/20 rounded p-2">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-xs font-medium text-white">{point.date}</span>
                      <span className={`text-xs ${getImpactColor(point.impactLevel)}`}>{point.impactLevel}</span>
                    </div>
                    <p className="text-xs text-gray-300">{point.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'actions' && (
          <div className="space-y-2">
            {data.optimalActions.slice(0, 3).map((action, i) => (
              <div key={i} className="bg-black/30 rounded p-3">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-sm font-medium text-white">{action.category}</span>
                  <span className="text-xs text-green-400">{action.successProbability}%</span>
                </div>
                <p className="text-xs text-gray-300 mb-1">{action.action}</p>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{action.timing}</span>
                  <span>{action.window}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConvergenceTile;
