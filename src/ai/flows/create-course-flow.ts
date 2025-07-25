
'use server';

/**
 * @fileOverview A Genkit flow for generating a full course curriculum from a learning path.
 *
 * - createCourse - A function that generates a course with curated video content.
 */

import { ai } from '@/ai/genkit';
import {
  CreateCourseOutputSchema,
  PersonalizedLearningPathOutputSchema,
  type CreateCourseOutput,
  type PersonalizedLearningPathOutput
} from '@/types/ai-schemas';


export async function createCourse(
  input: PersonalizedLearningPathOutput
): Promise<CreateCourseOutput> {
  return createCourseFlow(input);
}

const createCoursePrompt = ai.definePrompt({
  name: 'createCoursePrompt',
  input: { schema: PersonalizedLearningPathOutputSchema },
  output: { schema: CreateCourseOutputSchema },
  prompt: `You are an expert curriculum designer for the online learning platform "Alternative Academy".
Your task is to take a structured learning path and transform it into a full course curriculum.

The learning path is provided below as a JSON object. Parse this JSON to understand the student's learning goals.
{{{json path}}}

For each module in the learning path, you must:
1.  Come up with 2-3 specific, actionable lesson titles that fit the module's theme.
2.  For each lesson, find a real, high-quality, and relevant educational video from YouTube.
3.  Provide the full YouTube URL for the video.
4.  Write a brief, one-sentence description for each lesson that summarizes its content.
5.  Assign the type 'video' to all lessons.
6.  Create a compelling overall title for the course based on the learning path.
7.  The instructor should always be "AI Curator".
8.  Generate a unique ID for the course, which should be a URL-friendly slug of the course title (e.g., "introduction-to-react").
9.  Provide a relevant placeholder image URL from Unsplash (e.g., https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=400&h=225&fit=crop).
10. Provide a one or two-word aiHint for the image (e.g., "react logo").

Respond with a single JSON object that matches the output schema. Ensure your response is a valid JSON.
`,
});

const createCourseFlow = ai.defineFlow(
  {
    name: 'createCourseFlow',
    inputSchema: PersonalizedLearningPathOutputSchema,
    outputSchema: CreateCourseOutputSchema,
  },
  async (learningPath) => {
    const { output } = await createCoursePrompt({ path: learningPath.path });
    return output!;
  }
);
