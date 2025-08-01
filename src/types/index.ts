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

export interface DocumentationItem {
  id: string;
  title: string;
  content: string;
  type: 'markdown' | 'code' | 'api';
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  author?: string;
}

export interface AppState {
  currentPage: 'dashboard' | 'chat' | 'documentation';
  isCodespaceConnected: boolean;
  isCopilotEnabled: boolean;
  isLoading: boolean;
  chatMessages: ChatMessage[];
  documentation: DocumentationItem[];
  activeDocSection?: string;
}

export interface CopilotConfig {
  apiKey?: string;
  model: string;
  temperature: number;
  maxTokens: number;
  systemPrompt?: string;
}