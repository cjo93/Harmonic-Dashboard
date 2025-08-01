import React, { useState, useEffect } from 'react';
import { DefragStatus, fetchDefragStatus } from '../api/defragStatus';

interface DefragTileProps {
  className?: string;
}

const DefragTile: React.FC<DefragTileProps> = ({ className = '' }) => {
  const [data, setData] = useState<DefragStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'shadows' | 'tasks'>('overview');

  useEffect(() => {
    const loadData = async () => {
      try {
        const defragData = await fetchDefragStatus();
        setData(defragData);
      } catch (error) {
        console.error('Failed to load Defrag data:', error);
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
        <p className="text-red-400">Failed to load Defrag data</p>
      </div>
    );
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-red-400';
      case 'Medium': return 'text-yellow-400';
      case 'Low': return 'text-green-400';
      default: return 'text-white';
    }
  };

  const getCoherenceColor = (value: number) => {
    if (value >= 80) return 'text-green-400';
    if (value >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className={`bg-black/40 backdrop-blur-sm border border-gold/30 rounded-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gold">Defrag Status</h3>
        <div className="text-right">
          <div className={`text-2xl font-bold ${getCoherenceColor(data.overallCoherence)}`}>
            {data.overallCoherence.toFixed(1)}%
          </div>
          <div className="text-xs text-gray-400">Coherence</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-4 bg-black/30 rounded p-1">
        {[
          { key: 'overview', label: 'Overview' },
          { key: 'shadows', label: 'Shadows' },
          { key: 'tasks', label: 'Tasks' }
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
        {activeTab === 'overview' && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-black/30 rounded p-3">
                <div className="text-xs text-gray-400 uppercase tracking-wide">Fragmentation</div>
                <div className="text-lg font-semibold text-red-400">
                  {data.fragmentationLevel.toFixed(1)}%
                </div>
              </div>
              <div className="bg-black/30 rounded p-3">
                <div className="text-xs text-gray-400 uppercase tracking-wide">Integration</div>
                <div className="text-lg font-semibold text-green-400">
                  {data.integrationProgress.toFixed(1)}%
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gold mb-2">Active Defenses</h4>
              <div className="space-y-1">
                {data.activeDefenses.map((defense, index) => (
                  <div key={index} className="text-xs text-gray-300 bg-black/20 rounded px-2 py-1">
                    {defense}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-gold/20">
              <div className="text-xs text-gray-400 mb-1">Next Recommendation</div>
              <div className="text-sm text-white">{data.nextRecommendation}</div>
            </div>
          </>
        )}

        {activeTab === 'shadows' && (
          <div className="space-y-3">
            {data.shadows.map(shadow => (
              <div key={shadow.id} className="bg-black/30 rounded p-3">
                <div className="flex justify-between items-start mb-2">
                  <div className="font-medium text-white">{shadow.aspect}</div>
                  <div className="text-xs text-gray-400">{shadow.lastActivated}</div>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Intensity: <span className="text-red-400">{shadow.intensity}%</span></span>
                  <span className="text-gray-400">Integration: <span className="text-green-400">{shadow.integrationLevel}%</span></span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'tasks' && (
          <div className="space-y-2">
            {data.integrationTasks.map(task => (
              <div key={task.id} className="bg-black/30 rounded p-3">
                <div className="flex justify-between items-start mb-1">
                  <div className="font-medium text-white text-sm">{task.task}</div>
                  <div className={`text-xs font-medium ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-400">
                  <span>{task.category}</span>
                  <span>{task.estimatedDays} days</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DefragTile;
