'use client'

import { useStore } from '@/stores/useStore'
import Layout from '@/components/layout/Layout'
import Dashboard from '@/components/Dashboard'
import Chat from '@/components/chat/Chat'
import Documentation from '@/components/documentation/Documentation'

export default function Home() {
  const currentPage = useStore(state => state.currentPage)

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />
      case 'chat':
        return <Chat />
      case 'documentation':
        return <Documentation />
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