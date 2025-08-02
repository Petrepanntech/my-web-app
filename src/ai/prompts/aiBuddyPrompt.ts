import { ai } from '@/ai/genkit';
import { AIBuddyInputSchema } from '@/types/ai-schemas';

export const aiBuddyPrompt = ai.definePrompt({
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
