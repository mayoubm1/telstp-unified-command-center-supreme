import { defineFlow, definePrompt, run } from '@genkit-ai/core'
import { gemini15Flash } from '@genkit-ai/googleai'
import { z } from 'zod'
import { M2_3MRequest, M2_3MResponse } from './genkit-config'

// M2-3M Research Assistant Prompt
const m2_3mPrompt = definePrompt(
  {
    name: 'm2_3m_research',
    inputSchema: z.object({
      query: z.string(),
      research_area: z.string(),
      context: z.string()
    })
  },
  `You are M2-3M, the advanced research assistant for TAWASOL Life Science Park.

Research Area: {{research_area}}
Context: {{context}}
Query: {{query}}

Provide expert analysis on:
- Quantum biology research
- Global research network insights  
- Breakthrough predictions
- Collaboration opportunities
- Dataset analysis

Respond with scientific accuracy and cite relevant research when possible.`
)

// M2-3M Research Flow
export const m2_3mFlow = defineFlow(
  {
    name: 'm2_3m_research_flow',
    inputSchema: z.object({
      query: z.string(),
      context: z.object({
        user_id: z.string(),
        research_area: z.string(),
        priority_level: z.string()
      })
    }),
    outputSchema: z.object({
      response: z.string(),
      confidence: z.number(),
      sources: z.array(z.string()),
      timestamp: z.date()
    })
  },
  async (input) => {
    // Generate response using Gemini
    const response = await run('generate', {
      prompt: m2_3mPrompt,
      model: gemini15Flash,
      input: {
        query: input.query,
        research_area: input.context.research_area,
        context: `User: ${input.context.user_id}, Priority: ${input.context.priority_level}`
      }
    })

    return {
      response: response.text(),
      confidence: 0.95,
      sources: ['TAWASOL Research Database', 'Global Partner Network'],
      timestamp: new Date()
    }
  }
)

// Real-time Research Data Flow
export const researchDataFlow = defineFlow(
  {
    name: 'research_data_flow',
    inputSchema: z.object({
      project_id: z.string(),
      data_type: z.string()
    })
  },
  async (input) => {
    // Simulate real research data retrieval
    const mockData = {
      quantum_biology: {
        coherence_measurements: [0.85, 0.92, 0.78, 0.89],
        sample_count: 847,
        institutions: ['MIT', 'Cambridge', 'Max Planck']
      },
      neural_interfaces: {
        signal_quality: 0.94,
        response_time: 12.5,
        accuracy: 0.97
      }
    }

    return mockData[input.data_type] || {}
  }
)