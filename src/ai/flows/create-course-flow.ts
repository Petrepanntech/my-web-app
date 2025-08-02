
'use server';

/**
 * @fileOverview A Genkit flow for generating a full course curriculum from a learning path.
 *
 * - createCourse - A function that generates a course with curated video content.
 */


import { ai } from '@/ai/genkit';
import {
  CreateCourseOutputSchema,
  PersonalizedLearningPathInputSchema,
  type CreateCourseOutput,
  type PersonalizedLearningPathInput
} from '@/types/ai-schemas';

import { getCache, setCache, makeCacheKey } from '@/ai/lib/cache';

export async function createCourse(
  input: PersonalizedLearningPathInput
): Promise<CreateCourseOutput> {
  const course = await createCourseFlow(input);
  return validateAndRepairCourse(course);
}

// ...prompt and tool now imported from prompts/createCoursePrompt

import { z } from 'zod';
import { validateAndRepairCourse } from '@/lib/course-validator';


const searchTool = ai.defineTool(
  {
    name: 'createCourseFlow',
    inputSchema: PersonalizedLearningPathInputSchema,
    outputSchema: CreateCourseOutputSchema,
  },
  async (learningPath) => {
    const cacheKey = makeCacheKey('createCourseFlow', learningPath);
    const cached = getCache<any>(cacheKey);
    if (cached) {
      return cached;
    }
    try {
      const { output } = await createCoursePrompt(learningPath);

      // Add a validation and repair step to prevent schema errors.
      if (output && output.curriculum) {
        output.curriculum.forEach(module => {
          if (!module.quickRevision) {
            console.warn(`Module \"${module.title}\" was missing a quickRevision. Adding a placeholder.`);
            module.quickRevision = "This module's key concepts have been summarized in the lessons.";
          }
          // Ensure checkpointQuiz exists and is valid
          if (!Array.isArray(module.checkpointQuiz)) {
            module.checkpointQuiz = [];
          }
          // Patch missing 'answer' fields in checkpointQuiz
          module.checkpointQuiz.forEach(q => {
            if (!q.answer && Array.isArray(q.options) && q.options.length > 0) {
              q.answer = q.options[0];
              q.insight = q.insight || 'No answer provided by AI. Defaulted to first option.';
            }
          });
          // Ensure at least 3 items in checkpointQuiz
          while (module.checkpointQuiz.length < 3) {
            module.checkpointQuiz.push({
              question: "Placeholder question for missing quiz.",
              options: ["Option A", "Option B", "Option C", "Option D"],
              answer: "Option A",
              insight: "This is a placeholder quiz."
            });
          }
        });
      }

      setCache(cacheKey, output);
      return output!;
    } catch (err) {
      return {
        courseTitle: '',
        courseDescription: '',
        courseId: '',
        aiHint: '',
        instructor: '',
        imageUrl: '',
        objectives: [],
        curriculum: [],
        capstone: '',
        error: 'Failed to generate course. Please try again later.'
      } as any;
    }
  }
);
