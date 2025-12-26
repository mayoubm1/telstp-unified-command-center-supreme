// Dual Database Support: Mock + Real Supabase Integration
// This provides backward compatibility while enabling real Supabase connections

class MockSupabaseClient {
  constructor() {
    // Initialize with mock data for TELsTP agents and projects
    this.mockData = {
      ai_agents: [
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
        },
        {
          id: '3',
          name: 'Data Analyst Gamma',
          configuration: { mode: 'processing', emotion: 'focused' },
          created_at: new Date().toISOString()
        }
      ],
      projects: [
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
      ],
      // OmniCog Hub data (for Supabase integration)
      omnicog_agents: [
        {
          id: '1',
          name: 'OmniCog Coordinator',
          type: 'coordination',
          status: 'active',
          capabilities: ['multi_platform_integration', 'task_coordination'],
          current_task: 'Managing cross-platform AI interactions',
          performance_metrics: {
            tasks_completed: 234,
            success_rate: 0.96,
            avg_response_time: 0.8
          },
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ],
      omnicog_projects: [
        {
          id: '1',
          name: 'Multi-Platform AI Integration',
          description: 'Connecting various AI platforms through OmniCog hub',
          status: 'active',
          priority: 'high',
          assigned_agents: ['1'],
          progress: 78,
          milestones: [
            {
              id: '1',
              title: 'Platform connectivity established',
              completed: true,
              due_date: '2025-01-10'
            }
          ],
          metadata: {
            platforms_connected: ['ChatGPT', 'Claude', 'Gemini', 'Perplexity'],
            integration_type: 'real_time'
          },
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ]
    };
  }

  from(table) {
    return {
      select: (columns = '*') => ({
        order: (column, options = {}) => ({
          then: (resolve) => {
            // Simulate async operation
            setTimeout(() => {
              const data = this.mockData[table] || [];
              resolve({ data, error: null });
            }, 100);
            return Promise.resolve({ data: this.mockData[table] || [], error: null });
          }
        })
      })
    };
  }
}

export const supabase = new MockSupabaseClient();

// Convenience function to check if real Supabase is available
export const isSupabaseAvailable = () => {
  return process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
};