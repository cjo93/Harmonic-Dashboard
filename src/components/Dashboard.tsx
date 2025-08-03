'use client'

import { useStore } from '@/stores/useStore'
import { 
  Moon, 
  Star, 
  Compass, 
  Zap, 
  TrendingUp, 
  TrendingDown,
  Circle,
  Triangle,
  Sparkles,
  Eye,
  Layers
} from 'lucide-react'

export default function Dashboard() {
  const { setCurrentPage, messages, documents, isCodespaceConnected, isCopilotEnabled } = useStore()

  // Astrology metrics as specified in the problem
  const msiMetrics = [
    {
      name: 'MSI Index',
      value: '78.5',
      unit: 'Initiation',
      icon: Compass,
      color: 'from-purple-600 to-violet-600',
      textColor: 'text-purple-300',
      progress: 78.5
    },
    {
      name: 'Defrag Status',
      value: '67.3%',
      unit: 'Coherence',
      icon: Layers,
      color: 'from-indigo-600 to-purple-600',
      textColor: 'text-violet-300',
      progress: 67.3
    },
    {
      name: 'Harmonic Convergence',
      value: '78.5%',
      unit: 'Resonance',
      icon: Sparkles,
      color: 'from-violet-600 to-purple-400',
      textColor: 'text-purple-300',
      progress: 78.5
    }
  ]

  const planetaryTriggers = [
    { name: 'Pluto', intensity: 'High', phase: 'Transformative', color: 'bg-red-500', active: true },
    { name: 'Jupiter', intensity: 'Medium', phase: 'Expansive', color: 'bg-orange-500', active: true },
    { name: 'Lunar Node', intensity: 'Strong', phase: 'Karmic', color: 'bg-purple-500', active: true },
    { name: 'Saturn', intensity: 'Low', phase: 'Reflective', color: 'bg-gray-500', active: false },
  ]

  const fragmentationData = [
    { type: 'Integration', percentage: 72, trend: 'up', color: 'text-green-400' },
    { type: 'Fragmentation', percentage: 28, trend: 'down', color: 'text-red-400' },
    { type: 'Coherence Level', percentage: 67, trend: 'up', color: 'text-violet-400' },
    { type: 'Resistance', percentage: 15, trend: 'down', color: 'text-orange-400' },
  ]

  const aquarianGateActivations = [
    { phase: 'First Quarter Moon', date: '2024-08-05', status: 'active', completion: 85 },
    { phase: 'Mars Conjunction', date: '2024-08-12', status: 'pending', completion: 0 },
    { phase: 'Mercury Retrograde End', date: '2024-08-18', status: 'approaching', completion: 25 },
    { phase: 'Solar Eclipse', date: '2024-08-25', status: 'distant', completion: 5 },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-900 to-violet-900 rounded-xl p-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-violet-600/20"></div>
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-2 flex items-center">
            <Star className="w-6 h-6 mr-2" />
            Cosmic Defragmentation Portal
          </h2>
          <p className="text-purple-100 mb-4">
            Your personal astrology defragmentation center - harmonizing celestial energies for optimal consciousness alignment.
          </p>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-purple-300 rounded-full mr-2 animate-pulse"></div>
              <span>Cosmic Field Active</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-violet-300 rounded-full mr-2 animate-pulse"></div>
              <span>Guidance Aligned</span>
            </div>
          </div>
        </div>
      </div>

      {/* MSI Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {msiMetrics.map((metric) => {
          const Icon = metric.icon
          return (
            <div key={metric.name} className="bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700 relative overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br ${metric.color} opacity-10`}></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-slate-400 mb-1">{metric.name}</p>
                    <p className={`text-3xl font-bold ${metric.textColor}`}>{metric.value}</p>
                    <p className="text-xs text-slate-400 mt-1">{metric.unit}</p>
                  </div>
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${metric.color}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full bg-gradient-to-r ${metric.color}`}
                    style={{ width: `${metric.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Planetary Triggers */}
        <div className="bg-slate-800 rounded-xl shadow-lg border border-slate-700 p-6">
          <h3 className="text-lg font-semibold text-purple-300 mb-4 flex items-center">
            <Moon className="w-5 h-5 mr-2" />
            Active Planetary Triggers
          </h3>
          <div className="space-y-3">
            {planetaryTriggers.map((trigger, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                <div className="flex items-center">
                  <div className={`w-3 h-3 ${trigger.color} rounded-full mr-3 ${trigger.active ? 'animate-pulse' : ''}`}></div>
                  <div>
                    <p className="text-sm font-medium text-purple-200">{trigger.name}</p>
                    <p className="text-xs text-slate-400">{trigger.phase}</p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${
                  trigger.intensity === 'High' ? 'bg-red-500/20 text-red-300' :
                  trigger.intensity === 'Strong' ? 'bg-purple-500/20 text-purple-300' :
                  trigger.intensity === 'Medium' ? 'bg-orange-500/20 text-orange-300' :
                  'bg-gray-500/20 text-gray-300'
                }`}>
                  {trigger.intensity}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Integration/Fragmentation Percentages */}
        <div className="bg-slate-800 rounded-xl shadow-lg border border-slate-700 p-6">
          <h3 className="text-lg font-semibold text-purple-300 mb-4 flex items-center">
            <Eye className="w-5 h-5 mr-2" />
            Consciousness Metrics
          </h3>
          <div className="space-y-4">
            {fragmentationData.map((data, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  {data.trend === 'up' ? 
                    <TrendingUp className={`w-4 h-4 mr-2 ${data.color}`} /> :
                    <TrendingDown className={`w-4 h-4 mr-2 ${data.color}`} />
                  }
                  <span className="text-sm font-medium text-purple-200">{data.type}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-lg font-bold ${data.color}`}>{data.percentage}%</span>
                  <div className="w-16 bg-slate-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        data.trend === 'up' ? 'bg-green-400' : 'bg-red-400'
                      }`}
                      style={{ width: `${data.percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Aquarian Gate Activation Timeline */}
      <div className="bg-slate-800 rounded-xl shadow-lg border border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-purple-300 mb-4 flex items-center">
          <Triangle className="w-5 h-5 mr-2" />
          Aquarian Gate Activation Timeline
        </h3>
        <div className="space-y-4">
          {aquarianGateActivations.map((activation, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className={`w-4 h-4 rounded-full ${
                  activation.status === 'active' ? 'bg-purple-400 animate-pulse' :
                  activation.status === 'pending' ? 'bg-gray-400' :
                  activation.status === 'approaching' ? 'bg-orange-400 animate-pulse' :
                  'bg-gray-600'
                }`}></div>
                <div>
                  <p className="text-sm font-medium text-purple-200">{activation.phase}</p>
                  <p className="text-xs text-slate-400">{activation.date}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-violet-300">{activation.completion}%</span>
                <div className="w-20 bg-slate-600 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-gradient-to-r from-purple-600 to-violet-600"
                    style={{ width: `${activation.completion}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions for Cosmic Work */}
      <div className="bg-slate-800 rounded-xl shadow-lg border border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-purple-300 mb-4">Cosmic Navigation</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => setCurrentPage('chat')}
            className="flex items-center p-4 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg text-white hover:scale-105 transition-transform"
          >
            <Moon className="w-6 h-6 mr-3" />
            <div className="text-left">
              <h4 className="font-medium">Seek Guidance</h4>
              <p className="text-xs opacity-80">Connect with cosmic wisdom</p>
            </div>
          </button>
          <button
            onClick={() => setCurrentPage('documentation')}
            className="flex items-center p-4 bg-gradient-to-br from-violet-600 to-purple-600 rounded-lg text-white hover:scale-105 transition-transform"
          >
            <Star className="w-6 h-6 mr-3" />
            <div className="text-left">
              <h4 className="font-medium">Sacred Archive</h4>
              <p className="text-xs opacity-80">Access spiritual knowledge</p>
            </div>
          </button>
          <button
            className="flex items-center p-4 bg-gradient-to-br from-purple-600 to-violet-600 rounded-lg text-white hover:scale-105 transition-transform"
          >
            <Sparkles className="w-6 h-6 mr-3" />
            <div className="text-left">
              <h4 className="font-medium">Begin Defrag</h4>
              <p className="text-xs opacity-80">Start consciousness work</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}