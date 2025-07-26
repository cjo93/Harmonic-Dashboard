'use client'

import { useStore } from '@/stores/useStore'
import { 
  MessageCircle, 
  BookOpen, 
  Code, 
  Activity, 
  Users, 
  GitBranch,
  Clock,
  TrendingUp 
} from 'lucide-react'

export default function Dashboard() {
  const { setCurrentPage, messages, documents, isCodespaceConnected, isCopilotEnabled } = useStore()

  const stats = [
    {
      name: 'Chat Messages',
      value: messages.length.toString(),
      icon: MessageCircle,
      color: 'text-blue-600 bg-blue-50',
      trend: '+12%'
    },
    {
      name: 'Documentation',
      value: documents.length.toString(),
      icon: BookOpen,
      color: 'text-green-600 bg-green-50',
      trend: '+5%'
    },
    {
      name: 'Active Sessions',
      value: isCodespaceConnected ? '1' : '0',
      icon: Activity,
      color: 'text-purple-600 bg-purple-50',
      trend: isCodespaceConnected ? 'Online' : 'Offline'
    },
    {
      name: 'Copilot Status',
      value: isCopilotEnabled ? 'Active' : 'Inactive',
      icon: Code,
      color: 'text-orange-600 bg-orange-50',
      trend: isCopilotEnabled ? 'Enabled' : 'Disabled'
    }
  ]

  const recentActivity = [
    { type: 'chat', message: 'Asked about React components', time: '2 minutes ago' },
    { type: 'doc', message: 'Updated API Reference', time: '1 hour ago' },
    { type: 'system', message: 'Codespace connected', time: '3 hours ago' },
    { type: 'chat', message: 'Generated TypeScript interfaces', time: '5 hours ago' },
  ]

  const quickActions = [
    {
      title: 'Start Chat Session',
      description: 'Get help with your code using AI assistance',
      icon: MessageCircle,
      action: () => setCurrentPage('chat'),
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      title: 'Create Documentation',
      description: 'Add new documentation to your project',
      icon: BookOpen,
      action: () => setCurrentPage('documentation'),
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      title: 'View Code Examples',
      description: 'Browse existing code snippets and examples',
      icon: Code,
      action: () => setCurrentPage('documentation'),
      color: 'bg-purple-500 hover:bg-purple-600'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-harmonic-500 to-harmonic-600 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome to Harmonic Dashboard</h2>
        <p className="text-harmonic-100 mb-4">
          Your integrated development environment with AI-powered assistance and documentation management.
        </p>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
            <span>Codespace Active</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
            <span>Copilot Ready</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.name} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{stat.trend}</p>
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
        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            {quickActions.map((action, index) => {
              const Icon = action.icon
              return (
                <button
                  key={index}
                  onClick={action.action}
                  className="w-full flex items-center p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-left"
                >
                  <div className={`p-2 rounded-lg ${action.color} text-white mr-4`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{action.title}</h4>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div className="flex items-center">
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
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              <span className="text-sm font-medium text-green-900">Development Server</span>
            </div>
            <span className="text-xs text-green-600">Running</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
              <span className="text-sm font-medium text-blue-900">API Endpoints</span>
            </div>
            <span className="text-xs text-blue-600">Active</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
              <span className="text-sm font-medium text-purple-900">Database</span>
            </div>
            <span className="text-xs text-purple-600">Connected</span>
          </div>
        </div>
      </div>
    </div>
  )
}