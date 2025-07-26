import { renderHook, act } from '@testing-library/react'
import { useStore } from '../stores/useStore'

describe('useStore', () => {
  beforeEach(() => {
    // Reset store before each test
    useStore.setState({
      currentPage: 'dashboard',
      isCodespaceConnected: true,
      isCopilotEnabled: true,
      messages: [],
      isTyping: false,
      documents: [],
      selectedDocument: null,
      searchTerm: '',
    })
  })

  it('should initialize with default state', () => {
    const { result } = renderHook(() => useStore())
    
    expect(result.current.currentPage).toBe('dashboard')
    expect(result.current.isCodespaceConnected).toBe(true)
    expect(result.current.isCopilotEnabled).toBe(true)
    expect(result.current.messages).toEqual([])
    expect(result.current.documents).toEqual([])
  })

  it('should update current page', () => {
    const { result } = renderHook(() => useStore())
    
    act(() => {
      result.current.setCurrentPage('chat')
    })
    
    expect(result.current.currentPage).toBe('chat')
  })

  it('should add messages', () => {
    const { result } = renderHook(() => useStore())
    
    act(() => {
      result.current.addMessage({
        role: 'user',
        content: 'Test message'
      })
    })
    
    expect(result.current.messages).toHaveLength(1)
    expect(result.current.messages[0].content).toBe('Test message')
    expect(result.current.messages[0].role).toBe('user')
  })

  it('should add documents', () => {
    const { result } = renderHook(() => useStore())
    
    act(() => {
      result.current.addDocument({
        title: 'Test Doc',
        content: 'Test content',
        type: 'markdown',
        tags: ['test']
      })
    })
    
    expect(result.current.documents).toHaveLength(1)
    expect(result.current.documents[0].title).toBe('Test Doc')
  })

  it('should update documents', () => {
    const { result } = renderHook(() => useStore())
    
    act(() => {
      result.current.addDocument({
        title: 'Test Doc',
        content: 'Test content',
        type: 'markdown',
        tags: ['test']
      })
    })
    
    const docId = result.current.documents[0].id
    
    act(() => {
      result.current.updateDocument(docId, {
        title: 'Updated Doc'
      })
    })
    
    expect(result.current.documents[0].title).toBe('Updated Doc')
  })

  it('should delete documents', () => {
    const { result } = renderHook(() => useStore())
    
    act(() => {
      result.current.addDocument({
        title: 'Test Doc',
        content: 'Test content',
        type: 'markdown',
        tags: ['test']
      })
    })
    
    const docId = result.current.documents[0].id
    
    act(() => {
      result.current.deleteDocument(docId)
    })
    
    expect(result.current.documents).toHaveLength(0)
  })

  it('should set search term', () => {
    const { result } = renderHook(() => useStore())
    
    act(() => {
      result.current.setSearchTerm('test search')
    })
    
    expect(result.current.searchTerm).toBe('test search')
  })
})