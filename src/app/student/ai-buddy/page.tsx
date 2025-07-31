
'use client';
import { useState } from 'react';
import DashboardAuthWrapper from "@/components/auth/DashboardAuthWrapper";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { Send, Loader2, Paperclip, X } from 'lucide-react';
import { cn } from "@/lib/utils";
import Image from 'next/image';
import { aiBuddy } from '@/lib/actions';
import type { AIBuddyInput } from '@/types/ai-schemas';

type Message = {
    role: 'user' | 'model';
    text: string;
    photoDataUri?: string;
};

// Simulated longer conversation history
const initialMessages: Message[] = [
    { 
        role: 'model', 
        text: "Hello! I am P.L.I.H (Petrepann's Little Helper). How can I assist you today? You can ask me questions or upload an image for analysis." 
    },
    {
        role: 'user',
        text: "Can you explain the difference between `useState` and `useEffect` in React?"
    },
    {
        role: 'model',
        text: "Of course! `useState` is used to manage state within a component. It lets you add a variable to your component that will persist between re-renders. `useEffect` is for handling side effects, like fetching data, setting up subscriptions, or manually changing the DOM, after the component has rendered."
    }
];

export default function AIBuddyPage() {
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [currentMessage, setCurrentMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const { toast } = useToast();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const removeFile = () => {
        setFile(null);
        setPreview(null);
    }

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentMessage.trim() && !file) return;

        const userMessage: Message = { role: 'user', text: currentMessage };
        if (preview) {
            userMessage.photoDataUri = preview;
        }

        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setCurrentMessage('');
        removeFile();
        setIsLoading(true);

        const input: AIBuddyInput = {
            prompt: userMessage.text,
            photoDataUri: userMessage.photoDataUri,
        };

        try {
            const responseText = await aiBuddy(input);
            const modelMessage: Message = { role: 'model', text: responseText };
            setMessages([...newMessages, modelMessage]);
        } catch (error) {
            console.error("AI Buddy Error:", error);
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'The AI assistant is currently unavailable. Please try again later.',
            });
            setMessages(messages);
        } finally {
            setIsLoading(false);
        }
    };

    return (
         <DashboardAuthWrapper requiredRole="student">
            <div className="h-full flex flex-col bg-background">
                <ScrollArea className="flex-1 p-6">
                    <div className="space-y-6">
                        {messages.map((msg, index) => (
                            <div key={index} className={cn("flex items-start gap-2", msg.role === 'user' ? 'justify-end' : '')}>
                                {msg.role === 'model' && (
                                    <Avatar className="h-8 w-8">
                                        <AvatarFallback>PLIH</AvatarFallback>
                                    </Avatar>
                                )}
                                <div className={cn("rounded-lg p-3 max-w-xs lg:max-w-md", msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted')}>
                                    {msg.photoDataUri && <Image src={msg.photoDataUri} alt="Uploaded content" width={200} height={200} className="rounded-md mb-2" />}
                                    <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex items-start gap-2">
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback>PLIH</AvatarFallback>
                                </Avatar>
                                <div className="rounded-lg p-3 max-w-xs lg:max-w-md bg-muted flex items-center">
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                </div>
                            </div>
                        )}
                    </div>
                </ScrollArea>
                <div className="p-4 border-t bg-background">
                    <form onSubmit={handleSendMessage} className="relative">
                        {preview && (
                            <div className="relative w-24 h-24 mb-2 p-2 border rounded-md">
                                <Image src={preview} alt="File preview" layout="fill" objectFit="cover" className="rounded-md" />
                                <Button size="icon" variant="destructive" className="absolute -top-2 -right-2 h-6 w-6 rounded-full" onClick={removeFile}>
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        )}
                        <Input
                            placeholder="Message P.L.I.H..."
                            className="pr-20"
                            value={currentMessage}
                            onChange={(e) => setCurrentMessage(e.target.value)}
                            disabled={isLoading}
                        />
                        <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center">
                            <Button type="button" size="icon" variant="ghost" asChild>
                                <label htmlFor="file-upload" className="cursor-pointer">
                                    <Paperclip className="h-5 w-5" />
                                </label>
                            </Button>
                            <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                            <Button type="submit" size="icon" variant="ghost" disabled={isLoading}>
                                <Send className="h-5 w-5" />
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </DashboardAuthWrapper>
    );
}
