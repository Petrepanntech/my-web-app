import { GenerateRequest } from '@genkit-ai/ai';
import { googleAI } from '@genkit-ai/googleai';

// Use an environment variable for the model name, with a fallback to a default.
// This allows for easy configuration in different environments (dev, prod, etc.).
const MODEL_NAME = process.env.MODEL_NAME || 'gemini-1.5-pro-latest';

/**
 * Configuration for the AI model used in course generation.
 */
export const courseModel = googleAI(MODEL_NAME);

export const courseModelConfig: Partial<GenerateRequest['config']> = {
  temperature: 1.0,
};