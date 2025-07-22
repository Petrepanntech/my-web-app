
"use client"
import DashboardAuthWrapper from "@/components/auth/DashboardAuthWrapper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, LineChart, PieChart } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { Bar, CartesianGrid, Line, Pie, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const userGrowthData = [
    { month: "Jan", users: 120 },
    { month: "Feb", users: 200 },
    { month: "Mar", users: 250 },
    { month: "Apr", users: 320 },
    { month: "May", users: 450 },
    { month: "Jun", users: 510 },
];

const revenueData = [
    { name: "Subscriptions", value: 4500000, fill: "hsl(var(--chart-1))" },
    { name: "Marketplace Fees", value: 1200000, fill: "hsl(var(--chart-2))" },
    { name: "Consultancy", value: 850000, fill: "hsl(var(--chart-3))" },
];

const courseEnrollmentData = [
    { name: "Web Dev", enrollments: 1200 },
    { name: "UI/UX", enrollments: 950 },
    { name: "Business", enrollments: 700 },
    { name: "Marketing", enrollments: 820 },
];

export default function Page() {
    return (
        <DashboardAuthWrapper requiredRole="admin">
            <div className="container p-4 sm:p-6 lg:p-8">
                 <div className="mb-12">
                    <h1 className="text-4xl font-extrabold tracking-tight">Platform Analytics</h1>
                    <p className="mt-2 text-xl text-muted-foreground">
                       Deep dive into the platform's performance and user behavior.
                    </p>
                </div>
                
                <div className="grid gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>User Growth</CardTitle>
                            <CardDescription>Total users over the last 6 months.</CardDescription>
                        </CardHeader>
                        <CardContent className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={userGrowthData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip content={<ChartTooltipContent />} />
                                    <Legend />
                                    <Line type="monotone" dataKey="users" stroke="hsl(var(--primary))" activeDot={{ r: 8 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <div className="grid md:grid-cols-2 gap-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Revenue Streams</CardTitle>
                                <CardDescription>Breakdown of revenue sources (all time).</CardDescription>
                            </CardHeader>
                            <CardContent className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                     <PieChart>
                                        <Pie data={revenueData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                                             {revenueData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.fill} />
                                            ))}
                                        </Pie>
                                        <Tooltip content={<ChartTooltipContent />} />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Course Popularity</CardTitle>
                                <CardDescription>Enrollments per course category.</CardDescription>
                            </CardHeader>
                            <CardContent className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={courseEnrollmentData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip content={<ChartTooltipContent />} />
                                        <Bar dataKey="enrollments" fill="hsl(var(--primary))" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </DashboardAuthWrapper>
    );
}

