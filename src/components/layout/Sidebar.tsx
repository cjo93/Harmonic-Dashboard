'use client'

import { useStore } from '@/stores/useStore'
import { cn } from '@/lib/utils'
import { 
  Compass, 
  Moon, 
  Star, 
  Settings,
  Github,
  Sparkles
} from 'lucide-react'

export default function Sidebar() {
  const { currentPage, setCurrentPage, isCodespaceConnected, isCopilotEnabled } = useStore()

  const navigation = [
    { name: 'Defrag Portal', page: 'dashboard' as const, icon: Compass },
    { name: 'Astro Insights', page: 'chat' as const, icon: Moon },
    { name: 'Cosmic Archive', page: 'documentation' as const, icon: Star },
  ]

  return (
    <div className="w-64 bg-slate-900 shadow-xl border-r border-slate-700 flex flex-col">
      {/* Logo */}
      <div className="flex items-center px-4 py-6 border-b border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-violet-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">D</span>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-purple-300">Defrag</h1>
            <p className="text-xs text-slate-400">Astrology Portal</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.name}
              onClick={() => setCurrentPage(item.page)}
              className={cn(
                'w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                currentPage === item.page
                  ? 'bg-purple-900 text-purple-200 border border-purple-700'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-purple-200'
              )}
            >
              <Icon className="w-5 h-5 mr-3" />
              {item.name}
            </button>
          )
        })}
      </nav>

      {/* Status */}
      <div className="px-4 py-4 border-t border-slate-700 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-400">Cosmic Field</span>
          <div className={cn(
            'flex items-center space-x-1 text-xs',
            isCodespaceConnected ? 'text-purple-300' : 'text-red-400'
          )}>
            <div className={cn(
              'w-2 h-2 rounded-full',
              isCodespaceConnected ? 'bg-purple-400' : 'bg-red-400'
            )} />
            <span>{isCodespaceConnected ? 'Active' : 'Dormant'}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-400">Guidance</span>
          <div className={cn(
            'flex items-center space-x-1 text-xs',
            isCopilotEnabled ? 'text-violet-300' : 'text-gray-400'
          )}>
            <Sparkles className="w-3 h-3" />
            <span>{isCopilotEnabled ? 'Aligned' : 'Blocked'}</span>
          </div>
        </div>

        <div className="pt-2">
          <a
            href="https://github.com/cjo93/Harmonic-Dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full px-3 py-2 text-xs text-slate-300 hover:text-purple-200 border border-slate-600 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <Github className="w-4 h-4 mr-2" />
            Source Portal
          </a>
        </div>
      </div>
    </div>
  )
}