import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Theme {
  mode: 'light' | 'dark'
  primaryColor: string
  accentColor: string
  fontFamily: string
}

interface Settings {
  theme: Theme
  notifications: boolean
  autoSave: boolean
  showWelcome: boolean
  language: string
}

interface SettingsStore {
  settings: Settings
  updateTheme: (theme: Partial<Theme>) => void
  updateSettings: (settings: Partial<Settings>) => void
  resetToDefaults: () => void
}

const defaultSettings: Settings = {
  theme: {
    mode: 'light',
    primaryColor: '#3b82f6',
    accentColor: '#10b981',
    fontFamily: 'Inter'
  },
  notifications: true,
  autoSave: true,
  showWelcome: true,
  language: 'en'
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set, get) => ({
      settings: defaultSettings,
      
      updateTheme: (theme: Partial<Theme>) =>
        set((state) => ({
          settings: {
            ...state.settings,
            theme: { ...state.settings.theme, ...theme }
          }
        })),
      
      updateSettings: (newSettings: Partial<Settings>) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings }
        })),
      
      resetToDefaults: () =>
        set({ settings: defaultSettings })
    }),
    {
      name: 'harmonic-settings',
    }
  )
)
