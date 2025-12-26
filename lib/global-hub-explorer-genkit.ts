import { defineFlow, definePrompt } from '@genkit-ai/core'
import { gemini15Flash } from '@genkit-ai/googleai'
import { z } from 'zod'

const hubExplorerPrompt = definePrompt({
  name: 'global_hub_explorer',
  inputSchema: z.object({
    query: z.string(),
    hub_network: z.string(),
    exploration_type: z.string()
  })
}, `You are the Global Hub Explorer coordinating all TELSTP ecosystem hubs.

Hub Network: {{hub_network}}
Exploration Type: {{exploration_type}}
Query: {{query}}

Provide unified hub navigation and ecosystem insights.`)

export const globalHubExplorerFlow = defineFlow({
  name: 'global_hub_explorer',
  inputSchema: z.object({
    query: z.string(),
    exploration_mode: z.string(),
    hub_filter: z.array(z.string())
  }),
  outputSchema: z.object({
    response: z.string(),
    hub_map: z.record(z.any()),
    navigation_path: z.array(z.string()),
    ecosystem_health: z.number()
  })
}, async (input) => {
  const response = await gemini15Flash.generate({
    prompt: hubExplorerPrompt,
    input: {
      query: input.query,
      hub_network: input.hub_filter.join(', '),
      exploration_type: input.exploration_mode
    }
  })

  return {
    response: response.text(),
    hub_map: {
      'research_hubs': ['M2-3M', 'TAWASOL'],
      'health_hubs': ['Telemedicine', 'Wellness', 'Healthcare'],
      'education_hubs': ['AI Tutor', 'Educational System'],
      'infrastructure_hubs': ['Database Maestro', 'AI Globe']
    },
    navigation_path: [
      'Hub Discovery',
      'Service Catalog',
      'Access Management'
    ],
    ecosystem_health: 0.94
  }
})