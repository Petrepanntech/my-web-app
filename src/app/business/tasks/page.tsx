
import DashboardAuthWrapper from "@/components/auth/DashboardAuthWrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, PlusCircle } from "lucide-react";
import Link from "next/link";


const tasks = [
    { id: "1", title: "Build a Landing Page", budget: "₦80,000", status: "Accepting Bids", bids: 5 },
    { id: "2", title: "Mobile App UI Design", budget: "₦120,000", status: "In Progress", bids: 1 },
    { id: "3", title: "SEO Blog Posts", budget: "₦50,000", status: "Completed", bids: 1 },
    { id: "4", title: "E-commerce Backend API", budget: "₦200,000", status: "Draft", bids: 0 }
]

const statusVariant: { [key: string]: "default" | "secondary" | "outline" | "destructive" } = {
    "Accepting Bids": "default",
    "In Progress": "outline",
    "Completed": "secondary",
    "Draft": "destructive"
}

export default function Page() {
    return (
        <DashboardAuthWrapper requiredRole="business">
            <div className="container p-4 sm:p-6 lg:p-8">
                 <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-12">
                    <div className="text-center md:text-left">
                        <h1 className="text-4xl font-extrabold tracking-tight">My Tasks</h1>
                        <p className="mt-2 max-w-2xl text-xl text-muted-foreground">
                           Manage all the tasks you've posted on the marketplace.
                        </p>
                    </div>
                    <div className="text-center md:text-left shrink-0">
                        <Button asChild>
                            <Link href="/marketplace/tasks/new">
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Post a New Task
                            </Link>
                        </Button>
                    </div>
                </div>
                
                <div className="grid gap-8 md:grid-cols-2">
                    {tasks.map(task => (
                        <Card key={task.id}>
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <CardTitle className="text-xl">{task.title}</CardTitle>
                                    <Badge variant={statusVariant[task.status]}>{task.status}</Badge>
                                </div>
                                <CardDescription>Budget: {task.budget}</CardDescription>
                            </CardHeader>
                            <CardFooter className="flex justify-between">
                                <span className="text-sm text-muted-foreground">{task.bids} bid(s)</span>
                                <Button asChild variant="secondary">
                                    <Link href={`/marketplace/tasks/${task.id}`}>
                                        View Details <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </DashboardAuthWrapper>
    );
}

