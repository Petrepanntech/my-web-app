'use server';

/**
 * @fileOverview A Genkit flow for generating a full course curriculum from a learning path.
 *
 * - createCourse - A function that generates a course with curated video content.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import type { PersonalizedLearningPathOutput } from './personalized-learning-path';

const CourseLessonSchema = z.object({
    type: z.enum(['video', 'lecture']),
    title: z.string().describe("The title of the lesson."),
    url: z.string().url().optional().describe("The URL of the YouTube video, if applicable."),
    description: z.string().describe("A short description of the lesson or video."),
});

const CourseModuleSchema = z.object({
    title: z.string().describe("The title of the course module."),
    lessons: z.array(CourseLessonSchema).describe("A list of lessons for the module."),
});

const CreateCourseOutputSchema = z.object({
    title: z.string().describe("A compelling title for the entire course."),
    curriculum: z.array(CourseModuleSchema).describe("The full curriculum for the course."),
});
export type CreateCourseOutput = z.infer<typeof CreateCourseOutputSchema>;


export async function createCourse(
  input: PersonalizedLearningPathOutput
): Promise<CreateCourseOutput> {
  return createCourseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'createCoursePrompt',
  input: { schema: z.any() },
  output: { schema: CreateCourseOutputSchema },
  prompt: `You are an expert curriculum designer for the online learning platform "Alternative Academy".
Your task is to take a structured learning path and transform it into a full course curriculum.

The learning path is provided below as a JSON object:
{{{jsonStringify input}}}

For each module in the learning path, you must:
1.  Come up with 2-3 specific, actionable lesson titles that fit the module's theme.
2.  For each lesson, find a real, high-quality, and relevant educational video from YouTube.
3.  Provide the full YouTube URL for the video.
4.  Write a brief, one-sentence description for each lesson that summarizes its content.
5.  Assign the type 'video' to all lessons.
6.  Create a compelling overall title for the course based on the learning path.

Respond with a single JSON object that matches the output schema.
`,
});

const createCourseFlow = ai.defineFlow(
  {
    name: 'createCourseFlow',
    inputSchema: z.any(),
    outputSchema: CreateCourseOutputSchema,
  },
  async (input) => {
    const { output } = await prompt({
        input,
        jsonStringify: (d: any) => JSON.stringify(d, null, 2),
    });
    return output!;
  }
);
