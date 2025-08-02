import type { PopQuizQuestion } from '@/types/ai-schemas';

export interface ValidationResult {
    isValid: boolean;
    errors: string[];
}

export function validateQuizQuestion(question: PopQuizQuestion): ValidationResult {
    const errors: string[] = [];

    // Required fields
    if (!question.question?.trim()) {
        errors.push('Question text is required');
    }

    if (!Array.isArray(question.options) || question.options.length !== 4) {
        errors.push('Question must have exactly 4 options');
    } else {
        // Check for duplicate options
        const uniqueOptions = new Set(question.options);
        if (uniqueOptions.size !== question.options.length) {
            errors.push('All options must be unique');
        }

        // Check for empty options
        if (question.options.some(opt => !opt?.trim())) {
            errors.push('Options cannot be empty');
        }
    }

    if (!question.answer) {
        errors.push('Answer is required');
    } else if (!question.options?.includes(question.answer)) {
        errors.push('Answer must match one of the options exactly');
    }

    // Optional insight field - if present, must not be empty
    if (question.insight !== undefined && !question.insight?.trim()) {
        errors.push('If provided, insight cannot be empty');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
}

export function repairQuizQuestion(question: PopQuizQuestion): PopQuizQuestion {
    const repaired = { ...question };

    // Ensure question text exists
    if (!repaired.question?.trim()) {
        repaired.question = 'This question needs to be reviewed.';
    }

    // Ensure options array
    if (!Array.isArray(repaired.options) || repaired.options.length !== 4) {
        repaired.options = [
            'Option A',
            'Option B',
            'Option C',
            'Option D'
        ];
    }

    // Remove duplicates and fill if needed
    const uniqueOptions = Array.from(new Set(repaired.options));
    while (uniqueOptions.length < 4) {
        uniqueOptions.push(`Option ${uniqueOptions.length + 1}`);
    }
    repaired.options = uniqueOptions.slice(0, 4);

    // Ensure answer exists and is valid
    if (!repaired.answer || !repaired.options.includes(repaired.answer)) {
        repaired.answer = repaired.options[0];
    }

    // Ensure insight exists
    if (repaired.insight === undefined || !repaired.insight?.trim()) {
        repaired.insight = `The correct answer is "${repaired.answer}". This insight needs to be reviewed.`;
    }

    return repaired;
}
