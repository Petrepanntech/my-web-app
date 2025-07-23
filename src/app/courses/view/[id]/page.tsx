
"use client"
import { useParams, useRouter } from 'next/navigation';
import DashboardAuthWrapper from "@/components/auth/DashboardAuthWrapper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CheckCircle, Circle, PlayCircle, Video } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { BackButton } from '@/components/shared/BackButton';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';

type Lesson = { type: 'lecture' | 'video', title: string, url?: string, description: string };
type Module = { title: string; lessons: Lesson[] };
type Course = { title: string, curriculum: Module[] };


export default function CourseViewPage() {
    const [course, setCourse] = useState<Course | null>(null);
    const [completedLessons, setCompletedLessons] = useState<string[]>([]);
    
    useEffect(() => {
        const storedCourse = localStorage.getItem('aiGeneratedCourse');
        if (storedCourse) {
            setCourse(JSON.parse(storedCourse));
        }
        const storedProgress = localStorage.getItem('lessonProgress');
        if (storedProgress) {
            setCompletedLessons(JSON.parse(storedProgress));
        }
    }, []);

    const toggleLessonComplete = (lessonTitle: string) => {
        setCompletedLessons(prev => {
            const newProgress = prev.includes(lessonTitle)
                ? prev.filter(t => t !== lessonTitle)
                : [...prev, lessonTitle];
            localStorage.setItem('lessonProgress', JSON.stringify(newProgress));
            return newProgress;
        });
    }

    if (!course) {
        return (
             <DashboardAuthWrapper requiredRole="student">
                <div className="container mx-auto max-w-4xl py-12">
                    <Skeleton className="h-8 w-1/4 mb-4" />
                    <Skeleton className="h-10 w-3/4 mb-2" />
                    <Skeleton className="h-6 w-1/2 mb-8" />
                    <Card className="mb-8">
                        <CardHeader><Skeleton className="h-8 w-1/3" /></CardHeader>
                        <CardContent><Skeleton className="h-10 w-full" /></CardContent>
                    </Card>
                    <Card>
                        <CardHeader><Skeleton className="h-8 w-1/3" /></CardHeader>
                        <CardContent className="space-y-4">
                            <Skeleton className="h-12 w-full" />
                            <Skeleton className="h-12 w-full" />
                            <Skeleton className="h-12 w-full" />
                        </CardContent>
                    </Card>
                </div>
            </DashboardAuthWrapper>
        )
    }

    const totalLessons = course.curriculum.reduce((acc, module) => acc + module.lessons.length, 0);
    const progress = totalLessons > 0 ? (completedLessons.length / totalLessons) * 100 : 0;
    
    return (
        <DashboardAuthWrapper requiredRole="student">
            <div className="container mx-auto max-w-4xl py-12">
                <BackButton className="mb-4" />
                <div className="mb-8">
                    <h1 className="text-4xl font-bold">{course.title}</h1>
                    <p className="text-lg text-muted-foreground mt-2">AI-Curated by Alternative Academy</p>
                </div>
                
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Your Progress</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Progress value={progress} className="h-4" />
                        <p className="text-center mt-2 text-muted-foreground">{Math.round(progress)}% Complete ({completedLessons.length} of {totalLessons} lessons)</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Course Curriculum</CardTitle>
                        <CardDescription>Start learning by selecting a lecture or a curated video.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
                            {course.curriculum.map((module, index) => (
                                <AccordionItem key={module.title} value={`item-${index}`}>
                                    <AccordionTrigger>
                                        <div className='flex items-center gap-4'>
                                            <span>Module {index + 1}: {module.title}</span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <ul className="space-y-3 pl-8">
                                            {module.lessons.map(lesson => {
                                                const isCompleted = completedLessons.includes(lesson.title);
                                                const LessonIcon = lesson.type === 'lecture' ? PlayCircle : Video;
                                                const content = (
                                                    <div className="flex items-center gap-4 flex-1">
                                                        <LessonIcon className="h-5 w-5 text-muted-foreground" />
                                                        <div>
                                                            <p className='font-medium'>{lesson.title}</p>
                                                            <p className='text-sm text-muted-foreground'>{lesson.description}</p>
                                                        </div>
                                                    </div>
                                                );

                                                return (
                                                <li key={lesson.title} className="flex items-center gap-3 text-muted-foreground hover:text-foreground">
                                                     <button onClick={() => toggleLessonComplete(lesson.title)} className="p-1">
                                                        {isCompleted ? <CheckCircle className="h-5 w-5 text-green-500" /> : <Circle className="h-5 w-5 text-muted-foreground" />}
                                                    </button>
                                                    
                                                    {lesson.url ? (
                                                        <Link href={lesson.url} target="_blank" rel="noopener noreferrer" className='flex-1'>
                                                           {content}
                                                        </Link>
                                                    ) : (
                                                        <div className="flex-1 cursor-pointer" onClick={() => { /* Could open a modal here for lecture content */ }}>
                                                            {content}
                                                        </div>
                                                    )}
                                                </li>
                                            )})}
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </CardContent>
                </Card>
            </div>
        </DashboardAuthWrapper>
    )
}
