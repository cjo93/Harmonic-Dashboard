'use client'

import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import Draggable from 'react-draggable'
import { Resizable } from 'react-resizable'
import { Settings, Zap, Globe, User } from 'lucide-react'
import { GearAlignment } from '@/types'

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

const pulseGear = keyframes`
  0%, 100% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.1); opacity: 1; }
`

const Panel = styled.div<{ $alignment: number }>`
  padding: 1.5rem;
  border: 2px solid #d4af37;
  border-radius: 16px;
  background: radial-gradient(circle, #0f0e20, #1a1a2e);
  font-family: 'Noto Serif', serif;
  color: #d4af37;
  min-width: 320px;
  min-height: 280px;
  position: relative;
  cursor: move;
  overflow: hidden;

  &:hover {
    box-shadow: ${props => props.$alignment > 0.8 ? '0 0 30px rgba(212, 175, 55, 0.6)' : '0 0 15px rgba(212, 175, 55, 0.3)'};
  }

  .react-resizable-handle {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 20px;
    height: 20px;
    background: linear-gradient(-45deg, transparent 0%, transparent 40%, #d4af37 50%, #d4af37 100%);
    cursor: se-resize;
  }
`

const GearContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 120px;
  margin: 1rem 0;
  position: relative;
`

const Gear = styled.div<{ $speed: number; $size: number; $active: boolean }>`
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  border: 2px solid #d4af37;
  border-radius: 50%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle, rgba(212, 175, 55, 0.1), transparent);
  animation: ${props => props.$active ? rotate : 'none'} ${props => 20 / props.$speed}s linear infinite;
  
  &::before {
    content: '';
    position: absolute;
    width: 80%;
    height: 80%;
    border: 1px solid rgba(212, 175, 55, 0.5);
    border-radius: 50%;
  }
  
  ${props => props.$active && `
    animation: ${rotate} ${20 / props.$speed}s linear infinite, ${pulseGear} 3s ease-in-out infinite;
  `}
`

const GearCenter = styled.div`
  width: 20px;
  height: 20px;
  background: #d4af37;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  color: #1a1a2e;
  font-weight: bold;
`

const AlignmentBar = styled.div<{ $level: number; $label: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.75rem 0;
  font-size: 0.8rem;
`

const ProgressBar = styled.div<{ $value: number }>`
  flex: 1;
  height: 6px;
  background: rgba(212, 175, 55, 0.2);
  border-radius: 3px;
  margin: 0 0.75rem;
  overflow: hidden;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: ${props => props.$value * 100}%;
    background: linear-gradient(90deg, #d4af37, #f1c40f);
    transition: width 1.5s ease-in-out;
    border-radius: 3px;
  }
`

const SyncIndicator = styled.div<{ $synced: boolean }>`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.$synced ? '#2ecc71' : '#e74c3c'};
  animation: ${props => props.$synced ? pulseGear : 'none'} 2s infinite;
  box-shadow: 0 0 10px ${props => props.$synced ? '#2ecc71' : '#e74c3c'};
`

interface GearPanelProps {
  gearAlignment: GearAlignment;
  onResize?: () => void;
  onDrag?: () => void;
}

export default function GearPanel({ gearAlignment, onResize, onDrag }: GearPanelProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [lastSync, setLastSync] = useState<Date>(new Date());

  const totalAlignment = gearAlignment.resonanceLevel / 100;
  const isSynced = totalAlignment > 0.75;

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isSynced) {
      setLastSync(new Date());
    }
  }, [isSynced]);

  const getGearIcon = (type: 'internal' | 'external' | 'cosmic') => {
    switch (type) {
      case 'internal': return <User className="w-3 h-3" />;
      case 'external': return <Globe className="w-3 h-3" />;
      case 'cosmic': return <Zap className="w-3 h-3" />;
      default: return <Settings className="w-3 h-3" />;
    }
  };

  return (
    <Draggable onDrag={onDrag} handle=".drag-handle">
      <div>
        <Resizable
          width={320}
          height={280}
          onResize={onResize}
          minConstraints={[280, 240]}
          maxConstraints={[450, 350]}
        >
          <Panel $alignment={totalAlignment} className="drag-handle">
            <SyncIndicator $synced={isSynced} />
            
            <h3 style={{ 
              fontFamily: 'Montserrat', 
              textTransform: 'uppercase',
              letterSpacing: '2px',
              marginBottom: '1rem',
              textAlign: 'center'
            }}>
              ⚙ Gear Alignment Matrix
            </h3>

            <GearContainer>
              {/* Internal Gear */}
              <Gear 
                $speed={gearAlignment.resonanceLevel / 100 || 0.5} 
                $size={60} 
                $active={isAnimating}
                style={{ left: '20px' }}
              >
                <GearCenter>
                  {getGearIcon('internal')}
                </GearCenter>
              </Gear>

              {/* External Gear */}
              <Gear 
                $speed={gearAlignment.phase / 360 || 0.7} 
                $size={80} 
                $active={isAnimating}
                style={{ right: '20px' }}
              >
                <GearCenter>
                  {getGearIcon('external')}
                </GearCenter>
              </Gear>

              {/* Cosmic Gear */}
              <Gear 
                $speed={totalAlignment || 0.3} 
                $size={100} 
                $active={isAnimating}
                style={{ top: '10px' }}
              >
                <GearCenter>
                  {getGearIcon('cosmic')}
                </GearCenter>
              </Gear>
            </GearContainer>

            <div style={{ marginTop: '1rem' }}>
              <AlignmentBar $level={totalAlignment} $label="Resonance">
                <ProgressBar $value={totalAlignment} />
                <span>{gearAlignment.resonanceLevel.toFixed(0)}%</span>
              </AlignmentBar>
              
              <AlignmentBar $level={gearAlignment.phase / 360} $label="Phase">
                <ProgressBar $value={gearAlignment.phase / 360} />
                <span>{gearAlignment.phase.toFixed(0)}°</span>
              </AlignmentBar>              <AlignmentBar $level={totalAlignment} $label="Total">
                <span style={{ fontWeight: 'bold' }}>Total</span>
                <ProgressBar $value={totalAlignment} />
                <span style={{ fontWeight: 'bold' }}>{(totalAlignment * 100).toFixed(0)}%</span>
              </AlignmentBar>
            </div>

            <div style={{ 
              fontSize: '0.75rem', 
              color: 'rgba(212, 175, 55, 0.8)',
              fontStyle: 'italic',
              marginTop: '1rem',
              textAlign: 'center'
            }}>
              {isSynced ? 
                `⚡ Gears synchronized - flow state accessible` :
                `Harmonic calibration in progress - ${Math.ceil((0.75 - totalAlignment) * 100)}% to sync`
              }
            </div>

            {isSynced && (
              <div style={{ 
                fontSize: '0.7rem', 
                color: 'rgba(46, 204, 113, 0.8)',
                textAlign: 'center',
                marginTop: '0.5rem'
              }}>
                Last sync: {lastSync.toLocaleTimeString()}
              </div>
            )}
          </Panel>
        </Resizable>
      </div>
    </Draggable>
  )
}
