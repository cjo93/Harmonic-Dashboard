'use client'

import { useState, useEffect } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from 'recharts'
import {
  Activity,
  MessageSquare,
  FileText,
  Code,
  TrendingUp,
  TrendingDown,
  Clock,
  Users,
  GitBranch,
  Zap,
  Target,
  Calendar
} from 'lucide-react'
import { useEnhancedStore } from '@/stores/useEnhancedStore'
import { db } from '@/lib/database'

interface AnalyticsProps {
  className?: string
}

interface ActivityData {
  date: string
  messages: number
  documents: number
  projects: number
}

interface LanguageData {
  name: string
  value: number
  color: string
}

interface PerformanceMetric {
  label: string
  value: string
  change: number
  icon: React.ElementType
  color: string
}

export default function Analytics({ className = '' }: AnalyticsProps) {
  const { appStats, projects, documents, messages } = useEnhancedStore()
  const [analyticsData, setAnalyticsData] = useState<any[]>([])
  const [activityData, setActivityData] = useState<ActivityData[]>([])
  const [languageData, setLanguageData] = useState<LanguageData[]>([])
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadAnalyticsData()
  }, [timeRange])

  const loadAnalyticsData = async () => {
    setIsLoading(true)
    try {
      const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90
      const analyticsEvents = await db.getAnalytics(days)
      
      // Process activity data
      const activityMap = new Map<string, { messages: number; documents: number; projects: number }>()
      
      for (let i = days - 1; i >= 0; i--) {
        const date = new Date()
        date.setDate(date.getDate() - i)
        const dateKey = date.toISOString().split('T')[0]
        activityMap.set(dateKey, { messages: 0, documents: 0, projects: 0 })
      }

      analyticsEvents.forEach(event => {
        const date = new Date(event.timestamp).toISOString().split('T')[0]
        if (activityMap.has(date)) {
          const dayData = activityMap.get(date)!
          if (event.event === 'message_sent') dayData.messages++
          if (event.event === 'document_created') dayData.documents++
          if (event.event === 'project_created') dayData.projects++
        }
      })

      const activityArray = Array.from(activityMap.entries()).map(([date, data]) => ({
        date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        ...data
      }))

      setActivityData(activityArray)
      setAnalyticsData(analyticsEvents)

      // Process language data
      const languageCount = new Map<string, number>()
      projects.forEach(project => {
        project.languages.forEach(lang => {
          languageCount.set(lang, (languageCount.get(lang) || 0) + 1)
        })
      })

      const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4']
      const languageArray = Array.from(languageCount.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 6)
        .map(([name, value], index) => ({
          name,
          value,
          color: colors[index % colors.length]
        }))

      setLanguageData(languageArray)
    } catch (error) {
      console.error('Failed to load analytics data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const performanceMetrics: PerformanceMetric[] = [
    {
      label: 'Total Messages',
      value: appStats.totalMessages.toString(),
      change: 12,
      icon: MessageSquare,
      color: 'blue'
    },
    {
      label: 'Documents Created',
      value: appStats.totalDocuments.toString(),
      change: 8,
      icon: FileText,
      color: 'green'
    },
    {
      label: 'Active Projects',
      value: appStats.totalProjects.toString(),
      change: 5,
      icon: Code,
      color: 'purple'
    },
    {
      label: 'Daily Average Activity',
      value: Math.round(analyticsData.length / 7).toString(),
      change: -2,
      icon: Activity,
      color: 'orange'
    }
  ]

  const getMetricColor = (color: string) => {
    const colors = {
      blue: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20',
      green: 'text-green-600 bg-green-50 dark:bg-green-900/20',
      purple: 'text-purple-600 bg-purple-50 dark:bg-purple-900/20',
      orange: 'text-orange-600 bg-orange-50 dark:bg-orange-900/20'
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  const formatUptime = (ms: number) => {
    const hours = Math.floor(ms / (1000 * 60 * 60))
    return `${hours}h`
  }

  if (isLoading) {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
            ))}
          </div>
          <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
        </div>
      </div>
    )
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Analytics Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your development activity and productivity metrics
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceMetrics.map((metric, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {metric.label}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">
                  {metric.value}
                </p>
                <div className="flex items-center mt-2">
                  {metric.change > 0 ? (
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                  )}
                  <span className={`text-sm font-medium ${
                    metric.change > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {Math.abs(metric.change)}%
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                    vs last period
                  </span>
                </div>
              </div>
              <div className={`p-3 rounded-lg ${getMetricColor(metric.color)}`}>
                <metric.icon className="w-6 h-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Timeline */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Activity Timeline
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="date" 
                className="text-gray-600 dark:text-gray-400"
                fontSize={12}
              />
              <YAxis className="text-gray-600 dark:text-gray-400" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--color-gray-800)',
                  border: '1px solid var(--color-gray-700)',
                  borderRadius: '8px',
                  color: 'var(--color-gray-100)'
                }}
              />
              <Area
                type="monotone"
                dataKey="messages"
                stackId="1"
                stroke="#3B82F6"
                fill="#3B82F6"
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="documents"
                stackId="1"
                stroke="#10B981"
                fill="#10B981"
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="projects"
                stackId="1"
                stroke="#F59E0B"
                fill="#F59E0B"
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Language Distribution */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Language Distribution
          </h3>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={languageData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {languageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Detailed Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* System Status */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            System Status
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Codespace</span>
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {appStats.codespaceUptime ? formatUptime(appStats.codespaceUptime) : 'Offline'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">GitHub Copilot</span>
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Active</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Database</span>
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Connected</span>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Recent Activity
          </h3>
          <div className="space-y-3">
            {analyticsData.slice(0, 5).map((event, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                  {event.event === 'message_sent' && <MessageSquare className="w-4 h-4 text-blue-500" />}
                  {event.event === 'document_created' && <FileText className="w-4 h-4 text-green-500" />}
                  {event.event === 'project_created' && <Code className="w-4 h-4 text-purple-500" />}
                  {!['message_sent', 'document_created', 'project_created'].includes(event.event) && (
                    <Activity className="w-4 h-4 text-gray-500" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {event.event.replace('_', ' ').charAt(0).toUpperCase() + event.event.replace('_', ' ').slice(1)}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(event.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Productivity Score */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Productivity Score
          </h3>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {Math.min(100, Math.round((appStats.totalMessages + appStats.totalDocuments * 2 + appStats.totalProjects * 5) / 10))}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Based on your activity
            </p>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                style={{ 
                  width: `${Math.min(100, Math.round((appStats.totalMessages + appStats.totalDocuments * 2 + appStats.totalProjects * 5) / 10))}%` 
                }}
              />
            </div>
          </div>
          <div className="mt-4 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Messages</span>
              <span className="font-medium text-gray-900 dark:text-gray-100">{appStats.totalMessages}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Documents</span>
              <span className="font-medium text-gray-900 dark:text-gray-100">{appStats.totalDocuments}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Projects</span>
              <span className="font-medium text-gray-900 dark:text-gray-100">{appStats.totalProjects}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
