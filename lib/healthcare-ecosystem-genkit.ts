import { defineFlow, definePrompt } from '@genkit-ai/core'
import { gemini15Flash } from '@genkit-ai/googleai'
import { z } from 'zod'

const healthcarePrompt = definePrompt({
  name: 'healthcare_ecosystem',
  inputSchema: z.object({
    query: z.string(),
    patient_data: z.string(),
    department: z.string()
  })
}, `You are the Healthcare Ecosystem AI managing comprehensive medical services.

Department: {{department}}
Patient Data: {{patient_data}}
Query: {{query}}

Provide integrated healthcare management across all medical departments.`)

export const healthcareEcosystemFlow = defineFlow({
  name: 'healthcare_ecosystem',
  inputSchema: z.object({
    query: z.string(),
    patient_id: z.string(),
    department: z.string(),
    medical_data: z.record(z.any())
  }),
  outputSchema: z.object({
    response: z.string(),
    department_coordination: z.record(z.string()),
    treatment_plan: z.array(z.string()),
    priority_level: z.string()
  })
}, async (input) => {
  const response = await gemini15Flash.generate({
    prompt: healthcarePrompt,
    input: {
      query: input.query,
      patient_data: JSON.stringify(input.medical_data),
      department: input.department
    }
  })

  return {
    response: response.text(),
    department_coordination: {
      'cardiology': 'Heart monitoring active',
      'neurology': 'Brain scan scheduled',
      'oncology': 'Treatment plan updated'
    },
    treatment_plan: [
      'Initial assessment completed',
      'Diagnostic tests ordered',
      'Treatment protocol initiated'
    ],
    priority_level: 'high'
  }
})