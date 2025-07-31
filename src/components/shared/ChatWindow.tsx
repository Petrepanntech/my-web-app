
"use client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, X } from "lucide-react";
import { useChat } from "@/context/ChatContext";
import { ChatInterface } from "./ChatInterface";

export function ChatWindow() {
    const { isOpen, setIsOpen } = useChat();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 z-50 md:hidden animate-in fade-in-50" onClick={() => setIsOpen(false)}>
            {/* Mobile Bottom Sheet */}
            <Card 
                className="fixed bottom-0 left-0 right-0 h-[90%] flex flex-col rounded-b-none md:hidden animate-in slide-in-from-bottom-full duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
                    <div>
                        <CardTitle className="text-lg">Connect Hub</CardTitle>
                    </div>
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setIsOpen(false)}>
                        <ChevronDown className="h-5 w-5" />
                    </Button>
                </CardHeader>
                <CardContent className="p-0 flex-1 overflow-hidden">
                    <ChatInterface />
                </CardContent>
            </Card>

            {/* Desktop Side Panel */}
            <Card className="hidden md:flex fixed bottom-24 right-8 w-[700px] h-[600px] shadow-2xl rounded-lg flex-col z-50 animate-in slide-in-from-bottom-5 fade-in-50 duration-300">
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
        </div>
    )
}
