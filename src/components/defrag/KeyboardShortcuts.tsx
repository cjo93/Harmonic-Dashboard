'use client'

import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'

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
  padding: 2rem;
  max-width: 600px;
  margin: 2rem;
  backdrop-filter: blur(20px);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`

const Title = styled.h2`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.5rem;
  color: #d4af37;
  margin: 0;
  font-weight: 500;
`

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #b8b8c4;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #d4af37;
    background: rgba(212, 175, 55, 0.1);
  }
`

const ShortcutList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const ShortcutItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`

const ShortcutDescription = styled.div`
  font-family: 'Noto Serif', serif;
  color: #e5e7eb;
  font-size: 0.9rem;
`

const ShortcutKeys = styled.div`
  display: flex;
  gap: 0.25rem;
  align-items: center;
`

const Key = styled.span`
  background: rgba(212, 175, 55, 0.2);
  border: 1px solid #d4af37;
  color: #d4af37;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.8rem;
  font-weight: 500;
  min-width: 24px;
  text-align: center;
`

const Plus = styled.span`
  color: #b8b8c4;
  font-size: 0.8rem;
  margin: 0 0.25rem;
`

interface KeyboardShortcutsProps {
  onClose: () => void
}

export default function KeyboardShortcuts({ onClose }: KeyboardShortcutsProps) {
  const shortcuts = [
    {
      keys: ['Ctrl', 'R'],
      description: 'Refresh harmonic data'
    },
    {
      keys: ['Ctrl', ','],
      description: 'Open settings'
    },
    {
      keys: ['Ctrl', '/'],
      description: 'Show this help dialog'
    },
    {
      keys: ['Ctrl', '1'],
      description: 'Switch to Sacred Geometry view'
    },
    {
      keys: ['Ctrl', '2'],
      description: 'Switch to Analytics view'
    },
    {
      keys: ['Ctrl', '3'],
      description: 'Switch to Meditation view'
    },
    {
      keys: ['Esc'],
      description: 'Close dialogs/modals'
    }
  ]

  return (
    <ModalOverlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <ModalContent
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
        <Header>
          <Title>Keyboard Shortcuts</Title>
          <CloseButton onClick={onClose}>
            <X size={20} />
          </CloseButton>
        </Header>

        <ShortcutList>
          {shortcuts.map((shortcut, index) => (
            <ShortcutItem key={index}>
              <ShortcutDescription>{shortcut.description}</ShortcutDescription>
              <ShortcutKeys>
                {shortcut.keys.map((key, keyIndex) => (
                  <React.Fragment key={keyIndex}>
                    <Key>{key}</Key>
                    {keyIndex < shortcut.keys.length - 1 && <Plus>+</Plus>}
                  </React.Fragment>
                ))}
              </ShortcutKeys>
            </ShortcutItem>
          ))}
        </ShortcutList>
      </ModalContent>
    </ModalOverlay>
  )
}
