'use client'

import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '@/stores/useStore'
import { useNotificationStore } from '@/stores/useNotifications'
import { HarmonicProfile } from '@/types'
import OptimizedAtAGlanceBanner from './OptimizedAtAGlanceBanner'
import ConsentModal from './ConsentModal'
import MSIGauge from './MSIGauge'
import MirrorPanel from './MirrorPanel'
import GearPanel from './GearPanel'
import BandVisualization from './BandVisualization'
import InteractiveTiles from './InteractiveTiles'
import NotificationManager from './NotificationManager'
import DashboardControls from './DashboardControls'
import DashboardSettings from './DashboardSettings'
import KeyboardShortcuts from './KeyboardShortcuts'
import HelpButton from './HelpButton'
import SacredGeometryVisualizer from './SacredGeometryVisualizer'
import HarmonicAnalytics from './HarmonicAnalytics'
import MeditationGuidance from './MeditationGuidance'

const DashboardRoot = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, 
    #0f0f23 0%, 
    #1a1a2e 25%, 
    #16213e 50%, 
    #0f3460 75%, 
    #533483 100%
  );
  color: #e5e7eb;
  font-family: 'Noto Serif', serif;
  position: relative;
  overflow-x: hidden;
`

const StarField = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      radial-gradient(2px 2px at 20px 30px, #ffffff, transparent),
      radial-gradient(2px 2px at 40px 70px, rgba(255, 255, 255, 0.8), transparent),
      radial-gradient(1px 1px at 90px 40px, #ffffff, transparent),
      radial-gradient(1px 1px at 130px 80px, rgba(255, 255, 255, 0.6), transparent),
      radial-gradient(2px 2px at 160px 30px, #ffffff, transparent);
    background-repeat: repeat;
    background-size: 200px 100px;
    animation: float 20s infinite linear;
  }

  @keyframes float {
    0% { transform: translate(0, 0); }
    100% { transform: translate(-200px, -100px); }
  }
`

const DashboardContent = styled.div`
  position: relative;
  z-index: 1;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`

const DashboardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`

const DashboardTitle = styled(motion.h1)`
  font-family: 'Montserrat', sans-serif;
  font-size: 2.5rem;
  font-weight: 300;
  color: #d4af37;
  text-shadow: 0 0 20px rgba(212, 175, 55, 0.5);
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 2rem;
    text-align: center;
  }
`

const DashboardSubtitle = styled.p`
  font-family: 'Noto Serif', serif;
  color: #b8b8c4;
  font-size: 1.1rem;
  margin: 0.5rem 0 0 0;
  opacity: 0.8;

  @media (max-width: 768px) {
    text-align: center;
  }
`

const ControlsContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
  }
`

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`

const PrimaryColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

const SecondaryColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

const AnalyticsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`

const VisualizationPanel = styled(motion.div)`
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

const PanelTitle = styled.h2`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.3rem;
  color: #d4af37;
  margin: 0 0 1.5rem 0;
  font-weight: 500;
`

const AdvancedFeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`

const LoadingOverlay = styled(motion.div)`
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

const LoadingSpinner = styled(motion.div)`
  width: 60px;
  height: 60px;
  border: 3px solid rgba(212, 175, 55, 0.3);
  border-top: 3px solid #d4af37;
  border-radius: 50%;
`

export default function DefragDashboard() {
  const [showConsent, setShowConsent] = useState(true)
  const [showSettings, setShowSettings] = useState(false)
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false)
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [refreshInterval, setRefreshInterval] = useState(30000)
  const [harmonicProfile, setHarmonicProfile] = useState<HarmonicProfile | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedVisualization, setSelectedVisualization] = useState<'geometry' | 'analytics' | 'meditation'>('geometry')

  const { addNotification } = useNotificationStore()

  // Mock harmonic profile data
  useEffect(() => {
    const generateMockProfile = (): HarmonicProfile => ({
      msi: Math.random() * 40 + 60, // 60-100 range
      mirrorStates: [
        { id: '1', type: 'Reflection', intensity: Math.random() * 30 + 70, frequency: Math.random() * 2 + 8 },
        { id: '2', type: 'Shadow', intensity: Math.random() * 40 + 40, frequency: Math.random() * 3 + 6 },
        { id: '3', type: 'Projection', intensity: Math.random() * 50 + 30, frequency: Math.random() * 4 + 4 },
        { id: '4', type: 'Integration', intensity: Math.random() * 20 + 80, frequency: Math.random() * 1 + 9 }
      ],
      gearAlignments: [
        { id: '1', planetaryGear: 'Mercury', resonanceLevel: Math.random() * 30 + 65, phase: Math.random() * 360 },
        { id: '2', planetaryGear: 'Venus', resonanceLevel: Math.random() * 40 + 50, phase: Math.random() * 360 },
        { id: '3', planetaryGear: 'Mars', resonanceLevel: Math.random() * 35 + 55, phase: Math.random() * 360 },
        { id: '4', planetaryGear: 'Jupiter', resonanceLevel: Math.random() * 25 + 70, phase: Math.random() * 360 }
      ],
      symbolicBands: [
        { id: '1', archetype: 'The Magician', frequency: Math.random() * 2 + 8, amplitude: Math.random() * 0.5 + 0.5, phase: Math.random() * 360 },
        { id: '2', archetype: 'The High Priestess', frequency: Math.random() * 3 + 6, amplitude: Math.random() * 0.6 + 0.4, phase: Math.random() * 360 },
        { id: '3', archetype: 'The Hermit', frequency: Math.random() * 1.5 + 9, amplitude: Math.random() * 0.4 + 0.6, phase: Math.random() * 360 },
        { id: '4', archetype: 'The World', frequency: Math.random() * 2.5 + 7, amplitude: Math.random() * 0.3 + 0.7, phase: Math.random() * 360 }
      ],
      archetypes: ['The Magician', 'The High Priestess', 'The Hermit', 'The World'],
      prompts: [
        'Focus on the breath as the bridge between conscious and unconscious',
        'Observe the patterns that emerge in stillness',
        'Allow integration to happen naturally without forcing',
        'Trust the wisdom of your inner guidance system'
      ]
    })

    setHarmonicProfile(generateMockProfile())
  }, [])

  // Auto-refresh functionality
  useEffect(() => {
    if (!autoRefresh || !harmonicProfile) return

    const interval = setInterval(() => {
      setIsLoading(true)
      setTimeout(() => {
        const generateMockProfile = (): HarmonicProfile => ({
          msi: Math.random() * 40 + 60,
          mirrorStates: [
            { id: '1', type: 'Reflection', intensity: Math.random() * 30 + 70, frequency: Math.random() * 2 + 8 },
            { id: '2', type: 'Shadow', intensity: Math.random() * 40 + 40, frequency: Math.random() * 3 + 6 },
            { id: '3', type: 'Projection', intensity: Math.random() * 50 + 30, frequency: Math.random() * 4 + 4 },
            { id: '4', type: 'Integration', intensity: Math.random() * 20 + 80, frequency: Math.random() * 1 + 9 }
          ],
          gearAlignments: [
            { id: '1', planetaryGear: 'Mercury', resonanceLevel: Math.random() * 30 + 65, phase: Math.random() * 360 },
            { id: '2', planetaryGear: 'Venus', resonanceLevel: Math.random() * 40 + 50, phase: Math.random() * 360 },
            { id: '3', planetaryGear: 'Mars', resonanceLevel: Math.random() * 35 + 55, phase: Math.random() * 360 },
            { id: '4', planetaryGear: 'Jupiter', resonanceLevel: Math.random() * 25 + 70, phase: Math.random() * 360 }
          ],
          symbolicBands: harmonicProfile.symbolicBands.map(band => ({
            ...band,
            amplitude: Math.random() * 0.5 + 0.5,
            phase: (band.phase + Math.random() * 10 - 5) % 360
          })),
          archetypes: harmonicProfile.archetypes,
          prompts: harmonicProfile.prompts
        })

        setHarmonicProfile(generateMockProfile())
        setIsLoading(false)
        addNotification({
          type: 'info',
          title: 'Data Updated',
          message: 'Harmonic profile updated'
        })
      }, 1000)
    }, refreshInterval)

    return () => clearInterval(interval)
  }, [autoRefresh, refreshInterval, harmonicProfile, addNotification])

  const handleConsentAccept = useCallback(() => {
    setShowConsent(false)
    addNotification({
      type: 'success',
      title: 'Welcome',
      message: 'Welcome to the Harmonic Intelligence Dashboard'
    })
  }, [addNotification])

  const handleQuickAction = useCallback((action: string) => {
    switch (action) {
      case 'meditate':
        setSelectedVisualization('meditation')
        addNotification({
          type: 'info',
          title: 'Mode Changed',
          message: 'Meditation mode activated'
        })
        break
      case 'analyze':
        setSelectedVisualization('analytics')
        addNotification({
          type: 'info',
          title: 'Mode Changed',
          message: 'Analytics mode activated'
        })
        break
      case 'geometry':
        setSelectedVisualization('geometry')
        addNotification({
          type: 'info',
          title: 'Mode Changed',
          message: 'Sacred geometry mode activated'
        })
        break
      default:
        addNotification({
          type: 'info',
          title: 'Quick Action',
          message: `Quick action: ${action}`
        })
    }
  }, [addNotification])

  const handleRefresh = useCallback(() => {
    setIsLoading(true)
    setTimeout(() => {
      if (harmonicProfile) {
        const updatedProfile = {
          ...harmonicProfile,
          msi: Math.random() * 40 + 60,
          mirrorStates: harmonicProfile.mirrorStates.map(mirror => ({
            ...mirror,
            intensity: Math.random() * 30 + 70
          }))
        }
        setHarmonicProfile(updatedProfile)
      }
      setIsLoading(false)
      addNotification({
        type: 'success',
        title: 'Data Refreshed',
        message: 'Data refreshed successfully'
      })
    }, 1500)
  }, [harmonicProfile, addNotification])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'r':
            e.preventDefault()
            handleRefresh()
            break
          case ',':
            e.preventDefault()
            setShowSettings(true)
            break
          case '/':
            e.preventDefault()
            setShowKeyboardShortcuts(true)
            break
          case '1':
            e.preventDefault()
            setSelectedVisualization('geometry')
            break
          case '2':
            e.preventDefault()
            setSelectedVisualization('analytics')
            break
          case '3':
            e.preventDefault()
            setSelectedVisualization('meditation')
            break
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleRefresh])

  if (!harmonicProfile) {
    return (
      <DashboardRoot>
        <LoadingOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <LoadingSpinner
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </LoadingOverlay>
      </DashboardRoot>
    )
  }

  return (
    <DashboardRoot>
      <StarField />
      
      <DashboardContent>
        <DashboardHeader>
          <div>
            <DashboardTitle
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              Defrag • HiGPT
            </DashboardTitle>
            <DashboardSubtitle>
              Harmonic Intelligence Dashboard
            </DashboardSubtitle>
          </div>
          
          <ControlsContainer>
            <DashboardControls
              onRefresh={handleRefresh}
              onToggleAutoRefresh={() => setAutoRefresh(!autoRefresh)}
              autoRefresh={autoRefresh}
              isLoading={isLoading}
            />
            
            <HelpButton onClick={() => setShowKeyboardShortcuts(true)} />
          </ControlsContainer>
        </DashboardHeader>

        <OptimizedAtAGlanceBanner
          harmonicProfile={harmonicProfile}
          onQuickAction={handleQuickAction}
        />

        <MainGrid>
          <PrimaryColumn>
            <VisualizationPanel
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <PanelTitle>
                {selectedVisualization === 'geometry' && 'Sacred Geometry Visualization'}
                {selectedVisualization === 'analytics' && 'Harmonic Analytics'}
                {selectedVisualization === 'meditation' && 'Meditation Guidance'}
              </PanelTitle>
              
              <AnimatePresence mode="wait">
                {selectedVisualization === 'geometry' && (
                  <motion.div
                    key="geometry"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <SacredGeometryVisualizer 
                      msi={harmonicProfile.msi}
                      mirrorStates={harmonicProfile.mirrorStates}
                      gearAlignments={harmonicProfile.gearAlignments}
                    />
                  </motion.div>
                )}
                
                {selectedVisualization === 'analytics' && (
                  <motion.div
                    key="analytics"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <HarmonicAnalytics harmonicProfile={harmonicProfile} />
                  </motion.div>
                )}
                
                {selectedVisualization === 'meditation' && (
                  <motion.div
                    key="meditation"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <MeditationGuidance harmonicProfile={harmonicProfile} />
                  </motion.div>
                )}
              </AnimatePresence>
            </VisualizationPanel>

            <BandVisualization harmonicProfile={harmonicProfile} />
          </PrimaryColumn>

          <SecondaryColumn>
            <MSIGauge harmonicProfile={harmonicProfile} />
            <MirrorPanel harmonicProfile={harmonicProfile} />
            <GearPanel 
              gearAlignment={harmonicProfile.gearAlignments[0] || {
                id: 'primary',
                planetaryGear: 'cosmic-alignment',
                resonanceLevel: 75,
                phase: 120
              }} 
            />
          </SecondaryColumn>
        </MainGrid>

        <InteractiveTiles harmonicProfile={harmonicProfile} />
      </DashboardContent>

      <NotificationManager />

      <AnimatePresence>
        {showConsent && (
          <ConsentModal onAccept={handleConsentAccept} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSettings && (
          <DashboardSettings
            onClose={() => setShowSettings(false)}
            autoRefresh={autoRefresh}
            onToggleAutoRefresh={setAutoRefresh}
            refreshInterval={refreshInterval}
            onRefreshIntervalChange={setRefreshInterval}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showKeyboardShortcuts && (
          <KeyboardShortcuts onClose={() => setShowKeyboardShortcuts(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isLoading && (
          <LoadingOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <LoadingSpinner
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </LoadingOverlay>
        )}
      </AnimatePresence>
    </DashboardRoot>
  )
}
