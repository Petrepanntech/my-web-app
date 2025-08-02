import { ai } from '@/ai/genkit';
import { PersonalizedLearningPathInputSchema, PersonalizedLearningPathOutputSchema } from '@/types/ai-schemas';

export const personalizedLearningPathPrompt = ai.definePrompt({
  name: 'personalizedLearningPathPrompt',
  input: {schema: PersonalizedLearningPathInputSchema},
  output: {schema: PersonalizedLearningPathOutputSchema},
  prompt: `You are an expert learning path generator for a platform called Alternative Academy.
Your task is to create a personalized learning path based on a student's interests and goals.
The platform will use this path to generate a course with curated videos from free sources like YouTube.

Student Interests: {{{interests}}}
Student Goals: {{{goals}}}

Please generate a structured and encouraging learning path broken down into 3-5 logical modules. Each module should have a clear title and a short description.

Respond with a JSON object containing a "path" array, where each object in the array has a "title" and a "description" for the module.
`,
});
