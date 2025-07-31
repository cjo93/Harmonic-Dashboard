'use client'

import { useState } from 'react'
import { useStore } from '@/stores/useStore'
import Layout from '@/components/layout/Layout'
import Dashboard from '@/components/Dashboard'
import DefragDashboard from '@/components/defrag/DefragDashboard'
import Chat from '@/components/chat/Chat'
import Documentation from '@/components/documentation/Documentation'
import DashboardNavigation from '@/components/DashboardNavigation'

export default function Home() {
  const currentPage = useStore(state => state.currentPage)
  const [currentDashboard, setCurrentDashboard] = useState<'standard' | 'defrag'>('defrag')

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return currentDashboard === 'defrag' ? <DefragDashboard /> : <Dashboard />
      case 'chat':
        return <Chat />
      case 'documentation':
        return <Documentation />
      default:
        return currentDashboard === 'defrag' ? <DefragDashboard /> : <Dashboard />
    }
  }

  const showNavigation = currentPage === 'dashboard' || !currentPage

  return (
    <>
      {showNavigation && (
        <DashboardNavigation
          currentDashboard={currentDashboard}
          onDashboardChange={setCurrentDashboard}
        />
      )}
      <Layout>
        {renderPage()}
      </Layout>
    </>
  )
}