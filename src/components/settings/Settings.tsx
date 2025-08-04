'use client'

import { useState, useEffect } from 'react'
import {
  Settings as SettingsIcon,
  User,
  Github,
  Database,
  Palette,
  Bell,
  Shield,
  Download,
  Upload,
  Trash2,
  RefreshCw,
  Check,
  X,
  ExternalLink,
  Key,
  Monitor,
  Moon,
  Sun
} from 'lucide-react'
import { useEnhancedStore } from '@/stores/useEnhancedStore'
import { githubService } from '@/lib/github'
import { db } from '@/lib/database'

interface SettingsProps {
  className?: string
}

export default function Settings({ className = '' }: SettingsProps) {
  const {
    githubConfig,
    isGitHubConnected,
    setGitHubConfig,
    connectGitHub,
    disconnectGitHub,
    appStats,
    updateStats,
    logActivity
  } = useEnhancedStore()

  const [activeTab, setActiveTab] = useState<'general' | 'github' | 'data' | 'appearance' | 'about'>('general')
  const [githubToken, setGithubToken] = useState(githubConfig.token || '')
  const [githubUsername, setGithubUsername] = useState(githubConfig.username || '')
  const [githubRepo, setGithubRepo] = useState(githubConfig.repo || '')
  const [isConnecting, setIsConnecting] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system')
  const [notifications, setNotifications] = useState(true)
  const [autoSave, setAutoSave] = useState(true)
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'error' | null>(null)

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' || 'system'
    setTheme(savedTheme)
  }, [])

  const handleGitHubConnect = async () => {
    if (!githubToken) return

    setIsConnecting(true)
    try {
      setGitHubConfig({
        token: githubToken,
        username: githubUsername || undefined,
        repo: githubRepo || undefined
      })

      const success = await connectGitHub()
      if (success) {
        setSaveStatus('saved')
        logActivity('github_settings_updated')
        setTimeout(() => setSaveStatus(null), 3000)
      } else {
        setSaveStatus('error')
        setTimeout(() => setSaveStatus(null), 3000)
      }
    } catch (error) {
      console.error('GitHub connection error:', error)
      setSaveStatus('error')
      setTimeout(() => setSaveStatus(null), 3000)
    } finally {
      setIsConnecting(false)
    }
  }

  const handleGitHubDisconnect = () => {
    disconnectGitHub()
    setGithubToken('')
    setGithubUsername('')
    setGithubRepo('')
    setSaveStatus('saved')
    setTimeout(() => setSaveStatus(null), 3000)
  }

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    
    // Apply theme immediately
    const root = document.documentElement
    if (newTheme === 'dark') {
      root.classList.add('dark')
    } else if (newTheme === 'light') {
      root.classList.remove('dark')
    } else {
      // System theme
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        root.classList.add('dark')
      } else {
        root.classList.remove('dark')
      }
    }

    logActivity('theme_changed', { theme: newTheme })
  }

  const exportData = async () => {
    try {
      const [messages, documents, projects, analytics] = await Promise.all([
        db.getMessages(1000),
        db.getDocuments(),
        db.getProjects(),
        db.getAnalytics(90)
      ])

      const exportData = {
        version: '1.0.0',
        timestamp: Date.now(),
        data: {
          messages,
          documents,
          projects,
          analytics,
          stats: appStats
        }
      }

      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `harmonic-dashboard-export-${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      logActivity('data_exported')
    } catch (error) {
      console.error('Export failed:', error)
    }
  }

  const clearAllData = async () => {
    if (!confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      return
    }

    try {
      await db.clearOldData(0) // Clear all data
      await updateStats()
      logActivity('data_cleared')
      alert('All data has been cleared successfully.')
    } catch (error) {
      console.error('Clear data failed:', error)
      alert('Failed to clear data. Please try again.')
    }
  }

  const tabs = [
    { id: 'general', label: 'General', icon: SettingsIcon },
    { id: 'github', label: 'GitHub', icon: Github },
    { id: 'data', label: 'Data', icon: Database },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'about', label: 'About', icon: User }
  ]

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Configure your dashboard preferences and integrations
          </p>
        </div>
        
        {saveStatus && (
          <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
            saveStatus === 'saved' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
            saveStatus === 'saving' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' :
            'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
          }`}>
            {saveStatus === 'saved' && <Check className="w-4 h-4" />}
            {saveStatus === 'saving' && <RefreshCw className="w-4 h-4 animate-spin" />}
            {saveStatus === 'error' && <X className="w-4 h-4" />}
            <span className="text-sm font-medium">
              {saveStatus === 'saved' && 'Settings saved'}
              {saveStatus === 'saving' && 'Saving...'}
              {saveStatus === 'error' && 'Save failed'}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-64">
          <nav className="space-y-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            {/* General Settings */}
            {activeTab === 'general' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                    General Preferences
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          Notifications
                        </label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Receive notifications for important events
                        </p>
                      </div>
                      <button
                        onClick={() => setNotifications(!notifications)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          notifications ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            notifications ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          Auto-save
                        </label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Automatically save changes as you work
                        </p>
                      </div>
                      <button
                        onClick={() => setAutoSave(!autoSave)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          autoSave ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            autoSave ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* GitHub Settings */}
            {activeTab === 'github' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                    GitHub Integration
                  </h3>
                  
                  {isGitHubConnected ? (
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                      <div className="flex items-center space-x-2 mb-2">
                        <Check className="w-5 h-5 text-green-600" />
                        <span className="font-medium text-green-900 dark:text-green-100">
                          Connected to GitHub
                        </span>
                      </div>
                      <p className="text-sm text-green-700 dark:text-green-300 mb-4">
                        Your GitHub account is successfully connected and ready to use.
                      </p>
                      <button
                        onClick={handleGitHubDisconnect}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Disconnect GitHub
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          GitHub Personal Access Token
                        </label>
                        <input
                          type="password"
                          value={githubToken}
                          onChange={(e) => setGithubToken(e.target.value)}
                          placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
                        />
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          Generate a token at{' '}
                          <a 
                            href="https://github.com/settings/tokens" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
                          >
                            GitHub Settings
                            <ExternalLink className="w-3 h-3 inline ml-1" />
                          </a>
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Username (optional)
                        </label>
                        <input
                          type="text"
                          value={githubUsername}
                          onChange={(e) => setGithubUsername(e.target.value)}
                          placeholder="your-username"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Default Repository (optional)
                        </label>
                        <input
                          type="text"
                          value={githubRepo}
                          onChange={(e) => setGithubRepo(e.target.value)}
                          placeholder="repository-name"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <button
                        onClick={handleGitHubConnect}
                        disabled={!githubToken || isConnecting}
                        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
                      >
                        {isConnecting ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            <span>Connecting...</span>
                          </>
                        ) : (
                          <>
                            <Github className="w-4 h-4" />
                            <span>Connect GitHub</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Data Management */}
            {activeTab === 'data' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                    Data Management
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                        Export Data
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        Download all your data as a JSON file for backup or migration.
                      </p>
                      <button
                        onClick={exportData}
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        <span>Export Data</span>
                      </button>
                    </div>

                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                        Storage Usage
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Messages:</span>
                          <span className="font-medium text-gray-900 dark:text-gray-100">
                            {appStats.totalMessages}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Documents:</span>
                          <span className="font-medium text-gray-900 dark:text-gray-100">
                            {appStats.totalDocuments}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Projects:</span>
                          <span className="font-medium text-gray-900 dark:text-gray-100">
                            {appStats.totalProjects}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <h4 className="font-medium text-red-900 dark:text-red-100 mb-2">
                        Clear All Data
                      </h4>
                      <p className="text-sm text-red-700 dark:text-red-300 mb-4">
                        Permanently delete all stored data. This action cannot be undone.
                      </p>
                      <button
                        onClick={clearAllData}
                        className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Clear All Data</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Appearance Settings */}
            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                    Appearance
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Theme
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        <button
                          onClick={() => handleThemeChange('light')}
                          className={`p-4 border rounded-lg transition-colors ${
                            theme === 'light'
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                          }`}
                        >
                          <Sun className="w-6 h-6 mx-auto mb-2 text-yellow-500" />
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">Light</div>
                        </button>
                        
                        <button
                          onClick={() => handleThemeChange('dark')}
                          className={`p-4 border rounded-lg transition-colors ${
                            theme === 'dark'
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                          }`}
                        >
                          <Moon className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">Dark</div>
                        </button>
                        
                        <button
                          onClick={() => handleThemeChange('system')}
                          className={`p-4 border rounded-lg transition-colors ${
                            theme === 'system'
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                          }`}
                        >
                          <Monitor className="w-6 h-6 mx-auto mb-2 text-gray-500" />
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">System</div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* About */}
            {activeTab === 'about' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                    About Harmonic Dashboard
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                        <SettingsIcon className="w-8 h-8 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                          Harmonic Dashboard
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          Version 1.0.0
                        </p>
                      </div>
                    </div>

                    <div className="prose dark:prose-invert max-w-none">
                      <p className="text-gray-600 dark:text-gray-400">
                        A modern, integrated development dashboard that combines GitHub Copilot-powered 
                        documentation and chat functionality within a Codespace-optimized environment.
                      </p>
                      
                      <h5 className="text-gray-900 dark:text-gray-100 font-medium mt-4 mb-2">
                        Features:
                      </h5>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• Interactive AI-powered chat with code generation</li>
                        <li>• Advanced file upload and code analysis</li>
                        <li>• Project management with GitHub integration</li>
                        <li>• Real-time analytics and productivity tracking</li>
                        <li>• Persistent data storage with IndexedDB</li>
                        <li>• Modern responsive design with dark mode</li>
                      </ul>

                      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Built with Next.js, TypeScript, Tailwind CSS, and Zustand
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          © 2024 Harmonic Dashboard. All rights reserved.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
