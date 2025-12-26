import { defineFlow, definePrompt } from '@genkit-ai/core'
import { gemini15Flash } from '@genkit-ai/googleai'
import { z } from 'zod'

const telemedicinePrompt = definePrompt({
  name: 'telemedicine_assistant',
  inputSchema: z.object({
    query: z.string(),
    symptoms: z.string(),
    medical_history: z.string()
  })
}, `You are a Telemedicine AI Assistant for preliminary health assessment.

Symptoms: {{symptoms}}
Medical History: {{medical_history}}
Query: {{query}}

Provide preliminary assessment and recommend appropriate medical consultation.`)

export const telemedicineFlow = defineFlow({
  name: 'telemedicine_consultation',
  inputSchema: z.object({
    query: z.string(),
    patient_data: z.record(z.string()),
    urgency: z.string()
  }),
  outputSchema: z.object({
    response: z.string(),
    assessment: z.string(),
    recommendations: z.array(z.string())
  })
}, async (input) => {
  const response = await gemini15Flash.generate({
    prompt: telemedicinePrompt,
    input: {
      query: input.query,
      symptoms: input.patient_data.symptoms || '',
      medical_history: input.patient_data.history || ''
    }
  })

  return {
    response: response.text(),
    assessment: 'Preliminary assessment completed',
    recommendations: [
      'Schedule consultation with specialist',
      'Monitor symptoms',
      'Follow prescribed treatment'
    ]
  }
})