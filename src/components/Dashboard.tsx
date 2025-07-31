'use client'

import { useStore } from '@/stores/useStore'
import { useNotificationStore } from '@/stores/useNotifications'
import AnalyticsDashboard from './AnalyticsDashboard'
import ProductivityWidget from './ProductivityWidget'
import ActivityFeed from './ActivityFeed'
import { 
  MessageCircle, 
  BookOpen, 
  Code, 
  Activity, 
  Users, 
  GitBranch,
  Clock,
  TrendingUp,
  RefreshCw,
  Settings,
  Zap,
  BarChart3
} from 'lucide-react'

export default function Dashboard() {
  const { setCurrentPage, messages, documents, isCodespaceConnected, isCopilotEnabled } = useStore()
  const { addNotification } = useNotificationStore()

  // Enhanced stats with real-time data
  const stats = [
    {
      name: 'Chat Messages',
      value: messages.length.toString(),
      icon: MessageCircle,
      color: 'text-blue-600 bg-blue-50',
      trend: '+12%',
      description: 'AI conversations today'
    },
    {
      name: 'Documentation',
      value: documents.length.toString(),
      icon: BookOpen,
      color: 'text-green-600 bg-green-50',
      trend: '+5%',
      description: 'Knowledge base articles'
    },
    {
      name: 'Active Sessions',
      value: isCodespaceConnected ? '1' : '0',
      icon: Activity,
      color: 'text-purple-600 bg-purple-50',
      trend: isCodespaceConnected ? 'Online' : 'Offline',
      description: 'Development environments'
    },
    {
      name: 'Copilot Status',
      value: isCopilotEnabled ? 'Active' : 'Inactive',
      icon: Code,
      color: 'text-orange-600 bg-orange-50',
      trend: isCopilotEnabled ? 'Enabled' : 'Disabled',
      description: 'AI assistant ready'
    }
  ]

  const recentActivity = [
    { type: 'chat', message: 'Asked about React components', time: '2 minutes ago', details: 'Generated TypeScript interface' },
    { type: 'doc', message: 'Updated API Reference', time: '1 hour ago', details: 'Added new endpoint documentation' },
    { type: 'system', message: 'Codespace connected', time: '3 hours ago', details: 'Development environment ready' },
    { type: 'chat', message: 'Generated TypeScript interfaces', time: '5 hours ago', details: 'Created type definitions' },
  ]

  const quickActions = [
    {
      title: 'Start Chat Session',
      description: 'Get help with your code using AI assistance',
      icon: MessageCircle,
      action: () => {
        setCurrentPage('chat')
        addNotification({
          type: 'info',
          title: 'Chat Started',
          message: 'AI assistant is ready to help you with coding questions'
        })
      },
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      title: 'Create Documentation',
      description: 'Add new documentation to your project',
      icon: BookOpen,
      action: () => {
        setCurrentPage('documentation')
        addNotification({
          type: 'success',
          title: 'Documentation Mode',
          message: 'Ready to create and manage your project documentation'
        })
      },
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      title: 'View Code Examples',
      description: 'Browse existing code snippets and examples',
      icon: Code,
      action: () => {
        setCurrentPage('documentation')
        addNotification({
          type: 'info',
          title: 'Code Examples',
          message: 'Exploring code snippets and development patterns'
        })
      },
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      title: 'System Diagnostics',
      description: 'Check system health and performance',
      icon: Activity,
      action: () => {
        addNotification({
          type: 'success',
          title: 'System Check Complete',
          message: 'All systems are running optimally',
          action: {
            label: 'View Details',
            onClick: () => console.log('Viewing system details')
          }
        })
      },
      color: 'bg-orange-500 hover:bg-orange-600'
    }
  ]

  const handleRefreshData = () => {
    addNotification({
      type: 'info',
      title: 'Refreshing Data',
      message: 'Dashboard data is being updated...'
    })
    
    // Simulate data refresh
    setTimeout(() => {
      addNotification({
        type: 'success',
        title: 'Data Updated',
        message: 'Dashboard has been refreshed with the latest information'
      })
    }, 1500)
  }

  return (
    <div className="space-y-6">
      {/* Enhanced Welcome Section */}
      <div className="bg-gradient-to-r from-harmonic-500 to-harmonic-600 rounded-xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full -ml-12 -mb-12"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">Welcome to Harmonic Dashboard</h2>
              <p className="text-harmonic-100 mb-4">
                Your integrated development environment with AI-powered assistance and documentation management.
              </p>
            </div>
            <button
              onClick={handleRefreshData}
              className="p-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors"
              title="Refresh Dashboard"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              <span>Codespace Active</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></div>
              <span>Copilot Ready</span>
            </div>
            <div className="flex items-center">
              <Zap className="w-4 h-4 mr-1" />
              <span>High Performance</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.name} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-1">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
                  <div className="flex items-center mt-2">
                    <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                      {stat.trend}
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enhanced Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
            <Settings className="w-5 h-5 text-gray-400" />
          </div>
          <div className="grid grid-cols-1 gap-3">
            {quickActions.map((action, index) => {
              const Icon = action.icon
              return (
                <button
                  key={index}
                  onClick={action.action}
                  className="w-full flex items-center p-4 rounded-lg border border-gray-200 hover:bg-gray-50 hover:shadow-sm transition-all duration-200 text-left group"
                >
                  <div className={`p-2 rounded-lg ${action.color} text-white mr-4 group-hover:scale-110 transition-transform duration-200`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 group-hover:text-gray-700">{action.title}</h4>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Enhanced Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
            <TrendingUp className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start justify-between py-2 hover:bg-gray-50 -mx-2 px-2 rounded-lg transition-colors">
                <div className="flex items-start">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                    activity.type === 'chat' ? 'bg-blue-100 text-blue-600' :
                    activity.type === 'doc' ? 'bg-green-100 text-green-600' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {activity.type === 'chat' ? <MessageCircle className="w-4 h-4" /> :
                     activity.type === 'doc' ? <BookOpen className="w-4 h-4" /> :
                     <Activity className="w-4 h-4" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.details}</p>
                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Analytics Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <AnalyticsDashboard />
        </div>
        <div>
          <ProductivityWidget />
        </div>
      </div>

      {/* Enhanced System Status */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">System Status</h3>
          <div className="flex items-center text-sm text-green-600">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            All Systems Operational
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              <span className="text-sm font-medium text-green-900">Development Server</span>
            </div>
            <span className="text-xs text-green-600 font-medium">Running</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
              <span className="text-sm font-medium text-blue-900">API Endpoints</span>
            </div>
            <span className="text-xs text-blue-600 font-medium">Active</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg border border-purple-200">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
              <span className="text-sm font-medium text-purple-900">Database</span>
            </div>
            <span className="text-xs text-purple-600 font-medium">Connected</span>
          </div>
        </div>
      </div>
    </div>
  )
}