import { runFlow } from '@genkit-ai/core'
import { m2_3mFlow, researchDataFlow } from './m2-3m-genkit'
import { m2_3mResearchFlow } from '../m2-3m-integration'

// Enhanced M2-3M with Genkit AI
export const m2_3mGenkitFlow = async (input: {
  query: string
  context: {
    user_id: string
    research_area: string
    priority_level: string
  }
}) => {
  try {
    // Use Genkit AI for intelligent responses
    const aiResponse = await runFlow(m2_3mFlow, {
      query: input.query,
      context: input.context
    })

    // Get real research data
    const researchData = await runFlow(researchDataFlow, {
      project_id: 'QBP-2025-001',
      data_type: input.context.research_area
    })

    return {
      response: aiResponse.response,
      data: researchData,
      confidence: aiResponse.confidence,
      sources: aiResponse.sources,
      ai_powered: true,
      timestamp: aiResponse.timestamp
    }
  } catch (error) {
    // Fallback to original M2-3M system
    return await m2_3mResearchFlow(input)
  }
}

// Real-time data processing with Genkit
export const processResearchQuery = async (query: string) => {
  const context = {
    user_id: 'genkit_user',
    research_area: 'quantum_biology',
    priority_level: 'high'
  }

  return await m2_3mGenkitFlow({ query, context })
}