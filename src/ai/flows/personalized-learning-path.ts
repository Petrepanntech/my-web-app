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

const PersonalizedLearningPathInputSchema = z.object({
  interests: z
    .string()
    .describe('The interests of the student.'),
  goals: z.string().describe('The goals of the student.'),
});
export type PersonalizedLearningPathInput = z.infer<
  typeof PersonalizedLearningPathInputSchema
>;

const PersonalizedLearningPathOutputSchema = z.object({
  learningPath: z
    .string()
    .describe(
      'A personalized learning path tailored to the student based on their interests and goals.'
    ),
});
export type PersonalizedLearningPathOutput = z.infer<
  typeof PersonalizedLearningPathOutputSchema
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

Please generate a structured and encouraging learning path.
Format the output using Markdown. It should include:
1. A main title for the learning path (e.g., using a H2 tag: ## Your Path to Becoming a...").
2. A brief, encouraging introductory paragraph.
3. A numbered list of learning modules or steps. Each item should be on its own line with a blank line between each item for spacing.
4. Use bolding for key concepts. Do not use asterisks for lists, only numbers.

Example Format:
## Your Frontend Developer Journey

Welcome to your personalized path! This journey is designed to take you from the basics to building modern web applications. Let's get started!

1. **Foundation**: Master **HTML**, **CSS**, and **JavaScript**.

2. **Frameworks**: Dive deep into a modern framework like **React** or **Next.js**.

3. **Advanced Topics**: Explore state management, testing, and performance optimization.
...and so on.

Personalized Learning Path:`,
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
