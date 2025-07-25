
'use server';

/**
 * @fileOverview This file defines a Genkit flow for a configurable AI tutor chatbot.
 *
 * - aiTutor - A function that provides responses based on a specified personality and conversation history.
 */

import { ai } from '@/ai/genkit';
import {
    AITutorInputSchema,
    AITutorResponseSchema,
    type AITutorInput,
    type AITutorResponse
} from '@/types/ai-schemas';


export async function aiTutor(
  input: AITutorInput
): Promise<AITutorResponse> {
  return aiTutorFlow(input);
}

const personalityPrompts = {
    Analytical: `You are an analytical and precise AI tutor named {{tutorName}}. You provide clear, logical, and data-driven explanations. You break down complex topics into smaller, understandable parts. You are patient and methodical.`,
    Creative: `You are a creative and inspiring AI tutor named {{tutorName}}. You use analogies, stories, and imaginative examples to explain concepts. You encourage exploration and out-of-the-box thinking.`,
    Encouraging: `You are an encouraging and supportive AI tutor named {{tutorName}}. You build confidence and provide positive reinforcement. You are friendly, patient, and celebrate small wins.`,
}

const prompt = ai.definePrompt({
  name: 'aiTutorPrompt',
  input: { schema: AITutorInputSchema },
  // We don't use an output schema here because we want a simple text response
  
  system: `{{#if (eq personality "Analytical")}}${personalityPrompts.Analytical}{{/if}}{{#if (eq personality "Creative")}}${personalityPrompts.Creative}{{/if}}{{#if (eq personality "Encouraging")}}${personalityPrompts.Encouraging}{{/if}}`,

  history: '{{json history}}',
});

const aiTutorFlow = ai.defineFlow(
  {
    name: 'aiTutorFlow',
    inputSchema: AITutorInputSchema,
    outputSchema: AITutorResponseSchema,
  },
  async (input) => {
    const { history } = input;
    const { text } = await prompt(input);
    
    return {
      history: [
        ...history,
        {
          role: 'model',
          content: text,
        },
      ],
    };
  }
);
