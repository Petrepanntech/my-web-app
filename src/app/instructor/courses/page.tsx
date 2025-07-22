
import DashboardAuthWrapper from "@/components/auth/DashboardAuthWrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Edit, PlusCircle } from "lucide-react";
import Link from "next/link";

const courses = [
    { 
        title: "Senior Full-Stack Engineer Course", 
        status: "Published", 
        students: 185, 
        rating: 4.8, 
        lastUpdated: "2024-07-20"
    },
    { 
        title: "Node.js for Beginners", 
        status: "Published", 
        students: 450, 
        rating: 4.9, 
        lastUpdated: "2024-06-15"
    },
    { 
        title: "Advanced DevOps with Kubernetes", 
        status: "Draft", 
        students: 0, 
        rating: 0, 
        lastUpdated: "2024-08-01"
    },
]

const statusVariant: { [key: string]: "default" | "secondary" | "outline" | "destructive" } = {
    "Published": "secondary",
    "Draft": "outline",
}

export default function Page() {
    return (
        <DashboardAuthWrapper requiredRole="instructor">
            <div className="container p-4 sm:p-6 lg:p-8">
                 <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-12">
                    <div className="text-center md:text-left">
                        <h1 className="text-4xl font-extrabold tracking-tight">My Courses</h1>
                        <p className="mt-2 max-w-2xl text-xl text-muted-foreground">
                           Create, manage, and track the performance of your courses.
                        </p>
                    </div>
                    <div className="text-center md:text-left shrink-0">
                         <Button asChild>
                            <Link href="/instructor/courses/new">
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Create New Course
                            </Link>
                        </Button>
                    </div>
                </div>
                
                <div className="grid gap-8 md:grid-cols-2">
                    {courses.map(course => (
                        <Card key={course.title}>
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <CardTitle className="text-xl">{course.title}</CardTitle>
                                    <Badge variant={statusVariant[course.status]}>{course.status}</Badge>
                                </div>
                                <CardDescription>Last updated: {course.lastUpdated}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex justify-around">
                                <div className="text-center">
                                    <p className="text-2xl font-bold">{course.students}</p>
                                    <p className="text-sm text-muted-foreground">Students</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold">{course.rating}</p>
                                    <p className="text-sm text-muted-foreground">Rating</p>
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-end gap-2">
                                <Button variant="outline">
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                </Button>
                                 <Button asChild variant="secondary">
                                    <Link href={`/instructor/analytics?course=${course.title}`}>
                                        Analytics <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </DashboardAuthWrapper>
    );
}

