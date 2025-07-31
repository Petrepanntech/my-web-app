
"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import DashboardAuthWrapper from '@/components/auth/DashboardAuthWrapper';
import type { CreateCourseOutput, CourseModule, PopQuizQuestion } from '@/types/ai-schemas';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, CheckCircle, XCircle } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

type CheckpointStep = 'revision' | 'quiz' | 'review';

const QuizComponent = ({ quiz, onQuizSubmit }: { quiz: PopQuizQuestion[], onQuizSubmit: (answers: Record<number, string>) => void }) => {
    const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
    
    const handleAnswerSelect = (questionIndex: number, answer: string) => {
        setSelectedAnswers(prev => ({ ...prev, [questionIndex]: answer }));
    };

    const handleSubmit = () => {
        onQuizSubmit(selectedAnswers);
    };

    return (
        <div className="space-y-6">
            {quiz.map((q, index) => (
                <div key={index}>
                    <p className="font-semibold mb-2">{index + 1}. {q.question}</p>
                    <RadioGroup
                        value={selectedAnswers[index]}
                        onValueChange={(value) => handleAnswerSelect(index, value)}
                        className="space-y-2"
                    >
                        {q.options.map(option => (
                            <Label key={option} className="flex items-center gap-3 p-3 border rounded-md cursor-pointer has-[:checked]:border-primary">
                                <RadioGroupItem value={option} />
                                <span>{option}</span>
                            </Label>
                        ))}
                    </RadioGroup>
                </div>
            ))}
            <Button onClick={handleSubmit}>Submit Quiz</Button>
        </div>
    )
}

const QuizReviewComponent = ({ quiz, userAnswers }: { quiz: PopQuizQuestion[], userAnswers: Record<number, string> }) => {
     const score = quiz.filter((q, i) => userAnswers[i] === q.answer).length;

    return (
        <div className="space-y-6">
             <div className="text-center">
                <p className="text-lg font-semibold">Quiz Complete!</p>
                <p className="text-2xl font-bold">You scored {score} out of {quiz.length}</p>
            </div>
            {quiz.map((q, index) => {
                const userAnswer = userAnswers[index];
                const isCorrect = userAnswer === q.answer;
                return (
                    <div key={index} className="p-4 border rounded-md">
                        <p className="font-semibold mb-2">{index + 1}. {q.question}</p>
                        <div className="space-y-2">
                             {q.options.map(option => {
                                const isSelectedAnswer = userAnswer === option;
                                const isTheCorrectAnswer = q.answer === option;
                                let indicator = null;

                                if (isTheCorrectAnswer) {
                                    indicator = <CheckCircle className="h-5 w-5 text-green-600" />;
                                } else if (isSelectedAnswer && !isCorrect) {
                                    indicator = <XCircle className="h-5 w-5 text-red-600" />;
                                }
                                return (
                                     <div key={option} className={cn("flex items-center gap-3 p-2 rounded-md",
                                        isTheCorrectAnswer ? 'bg-green-100 dark:bg-green-900/30' : '',
                                        isSelectedAnswer && !isCorrect ? 'bg-red-100 dark:bg-red-900/30' : '')}>
                                        {indicator}
                                        <span>{option}</span>
                                    </div>
                                )
                             })}
                        </div>
                        {q.insight && (
                            <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                                <p className="font-semibold text-sm">Insight</p>
                                <p className="text-sm text-muted-foreground">{q.insight}</p>
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    )
}

export default function CheckpointPage() {
    const params = useParams();
    const searchParams = useSearchParams();
    const router = useRouter();

    const id = Array.isArray(params.id) ? params.id[0] : params.id;
    const moduleIndex = parseInt(searchParams.get('module') || '0', 10);

    const [module, setModule] = useState<CourseModule | null>(null);
    const [step, setStep] = useState<CheckpointStep>('revision');
    const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});

    useEffect(() => {
        const storedCourse = localStorage.getItem('newlyCreatedCourse');
        if (storedCourse) {
            const parsedCourse: CreateCourseOutput = JSON.parse(storedCourse);
            if (parsedCourse.id === id) {
                const currentModule = parsedCourse.curriculum?.[moduleIndex];
                if (currentModule) {
                    setModule(currentModule);
                } else {
                    router.back(); // Redirect if module not found
                }
            }
        }
    }, [id, moduleIndex, router]);
    
    const handleQuizSubmit = (answers: Record<number, string>) => {
        setUserAnswers(answers);
        setStep('review');
    }

    const handleProceed = () => {
        // Update module progress in localStorage
        const storedProgress = localStorage.getItem(`moduleProgress_${id}`);
        const progress = storedProgress ? new Set<number>(JSON.parse(storedProgress)) : new Set<number>();
        progress.add(moduleIndex);
        localStorage.setItem(`moduleProgress_${id}`, JSON.stringify(Array.from(progress)));

        // Dispatch event to notify the course page
        const event = new CustomEvent('moduleCompleted', { detail: { courseId: id, moduleIndex } });
        window.dispatchEvent(event);
        
        router.push(`/courses/view/${id}`);
    }

    if (!module) {
        return (
            <DashboardAuthWrapper requiredRole="student">
                <div className="container max-w-3xl mx-auto py-12">
                    <Skeleton className="h-12 w-1/2 mb-4" />
                    <Skeleton className="h-96 w-full" />
                </div>
            </DashboardAuthWrapper>
        );
    }
    
    return (
        <DashboardAuthWrapper requiredRole="student">
            <div className="container max-w-3xl mx-auto py-12">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Module {moduleIndex + 1} Checkpoint: {module.title}</CardTitle>
                        <CardDescription>
                            {step === 'revision' && "Let's quickly review the key concepts before you move on."}
                            {step === 'quiz' && "Test your understanding of the foundational concepts."}
                            {step === 'review' && "Let's see how you did!"}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {step === 'revision' && (
                            <div>
                                <h3 className="text-xl font-bold mb-4">Quick Revision</h3>
                                <div className="prose prose-sm max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: module.quickRevision.replace(/\n/g, '<br />') }} />
                                <Button onClick={() => setStep('quiz')} className="mt-6">Start Quiz</Button>
                            </div>
                        )}
                        {step === 'quiz' && (
                            <div>
                                <h3 className="text-xl font-bold mb-4">Pop Quiz</h3>
                                <QuizComponent quiz={module.checkpointQuiz} onQuizSubmit={handleQuizSubmit} />
                            </div>
                        )}
                        {step === 'review' && (
                             <div>
                                <h3 className="text-xl font-bold mb-4">Quiz Review</h3>
                                <QuizReviewComponent quiz={module.checkpointQuiz} userAnswers={userAnswers} />
                                <Button onClick={handleProceed} className="mt-6 w-full">
                                    Proceed to Next Module
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </DashboardAuthWrapper>
    );
}
