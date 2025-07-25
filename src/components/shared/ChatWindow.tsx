
"use client"
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { X, Minimize2, MessageCircle } from "lucide-react";
import AIBuddyPage from "@/app/student/ai-buddy/page";
import { useChat } from "@/context/ChatContext";

export function ChatWindow() {
    const { isOpen, setIsOpen } = useChat();

    if (!isOpen) return null;

    return (
        <Card className="fixed bottom-8 right-8 w-96 h-[600px] shadow-2xl rounded-lg flex flex-col z-50">
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
                        <Minimize2 className="h-4 w-4" />
                    </Button>
                     <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setIsOpen(false)}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="p-0 flex-1">
                <AIBuddyPage />
            </CardContent>
        </Card>
    )
}
