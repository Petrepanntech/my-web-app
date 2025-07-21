import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const tasks = [
    { id: "1", title: "Build a Landing Page for a New SaaS Product", budget: "₦50,000 - ₦80,000", skills: ["HTML", "CSS", "React", "Next.js"], bids: 5 },
    { id: "2", title: "Design a Mobile App UI in Figma", budget: "₦120,000", skills: ["UI/UX", "Figma", "Mobile Design"], bids: 8 },
    { id: "3", title: "Write SEO-Optimized Blog Posts for a Tech Blog", budget: "₦5,000 per post", skills: ["Content Writing", "SEO"], bids: 12 },
    { id: "4", title: "Develop a REST API for a Student Management System", budget: "₦150,000", skills: ["Node.js", "Express", "MongoDB", "API"], bids: 3 }
]

export default function MarketplaceTasksPage() {
    return (
    <div className="container mx-auto max-w-5xl py-12 px-4 sm:px-6 lg:px-8">
      <div className="space-y-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="text-center md:text-left">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                    Freelance Marketplace
                </h1>
                <p className="mt-4 max-w-2xl text-xl text-muted-foreground">
                    Apply your skills, gain experience, and earn.
                </p>
            </div>
            <div className="text-center md:text-left shrink-0">
                 <Button asChild>
                    <Link href="/marketplace/tasks/new">Post a New Task</Link>
                </Button>
            </div>
        </div>
        
        <div className="grid gap-8">
            {tasks.map(task => (
                <Card key={task.id}>
                    <CardHeader>
                        <CardTitle className="text-xl">{task.title}</CardTitle>
                        <CardDescription>Budget: {task.budget}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-2">
                            {task.skills.map(skill => (
                                <Badge key={skill} variant="outline">{skill}</Badge>
                            ))}
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <span className="text-sm text-muted-foreground">{task.bids} bids</span>
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
    </div>
  );
}
