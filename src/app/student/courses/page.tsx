import DashboardAuthWrapper from "@/components/auth/DashboardAuthWrapper";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";

const enrolledCourses = [
    { 
        id: 1, 
        title: 'Your AI-Generated Frontend Course', 
        instructor: 'AI Curator',
        progress: 75,
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=400&h=225&fit=crop',
        aiHint: 'react logo',
    },
    { 
        id: 2, 
        title: 'Your AI-Generated Design Course', 
        instructor: 'AI Curator',
        progress: 40,
        image: 'https://images.unsplash.com/photo-1611262588024-d12430b98965?q=80&w=400&h=225&fit=crop',
        aiHint: 'figma logo'
    },
];

export default function Page() {
    return (
        <DashboardAuthWrapper requiredRole="student">
            <div className="container p-4 sm:p-6 lg:p-8">
                 <div className="mb-12">
                    <h1 className="text-4xl font-extrabold tracking-tight">My Courses</h1>
                    <p className="mt-2 text-xl text-muted-foreground">
                       Continue your learning journey and master new skills.
                    </p>
                </div>
                
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {enrolledCourses.map(course => (
                        <Card key={course.id} className="flex flex-col">
                            <Image 
                                src={course.image}
                                alt={course.title}
                                width={400}
                                height={225}
                                className="w-full h-48 object-cover rounded-t-lg"
                                data-ai-hint={course.aiHint}
                            />
                            <CardHeader>
                                <CardTitle>{course.title}</CardTitle>
                                <CardDescription>{course.instructor}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow space-y-4">
                                <Progress value={course.progress} />
                                <p className="text-sm text-muted-foreground">{course.progress}% complete</p>
                            </CardContent>
                            <CardFooter>
                                <Button asChild className="w-full">
                                    <Link href={`/courses/view/${course.id}`}> 
                                        <PlayCircle className="mr-2 h-4 w-4" />
                                        {course.progress > 0 ? 'Continue Learning' : 'Start Course'}
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
