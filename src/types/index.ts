export interface ChatMessage {
  id: string;
<<<<<<< HEAD
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  type?: 'code' | 'documentation' | 'general';
}

export interface DocumentationItem {
=======
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  metadata?: {
    type?: 'code' | 'documentation' | 'general';
    codeLanguage?: string;
    references?: string[];
  };
}

export interface DocumentationSection {
>>>>>>> main
  id: string;
  title: string;
  content: string;
  type: 'markdown' | 'code' | 'api';
  tags: string[];
<<<<<<< HEAD
  createdAt: Date;
  updatedAt: Date;
}

export interface AppState {
  currentPage: 'dashboard' | 'chat' | 'documentation';
  isCodespaceConnected: boolean;
  isCopilotEnabled: boolean;
=======
  lastUpdated: Date;
  author?: string;
}

export interface DashboardState {
  isLoading: boolean;
  currentView: 'dashboard' | 'chat' | 'docs';
  chatMessages: ChatMessage[];
  documentation: DocumentationSection[];
  activeDocSection?: string;
}

export interface CopilotConfig {
  apiKey?: string;
  model: string;
  temperature: number;
  maxTokens: number;
  systemPrompt?: string;
>>>>>>> main
}