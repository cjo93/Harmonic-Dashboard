'use client'

import React, { useEffect, useRef, useMemo } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { HarmonicProfile } from '@/types'

const VisualizationContainer = styled(motion.div)`
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

const CanvasContainer = styled.div`
  width: 100%;
  height: 300px;
  border-radius: 12px;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.3);
  position: relative;
`

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
  display: block;
`

const LegendContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
`

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(212, 175, 55, 0.2);
`

const ColorDot = styled.div<{ color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.color};
  flex-shrink: 0;
`

const LegendText = styled.div`
  font-family: 'Noto Serif', serif;
  color: #b8b8c4;
  font-size: 0.9rem;
  flex: 1;
`

const ArchetypeName = styled.div`
  font-family: 'Montserrat', sans-serif;
  color: #d4af37;
  font-size: 0.85rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
`

const FrequencyText = styled.div`
  font-size: 0.8rem;
  opacity: 0.8;
`

interface BandVisualizationProps {
  harmonicProfile: HarmonicProfile
}

export default function BandVisualization({ harmonicProfile }: BandVisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)
  
  const colors = useMemo(() => [
    '#d4af37', // Gold
    '#9333ea', // Purple
    '#06b6d4', // Cyan
    '#10b981', // Green
  ], [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      const container = canvas.parentElement
      if (container) {
        canvas.width = container.clientWidth * 2 // 2x for retina
        canvas.height = container.clientHeight * 2
        canvas.style.width = container.clientWidth + 'px'
        canvas.style.height = container.clientHeight + 'px'
        ctx.scale(2, 2)
      }
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    let time = 0
    const animate = () => {
      if (!canvas || !ctx) return

      const width = canvas.width / 2
      const height = canvas.height / 2

      // Clear canvas
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
      ctx.fillRect(0, 0, width, height)

      // Draw symbolic bands
      harmonicProfile.symbolicBands.forEach((band, index) => {
        const color = colors[index % colors.length]
        ctx.strokeStyle = color
        ctx.lineWidth = 2
        ctx.globalAlpha = band.amplitude

        ctx.beginPath()
        
        for (let x = 0; x < width; x += 2) {
          const normalizedX = x / width
          const phaseOffset = (band.phase * Math.PI) / 180
          const y = (height / 2) + 
                   (Math.sin(normalizedX * band.frequency * Math.PI * 2 + time * 0.02 + phaseOffset) * 
                    band.amplitude * 50) +
                   (index - harmonicProfile.symbolicBands.length / 2) * 20

          if (x === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        
        ctx.stroke()
      })

      // Draw harmonic interference patterns
      ctx.globalAlpha = 0.3
      ctx.strokeStyle = '#ffffff'
      ctx.lineWidth = 1

      for (let x = 0; x < width; x += 3) {
        const normalizedX = x / width
        let combinedWave = 0

        harmonicProfile.symbolicBands.forEach((band) => {
          const phaseOffset = (band.phase * Math.PI) / 180
          combinedWave += Math.sin(normalizedX * band.frequency * Math.PI * 2 + time * 0.01 + phaseOffset) * band.amplitude
        })

        const y = (height / 2) + combinedWave * 30

        if (x === 0) {
          ctx.beginPath()
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      ctx.stroke()

      time += 1
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [harmonicProfile, colors])

  return (
    <VisualizationContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <Title>Symbolic Band Resonance</Title>
      
      <CanvasContainer>
        <Canvas ref={canvasRef} />
      </CanvasContainer>

      <LegendContainer>
        {harmonicProfile.symbolicBands.map((band, index) => (
          <LegendItem key={band.id}>
            <ColorDot color={colors[index % colors.length]} />
            <LegendText>
              <ArchetypeName>{band.archetype}</ArchetypeName>
              <FrequencyText>
                {band.frequency.toFixed(2)} Hz • {(band.amplitude * 100).toFixed(0)}% amplitude
              </FrequencyText>
            </LegendText>
          </LegendItem>
        ))}
      </LegendContainer>
    </VisualizationContainer>
  )
}
