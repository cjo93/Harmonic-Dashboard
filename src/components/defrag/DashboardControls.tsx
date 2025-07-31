'use client'

import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { RefreshCw, Play, Pause, Settings } from 'lucide-react'

const ControlsContainer = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
`

const ControlButton = styled(motion.button)<{ $active?: boolean; $variant?: 'primary' | 'secondary' }>`
  background: ${props => {
    if (props.$variant === 'primary') {
      return 'linear-gradient(135deg, #d4af37, #f4d03f)'
    }
    return props.$active 
      ? 'rgba(212, 175, 55, 0.3)' 
      : 'rgba(255, 255, 255, 0.1)'
  }};
  border: 1px solid ${props => props.$active ? '#d4af37' : 'rgba(255, 255, 255, 0.2)'};
  color: ${props => props.$variant === 'primary' ? '#000' : '#fff'};
  padding: 0.75rem;
  border-radius: 10px;
  cursor: pointer;
  backdrop-filter: blur(20px);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 44px;
  min-height: 44px;

  &:hover {
    background: ${props => {
      if (props.$variant === 'primary') {
        return 'linear-gradient(135deg, #f4d03f, #d4af37)'
      }
      return 'rgba(212, 175, 55, 0.4)'
    }};
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`

const StatusIndicator = styled.div<{ $active: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.$active ? '#10b981' : '#ef4444'};
  margin-left: 0.5rem;
  position: relative;

  ${props => props.$active && `
    &::after {
      content: '';
      position: absolute;
      top: -2px;
      left: -2px;
      right: -2px;
      bottom: -2px;
      border-radius: 50%;
      background: inherit;
      opacity: 0.3;
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0% { transform: scale(1); opacity: 0.3; }
      50% { transform: scale(1.5); opacity: 0.1; }
      100% { transform: scale(1); opacity: 0.3; }
    }
  `}
`

const ControlGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`

const ControlLabel = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-size: 0.85rem;
  color: #b8b8c4;
  margin-left: 0.5rem;

  @media (max-width: 640px) {
    display: none;
  }
`

interface DashboardControlsProps {
  onRefresh: () => void
  onToggleAutoRefresh: () => void
  autoRefresh: boolean
  isLoading: boolean
  onSettings?: () => void
}

export default function DashboardControls({
  onRefresh,
  onToggleAutoRefresh,
  autoRefresh,
  isLoading,
  onSettings
}: DashboardControlsProps) {
  return (
    <ControlsContainer>
      <ControlButton
        onClick={onRefresh}
        disabled={isLoading}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title="Refresh harmonic data"
      >
        <motion.div
          animate={{ rotate: isLoading ? 360 : 0 }}
          transition={{ duration: 1, repeat: isLoading ? Infinity : 0, ease: "linear" }}
        >
          <RefreshCw size={18} />
        </motion.div>
      </ControlButton>

      <ControlGroup>
        <ControlButton
          $active={autoRefresh}
          onClick={onToggleAutoRefresh}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title={autoRefresh ? "Disable auto-refresh" : "Enable auto-refresh"}
        >
          {autoRefresh ? <Pause size={16} /> : <Play size={16} />}
        </ControlButton>
        <StatusIndicator $active={autoRefresh} />
        <ControlLabel>Auto-refresh</ControlLabel>
      </ControlGroup>

      {onSettings && (
        <ControlButton
          onClick={onSettings}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title="Dashboard settings"
        >
          <Settings size={18} />
        </ControlButton>
      )}
    </ControlsContainer>
  )
}
