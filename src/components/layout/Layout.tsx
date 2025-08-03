'use client'

import { useStore } from '@/stores/useStore'
import Sidebar from './Sidebar'
import Header from './Header'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const currentPage = useStore(state => state.currentPage)
  
  // For the dashboard (defrag app), use full screen dark layout
  if (currentPage === 'dashboard') {
    return (
      <div className="min-h-screen bg-defrag-bg">
        {children}
      </div>
    )
  }

  // For other pages, use the original layout with sidebar
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}