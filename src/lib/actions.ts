'use server';

/**
 * Re-exporting Genkit flows through server actions.
 * This provides a clear boundary between the AI flow definitions and their usage in the application.
 */

import {
  personalizedLearningPath as personalizedLearningPathFlow,
  type PersonalizedLearningPathInput,
} from '@/ai/flows/personalized-learning-path';
import {
  moderateText as moderateTextFlow,
  type ModerateTextInput,
} from '@/ai/flows/moderate-text-flow';

export async function personalizedLearningPath(
  input: PersonalizedLearningPathInput
) {
  return await personalizedLearningPathFlow(input);
}

export async function moderateText(input: ModerateTextInput) {
  return await moderateTextFlow(input);
}
