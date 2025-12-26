import { configureGenkit } from '@genkit-ai/core'
import { firebase } from '@genkit-ai/firebase'
import { googleAI } from '@genkit-ai/googleai'

export default configureGenkit({
  plugins: [
    firebase({
      projectId: process.env.FIREBASE_PROJECT_ID || 'telstp-m2-3m'
    }),
    googleAI({
      apiKey: process.env.GOOGLE_AI_API_KEY
    })
  ],
  logLevel: 'debug',
  enableTracingAndMetrics: true
})