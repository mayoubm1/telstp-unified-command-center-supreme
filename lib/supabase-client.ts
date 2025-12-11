import { createClient } from '@supabase/supabase-js'

// Supabase configuration for OmniCog Hub integration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key'

// Create Supabase client for OmniCog Hub
export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey)

// Database schema types for OmniCog Hub
export interface OmniCogAgent {
  id: string
  name: string
  type: 'research' | 'analysis' | 'coordination' | 'communication'
  status: 'active' | 'idle' | 'processing' | 'offline'
  capabilities: string[]
  current_task?: string
  performance_metrics: {
    tasks_completed: number
    success_rate: number
    avg_response_time: number
  }
  created_at: string
  updated_at: string
}

export interface OmniCogProject {
  id: string
  name: string
  description: string
  status: 'active' | 'completed' | 'paused' | 'planning'
  priority: 'low' | 'medium' | 'high' | 'critical'
  assigned_agents: string[]
  progress: number
  milestones: {
    id: string
    title: string
    completed: boolean
    due_date: string
  }[]
  metadata: Record<string, any>
  created_at: string
  updated_at: string
}

export interface OmniCogTask {
  id: string
  project_id: string
  agent_id: string
  title: string
  description: string
  status: 'pending' | 'in_progress' | 'completed' | 'failed'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  estimated_duration: number
  actual_duration?: number
  dependencies: string[]
  results?: Record<string, any>
  created_at: string
  updated_at: string
}

// OmniCog Hub API functions
export class OmniCogHub {
  private client = supabaseClient

  // Agent management
  async getAgents(): Promise<OmniCogAgent[]> {
    const { data, error } = await this.client
      .from('omnicog_agents')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  }

  async createAgent(agent: Omit<OmniCogAgent, 'id' | 'created_at' | 'updated_at'>): Promise<OmniCogAgent> {
    const { data, error } = await this.client
      .from('omnicog_agents')
      .insert([{
        ...agent,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single()
    
    if (error) throw error
    return data
  }

  async updateAgent(id: string, updates: Partial<OmniCogAgent>): Promise<OmniCogAgent> {
    const { data, error } = await this.client
      .from('omnicog_agents')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  }

  // Project management
  async getProjects(): Promise<OmniCogProject[]> {
    const { data, error } = await this.client
      .from('omnicog_projects')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  }

  async createProject(project: Omit<OmniCogProject, 'id' | 'created_at' | 'updated_at'>): Promise<OmniCogProject> {
    const { data, error } = await this.client
      .from('omnicog_projects')
      .insert([{
        ...project,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single()
    
    if (error) throw error
    return data
  }

  // Task management
  async getTasks(projectId?: string): Promise<OmniCogTask[]> {
    let query = this.client
      .from('omnicog_tasks')
      .select('*')
    
    if (projectId) {
      query = query.eq('project_id', projectId)
    }
    
    const { data, error } = await query.order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  }

  async createTask(task: Omit<OmniCogTask, 'id' | 'created_at' | 'updated_at'>): Promise<OmniCogTask> {
    const { data, error } = await this.client
      .from('omnicog_tasks')
      .insert([{
        ...task,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single()
    
    if (error) throw error
    return data
  }

  async updateTask(id: string, updates: Partial<OmniCogTask>): Promise<OmniCogTask> {
    const { data, error } = await this.client
      .from('omnicog_tasks')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  }

  // Real-time subscriptions
  subscribeToAgents(callback: (payload: any) => void) {
    return this.client
      .channel('omnicog_agents_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'omnicog_agents' }, 
        callback
      )
      .subscribe()
  }

  subscribeToProjects(callback: (payload: any) => void) {
    return this.client
      .channel('omnicog_projects_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'omnicog_projects' }, 
        callback
      )
      .subscribe()
  }

  subscribeToTasks(callback: (payload: any) => void) {
    return this.client
      .channel('omnicog_tasks_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'omnicog_tasks' }, 
        callback
      )
      .subscribe()
  }
}

// Export singleton instance
export const omniCogHub = new OmniCogHub()

// Fallback mock data for development
export const mockOmniCogData = {
  agents: [
    {
      id: '1',
      name: 'Research Coordinator Alpha',
      type: 'coordination' as const,
      status: 'active' as const,
      capabilities: ['project_management', 'resource_allocation', 'team_coordination'],
      current_task: 'Coordinating quantum biology research initiative',
      performance_metrics: {
        tasks_completed: 147,
        success_rate: 0.94,
        avg_response_time: 1.2
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '2',
      name: 'Data Analysis Beta',
      type: 'analysis' as const,
      status: 'processing' as const,
      capabilities: ['data_analysis', 'pattern_recognition', 'statistical_modeling'],
      current_task: 'Analyzing neural interface performance data',
      performance_metrics: {
        tasks_completed: 89,
        success_rate: 0.97,
        avg_response_time: 2.1
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ],
  projects: [
    {
      id: '1',
      name: 'OmniCog Neural Interface Integration',
      description: 'Developing advanced neural interface capabilities for the OmniCog platform',
      status: 'active' as const,
      priority: 'high' as const,
      assigned_agents: ['1', '2'],
      progress: 67,
      milestones: [
        {
          id: '1',
          title: 'Neural pattern recognition system',
          completed: true,
          due_date: '2025-01-15'
        },
        {
          id: '2',
          title: 'Real-time processing optimization',
          completed: false,
          due_date: '2025-02-01'
        }
      ],
      metadata: {
        budget: 150000,
        team_size: 8,
        technology_stack: ['neural_networks', 'real_time_processing', 'cloud_computing']
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ]
}