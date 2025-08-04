'use client'

import { useEffect } from 'react'
import { useEnhancedStore } from '@/stores/useEnhancedStore'
import { useNotificationStore } from '@/stores/useNotificationStore'
import { 
  MessageCircle, 
  BookOpen, 
  Code, 
  Activity, 
  Users, 
  GitBranch,
  Clock,
  TrendingUp,
  FileText,
  Zap,
  Plus
} from 'lucide-react'
import FileUpload from '@/components/common/FileUpload'
import SystemMonitor from '@/components/common/SystemMonitor'
import { fileProcessor } from '@/lib/fileProcessor'

export default function Dashboard() {
  const { 
    setCurrentPage, 
    messages, 
    documents, 
    projects,
    isCodespaceConnected, 
    isCopilotEnabled,
    isGitHubConnected,
    appStats,
    updateStats,
    addDocument,
    addProject,
    logActivity
  } = useEnhancedStore()

  const { addNotification } = useNotificationStore()

  useEffect(() => {
    updateStats()
  }, [updateStats])

  useEffect(() => {
    // Welcome notification for new users - only once
    if (appStats.totalMessages === 0 && appStats.totalDocuments === 0 && appStats.totalProjects === 0) {
      const hasShownWelcome = localStorage.getItem('harmonic-welcome-shown')
      if (!hasShownWelcome) {
        addNotification({
          title: 'Welcome to Harmonic Dashboard!',
          message: 'Start by uploading files, creating projects, or starting a chat conversation.',
          type: 'info'
        })
        localStorage.setItem('harmonic-welcome-shown', 'true')
      }
    }
  }, []) // Only run once on mount

  const stats = [
    {
      name: 'Chat Messages',
      value: appStats.totalMessages.toString(),
      icon: MessageCircle,
      color: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20',
      trend: '+12%',
      action: () => setCurrentPage('chat')
    },
    {
      name: 'Documentation',
      value: appStats.totalDocuments.toString(),
      icon: BookOpen,
      color: 'text-green-600 bg-green-50 dark:bg-green-900/20',
      trend: '+5%',
      action: () => setCurrentPage('documentation')
    },
    {
      name: 'Active Projects',
      value: appStats.totalProjects.toString(),
      icon: Code,
      color: 'text-purple-600 bg-purple-50 dark:bg-purple-900/20',
      trend: '+8%',
      action: () => setCurrentPage('projects')
    },
    {
      name: 'GitHub Status',
      value: isGitHubConnected ? 'Connected' : 'Offline',
      icon: GitBranch,
      color: isGitHubConnected 
        ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20' 
        : 'text-orange-600 bg-orange-50 dark:bg-orange-900/20',
      trend: isGitHubConnected ? 'Online' : 'Connect',
      action: () => setCurrentPage('settings')
    }
  ]

  const recentActivity = [
    { 
      type: 'chat', 
      message: 'Started new chat conversation', 
      time: '2 minutes ago',
      icon: MessageCircle,
      color: 'text-blue-500'
    },
    { 
      type: 'doc', 
      message: 'Updated React component guide', 
      time: '15 minutes ago',
      icon: FileText,
      color: 'text-green-500'
    },
    { 
      type: 'project', 
      message: 'Created new project workspace', 
      time: '1 hour ago',
      icon: Code,
      color: 'text-purple-500'
    },
    { 
      type: 'system', 
      message: 'Connected to GitHub successfully', 
      time: '2 hours ago',
      icon: GitBranch,
      color: 'text-emerald-500'
    }
  ]

  const quickActions = [
    {
      title: 'Start Chat',
      description: 'Ask AI for coding help',
      icon: MessageCircle,
      color: 'bg-blue-500',
      action: () => setCurrentPage('chat')
    },
    {
      title: 'Create Document',
      description: 'Write new documentation',
      icon: FileText,
      color: 'bg-green-500',
      action: () => setCurrentPage('documentation')
    },
    {
      title: 'New Project',
      description: 'Track a new project',
      icon: Plus,
      color: 'bg-purple-500',
      action: () => setCurrentPage('projects')
    },
    {
      title: 'GitHub Setup',
      description: 'Connect your GitHub',
      icon: GitBranch,
      color: 'bg-gray-500',
      action: () => setCurrentPage('settings')
    }
  ]

  const handleFileUpload = async (files: any[]) => {
    for (const file of files) {
      try {
        await fileProcessor.saveFileAsDocument(file, ['uploaded', 'file'])
        logActivity('file_saved_as_document', { fileName: file.name })
        addNotification({
          title: 'File Processed',
          message: `Successfully processed ${file.name}`,
          type: 'success'
        })
      } catch (error) {
        console.error('Failed to save file as document:', error)
        addNotification({
          title: 'File Processing Failed',
          message: `Failed to process ${file.name}`,
          type: 'error'
        })
      }
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome back! Here's an overview of your development activity.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            isCodespaceConnected 
              ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
              : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
          }`}>
            {isCodespaceConnected ? 'Codespace Active' : 'Codespace Offline'}
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            isCopilotEnabled 
              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
              : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400'
          }`}>
            <Zap className="w-3 h-3 inline mr-1" />
            Copilot {isCopilotEnabled ? 'Active' : 'Inactive'}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            onClick={stat.action}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200 cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.name}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">
                  {stat.value}
                </p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">
                    {stat.trend}
                  </span>
                </div>
              </div>
              <div className={`p-3 rounded-lg ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                className="flex flex-col items-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors group"
              >
                <div className={`p-3 rounded-lg ${action.color} text-white mb-2 group-hover:scale-110 transition-transform`}>
                  <action.icon className="w-5 h-5" />
                </div>
                <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                  {action.title}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">
                  {action.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Recent Activity
          </h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-700`}>
                  <activity.icon className={`w-4 h-4 ${activity.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {activity.message}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <button 
            className="w-full mt-4 px-4 py-2 text-sm text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
            onClick={() => setCurrentPage('settings')}
          >
            View All Activity
          </button>
        </div>
      </div>

      {/* File Upload Section */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Quick File Upload
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Drop files here to analyze them and automatically save as documentation
        </p>
        <FileUpload 
          onFilesUploaded={handleFileUpload}
          maxFiles={5}
          className="max-w-2xl"
        />
      </div>

      {/* System Status */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          System Status
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2 ${
              isCodespaceConnected ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20'
            }`}>
              <Activity className={`w-6 h-6 ${
                isCodespaceConnected ? 'text-green-600' : 'text-red-600'
              }`} />
            </div>
            <h4 className="font-medium text-gray-900 dark:text-gray-100">Codespace</h4>
            <p className={`text-sm ${
              isCodespaceConnected ? 'text-green-600' : 'text-red-600'
            }`}>
              {isCodespaceConnected ? 'Connected' : 'Disconnected'}
            </p>
          </div>
          
          <div className="text-center">
            <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2 ${
              isCopilotEnabled ? 'bg-blue-100 dark:bg-blue-900/20' : 'bg-gray-100 dark:bg-gray-700'
            }`}>
              <Zap className={`w-6 h-6 ${
                isCopilotEnabled ? 'text-blue-600' : 'text-gray-600'
              }`} />
            </div>
            <h4 className="font-medium text-gray-900 dark:text-gray-100">GitHub Copilot</h4>
            <p className={`text-sm ${
              isCopilotEnabled ? 'text-blue-600' : 'text-gray-600'
            }`}>
              {isCopilotEnabled ? 'Active' : 'Inactive'}
            </p>
          </div>
          
          <div className="text-center">
            <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2 ${
              isGitHubConnected ? 'bg-purple-100 dark:bg-purple-900/20' : 'bg-gray-100 dark:bg-gray-700'
            }`}>
              <GitBranch className={`w-6 h-6 ${
                isGitHubConnected ? 'text-purple-600' : 'text-gray-600'
              }`} />
            </div>
            <h4 className="font-medium text-gray-900 dark:text-gray-100">GitHub</h4>
            <p className={`text-sm ${
              isGitHubConnected ? 'text-purple-600' : 'text-gray-600'
            }`}>
              {isGitHubConnected ? 'Connected' : 'Not Connected'}
            </p>
          </div>
        </div>
      </div>

      {/* System Monitor */}
      <SystemMonitor />
    </div>
  )
}