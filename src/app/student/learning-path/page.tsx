
"use client"
import React, { useState } from 'react';
import DashboardAuthWrapper from "@/components/auth/DashboardAuthWrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createCourse, personalizedLearningPath } from "@/lib/actions";
import { useToast } from '@/hooks/use-toast';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { PersonalizedLearningPathOutput } from '@/ai/flows/personalized-learning-path';
import type { CreateCourseOutput } from '@/ai/flows/create-course-flow';


export default function LearningPathPage() {
    const [interests, setInterests] = useState('');
    const [goals, setGoals] = useState('');
    const [learningPath, setLearningPath] = useState<PersonalizedLearningPathOutput | null>(null);
    const [isGeneratingPath, setIsGeneratingPath] = useState(false);
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
        setIsGeneratingPath(true);
        setLearningPath(null);
        try {
            const result = await personalizedLearningPath({ interests, goals });
            setLearningPath(result);
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Could not generate learning path. Please try again.',
            });
        } finally {
            setIsGeneratingPath(false);
        }
    };

    const handleCreateCourse = async () => {
        if (!learningPath) return;
        setIsCreatingCourse(true);
        try {
            const newCourse = await createCourse(learningPath);
            
            // Get existing courses from localStorage
            const existingCoursesStr = localStorage.getItem('userCourses');
            const existingCourses: CreateCourseOutput[] = existingCoursesStr ? JSON.parse(existingCoursesStr) : [];
            
            // Add new course to the beginning of the list
            const updatedCourses = [newCourse, ...existingCourses];

            // Store the updated list in localStorage
            localStorage.setItem('userCourses', JSON.stringify(updatedCourses));
            // Store the full details of the just-created course for the view page
            localStorage.setItem(`course_${newCourse.id}`, JSON.stringify(newCourse));
            
            toast({
                title: 'Course Created!',
                description: 'Your new course has been added to "My Courses".',
            });
            router.push('/student/courses');

        } catch (error) {
             toast({
                variant: 'destructive',
                title: 'Error',
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
                                <Button type="submit" className="w-full" disabled={isGeneratingPath}>
                                    {isGeneratingPath && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Generate My Path
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                    <Card className="flex flex-col">
                        <CardHeader>
                            <CardTitle>Your Custom Path</CardTitle>
                        </CardHeader>
                        <CardContent className="prose prose-sm max-w-none dark:prose-invert flex-grow">
                            {isGeneratingPath && (
                                <div className="flex justify-center items-center h-full">
                                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                                </div>
                            )}
                            {learningPath?.path ? (
                                <ul className='space-y-4'>
                                    {learningPath.path.map((module, index) => (
                                        <li key={index}>
                                            <h3 className="font-bold text-lg mb-1">{index + 1}. {module.title}</h3>
                                            <p className="text-muted-foreground">{module.description}</p>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                !isGeneratingPath && <p className="text-muted-foreground">Your generated learning path will appear here.</p>
                            )}
                        </CardContent>
                         {learningPath && !isGeneratingPath && (
                            <div className="p-6 pt-0">
                                <Button onClick={handleCreateCourse} className="w-full" disabled={isCreatingCourse}>
                                    {isCreatingCourse ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Building Your Course...
                                        </>
                                    ) : (
                                        <>
                                           Start Your AI-Curated Course
                                           <ArrowRight className="ml-2 h-4 w-4" />
                                        </>
                                    )}
                                </Button>
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </DashboardAuthWrapper>
    );
}
