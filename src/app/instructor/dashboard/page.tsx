
"use client"
import DashboardAuthWrapper from "@/components/auth/DashboardAuthWrapper";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Users, BookOpen, MessageSquare, Star, ArrowRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FloatingChatButton } from "@/components/shared/FloatingChatButton";


const myCourses = [
    { title: "Senior Full-Stack Engineer Course", students: 185 },
    { title: "Node.js for Beginners", students: 450 },
    { title: "Advanced DevOps", students: 0, isDraft: true },
];

const recentActivity = [
    { user: { name: "Adeola Peters", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop" }, action: "asked a question in 'React Advanced'", time: "2h ago" },
    { user: { name: "Chinedu Okoro", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=50&h=50&fit=crop" }, action: "completed 'Node.js for Beginners'", time: "5h ago" },
    { user: { name: "Fatima Bello", avatar: "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=50&h=50&fit=crop" }, action: "left a 5-star review on 'Senior Full-Stack'", time: "1d ago" },
];

export default function Page() {
    const { user } = useAuth();
    return (
        <DashboardAuthWrapper requiredRole="instructor">
            <div className="container p-4 sm:p-6 lg:p-8">
                <div className="mb-12">
                    <h1 className="text-4xl font-extrabold tracking-tight">Welcome, {user?.name?.split(' ')[0]}!</h1>
                    <p className="mt-2 text-xl text-muted-foreground">
                       Here's a snapshot of your instructor activity.
                    </p>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">₦850,000</div>
                            <p className="text-xs text-muted-foreground">+₦75,000 this month</p>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">635</div>
                            <p className="text-xs text-muted-foreground">+32 new this month</p>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Published Courses</CardTitle>
                            <BookOpen className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">2</div>
                            <p className="text-xs text-muted-foreground">1 draft in progress</p>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                            <Star className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">4.85</div>
                            <p className="text-xs text-muted-foreground">Based on 300+ ratings</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Student Activity</CardTitle>
                                <CardDescription>Latest interactions from your students.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-4">
                                    {recentActivity.map(activity => (
                                        <li key={activity.action} className="flex items-center gap-4">
                                            <Avatar>
                                                <AvatarImage src={activity.user.avatar} />
                                                <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1">
                                                <p className="text-sm"><span className="font-semibold">{activity.user.name}</span> {activity.action}</p>
                                                <p className="text-xs text-muted-foreground">{activity.time}</p>
                                            </div>
                                            <Button variant="outline" size="sm">View</Button>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                     <Card>
                        <CardHeader>
                            <CardTitle>My Courses</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {myCourses.map(course => (
                                <div key={course.title} className="flex justify-between items-center">
                                    <div>
                                        <p className="font-semibold">{course.title}</p>
                                        <p className="text-sm text-muted-foreground">{course.isDraft ? 'Draft' : `${course.students} students`}</p>
                                    </div>
                                    <Button asChild variant="secondary" size="icon">
                                        <Link href="/instructor/courses"><ArrowRight/></Link>
                                    </Button>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
            <FloatingChatButton href="/instructor/chat" />
        </DashboardAuthWrapper>
    );
}
