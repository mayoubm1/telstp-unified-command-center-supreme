import { defineFlow, definePrompt } from '@genkit-ai/core'
import { gemini15Flash } from '@genkit-ai/googleai'
import { z } from 'zod'

const tutorPrompt = definePrompt({
  name: 'ai_tutor',
  inputSchema: z.object({
    query: z.string(),
    subject: z.string(),
    level: z.string()
  })
}, `You are an AI Tutor providing personalized education.

Subject: {{subject}}
Level: {{level}}
Question: {{query}}

Provide clear, educational responses with examples and learning paths.`)

export const tutorFlow = defineFlow({
  name: 'ai_tutoring',
  inputSchema: z.object({
    query: z.string(),
    subject: z.string(),
    student_level: z.string()
  }),
  outputSchema: z.object({
    response: z.string(),
    learning_path: z.array(z.string()),
    difficulty: z.number()
  })
}, async (input) => {
  const response = await gemini15Flash.generate({
    prompt: tutorPrompt,
    input: {
      query: input.query,
      subject: input.subject,
      level: input.student_level
    }
  })

  return {
    response: response.text(),
    learning_path: [
      'Review fundamentals',
      'Practice exercises',
      'Advanced concepts'
    ],
    difficulty: 0.6
  }
})