'use client'

import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { HarmonicProfile } from '@/types'

const GaugeContainer = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(212, 175, 55, 0.3);
  border-radius: 20px;
  padding: 2rem;
  backdrop-filter: blur(20px);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #d4af37, #9333ea, #06b6d4);
  }
`

const Title = styled.h2`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.3rem;
  color: #d4af37;
  margin: 0 0 1.5rem 0;
  font-weight: 500;
`

const GaugeDisplay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`

const GaugeSVG = styled.svg`
  width: 200px;
  height: 120px;
  margin-bottom: 1rem;
`

const GaugeBackground = styled.path`
  fill: none;
  stroke: rgba(212, 175, 55, 0.2);
  stroke-width: 8;
  stroke-linecap: round;
`

const GaugeProgress = styled(motion.path)`
  fill: none;
  stroke: url(#msi-gradient);
  stroke-width: 8;
  stroke-linecap: round;
`

const MSIValue = styled(motion.div)`
  font-family: 'Montserrat', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: #d4af37;
  text-shadow: 0 0 20px rgba(212, 175, 55, 0.5);
  margin-bottom: 0.5rem;
`

const MSILabel = styled.div`
  font-family: 'Noto Serif', serif;
  color: #b8b8c4;
  font-size: 1rem;
  margin-bottom: 1rem;
`

const StatusIndicator = styled.div<{ level: 'low' | 'medium' | 'high' }>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  background: ${props => {
    switch (props.level) {
      case 'high': return 'rgba(16, 185, 129, 0.2)'
      case 'medium': return 'rgba(245, 158, 11, 0.2)'
      case 'low': return 'rgba(239, 68, 68, 0.2)'
      default: return 'rgba(147, 51, 234, 0.2)'
    }
  }};
  border: 1px solid ${props => {
    switch (props.level) {
      case 'high': return '#10b981'
      case 'medium': return '#f59e0b'
      case 'low': return '#ef4444'
      default: return '#9333ea'
    }
  }};
  color: ${props => {
    switch (props.level) {
      case 'high': return '#6ee7b7'
      case 'medium': return '#fbbf24'
      case 'low': return '#fca5a5'
      default: return '#c4b5fd'
    }
  }};
`

const StatusDot = styled.div<{ level: 'low' | 'medium' | 'high' }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => {
    switch (props.level) {
      case 'high': return '#10b981'
      case 'medium': return '#f59e0b'
      case 'low': return '#ef4444'
      default: return '#9333ea'
    }
  }};
`

interface MSIGaugeProps {
  harmonicProfile: HarmonicProfile
}

export default function MSIGauge({ harmonicProfile }: MSIGaugeProps) {
  const msi = harmonicProfile.msi
  const angle = (msi / 100) * 180 // Half circle, 0-180 degrees
  const radius = 80
  const centerX = 100
  const centerY = 100
  
  // Calculate the arc path for background
  const backgroundPath = `M ${centerX - radius} ${centerY} A ${radius} ${radius} 0 0 1 ${centerX + radius} ${centerY}`
  
  // Calculate the arc path for progress
  const endAngle = angle * (Math.PI / 180)
  const endX = centerX + radius * Math.cos(Math.PI - endAngle)
  const endY = centerY - radius * Math.sin(Math.PI - endAngle)
  const largeArc = angle > 90 ? 1 : 0
  const progressPath = `M ${centerX - radius} ${centerY} A ${radius} ${radius} 0 ${largeArc} 1 ${endX} ${endY}`
  
  const getStatusLevel = (value: number): 'low' | 'medium' | 'high' => {
    if (value >= 80) return 'high'
    if (value >= 60) return 'medium'
    return 'low'
  }
  
  const getStatusText = (value: number): string => {
    if (value >= 90) return 'Optimal Synthesis'
    if (value >= 80) return 'High Coherence'
    if (value >= 70) return 'Harmonizing'
    if (value >= 60) return 'Moderate Flow'
    if (value >= 50) return 'Building Resonance'
    return 'Initialization Phase'
  }
  
  const statusLevel = getStatusLevel(msi)
  const statusText = getStatusText(msi)
  
  return (
    <GaugeContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Title>Master Synthesis Index</Title>
      
      <GaugeDisplay>
        <GaugeSVG viewBox="0 0 200 120">
          <defs>
            <linearGradient id="msi-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>
          
          <GaugeBackground d={backgroundPath} />
          
          <GaugeProgress
            d={progressPath}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
        </GaugeSVG>
        
        <MSIValue
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, type: "spring", stiffness: 200 }}
        >
          {msi.toFixed(0)}
        </MSIValue>
        
        <MSILabel>Harmonic Synthesis Level</MSILabel>
        
        <StatusIndicator level={statusLevel}>
          <StatusDot level={statusLevel} />
          {statusText}
        </StatusIndicator>
      </GaugeDisplay>
    </GaugeContainer>
  )
}
