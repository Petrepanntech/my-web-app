
"use client"
import { useParams, useRouter } from 'next/navigation';
import DashboardAuthWrapper from "@/components/auth/DashboardAuthWrapper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CheckCircle, Circle, PlayCircle, Book, Code, FileQuestion, Briefcase, Award, Check } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { BackButton } from '@/components/shared/BackButton';
import type { CreateCourseOutput, CourseLesson, CourseModule } from '@/types/ai-schemas';
import { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Button } from '@/components/ui/button';


const LessonItem = ({ lesson, isCompleted, onLessonClick }: { lesson: CourseLesson, isCompleted: boolean, onLessonClick: () => void }) => {
    const getLessonIcon = () => {
        switch(lesson.primaryActivity.type) {
            case 'Reading': return Book;
            case 'Interactive Exercise': return Code;
            case 'Code-Along': return Code;
            case 'Quiz': return FileQuestion;
            case 'Mini-Project': return Briefcase;
            case 'Video':
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

const ModuleCompletion = ({ module, courseId, moduleIndex, completedLessons, onModuleCompleteClick }: {
    module: CourseModule;
    courseId: string;
    moduleIndex: number;
    completedLessons: Set<string>;
    onModuleCompleteClick: (moduleIndex: number) => void;
}) => {
    const isModuleComplete = module.lessons.every(lesson => completedLessons.has(lesson.title));
    
    return (
        <div className="mt-4 p-4 bg-muted/50 rounded-md text-center">
            <Button
                disabled={!isModuleComplete}
                onClick={() => onModuleCompleteClick(moduleIndex)}
            >
                <Check className="mr-2 h-4 w-4" />
                Mark Module as Complete & Start Checkpoint
            </Button>
            {!isModuleComplete && (
                <p className="text-xs text-muted-foreground mt-2">
                    Complete all lessons in this module to unlock the checkpoint.
                </p>
            )}
        </div>
    );
};


export default function CourseViewPage() {
    const params = useParams();
    const router = useRouter();
    const id = Array.isArray(params.id) ? params.id[0] : params.id;
    const [course, setCourse] = useState<CreateCourseOutput | null>(null);
    const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
    const [completedModules, setCompletedModules] = useState<Set<number>>(new Set());
    const scrollRef = useRef<HTMLDivElement>(null);

    const loadProgress = useCallback(() => {
        const storedLessonProgress = localStorage.getItem(`courseProgress_${id}`);
        if (storedLessonProgress) {
            setCompletedLessons(new Set(JSON.parse(storedLessonProgress)));
        }
        const storedModuleProgress = localStorage.getItem(`moduleProgress_${id}`);
        if (storedModuleProgress) {
            setCompletedModules(new Set(JSON.parse(storedModuleProgress)));
        }
    }, [id]);

    useEffect(() => {
        // Load course data
        const storedCourse = localStorage.getItem('newlyCreatedCourse');
        if (storedCourse) {
            const parsedCourse: CreateCourseOutput = JSON.parse(storedCourse);
            if (parsedCourse.id === id) {
                setCourse(parsedCourse);
            }
        }
        
        loadProgress();

        // Restore scroll position
        const savedScrollPosition = sessionStorage.getItem(`scrollPos_${id}`);
        if (savedScrollPosition && scrollRef.current) {
            scrollRef.current.scrollTop = parseInt(savedScrollPosition, 10);
            sessionStorage.removeItem(`scrollPos_${id}`); // Clean up
        }

    }, [id, loadProgress]);

    const updateLessonProgress = useCallback((lessonTitle: string) => {
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
                updateLessonProgress(customEvent.detail.lessonTitle);
            }
        };

        const handleModuleCompleted = (event: Event) => {
            const customEvent = event as CustomEvent;
            if (customEvent.detail.courseId === id) {
                loadProgress();
            }
        }

        window.addEventListener('lessonCompleted', handleLessonCompleted);
        window.addEventListener('moduleCompleted', handleModuleCompleted);
        return () => {
            window.removeEventListener('lessonCompleted', handleLessonCompleted);
            window.removeEventListener('moduleCompleted', handleModuleCompleted);
        };
    }, [id, updateLessonProgress, loadProgress]);
    
    const handleLessonClick = (moduleIndex: number, lessonIndex: number) => {
        if (scrollRef.current) {
            sessionStorage.setItem(`scrollPos_${id}`, scrollRef.current.scrollTop.toString());
        }
        router.push(`/courses/view/${id}/lesson?module=${moduleIndex}&lesson=${lessonIndex}`);
    }

    const handleModuleCompleteClick = (moduleIndex: number) => {
        if (scrollRef.current) {
            sessionStorage.setItem(`scrollPos_${id}`, scrollRef.current.scrollTop.toString());
        }
        router.push(`/courses/view/${id}/checkpoint?module=${moduleIndex}`);
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
                        {course.description.split('\n').filter(p => p.trim() !== '').map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </CardContent>
                </Card>
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Learning Objectives</CardTitle>
                    </CardHeader>
                     <CardContent>
                        <ul className="grid md:grid-cols-2 gap-x-8 gap-y-2 list-disc pl-5">
                            {course.learningObjectives.map((objective, index) => (
                                <li key={index} className="text-muted-foreground">{objective}</li>
                            ))}
                        </ul>
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
                            {course.curriculum.map((module, moduleIndex) => {
                                const isModuleUnlocked = moduleIndex === 0 || completedModules.has(moduleIndex - 1);
                                const isThisModuleCompleted = completedModules.has(moduleIndex);
                                return (
                                <AccordionItem key={module.title} value={`item-${moduleIndex}`} disabled={!isModuleUnlocked}>
                                    <AccordionTrigger>
                                        <div className='flex flex-col text-left'>
                                            <span className="font-bold text-lg">{module.title}</span>
                                            <span className="text-sm text-muted-foreground font-normal">{module.objective}</span>
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
                                        {!isThisModuleCompleted && (
                                            <ModuleCompletion 
                                                module={module}
                                                courseId={id}
                                                moduleIndex={moduleIndex}
                                                completedLessons={completedLessons}
                                                onModuleCompleteClick={handleModuleCompleteClick}
                                            />
                                        )}
                                    </AccordionContent>
                                </AccordionItem>
                            )})}
                        </Accordion>
                    </CardContent>
                </Card>

                {course.capstoneProject && (
                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Award /> Capstone Project</CardTitle>
                        </CardHeader>
                        <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                            <h3 className="not-prose font-semibold">Goal</h3>
                            <p>{course.capstoneProject.goal}</p>
                            <h3 className="not-prose font-semibold">Key Requirements</h3>
                            <ul>
                                {course.capstoneProject.requirements.map((req, i) => <li key={i}>{req}</li>)}
                            </ul>
                            <h3 className="not-prose font-semibold">Evaluation Criteria</h3>
                             <ul>
                                {course.capstoneProject.evaluationCriteria.map((crit, i) => <li key={i}>{crit}</li>)}
                            </ul>
                            <div className="text-center mt-6">
                                <Button>Submit Your Project</Button>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </DashboardAuthWrapper>
    )
}
