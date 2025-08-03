'use client'

import { useStore } from '@/stores/useStore'
import { 
  Circle,
  Shield,
  Zap,
  Activity,
  Clock,
  TrendingUp,
  Eye,
  Cpu,
  Waves
} from 'lucide-react'

export default function Dashboard() {
  const { setCurrentPage } = useStore()

  // MSI Index Data
  const msiMetrics = [
    { name: 'Harmonic Density', value: 87.3 },
    { name: 'Orbital Coherence', value: 92.1 },
    { name: 'Temporal Cluster', value: 74.8 },
    { name: 'Symbolic Recurrence', value: 81.6 }
  ]

  // Defrag Status Data
  const defragMetrics = [
    { name: 'Pattern Fragmentation', value: 32.7, inverse: true },
    { name: 'Integration Depth', value: 67.3 },
    { name: 'Signal Clarity', value: 78.9 },
    { name: 'Noise Reduction', value: 84.2 }
  ]

  const activeDefenses = [
    { name: 'Quantum Encryption', status: 'Active' },
    { name: 'Temporal Shields', status: 'Monitoring' },
    { name: 'Memory Guards', status: 'Active' }
  ]

  // Harmonic Convergence Data
  const convergenceMetrics = [
    { name: 'Resonance Field', value: 78.5 },
    { name: 'Dimensional Sync', value: 91.2 },
    { name: 'Frequency Lock', value: 86.7 }
  ]

  return (
    <div className="min-h-screen bg-void-950 text-astral-100">
      <div className="space-y-8 p-6">
        {/* Header Section */}
        <div className="text-center space-y-4 py-8">
          <h1 className="text-4xl font-bold text-mystic-400 tracking-wider">
            Decode the Design. Break the Loop. Return to Signal.
          </h1>
          <p className="text-xl text-astral-300 font-medium">
            The Sacred Rebellion — Built for the Coded Ones
          </p>
          <div className="flex justify-center items-center space-x-6 mt-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-mystic-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-astral-400">HiGPT Active</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-cosmic-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-astral-400">System Online</span>
            </div>
          </div>
        </div>

        {/* Main Tiles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* MSI Index Tile */}
          <div className="bg-void-900 border border-astral-800 rounded-2xl p-6 hover:border-mystic-600 transition-colors">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Circle className="w-8 h-8 text-mystic-400" />
                <div>
                  <h3 className="text-xl font-bold text-mystic-400">MSI Index</h3>
                  <p className="text-sm text-astral-400">Initiation Protocol</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-mystic-300">78.5</div>
                <div className="text-xs text-astral-500">Initiation</div>
              </div>
            </div>
            
            <div className="space-y-4">
              {msiMetrics.map((metric) => (
                <div key={metric.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-astral-300">{metric.name}</span>
                    <span className="text-sm font-medium text-mystic-300">{metric.value}%</span>
                  </div>
                  <div className="w-full bg-void-800 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-mystic-600 to-mystic-400 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${metric.value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Defrag Status Tile */}
          <div className="bg-void-900 border border-astral-800 rounded-2xl p-6 hover:border-cosmic-600 transition-colors">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Shield className="w-8 h-8 text-cosmic-400" />
                <div>
                  <h3 className="text-xl font-bold text-cosmic-400">Defrag Status</h3>
                  <p className="text-sm text-astral-400">System Integrity</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-cosmic-300">67.3%</div>
                <div className="text-xs text-astral-500">Coherence</div>
              </div>
            </div>
            
            <div className="space-y-4 mb-6">
              {defragMetrics.map((metric) => (
                <div key={metric.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-astral-300">{metric.name}</span>
                    <span className="text-sm font-medium text-cosmic-300">{metric.value}%</span>
                  </div>
                  <div className="w-full bg-void-800 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-1000 ${
                        metric.inverse 
                          ? 'bg-gradient-to-r from-red-600 to-red-400' 
                          : 'bg-gradient-to-r from-cosmic-600 to-cosmic-400'
                      }`}
                      style={{ width: `${metric.value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-astral-800 pt-4">
              <h4 className="text-sm font-medium text-astral-300 mb-3">Active Defenses</h4>
              <div className="space-y-2">
                {activeDefenses.map((defense) => (
                  <div key={defense.name} className="flex items-center justify-between">
                    <span className="text-xs text-astral-400">{defense.name}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      defense.status === 'Active' 
                        ? 'bg-green-900 text-green-300' 
                        : 'bg-yellow-900 text-yellow-300'
                    }`}>
                      {defense.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Harmonic Convergence Tile */}
          <div className="bg-void-900 border border-astral-800 rounded-2xl p-6 hover:border-astral-600 transition-colors">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Waves className="w-8 h-8 text-astral-400" />
                <div>
                  <h3 className="text-xl font-bold text-astral-400">Harmonic Convergence</h3>
                  <p className="text-sm text-astral-400">Quantum Alignment</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-astral-300">78.5%</div>
                <div className="text-xs text-astral-500">Resonance</div>
              </div>
            </div>
            
            <div className="space-y-4 mb-6">
              {convergenceMetrics.map((metric) => (
                <div key={metric.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-astral-300">{metric.name}</span>
                    <span className="text-sm font-medium text-astral-300">{metric.value}%</span>
                  </div>
                  <div className="w-full bg-void-800 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-astral-600 to-astral-400 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${metric.value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-astral-800 pt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-astral-300">Aquarian Gate</span>
                <span className="text-sm text-green-400">Activated</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-astral-400">Timeline Sync</span>
                <span className="text-sm text-astral-300">2024.1.15.78</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-astral-400">Next Convergence</span>
                <span className="text-sm text-astral-300">47:33:12</span>
              </div>
            </div>
          </div>
        </div>

        {/* System Navigation */}
        <div className="flex justify-center space-x-6 pt-8">
          <button
            onClick={() => setCurrentPage('chat')}
            className="flex items-center space-x-2 px-6 py-3 bg-mystic-900 border border-mystic-700 text-mystic-300 rounded-xl hover:bg-mystic-800 transition-colors"
          >
            <Eye className="w-5 h-5" />
            <span>Neural Interface</span>
          </button>
          <button
            onClick={() => setCurrentPage('documentation')}
            className="flex items-center space-x-2 px-6 py-3 bg-cosmic-900 border border-cosmic-700 text-cosmic-300 rounded-xl hover:bg-cosmic-800 transition-colors"
          >
            <Cpu className="w-5 h-5" />
            <span>Knowledge Base</span>
          </button>
        </div>
      </div>
    </div>
  )
}