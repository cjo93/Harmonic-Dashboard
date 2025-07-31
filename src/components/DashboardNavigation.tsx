'use client'

import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Zap, BarChart3, Brain, Compass } from 'lucide-react'

const NavContainer = styled.div`
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 100;
  display: flex;
  gap: 0.5rem;

  @media (max-width: 768px) {
    top: 1rem;
    right: 1rem;
    left: 1rem;
    justify-content: center;
  }
`

const NavButton = styled(motion.button)<{ $active?: boolean }>`
  background: ${props => props.$active 
    ? 'linear-gradient(135deg, #d4af37, #f4d03f)' 
    : 'rgba(255, 255, 255, 0.1)'
  };
  border: 1px solid ${props => props.$active ? '#d4af37' : 'rgba(255, 255, 255, 0.2)'};
  color: ${props => props.$active ? '#000' : '#fff'};
  padding: 0.75rem;
  border-radius: 12px;
  cursor: pointer;
  backdrop-filter: blur(20px);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  min-width: 50px;
  justify-content: center;

  &:hover {
    background: ${props => props.$active 
      ? 'linear-gradient(135deg, #f4d03f, #d4af37)' 
      : 'rgba(255, 255, 255, 0.2)'
    };
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 768px) {
    padding: 0.5rem;
    font-size: 0.8rem;
    min-width: 45px;
  }
`

const NavIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const NavLabel = styled.span`
  @media (max-width: 640px) {
    display: none;
  }
`

interface DashboardNavigationProps {
  currentDashboard: 'standard' | 'defrag'
  onDashboardChange: (dashboard: 'standard' | 'defrag') => void
}

export default function DashboardNavigation({ 
  currentDashboard, 
  onDashboardChange 
}: DashboardNavigationProps) {
  return (
    <NavContainer>
      <NavButton
        $active={currentDashboard === 'standard'}
        onClick={() => onDashboardChange('standard')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <NavIcon>
          <BarChart3 size={18} />
        </NavIcon>
        <NavLabel>Standard</NavLabel>
      </NavButton>

      <NavButton
        $active={currentDashboard === 'defrag'}
        onClick={() => onDashboardChange('defrag')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <NavIcon>
          <Brain size={18} />
        </NavIcon>
        <NavLabel>Defrag</NavLabel>
      </NavButton>

      <NavButton
        onClick={() => window.location.href = '/docs'}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <NavIcon>
          <Compass size={18} />
        </NavIcon>
        <NavLabel>Docs</NavLabel>
      </NavButton>
    </NavContainer>
  )
}
