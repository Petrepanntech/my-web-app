
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
import { createCourse, personalizedLearningPath } from '@/lib/actions';
import type { PersonalizedLearningPathOutput } from '@/types/ai-schemas';
import { useRouter } from 'next/navigation';

export default function LearningPathPage() {
    const [interests, setInterests] = useState('');
    const [goals, setGoals] = useState('');
    const [learningPath, setLearningPath] = useState<PersonalizedLearningPathOutput | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isCreatingCourse, setIsCreatingCourse] = useState(false);
    const { toast } = useToast();
    const router = useRouter();

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
        setLearningPath(null);

        try {
            const result = await personalizedLearningPath({ interests, goals });
            setLearningPath(result);
            toast({
                title: 'Success!',
                description: 'Your personalized learning path has been generated.',
            });
        } catch (error) {
            console.error("Failed to generate learning path:", error);
            toast({
                variant: 'destructive',
                title: 'Error Generating Path',
                description: 'Could not create your learning path. Please try again.',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateCourse = async () => {
        if (!learningPath) return;

        setIsCreatingCourse(true);
        try {
            const course = await createCourse(learningPath);
            toast({
                title: 'Course Created!',
                description: 'Your new course is ready. Redirecting you now...'
            });
            // In a real app, you would save the course to a database.
            // For now, we'll pass it to the view page via localStorage.
            localStorage.setItem('newlyCreatedCourse', JSON.stringify(course));
            router.push(`/courses/view/${course.id}`);

        } catch(error) {
             console.error("Failed to create course:", error);
            toast({
                variant: 'destructive',
                title: 'Error Creating Course',
                description: 'Could not create your course. Please try again.',
            });
        } finally {
            setIsCreatingCourse(false);
        }
    }

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
                                <div className="space-y-4">
                                    <ul className="space-y-4">
                                        {learningPath.path.map((module, index) => (
                                            <li key={index} className="p-4 bg-muted/50 rounded-lg not-prose">
                                                <p className="font-bold">{module.title}</p>
                                                <p>{module.description}</p>
                                            </li>
                                        ))}
                                    </ul>
                                    <Button onClick={handleCreateCourse} className="w-full mt-6" disabled={isCreatingCourse}>
                                         {isCreatingCourse && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        Start Your AI-Curated Course
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </div>
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
