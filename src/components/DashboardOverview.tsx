import React from 'react';
import { Activity, FileText, MessageSquare, Code, TrendingUp, Users, Clock, GitBranch } from 'lucide-react';
import { useStore } from '../stores/useStore';

const DashboardOverview: React.FC = () => {
  const { messages: chatMessages, documents: documentation } = useStore();

  const stats = [
    {
      label: 'Total Messages',
      value: chatMessages.length,
      icon: MessageSquare,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      label: 'Documentation Pages',
      value: documentation.length,
      icon: FileText,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      label: 'Code Discussions',
      value: chatMessages.filter(m => m.type === 'code').length,
      icon: Code,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      label: 'Active Session',
      value: '2h 34m',
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];

  const recentActivity = [
    {
      type: 'chat',
      title: 'New chat conversation started',
      time: '2 minutes ago',
      icon: MessageSquare,
    },
    {
      type: 'doc',
      title: 'API documentation updated',
      time: '15 minutes ago',
      icon: FileText,
    },
    {
      type: 'code',
      title: 'Code review completed',
      time: '1 hour ago',
      icon: Code,
    },
    {
      type: 'system',
      title: 'Codespace environment ready',
      time: '2 hours ago',
      icon: GitBranch,
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-full">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Harmonic Dashboard</h1>
          <p className="text-gray-600">Your integrated development environment with Copilot-powered documentation and chat.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <Activity className="w-5 h-5 mr-2 text-harmonic-500" />
                Recent Activity
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivity.map((activity, index) => {
                  const Icon = activity.icon;
                  return (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-gray-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-harmonic-500" />
                Quick Actions
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 gap-3">
                <button className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                  <MessageSquare className="w-5 h-5 text-harmonic-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Start New Chat</p>
                    <p className="text-xs text-gray-500">Ask Copilot for help</p>
                  </div>
                </button>
                
                <button className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                  <FileText className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Create Documentation</p>
                    <p className="text-xs text-gray-500">Add new docs or guides</p>
                  </div>
                </button>
                
                <button className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                  <Code className="w-5 h-5 text-purple-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Code Review</p>
                    <p className="text-xs text-gray-500">Get code feedback</p>
                  </div>
                </button>
                
                <button className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                  <GitBranch className="w-5 h-5 text-orange-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Open Terminal</p>
                    <p className="text-xs text-gray-500">Access Codespace terminal</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Copilot Integration Status */}
        <div className="mt-8 bg-gradient-to-r from-harmonic-500 to-harmonic-600 rounded-lg shadow-sm">
          <div className="px-6 py-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">GitHub Copilot Integration</h3>
                <p className="text-harmonic-100 text-sm">Connected and ready to assist with your development workflow</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-sm font-medium">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;