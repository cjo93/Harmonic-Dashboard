'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { HarmonicProfile } from '@/types'

const MeditationContainer = styled(motion.div)`
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(59, 130, 246, 0.1));
  border: 2px solid #10b981;
  border-radius: 16px;
  padding: 2rem;
  margin: 1rem 0;
  backdrop-filter: blur(20px);
  position: relative;
  overflow: hidden;
`

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`

const Title = styled.h2`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.5rem;
  font-weight: 300;
  color: #10b981;
  margin: 0 0 0.5rem 0;
`

const Subtitle = styled.p`
  font-family: 'Noto Serif', serif;
  color: #6ee7b7;
  margin: 0;
  font-size: 0.9rem;
`

const SessionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`

const BreathingCircle = styled(motion.div)<{ isActive: boolean }>`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(16, 185, 129, 0.3), rgba(16, 185, 129, 0.1));
  border: 3px solid #10b981;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow: 0 0 50px rgba(16, 185, 129, 0.3);
`

const InnerCircle = styled(motion.div)`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: rgba(16, 185, 129, 0.6);
  box-shadow: inset 0 0 20px rgba(16, 185, 129, 0.8);
`

const BreathingText = styled(motion.div)`
  position: absolute;
  font-family: 'Montserrat', sans-serif;
  font-size: 1.2rem;
  color: #10b981;
  font-weight: 500;
`

const ControlsContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`

const ControlButton = styled(motion.button)<{ $variant?: 'primary' | 'secondary' }>`
  background: ${props => props.$variant === 'primary' 
    ? 'linear-gradient(135deg, #10b981, #059669)' 
    : 'rgba(16, 185, 129, 0.2)'
  };
  border: 1px solid #10b981;
  color: ${props => props.$variant === 'primary' ? '#fff' : '#10b981'};
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(16, 185, 129, 0.3);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`

const TimerDisplay = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.5rem;
  color: #10b981;
  font-weight: 600;
  text-align: center;
  margin: 1rem 0;
`

const ProgressRing = styled.svg`
  position: absolute;
  top: -10px;
  left: -10px;
  transform: rotate(-90deg);
`

const ProgressCircle = styled(motion.circle)`
  fill: none;
  stroke: #10b981;
  stroke-width: 3;
  stroke-linecap: round;
`

const GuidanceText = styled(motion.div)`
  text-align: center;
  font-family: 'Noto Serif', serif;
  color: #6ee7b7;
  font-size: 1rem;
  line-height: 1.6;
  max-width: 500px;
  margin: 1rem auto;
`

const MeditationTypeSelector = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  justify-content: center;
  flex-wrap: wrap;
`

const TypeButton = styled(motion.button)<{ active: boolean }>`
  background: ${props => props.active 
    ? 'linear-gradient(135deg, #10b981, #059669)' 
    : 'rgba(16, 185, 129, 0.1)'
  };
  border: 1px solid ${props => props.active ? '#10b981' : 'rgba(16, 185, 129, 0.3)'};
  color: ${props => props.active ? '#fff' : '#10b981'};
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.active 
      ? 'linear-gradient(135deg, #059669, #047857)' 
      : 'rgba(16, 185, 129, 0.2)'
    };
  }
`

interface MeditationGuidanceProps {
  harmonicProfile: HarmonicProfile
  onComplete?: (sessionData: any) => void
}

type MeditationType = 'breathing' | 'chakra' | 'loving-kindness' | 'insight' | 'cosmic'
type BreathPhase = 'inhale' | 'hold' | 'exhale' | 'pause'

const MEDITATION_TYPES = {
  breathing: {
    name: 'Breath Awareness',
    description: 'Simple breath-focused meditation for centering and clarity',
    inhale: 4,
    hold: 4,
    exhale: 6,
    pause: 2
  },
  chakra: {
    name: 'Chakra Harmonization',
    description: 'Align your energy centers with harmonic breathing',
    inhale: 6,
    hold: 2,
    exhale: 6,
    pause: 2
  },
  'loving-kindness': {
    name: 'Heart Coherence',
    description: 'Cultivate compassion and emotional harmony',
    inhale: 5,
    hold: 5,
    exhale: 5,
    pause: 1
  },
  insight: {
    name: 'Insight Meditation',
    description: 'Develop deeper awareness and understanding',
    inhale: 4,
    hold: 7,
    exhale: 8,
    pause: 1
  },
  cosmic: {
    name: 'Cosmic Connection',
    description: 'Align with universal energies and higher consciousness',
    inhale: 8,
    hold: 4,
    exhale: 8,
    pause: 4
  }
}

export default function MeditationGuidance({ 
  harmonicProfile, 
  onComplete 
}: MeditationGuidanceProps) {
  const [selectedType, setSelectedType] = useState<MeditationType>('breathing')
  const [isActive, setIsActive] = useState(false)
  const [currentPhase, setCurrentPhase] = useState<BreathPhase>('inhale')
  const [sessionTime, setSessionTime] = useState(0)
  const [totalDuration, setTotalDuration] = useState(300) // 5 minutes default
  const [phaseProgress, setPhaseProgress] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const phaseIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const meditationConfig = MEDITATION_TYPES[selectedType]
  const currentPhaseDuration = meditationConfig[currentPhase] * 1000

  const handleStop = useCallback(() => {
    setIsActive(false)
    setCurrentPhase('inhale')
    setPhaseProgress(0)
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (phaseIntervalRef.current) clearInterval(phaseIntervalRef.current)
    
    if (onComplete && sessionTime > 30) {
      onComplete({
        type: selectedType,
        duration: sessionTime,
        completedAt: new Date(),
        harmonicProfile: harmonicProfile.msi
      })
    }
  }, [onComplete, sessionTime, selectedType, harmonicProfile])

  const nextPhase = useCallback(() => {
    const phases: BreathPhase[] = ['inhale', 'hold', 'exhale', 'pause']
    const currentIndex = phases.indexOf(currentPhase)
    const nextIndex = (currentIndex + 1) % phases.length
    setCurrentPhase(phases[nextIndex])
    setPhaseProgress(0)
  }, [currentPhase])

  const startPhaseTimer = useCallback(() => {
    setPhaseProgress(0)
    const progressInterval = 50
    const progressStep = 100 / (currentPhaseDuration / progressInterval)

    phaseIntervalRef.current = setInterval(() => {
      setPhaseProgress(prev => {
        if (prev >= 100) {
          nextPhase()
          return 0
        }
        return prev + progressStep
      })
    }, progressInterval)
  }, [currentPhaseDuration, nextPhase])

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setSessionTime(prev => {
          if (prev >= totalDuration) {
            handleStop()
            return prev
          }
          return prev + 1
        })
      }, 1000)

      startPhaseTimer()
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (phaseIntervalRef.current) clearInterval(phaseIntervalRef.current)
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (phaseIntervalRef.current) clearInterval(phaseIntervalRef.current)
    }
  }, [isActive, currentPhase, totalDuration, handleStop, startPhaseTimer])

  const handleStart = () => {
    setIsActive(true)
    setSessionTime(0)
  }

  const handleReset = () => {
    setIsActive(false)
    setSessionTime(0)
    setCurrentPhase('inhale')
    setPhaseProgress(0)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getGuidanceText = () => {
    const msiLevel = harmonicProfile.msi
    const coherence = harmonicProfile.mirrorStates.reduce((acc, m) => acc + m.intensity, 0) / harmonicProfile.mirrorStates.length

    if (msiLevel > 80) {
      return "You're in a highly coherent state. Allow your consciousness to expand into cosmic awareness."
    } else if (msiLevel > 60) {
      return "Your energy is well-aligned. Focus on deepening your connection to the present moment."
    } else if (coherence > 70) {
      return "Your mirrors are harmonious. Use this session to integrate and stabilize your insights."
    } else {
      return "Begin by simply following your breath. Let each inhale bring calm, each exhale release tension."
    }
  }

  const circleRadius = 98
  const circumference = 2 * Math.PI * circleRadius

  return (
    <MeditationContainer
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header>
        <Title>Guided Meditation</Title>
        <Subtitle>Harmonize your consciousness with cosmic rhythms</Subtitle>
      </Header>

      <MeditationTypeSelector>
        {Object.entries(MEDITATION_TYPES).map(([key, config]) => (
          <TypeButton
            key={key}
            active={selectedType === key}
            onClick={() => setSelectedType(key as MeditationType)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {config.name}
          </TypeButton>
        ))}
      </MeditationTypeSelector>

      <SessionContainer>
        <BreathingCircle isActive={isActive}>
          <ProgressRing width="220" height="220">
            <ProgressCircle
              cx="110"
              cy="110"
              r={circleRadius}
              strokeDasharray={circumference}
              strokeDashoffset={circumference - (phaseProgress / 100) * circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: circumference - (phaseProgress / 100) * circumference }}
              transition={{ duration: 0.1 }}
            />
          </ProgressRing>
          
          <InnerCircle
            animate={{
              scale: currentPhase === 'inhale' ? 1.2 : currentPhase === 'exhale' ? 0.8 : 1,
            }}
            transition={{ duration: currentPhaseDuration / 1000, ease: "easeInOut" }}
          />
          
          <BreathingText
            key={currentPhase}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {currentPhase.charAt(0).toUpperCase() + currentPhase.slice(1)}
          </BreathingText>
        </BreathingCircle>

        <TimerDisplay>
          {formatTime(sessionTime)} / {formatTime(totalDuration)}
        </TimerDisplay>

        <ControlsContainer>
          <ControlButton
            $variant="primary"
            onClick={isActive ? handleStop : handleStart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isActive ? 'Stop' : 'Start'}
          </ControlButton>
          
          <ControlButton
            onClick={handleReset}
            disabled={isActive}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Reset
          </ControlButton>
        </ControlsContainer>

        <AnimatePresence>
          <GuidanceText
            key={selectedType}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {getGuidanceText()}
          </GuidanceText>
        </AnimatePresence>
      </SessionContainer>
    </MeditationContainer>
  )
}
