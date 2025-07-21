"use client"

import DashboardAuthWrapper from "@/components/auth/DashboardAuthWrapper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ActionCard } from "@/components/shared/ActionCard";
import { useAuth } from "@/context/AuthContext";
import { LayoutDashboard, Book, Briefcase, TestTube2 } from "lucide-react";


export default function StudentDashboardPage() {
    const { user } = useAuth();
    
    const actionCards = [
        { title: "My Courses", description: "View your enrolled courses", href: "/student/courses", Icon: Book },
        { title: "Marketplace", description: "Find freelance projects", href: "/marketplace/tasks", Icon: Briefcase },
        { title: "CBT Practice", description: "Prepare for your exams", href: "/student/cbt-practice", Icon: TestTube2 },
        { title: "Learning Path", description: "See your AI-generated path", href: "/student/learning-path", Icon: LayoutDashboard },
    ]

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
                            <CardHeader><CardTitle>Recent Activity</CardTitle></CardHeader>
                            <CardContent><p className="text-muted-foreground">No recent activity.</p></CardContent>
                        </Card>
                         <Card>
                            <CardHeader><CardTitle>Achievements</CardTitle></CardHeader>
                            <CardContent><p className="text-muted-foreground">No achievements yet.</p></CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </DashboardAuthWrapper>
    );
}
