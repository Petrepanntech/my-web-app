import DashboardAuthWrapper from "@/components/auth/DashboardAuthWrapper";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";

const enrolledCourses = [
    { 
        id: 2, 
        title: 'React: From Beginner to Advanced', 
        instructor: 'Adeola Peters',
        progress: 75,
        image: 'https://placehold.co/400x225.png',
        aiHint: 'react logo',
    },
    { 
        id: 16, 
        title: 'Figma for UI/UX: From Zero to Hero', 
        instructor: 'Aisha Nwosu',
        progress: 40,
        image: 'https://placehold.co/400x225.png',
        aiHint: 'figma logo'
    },
    { 
        id: 3, 
        title: 'Node.js & Express Masterclass', 
        instructor: 'Samuel Adebayo',
        progress: 95,
        image: 'https://placehold.co/400x225.png',
        aiHint: 'server code'
    },
     { 
        id: 38, 
        title: 'The Complete SEO Guide', 
        instructor: 'Tunde Oladipo',
        progress: 15,
        image: 'https://placehold.co/400x225.png',
        aiHint: 'seo ranking'
    },
    { 
        id: 1, 
        title: 'HTML, CSS, & JavaScript for Beginners', 
        instructor: 'Samuel Adebayo',
        progress: 100,
        image: 'https://placehold.co/400x225.png',
        aiHint: 'code editor'
    },
     { 
        id: 26, 
        title: 'Python for Data Science Bootcamp', 
        instructor: 'Dr. Evelyn Reed',
        progress: 5,
        image: 'https://placehold.co/400x225.png',
        aiHint: 'python chart'
    }
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
