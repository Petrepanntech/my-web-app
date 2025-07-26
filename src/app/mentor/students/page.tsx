
import DashboardAuthWrapper from "@/components/auth/DashboardAuthWrapper";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MessageCircle, Search } from "lucide-react";

const students = [
    { name: "Adeola Peters", email: "adeola@example.com", course: "Senior Full-Stack", progress: 85, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop" },
    { name: "Chinedu Okoro", email: "chinedu@example.com", course: "Node.js for Beginners", progress: 100, avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=50&h=50&fit=crop" },
    { name: "Fatima Bello", email: "fatima@example.com", course: "Senior Full-Stack", progress: 40, avatar: "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=50&h=50&fit=crop" },
    { name: "Tunde Oladipo", email: "tunde@example.com", course: "Node.js for Beginners", progress: 95, avatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=50&h=50&fit=crop" },
    { name: "Student User", email: "student@example.com", course: "Node.js for Beginners", progress: 20, avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop" },
];


export default function Page() {
    return (
        <DashboardAuthWrapper requiredRole="mentor">
            <div className="container p-4 sm:p-6 lg:p-8">
                 <div className="mb-12">
                    <h1 className="text-4xl font-extrabold tracking-tight">My Mentees</h1>
                    <p className="mt-2 text-xl text-muted-foreground">
                       View and manage all students you are mentoring.
                    </p>
                </div>
                
                <Card>
                    <CardHeader>
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                                <CardTitle>All Mentees</CardTitle>
                                <CardDescription>Total of {students.length} mentees found across all your courses.</CardDescription>
                            </div>
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Search students..." className="pl-8 w-full md:w-64" />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Mentee</TableHead>
                                    <TableHead>Course Enrolled</TableHead>
                                    <TableHead>Progress</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {students.map((student) => (
                                    <TableRow key={student.email}>
                                        <TableCell>
                                            <div className="flex items-center gap-4">
                                                <Avatar>
                                                    <AvatarImage src={student.avatar} />
                                                    <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <div className="font-medium">{student.name}</div>
                                                    <div className="text-sm text-muted-foreground">{student.email}</div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>{student.course}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Progress value={student.progress} className="w-32" />
                                                <span className="text-xs text-muted-foreground">{student.progress}%</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                             <Button variant="outline" size="sm">
                                                <MessageCircle className="mr-2 h-4 w-4" />
                                                Message
                                             </Button>
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
