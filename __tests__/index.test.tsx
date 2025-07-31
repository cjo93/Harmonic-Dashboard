import { useStore } from '../src/stores/useStore'

// Test the Zustand store
describe('Store', () => {
  it('should initialize with correct default values', () => {
    const store = useStore.getState()
    
    expect(store.isLoading).toBe(false)
    expect(store.currentPage).toBe('dashboard')
    expect(store.messages).toEqual([])
    expect(store.documents.length).toBeGreaterThan(0) // Has sample data
    expect(store.selectedDocument).toBeNull()
  })

  it('should update current page', () => {
    const { setCurrentPage } = useStore.getState()
    
    setCurrentPage('chat')
    expect(useStore.getState().currentPage).toBe('chat')
    
    setCurrentPage('documentation')
    expect(useStore.getState().currentPage).toBe('documentation')
  })

  it('should add chat messages', () => {
    const { addMessage } = useStore.getState()
    
    // Store initial count
    const initialCount = useStore.getState().messages.length
    
    addMessage({
      role: 'user',
      content: 'Test message',
      metadata: { type: 'general' }
    })
    
    const messages = useStore.getState().messages
    expect(messages).toHaveLength(initialCount + 1)
    expect(messages[messages.length - 1].content).toBe('Test message')
    expect(messages[messages.length - 1].role).toBe('user')
  })

  it('should add documentation', () => {
    const { addDocument } = useStore.getState()
    
    // Store initial count
    const initialCount = useStore.getState().documents.length
    
    addDocument({
      title: 'Test Doc',
      content: '# Test Content',
      type: 'markdown',
      tags: ['test'],
      author: 'Test Author'
    })
    
    const docs = useStore.getState().documents
    expect(docs.length).toBe(initialCount + 1)
    
    const testDoc = docs.find(doc => doc.title === 'Test Doc')
    expect(testDoc).toBeDefined()
    expect(testDoc?.content).toBe('# Test Content')
  })
})