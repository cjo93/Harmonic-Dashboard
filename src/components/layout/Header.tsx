'use client'

import { useStore } from '@/stores/useStore'
import { Bell, Search, User } from 'lucide-react'

export default function Header() {
  const currentPage = useStore(state => state.currentPage)

  const getPageTitle = () => {
    switch (currentPage) {
      case 'dashboard':
        return 'Dashboard'
      case 'chat':
        return 'Copilot Chat'
      case 'documentation':
        return 'Documentation'
      default:
        return 'Dashboard'
    }
  }

  const getPageDescription = () => {
    switch (currentPage) {
      case 'dashboard':
        return 'Overview of your development environment'
      case 'chat':
        return 'AI-powered development assistance'
      case 'documentation':
        return 'Manage and organize your project documentation'
      default:
        return 'Welcome to your development dashboard'
    }
  }

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">{getPageTitle()}</h1>
          <p className="text-sm text-gray-600 mt-1">{getPageDescription()}</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-harmonic-500 focus:border-transparent"
            />
          </div>
          
          <button className="p-2 text-gray-400 hover:text-gray-600 relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
            <div className="w-8 h-8 bg-harmonic-500 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Developer</p>
              <p className="text-xs text-gray-500">Codespace User</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}