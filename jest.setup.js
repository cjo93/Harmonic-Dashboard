import '@testing-library/jest-dom'

// Polyfill for crypto.randomUUID in Node.js test environment
if (!global.crypto) {
  global.crypto = {
    randomUUID: () => Math.random().toString(36).substring(2) + Date.now().toString(36)
  }
}