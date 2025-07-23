
"use client"
import React, { useEffect, useState } from 'react';
import DashboardAuthWrapper from "@/components/auth/DashboardAuthWrapper";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlayCircle, PlusCircle } from "lucide-react";
import type { CreateCourseOutput } from '@/ai/flows/create-course-flow';

type StoredCourse = CreateCourseOutput & { progress?: number };

export default function Page() {
    const [enrolledCourses, setEnrolledCourses] = useState<StoredCourse[]>([]);

    useEffect(() => {
        const storedCourses = localStorage.getItem('userCourses');
        if (storedCourses) {
            setEnrolledCourses(JSON.parse(storedCourses));
        }
    }, []);

    return (
        <DashboardAuthWrapper requiredRole="student">
            <div className="container p-4 sm:p-6 lg:p-8">
                 <div className="mb-12">
                    <h1 className="text-4xl font-extrabold tracking-tight">My Courses</h1>
                    <p className="mt-2 text-xl text-muted-foreground">
                       Continue your learning journey and master new skills.
                    </p>
                </div>
                
                {enrolledCourses.length > 0 ? (
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
                                    <Progress value={course.progress || 0} />
                                    <p className="text-sm text-muted-foreground">{course.progress || 0}% complete</p>
                                </CardContent>
                                <CardFooter>
                                    <Button asChild className="w-full">
                                        <Link href={`/courses/view/${course.id}`}> 
                                            <PlayCircle className="mr-2 h-4 w-4" />
                                            {course.progress && course.progress > 0 ? 'Continue Learning' : 'Start Course'}
                                        </Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <Card className="text-center py-16">
                        <CardContent className="space-y-4">
                            <h2 className="text-2xl font-semibold">Your course library is empty.</h2>
                            <p className="text-muted-foreground">
                                Generate a personalized learning path to create your first AI-curated course.
                            </p>
                            <Button asChild>
                                <Link href="/student/learning-path">
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    Create a New Course
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                )}
            </div>
        </DashboardAuthWrapper>
    );
}
