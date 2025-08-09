import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const AppContext = createContext()

const initialState = {
  user: null,
  brandVoice: null,
  draftWeeks: [],
  currentWeek: null,
  loading: false,
  error: null,
  subscription: {
    tier: 'starter', // starter, pro, scale
    features: {
      weeklyDrafts: 4,
      aiOptimization: false,
      analytics: false,
      multipleProjects: false
    }
  }
}

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false }
    case 'SET_USER':
      return { ...state, user: action.payload }
    case 'SET_BRAND_VOICE':
      return { ...state, brandVoice: action.payload }
    case 'SET_DRAFT_WEEKS':
      return { ...state, draftWeeks: action.payload }
    case 'SET_CURRENT_WEEK':
      return { ...state, currentWeek: action.payload }
    case 'ADD_DRAFT_WEEK':
      return { ...state, draftWeeks: [...state.draftWeeks, action.payload] }
    case 'UPDATE_DRAFT_WEEK':
      return {
        ...state,
        draftWeeks: state.draftWeeks.map(week =>
          week.id === action.payload.id ? action.payload : week
        ),
        currentWeek: state.currentWeek?.id === action.payload.id ? action.payload : state.currentWeek
      }
    default:
      return state
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  // Initialize mock user and brand voice
  useEffect(() => {
    const initializeApp = async () => {
      dispatch({ type: 'SET_LOADING', payload: true })
      
      // Mock user data
      const mockUser = {
        id: '1',
        email: 'user@example.com',
        name: 'Demo User',
        createdAt: new Date().toISOString()
      }
      
      // Mock brand voice
      const mockBrandVoice = {
        id: '1',
        name: 'My Brand Voice',
        toneProfile: {
          tone: 'professional',
          style: 'conversational',
          audience: 'young professionals',
          keywords: ['innovation', 'growth', 'community']
        },
        voiceConstraints: {
          maxLength: 280,
          hashtagCount: 5,
          callToAction: true
        }
      }
      
      dispatch({ type: 'SET_USER', payload: mockUser })
      dispatch({ type: 'SET_BRAND_VOICE', payload: mockBrandVoice })
      dispatch({ type: 'SET_LOADING', payload: false })
    }
    
    initializeApp()
  }, [])

  const value = {
    ...state,
    dispatch
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}