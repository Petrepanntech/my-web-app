
"use client"

import { useState, useEffect } from "react";
import DashboardAuthWrapper from "@/components/auth/DashboardAuthWrapper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ActionCard } from "@/components/shared/ActionCard";
import { useAuth } from "@/context/AuthContext";
import { LayoutDashboard, Book, Briefcase, TestTube2, Star, MessageCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { CreateCourseOutput } from "@/types/ai-schemas";


export default function StudentDashboardPage() {
    const { user } = useAuth();
    const [hasCourse, setHasCourse] = useState(false);
    const [lastCourse, setLastCourse] = useState<CreateCourseOutput | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // This check needs to run client-side.
        const storedCourse = localStorage.getItem('newlyCreatedCourse');
        if (storedCourse) {
            setHasCourse(true);
            setLastCourse(JSON.parse(storedCourse));
        }
        setIsLoading(false);
    }, []);
    
    const primaryActionCards = hasCourse ? [
        { title: "My Courses", description: "View your enrolled courses", href: "/student/courses", Icon: Book },
        { title: "Learning Path", description: "Generate a new path", href: "/student/learning-path", Icon: LayoutDashboard },
    ] : [];

    const secondaryActionCards = [
        { title: "CBT Practice", description: "Prepare for your exams", href: "/student/cbt-practice", Icon: TestTube2 },
        { title: "Marketplace", description: "Find freelance projects", href: "/marketplace/tasks", Icon: Briefcase },
        { title: "Achievements", description: "Track your progress", href: "/student/achievements", Icon: Star },
        { title: "AI Buddy", description: "Chat with your AI assistant", href: "/student/ai-buddy", Icon: MessageCircle },
    ]

    if (isLoading) {
        return (
             <DashboardAuthWrapper requiredRole="student">
                <div className="container p-4 sm:p-6 lg:p-8 animate-pulse">
                    <div className="h-10 bg-muted rounded w-1/3 mb-4"></div>
                    <div className="h-6 bg-muted rounded w-2/3 mb-12"></div>
                    <div className="h-48 bg-muted rounded-lg w-full"></div>
                </div>
            </DashboardAuthWrapper>
        )
    }

    return (
        <DashboardAuthWrapper requiredRole="student">
            <div className="container p-4 sm:p-6 lg:p-8">
                <div className="space-y-8">
                     <div className="mb-12">
                        <h1 className="text-4xl font-extrabold tracking-tight">Welcome, {user?.name?.split(' ')[0]}!</h1>
                        <p className="mt-2 text-xl text-muted-foreground">
                           {hasCourse ? "Ready to continue your learning journey? Let's make today productive." : "Let's get started by creating your personalized learning path."}
                        </p>
                    </div>
                    
                    {!hasCourse ? (
                        <Card className="bg-primary/10 border-primary">
                            <CardHeader>
                                <CardTitle className="text-2xl">Create Your AI-Powered Learning Path</CardTitle>
                                <CardDescription>Tell our AI your interests and goals, and it will build a custom course for you from the best free resources on the web.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button asChild>
                                    <Link href="/student/learning-path">
                                        <LayoutDashboard className="mr-2 h-4 w-4" />
                                        Generate Your Learning Path
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ) : (
                        <Card>
                            <CardHeader>
                                <CardTitle>Continue Learning</CardTitle>
                                <CardDescription>Pick up where you left off.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground mb-4">
                                    Your last active course was{" "}
                                    <span className="font-semibold text-foreground">{lastCourse?.title}</span>.
                                </p>
                                <Button asChild>
                                     <Link href={`/courses/view/${lastCourse?.id}`}>
                                        Resume Course <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    )}

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {primaryActionCards.map(card => (
                            <ActionCard key={card.title} {...card} />
                        ))}
                    </div>
                    
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight mb-4">Explore More</h2>
                         <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {secondaryActionCards.map(card => (
                                <ActionCard key={card.title} {...card} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </DashboardAuthWrapper>
    );
}
