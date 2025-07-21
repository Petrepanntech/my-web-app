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
        dueDate: "2024-08-15",
        status: "Pending"
    },
    {
        course: "UI/UX Design Fundamentals",
        title: "Case Study: Redesign a Popular Mobile App",
        dueDate: "2024-08-10",
        status: "Submitted"
    },
    {
        course: "Advanced React & Next.js",
        title: "State Management with Zustand",
        dueDate: "2024-08-01",
        status: "Graded"
    },
    {
        course: "Digital Marketing 101",
        title: "Create a Social Media Campaign Strategy",
        dueDate: "2024-07-25",
        status: "Graded"
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
