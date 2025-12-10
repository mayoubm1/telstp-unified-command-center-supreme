// Mock Supabase client for local development
// This eliminates external dependencies and gives us full control

class MockSupabaseClient {
  constructor() {
    // Initialize with mock data
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