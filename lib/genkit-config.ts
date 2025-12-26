import { configureGenkit } from '@genkit-ai/core'
import { firebase } from '@genkit-ai/firebase'
import { googleAI } from '@genkit-ai/googleai'

// Configure Genkit with Firebase and Google AI
export const ai = configureGenkit({
  plugins: [
    firebase(),
    googleAI()
  ],
  logLevel: 'debug',
  enableTracingAndMetrics: true
})

// M2-3M Research Flow Types
export interface M2_3MRequest {
  query: string
  context: {
    user_id: string
    research_area: string
    priority_level: string
  }
}

export interface M2_3MResponse {
  response: string
  data?: any
  confidence: number
  sources: string[]
  timestamp: Date
}