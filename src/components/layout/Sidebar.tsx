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

'use client'

import { 
  BarChart3, 
  MessageCircle, 
  BookOpen, 
  FolderOpen,
  Settings,
  ChevronLeft,
  Activity,
  Github,
  Zap
} from 'lucide-react'
import { useEnhancedStore } from '@/stores/useEnhancedStore'

export default function Sidebar() {
  const { 
    currentPage, 
    setCurrentPage, 
    sidebarCollapsed, 
    toggleSidebar,
    isCodespaceConnected,
    isCopilotEnabled,
    isGitHubConnected,
    appStats
  } = useEnhancedStore()

  const navigation = [
    { 
      name: 'Dashboard', 
      id: 'dashboard' as const, 
      icon: BarChart3,
      description: 'Overview and analytics'
    },
    { 
      name: 'Chat', 
      id: 'chat' as const, 
      icon: MessageCircle,
      description: 'AI-powered conversations',
      badge: appStats.totalMessages > 0 ? appStats.totalMessages : undefined
    },
    { 
      name: 'Documentation', 
      id: 'documentation' as const, 
      icon: BookOpen,
      description: 'Manage your docs',
      badge: appStats.totalDocuments > 0 ? appStats.totalDocuments : undefined
    },
    { 
      name: 'Projects', 
      id: 'projects' as const, 
      icon: FolderOpen,
      description: 'Track your projects',
      badge: appStats.totalProjects > 0 ? appStats.totalProjects : undefined
    },
    { 
      name: 'Settings', 
      id: 'settings' as const, 
      icon: Settings,
      description: 'Configure preferences'
    }
  ]

  const statusIndicators = [
    {
      label: 'Codespace',
      icon: Activity,
      active: isCodespaceConnected,
      color: 'text-green-500'
    },
    {
      label: 'Copilot',
      icon: Zap,
      active: isCopilotEnabled,
      color: 'text-blue-500'
    },
    {
      label: 'GitHub',
      icon: Github,
      active: isGitHubConnected,
      color: 'text-purple-500'
    }
  ]

  return (
    <div className={`${sidebarCollapsed ? 'w-20' : 'w-64'} transition-all duration-300 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col h-full`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between">
          {!sidebarCollapsed && (
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Harmonic
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Dashboard v1.0
              </p>
            </div>
          )}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <ChevronLeft className={`w-5 h-5 text-gray-600 dark:text-gray-400 transition-transform ${sidebarCollapsed ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentPage(item.id)}
            className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 group ${
              currentPage === item.id
                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
          >
            <item.icon className={`w-5 h-5 ${currentPage === item.id ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`} />
            {!sidebarCollapsed && (
              <div className="flex-1 text-left">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{item.name}</span>
                  {item.badge && (
                    <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">
                      {item.badge > 99 ? '99+' : item.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {item.description}
                </p>
              </div>
            )}
          </button>
        ))}
      </nav>

      {/* Status Indicators */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        {!sidebarCollapsed && (
          <div className="mb-3">
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Status
            </h3>
          </div>
        )}
        <div className={`space-y-2 ${sidebarCollapsed ? 'space-y-3' : ''}`}>
          {statusIndicators.map((indicator) => (
            <div
              key={indicator.label}
              className={`flex items-center space-x-3 px-2 py-2 rounded-lg ${
                indicator.active 
                  ? 'bg-green-50 dark:bg-green-900/20' 
                  : 'bg-gray-50 dark:bg-gray-800'
              }`}
            >
              <div className={`relative ${sidebarCollapsed ? 'mx-auto' : ''}`}>
                <indicator.icon className={`w-4 h-4 ${
                  indicator.active ? indicator.color : 'text-gray-400 dark:text-gray-500'
                }`} />
                <div className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${
                  indicator.active ? 'bg-green-400' : 'bg-gray-300 dark:bg-gray-600'
                }`} />
              </div>
              {!sidebarCollapsed && (
                <div className="flex-1">
                  <span className={`text-xs font-medium ${
                    indicator.active 
                      ? 'text-green-700 dark:text-green-300' 
                      : 'text-gray-600 dark:text-gray-400'
                  }`}>
                    {indicator.label}
                  </span>
                  <div className={`text-xs ${
                    indicator.active 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-gray-500 dark:text-gray-500'
                  }`}>
                    {indicator.active ? 'Connected' : 'Disconnected'}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {!sidebarCollapsed && (
          <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
            <div className="text-xs text-gray-500 dark:text-gray-400">
              <div className="flex justify-between mb-1">
                <span>Last active:</span>
                <span>{new Date(appStats.lastActivity).toLocaleTimeString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Features:</span>
                <span>{appStats.activeFeatures.length}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}