'use client'

import React from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react'
import { useNotificationStore } from '@/stores/useNotifications'

const NotificationContainer = styled.div`
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-width: 400px;

  @media (max-width: 768px) {
    top: 1rem;
    right: 1rem;
    left: 1rem;
    max-width: none;
  }
`

const NotificationItem = styled(motion.div)<{ type: 'success' | 'error' | 'warning' | 'info' }>`
  background: ${props => {
    switch (props.type) {
      case 'success': return 'linear-gradient(135deg, rgba(16, 185, 129, 0.9), rgba(5, 150, 105, 0.9))'
      case 'error': return 'linear-gradient(135deg, rgba(239, 68, 68, 0.9), rgba(220, 38, 38, 0.9))'
      case 'warning': return 'linear-gradient(135deg, rgba(245, 158, 11, 0.9), rgba(217, 119, 6, 0.9))'
      default: return 'linear-gradient(135deg, rgba(59, 130, 246, 0.9), rgba(37, 99, 235, 0.9))'
    }
  }};
  border: 1px solid ${props => {
    switch (props.type) {
      case 'success': return '#10b981'
      case 'error': return '#ef4444'
      case 'warning': return '#f59e0b'
      default: return '#3b82f6'
    }
  }};
  border-radius: 12px;
  padding: 1rem 1.25rem;
  backdrop-filter: blur(20px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  color: white;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${props => {
      switch (props.type) {
        case 'success': return '#10b981'
        case 'error': return '#ef4444'
        case 'warning': return '#f59e0b'
        default: return '#3b82f6'
      }
    }};
  }
`

const IconContainer = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.125rem;
`

const MessageContent = styled.div`
  flex: 1;
  font-family: 'Noto Serif', serif;
  font-size: 0.9rem;
  line-height: 1.4;
`

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.7;
  transition: opacity 0.2s ease;
  flex-shrink: 0;

  &:hover {
    opacity: 1;
    background: rgba(255, 255, 255, 0.1);
  }
`

export default function NotificationManager() {
  const { notifications, removeNotification } = useNotificationStore()

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle size={18} />
      case 'error':
        return <AlertCircle size={18} />
      case 'warning':
        return <AlertTriangle size={18} />
      default:
        return <Info size={18} />
    }
  }

  return (
    <NotificationContainer>
      <AnimatePresence>
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            type={notification.type}
            initial={{ opacity: 0, x: 300, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            layout
          >
            <IconContainer>
              {getIcon(notification.type)}
            </IconContainer>
            
            <MessageContent>
              {notification.message}
            </MessageContent>
            
            <CloseButton onClick={() => removeNotification(notification.id)}>
              <X size={16} />
            </CloseButton>
          </NotificationItem>
        ))}
      </AnimatePresence>
    </NotificationContainer>
  )
}
