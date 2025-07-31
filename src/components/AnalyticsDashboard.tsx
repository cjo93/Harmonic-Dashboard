'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, Activity, Target, Zap, Clock } from 'lucide-react'

interface MetricData {
  label: string
  value: string | number
  change: number
  trend: 'up' | 'down' | 'stable'
  color: string
  icon: React.ComponentType<any>
}

export default function AnalyticsDashboard() {
  const [metrics, setMetrics] = useState<MetricData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading metrics data
    const loadMetrics = () => {
      setTimeout(() => {
        setMetrics([
          {
            label: 'Active Development Time',
            value: '4.2h',
            change: 15.3,
            trend: 'up',
            color: 'text-blue-600',
            icon: Clock
          },
          {
            label: 'Code Quality Score',
            value: '94%',
            change: 2.1,
            trend: 'up',
            color: 'text-green-600',
            icon: Target
          },
          {
            label: 'AI Interactions',
            value: 42,
            change: -5.2,
            trend: 'down',
            color: 'text-purple-600',
            icon: Zap
          },
          {
            label: 'Productivity Index',
            value: '8.7/10',
            change: 12.4,
            trend: 'up',
            color: 'text-orange-600',
            icon: Activity
          }
        ])
        setIsLoading(false)
      }, 1000)
    }

    loadMetrics()
  }, [])

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <TrendingUp className="w-4 h-4 text-green-500" />
    if (trend === 'down') return <TrendingDown className="w-4 h-4 text-red-500" />
    return <Activity className="w-4 h-4 text-gray-500" />
  }

  const getTrendColor = (trend: string, change: number) => {
    if (trend === 'up') return 'text-green-600 bg-green-50'
    if (trend === 'down') return 'text-red-600 bg-red-50'
    return 'text-gray-600 bg-gray-50'
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded mb-4 w-1/3"></div>
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="p-4 bg-gray-100 rounded-lg">
                <div className="h-3 bg-gray-200 rounded mb-2"></div>
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Development Analytics</h3>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Live Data</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon
          return (
            <div 
              key={metric.label} 
              className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Icon className={`w-4 h-4 ${metric.color}`} />
                  <span className="text-sm font-medium text-gray-700">{metric.label}</span>
                </div>
                {getTrendIcon(metric.trend)}
              </div>
              
              <div className="flex items-end justify-between">
                <span className="text-xl font-bold text-gray-900">{metric.value}</span>
                <div className={`flex items-center space-x-1 text-xs px-2 py-1 rounded-full ${getTrendColor(metric.trend, metric.change)}`}>
                  <span>{metric.change > 0 ? '+' : ''}{metric.change}%</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>Last updated: {new Date().toLocaleTimeString()}</span>
          <button className="text-harmonic-600 hover:text-harmonic-700 font-medium">
            View Detailed Report →
          </button>
        </div>
      </div>
    </div>
  )
}
