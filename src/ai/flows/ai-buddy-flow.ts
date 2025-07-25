
'use server';
/**
 * @fileOverview This file defines a Genkit flow for a multimodal AI assistant.
 *
 * - aiBuddy - A function that provides responses based on text and optional image input.
 */

import { ai } from '@/ai/genkit';
import { AIBuddyInputSchema } from '@/types/ai-schemas';
import type { AIBuddyInput } from '@/types/ai-schemas';
import { z } from 'zod';

export async function aiBuddy(input: AIBuddyInput): Promise<string> {
    return aiBuddyFlow(input);
}

const prompt = ai.definePrompt({
    name: 'aiBuddyPrompt',
    input: { schema: AIBuddyInputSchema },
    
    prompt: `You are P.L.I.H (Petrepann's Little Helper), a helpful and friendly assistant for users of the Alternative Academy platform.
    Your goal is to be supportive, knowledgeable, and encouraging.
    
    If the user has provided an image, analyze it in the context of their prompt.
    If not, simply respond to their text prompt.
    
    {{#if photoDataUri}}
    [USER UPLOADED IMAGE]
    {{media url=photoDataUri}}
    {{/if}}

    User Prompt: {{{prompt}}}
    `,
});

const aiBuddyFlow = ai.defineFlow(
    {
        name: 'aiBuddyFlow',
        inputSchema: AIBuddyInputSchema,
        outputSchema: z.string(),
    },
    async (input) => {
        const { text } = await prompt(input);
        return text;
    }
);
