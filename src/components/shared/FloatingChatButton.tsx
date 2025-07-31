
"use client"
import { Button } from "../ui/button";
import { MessageCircle } from "lucide-react";
import { useChat } from "@/context/ChatContext";
import { cn } from "@/lib/utils";

export function FloatingChatButton() {
    const { isOpen, setIsOpen } = useChat();
    const unreadCount = 5; // Mock data

    return (
        <Button 
            className={cn(
                "fixed bottom-20 right-4 md:bottom-8 md:right-8 h-16 w-16 rounded-full shadow-lg z-40 transition-transform duration-300 ease-in-out",
                isOpen && "scale-0"
            )}
            size="icon"
            onClick={() => setIsOpen(true)}
        >
            <MessageCircle className="h-8 w-8" />
            <span className="sr-only">Open Connect Hub</span>
             {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
                    {unreadCount}
                </span>
            )}
        </Button>
    )
}
