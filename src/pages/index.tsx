import React from 'react';
import Sidebar from '../components/Sidebar';
import DashboardOverview from '../components/DashboardOverview';
import ChatInterface from '../components/ChatInterface';
import DocumentationViewer from '../components/DocumentationViewer';
import { useDashboardStore } from '../lib/store';
import { useInitializeApp } from '../hooks/useInitializeApp';

const Home: React.FC = () => {
  const { currentView } = useDashboardStore();
  
  // Initialize the app with sample data
  useInitializeApp();

  const renderMainContent = () => {
    switch (currentView) {
      case 'chat':
        return <ChatInterface />;
      case 'docs':
        return <DocumentationViewer />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 overflow-hidden">
        {renderMainContent()}
      </main>
    </div>
  );
};

export default Home;