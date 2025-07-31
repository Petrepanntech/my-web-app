
"use client"
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import DashboardAuthWrapper from "@/components/auth/DashboardAuthWrapper";
import { BackButton } from '@/components/shared/BackButton';
import type { CreateCourseOutput, CourseLesson, PopQuizQuestion } from '@/types/ai-schemas';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { FileQuestion, PencilRuler, CheckCircle, XCircle, BookOpen, Link as LinkIcon, Lightbulb, HelpCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import Link from 'next/link';


const QuizComponent = ({ quiz }: { quiz: PopQuizQuestion[] }) => {
    const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
    const [submitted, setSubmitted] = useState(false);

    const handleAnswerSelect = (questionIndex: number, answer: string) => {
        setSelectedAnswers(prev => ({ ...prev, [questionIndex]: answer }));
    };

    const handleSubmit = () => {
        setSubmitted(true);
    };

    return (
        <Card className="mt-8">
            <CardHeader>
                <CardTitle>Pop Quiz!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {quiz.map((q, index) => {
                    const userAnswer = selectedAnswers[index];
                    const isCorrect = userAnswer === q.answer;

                    return (
                        <div key={index}>
                            <p className="font-semibold mb-2">{index + 1}. {q.question}</p>
                            <RadioGroup
                                value={userAnswer}
                                onValueChange={(value) => handleAnswerSelect(index, value)}
                                disabled={submitted}
                                className="space-y-2"
                            >
                                {q.options.map(option => (
                                    <Label key={option} className={cn(
                                        "flex items-center gap-3 p-3 border rounded-md cursor-pointer has-[:checked]:border-primary",
                                        submitted && option === q.answer && "border-green-500 bg-green-500/10",
                                        submitted && userAnswer === option && !isCorrect && "border-red-500 bg-red-500/10"
                                    )}>
                                        <RadioGroupItem value={option} />
                                        <span>{option}</span>
                                        {submitted && option === q.answer && <CheckCircle className="ml-auto h-5 w-5 text-green-500" />}
                                        {submitted && userAnswer === option && !isCorrect && <XCircle className="ml-auto h-5 w-5 text-red-500" />}
                                    </Label>
                                ))}
                            </RadioGroup>
                        </div>
                    );
                })}
                {!submitted && <Button onClick={handleSubmit}>Submit Quiz</Button>}
                 {submitted && (
                    <div className="text-center font-bold">
                        You scored {quiz.filter((q, i) => selectedAnswers[i] === q.answer).length} out of {quiz.length}!
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

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

    const handleMarkAsComplete = () => {
        if (!lesson) return;
        
        // Dispatch a custom event to notify the parent page
        const event = new CustomEvent('lessonCompleted', {
            detail: {
                courseId: id,
                lessonTitle: lesson.title
            }
        });
        window.dispatchEvent(event);

        router.back();
    };

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
    
    const primaryVideoUrl = lesson?.learningResources?.videos?.[0]?.url;
    const embedUrl = primaryVideoUrl ? getYouTubeEmbedUrl(primaryVideoUrl) : null;


    const renderAssessment = (Icon: React.ElementType, type: string) => (
        <div className="p-8 max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
                <Icon className="h-16 w-16 text-primary" />
            </div>
            <h2 className="text-3xl font-bold mb-4">{lesson?.title}</h2>
            <p className="text-lg text-muted-foreground mb-6 capitalize">{type}</p>
            <div 
                className="prose max-w-none dark:prose-invert text-left" 
                dangerouslySetInnerHTML={{ __html: lesson?.primaryActivity?.description?.replace(/\n/g, '<br />') || '' }}
            ></div>
            <Button onClick={handleMarkAsComplete} className="mt-8">Mark as Complete and Continue</Button>
        </div>
    );

    if (!lesson) {
        return (
            <DashboardAuthWrapper requiredRole="student">
                <div className="flex flex-col h-screen">
                    <header className="p-4 border-b flex items-center justify-between bg-background z-10">
                        <Skeleton className="h-8 w-1/4" />
                        <div className="flex gap-2">
                             <Skeleton className="h-10 w-40" />
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
                         <Button variant="outline" onClick={handleMarkAsComplete}>Mark as Complete</Button>
                    </div>
                </header>
                <main className="flex-1 overflow-y-auto">
                    {lesson.primaryActivity.type === 'Video' && embedUrl && (
                         <div className="w-full max-w-4xl mx-auto py-8 px-4">
                            <div className="aspect-video">
                                <iframe 
                                    key={lesson.title}
                                    className="w-full h-full rounded-lg"
                                    src={embedUrl}
                                    title="YouTube video player" 
                                    frameBorder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowFullScreen
                                ></iframe>
                            </div>
                            
                            <div className="p-4 md:p-8 space-y-8">
                                <Card>
                                    <CardHeader><CardTitle>Key Concepts</CardTitle></CardHeader>
                                    <CardContent>
                                        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                                            {lesson.keyConcepts?.map((concept, i) => <li key={i}>{concept}</li>)}
                                        </ul>
                                    </CardContent>
                                </Card>

                                <div className="grid md:grid-cols-2 gap-8">
                                    <Card>
                                        <CardHeader><CardTitle className="flex items-center gap-2"><BookOpen /> Learning Resources</CardTitle></CardHeader>
                                        <CardContent className="space-y-3">
                                            {lesson.learningResources?.articles?.map(article => (
                                                <Button asChild variant="outline" className="w-full justify-start" key={article.url}>
                                                    <Link href={article.url} target="_blank">
                                                        <LinkIcon className="mr-2 h-4 w-4" /> {article.title}
                                                    </Link>
                                                </Button>
                                            ))}
                                             {lesson.learningResources?.videos?.map(video => (
                                                <Button asChild variant="outline" className="w-full justify-start" key={video.url}>
                                                    <Link href={video.url} target="_blank">
                                                        <LinkIcon className="mr-2 h-4 w-4" /> {video.title}
                                                    </Link>
                                                </Button>
                                            ))}
                                        </CardContent>
                                    </Card>
                                     <Card>
                                        <CardHeader><CardTitle className="flex items-center gap-2"><Lightbulb /> AI Tutor Guidance</CardTitle></CardHeader>
                                        <CardContent>
                                            <p className="font-semibold text-sm mb-2">Common Sticking Points</p>
                                             <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground mb-4">
                                                {lesson.tutorGuidance?.commonStickingPoints?.map((point, i) => <li key={i}>{point}</li>)}
                                            </ul>
                                             <p className="font-semibold text-sm mb-2">Clarification Prompts</p>
                                              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                                                {lesson.tutorGuidance?.clarificationPrompts?.map((prompt, i) => <li key={i}>{prompt}</li>)}
                                            </ul>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                           
                            {lesson.popQuiz && lesson.popQuiz.length > 0 && <QuizComponent quiz={lesson.popQuiz} />}
                            
                            <div className="text-center mt-12">
                                <Button size="lg" onClick={handleMarkAsComplete}>Mark as Complete and Continue</Button>
                            </div>
                         </div>
                    )}
                    {lesson.primaryActivity.type === 'Video' && !embedUrl && (
                        <div className="p-8 text-center flex flex-col justify-center items-center h-full">
                            <h2 className="text-2xl font-bold mb-4">Video Unavailable</h2>
                            <p className="text-muted-foreground">This video could not be embedded. The URL may be invalid or private.</p>
                            <p className="text-muted-foreground text-sm mt-2">URL: {primaryVideoUrl}</p>
                       </div>
                    )}
                     {(lesson.primaryActivity.type === 'Reading' || lesson.primaryActivity.type === 'Code-Along' || lesson.primaryActivity.type === 'Interactive Exercise' || lesson.primaryActivity.type === 'Mini-Project') && (
                         <div className="p-8 max-w-4xl mx-auto">
                            <h2 className="text-3xl font-bold mb-6">{lesson.title}</h2>
                            <div className="prose max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: lesson.primaryActivity.description?.replace(/\n/g, '<br />') || '' }}></div>
                        </div>
                    )}
                    {lesson.primaryActivity.type === 'Quiz' && renderAssessment(FileQuestion, 'quiz')}
                    {lesson.primaryActivity.type === 'Assignment' && renderAssessment(PencilRuler, 'assignment')}
                </main>
            </div>
        </DashboardAuthWrapper>
    )
}
