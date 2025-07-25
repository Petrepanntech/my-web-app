
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import DashboardAuthWrapper from '@/components/auth/DashboardAuthWrapper';
import type { AITutorResponse, AITutorInput } from '@/types/ai-schemas';
import { aiTutor } from '@/lib/actions';
import { cn } from '@/lib/utils';


type Personality = 'Analytical' | 'Creative' | 'Encouraging';
type Gender = 'Male' | 'Female';

const tutorConfig = {
    Analytical: { Male: 'Orion', Female: 'Cassia' },
    Creative: { Male: 'Kael', Female: 'Lyra' },
    Encouraging: { Male: 'Javen', Female: 'Nia' },
};

export default function AITutorPage() {
    const [personality, setPersonality] = useState<Personality>('Encouraging');
    const [gender, setGender] = useState<Gender>('Female');
    const [tutorName, setTutorName] = useState('Nia');
    const [isConfigured, setIsConfigured] = useState(false);
    const [messages, setMessages] = useState<AITutorInput['history']>([]);
    const [currentMessage, setCurrentMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        setTutorName(tutorConfig[personality][gender]);
    }, [personality, gender]);

    const handleStartChatting = () => {
        const initialGreeting: AITutorInput['history'][0] = {
            role: 'model',
            content: `Hello! I'm ${tutorName}, your ${personality.toLowerCase()} AI tutor. How can I help you on your learning journey today?`
        };
        setMessages([initialGreeting]);
        setIsConfigured(true);
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentMessage.trim()) return;

        const userMessage: AITutorInput['history'][0] = { role: 'user', content: currentMessage };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setCurrentMessage('');
        setIsLoading(true);

        const input: AITutorInput = {
            personality,
            tutorName,
            history: newMessages,
        }

        try {
            const response = await aiTutor(input);
            setMessages(response.history);
        } catch (error) {
            console.error("AI Tutor Error:", error);
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'The AI tutor is currently unavailable. Please try again later.',
            });
            setMessages(messages); // Revert to previous state
        } finally {
            setIsLoading(false);
        }
    };

    if (!isConfigured) {
        return (
            <DashboardAuthWrapper requiredRole="student">
                <div className="container mx-auto max-w-2xl py-12">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-3xl">Configure Your AI Tutor</CardTitle>
                            <CardDescription>Choose the personality and gender of your AI learning partner.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-8">
                            <div className="space-y-4">
                                <Label className="text-lg font-semibold">Personality</Label>
                                <Select value={personality} onValueChange={(v) => setPersonality(v as Personality)}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Encouraging">Encouraging</SelectItem>
                                        <SelectItem value="Analytical">Analytical</SelectItem>
                                        <SelectItem value="Creative">Creative</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-4">
                                <Label className="text-lg font-semibold">Gender</Label>
                                <Select value={gender} onValueChange={(v) => setGender(v as Gender)}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Female">Female</SelectItem>
                                        <SelectItem value="Male">Male</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button size="lg" className="w-full" onClick={handleStartChatting}>
                                Start Chatting with {tutorName}
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </DashboardAuthWrapper>
        );
    }

    return (
        <DashboardAuthWrapper requiredRole="student">
            <div className="h-[calc(100vh-4rem)] flex flex-col">
                <div className="p-4 border-b flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <Avatar>
                            <AvatarFallback>{tutorName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold">{tutorName}</p>
                            <p className="text-sm text-muted-foreground">{personality} AI Tutor</p>
                        </div>
                    </div>
                    <Button variant="outline" onClick={() => setIsConfigured(false)}>Change Tutor</Button>
                </div>
                <ScrollArea className="flex-1 p-6">
                    <div className="space-y-6">
                         {messages.map((msg, index) => (
                             <div key={index} className={cn("flex items-end gap-2", msg.role === 'user' ? 'justify-end' : '')}>
                                {msg.role === 'model' && (
                                    <Avatar className="h-8 w-8">
                                        <AvatarFallback>{tutorName.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                )}
                                 <div className={cn("rounded-lg p-3 max-w-xs lg:max-w-md", msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted')}>
                                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                                </div>
                             </div>
                        ))}
                        {isLoading && (
                            <div className="flex items-end gap-2">
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback>{tutorName.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="rounded-lg p-3 max-w-xs lg:max-w-md bg-muted flex items-center">
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                </div>
                            </div>
                        )}
                    </div>
                </ScrollArea>
                <div className="p-4 border-t">
                    <form onSubmit={handleSendMessage} className="relative">
                        <Input
                            placeholder={`Message ${tutorName}...`}
                            className="pr-12"
                            value={currentMessage}
                            onChange={(e) => setCurrentMessage(e.target.value)}
                            disabled={isLoading}
                        />
                        <Button type="submit" size="icon" variant="ghost" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8" disabled={isLoading}>
                            <Send className="h-5 w-5" />
                        </Button>
                    </form>
                </div>
            </div>
        </DashboardAuthWrapper>
    );
}
