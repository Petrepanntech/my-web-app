
"use client"
import { Button } from "../ui/button";
import { MessageCircle } from "lucide-react";
import { useChat } from "@/context/ChatContext";

export function FloatingChatButton() {
    const { isOpen, setIsOpen } = useChat();

    if (isOpen) {
        return null;
    }

    return (
        <Button 
            className="fixed bottom-8 right-8 h-16 w-16 rounded-full shadow-lg z-40" 
            size="icon"
            onClick={() => setIsOpen(true)}
        >
            <MessageCircle className="h-8 w-8" />
            <span className="sr-only">Open Chat</span>
        </Button>
    )
}
