
"use client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useChat } from "@/context/ChatContext";
import { ChatInterface } from "./ChatInterface";

export function ChatWindow() {
    const { isOpen, setIsOpen } = useChat();

    if (!isOpen) return null;

    return (
        <Card className="fixed bottom-4 right-4 w-[calc(100%-2rem)] h-[calc(100%-6rem)] md:w-[700px] md:h-[600px] md:bottom-24 md:right-8 shadow-2xl rounded-lg flex flex-col z-50 animate-in slide-in-from-bottom-5 fade-in-50 duration-300">
            <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
                <div>
                    <CardTitle className="text-lg">Connect Hub</CardTitle>
                </div>
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setIsOpen(false)}>
                    <X className="h-4 w-4" />
                </Button>
            </CardHeader>
            <CardContent className="p-0 flex-1 overflow-hidden">
                <ChatInterface />
            </CardContent>
        </Card>
    )
}
