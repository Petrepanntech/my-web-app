
"use client"
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import DashboardAuthWrapper from "@/components/auth/DashboardAuthWrapper";
import { BackButton } from '@/components/shared/BackButton';
import type { CreateCourseOutput, CourseLesson } from '@/types/ai-schemas';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LessonPage() {
    const params = useParams();
    const searchParams = useSearchParams();
    const router = useRouter();

    const id = Array.isArray(params.id) ? params.id[0] : params.id;
    const moduleIndex = parseInt(searchParams.get('module') || '0', 10);
    const lessonIndex = parseInt(searchParams.get('lesson') || '0', 10);

    const [lesson, setLesson] = useState<CourseLesson | null>(null);

    useEffect(() => {
        const storedCourse = localStorage.getItem('newlyCreatedCourse');
        if (storedCourse) {
            const parsedCourse: CreateCourseOutput = JSON.parse(storedCourse);
            if (parsedCourse.id === id) {
                const currentLesson = parsedCourse.curriculum?.[moduleIndex]?.lessons?.[lessonIndex];
                if (currentLesson) {
                    setLesson(currentLesson);
                } else {
                    router.back(); // Redirect if lesson not found
                }
            }
        }
    }, [id, moduleIndex, lessonIndex, router]);

    const getYouTubeEmbedUrl = (url: string) => {
        if (!url) return null;
        let videoId = null;
        try {
            const urlObj = new URL(url);
            if (urlObj.hostname === 'www.youtube.com' || urlObj.hostname === 'youtube.com') {
                videoId = urlObj.searchParams.get('v');
            } else if (urlObj.hostname === 'youtu.be') {
                videoId = urlObj.pathname.slice(1);
            }
            return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
        } catch (error) {
            const match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
            videoId = match && match[1];
            return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
        }
    };

    if (!lesson) {
        return (
            <DashboardAuthWrapper requiredRole="student">
                <div className="flex flex-col h-screen">
                    <header className="p-4 border-b flex items-center justify-between bg-background z-10">
                        <Skeleton className="h-8 w-1/4" />
                        <div className="flex gap-2">
                             <Skeleton className="h-10 w-24" />
                             <Skeleton className="h-10 w-10" />
                        </div>
                    </header>
                    <main className="flex-1 p-8">
                        <Skeleton className="w-full h-full" />
                    </main>
                </div>
            </DashboardAuthWrapper>
        );
    }
    
    return (
        <DashboardAuthWrapper requiredRole="student">
            <div className="flex flex-col h-screen bg-background">
                <header className="p-4 border-b flex items-center justify-between z-10 shrink-0">
                    <BackButton />
                    <h1 className="text-lg font-semibold truncate px-4">{lesson.title}</h1>
                    <div className="flex items-center gap-2">
                         <Button variant="outline">Mark as Complete</Button>
                         <Button variant="ghost" size="icon">
                            <Minimize2 className="h-5 w-5" />
                         </Button>
                    </div>
                </header>
                <main className="flex-1 overflow-y-auto">
                    {lesson.type === 'video' && lesson.url && getYouTubeEmbedUrl(lesson.url) && (
                         <div className="aspect-video">
                            <iframe 
                                 key={lesson.title}
                                 className="w-full h-full"
                                 src={getYouTubeEmbedUrl(lesson.url)!}
                                 title="YouTube video player" 
                                 frameBorder="0" 
                                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                 allowFullScreen
                             ></iframe>
                         </div>
                    )}
                    {lesson.type === 'video' && lesson.url && !getYouTubeEmbedUrl(lesson.url) && (
                        <div className="p-8 text-center flex flex-col justify-center items-center h-full">
                            <h2 className="text-2xl font-bold mb-4">Video Unavailable</h2>
                            <p className="text-muted-foreground">This video could not be embedded. The URL may be invalid or private.</p>
                            <p className="text-muted-foreground text-sm mt-2">URL: {lesson.url}</p>
                       </div>
                    )}
                     {lesson.type === 'lecture' && (
                         <div className="p-8 max-w-4xl mx-auto">
                            <h2 className="text-3xl font-bold mb-6">{lesson.title}</h2>
                            <div className="prose max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: lesson.description?.replace(/\n/g, '<br />') || '' }}></div>
                        </div>
                    )}
                </main>
            </div>
        </DashboardAuthWrapper>
    )
}
