'use client'

import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(10px);
`

const ModalContent = styled(motion.div)`
  background: linear-gradient(135deg, 
    rgba(15, 15, 35, 0.95) 0%, 
    rgba(26, 26, 46, 0.95) 50%, 
    rgba(22, 33, 62, 0.95) 100%
  );
  border: 2px solid #d4af37;
  border-radius: 20px;
  padding: 2rem;
  max-width: 500px;
  margin: 2rem;
  backdrop-filter: blur(20px);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`

const Title = styled.h2`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.5rem;
  color: #d4af37;
  margin: 0;
  font-weight: 500;
`

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #b8b8c4;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #d4af37;
    background: rgba(212, 175, 55, 0.1);
  }
`

const SettingItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  &:last-child {
    border-bottom: none;
  }
`

const SettingLabel = styled.div`
  font-family: 'Noto Serif', serif;
  color: #e5e7eb;
  font-size: 1rem;
`

const Toggle = styled.button<{ active: boolean }>`
  background: ${props => props.active ? '#d4af37' : 'rgba(255, 255, 255, 0.2)'};
  border: none;
  border-radius: 12px;
  width: 48px;
  height: 24px;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;

  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: ${props => props.active ? '26px' : '2px'};
    width: 20px;
    height: 20px;
    background: white;
    border-radius: 50%;
    transition: all 0.3s ease;
  }
`

interface DashboardSettingsProps {
  onClose: () => void
  autoRefresh: boolean
  onToggleAutoRefresh: (value: boolean) => void
  refreshInterval: number
  onRefreshIntervalChange: (value: number) => void
}

export default function DashboardSettings({
  onClose,
  autoRefresh,
  onToggleAutoRefresh,
  refreshInterval,
  onRefreshIntervalChange
}: DashboardSettingsProps) {
  return (
    <ModalOverlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <ModalContent
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
        <Header>
          <Title>Dashboard Settings</Title>
          <CloseButton onClick={onClose}>
            <X size={20} />
          </CloseButton>
        </Header>

        <SettingItem>
          <SettingLabel>Auto-refresh data</SettingLabel>
          <Toggle
            active={autoRefresh}
            onClick={() => onToggleAutoRefresh(!autoRefresh)}
          />
        </SettingItem>

        <SettingItem>
          <SettingLabel>Refresh interval (seconds)</SettingLabel>
          <select
            value={refreshInterval / 1000}
            onChange={(e) => onRefreshIntervalChange(Number(e.target.value) * 1000)}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              color: '#fff',
              padding: '0.5rem',
              borderRadius: '6px',
              fontSize: '0.9rem'
            }}
          >
            <option value={10}>10 seconds</option>
            <option value={30}>30 seconds</option>
            <option value={60}>1 minute</option>
            <option value={300}>5 minutes</option>
          </select>
        </SettingItem>
      </ModalContent>
    </ModalOverlay>
  )
}
