
'use server';

import {
  personalizedLearningPath as personalizedLearningPathFlow,
} from '@/ai/flows/personalized-learning-path';
import type { PersonalizedLearningPathInput, PersonalizedLearningPathOutput } from '@/ai/flows/personalized-learning-path';

import {
  moderateText as moderateTextFlow,
  type ModerateTextInput,
} from '@/ai/flows/moderate-text-flow'; // This line is causing the error
import { 
  generateMOU as generateMOUFlow,
  type GenerateMOUInput,
} from '@/ai/flows/generate-mou-flow';
import {
    createCourse as createCourseFlow,
} from '@/ai/flows/create-course-flow';
import {
    aiBuddy as aiBuddyFlow,
    type AIBuddyInput,
} from '@/ai/flows/ai-buddy-flow';


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
    const google = require('google');
    const results = await google(query);
    return JSON.stringify(results);
}
