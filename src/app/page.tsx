'use client'

import { useEffect } from 'react'
import { useEnhancedStore } from '@/stores/useEnhancedStore'
import Layout from '@/components/layout/Layout'
import Dashboard from '@/components/Dashboard'
import Chat from '@/components/chat/Chat'
import Documentation from '@/components/documentation/Documentation'
import Projects from '@/components/projects/Projects'
import Settings from '@/components/settings/Settings'
import Analytics from '@/components/analytics/Analytics'

export default function Home() {
  const { currentPage, initialize, isLoading, error } = useEnhancedStore()

  useEffect(() => {
    initialize()
  }, [initialize])

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="text-red-600 text-lg font-semibold mb-2">Error</div>
            <div className="text-gray-600 dark:text-gray-400">{error}</div>
          </div>
        </div>
      </Layout>
    )
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />
      case 'chat':
        return <Chat />
      case 'documentation':
        return <Documentation />
      case 'projects':
        return <Projects />
      case 'settings':
        return <Settings />
      default:
        return <Dashboard />
    }
  }

  return (
    <Layout>
      {renderPage()}
    </Layout>
  )
}