'use client'

import { useState, useEffect } from 'react'
import { MessageCircle, FileText, Code, GitBranch, Zap, Clock, User, Bot } from 'lucide-react'

interface ActivityItem {
  id: string
  type: 'chat' | 'doc' | 'code' | 'system' | 'ai'
  message: string
  details?: string
  timestamp: Date
  user: 'user' | 'system' | 'ai'
  priority: 'low' | 'medium' | 'high'
}

export default function ActivityFeed() {
  const [activities, setActivities] = useState<ActivityItem[]>([])
  const [isLive, setIsLive] = useState(true)

  useEffect(() => {
    // Initial activities
    const initialActivities: ActivityItem[] = [
      {
        id: '1',
        type: 'ai',
        message: 'AI Assistant generated React component',
        details: 'Created TypeScript interface with props validation',
        timestamp: new Date(Date.now() - 2 * 60 * 1000),
        user: 'ai',
        priority: 'medium'
      },
      {
        id: '2',
        type: 'doc',
        message: 'Updated API documentation',
        details: 'Added new endpoint specifications',
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
        user: 'user',
        priority: 'low'
      },
      {
        id: '3',
        type: 'system',
        message: 'Codespace environment optimized',
        details: 'Performance improvements applied',
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        user: 'system',
        priority: 'high'
      },
      {
        id: '4',
        type: 'chat',
        message: 'Started new AI conversation',
        details: 'Discussing state management patterns',
        timestamp: new Date(Date.now() - 45 * 60 * 1000),
        user: 'user',
        priority: 'medium'
      }
    ]

    setActivities(initialActivities)

    // Simulate real-time updates
    if (isLive) {
      const interval = setInterval(() => {
        const newActivity: ActivityItem = {
          id: Date.now().toString(),
          type: ['chat', 'doc', 'code', 'ai'][Math.floor(Math.random() * 4)] as any,
          message: [
            'AI generated code snippet',
            'Documentation updated',
            'Code review completed',
            'New chat session started'
          ][Math.floor(Math.random() * 4)],
          details: 'Real-time activity simulation',
          timestamp: new Date(),
          user: ['user', 'ai', 'system'][Math.floor(Math.random() * 3)] as any,
          priority: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as any
        }

        setActivities(prev => [newActivity, ...prev.slice(0, 9)]) // Keep only 10 items
      }, 15000) // Add new activity every 15 seconds

      return () => clearInterval(interval)
    }
  }, [isLive])

  const getIcon = (type: string, user: string) => {
    if (user === 'ai') return <Bot className="w-4 h-4" />
    if (user === 'system') return <Zap className="w-4 h-4" />
    
    switch (type) {
      case 'chat': return <MessageCircle className="w-4 h-4" />
      case 'doc': return <FileText className="w-4 h-4" />
      case 'code': return <Code className="w-4 h-4" />
      case 'system': return <GitBranch className="w-4 h-4" />
      default: return <User className="w-4 h-4" />
    }
  }

  const getColor = (type: string, user: string, priority: string) => {
    if (user === 'ai') return 'bg-purple-100 text-purple-600 border-purple-200'
    if (user === 'system') return 'bg-orange-100 text-orange-600 border-orange-200'
    if (priority === 'high') return 'bg-red-100 text-red-600 border-red-200'
    if (priority === 'medium') return 'bg-blue-100 text-blue-600 border-blue-200'
    return 'bg-gray-100 text-gray-600 border-gray-200'
  }

  const formatTime = (timestamp: Date) => {
    const diff = Date.now() - timestamp.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(minutes / 60)
    
    if (hours > 0) return `${hours}h ago`
    if (minutes > 0) return `${minutes}m ago`
    return 'Just now'
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Live Activity Feed</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsLive(!isLive)}
            className={`flex items-center space-x-1 text-xs px-2 py-1 rounded-full transition-colors ${
              isLive 
                ? 'bg-green-100 text-green-700 border border-green-200' 
                : 'bg-gray-100 text-gray-700 border border-gray-200'
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
            <span>{isLive ? 'Live' : 'Paused'}</span>
          </button>
        </div>
      </div>

      <div className="space-y-3 max-h-80 overflow-y-auto">
        {activities.map((activity, index) => (
          <div 
            key={activity.id} 
            className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className={`p-2 rounded-full border ${getColor(activity.type, activity.user, activity.priority)}`}>
              {getIcon(activity.type, activity.user)}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {activity.message}
                </p>
                <div className="flex items-center space-x-1 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  <span>{formatTime(activity.timestamp)}</span>
                </div>
              </div>
              
              {activity.details && (
                <p className="text-xs text-gray-600 mt-1">{activity.details}</p>
              )}
              
              <div className="flex items-center space-x-2 mt-2">
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  activity.user === 'ai' ? 'bg-purple-50 text-purple-600' :
                  activity.user === 'system' ? 'bg-orange-50 text-orange-600' :
                  'bg-blue-50 text-blue-600'
                }`}>
                  {activity.user === 'ai' ? 'AI' : activity.user === 'system' ? 'System' : 'User'}
                </span>
                
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  activity.priority === 'high' ? 'bg-red-50 text-red-600' :
                  activity.priority === 'medium' ? 'bg-yellow-50 text-yellow-600' :
                  'bg-green-50 text-green-600'
                }`}>
                  {activity.priority}
                </span>
              </div>
            </div>
          </div>
        ))}
        
        {activities.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No recent activity</p>
          </div>
        )}
      </div>
    </div>
  )
}
