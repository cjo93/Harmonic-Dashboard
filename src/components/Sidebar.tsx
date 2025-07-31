import React from 'react';
import { FileText, MessageSquare, Home, Settings, BookOpen, Code } from 'lucide-react';
import { useStore } from '../stores/useStore';

const Sidebar: React.FC = () => {
  const { currentPage: currentView, setCurrentPage: setCurrentView } = useStore();

  const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard', view: 'dashboard' as const },
    { id: 'chat', icon: MessageSquare, label: 'Copilot Chat', view: 'chat' as const },
    { id: 'docs', icon: BookOpen, label: 'Documentation', view: 'documentation' as const },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-harmonic-500 rounded-lg flex items-center justify-center">
            <Code className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">Harmonic Dashboard</h1>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.view;
          
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.view)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                isActive
                  ? 'bg-harmonic-50 text-harmonic-700 border border-harmonic-200'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3 px-3 py-2">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">Codespace Active</p>
            <p className="text-xs text-gray-500">GitHub Copilot Connected</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;