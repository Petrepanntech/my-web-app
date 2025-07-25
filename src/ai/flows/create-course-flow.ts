
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
Your task is to take a structured learning path and transform it into a full, detailed course curriculum designed to take a student from a novice to a professional level.

The learning path is provided below as a JSON object. Parse this JSON to understand the student's learning goals.
{{{json path}}}

Based on the learning path, you must generate the following:
1.  A compelling overall title for the course.
2.  A detailed, engaging, and encouraging course overview (at least 3-4 paragraphs). This should set the stage, explain what the student will learn, what they will be able to do after completion, and get them excited to start.
3.  A unique course ID, which should be a URL-friendly slug of the course title (e.g., "introduction-to-react-from-scratch").
4.  A relevant placeholder image URL from Unsplash (e.g., https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&h=450&fit=crop).
5.  A one or two-word aiHint for the image (e.g., "react logo").
6.  The instructor should always be "AI Curator".

For the curriculum itself:
For each module in the learning path, you must:
1.  Create a mix of 'video' and 'lecture' lessons. Aim for 3-5 lessons per module to ensure comprehensive coverage.
2.  For 'video' lessons:
    a. Find a real, high-quality, and relevant educational video from YouTube. Provide the full YouTube URL.
    b. Write a brief, one-sentence description for the video.
    c. IMPORTANT: Generate a concise summary or a bulleted list of key takeaways from the video's content and add it to the 'notes' field. This should be detailed enough to serve as a study guide.
3.  For 'lecture' lessons, write detailed, informative content of at least 3-5 paragraphs. This text will be the primary content for the lesson and should be thorough enough to be a standalone piece of learning material. It should not be a simple description but a proper lesson.
4.  Ensure the lessons within each module build upon each other logically.
5.  Assign the correct type ('video' or 'lecture') to each lesson.

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
