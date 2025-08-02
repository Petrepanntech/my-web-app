'use server';

/**
 * @fileOverview AI flow for moderating text content in the community hub.
 *
 * - moderateText - A function to moderate text content.
 * - ModerateTextInput - Input type for the moderateText function.
 * - ModerateTextOutput - Output type for the moderateText function.
 */



import { getCache, setCache, makeCacheKey } from '@/ai/lib/cache';

const ModerateTextInputSchema = z.object({
  text: z.string().describe('The text to moderate.'),
});
export type ModerateTextInput = z.infer<typeof ModerateTextInputSchema>;

const ModerateTextOutputSchema = z.object({
  isSafe: z.boolean().describe('Whether the text is safe or not.'),
  reason: z.string().optional().describe('The reason why the text is not safe, if applicable.'),
});
export type ModerateTextOutput = z.infer<typeof ModerateTextOutputSchema>;

export async function moderateText(input: ModerateTextInput): Promise<ModerateTextOutput> {
  return moderateTextFlow(input);
}

// ...prompt now imported from prompts/moderateTextPrompt

const moderateTextFlow = ai.defineFlow(
  {
    name: 'moderateTextFlow',
    inputSchema: ModerateTextInputSchema,
    outputSchema: ModerateTextOutputSchema,
  },
  async input => {
    const cacheKey = makeCacheKey('moderateTextFlow', input);
    const cached = getCache<ModerateTextOutput>(cacheKey);
    if (cached) {
      return cached;
    }
    try {
      const { output } = await moderateTextPrompt(input);
      if (output) {
        setCache(cacheKey, output);
        return output;
      } else {
        throw new Error('No output from AI');
      }
    } catch (err) {
      return {
        isSafe: false,
        reason: 'Content moderation failed. Please try again later.'
      };
    }
  }
);
