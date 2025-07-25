
"use client"
import { useParams } from 'next/navigation';
import Image from 'next/image';
import DashboardAuthWrapper from "@/components/auth/DashboardAuthWrapper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CheckCircle, Circle, PlayCircle, Type } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { BackButton } from '@/components/shared/BackButton';
import type { CreateCourseOutput, CourseLesson } from '@/types/ai-schemas';
import { useEffect, useState, useMemo } from 'react';
import { cn } from '@/lib/utils';


const LessonItem = ({ lesson, isCompleted, onLessonClick }: { lesson: CourseLesson, isCompleted: boolean, onLessonClick: () => void }) => {
    const LessonIcon = lesson.type === 'lecture' ? Type : PlayCircle;
    const CompletionIcon = isCompleted ? CheckCircle : Circle;
    
    return (
        <div onClick={onLessonClick} className="flex items-center gap-3 text-muted-foreground hover:text-foreground cursor-pointer">
            <CompletionIcon className={cn("h-5 w-5", isCompleted ? "text-green-500" : "text-muted-foreground")} />
            <LessonIcon className="h-5 w-5" />
            <span className="flex-1">{lesson.title}</span>
        </div>
    );
};


export default function CourseViewPage() {
    const params = useParams();
    const id = Array.isArray(params.id) ? params.id[0] : params.id;
    const [course, setCourse] = useState<CreateCourseOutput | null>(null);
    const [selectedContent, setSelectedContent] = useState<CourseLesson | null>(null);
    const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());

    useEffect(() => {
        const storedCourse = localStorage.getItem('newlyCreatedCourse');
        if (storedCourse) {
            const parsedCourse: CreateCourseOutput = JSON.parse(storedCourse);
            if (parsedCourse.id === id) {
                setCourse(parsedCourse);
            }
        }
    }, [id]);

    const handleLessonClick = (lesson: CourseLesson) => {
        setSelectedContent(lesson);
        setCompletedLessons(prev => new Set(prev).add(lesson.title));
    }

    const totalLessons = useMemo(() => {
        return course?.curriculum.reduce((acc, module) => acc + module.lessons.length, 0) || 0;
    }, [course]);
    
    const progressPercentage = totalLessons > 0 ? (completedLessons.size / totalLessons) * 100 : 0;

    const getYouTubeEmbedUrl = (url: string) => {
        if (!url) return null;
        try {
            const urlObj = new URL(url);
            let videoId = urlObj.searchParams.get('v');
            if (urlObj.hostname === 'youtu.be') {
                videoId = urlObj.pathname.slice(1);
            }
            return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
        } catch (error) {
            console.error("Invalid YouTube URL:", url);
            return null;
        }
    };


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
            <div className="container mx-auto max-w-7xl py-12 grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <BackButton className="mb-4" />
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold">{course.title}</h1>
                        <p className="text-lg text-muted-foreground mt-2">Taught by {course.instructor}</p>
                    </div>
                    
                    <div className="aspect-video w-full rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                        {!selectedContent && (
                             <Image
                                src={course.image}
                                alt={course.title}
                                width={800}
                                height={450}
                                className="w-full h-full object-cover"
                                data-ai-hint={course.aiHint}
                            />
                        )}
                        {selectedContent?.type === 'video' && selectedContent.url && (
                             <iframe 
                                 key={selectedContent.title}
                                 width="100%" 
                                 height="100%" 
                                 src={getYouTubeEmbedUrl(selectedContent.url) || ''}
                                 title="YouTube video player" 
                                 frameBorder="0" 
                                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                 allowFullScreen
                             ></iframe>
                        )}
                         {selectedContent?.type === 'lecture' && (
                             <div className="p-6 h-full w-full bg-background overflow-y-auto">
                                <h2 className="text-2xl font-bold mb-4">{selectedContent.title}</h2>
                                <div className="prose prose-sm max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: selectedContent.description?.replace(/\n/g, '<br />') || '' }}></div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <Card className="sticky top-20">
                        <CardHeader>
                            <CardTitle>Course Curriculum</CardTitle>
                            <CardDescription>Start learning by selecting a lesson.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <div className="mb-4">
                                 <Progress value={progressPercentage} className="h-2" />
                                 <p className="text-center mt-2 text-xs text-muted-foreground">{Math.round(progressPercentage)}% Complete</p>
                            </div>
                            <Accordion type="single" collapsible className="w-full max-h-[60vh] overflow-y-auto" defaultValue="item-0">
                                {course.curriculum.map((module, index) => (
                                    <AccordionItem key={module.title} value={`item-${index}`}>
                                        <AccordionTrigger>
                                            <div className='flex items-center gap-4 text-left'>
                                                <span>{module.title}</span>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <ul className="space-y-3 pl-4">
                                                {module.lessons.map(lesson => (
                                                    <li key={lesson.title}>
                                                        <LessonItem 
                                                            lesson={lesson} 
                                                            isCompleted={completedLessons.has(lesson.title)}
                                                            onLessonClick={() => handleLessonClick(lesson)}
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
            </div>
        </DashboardAuthWrapper>
    )
}
