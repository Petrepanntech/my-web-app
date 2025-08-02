import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ModerateTextInputSchema = z.object({
  text: z.string().describe('The text to moderate.'),
});
const ModerateTextOutputSchema = z.object({
  isSafe: z.boolean().describe('Whether the text is safe or not.'),
  reason: z.string().optional().describe('The reason why the text is not safe, if applicable.'),
});

export const moderateTextPrompt = ai.definePrompt({
  name: 'moderateTextPrompt',
  input: {schema: ModerateTextInputSchema},
  output: {schema: ModerateTextOutputSchema},
  prompt: `You are a content moderator for a community hub. Your job is to determine whether the given text is safe for the community.

Here's the text to evaluate:

{{text}}

Respond with a JSON object that contains two fields:
- isSafe: a boolean value indicating whether the text is safe or not.
- reason: a string value explaining why the text is not safe, if applicable. If the text is safe, this field should be omitted.
`,
});
