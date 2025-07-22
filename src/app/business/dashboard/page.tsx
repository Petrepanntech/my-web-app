
import DashboardAuthWrapper from "@/components/auth/DashboardAuthWrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DollarSign, Briefcase, Users, FileText, ArrowRight } from "lucide-react";
import Link from "next/link";


const activeTasks = [
    { id: "1", title: "Build a Landing Page", budget: "₦80,000", bids: 5, status: "Accepting Bids" },
    { id: "2", title: "Mobile App UI Design", budget: "₦120,000", freelancer: "Aisha Nwosu", status: "In Progress" },
    { id: "3", title: "SEO Blog Posts", budget: "₦50,000", freelancer: "Tunde Oladipo", status: "Completed" }
]

const recentFreelancers = [
    { name: "Samuel Adebayo", specialty: "Full-Stack Dev", avatar: "https://i.pravatar.cc/150?u=samuel" },
    { name: "Aisha Nwosu", specialty: "UI/UX Designer", avatar: "https://i.pravatar.cc/150?u=aisha" },
    { name: "Adeola Peters", specialty: "Frontend Dev", avatar: "https://i.pravatar.cc/150?u=adeola" },
]


export default function Page() {
    return (
        <DashboardAuthWrapper requiredRole="business">
             <div className="container p-4 sm:p-6 lg:p-8">
                 <div className="mb-12">
                    <h1 className="text-4xl font-extrabold tracking-tight">Business Dashboard</h1>
                    <p className="mt-2 text-xl text-muted-foreground">
                       Manage your projects and connect with top talent.
                    </p>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">₦250,000</div>
                            <p className="text-xs text-muted-foreground">on 3 completed projects</p>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Gigs</CardTitle>
                            <Briefcase className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">2</div>
                            <p className="text-xs text-muted-foreground">1 accepting bids</p>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Freelancers Hired</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">3</div>
                            <p className="text-xs text-muted-foreground">2 active contracts</p>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Pending MOUs</CardTitle>
                            <FileText className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">1</div>
                            <p className="text-xs text-muted-foreground">Awaiting freelancer signature</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle>My Projects</CardTitle>
                                    <CardDescription>An overview of your current and past tasks.</CardDescription>
                                </div>
                                <Button asChild variant="secondary">
                                    <Link href="/marketplace/tasks/new">Post New Task</Link>
                                </Button>
                            </CardHeader>
                            <CardContent>
                               <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Title</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Freelancer/Bids</TableHead>
                                            <TableHead className="text-right">Action</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {activeTasks.map((task) => (
                                            <TableRow key={task.id}>
                                                <TableCell className="font-medium">{task.title}</TableCell>
                                                <TableCell>
                                                    <Badge variant={task.status === "Completed" ? "secondary" : "default"}>{task.status}</Badge>
                                                </TableCell>
                                                <TableCell>{task.freelancer || `${task.bids} Bids`}</TableCell>
                                                <TableCell className="text-right">
                                                     <Button asChild variant="outline" size="sm">
                                                        <Link href={`/marketplace/tasks/${task.id}`}>
                                                            View
                                                        </Link>
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </div>
                     <Card>
                        <CardHeader>
                            <CardTitle>Recently Hired</CardTitle>
                            <CardDescription>Freelancers you've worked with.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {recentFreelancers.map(f => (
                                <div key={f.name} className="flex justify-between items-center">
                                    <div className="font-medium">{f.name}</div>
                                    <Button variant="ghost">Message</Button>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardAuthWrapper>
    );
}
