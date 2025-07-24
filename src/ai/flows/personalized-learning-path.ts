
'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating personalized learning paths.
 *
 * - personalizedLearningPath - A function that generates a personalized learning path based on user interests and goals.
 * - PersonalizedLearningPathInput - The input type for the personalizedLearningPath function.
 * - PersonalizedLearningPathOutput - The return type for the personalizedLearningPath function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import type { PersonalizedLearningPathOutput } from './create-course-flow';
import { PersonalizedLearningPathOutputSchema } from './create-course-flow';


const PersonalizedLearningPathInputSchema = z.object({
  interests: z
    .string()
    .describe('The interests of the student.'),
  goals: z.string().describe('The goals of the student.'),
});
export type PersonalizedLearningPathInput = z.infer<
  typeof PersonalizedLearningPathInputSchema
>;

export async function personalizedLearningPath(
  input: PersonalizedLearningPathInput
): Promise<PersonalizedLearningPathOutput> {
  return personalizedLearningPathFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedLearningPathPrompt',
  input: {schema: PersonalizedLearningPathInputSchema},
  output: {schema: PersonalizedLearningPathOutputSchema},
  prompt: `You are an expert learning path generator for a platform called Alternative Academy.
Your task is to create a personalized learning path based on a student's interests and goals.
The platform will use this path to generate a course with curated videos from free sources like YouTube.

Student Interests: {{{interests}}}
Student Goals: {{{goals}}}

Please generate a structured and encouraging learning path broken down into 3-5 logical modules. Each module should have a clear title and a short description.

Respond with a JSON object containing a "path" array, where each object in the array has a "title" and a "description" for the module.
`,
});

const personalizedLearningPathFlow = ai.defineFlow(
  {
    name: 'personalizedLearningPathFlow',
    inputSchema: PersonalizedLearningPathInputSchema,
    outputSchema: PersonalizedLearningPathOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
