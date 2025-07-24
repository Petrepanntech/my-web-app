
"use client"
import React, { useState } from 'react';
import DashboardAuthWrapper from "@/components/auth/DashboardAuthWrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from '@/hooks/use-toast';
import { ArrowRight, Loader2 } from 'lucide-react';

const sampleLearningPath = {
    path: [
        { title: "Introduction to Web Development", description: "Understand the fundamentals of how the web works, including HTML, CSS, and JavaScript." },
        { title: "React Fundamentals", description: "Learn the core concepts of React, including components, props, state, and hooks." },
        { title: "Advanced React Concepts", description: "Dive deeper into state management, context API, and performance optimization." },
        { title: "Building with Next.js", description: "Explore server-side rendering, routing, and API routes with the Next.js framework." },
        { title: "Final Project: Full-Stack Application", description: "Apply your knowledge to build a complete project from scratch." }
    ]
}

export default function LearningPathPage() {
    const [interests, setInterests] = useState('');
    const [goals, setGoals] = useState('');
    const [learningPath, setLearningPath] = useState<typeof sampleLearningPath | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!interests || !goals) {
            toast({
                variant: 'destructive',
                title: 'Missing Information',
                description: 'Please fill out both your interests and goals.',
            });
            return;
        }
        setIsLoading(true);
        // Simulate AI generation
        setTimeout(() => {
            setLearningPath(sampleLearningPath);
            setIsLoading(false);
        }, 1500);
    };

    return (
        <DashboardAuthWrapper requiredRole="student">
            <div className="container p-4 sm:p-6 lg:p-8">
                <div className="text-center mb-12">
                     <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Your Personalized Learning Path</h1>
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
                        Let our AI craft the perfect learning journey based on your unique aspirations.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Tell Us About Yourself</CardTitle>
                            <CardDescription>The more details you provide, the better we can tailor your path.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="interests">Your Interests</Label>
                                    <Input id="interests" value={interests} onChange={e => setInterests(e.target.value)} placeholder="e.g., Web development, mobile apps, AI" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="goals">Your Goals</Label>
                                    <Textarea id="goals" value={goals} onChange={e => setGoals(e.target.value)} placeholder="e.g., Get a job as a frontend developer, start my own tech company" />
                                </div>
                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Generate My Path
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Your Custom Path</CardTitle>
                        </CardHeader>
                        <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                            {isLoading && (
                                <div className="flex justify-center items-center h-full">
                                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                                </div>
                            )}
                            {learningPath?.path ? (
                                <ul>
                                    {learningPath.path.map((module, index) => (
                                        <li key={index}>
                                            <strong>{module.title}</strong>: {module.description}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                !isLoading && <p>Your generated learning path will appear here.</p>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardAuthWrapper>
    );
}
