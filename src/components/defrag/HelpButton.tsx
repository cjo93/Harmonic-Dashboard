'use client'

import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { HelpCircle } from 'lucide-react'

const HelpButtonContainer = styled(motion.button)`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  padding: 0.75rem;
  border-radius: 10px;
  cursor: pointer;
  backdrop-filter: blur(20px);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 44px;
  min-height: 44px;

  &:hover {
    background: rgba(212, 175, 55, 0.3);
    border-color: #d4af37;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  }
`

interface HelpButtonProps {
  onClick: () => void
}

export default function HelpButton({ onClick }: HelpButtonProps) {
  return (
    <HelpButtonContainer
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title="Keyboard shortcuts and help"
    >
      <HelpCircle size={18} />
    </HelpButtonContainer>
  )
}
