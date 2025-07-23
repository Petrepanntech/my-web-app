
import DashboardAuthWrapper from "@/components/auth/DashboardAuthWrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, MoreVertical, Upload, X } from "lucide-react";

const courses = [
    {
        title: "Advanced JavaScript for Professionals",
        instructor: "Samuel Adebayo",
        category: "Web Development",
        status: "Pending Approval"
    },
    {
        title: "The Ultimate Figma Masterclass",
        instructor: "Aisha Nwosu",
        category: "UI/UX Design",
        status: "Approved"
    },
    {
        title: "Startup 101: From Idea to IPO",
        instructor: "Tunde Oladipo",
        category: "Business",
        status: "Approved"
    },
    {
        title: "Introduction to AI Ethics",
        instructor: "Dr. Evelyn Reed",
        category: "Data Science",
        status: "Rejected"
    },
     {
        title: "Content is King: Modern SEO",
        instructor: "Tunde Oladipo",
        category: "Digital Marketing",
        status: "Pending Approval"
    }
];

const statusVariant: { [key: string]: "default" | "secondary" | "outline" | "destructive" } = {
    "Pending Approval": "default",
    "Approved": "secondary",
    "Rejected": "destructive"
}

export default function Page() {
    return (
        <DashboardAuthWrapper requiredRole="admin">
            <div className="container p-4 sm:p-6 lg:p-8">
                 <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-12">
                     <div>
                        <h1 className="text-4xl font-extrabold tracking-tight">Course Management</h1>
                        <p className="mt-2 text-xl text-muted-foreground">
                           Approve, reject, and manage all courses and video lectures on the platform.
                        </p>
                     </div>
                     <Button>
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Video Lecture
                    </Button>
                </div>
                
                <Card>
                    <CardHeader>
                        <CardTitle>Course Submissions</CardTitle>
                        <CardDescription>There are {courses.filter(c => c.status === "Pending Approval").length} courses awaiting your review.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Instructor</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {courses.map((course) => (
                                    <TableRow key={course.title}>
                                        <TableCell className="font-medium">{course.title}</TableCell>
                                        <TableCell>{course.instructor}</TableCell>
                                        <TableCell>{course.category}</TableCell>
                                        <TableCell>
                                            <Badge variant={statusVariant[course.status]}>{course.status}</Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {course.status === 'Pending Approval' ? (
                                                <div className="flex gap-2 justify-end">
                                                    <Button variant="outline" size="icon" className="text-green-600 hover:text-green-600">
                                                        <Check className="h-4 w-4" />
                                                    </Button>
                                                     <Button variant="outline" size="icon" className="text-red-600 hover:text-red-600">
                                                        <X className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            ) : (
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
