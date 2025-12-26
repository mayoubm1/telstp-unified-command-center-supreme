import { defineFlow, definePrompt } from '@genkit-ai/core'
import { gemini15Flash } from '@genkit-ai/googleai'
import { z } from 'zod'

const educationPrompt = definePrompt({
  name: 'educational_system',
  inputSchema: z.object({
    query: z.string(),
    student_profile: z.string(),
    curriculum: z.string()
  })
}, `You are the Educational System AI managing comprehensive learning experiences.

Curriculum: {{curriculum}}
Student Profile: {{student_profile}}
Query: {{query}}

Provide personalized education across all academic disciplines and levels.`)

export const educationalSystemFlow = defineFlow({
  name: 'educational_system',
  inputSchema: z.object({
    query: z.string(),
    student_id: z.string(),
    grade_level: z.string(),
    subjects: z.array(z.string()),
    learning_data: z.record(z.any())
  }),
  outputSchema: z.object({
    response: z.string(),
    curriculum_path: z.array(z.string()),
    assessments: z.record(z.number()),
    next_milestones: z.array(z.string())
  })
}, async (input) => {
  const response = await gemini15Flash.generate({
    prompt: educationPrompt,
    input: {
      query: input.query,
      student_profile: `Grade: ${input.grade_level}, Subjects: ${input.subjects.join(', ')}`,
      curriculum: JSON.stringify(input.learning_data)
    }
  })

  return {
    response: response.text(),
    curriculum_path: [
      'Foundation concepts review',
      'Interactive learning modules',
      'Practical applications',
      'Advanced topics exploration'
    ],
    assessments: {
      'mathematics': 0.85,
      'science': 0.92,
      'literature': 0.78
    },
    next_milestones: [
      'Complete current module',
      'Take assessment quiz',
      'Begin advanced topics'
    ]
  }
})