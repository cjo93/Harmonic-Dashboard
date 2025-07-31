'use client'

import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { HarmonicProfile } from '@/types'

const TilesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`

const Tile = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(212, 175, 55, 0.3);
  border-radius: 15px;
  padding: 1.5rem;
  backdrop-filter: blur(20px);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
    border-color: #d4af37;
  }

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

const TileIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 1rem;
`

const TileTitle = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.1rem;
  color: #d4af37;
  margin: 0 0 0.5rem 0;
  font-weight: 500;
`

const TileDescription = styled.p`
  font-family: 'Noto Serif', serif;
  color: #b8b8c4;
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0 0 1rem 0;
  opacity: 0.9;
`

const TileValue = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: #d4af37;
  text-shadow: 0 0 10px rgba(212, 175, 55, 0.3);
`

interface InteractiveTilesProps {
  harmonicProfile: HarmonicProfile
}

export default function InteractiveTiles({ harmonicProfile }: InteractiveTilesProps) {
  const avgMirrorIntensity = harmonicProfile.mirrorStates.reduce((acc, m) => acc + m.intensity, 0) / harmonicProfile.mirrorStates.length
  const avgGearAlignment = harmonicProfile.gearAlignments.reduce((acc, g) => acc + g.resonanceLevel, 0) / harmonicProfile.gearAlignments.length
  const avgFrequency = harmonicProfile.symbolicBands.reduce((acc, b) => acc + b.frequency, 0) / harmonicProfile.symbolicBands.length
  const dominantArchetype = harmonicProfile.archetypes[0]

  const tiles = [
    {
      id: 'consciousness',
      icon: '🧠',
      title: 'Consciousness Level',
      description: 'Current state of awareness and mental clarity',
      value: `${avgMirrorIntensity.toFixed(1)}%`
    },
    {
      id: 'cosmic-alignment',
      icon: '🌌',
      title: 'Cosmic Alignment',
      description: 'Synchronization with celestial energies',
      value: `${avgGearAlignment.toFixed(1)}%`
    },
    {
      id: 'vibrational-frequency',
      icon: '🎵',
      title: 'Vibrational Frequency',
      description: 'Average harmonic resonance across all bands',
      value: `${avgFrequency.toFixed(2)} Hz`
    },
    {
      id: 'dominant-archetype',
      icon: '🔮',
      title: 'Dominant Archetype',
      description: 'Currently active archetypal influence',
      value: dominantArchetype
    },
    {
      id: 'integration-phase',
      icon: '⚡',
      title: 'Integration Phase',
      description: 'Progress in synthesizing all harmonic elements',
      value: `${harmonicProfile.msi.toFixed(0)}%`
    },
    {
      id: 'spiritual-momentum',
      icon: '🌊',
      title: 'Spiritual Momentum',
      description: 'Rate of consciousness evolution',
      value: harmonicProfile.msi > 80 ? 'Accelerating' : harmonicProfile.msi > 60 ? 'Building' : 'Emerging'
    }
  ]

  return (
    <TilesContainer>
      {tiles.map((tile, index) => (
        <Tile
          key={tile.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <TileIcon>{tile.icon}</TileIcon>
          <TileTitle>{tile.title}</TileTitle>
          <TileDescription>{tile.description}</TileDescription>
          <TileValue>{tile.value}</TileValue>
        </Tile>
      ))}
    </TilesContainer>
  )
}
