
"use client"
import { useParams } from 'next/navigation';
import DashboardAuthWrapper from "@/components/auth/DashboardAuthWrapper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CheckCircle, Circle, PlayCircle, Video } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { BackButton } from '@/components/shared/BackButton';

const course = { 
    id: 1, 
    title: 'Your AI-Generated Course', 
    instructor: 'AI Curator',
    progress: 10,
};

const courseCurriculum = [
    { title: 'Module 1: Curated Introduction', completed: true, lessons: [{type: 'video', title: 'Curated Video: Topic Fundamentals (YouTube)'}] },
    { title: 'Module 2: Core Concepts', completed: false, lessons: [{type: 'lecture', title: 'Proprietary Lecture: Key Principles'}, {type: 'video', title: 'Curated Video: Advanced Topic (YouTube)'}] },
    { title: 'Module 3: Practical Application', completed: false, lessons: [{type: 'lecture', title: 'Project Walkthrough'}, {type: 'video', title: 'Curated Video: Building a Real-World Example (YouTube)'}] },
    { title: 'Module 4: Final Project', completed: false, lessons: [{type: 'lecture', title: 'Build Your Capstone Project'}] },
];

type Lesson = { type: 'lecture' | 'video', title: string };
type Module = { title: string; completed: boolean; lessons: Lesson[] };
type Curriculum = Module[];

export default function CourseViewPage() {
    const params = useParams();
    const id = Array.isArray(params.id) ? params.id[0] : params.id;
    const curriculum: Curriculum = courseCurriculum;

    const completedModules = curriculum.filter(m => m.completed).length;
    const totalModules = curriculum.length;
    const progress = totalModules > 0 ? (completedModules / totalModules) * 100 : 0;
    
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
                        <p className="text-center mt-2 text-muted-foreground">{Math.round(progress)}% Complete ({completedModules} of {totalModules} modules)</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Course Curriculum</CardTitle>
                        <CardDescription>Start learning by selecting a lecture or a curated video.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Accordion type="single" collapsible className="w-full">
                            {curriculum.map((module, index) => (
                                <AccordionItem key={module.title} value={`item-${index}`}>
                                    <AccordionTrigger>
                                        <div className='flex items-center gap-4'>
                                            {module.completed ? <CheckCircle className="h-5 w-5 text-green-500" /> : <Circle className="h-5 w-5 text-muted-foreground" />}
                                            <span>Module {index + 1}: {module.title}</span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <ul className="space-y-3 pl-8">
                                            {module.lessons.map(lesson => (
                                                <li key={lesson.title} className="flex items-center gap-3 text-muted-foreground hover:text-foreground cursor-pointer">
                                                    {lesson.type === 'lecture' ? <PlayCircle className="h-4 w-4" /> : <Video className="h-4 w-4" />}
                                                    <span>{lesson.title}</span>
                                                </li>
                                            ))}
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
