
import DashboardAuthWrapper from "@/components/auth/DashboardAuthWrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const flaggedTasks = [
    {
        taskId: "#TASK582",
        title: "Urgent Logo Design - High Pay",
        reason: "Suspected Scam/Spam",
        reportedBy: "Aisha Nwosu (Instructor)",
        date: "2024-08-01"
    },
    {
        taskId: "#TASK571",
        title: "Build me a Google clone",
        reason: "Unrealistic Expectations",
        reportedBy: "Admin System",
        date: "2024-07-30"
    },
    {
        taskId: "#TASK565",
        title: "Data entry job, pay in crypto",
        reason: "Violates Payment Policy",
        reportedBy: "Chinedu Okoro (Student)",
        date: "2024-07-29"
    }
];

const disputes = [
    {
        disputeId: "#DISPUTE034",
        task: "Landing Page Development",
        parties: "Innovate Inc. vs Adeola Peters",
        status: "Awaiting Admin Review"
    },
    {
        disputeId: "#DISPUTE031",
        task: "SEO Blog Posts",
        parties: "Marketing Co vs Tunde Oladipo",
        status: "Resolved"
    }
]

export default function Page() {
    return (
        <DashboardAuthWrapper requiredRole="admin">
            <div className="container p-4 sm:p-6 lg:p-8 space-y-12">
                 <div>
                    <h1 className="text-4xl font-extrabold tracking-tight">Marketplace Administration</h1>
                    <p className="mt-2 text-xl text-muted-foreground">
                       Monitor tasks, resolve disputes, and ensure a fair marketplace.
                    </p>
                </div>
                
                <Card>
                    <CardHeader>
                        <CardTitle>Flagged Tasks</CardTitle>
                        <CardDescription>Tasks reported by users or the system for review.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Task</TableHead>
                                    <TableHead>Reason</TableHead>
                                    <TableHead>Reported By</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {flaggedTasks.map((task) => (
                                    <TableRow key={task.taskId}>
                                        <TableCell className="font-medium">{task.title}</TableCell>
                                        <TableCell><Badge variant="destructive">{task.reason}</Badge></TableCell>
                                        <TableCell>{task.reportedBy}</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="outline" size="sm">Review</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle>Open Disputes</CardTitle>
                        <CardDescription>Conflicts between clients and freelancers requiring mediation.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Parties Involved</TableHead>
                                    <TableHead>Task</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {disputes.map((d) => (
                                    <TableRow key={d.disputeId}>
                                        <TableCell className="font-medium">{d.parties}</TableCell>
                                        <TableCell>{d.task}</TableCell>
                                        <TableCell><Badge variant={d.status === "Resolved" ? "secondary" : "default"}>{d.status}</Badge></TableCell>
                                        <TableCell className="text-right">
                                             <Button variant="outline" size="sm" disabled={d.status === 'Resolved'}>Mediate</Button>
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

