import { defineFlow, definePrompt } from '@genkit-ai/core'
import { gemini15Flash } from '@genkit-ai/googleai'
import { z } from 'zod'

const wellnessPrompt = definePrompt({
  name: 'wellness_companion',
  inputSchema: z.object({
    query: z.string(),
    health_data: z.string(),
    user_profile: z.string()
  })
}, `You are the Wellness Companion AI for personalized health management.

User Profile: {{user_profile}}
Health Data: {{health_data}}
Query: {{query}}

Provide personalized wellness recommendations and health insights.`)

export const wellnessFlow = defineFlow({
  name: 'wellness_analysis',
  inputSchema: z.object({
    query: z.string(),
    health_metrics: z.record(z.number()),
    user_id: z.string()
  }),
  outputSchema: z.object({
    response: z.string(),
    recommendations: z.array(z.string()),
    health_score: z.number()
  })
}, async (input) => {
  const response = await gemini15Flash.generate({
    prompt: wellnessPrompt,
    input: {
      query: input.query,
      health_data: JSON.stringify(input.health_metrics),
      user_profile: input.user_id
    }
  })

  return {
    response: response.text(),
    recommendations: [
      'Maintain regular exercise routine',
      'Monitor stress levels',
      'Ensure adequate sleep'
    ],
    health_score: 0.87
  }
})