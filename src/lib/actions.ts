
'use server';

/**
 * Re-exporting Genkit flows through server actions.
 * This provides a clear boundary between the AI flow definitions and their usage in the application.
 */

import { personalizedLearningPathFlow } from '@/ai/flows/personalized-learning-path';
import { moderateText as moderateTextFlow } from '@/ai/flows/moderate-text-flow';
import { generateMOUFlow } from '@/ai/flows/generate-mou-flow';
import { createCourse as createCourseFlow } from '@/ai/flows/create-course-flow';
import { aiBuddy as aiBuddyFlow } from '@/ai/flows/ai-buddy-flow';
import type {
    PersonalizedLearningPathInput,
    PersonalizedLearningPathOutput,
    ModerateTextInput,
    GenerateMOUInput,
    AIBuddyInput,
} from '@/types/ai-schemas';


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

export async function aiBuddy(input: AIBuddyInput): Promise<string> {
    return await aiBuddyFlow(input);
}

export async function search(query: string): Promise<string> {
    // The 'google-it' library does not have official TypeScript types,
    // so we use `require` to avoid type errors.
    const google = require('google-it');
    try {
        const results = await google({ query });
        return JSON.stringify(results);
    } catch (error) {
        console.error('Search failed:', error);
        return JSON.stringify({ error: 'Search operation failed.' });
    }
}
