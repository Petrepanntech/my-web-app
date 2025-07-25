
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
1.  Create a mix of 'video' and 'lecture' lessons. Aim for 2-4 lessons per module.
2.  For 'video' lessons, find a real, high-quality, and relevant educational video from YouTube. Provide the full YouTube URL. Write a brief, one-sentence description for the video.
3.  For 'lecture' lessons, write detailed, informative content of at least 2-3 paragraphs. The content should be a proper lesson, not just a description. This text will be the primary content for the lesson.
4.  Assign the correct type ('video' or 'lecture') to each lesson.
5.  Generate a compelling overall title for the course based on the learning path.
6.  The instructor should always be "AI Curator".
7.  Generate a unique ID for the course, which should be a URL-friendly slug of the course title (e.g., "introduction-to-react").
8.  Provide a relevant placeholder image URL from Unsplash (e.g., https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&h=450&fit=crop).
9.  Provide a one or two-word aiHint for the image (e.g., "react logo").

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
    const { output } = await createCoursePrompt({ path: learningPath });
    return output!;
  }
);
