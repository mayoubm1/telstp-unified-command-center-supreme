import { runFlow } from '@genkit-ai/core'
import { m2_3mFlow } from './m2-3m-genkit'
import { omnicogFlow } from './omnicog-genkit'
import { wellnessFlow } from './wellness-genkit'
import { tutorFlow } from './ai-tutor-genkit'
import { telemedicineFlow } from './telemedicine-genkit'
import { healthcareEcosystemFlow } from './healthcare-ecosystem-genkit'
import { educationalSystemFlow } from './educational-system-genkit'
import { aiAgentGlobeFlow } from './ai-agent-globe-genkit'
import { databaseMaestroFlow } from './database-maestro-genkit'
import { globalHubExplorerFlow } from './global-hub-explorer-genkit'
import { manusRegistryFlow } from './manus-registry-genkit'

export type HubType = 'm2-3m' | 'omnicog' | 'wellness' | 'tutor' | 'telemedicine' | 'healthcare' | 'education' | 'ai-globe' | 'database' | 'hub-explorer' | 'manus-registry'

export interface HubRequest {
  hub: HubType
  query: string
  context: Record<string, any>
}

export const processHubRequest = async (request: HubRequest) => {
  try {
    switch (request.hub) {
      case 'm2-3m':
        return await runFlow(m2_3mFlow, {
          query: request.query,
          context: request.context
        })

      case 'omnicog':
        return await runFlow(omnicogFlow, {
          query: request.query,
          platforms: request.context.platforms || ['ChatGPT', 'Claude', 'Gemini'],
          task_type: request.context.task_type || 'coordination'
        })

      case 'wellness':
        return await runFlow(wellnessFlow, {
          query: request.query,
          health_metrics: request.context.health_metrics || {},
          user_id: request.context.user_id || 'anonymous'
        })

      case 'tutor':
        return await runFlow(tutorFlow, {
          query: request.query,
          subject: request.context.subject || 'general',
          student_level: request.context.level || 'intermediate'
        })

      case 'telemedicine':
        return await runFlow(telemedicineFlow, {
          query: request.query,
          patient_data: request.context.patient_data || {},
          urgency: request.context.urgency || 'normal'
        })

      case 'healthcare':
        return await runFlow(healthcareEcosystemFlow, {
          query: request.query,
          patient_id: request.context.patient_id || 'anonymous',
          department: request.context.department || 'general',
          medical_data: request.context.medical_data || {}
        })

      case 'education':
        return await runFlow(educationalSystemFlow, {
          query: request.query,
          student_id: request.context.student_id || 'anonymous',
          grade_level: request.context.grade_level || 'intermediate',
          subjects: request.context.subjects || ['general'],
          learning_data: request.context.learning_data || {}
        })

      case 'ai-globe':
        return await runFlow(aiAgentGlobeFlow, {
          query: request.query,
          globe_region: request.context.globe_region || 'global',
          agent_metrics: request.context.agent_metrics || {}
        })

      case 'database':
        return await runFlow(databaseMaestroFlow, {
          query: request.query,
          operation: request.context.operation || 'query',
          schema_data: request.context.schema_data || {}
        })

      case 'hub-explorer':
        return await runFlow(globalHubExplorerFlow, {
          query: request.query,
          exploration_mode: request.context.exploration_mode || 'discovery',
          hub_filter: request.context.hub_filter || []
        })

      case 'manus-registry':
        return await runFlow(manusRegistryFlow, {
          query: request.query,
          registry_operation: request.context.registry_operation || 'status',
          ai_agents: request.context.ai_agents || []
        })

      default:
        throw new Error(`Unknown hub: ${request.hub}`)
    }
  } catch (error) {
    return {
      response: `Hub ${request.hub} is currently initializing. Please try again.`,
      error: true,
      timestamp: new Date()
    }
  }
}