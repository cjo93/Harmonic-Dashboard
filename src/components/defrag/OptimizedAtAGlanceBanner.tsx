'use client'

import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { HarmonicProfile } from '@/types'

const BannerContainer = styled(motion.div)`
  background: linear-gradient(135deg, 
    rgba(212, 175, 55, 0.1) 0%, 
    rgba(147, 51, 234, 0.1) 50%, 
    rgba(6, 182, 212, 0.1) 100%
  );
  border: 2px solid #d4af37;
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(20px);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
`

const FloatingElement = styled(motion.div)<{ delay: number }>`
  position: absolute;
  width: 4px;
  height: 4px;
  background: radial-gradient(circle, #d4af37, transparent);
  border-radius: 50%;
  opacity: 0.6;
`

const MainContent = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 2rem;
  align-items: center;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    text-align: center;
  }
`

const MSIDisplay = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`

const MSIRing = styled.svg`
  width: 120px;
  height: 120px;
  transform: rotate(-90deg);
`

const MSIBackground = styled.circle`
  fill: none;
  stroke: rgba(212, 175, 55, 0.2);
  stroke-width: 8;
`

const MSIProgress = styled(motion.circle)`
  fill: none;
  stroke: url(#msi-gradient);
  stroke-width: 8;
  stroke-linecap: round;
`

const MSIValue = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: 'Montserrat', sans-serif;
  font-size: 1.8rem;
  font-weight: 700;
  color: #d4af37;
  text-shadow: 0 0 10px rgba(212, 175, 55, 0.5);
`

const MSILabel = styled.div`
  font-family: 'Noto Serif', serif;
  color: #b8b8c4;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  text-align: center;
`

const StatusGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  flex: 1;
`

const StatusCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(212, 175, 55, 0.3);
  border-radius: 12px;
  padding: 1.5rem;
  backdrop-filter: blur(10px);
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

const StatusTitle = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  color: #d4af37;
  margin: 0 0 1rem 0;
  font-weight: 500;
`

const StatusMetric = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`

const MetricLabel = styled.span`
  font-family: 'Noto Serif', serif;
  color: #b8b8c4;
  font-size: 0.85rem;
`

const MetricValue = styled.span<{ level: 'low' | 'medium' | 'high' }>`
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 0.9rem;
  color: ${props => {
    switch (props.level) {
      case 'high': return '#10b981'
      case 'medium': return '#f59e0b'
      case 'low': return '#ef4444'
      default: return '#d4af37'
    }
  }};
`

const ActionPanel = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
`

const QuickAction = styled(motion.button)<{ variant: 'primary' | 'secondary' }>`
  background: ${props => props.variant === 'primary' 
    ? 'linear-gradient(135deg, #d4af37, #f4d03f)' 
    : 'rgba(212, 175, 55, 0.2)'
  };
  border: 1px solid #d4af37;
  color: ${props => props.variant === 'primary' ? '#000' : '#d4af37'};
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 120px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(212, 175, 55, 0.3);
  }
`

const InsightBadge = styled(motion.div)<{ type: 'positive' | 'neutral' | 'attention' }>`
  background: ${props => {
    switch (props.type) {
      case 'positive': return 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(5, 150, 105, 0.2))'
      case 'attention': return 'linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(217, 119, 6, 0.2))'
      default: return 'rgba(147, 51, 234, 0.2)'
    }
  }};
  border: 1px solid ${props => {
    switch (props.type) {
      case 'positive': return '#10b981'
      case 'attention': return '#f59e0b'
      default: return '#9333ea'
    }
  }};
  color: ${props => {
    switch (props.type) {
      case 'positive': return '#6ee7b7'
      case 'attention': return '#fbbf24'
      default: return '#c4b5fd'
    }
  }};
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.8rem;
  font-weight: 500;
  text-align: center;
`

interface OptimizedAtAGlanceBannerProps {
  harmonicProfile: HarmonicProfile
  onQuickAction?: (action: string) => void
  onResize?: () => void
  onDrag?: () => void
}

export default function OptimizedAtAGlanceBanner({
  harmonicProfile,
  onQuickAction,
  onResize,
  onDrag
}: OptimizedAtAGlanceBannerProps) {
  const [floatingElements, setFloatingElements] = useState<Array<{ id: number; x: number; y: number }>>([])
  
  useEffect(() => {
    // Generate floating elements based on MSI
    const count = Math.floor(harmonicProfile.msi / 10)
    const elements = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100
    }))
    setFloatingElements(elements)
  }, [harmonicProfile.msi])

  const getStatusLevel = (value: number): 'low' | 'medium' | 'high' => {
    if (value >= 80) return 'high'
    if (value >= 60) return 'medium'
    return 'low'
  }

  const getInsightBadge = () => {
    const msi = harmonicProfile.msi
    const coherence = harmonicProfile.mirrorStates.reduce((acc, m) => acc + m.intensity, 0) / harmonicProfile.mirrorStates.length
    const alignment = harmonicProfile.gearAlignments.reduce((acc, g) => acc + g.resonanceLevel, 0) / harmonicProfile.gearAlignments.length

    if (msi > 85 && coherence > 80) {
      return { type: 'positive' as const, text: 'Exceptional Harmony' }
    } else if (alignment < 60) {
      return { type: 'attention' as const, text: 'Cosmic Realignment Needed' }
    } else if (msi > 70) {
      return { type: 'positive' as const, text: 'Spiritual Flow Active' }
    } else {
      return { type: 'neutral' as const, text: 'Integration Phase' }
    }
  }

  const insight = getInsightBadge()
  const radius = 52
  const circumference = 2 * Math.PI * radius
  const msiProgress = (harmonicProfile.msi / 100) * circumference

  return (
    <BannerContainer
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Floating Elements */}
      {floatingElements.map((element) => (
        <FloatingElement
          key={element.id}
          delay={element.id * 0.2}
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 3 + element.id * 0.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      <MainContent>
        {/* MSI Display */}
        <MSIDisplay>
          <MSIRing>
            <defs>
              <linearGradient id="msi-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#d4af37" />
                <stop offset="50%" stopColor="#9333ea" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
            <MSIBackground cx="60" cy="60" r={radius} />
            <MSIProgress
              cx="60"
              cy="60"
              r={radius}
              strokeDasharray={circumference}
              strokeDashoffset={circumference - msiProgress}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: circumference - msiProgress }}
              transition={{ duration: 2, ease: "easeOut" }}
            />
          </MSIRing>
          <MSIValue
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, type: "spring", stiffness: 200 }}
          >
            {harmonicProfile.msi.toFixed(0)}
          </MSIValue>
          <MSILabel>Master Synthesis Index</MSILabel>
        </MSIDisplay>

        {/* Status Cards */}
        <StatusGrid>
          <StatusCard
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <StatusTitle>Mirror Coherence</StatusTitle>
            {harmonicProfile.mirrorStates.slice(0, 2).map((mirror, index) => (
              <StatusMetric key={mirror.id}>
                <MetricLabel>{mirror.type}</MetricLabel>
                <MetricValue level={getStatusLevel(mirror.intensity)}>
                  {mirror.intensity.toFixed(0)}%
                </MetricValue>
              </StatusMetric>
            ))}
          </StatusCard>

          <StatusCard
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <StatusTitle>Cosmic Alignment</StatusTitle>
            {harmonicProfile.gearAlignments.slice(0, 2).map((gear, index) => (
              <StatusMetric key={gear.id}>
                <MetricLabel>{gear.planetaryGear}</MetricLabel>
                <MetricValue level={getStatusLevel(gear.resonanceLevel)}>
                  {gear.resonanceLevel.toFixed(0)}%
                </MetricValue>
              </StatusMetric>
            ))}
          </StatusCard>
        </StatusGrid>

        {/* Quick Actions */}
        <ActionPanel
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          <InsightBadge
            type={insight.type}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            {insight.text}
          </InsightBadge>

          <QuickAction
            variant="primary"
            onClick={() => onQuickAction?.('meditate')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🧘 Meditate
          </QuickAction>

          <QuickAction
            variant="secondary"
            onClick={() => onQuickAction?.('analyze')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            📊 Analyze
          </QuickAction>
        </ActionPanel>
      </MainContent>
    </BannerContainer>
  )
}
