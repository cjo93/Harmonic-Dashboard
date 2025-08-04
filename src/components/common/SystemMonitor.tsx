'use client'

import { useState, useEffect } from 'react'
import { useEnhancedStore } from '@/stores/useEnhancedStore'
import { useNotificationStore } from '@/stores/useNotificationStore'
import { 
  Server, 
  Database, 
  Wifi, 
  GitBranch, 
  Zap, 
  Activity,
  CheckCircle,
  AlertCircle,
  Clock
} from 'lucide-react'

interface SystemStatus {
  server: 'online' | 'offline' | 'degraded'
  database: 'connected' | 'disconnected' | 'syncing'
  api: 'operational' | 'limited' | 'down'
  github: 'connected' | 'disconnected' | 'rate_limited'
  copilot: 'active' | 'inactive' | 'error'
}

interface ServiceHealth {
  name: string
  status: string
  icon: React.ElementType
  color: string
  description: string
  lastChecked: Date
}

export default function SystemMonitor() {
  const [systemStatus, setSystemStatus] = useState<SystemStatus>({
    server: 'online',
    database: 'connected',
    api: 'operational',
    github: 'disconnected',
    copilot: 'inactive'
  })
  
  const [uptime, setUptime] = useState(0)
  const { isCodespaceConnected, isGitHubConnected, isCopilotEnabled } = useEnhancedStore()
  const { addNotification } = useNotificationStore()

  useEffect(() => {
    // Update system status based on store state
    setSystemStatus(prev => ({
      ...prev,
      github: isGitHubConnected ? 'connected' : 'disconnected',
      copilot: isCopilotEnabled ? 'active' : 'inactive',
      server: isCodespaceConnected ? 'online' : 'offline'
    }))
  }, [isCodespaceConnected, isGitHubConnected, isCopilotEnabled])

  useEffect(() => {
    // Simulate uptime counter
    const interval = setInterval(() => {
      setUptime(prev => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Health check simulation
    const healthCheck = setInterval(async () => {
      try {
        // Simulate API health check
        const response = await fetch('/api/health', { method: 'HEAD' })
        setSystemStatus(prev => ({
          ...prev,
          api: response.ok ? 'operational' : 'limited'
        }))
      } catch (error) {
        setSystemStatus(prev => ({
          ...prev,
          api: 'down'
        }))
        
        addNotification({
          title: 'API Health Check Failed',
          message: 'Unable to reach API endpoints',
          type: 'warning'
        })
      }
    }, 30000) // Check every 30 seconds

    return () => clearInterval(healthCheck)
  }, [addNotification])

  const formatUptime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
      case 'connected':
      case 'operational':
      case 'active':
        return 'text-green-500 bg-green-50 dark:bg-green-900/20'
      case 'offline':
      case 'disconnected':
      case 'down':
      case 'inactive':
        return 'text-red-500 bg-red-50 dark:bg-red-900/20'
      case 'degraded':
      case 'limited':
      case 'syncing':
      case 'rate_limited':
      case 'error':
        return 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
      default:
        return 'text-gray-500 bg-gray-50 dark:bg-gray-900/20'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
      case 'connected':
      case 'operational':
      case 'active':
        return CheckCircle
      case 'offline':
      case 'disconnected':
      case 'down':
      case 'inactive':
        return AlertCircle
      default:
        return Clock
    }
  }

  const services: ServiceHealth[] = [
    {
      name: 'Development Server',
      status: systemStatus.server,
      icon: Server,
      color: getStatusColor(systemStatus.server),
      description: isCodespaceConnected ? 'Running on port 3002' : 'Server offline',
      lastChecked: new Date()
    },
    {
      name: 'Database',
      status: systemStatus.database,
      icon: Database,
      color: getStatusColor(systemStatus.database),
      description: 'IndexedDB storage layer',
      lastChecked: new Date()
    },
    {
      name: 'API Endpoints',
      status: systemStatus.api,
      icon: Wifi,
      color: getStatusColor(systemStatus.api),
      description: 'REST API services',
      lastChecked: new Date()
    },
    {
      name: 'GitHub Integration',
      status: systemStatus.github,
      icon: GitBranch,
      color: getStatusColor(systemStatus.github),
      description: isGitHubConnected ? 'Connected to repository' : 'Not connected',
      lastChecked: new Date()
    },
    {
      name: 'GitHub Copilot',
      status: systemStatus.copilot,
      icon: Zap,
      color: getStatusColor(systemStatus.copilot),
      description: isCopilotEnabled ? 'AI assistance active' : 'AI assistance disabled',
      lastChecked: new Date()
    }
  ]

  const overallHealth = services.filter(s => 
    ['online', 'connected', 'operational', 'active'].includes(s.status)
  ).length / services.length

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Activity className="w-6 h-6 text-blue-500" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            System Monitor
          </h3>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500 dark:text-gray-400">Uptime</div>
          <div className="text-lg font-mono text-gray-900 dark:text-gray-100">
            {formatUptime(uptime)}
          </div>
        </div>
      </div>

      {/* Overall Health */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Overall Health
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {Math.round(overallHealth * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${
              overallHealth >= 0.8 ? 'bg-green-500' :
              overallHealth >= 0.6 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${overallHealth * 100}%` }}
          />
        </div>
      </div>

      {/* Service Status */}
      <div className="space-y-3">
        {services.map((service, index) => {
          const StatusIcon = getStatusIcon(service.status)
          return (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${service.color}`}>
                  <service.icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-gray-100">
                    {service.name}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {service.description}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <StatusIcon className={`w-4 h-4 ${
                  service.status.includes('connect') || service.status.includes('active') || service.status.includes('operational') || service.status.includes('online')
                    ? 'text-green-500'
                    : service.status.includes('disconnect') || service.status.includes('inactive') || service.status.includes('down') || service.status.includes('offline')
                    ? 'text-red-500'
                    : 'text-yellow-500'
                }`} />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                  {service.status.replace('_', ' ')}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
