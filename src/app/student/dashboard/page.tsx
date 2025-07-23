
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
        { title: "My Courses", description: "View your enrolled courses", href: "/student/courses", Icon: Book },
        { title: "My Mentor", description: "Chat with your mentor", href: "/student/mentors", Icon: MessageSquare },
        { title: "CBT Practice", description: "Prepare for your exams", href: "/student/cbt-practice", Icon: TestTube2 },
        { title: "Learning Path", description: "See your AI-generated path", href: "/student/learning-path", Icon: LayoutDashboard },
    ]

    const mentor = {
        name: "Samuel Adebayo",
        title: "Senior Full-Stack Engineer",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop"
    }

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
                                <CardTitle>Your Assigned Mentor</CardTitle>
                                <CardDescription>Get personalized help and guidance.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-20 w-20">
                                        <AvatarImage src={mentor.avatar} alt={mentor.name} />
                                        <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="text-lg font-semibold">{mentor.name}</p>
                                        <p className="text-muted-foreground">{mentor.title}</p>
                                    </div>
                                </div>
                                <Button asChild className="mt-4 w-full">
                                    <Link href="/student/chat">
                                        <MessageSquare className="mr-2 h-4 w-4" />
                                        Chat with {mentor.name.split(' ')[0]}
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
