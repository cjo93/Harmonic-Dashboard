export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  type?: 'code' | 'documentation' | 'general';
}

export interface DocumentationItem {
  id: string;
  title: string;
  content: string;
  type: 'markdown' | 'code' | 'api';
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AppState {
  currentPage: 'dashboard' | 'chat' | 'documentation';
  isCodespaceConnected: boolean;
  isCopilotEnabled: boolean;
}