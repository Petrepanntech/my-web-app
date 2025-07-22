import DashboardAuthWrapper from "@/components/auth/DashboardAuthWrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileUp, MoreVertical } from "lucide-react";

const assignments = [
    {
        course: "Advanced React & Next.js",
        title: "Final Project: Build a Full-Stack E-commerce App",
        dueDate: "2024-08-30",
        status: "Pending"
    },
    {
        course: "UI/UX Design Fundamentals",
        title: "Case Study: Redesign a Popular Mobile App",
        dueDate: "2024-08-25",
        status: "Pending"
    },
    {
        course: "Advanced React & Next.js",
        title: "State Management with Zustand",
        dueDate: "2024-08-20",
        status: "Submitted"
    },
     {
        course: "Node.js & Express Masterclass",
        title: "Build a RESTful API",
        dueDate: "2024-08-18",
        status: "Submitted"
    },
    {
        course: "Digital Marketing 101",
        title: "Create a Social Media Campaign Strategy",
        dueDate: "2024-08-15",
        status: "Graded"
    },
    {
        course: "UI/UX Design Fundamentals",
        title: "Wireframing and Prototyping",
        dueDate: "2024-08-10",
        status: "Graded"
    },
    {
        course: "HTML, CSS, & JavaScript for Beginners",
        title: "Build a Personal Portfolio Website",
        dueDate: "2024-08-05",
        status: "Graded"
    },
     {
        course: "Advanced React & Next.js",
        title: "Authentication with NextAuth.js",
        dueDate: "2024-08-01",
        status: "Graded"
    },
    {
        course: "Python for Data Science Bootcamp",
        title: "Data Cleaning with Pandas",
        dueDate: "2024-09-05",
        status: "Pending"
    },
    {
        course: "Figma for UI/UX: From Zero to Hero",
        title: "Mobile App Prototype",
        dueDate: "2024-09-02",
        status: "Pending"
    },
    {
        course: "The Complete SEO Guide",
        title: "Keyword Research Project",
        dueDate: "2024-08-28",
        status: "Submitted"
    },
    {
        course: "Machine Learning A-Z",
        title: "Linear Regression Model",
        dueDate: "2024-09-10",
        status: "Pending"
    },
    {
        course: "Startup 101: From Idea to IPO",
        title: "Business Model Canvas",
        dueDate: "2024-08-22",
        status: "Graded"
    },
    {
        course: "Content Marketing: A Practical Guide",
        title: "Blog Post and Distribution Plan",
        dueDate: "2024-08-12",
        status: "Graded"
    },
    {
        course: "Web Accessibility: Building Inclusive Apps",
        title: "WCAG Audit of a Website",
        dueDate: "2024-09-15",
        status: "Pending"
    },
    {
        course: "Full-Stack Next.js Development",
        title: "Database Integration with Prisma",
        dueDate: "2024-09-08",
        status: "Pending"
    },
    {
        course: "User Research and Persona Creation",
        title: "Conduct 5 User Interviews",
        dueDate: "2024-08-29",
        status: "Submitted"
    },
    {
        course: "SQL for Data Analysis",
        title: "Advanced SQL Queries Challenge",
        dueDate: "2024-09-12",
        status: "Pending"
    },
    {
        course: "Mastering Git and GitHub",
        title: "Collaborative Project Simulation",
        dueDate: "2024-08-08",
        status: "Graded"
    },
    {
        course: "Building and Maintaining Design Systems",
        title: "Component Library Creation",
        dueDate: "2024-09-20",
        status: "Pending"
    }
];

const statusVariant: { [key: string]: "default" | "secondary" | "outline" | "destructive" } = {
    "Pending": "destructive",
    "Submitted": "default",
    "Graded": "secondary"
}

export default function Page() {
    return (
        <DashboardAuthWrapper requiredRole="student">
            <div className="container mx-auto max-w-5xl py-12 px-4 sm:px-6 lg:px-8">
                 <div className="mb-12">
                    <h1 className="text-4xl font-extrabold tracking-tight">Assignments</h1>
                    <p className="mt-2 text-xl text-muted-foreground">
                       Track and submit your coursework here.
                    </p>
                </div>
                
                <Card>
                    <CardHeader>
                        <CardTitle>Your Assignments</CardTitle>
                        <CardDescription>You have {assignments.filter(a => a.status === 'Pending').length} pending assignments.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Course</TableHead>
                                    <TableHead>Assignment</TableHead>
                                    <TableHead>Due Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {assignments.map((assignment) => (
                                    <TableRow key={assignment.title}>
                                        <TableCell className="font-medium">{assignment.course}</TableCell>
                                        <TableCell>{assignment.title}</TableCell>
                                        <TableCell>{assignment.dueDate}</TableCell>
                                        <TableCell>
                                            <Badge variant={statusVariant[assignment.status]}>{assignment.status}</Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {assignment.status === 'Pending' && (
                                                <Button variant="outline" size="sm">
                                                    <FileUp className="mr-2 h-4 w-4" />
                                                    Submit
                                                </Button>
                                            )}
                                             {assignment.status !== 'Pending' && (
                                                <Button variant="ghost" size="icon">
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </DashboardAuthWrapper>
    );
}
