export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  type?: 'code' | 'documentation' | 'general';
  metadata?: {
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
}

export interface CopilotConfig {
  apiKey?: string;
  model: string;
  temperature: number;
  maxTokens: number;
  systemPrompt?: string;
}

// Defrag/HiGPT Types
export interface MirrorState {
  id: string;
  type: string;
  intensity: number;
  frequency: number;
}

export interface GearAlignment {
  id: string;
  planetaryGear: string;
  resonanceLevel: number;
  phase: number;
}

export interface SymbolicBand {
  id: string;
  archetype: string;
  frequency: number;
  amplitude: number;
  phase: number;
}

export interface HarmonicProfile {
  msi: number;
  mirrorStates: MirrorState[];
  gearAlignments: GearAlignment[];
  symbolicBands: SymbolicBand[];
  archetypes: string[];
  prompts: string[];
}