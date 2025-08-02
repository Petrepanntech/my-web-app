
'use server';
/**
 * @fileOverview This file defines a Genkit flow for a multimodal AI assistant.
 *
 * - aiBuddy - A function that provides responses based on text and optional image input.
 */



import { getCache, setCache, makeCacheKey } from '@/ai/lib/cache';


export const aiBuddyFlow = ai.defineFlow(
    {
        name: 'aiBuddyFlow',
        inputSchema: AIBuddyInputSchema,
        outputSchema: z.string(),
    },
    async (input: AIBuddyInput): Promise<string> => {
        const cacheKey = makeCacheKey('aiBuddyFlow', input);
        const cached = getCache<string>(cacheKey);
        if (cached) {
            return cached;
        }
        try {
            const { text } = await aiBuddyPrompt(input);
            if (text) {
                setCache(cacheKey, text);
                return text;
            } else {
                throw new Error('No response from AI');
            }
        } catch (err) {
            return 'Sorry, I am unable to respond right now. Please try again later.';
        }
    }
);

export const aiBuddy = aiBuddyFlow;
