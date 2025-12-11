import { defineFlow, definePrompt } from '@genkit-ai/core'
import { gemini15Flash } from '@genkit-ai/googleai'
import { z } from 'zod'

const agentGlobePrompt = definePrompt({
  name: 'ai_agent_globe',
  inputSchema: z.object({
    query: z.string(),
    globe_data: z.string(),
    agent_network: z.string()
  })
}, `You are the AI Agent Globe coordinator managing global AI agent visualization.

Globe Data: {{globe_data}}
Agent Network: {{agent_network}}
Query: {{query}}

Provide 3D visualization insights and global AI agent coordination.`)

export const aiAgentGlobeFlow = defineFlow({
  name: 'ai_agent_globe',
  inputSchema: z.object({
    query: z.string(),
    globe_region: z.string(),
    agent_metrics: z.record(z.any())
  }),
  outputSchema: z.object({
    response: z.string(),
    globe_visualization: z.record(z.any()),
    agent_status: z.record(z.string()),
    network_health: z.number()
  })
}, async (input) => {
  const response = await gemini15Flash.generate({
    prompt: agentGlobePrompt,
    input: {
      query: input.query,
      globe_data: input.globe_region,
      agent_network: JSON.stringify(input.agent_metrics)
    }
  })

  return {
    response: response.text(),
    globe_visualization: {
      active_agents: 47,
      global_connections: 156,
      research_nodes: 23
    },
    agent_status: {
      'north_america': 'operational',
      'europe': 'optimal',
      'asia_pacific': 'high_activity'
    },
    network_health: 0.96
  }
})