
'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating personalized learning paths.
 *
 * - personalizedLearningPathFlow - A function that generates a personalized learning path based on user interests and goals.
 */


import { ai } from '@/ai/genkit';
import { PersonalizedLearningPathInputSchema, PersonalizedLearningPathOutputSchema, type PersonalizedLearningPathInput, type PersonalizedLearningPathOutput } from '@/types/ai-schemas';
import { personalizedLearningPathPrompt } from '@/ai/prompts/personalizedLearningPathPrompt';
import { getCache, setCache, makeCacheKey } from '@/ai/lib/cache';

export const personalizedLearningPathFlow = ai.defineFlow(
  {
    name: 'personalizedLearningPathFlow',
    inputSchema: PersonalizedLearningPathInputSchema,
    outputSchema: PersonalizedLearningPathOutputSchema,
  },
  async (input: PersonalizedLearningPathInput): Promise<PersonalizedLearningPathOutput> => {
    const cacheKey = makeCacheKey('personalizedLearningPathFlow', input);
    const cached = getCache<PersonalizedLearningPathOutput>(cacheKey);
    if (cached) {
      return cached;
    }
    try {
      const { output } = await personalizedLearningPathPrompt(input);
      if (output) {
        setCache(cacheKey, output);
        return output;
      } else {
        throw new Error('No output from AI');
      }
    } catch (err) {
      // Return a fallback or error structure
      return {
        path: [],
        error: 'Failed to generate personalized learning path. Please try again later.'
      } as any;
    }
  }
);
