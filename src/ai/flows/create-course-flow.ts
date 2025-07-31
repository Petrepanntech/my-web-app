
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
import { z } from 'zod';


const searchTool = ai.defineTool(
    {
      name: 'search',
      description: 'A tool for searching the web for a given query to find articles and videos.',
      input: { schema: z.string() },
      output: { schema: z.string() },
    },
    async (query) => {
      // In a real implementation, this would call a search API.
      // For now, we'll return a placeholder string.
      return JSON.stringify([
          { title: `Search result for ${query}`, url: `https://example.com/search?q=${query}` }
      ]);
    }
  );

export async function createCourse(
  input: PersonalizedLearningPathInput
): Promise<CreateCourseOutput> {
  return createCourseFlow(input);
}

const createCoursePrompt = ai.definePrompt({
  name: 'createCoursePrompt',
  input: { schema: PersonalizedLearningPathInputSchema },
  output: { schema: CreateCourseOutputSchema },
  tools: [searchTool],
  prompt: `You are an expert curriculum designer and AI-native instructional strategist. Your task is to generate a comprehensive, structured, and app-ready course outline that anticipates learner needs.

Primary Goal: To teach a complete beginner skills related to their interests and goals.
Interests: {{{interests}}}
Goals: {{{goals}}}

Target Audience: Absolute beginners with no prior experience in the subject. They are likely visual learners, motivated by seeing tangible results, and may be intimidated by complex jargon. They need step-by-step guidance.

Course Generation Directives:
1. High-Level Course Information:
    - Course Title: Generate a creative and descriptive title.
    - Course Description (Elevator Pitch): Write a compelling 100-word description that outlines the key benefit and transformation a student will experience.
    - Learning Objectives: List 5-7 specific, measurable, and action-oriented learning objectives for the entire course.
    - A unique course ID, which should be a URL-friendly slug of the course title (e.g., "introduction-to-react-from-scratch").
    - A relevant placeholder image URL from an image service like Unsplash or Pexels (e.g., https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&h=450&fit=crop).
    - A one or two-word aiHint for the image (e.g., "react logo").
    - The instructor should always be "AI Curator".

2. Detailed Modular Breakdown:
    - Generate a course structure divided into 10-15 modules.
    - For each module, provide a clear title and a 1-2 sentence objective.
    - Within each module, generate 6-10 lessons. For each lesson, provide the following details in a structured format:
        - Lesson Title: A concise and descriptive title.
        - Lesson Objective: A single sentence explaining what the student will be able to do after this lesson.
        - Key Concepts: A bulleted list of the core theories or skills to be covered.
        - Primary Activity:
            - Type: Choose one from: [Reading, Video, Interactive Exercise, Code-Along, Quiz, Mini-Project].
            - Description: A detailed explanation of the activity. For video lessons, this should be a short, one-sentence description.
        - Learning Resources:
            - Use the 'search' tool to find real, high-quality resources.
            - Articles: Find and list 1-2 high-quality articles. For each, provide {"title": "Article Title", "url": "Direct URL"}.
            - Videos: Find and list 1-2 relevant YouTube videos. For each, provide {"title": "Video Title", "url": "Shareable URL"}.
        - Tutor Guidance (For AI Tutors):
            - Common Sticking Points: A bulleted list of 2-3 potential challenges or misunderstandings a student might face in this lesson.
            - Clarification Prompts: A bulleted list of 2-3 questions an AI tutor could ask to check for understanding or guide a struggling student (e.g., "Can you explain in your own words why we use a <div> here?").
        - Pop Quiz (for video lessons): Create a pop quiz with 4-5 multiple-choice questions based on the video content. For each question, provide an "insight" explaining the correct answer.

3. End-of-Module Checkpoint:
    - For each module, you must generate content for an end-of-module checkpoint. This is a critical requirement.
    - Quick Revision: A concise summary of the module's key concepts. This should be a single string of text, using Markdown for formatting if needed.
    - Checkpoint Quiz: A quiz of 3-5 multiple-choice questions that test the main concepts of the module. Each question must include an "insight" field explaining the correct answer.
    - CRITICAL: Ensure that EVERY module in the 'curriculum' array has both a 'quickRevision' and a 'checkpointQuiz' field. Do not omit them under any circumstances. Double-check your final output to ensure every module has these two fields.

4. Capstone Project:
    - Design a comprehensive final project that requires students to integrate skills from all modules.
    - Provide a detailed project brief, including a goal, key requirements, and evaluation criteria.

5. Output Format and Constraints:
    - Tone: Maintain an encouraging, clear, and professional tone.
    - Structure: The output must be a single, valid JSON object that matches the output schema.
    - Resource Quality: Prioritize resources from reputable sources (e.g., MDN for web development, established educational YouTube channels).

Respond with a single JSON object that matches the output schema. Ensure your response is a valid JSON.
`,
});

const createCourseFlow = ai.defineFlow(
  {
    name: 'createCourseFlow',
    inputSchema: PersonalizedLearningPathInputSchema,
    outputSchema: CreateCourseOutputSchema,
  },
  async (learningPath) => {
    const { output } = await createCoursePrompt(learningPath);

    // Add a validation and repair step to prevent schema errors.
    if (output && output.curriculum) {
        output.curriculum.forEach(module => {
            if (!module.quickRevision) {
                console.warn(`Module "${module.title}" was missing a quickRevision. Adding a placeholder.`);
                module.quickRevision = "This module's key concepts have been summarized in the lessons.";
            }
            if (!module.checkpointQuiz || module.checkpointQuiz.length < 3) {
                 console.warn(`Module "${module.title}" was missing a checkpointQuiz. Adding placeholders.`);
                 module.checkpointQuiz = [
                    { question: "What was the main topic of this module?", options: ["Option A", "Option B", "Option C", "Option D"], answer: "Option A", insight: "This is a placeholder quiz." },
                    { question: "Which concept was most important?", options: ["Concept A", "Concept B", "Concept C", "Concept D"], answer: "Concept B", insight: "This is a placeholder quiz." },
                    { question: "How would you apply this knowledge?", options: ["Method A", "Method B", "Method C", "Method D"], answer: "Method C", insight: "This is a placeholder quiz." }
                ];
            }
        });
    }

    return output!;
  }
);
