// Dual Database Configuration
// Supports both Firebase (current main database) and Supabase (for OmniCog Hub)

import { supabaseClient, omniCogHub, mockOmniCogData } from './supabase-client'

// Database provider types
export type DatabaseProvider = 'firebase' | 'supabase' | 'mock'

// Configuration interface
export interface DatabaseConfig {
  provider: DatabaseProvider
  fallbackToMock: boolean
  enableRealtime: boolean
}

// Default configuration
const defaultConfig: DatabaseConfig = {
  provider: 'mock', // Start with mock for development
  fallbackToMock: true,
  enableRealtime: false
}

// Database manager class
export class DatabaseManager {
  private config: DatabaseConfig
  private firebaseInitialized = false
  private supabaseInitialized = false

  constructor(config: DatabaseConfig = defaultConfig) {
    this.config = config
  }

  // Initialize Firebase (existing setup)
  async initializeFirebase() {
    try {
      // Firebase initialization would go here
      // For now, we'll assume it's already initialized in your existing setup
      this.firebaseInitialized = true
      console.log('Firebase initialized successfully')
      return true
    } catch (error) {
      console.error('Firebase initialization failed:', error)
      return false
    }
  }

  // Initialize Supabase
  async initializeSupabase() {
    try {
      // Test Supabase connection
      const { data, error } = await supabaseClient.from('omnicog_agents').select('count').limit(1)
      
      if (error && !this.config.fallbackToMock) {
        throw error
      }
      
      this.supabaseInitialized = !error
      console.log('Supabase initialized successfully')
      return true
    } catch (error) {
      console.error('Supabase initialization failed:', error)
      if (this.config.fallbackToMock) {
        console.log('Falling back to mock data')
        return true
      }
      return false
    }
  }

  // Get OmniCog data (from Supabase or mock)
  async getOmniCogAgents() {
    if (this.supabaseInitialized && this.config.provider === 'supabase') {
      try {
        return await omniCogHub.getAgents()
      } catch (error) {
        console.error('Error fetching from Supabase:', error)
        if (this.config.fallbackToMock) {
          return mockOmniCogData.agents
        }
        throw error
      }
    }
    
    return mockOmniCogData.agents
  }

  async getOmniCogProjects() {
    if (this.supabaseInitialized && this.config.provider === 'supabase') {
      try {
        return await omniCogHub.getProjects()
      } catch (error) {
        console.error('Error fetching from Supabase:', error)
        if (this.config.fallbackToMock) {
          return mockOmniCogData.projects
        }
        throw error
      }
    }
    
    return mockOmniCogData.projects
  }

  // Firebase operations (for existing TELsTP data)
  async getTELsTPProjects() {
    // This would interface with your existing Firebase setup
    // For now, returning mock data that matches your current structure
    return [
      {
        id: '1',
        name: 'League of Extraordinary Gentlemen',
        description: 'Advanced AI collaboration and research initiative',
        status: 'active',
        metadata: {
          apps: ['OmniCognitor', 'Wellness Companion', 'AI Tutor'],
          theme: 'Innovation'
        },
        created_at: new Date().toISOString()
      }
    ]
  }

  async getTELsTPAgents() {
    // This would interface with your existing Firebase setup
    return [
      {
        id: '1',
        name: 'Research Assistant Alpha',
        configuration: { mode: 'active', emotion: 'curious' },
        created_at: new Date().toISOString()
      },
      {
        id: '2',
        name: 'Code Reviewer Beta',
        configuration: { mode: 'listening', emotion: 'analytical' },
        created_at: new Date().toISOString()
      }
    ]
  }

  // Unified data access methods
  async getAllProjects() {
    const [telstpProjects, omnicogProjects] = await Promise.all([
      this.getTELsTPProjects(),
      this.getOmniCogProjects()
    ])

    return {
      telstp: telstpProjects,
      omnicog: omnicogProjects,
      total: telstpProjects.length + omnicogProjects.length
    }
  }

  async getAllAgents() {
    const [telstpAgents, omnicogAgents] = await Promise.all([
      this.getTELsTPAgents(),
      this.getOmniCogAgents()
    ])

    return {
      telstp: telstpAgents,
      omnicog: omnicogAgents,
      total: telstpAgents.length + omnicogAgents.length
    }
  }

  // Configuration methods
  switchToSupabase() {
    this.config.provider = 'supabase'
  }

  switchToFirebase() {
    this.config.provider = 'firebase'
  }

  switchToMock() {
    this.config.provider = 'mock'
  }

  enableRealtime() {
    this.config.enableRealtime = true
  }

  disableRealtime() {
    this.config.enableRealtime = false
  }

  getStatus() {
    return {
      provider: this.config.provider,
      firebaseInitialized: this.firebaseInitialized,
      supabaseInitialized: this.supabaseInitialized,
      realtimeEnabled: this.config.enableRealtime
    }
  }
}

// Export singleton instance
export const databaseManager = new DatabaseManager()

// Environment-based configuration
export const configureDatabase = () => {
  const environment = process.env.NODE_ENV || 'development'
  
  if (environment === 'production') {
    // In production, try to use real databases
    databaseManager.switchToSupabase()
    databaseManager.enableRealtime()
  } else {
    // In development, use mock data by default
    databaseManager.switchToMock()
    databaseManager.disableRealtime()
  }
  
  return databaseManager
}

// Initialize databases
export const initializeDatabases = async () => {
  console.log('Initializing databases...')
  
  const firebaseResult = await databaseManager.initializeFirebase()
  const supabaseResult = await databaseManager.initializeSupabase()
  
  console.log('Database initialization complete:', {
    firebase: firebaseResult,
    supabase: supabaseResult,
    status: databaseManager.getStatus()
  })
  
  return {
    firebase: firebaseResult,
    supabase: supabaseResult
  }
}