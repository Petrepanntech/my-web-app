
"use client"

import DashboardAuthWrapper from "@/components/auth/DashboardAuthWrapper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ActionCard } from "@/components/shared/ActionCard";
import { useAuth } from "@/context/AuthContext";
import { LayoutDashboard, Book, Briefcase, TestTube2, Star, ArrowRight, MessageSquare } from "lucide-react";
import { FloatingChatButton } from "@/components/shared/FloatingChatButton";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


export default function StudentDashboardPage() {
    const { user } = useAuth();
    
    const actionCards = [
        { title: "My Courses", description: "View your AI-curated courses", href: "/student/courses", Icon: Book },
        { title: "Learning Path", description: "Generate your learning path", href: "/student/learning-path", Icon: LayoutDashboard },
        { title: "CBT Practice", description: "Prepare for your exams", href: "/student/cbt-practice", Icon: TestTube2 },
        { title: "Marketplace", description: "Find freelance projects", href: "/marketplace/tasks", Icon: Briefcase },
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
                    
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {actionCards.map(card => (
                            <ActionCard key={card.title} {...card} />
                        ))}
                    </div>

                    <div className="grid gap-8 lg:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Community Hub</CardTitle>
                                <CardDescription>Connect with peers and get help.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground mb-4">
                                    Learning is better together. Join the conversation, ask questions, and collaborate with other learners on the same path as you.
                                </p>
                                <Button asChild className="mt-4 w-full">
                                    <Link href="/community">
                                        <MessageSquare className="mr-2 h-4 w-4" />
                                        Go to Community
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                               <div>
                                 <CardTitle>Affiliate Earnings</CardTitle>
                                 <CardDescription>Earn 20% commission on referrals!</CardDescription>
                               </div>
                               <Button variant="ghost" size="sm" asChild>
                                   <Link href="/student/referrals-wallet">View Wallet <ArrowRight className="ml-2 h-4 w-4" /></Link>
                               </Button>
                            </CardHeader>
                            <CardContent className="text-center">
                                <p className="text-sm text-muted-foreground">Current Balance</p>
                                <p className="text-5xl font-bold text-green-600 mt-2">₦12,000</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
            <FloatingChatButton href="/student/chat" />
        </DashboardAuthWrapper>
    );
}
