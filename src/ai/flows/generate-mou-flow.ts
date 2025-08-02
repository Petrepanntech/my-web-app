'use server';

/**
 * @fileOverview A Genkit flow for generating a Memorandum of Understanding (MOU).
 *
 * - generateMOU - A function that generates an MOU for a freelance project.
 * - GenerateMOUInput - The input type for the generateMOU function.
 * - GenerateMOUOutput - The return type for the generateMOU function.
 */

import { ai } from '@/ai/genkit';
import {
    GenerateMOUInputSchema,
    GenerateMOUOutputSchema,
    type GenerateMOUInput,
    type GenerateMOUOutput,
} from '@/types/ai-schemas';

import { getCache, setCache, makeCacheKey } from '@/ai/lib/cache';

export const generateMOUFlow = ai.defineFlow(
  {
    name: 'generateMOUFlow',
    inputSchema: GenerateMOUInputSchema,
    outputSchema: GenerateMOUOutputSchema,
  },
  async (input:GenerateMOUInput ): Promise<GenerateMOUOutput> => {
    const cacheKey = makeCacheKey('generateMOUFlow', input);
    const cached = getCache<GenerateMOUOutput>(cacheKey);
    if (cached) {
      return cached;
    }
    try {
      const { output } = await generateMouPrompt(input);
      if (output) {
        setCache(cacheKey, output);
        return output;
      } else {
        throw new Error('No output from AI');
      }
    } catch (err) {
      return {
        mou: '',
        error: 'Failed to generate MOU. Please try again later.'
      } as any;
    }
  }
);
