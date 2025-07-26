import { create } from 'zustand';
import { DashboardState, ChatMessage, DocumentationSection } from '../types';

// Utility function to generate UUID (fallback for environments without crypto.randomUUID)
const generateId = (): string => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback for environments without crypto.randomUUID (like Node.js tests)
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

interface DashboardStore extends DashboardState {
  setCurrentView: (view: DashboardState['currentView']) => void;
  addChatMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  clearChatMessages: () => void;
  addDocumentation: (doc: Omit<DocumentationSection, 'id' | 'lastUpdated'>) => void;
  updateDocumentation: (id: string, updates: Partial<DocumentationSection>) => void;
  setActiveDocSection: (id?: string) => void;
  setLoading: (loading: boolean) => void;
}

export const useDashboardStore = create<DashboardStore>((set, get) => ({
  isLoading: false,
  currentView: 'dashboard',
  chatMessages: [],
  documentation: [],
  activeDocSection: undefined,

  setCurrentView: (view) => set({ currentView: view }),

  addChatMessage: (message) => {
    const newMessage: ChatMessage = {
      ...message,
      id: generateId(),
      timestamp: new Date(),
    };
    set((state) => ({
      chatMessages: [...state.chatMessages, newMessage],
    }));
  },

  clearChatMessages: () => set({ chatMessages: [] }),

  addDocumentation: (doc) => {
    const newDoc: DocumentationSection = {
      ...doc,
      id: generateId(),
      lastUpdated: new Date(),
    };
    set((state) => ({
      documentation: [...state.documentation, newDoc],
    }));
  },

  updateDocumentation: (id, updates) => {
    set((state) => ({
      documentation: state.documentation.map((doc) =>
        doc.id === id ? { ...doc, ...updates, lastUpdated: new Date() } : doc
      ),
    }));
  },

  setActiveDocSection: (id) => set({ activeDocSection: id }),

  setLoading: (loading) => set({ isLoading: loading }),
}));