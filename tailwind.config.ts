import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    // Defrag color classes
    'bg-defrag-bg',
    'bg-defrag-card',
    'bg-defrag-border',
    'text-defrag-text-primary',
    'text-defrag-text-secondary', 
    'text-defrag-text-muted',
    'text-defrag-accent-green',
    'text-defrag-accent-red',
    'text-defrag-accent-purple',
    'text-defrag-accent-blue',
    'text-defrag-accent-gold',
    'border-defrag-border',
    'hover:bg-defrag-border/50',
    // Glyph classes
    'glyph',
    'glyph-harmonic',
    'glyph-orbital',
    'glyph-temporal',
    'glyph-symbolic',
    'glyph-aquarian',
    'glyph-defrag',
  ],
  theme: {
    extend: {
      colors: {
        harmonic: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        // Dark theme colors for Defrag astrology application
        defrag: {
          bg: '#0a0a0a',
          card: '#1a1a1a',
          border: '#2a2a2a',
          'text-primary': '#ffffff',
          'text-secondary': '#a0a0a0',
          'text-muted': '#666666',
          'accent-green': '#22c55e',
          'accent-red': '#ef4444',
          'accent-purple': '#8b5cf6',
          'accent-blue': '#3b82f6',
          'accent-gold': '#fbbf24',
        },
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['Consolas', 'Monaco', 'Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
} satisfies Config;