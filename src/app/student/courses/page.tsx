
import DashboardAuthWrapper from "@/components/auth/DashboardAuthWrapper";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { allCourses } from "@/lib/courses-data";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";


export default function Page() {
    const enrolledCourses = allCourses.slice(0, 3); // Mock data for enrolled courses

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
                        <Card key={course.id}>
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
                            <CardContent>
                                <Progress value={75} />
                                <p className="text-sm text-muted-foreground mt-2">75% complete</p>
                            </CardContent>
                            <CardFooter>
                                <Button asChild className="w-full">
                                    <Link href={`/courses/view/${course.id}`}> 
                                        <PlayCircle className="mr-2 h-4 w-4" />
                                        Continue Learning
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
