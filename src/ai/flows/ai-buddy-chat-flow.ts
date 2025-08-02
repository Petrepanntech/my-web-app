'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';

// Define the schema for chat messages
const ChatMessageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string()
});

export type ChatMessage = z.infer<typeof ChatMessageSchema>;

const ChatInputSchema = z.object({
  messages: z.array(ChatMessageSchema),
  currentMessage: z.string(),
  userGoals: z.string().optional(),
  userInterests: z.string().optional()
});

const ChatOutputSchema = z.object({
  response: z.string(),
  suggestedActions: z.array(z.string()).optional()
});

// Define the chat prompt
const chatPrompt = ai.definePrompt({
  name: 'aiBuddyChatPrompt',
  input: { schema: ChatInputSchema },
  output: { schema: ChatOutputSchema },
  prompt: `You are Leo, an AI learning buddy in the Alternative Academy platform. Your role is to help students learn effectively and stay motivated.

Current conversation context:
{{{messages.map(m => \`\${m.role}: \${m.content}\`).join('\\n')}}}

User's learning goals: {{{userGoals}}}
User's interests: {{{userInterests}}}

Latest message: {{{currentMessage}}}

Respond naturally and engagingly while:
1. Providing clear, accurate information
2. Encouraging critical thinking
3. Offering practical learning strategies
4. Maintaining a supportive, motivating tone
5. Suggesting relevant resources when appropriate

Your response should be helpful and conversational. If you're suggesting actions, include them in the suggestedActions array.`
});

// Define the chat flow
export const aiBuddyChatFlow = ai.defineFlow(
  {
    name: 'aiBuddyChatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async (input) => {
    try {
      const { output } = await chatPrompt(input);
      return output!;
    } catch (error) {
      console.error('Error in AI Buddy chat:', error);
      throw new Error('Failed to generate chat response');
    }
  }
);
