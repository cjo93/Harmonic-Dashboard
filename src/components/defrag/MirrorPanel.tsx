'use client'

import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { HarmonicProfile } from '@/types'

const PanelContainer = styled(motion.div)`
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

const MirrorList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const MirrorItem = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(212, 175, 55, 0.2);
  border-radius: 12px;
  padding: 1.5rem;
  position: relative;
`

const MirrorHeader = styled.div`
  display: flex;
  justify-content: between;
  align-items: center;
  margin-bottom: 1rem;
`

const MirrorType = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  color: #d4af37;
  margin: 0;
  font-weight: 500;
`

const IntensityBadge = styled.div<{ level: 'low' | 'medium' | 'high' }>`
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.8rem;
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

const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
  margin: 0.5rem 0;
`

const ProgressFill = styled(motion.div)<{ intensity: number }>`
  height: 100%;
  background: linear-gradient(90deg, 
    ${props => props.intensity < 50 ? '#ef4444' : props.intensity < 75 ? '#f59e0b' : '#10b981'} 0%,
    ${props => props.intensity < 50 ? '#fca5a5' : props.intensity < 75 ? '#fbbf24' : '#6ee7b7'} 100%
  );
  border-radius: 3px;
`

const MetricRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'Noto Serif', serif;
  font-size: 0.9rem;
  color: #b8b8c4;
  margin: 0.5rem 0;
`

const MetricValue = styled.span`
  color: #d4af37;
  font-weight: 500;
`

interface MirrorPanelProps {
  harmonicProfile: HarmonicProfile
}

export default function MirrorPanel({ harmonicProfile }: MirrorPanelProps) {
  const getIntensityLevel = (intensity: number): 'low' | 'medium' | 'high' => {
    if (intensity >= 75) return 'high'
    if (intensity >= 50) return 'medium'
    return 'low'
  }

  const getIntensityLabel = (intensity: number): string => {
    if (intensity >= 85) return 'Luminous'
    if (intensity >= 70) return 'Clear'
    if (intensity >= 55) return 'Emerging'
    if (intensity >= 40) return 'Dim'
    return 'Shadowed'
  }

  return (
    <PanelContainer
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <Title>Mirror States</Title>
      
      <MirrorList>
        {harmonicProfile.mirrorStates.map((mirror, index) => {
          const level = getIntensityLevel(mirror.intensity)
          const label = getIntensityLabel(mirror.intensity)
          
          return (
            <MirrorItem
              key={mirror.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <MirrorHeader>
                <MirrorType>{mirror.type}</MirrorType>
                <IntensityBadge level={level}>
                  {label}
                </IntensityBadge>
              </MirrorHeader>
              
              <ProgressBar>
                <ProgressFill
                  intensity={mirror.intensity}
                  initial={{ width: 0 }}
                  animate={{ width: `${mirror.intensity}%` }}
                  transition={{ duration: 1.5, delay: 0.5 + index * 0.2 }}
                />
              </ProgressBar>
              
              <MetricRow>
                <span>Intensity</span>
                <MetricValue>{mirror.intensity.toFixed(1)}%</MetricValue>
              </MetricRow>
              
              <MetricRow>
                <span>Frequency</span>
                <MetricValue>{mirror.frequency.toFixed(2)} Hz</MetricValue>
              </MetricRow>
            </MirrorItem>
          )
        })}
      </MirrorList>
    </PanelContainer>
  )
}
