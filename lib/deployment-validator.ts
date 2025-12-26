import { processHubRequest } from './hub-coordinator'

export const validateDeployment = async () => {
  const tests = [
    { hub: 'm2-3m' as const, query: 'Test M2-3M integration', context: { research_area: 'quantum_biology' } },
    { hub: 'omnicog' as const, query: 'Test OmniCog coordination', context: { platforms: ['ChatGPT', 'Claude'] } },
    { hub: 'wellness' as const, query: 'Test wellness analysis', context: { health_metrics: { heart_rate: 72 } } },
    { hub: 'tutor' as const, query: 'Test AI tutoring', context: { subject: 'mathematics', level: 'beginner' } },
    { hub: 'telemedicine' as const, query: 'Test telemedicine', context: { urgency: 'normal' } },
    { hub: 'healthcare' as const, query: 'Test healthcare ecosystem', context: { department: 'cardiology', patient_id: 'test123' } },
    { hub: 'education' as const, query: 'Test educational system', context: { grade_level: 'high_school', subjects: ['math', 'science'] } },
    { hub: 'ai-globe' as const, query: 'Test AI agent globe', context: { globe_region: 'global', agent_metrics: {} } },
    { hub: 'database' as const, query: 'Test database maestro', context: { operation: 'optimize', schema_data: {} } },
    { hub: 'hub-explorer' as const, query: 'Test hub explorer', context: { exploration_mode: 'discovery', hub_filter: [] } },
    { hub: 'manus-registry' as const, query: 'Test manus registry', context: { registry_operation: 'status', ai_agents: [] } }
  ]

  const results = []
  
  for (const test of tests) {
    try {
      const result = await processHubRequest(test)
      results.push({
        hub: test.hub,
        status: result.error ? 'FAILED' : 'SUCCESS',
        response: result.response?.substring(0, 100) + '...'
      })
    } catch (error) {
      results.push({
        hub: test.hub,
        status: 'ERROR',
        error: error.message
      })
    }
  }

  return {
    deployment_status: results.every(r => r.status === 'SUCCESS') ? 'SUCCESS' : 'PARTIAL',
    hub_results: results,
    timestamp: new Date()
  }
}