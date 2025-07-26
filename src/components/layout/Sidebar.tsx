'use client'

import { useStore } from '@/stores/useStore'
import { cn } from '@/lib/utils'
import { 
  Home, 
  MessageCircle, 
  BookOpen, 
  Settings,
  Github,
  Zap
} from 'lucide-react'

export default function Sidebar() {
  const { currentPage, setCurrentPage, isCodespaceConnected, isCopilotEnabled } = useStore()

  const navigation = [
    { name: 'Dashboard', page: 'dashboard' as const, icon: Home },
    { name: 'Chat', page: 'chat' as const, icon: MessageCircle },
    { name: 'Documentation', page: 'documentation' as const, icon: BookOpen },
  ]

  return (
    <div className="w-64 bg-white shadow-sm border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="flex items-center px-4 py-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-harmonic-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">H</span>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Harmonic</h1>
            <p className="text-xs text-gray-500">Dashboard</p>
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
                  ? 'bg-harmonic-50 text-harmonic-700 border border-harmonic-200'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              <Icon className="w-5 h-5 mr-3" />
              {item.name}
            </button>
          )
        })}
      </nav>

      {/* Status */}
      <div className="px-4 py-4 border-t border-gray-200 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">Codespace</span>
          <div className={cn(
            'flex items-center space-x-1 text-xs',
            isCodespaceConnected ? 'text-green-600' : 'text-red-600'
          )}>
            <div className={cn(
              'w-2 h-2 rounded-full',
              isCodespaceConnected ? 'bg-green-500' : 'bg-red-500'
            )} />
            <span>{isCodespaceConnected ? 'Connected' : 'Offline'}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">Copilot</span>
          <div className={cn(
            'flex items-center space-x-1 text-xs',
            isCopilotEnabled ? 'text-blue-600' : 'text-gray-600'
          )}>
            <Zap className="w-3 h-3" />
            <span>{isCopilotEnabled ? 'Enabled' : 'Disabled'}</span>
          </div>
        </div>

        <div className="pt-2">
          <a
            href="https://github.com/cjo93/Harmonic-Dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full px-3 py-2 text-xs text-gray-600 hover:text-gray-900 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Github className="w-4 h-4 mr-2" />
            View on GitHub
          </a>
        </div>
      </div>
    </div>
  )
}