'use client'

import React, { useRef, useEffect, useState } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'

const VisualizationContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 400px;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(26, 26, 46, 0.9));
  border-radius: 16px;
  border: 2px solid #d4af37;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(20px);
`

const SacredCanvas = styled.canvas`
  width: 100%;
  height: 100%;
  border-radius: 14px;
`

const ControlPanel = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 10;
  max-width: 200px;
`

const SliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(212, 175, 55, 0.3);
  border-radius: 6px;
  padding: 0.5rem;
`

const SliderLabel = styled.label`
  color: #d4af37;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
`

const Slider = styled.input`
  appearance: none;
  width: 100%;
  height: 4px;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.2);
  outline: none;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: linear-gradient(135deg, #d4af37, #f4d03f);
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }

  &::-moz-range-thumb {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: linear-gradient(135deg, #d4af37, #f4d03f);
    cursor: pointer;
    border: none;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }
`

const Control = styled(motion.button)<{ $active?: boolean }>`
  background: ${(props: { $active?: boolean }) => props.$active 
    ? 'linear-gradient(135deg, #d4af37, #f4d03f)' 
    : 'rgba(0, 0, 0, 0.7)'
  };
  border: 1px solid ${(props: { $active?: boolean }) => props.$active ? '#d4af37' : 'rgba(255, 255, 255, 0.2)'};
  color: ${(props: { $active?: boolean }) => props.$active ? '#000' : '#d4af37'};
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.8rem;
  cursor: pointer;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    background: ${(props: { $active?: boolean }) => props.$active 
      ? 'linear-gradient(135deg, #f4d03f, #d4af37)' 
      : 'rgba(212, 175, 55, 0.2)'
    };
    transform: translateY(-2px);
  }
`

const InfoOverlay = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(212, 175, 55, 0.3);
  border-radius: 8px;
  padding: 1rem;
  font-family: 'Montserrat', sans-serif;
  color: #d4af37;
  max-width: 250px;
`

const InfoTitle = styled.h4`
  margin: 0 0 0.5rem 0;
  font-size: 0.9rem;
  font-weight: 600;
`

const InfoText = styled.p`
  margin: 0;
  font-size: 0.8rem;
  line-height: 1.4;
  opacity: 0.9;
`

interface SacredGeometryVisualizerProps {
  msi: number
  mirrorStates: any[]
  gearAlignments: any[]
  className?: string
}

type VisualizationMode = 'flower-of-life' | 'merkaba' | 'sri-yantra' | 'torus' | 'mandala'

const MODES: Record<VisualizationMode, {
  name: string
  description: string
  complexity: number
}> = {
  'flower-of-life': {
    name: 'Flower of Life',
    description: 'Sacred geometric pattern representing the fundamental forms of space and time.',
    complexity: 7
  },
  'merkaba': {
    name: 'Merkaba',
    description: 'Star tetrahedron representing the divine light vehicle of ascension.',
    complexity: 3
  },
  'sri-yantra': {
    name: 'Sri Yantra',
    description: 'Nine interlocking triangles creating the cosmic mandala of creation.',
    complexity: 9
  },
  'torus': {
    name: 'Torus Field',
    description: 'Donut-shaped energy field representing the flow of universal life force.',
    complexity: 5
  },
  'mandala': {
    name: 'Harmonic Mandala',
    description: 'Personalized sacred circle reflecting your unique vibrational signature.',
    complexity: 8
  }
}

export default function SacredGeometryVisualizer({
  msi,
  mirrorStates,
  gearAlignments,
  className
}: SacredGeometryVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const [mode, setMode] = useState<VisualizationMode>('flower-of-life')
  const [isPlaying, setIsPlaying] = useState(true)
  const [rotationSpeed, setRotationSpeed] = useState(1)
  const [complexity, setComplexity] = useState(0.5)
  const [intensity, setIntensity] = useState(0.7)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = canvas.offsetWidth * 2
    canvas.height = canvas.offsetHeight * 2
    ctx.scale(2, 2)

    let animationTime = 0

    const drawFlowerOfLife = (time: number) => {
      const centerX = canvas.width / 4
      const centerY = canvas.height / 4
      const radius = Math.min(centerX, centerY) * 0.6
      const circles = Math.floor(7 + complexity * 12) // 7-19 circles based on complexity
      
      ctx.clearRect(0, 0, canvas.width / 2, canvas.height / 2)
      
      // Background sacred geometry glow
      ctx.shadowColor = '#d4af37'
      ctx.shadowBlur = 20 * intensity
      
      for (let i = 0; i < circles; i++) {
        const angle = (i / circles) * Math.PI * 2
        const distance = i === 0 ? 0 : radius * 0.6 * (0.5 + complexity * 0.5)
        const x = centerX + Math.cos(angle + time * 0.001 * rotationSpeed) * distance
        const y = centerY + Math.sin(angle + time * 0.001 * rotationSpeed) * distance
        
        ctx.beginPath()
        ctx.arc(x, y, radius * 0.3, 0, Math.PI * 2)
        ctx.strokeStyle = `hsla(${45 + Math.sin(time * 0.002 + i) * 30}, 80%, 60%, ${(0.3 + Math.sin(time * 0.003 + i) * 0.2) * intensity})`
        ctx.lineWidth = 2
        ctx.stroke()
      }

      // MSI-responsive center glow
      const glowIntensity = (msi / 100) * intensity
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius * 0.2 * glowIntensity, 0, Math.PI * 2)
      ctx.fillStyle = `hsla(45, 100%, 70%, ${glowIntensity * 0.5})`
      ctx.fill()
    }

    const drawMerkaba = (time: number) => {
      const centerX = canvas.width / 4
      const centerY = canvas.height / 4
      const size = Math.min(centerX, centerY) * 0.5
      
      ctx.clearRect(0, 0, canvas.width / 2, canvas.height / 2)
      
      // Rotating star tetrahedrons
      const rotation1 = time * 0.002 * rotationSpeed
      const rotation2 = -time * 0.003 * rotationSpeed
      
      // First tetrahedron (upward)
      ctx.save()
      ctx.translate(centerX, centerY)
      ctx.rotate(rotation1)
      ctx.beginPath()
      ctx.moveTo(0, -size)
      ctx.lineTo(-size * 0.866, size * 0.5)
      ctx.lineTo(size * 0.866, size * 0.5)
      ctx.closePath()
      ctx.strokeStyle = `hsla(${280}, 80%, 70%, 0.8)`
      ctx.lineWidth = 3
      ctx.stroke()
      ctx.restore()
      
      // Second tetrahedron (downward)
      ctx.save()
      ctx.translate(centerX, centerY)
      ctx.rotate(rotation2)
      ctx.beginPath()
      ctx.moveTo(0, size)
      ctx.lineTo(-size * 0.866, -size * 0.5)
      ctx.lineTo(size * 0.866, -size * 0.5)
      ctx.closePath()
      ctx.strokeStyle = `hsla(${45}, 80%, 70%, 0.8)`
      ctx.lineWidth = 3
      ctx.stroke()
      ctx.restore()
    }

    const drawTorus = (time: number) => {
      const centerX = canvas.width / 4
      const centerY = canvas.height / 4
      const majorRadius = Math.min(centerX, centerY) * 0.4
      const minorRadius = majorRadius * 0.3
      
      ctx.clearRect(0, 0, canvas.width / 2, canvas.height / 2)
      
      // Draw torus field lines
      const numLines = 12
      for (let i = 0; i < numLines; i++) {
        const angle = (i / numLines) * Math.PI * 2
        const rotation = time * 0.001 * rotationSpeed + angle
        
        // Outer ring
        ctx.beginPath()
        for (let t = 0; t <= Math.PI * 2; t += 0.1) {
          const x = centerX + (majorRadius + minorRadius * Math.cos(t + rotation)) * Math.cos(angle)
          const y = centerY + (majorRadius + minorRadius * Math.cos(t + rotation)) * Math.sin(angle)
          
          if (t === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        
        const intensity = 0.3 + Math.sin(time * 0.002 + i) * 0.2
        ctx.strokeStyle = `hsla(${180 + i * 20}, 70%, 60%, ${intensity})`
        ctx.lineWidth = 2
        ctx.stroke()
      }
      
      // Central energy core
      const coreIntensity = (msi / 100) * 0.8
      ctx.beginPath()
      ctx.arc(centerX, centerY, majorRadius * 0.1 * coreIntensity, 0, Math.PI * 2)
      ctx.fillStyle = `hsla(200, 100%, 80%, ${coreIntensity})`
      ctx.fill()
    }

    const drawMandala = (time: number) => {
      const centerX = canvas.width / 4
      const centerY = canvas.height / 4
      const radius = Math.min(centerX, centerY) * 0.6
      
      ctx.clearRect(0, 0, canvas.width / 2, canvas.height / 2)
      
      // Personalized mandala based on MSI and gear alignments
      const layers = Math.floor(3 + (msi / 100) * 5) // 3-8 layers based on MSI
      
      for (let layer = 0; layer < layers; layer++) {
        const layerRadius = radius * (0.2 + (layer / layers) * 0.8)
        const petals = 6 + layer * 2 // Increasing petals per layer
        const rotation = time * 0.0005 * rotationSpeed * (layer % 2 === 0 ? 1 : -1)
        
        for (let petal = 0; petal < petals; petal++) {
          const angle = (petal / petals) * Math.PI * 2 + rotation
          const x = centerX + Math.cos(angle) * layerRadius
          const y = centerY + Math.sin(angle) * layerRadius
          
          // Draw petal shape
          ctx.save()
          ctx.translate(x, y)
          ctx.rotate(angle)
          
          ctx.beginPath()
          ctx.ellipse(0, 0, layerRadius * 0.15, layerRadius * 0.05, 0, 0, Math.PI * 2)
          
          const hue = (layer * 40 + petal * 15) % 360
          const saturation = 60 + (layer / layers) * 40
          const lightness = 50 + Math.sin(time * 0.003 + petal) * 20
          const alpha = 0.4 + Math.sin(time * 0.002 + layer) * 0.3
          
          ctx.fillStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`
          ctx.fill()
          ctx.strokeStyle = `hsla(${hue}, 80%, 70%, 0.8)`
          ctx.lineWidth = 1
          ctx.stroke()
          
          ctx.restore()
        }
      }
      
      // Central sacred symbol
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius * 0.1, 0, Math.PI * 2)
      ctx.fillStyle = `hsla(45, 100%, 80%, ${msi / 100})`
      ctx.fill()
    }

    const drawSriYantra = (time: number) => {
      const centerX = canvas.width / 4
      const centerY = canvas.height / 4
      const size = Math.min(centerX, centerY) * 0.6
      
      ctx.clearRect(0, 0, canvas.width / 2, canvas.height / 2)
      
      // Draw 9 interlocking triangles
      for (let i = 0; i < 9; i++) {
        const rotation = (time * 0.001 * rotationSpeed) + (i * Math.PI / 4.5)
        const triangleSize = size * (0.3 + (i % 3) * 0.2)
        const isUpward = i % 2 === 0
        
        ctx.save()
        ctx.translate(centerX, centerY)
        ctx.rotate(rotation)
        
        ctx.beginPath()
        if (isUpward) {
          ctx.moveTo(0, -triangleSize)
          ctx.lineTo(-triangleSize * 0.866, triangleSize * 0.5)
          ctx.lineTo(triangleSize * 0.866, triangleSize * 0.5)
        } else {
          ctx.moveTo(0, triangleSize)
          ctx.lineTo(-triangleSize * 0.866, -triangleSize * 0.5)
          ctx.lineTo(triangleSize * 0.866, -triangleSize * 0.5)
        }
        ctx.closePath()
        
        ctx.strokeStyle = `hsla(${330 + i * 30}, 70%, 60%, ${0.4 + Math.sin(time * 0.002 + i) * 0.2})`
        ctx.lineWidth = 2
        ctx.stroke()
        ctx.restore()
      }
    }

    const animate = (time: number) => {
      animationTime = time
      
      switch (mode) {
        case 'flower-of-life':
          drawFlowerOfLife(time)
          break
        case 'merkaba':
          drawMerkaba(time)
          break
        case 'sri-yantra':
          drawSriYantra(time)
          break
        case 'torus':
          drawTorus(time)
          break
        case 'mandala':
          drawMandala(time)
          break
      }
      
      if (isPlaying) {
        animationRef.current = requestAnimationFrame(animate)
      }
    }

    if (isPlaying) {
      animationRef.current = requestAnimationFrame(animate)
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [mode, isPlaying, rotationSpeed, complexity, intensity, msi])

  return (
    <VisualizationContainer
      className={className}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <SacredCanvas ref={canvasRef} />
      
      <ControlPanel>
        {Object.entries(MODES).map(([key, config]) => (
          <Control
            key={key}
            $active={mode === key}
            onClick={() => setMode(key as VisualizationMode)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {config.name}
          </Control>
        ))}
        
        <Control
          $active={isPlaying}
          onClick={() => setIsPlaying(!isPlaying)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isPlaying ? '⏸' : '▶'}
        </Control>

        <SliderContainer>
          <SliderLabel>Speed: {rotationSpeed.toFixed(1)}x</SliderLabel>
          <Slider
            type="range"
            min="0.1"
            max="3"
            step="0.1"
            value={rotationSpeed}
            onChange={(e) => setRotationSpeed(parseFloat(e.target.value))}
          />
        </SliderContainer>

        <SliderContainer>
          <SliderLabel>Complexity: {(complexity * 100).toFixed(0)}%</SliderLabel>
          <Slider
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={complexity}
            onChange={(e) => setComplexity(parseFloat(e.target.value))}
          />
        </SliderContainer>

        <SliderContainer>
          <SliderLabel>Intensity: {(intensity * 100).toFixed(0)}%</SliderLabel>
          <Slider
            type="range"
            min="0.1"
            max="1"
            step="0.05"
            value={intensity}
            onChange={(e) => setIntensity(parseFloat(e.target.value))}
          />
        </SliderContainer>
      </ControlPanel>

      <AnimatePresence>
        <InfoOverlay>
          <InfoTitle>{MODES[mode].name}</InfoTitle>
          <InfoText>{MODES[mode].description}</InfoText>
        </InfoOverlay>
      </AnimatePresence>
    </VisualizationContainer>
  )
}
