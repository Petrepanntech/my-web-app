
"use client"
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { allCourses } from '@/lib/courses-data';
import Image from 'next/image';
import DashboardAuthWrapper from "@/components/auth/DashboardAuthWrapper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { CheckCircle, Circle, PlayCircle, Type } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { BackButton } from '@/components/shared/BackButton';

const courseCurriculum = {
    modules: [
        {
            title: "Module 1: Introduction to React",
            lectures: [
                { title: "What is React?", type: "lecture", completed: true },
                { title: "Setting up your environment", type: "lecture", completed: true },
                { title: "Curated Video: React in 100 Seconds", type: "video", completed: false },
                { title: "JSX Explained", type: "lecture", completed: false },
            ]
        },
        {
            title: "Module 2: Components and Props",
            lectures: [
                { title: "Functional Components", type: "lecture", completed: false },
                { title: "Passing Props", type: "lecture", completed: false },
                { title: "Understanding Children Props", type: "lecture", completed: false },
            ]
        },
         {
            title: "Module 3: State and Hooks",
            lectures: [
                { title: "The useState Hook", type: "lecture", completed: false },
                { title: "Curated Video: The useEffect Hook explained", type: "video", completed: false },
                { title: "Managing Complex State with useReducer", type: "lecture", completed: false },
            ]
        }
    ]
};

export default function CourseViewPage() {
    const params = useParams();
    const id = Array.isArray(params.id) ? params.id[0] : params.id;
    const course = allCourses.find(c => c.id === parseInt(id, 10));

    if (!course) {
        return <div className="container py-12 text-center">Course not found.</div>;
    }
    
    return (
        <DashboardAuthWrapper requiredRole="student">
            <div className="container mx-auto max-w-4xl py-12">
                <BackButton className="mb-4" />
                <div className="mb-8">
                    <h1 className="text-4xl font-bold">{course.title}</h1>
                    <p className="text-lg text-muted-foreground mt-2">Taught by {course.instructor}</p>
                </div>
                
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Your Progress</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Progress value={25} className="h-4" />
                        <p className="text-center mt-2 text-muted-foreground">25% Complete (2 of 8 lectures)</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Course Curriculum</CardTitle>
                        <CardDescription>Start learning by selecting a lecture or a curated video.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
                            {courseCurriculum.modules.map((module, index) => (
                                <AccordionItem key={module.title} value={`item-${index}`}>
                                    <AccordionTrigger>
                                        <div className='flex items-center gap-4'>
                                            <span>{module.title}</span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <ul className="space-y-3 pl-8">
                                            {module.lectures.map(lecture => {
                                                const LessonIcon = lecture.type === 'lecture' ? Type : PlayCircle;
                                                return (
                                                <li key={lecture.title} className="flex items-center gap-3 text-muted-foreground hover:text-foreground">
                                                    {lecture.completed ? <CheckCircle className="h-5 w-5 text-green-500" /> : <Circle className="h-5 w-5 text-muted-foreground" />}
                                                    <LessonIcon className="h-5 w-5" />
                                                    <span className="flex-1">{lecture.title}</span>
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
