import { create } from 'zustand'

export interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message: string
  timestamp: Date
  action?: {
    label: string
    onClick: () => void
  }
  duration?: number
}

interface NotificationStore {
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void
  removeNotification: (id: string) => void
  clearAllNotifications: () => void
}

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  notifications: [],
  
  addNotification: (notification) => {
    const id = Math.random().toString(36).substring(2) + Date.now().toString(36)
    const newNotification: Notification = {
      ...notification,
      id,
      timestamp: new Date(),
      duration: notification.duration || 5000
    }
    
    set((state) => ({
      notifications: [...state.notifications, newNotification]
    }))
    
    // Auto-remove notification after duration
    if (newNotification.duration && newNotification.duration > 0) {
      setTimeout(() => {
        get().removeNotification(id)
      }, newNotification.duration)
    }
  },
  
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter(n => n.id !== id)
    })),
  
  clearAllNotifications: () =>
    set({ notifications: [] })
}))
