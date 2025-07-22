
"use client"
import DashboardAuthWrapper from "@/components/auth/DashboardAuthWrapper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ChartTooltipContent } from "@/components/ui/chart";

const completionData = [
    { name: 'Web Dev 101', completion: 85, students: 120 },
    { name: 'React Advanced', completion: 72, students: 85 },
    { name: 'Figma Basics', completion: 95, students: 250 },
    { name: 'SEO Strategy', completion: 88, students: 150 },
];

const ratingData = [
    { rating: 1, count: 5 },
    { rating: 2, count: 12 },
    { rating: 3, count: 35 },
    { rating: 4, count: 110 },
    { rating: 5, count: 215 },
];

export default function Page() {
    return (
        <DashboardAuthWrapper requiredRole="instructor">
            <div className="container p-4 sm:p-6 lg:p-8">
                 <div className="mb-12">
                    <h1 className="text-4xl font-extrabold tracking-tight">Course Analytics</h1>
                    <p className="mt-2 text-xl text-muted-foreground">
                       Track student engagement and course performance.
                    </p>
                </div>
                
                <div className="grid gap-8 lg:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Course Completion Rates</CardTitle>
                            <CardDescription>Percentage of enrolled students who completed the course.</CardDescription>
                        </CardHeader>
                        <CardContent className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                               <BarChart data={completionData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis yAxisId="left" orientation="left" stroke="hsl(var(--primary))" />
                                    <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--muted-foreground))" />
                                    <Tooltip content={<ChartTooltipContent />} />
                                    <Legend />
                                    <Bar yAxisId="left" dataKey="completion" fill="hsl(var(--primary))" name="Completion %" />
                                    <Bar yAxisId="right" dataKey="students" fill="hsl(var(--muted))" name="Students" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Overall Rating Distribution</CardTitle>
                            <CardDescription>Aggregated ratings from all your students.</CardDescription>
                        </CardHeader>
                         <CardContent className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                               <BarChart data={ratingData} layout="vertical">
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis type="number" />
                                    <YAxis type="category" dataKey="rating" width={60} />
                                    <Tooltip content={<ChartTooltipContent />} />
                                    <Bar dataKey="count" fill="hsl(var(--primary))" name="Number of Ratings" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardAuthWrapper>
    );
}

