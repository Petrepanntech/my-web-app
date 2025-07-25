
"use client"
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { X, Minimize2 } from "lucide-react";
import AIBuddyPage from "@/app/student/ai-buddy/page";
import { useChat } from "@/context/ChatContext";

export function ChatWindow() {
    const { isOpen, setIsOpen } = useChat();

    if (!isOpen) return null;

    return (
        <Card className="fixed bottom-4 right-4 w-[calc(100%-2rem)] h-[calc(100%-6rem)] md:w-96 md:h-[600px] md:bottom-8 md:right-8 shadow-2xl rounded-lg flex flex-col z-50">
            <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
                <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                        <AvatarFallback>PLIH</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold text-sm">P.L.I.H</p>
                        <p className="text-xs text-muted-foreground">Your AI Assistant</p>
                    </div>
                </div>
                <div className="flex gap-2">
                     <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setIsOpen(false)}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="p-0 flex-1 overflow-hidden">
                <AIBuddyPage />
            </CardContent>
        </Card>
    )
}
