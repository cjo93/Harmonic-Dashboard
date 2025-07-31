'use client'

import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react'
import { useNotificationStore, Notification } from '@/stores/useNotifications'
import { cn } from '@/lib/utils'

const NotificationItem = ({ notification }: { notification: Notification }) => {
  const { removeNotification } = useNotificationStore()

  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info
  }

  const colors = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800'
  }

  const iconColors = {
    success: 'text-green-500',
    error: 'text-red-500',
    warning: 'text-yellow-500',
    info: 'text-blue-500'
  }

  const Icon = icons[notification.type]

  return (
    <div className={cn(
      'mb-4 p-4 rounded-lg border shadow-sm animate-in slide-in-from-right duration-300',
      colors[notification.type]
    )}>
      <div className="flex items-start">
        <Icon className={cn('w-5 h-5 mr-3 mt-0.5 flex-shrink-0', iconColors[notification.type])} />
        
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium">{notification.title}</h4>
          <p className="text-sm mt-1 opacity-90">{notification.message}</p>
          
          {notification.action && (
            <button
              onClick={notification.action.onClick}
              className="text-sm font-medium underline hover:no-underline mt-2"
            >
              {notification.action.label}
            </button>
          )}
        </div>
        
        <button
          onClick={() => removeNotification(notification.id)}
          className="ml-3 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export default function NotificationContainer() {
  const { notifications } = useNotificationStore()

  useEffect(() => {
    // Create notification container if it doesn't exist
    let container = document.getElementById('notification-container')
    if (!container) {
      container = document.createElement('div')
      container.id = 'notification-container'
      container.className = 'fixed top-4 right-4 z-50 w-80 max-w-sm'
      document.body.appendChild(container)
    }

    return () => {
      // Cleanup on unmount
      const container = document.getElementById('notification-container')
      if (container && container.children.length === 0) {
        document.body.removeChild(container)
      }
    }
  }, [])

  if (notifications.length === 0) return null

  const container = document.getElementById('notification-container')
  if (!container) return null

  return createPortal(
    <div className="space-y-2">
      {notifications.map((notification) => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
    </div>,
    container
  )
}
