'use client'

import { useStore } from '@/stores/useStore'
import { Moon, Search, Star } from 'lucide-react'

export default function Header() {
  const currentPage = useStore(state => state.currentPage)

  const getPageTitle = () => {
    switch (currentPage) {
      case 'dashboard':
        return 'Defrag Portal'
      case 'chat':
        return 'Astro Insights'
      case 'documentation':
        return 'Cosmic Archive'
      default:
        return 'Defrag Portal'
    }
  }

  const getPageDescription = () => {
    switch (currentPage) {
      case 'dashboard':
        return 'Your personal astrology defragmentation center'
      case 'chat':
        return 'AI-powered cosmic guidance and insights'
      case 'documentation':
        return 'Sacred knowledge and spiritual documentation'
      default:
        return 'Welcome to your cosmic consciousness portal'
    }
  }

  return (
    <header className="bg-slate-900 border-b border-slate-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-purple-300">{getPageTitle()}</h1>
          <p className="text-sm text-slate-400 mt-1">{getPageDescription()}</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search cosmos..."
              className="pl-10 pr-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-sm text-purple-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          
          <button className="p-2 text-slate-400 hover:text-purple-300 relative">
            <Moon className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-violet-400 rounded-full animate-pulse"></span>
          </button>
          
          <div className="flex items-center space-x-3 pl-4 border-l border-slate-700">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-violet-600 rounded-full flex items-center justify-center">
              <Star className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-purple-300">Seeker</p>
              <p className="text-xs text-slate-400">Cosmic Explorer</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}