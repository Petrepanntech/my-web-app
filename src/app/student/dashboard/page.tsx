
"use client"

import DashboardAuthWrapper from "@/components/auth/DashboardAuthWrapper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ActionCard } from "@/components/shared/ActionCard";
import { useAuth } from "@/context/AuthContext";
import { LayoutDashboard, Book, Briefcase, TestTube2, Star, ArrowRight } from "lucide-react";
import { FloatingChatButton } from "@/components/shared/FloatingChatButton";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";


export default function StudentDashboardPage() {
    const { user } = useAuth();
    
    const actionCards = [
        { title: "My Courses", description: "View your enrolled courses", href: "/student/courses", Icon: Book },
        { title: "Marketplace", description: "Find freelance projects", href: "/marketplace/tasks", Icon: Briefcase },
        { title: "CBT Practice", description: "Prepare for your exams", href: "/student/cbt-practice", Icon: TestTube2 },
        { title: "Learning Path", description: "See your AI-generated path", href: "/student/learning-path", Icon: LayoutDashboard },
    ]

    const achievements = [
        { title: "Course Completist", image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=80&h=80&fit=crop", aiHint: "gold medal" },
        { title: "First Gig", image: "https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=80&h=80&fit=crop", aiHint: "first place" },
        { title: "Top Rated", image: "https://images.unsplash.com/photo-1611162617213-6d22e4f133d4?q=80&w=80&h=80&fit=crop", aiHint: "gold star" },
    ];

    return (
        <DashboardAuthWrapper requiredRole="student">
            <div className="container p-4 sm:p-6 lg:p-8">
                <div className="space-y-8">
                    <Card className="bg-primary text-primary-foreground border-none">
                        <CardHeader>
                            <CardTitle className="text-3xl">Welcome back, {user?.name?.split(' ')[0]}!</CardTitle>
                            <CardDescription className="text-primary-foreground/80">
                                Ready to continue your learning journey? Let's make today productive.
                            </CardDescription>
                        </CardHeader>
                    </Card>
                    
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {actionCards.map(card => (
                            <ActionCard key={card.title} {...card} />
                        ))}
                    </div>

                    <div className="grid gap-8 lg:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Activity</CardTitle>
                                <CardDescription>Your latest interactions and progress.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-4">
                                    <li className="flex items-center gap-4">
                                        <div className="bg-muted p-2 rounded-full"><Book className="h-5 w-5 text-primary"/></div>
                                        <div>
                                            <p className="text-sm font-medium">You completed 'Module 2: React Hooks'</p>
                                            <p className="text-xs text-muted-foreground">in React: From Beginner to Advanced</p>
                                        </div>
                                    </li>
                                     <li className="flex items-center gap-4">
                                        <div className="bg-muted p-2 rounded-full"><TestTube2 className="h-5 w-5 text-primary"/></div>
                                        <div>
                                            <p className="text-sm font-medium">You scored 85% on a JAMB practice test.</p>
                                            <p className="text-xs text-muted-foreground">Great job! Keep practicing.</p>
                                        </div>
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                               <div>
                                 <CardTitle>Recent Achievements</CardTitle>
                                 <CardDescription>Keep up the great work!</CardDescription>
                               </div>
                               <Button variant="ghost" size="sm" asChild>
                                   <Link href="/student/achievements">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
                               </Button>
                            </CardHeader>
                            <CardContent className="flex justify-around items-center">
                                {achievements.map(ach => (
                                     <div key={ach.title} className="flex flex-col items-center text-center">
                                        <Image
                                            src={ach.image}
                                            alt={`${ach.title} badge`}
                                            width={80}
                                            height={80}
                                            className="rounded-full mb-2 border-4 border-primary object-cover"
                                            data-ai-hint={ach.aiHint}
                                        />
                                        <p className="text-xs font-semibold">{ach.title}</p>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
            <FloatingChatButton href="/student/chat" />
        </DashboardAuthWrapper>
    );
}
