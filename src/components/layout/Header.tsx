'use client'

import { useStore } from '@/stores/useStore'
import { Bell, Search, User } from 'lucide-react'

export default function Header() {
  const currentPage = useStore(state => state.currentPage)
  const isDarkTheme = currentPage === 'dashboard'

  const getPageTitle = () => {
    switch (currentPage) {
      case 'dashboard':
        return 'Defrag Console'
      case 'chat':
        return 'Copilot Chat'
      case 'documentation':
        return 'Documentation'
      default:
        return 'Defrag Console'
    }
  }

  const getPageDescription = () => {
    switch (currentPage) {
      case 'dashboard':
        return 'Neural Pattern Analysis and System Integration'
      case 'chat':
        return 'AI-powered development assistance'
      case 'documentation':
        return 'Manage and organize your project documentation'
      default:
        return 'Welcome to your development dashboard'
    }
  }

  return (
    <header className={`border-b px-6 py-4 ${
      isDarkTheme 
        ? 'bg-void-900 border-astral-800' 
        : 'bg-white border-gray-200'
    }`}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-2xl font-semibold ${
            isDarkTheme 
              ? 'text-astral-100' 
              : 'text-gray-900'
          }`}>{getPageTitle()}</h1>
          <p className={`text-sm mt-1 ${
            isDarkTheme 
              ? 'text-astral-400' 
              : 'text-gray-600'
          }`}>{getPageDescription()}</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className={`w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 ${
              isDarkTheme 
                ? 'text-astral-500' 
                : 'text-gray-400'
            }`} />
            <input
              type="text"
              placeholder="Search..."
              className={`pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:border-transparent ${
                isDarkTheme
                  ? 'bg-void-800 border-astral-700 text-astral-200 placeholder-astral-500 focus:ring-mystic-500'
                  : 'border-gray-200 focus:ring-harmonic-500'
              }`}
            />
          </div>
          
          <button className={`p-2 relative ${
            isDarkTheme 
              ? 'text-astral-400 hover:text-astral-200' 
              : 'text-gray-400 hover:text-gray-600'
          }`}>
            <Bell className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <div className={`flex items-center space-x-3 pl-4 border-l ${
            isDarkTheme 
              ? 'border-astral-800' 
              : 'border-gray-200'
          }`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              isDarkTheme 
                ? 'bg-mystic-600' 
                : 'bg-harmonic-500'
            }`}>
              <User className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className={`text-sm font-medium ${
                isDarkTheme 
                  ? 'text-astral-200' 
                  : 'text-gray-900'
              }`}>Developer</p>
              <p className={`text-xs ${
                isDarkTheme 
                  ? 'text-astral-400' 
                  : 'text-gray-500'
              }`}>Codespace User</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}