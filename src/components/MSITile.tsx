import React, { useState, useEffect } from 'react';
import { MSIData, fetchMSI } from '../api/msi';

interface MSITileProps {
  className?: string;
}

const MSITile: React.FC<MSITileProps> = ({ className = '' }) => {
  const [data, setData] = useState<MSIData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const msiData = await fetchMSI();
        setData(msiData);
      } catch (error) {
        console.error('Failed to load MSI data:', error);
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
          <div className="h-32 bg-gold/10 rounded"></div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className={`bg-black/40 backdrop-blur-sm border border-gold/30 rounded-lg p-6 ${className}`}>
        <p className="text-red-400">Failed to load MSI data</p>
      </div>
    );
  }

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'Dormant': return 'text-gray-400';
      case 'Growth': return 'text-green-400';
      case 'Initiation': return 'text-blue-400';
      case 'Collapse': return 'text-red-400';
      case 'Mythic': return 'text-purple-400';
      default: return 'text-white';
    }
  };

  return (
    <div className={`bg-black/40 backdrop-blur-sm border border-gold/30 rounded-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gold">MSI Index</h3>
        <div className="text-right">
          <div className="text-2xl font-bold text-white">{data.index.toFixed(1)}</div>
          <div className={`text-sm ${getPhaseColor(data.phase)}`}>{data.phase}</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-black/30 rounded p-3">
          <div className="text-xs text-gray-400 uppercase tracking-wide">Harmonic Density</div>
          <div className="text-lg font-semibold text-white">{(data.harmonicDensity * 100).toFixed(0)}%</div>
        </div>
        <div className="bg-black/30 rounded p-3">
          <div className="text-xs text-gray-400 uppercase tracking-wide">Orbital Coherence</div>
          <div className="text-lg font-semibold text-white">{(data.orbitalCoherence * 100).toFixed(0)}%</div>
        </div>
        <div className="bg-black/30 rounded p-3">
          <div className="text-xs text-gray-400 uppercase tracking-wide">Temporal Cluster</div>
          <div className="text-lg font-semibold text-white">{(data.temporalCluster * 100).toFixed(0)}%</div>
        </div>
        <div className="bg-black/30 rounded p-3">
          <div className="text-xs text-gray-400 uppercase tracking-wide">Symbolic Recurrence</div>
          <div className="text-lg font-semibold text-white">{(data.symbolicRecurrence * 100).toFixed(0)}%</div>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <h4 className="text-sm font-semibold text-gold mb-2">Active Triggers</h4>
          <div className="space-y-1">
            {data.activeTriggers.map((trigger, index) => (
              <div key={index} className="text-xs text-gray-300 bg-black/20 rounded px-2 py-1">
                {trigger}
              </div>
            ))}
          </div>
        </div>

        <div className="pt-3 border-t border-gold/20">
          <div className="text-xs text-gray-400">Next Significant Date</div>
          <div className="text-sm font-semibold text-white">{data.nextSignificantDate}</div>
        </div>
      </div>
    </div>
  );
};

export default MSITile;
