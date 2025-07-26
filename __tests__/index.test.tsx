import { useDashboardStore } from '../src/lib/store'

// Test the Zustand store
describe('Dashboard Store', () => {
  it('should initialize with correct default values', () => {
    const store = useDashboardStore.getState()
    
    expect(store.isLoading).toBe(false)
    expect(store.currentView).toBe('dashboard')
    expect(store.chatMessages).toEqual([])
    expect(store.documentation).toEqual([])
    expect(store.activeDocSection).toBeUndefined()
  })

  it('should update current view', () => {
    const { setCurrentView } = useDashboardStore.getState()
    
    setCurrentView('chat')
    expect(useDashboardStore.getState().currentView).toBe('chat')
    
    setCurrentView('docs')
    expect(useDashboardStore.getState().currentView).toBe('docs')
  })

  it('should add chat messages', () => {
    const { addChatMessage, clearChatMessages } = useDashboardStore.getState()
    
    // Clear any existing messages
    clearChatMessages()
    
    addChatMessage({
      role: 'user',
      content: 'Test message',
      metadata: { type: 'general' }
    })
    
    const messages = useDashboardStore.getState().chatMessages
    expect(messages).toHaveLength(1)
    expect(messages[0].content).toBe('Test message')
    expect(messages[0].role).toBe('user')
  })

  it('should add documentation', () => {
    const { addDocumentation } = useDashboardStore.getState()
    
    addDocumentation({
      title: 'Test Doc',
      content: '# Test Content',
      type: 'markdown',
      tags: ['test'],
      author: 'Test Author'
    })
    
    const docs = useDashboardStore.getState().documentation
    expect(docs.length).toBeGreaterThan(0)
    
    const testDoc = docs.find(doc => doc.title === 'Test Doc')
    expect(testDoc).toBeDefined()
    expect(testDoc?.content).toBe('# Test Content')
  })
})