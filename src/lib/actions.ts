
'use server';

/**
 * Re-exporting Genkit flows through server actions.
 * This provides a clear boundary between the AI flow definitions and their usage in the application.
 */

import {
  personalizedLearningPath as personalizedLearningPathFlow,
  type PersonalizedLearningPathInput,
  type PersonalizedLearningPathOutput,
} from '@/ai/flows/personalized-learning-path';
import {
  moderateText as moderateTextFlow,
  type ModerateTextInput,
} from '@/ai/flows/moderate-text-flow';
import {
  generateMOU as generateMOUFlow,
  type GenerateMOUInput,
} from '@/ai/flows/generate-mou-flow';
import {
    createCourse as createCourseFlow,
} from '@/ai/flows/create-course-flow';
import {
  aiTutor as aiTutorFlow,
  type AITutorInput,
} from '@/ai/flows/ai-tutor-flow';

export async function personalizedLearningPath(
  input: PersonalizedLearningPathInput
) {
  return await personalizedLearningPathFlow(input);
}

export async function moderateText(input: ModerateTextInput) {
  return await moderateTextFlow(input);
}

export async function generateMOU(input: GenerateMOUInput) {
    return await generateMOUFlow(input);
}

export async function createCourse(input: PersonalizedLearningPathOutput) {
    return await createCourseFlow(input);
}

export async function aiTutor(input: AITutorInput) {
    return await aiTutorFlow(input);
}
