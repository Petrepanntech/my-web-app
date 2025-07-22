
"use client"

import DashboardAuthWrapper from "@/components/auth/DashboardAuthWrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, FileText } from "lucide-react";

const mous = [
    {
        mouId: "MOU-LP-001",
        taskTitle: "Build a Landing Page",
        freelancer: "Adeola Peters",
        status: "Pending Signature",
        date: "2024-08-05"
    },
    {
        mouId: "MOU-UI-002",
        taskTitle: "Mobile App UI Design",
        freelancer: "Aisha Nwosu",
        status: "Active",
        date: "2024-07-28"
    },
     {
        mouId: "MOU-SEO-003",
        taskTitle: "SEO Blog Posts",
        freelancer: "Tunde Oladipo",
        status: "Completed",
        date: "2024-06-15"
    }
];

const statusVariant: { [key: string]: "default" | "secondary" | "outline" | "destructive" } = {
    "Pending Signature": "destructive",
    "Active": "default",
    "Completed": "secondary"
}


export default function Page() {
    return (
        <DashboardAuthWrapper requiredRole="business">
            <div className="container p-4 sm:p-6 lg:p-8">
                <div className="mb-12">
                    <h1 className="text-4xl font-extrabold tracking-tight">MOU Management</h1>
                    <p className="mt-2 text-xl text-muted-foreground">
                       Track and manage all your project agreements.
                    </p>
                </div>
                
                <Card>
                    <CardHeader>
                        <CardTitle>Project MOUs</CardTitle>
                        <CardDescription>You have {mous.filter(m => m.status === 'Pending Signature').length} MOUs awaiting signature.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Task</TableHead>
                                    <TableHead>Freelancer</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {mous.map((mou) => (
                                    <TableRow key={mou.mouId}>
                                        <TableCell className="font-medium">{mou.taskTitle}</TableCell>
                                        <TableCell>{mou.freelancer}</TableCell>
                                        <TableCell>
                                            <Badge variant={statusVariant[mou.status]}>{mou.status}</Badge>
                                        </TableCell>
                                        <TableCell>{mou.date}</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="outline" size="sm">
                                                <Download className="mr-2 h-4 w-4" />
                                                Download
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

