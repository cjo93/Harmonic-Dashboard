'use client'

import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const ModalOverlay = styled(motion.div)`
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

const ModalContent = styled(motion.div)`
  background: linear-gradient(135deg, 
    rgba(15, 15, 35, 0.95) 0%, 
    rgba(26, 26, 46, 0.95) 50%, 
    rgba(22, 33, 62, 0.95) 100%
  );
  border: 2px solid #d4af37;
  border-radius: 20px;
  padding: 3rem;
  max-width: 600px;
  margin: 2rem;
  text-align: center;
  backdrop-filter: blur(20px);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
`

const Title = styled.h2`
  font-family: 'Montserrat', sans-serif;
  font-size: 2rem;
  color: #d4af37;
  margin: 0 0 1.5rem 0;
  font-weight: 300;
  text-shadow: 0 0 20px rgba(212, 175, 55, 0.5);
`

const Subtitle = styled.p`
  font-family: 'Noto Serif', serif;
  font-size: 1.1rem;
  color: #b8b8c4;
  margin: 0 0 2rem 0;
  line-height: 1.6;
  opacity: 0.9;
`

const ConsentText = styled.div`
  font-family: 'Noto Serif', serif;
  color: #e5e7eb;
  font-size: 1rem;
  line-height: 1.7;
  margin: 2rem 0;
  text-align: left;
  
  p {
    margin: 1rem 0;
  }
  
  strong {
    color: #d4af37;
  }
`

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
`

const Button = styled(motion.button)<{ variant: 'primary' | 'secondary' }>`
  background: ${props => props.variant === 'primary' 
    ? 'linear-gradient(135deg, #d4af37, #f4d03f)' 
    : 'rgba(212, 175, 55, 0.2)'
  };
  border: 1px solid #d4af37;
  color: ${props => props.variant === 'primary' ? '#000' : '#d4af37'};
  padding: 1rem 2rem;
  border-radius: 10px;
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 120px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(212, 175, 55, 0.3);
  }
`

interface ConsentModalProps {
  onAccept: () => void
  onDecline?: () => void
}

export default function ConsentModal({ onAccept, onDecline }: ConsentModalProps) {
  return (
    <ModalOverlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ModalContent
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.3 }}
      >
        <Title>Welcome to Defrag • HiGPT</Title>
        <Subtitle>
          Harmonic Intelligence Dashboard
        </Subtitle>

        <ConsentText>
          <p>
            <strong>Data Processing Notice:</strong> This dashboard processes synthetic consciousness patterns, 
            archetypal resonances, and cognitive harmonics for spiritual insight and personal development.
          </p>
          
          <p>
            <strong>Simulated Environment:</strong> All readings and analyses are generated for demonstration 
            purposes and should not be considered medical, psychological, or spiritual advice.
          </p>
          
          <p>
            <strong>Your Privacy:</strong> No personal data is transmitted or stored. All sessions are 
            locally processed and remain private to your device.
          </p>
          
          <p>
            By continuing, you acknowledge this is an experimental interface for exploring consciousness 
            through sacred geometry, harmonic analysis, and meditative practices.
          </p>
        </ConsentText>

        <ButtonContainer>
          <Button
            variant="primary"
            onClick={onAccept}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Accept & Continue
          </Button>
          
          {onDecline && (
            <Button
              variant="secondary"
              onClick={onDecline}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Decline
            </Button>
          )}
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  )
}