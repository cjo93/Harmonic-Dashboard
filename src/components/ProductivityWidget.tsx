'use client'

import { useState, useEffect } from 'react'
import { Brain, Code, FileText, MessageSquare, Clock, CheckCircle } from 'lucide-react'

interface ProductivityMetric {
  type: 'code' | 'docs' | 'chat' | 'review'
  count: number
  time: string
  improvement: number
}

export default function ProductivityWidget() {
  const [metrics, setMetrics] = useState<ProductivityMetric[]>([])
  const [totalSaved, setTotalSaved] = useState(0)

  useEffect(() => {
    // Simulate real-time productivity data
    const updateMetrics = () => {
      const newMetrics: ProductivityMetric[] = [
        { type: 'code', count: 23, time: '2.3h', improvement: 45 },
        { type: 'docs', count: 8, time: '1.1h', improvement: 60 },
        { type: 'chat', count: 15, time: '0.8h', improvement: 75 },
        { type: 'review', count: 5, time: '0.5h', improvement: 30 }
      ]
      setMetrics(newMetrics)
      setTotalSaved(newMetrics.reduce((acc, m) => acc + m.improvement, 0) / newMetrics.length)
    }

    updateMetrics()
    const interval = setInterval(updateMetrics, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const getIcon = (type: string) => {
    switch (type) {
      case 'code': return <Code className="w-4 h-4" />
      case 'docs': return <FileText className="w-4 h-4" />
      case 'chat': return <MessageSquare className="w-4 h-4" />
      case 'review': return <CheckCircle className="w-4 h-4" />
      default: return <Brain className="w-4 h-4" />
    }
  }

  const getLabel = (type: string) => {
    switch (type) {
      case 'code': return 'Code Generated'
      case 'docs': return 'Docs Created'
      case 'chat': return 'AI Conversations'
      case 'review': return 'Code Reviews'
      default: return 'Other'
    }
  }

  const getColor = (type: string) => {
    switch (type) {
      case 'code': return 'bg-blue-100 text-blue-600'
      case 'docs': return 'bg-green-100 text-green-600'
      case 'chat': return 'bg-purple-100 text-purple-600'
      case 'review': return 'bg-orange-100 text-orange-600'
      default: return 'bg-gray-100 text-gray-600'
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Brain className="w-5 h-5 text-harmonic-600" />
          <h3 className="text-lg font-semibold text-gray-900">AI Productivity</h3>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">Time Saved Today</div>
          <div className="text-xl font-bold text-harmonic-600">{totalSaved.toFixed(0)}%</div>
        </div>
      </div>

      <div className="space-y-4">
        {metrics.map((metric, index) => (
          <div key={metric.type} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${getColor(metric.type)}`}>
                {getIcon(metric.type)}
              </div>
              <div>
                <div className="font-medium text-gray-900">{getLabel(metric.type)}</div>
                <div className="text-sm text-gray-500">{metric.count} items • {metric.time}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-green-600">+{metric.improvement}%</div>
              <div className="text-xs text-gray-500">efficiency</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span>Tracking since session start</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-600 font-medium">Active</span>
          </div>
        </div>
      </div>
    </div>
  )
}
