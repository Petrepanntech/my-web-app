import { create } from 'zustand';

interface ChatMessage {
    sender: 'me' | 'other';
    text: string;
    time: string;
    avatar?: string;
    name?: string;
}

interface ChatState {
    messages: ChatMessage[];
    isTyping: boolean;
    addMessage: (message: ChatMessage) => void;
    setTyping: (typing: boolean) => void;
    clearMessages: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
    messages: [],
    isTyping: false,
    addMessage: (message) => set((state) => ({ 
        messages: [...state.messages, message],
        isTyping: false 
    })),
    setTyping: (typing) => set({ isTyping: typing }),
    clearMessages: () => set({ messages: [] }),
}));
