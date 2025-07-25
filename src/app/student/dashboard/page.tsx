
"use client"

import DashboardAuthWrapper from "@/components/auth/DashboardAuthWrapper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ActionCard } from "@/components/shared/ActionCard";
import { useAuth } from "@/context/AuthContext";
import { LayoutDashboard, Book, Briefcase, TestTube2, Star, MessageCircle, ArrowRight } from "lucide-react";
import { FloatingChatButton } from "@/components/shared/FloatingChatButton";


export default function StudentDashboardPage() {
    const { user } = useAuth();
    
    const actionCards = [
        { title: "My Courses", description: "View your enrolled courses", href: "/student/courses", Icon: Book },
        { title: "Learning Path", description: "Generate your learning path", href: "/student/learning-path", Icon: LayoutDashboard },
        { title: "CBT Practice", description: "Prepare for your exams", href: "/student/cbt-practice", Icon: TestTube2 },
        { title: "Marketplace", description: "Find freelance projects", href: "/marketplace/tasks", Icon: Briefcase },
        { title: "Achievements", description: "Track your progress", href: "/student/achievements", Icon: Star },
        { title: "P.L.I.H", description: "Chat with your AI assistant", href: "#", Icon: MessageCircle, isChatTrigger: true },
    ]

    return (
        <DashboardAuthWrapper requiredRole="student">
            <div className="container p-4 sm:p-6 lg:p-8">
                <div className="space-y-8">
                     <div className="mb-12">
                        <h1 className="text-4xl font-extrabold tracking-tight">Welcome, {user?.name?.split(' ')[0]}!</h1>
                        <p className="mt-2 text-xl text-muted-foreground">
                           Ready to continue your learning journey? Let's make today productive.
                        </p>
                    </div>
                    
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {actionCards.map(card => (
                            <ActionCard key={card.title} {...card} />
                        ))}
                    </div>

                    <div className="grid gap-8 lg:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Continue Learning</CardTitle>
                                <CardDescription>Pick up where you left off.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    Your last active course was{" "}
                                    <span className="font-semibold text-foreground">Advanced React & Next.js</span>.
                                </p>
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader>
                                <CardTitle>Upcoming Assignment</CardTitle>
                                 <CardDescription>Due in 3 days.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    <span className="font-semibold text-foreground">Final Project: E-commerce App</span> from your Next.js course.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
            <FloatingChatButton />
        </DashboardAuthWrapper>
    );
}
