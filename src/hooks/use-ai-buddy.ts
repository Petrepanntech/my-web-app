import { useCallback } from 'react';
import { aiBuddy } from '@/lib/actions';
import type { AIBuddyInput } from '@/types/ai-schemas';

const QUICK_ACTIONS = [
    { label: "Explain this", prompt: "Could you explain this in simpler terms?" },
    { label: "Give examples", prompt: "Can you give me some examples?" },
    { label: "Practice questions", prompt: "Generate some practice questions for this topic." },
    { label: "Key points", prompt: "What are the key points I should remember?" },
];

export function useAIBuddy() {
    const sendMessage = useCallback(async (input: AIBuddyInput) => {
        try {
            const response = await aiBuddy(input);
            return response;
        } catch (error) {
            console.error('AI Buddy error:', error);
            return "I apologize, but I'm having trouble processing your request right now. Please try again in a moment.";
        }
    }, []);

    const getQuickResponse = useCallback(async (action: string) => {
        const input: AIBuddyInput = { prompt: action };
        return sendMessage(input);
    }, [sendMessage]);

    return {
        sendMessage,
        getQuickResponse,
        QUICK_ACTIONS,
    };
}
