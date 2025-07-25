
"use client"
import { useParams, useRouter } from 'next/navigation';
import DashboardAuthWrapper from "@/components/auth/DashboardAuthWrapper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CheckCircle, Circle, PlayCircle, Type, FileQuestion, PencilRuler } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { BackButton } from '@/components/shared/BackButton';
import type { CreateCourseOutput, CourseLesson } from '@/types/ai-schemas';
import { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';


const LessonItem = ({ lesson, isCompleted, onLessonClick }: { lesson: CourseLesson, isCompleted: boolean, onLessonClick: () => void }) => {
    const getLessonIcon = () => {
        switch(lesson.type) {
            case 'lecture': return Type;
            case 'quiz': return FileQuestion;
            case 'assignment': return PencilRuler;
            case 'video':
            default:
                return PlayCircle;
        }
    }
    const LessonIcon = getLessonIcon();
    const CompletionIcon = isCompleted ? CheckCircle : Circle;
    
    return (
        <div onClick={onLessonClick} className="flex items-center gap-3 text-muted-foreground hover:text-foreground cursor-pointer p-2 rounded-md hover:bg-muted">
            <CompletionIcon className={cn("h-5 w-5", isCompleted ? "text-green-500" : "text-muted-foreground")} />
            <LessonIcon className="h-5 w-5" />
            <span className="flex-1">{lesson.title}</span>
        </div>
    );
};


export default function CourseViewPage() {
    const params = useParams();
    const router = useRouter();
    const id = Array.isArray(params.id) ? params.id[0] : params.id;
    const [course, setCourse] = useState<CreateCourseOutput | null>(null);
    const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Load course data
        const storedCourse = localStorage.getItem('newlyCreatedCourse');
        if (storedCourse) {
            const parsedCourse: CreateCourseOutput = JSON.parse(storedCourse);
            if (parsedCourse.id === id) {
                setCourse(parsedCourse);
            }
        }
        
        // Load progress
        const storedProgress = localStorage.getItem(`courseProgress_${id}`);
        if (storedProgress) {
            setCompletedLessons(new Set(JSON.parse(storedProgress)));
        }

        // Restore scroll position
        const savedScrollPosition = sessionStorage.getItem(`scrollPos_${id}`);
        if (savedScrollPosition && scrollRef.current) {
            scrollRef.current.scrollTop = parseInt(savedScrollPosition, 10);
            sessionStorage.removeItem(`scrollPos_${id}`); // Clean up
        }

    }, [id]);

    const updateProgress = useCallback((lessonTitle: string) => {
        setCompletedLessons(prev => {
            const newProgress = new Set(prev);
            newProgress.add(lessonTitle);
            localStorage.setItem(`courseProgress_${id}`, JSON.stringify(Array.from(newProgress)));
            return newProgress;
        });
    }, [id]);
    
    useEffect(() => {
        const handleLessonCompleted = (event: Event) => {
            const customEvent = event as CustomEvent;
            if (customEvent.detail.courseId === id) {
                updateProgress(customEvent.detail.lessonTitle);
            }
        };

        window.addEventListener('lessonCompleted', handleLessonCompleted);
        return () => {
            window.removeEventListener('lessonCompleted', handleLessonCompleted);
        };
    }, [id, updateProgress]);
    
    const handleLessonClick = (moduleIndex: number, lessonIndex: number) => {
        // Save current scroll position before navigating
        if (scrollRef.current) {
            sessionStorage.setItem(`scrollPos_${id}`, scrollRef.current.scrollTop.toString());
        }
        router.push(`/courses/view/${id}/lesson?module=${moduleIndex}&lesson=${lessonIndex}`);
    }

    const totalLessons = useMemo(() => {
        return course?.curriculum.reduce((acc, module) => acc + module.lessons.length, 0) || 0;
    }, [course]);
    
    const progressPercentage = totalLessons > 0 ? (completedLessons.size / totalLessons) * 100 : 0;

    if (!course) {
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
             <div ref={scrollRef} className="container mx-auto max-w-4xl py-12 overflow-y-auto h-[calc(100vh-4rem)]">
                 <BackButton className="mb-4" />
                <div className="mb-8">
                    <h1 className="text-4xl font-bold">{course.title}</h1>
                    <p className="text-lg text-muted-foreground mt-2">Taught by {course.instructor}</p>
                    <Image
                        src={course.image}
                        alt={course.title}
                        width={800}
                        height={450}
                        className="w-full h-auto object-cover rounded-lg mt-4"
                        data-ai-hint={course.aiHint}
                    />
                </div>
                 <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Course Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                        {course.overview.split('\n\n').map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Course Curriculum</CardTitle>
                        <CardDescription>Start learning by selecting a lesson.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <div className="mb-4">
                             <Progress value={progressPercentage} className="h-2" />
                             <p className="text-center mt-2 text-xs text-muted-foreground">{Math.round(progressPercentage)}% Complete ({completedLessons.size}/{totalLessons})</p>
                        </div>
                        <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
                            {course.curriculum.map((module, moduleIndex) => (
                                <AccordionItem key={module.title} value={`item-${moduleIndex}`}>
                                    <AccordionTrigger>
                                        <div className='flex items-center gap-4 text-left'>
                                            <span>{module.title}</span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <ul className="space-y-1 pl-4">
                                            {module.lessons.map((lesson, lessonIndex) => (
                                                <li key={lesson.title}>
                                                    <LessonItem 
                                                        lesson={lesson} 
                                                        isCompleted={completedLessons.has(lesson.title)}
                                                        onLessonClick={() => handleLessonClick(moduleIndex, lessonIndex)}
                                                    />
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

    