
"use client"
import { useParams } from 'next/navigation';
import { allCourses } from '@/lib/courses-data';
import Image from 'next/image';
import DashboardAuthWrapper from "@/components/auth/DashboardAuthWrapper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CheckCircle, Circle, PlayCircle, Type } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { BackButton } from '@/components/shared/BackButton';
import type { CreateCourseOutput } from '@/types/ai-schemas';
import { useEffect, useState } from 'react';

export default function CourseViewPage() {
    const params = useParams();
    const id = Array.isArray(params.id) ? params.id[0] : params.id;
    const [course, setCourse] = useState<CreateCourseOutput | null>(null);

    useEffect(() => {
        const storedCourse = localStorage.getItem('newlyCreatedCourse');
        if (storedCourse) {
            const parsedCourse: CreateCourseOutput = JSON.parse(storedCourse);
            // Check if the stored course matches the current URL
            if (parsedCourse.id === id) {
                setCourse(parsedCourse);
            }
        }
    }, [id]);

    if (!course) {
        // You might want to show a loading state or a "course not found" message
        // This will show if the user navigates directly to this URL without creating a course first
        return (
             <DashboardAuthWrapper requiredRole="student">
                <div className="container py-12 text-center">
                    <BackButton />
                    <p className="mt-4">Course not found. Please generate a course from your learning path first.</p>
                </div>
             </DashboardAuthWrapper>
        )
    }
    
    return (
        <DashboardAuthWrapper requiredRole="student">
            <div className="container mx-auto max-w-4xl py-12">
                <BackButton className="mb-4" />
                <div className="mb-8">
                    <h1 className="text-4xl font-bold">{course.title}</h1>
                    <p className="text-lg text-muted-foreground mt-2">Taught by {course.instructor}</p>
                </div>
                
                 <div className="mb-8">
                     <Image
                        src={course.image}
                        alt={course.title}
                        width={800}
                        height={450}
                        className="w-full rounded-lg object-cover"
                        data-ai-hint={course.aiHint}
                    />
                </div>

                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Your Progress</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Progress value={0} className="h-4" />
                        <p className="text-center mt-2 text-muted-foreground">0% Complete</p>
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
                                            <span>{module.title}</span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <ul className="space-y-3 pl-8">
                                            {module.lessons.map(lesson => {
                                                const LessonIcon = lesson.type === 'lecture' ? Type : PlayCircle;
                                                return (
                                                <li key={lesson.title} className="flex items-center gap-3 text-muted-foreground hover:text-foreground cursor-pointer">
                                                    <Circle className="h-5 w-5 text-muted-foreground" />
                                                    <LessonIcon className="h-5 w-5" />
                                                    <span className="flex-1">{lesson.title}</span>
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
