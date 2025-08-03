import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        harmonic: {
          50: '#1a0d2e',
          100: '#2d1b3e',
          200: '#3d2854',
          300: '#4d356a',
          400: '#5d4280',
          500: '#6d4f96',
          600: '#7d5cac',
          700: '#8d69c2',
          800: '#9d76d8',
          900: '#ad83ee',
        },
        mystical: {
          purple: '#6d4f96',
          indigo: '#4c366e',
          violet: '#8d69c2',
          cosmic: '#ad83ee',
          deep: '#1a0d2e',
          glow: '#c084fc',
        },
        cosmic: {
          50: '#0f0620',
          100: '#1a0d2e',
          200: '#2d1b3e',
          300: '#3d2854',
          400: '#4d356a',
          500: '#5d4280',
          600: '#6d4f96',
          700: '#7d5cac',
          800: '#8d69c2',
          900: '#9d76d8',
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
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['Consolas', 'Monaco', 'Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
} satisfies Config;