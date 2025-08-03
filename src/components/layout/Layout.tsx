'use client'

import { useStore } from '@/stores/useStore'
import Sidebar from './Sidebar'
import Header from './Header'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const currentPage = useStore(state => state.currentPage)
  const isDarkTheme = currentPage === 'dashboard'

  return (
    <div className={`min-h-screen flex ${isDarkTheme ? 'bg-void-950' : 'bg-gray-50'}`}>
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className={`flex-1 overflow-y-auto ${isDarkTheme ? 'p-0' : 'p-6'}`}>
          {children}
        </main>
      </div>
    </div>
  )
}