export interface ChatMessage {
  id: string;
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
  id: string;
  title: string;
  content: string;
  type: 'markdown' | 'code' | 'api';
  tags: string[];
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
}