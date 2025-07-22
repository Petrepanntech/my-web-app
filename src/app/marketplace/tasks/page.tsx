
"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRight, PlusCircle } from "lucide-react";
import { allTasks, taskCategories } from "@/lib/tasks-data";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

export default function MarketplaceTasksPage() {
    const [category, setCategory] = useState('all');
    const [budget, setBudget] = useState([200000]);

    const filteredTasks = allTasks.filter(task => {
        const categoryMatch = category === 'all' || task.category.toLowerCase().replace(/\s/g, '-') === category;
        const budgetMatch = task.budget <= budget[0];
        return categoryMatch && budgetMatch;
    });

    return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
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
                    <Link href="/marketplace/tasks/new">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Post a New Task
                    </Link>
                </Button>
            </div>
        </div>
        
        <div className="grid lg:grid-cols-4 gap-8">
            <aside className="lg:col-span-1">
                 <Card>
                    <CardHeader><CardTitle>Filters</CardTitle></CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label>Category</Label>
                            <Select value={category} onValueChange={setCategory}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Categories</SelectItem>
                                    {taskCategories.map(cat => (
                                        <SelectItem key={cat.slug} value={cat.slug}>{cat.title}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                         <div className="space-y-4">
                            <Label>Max Budget: ₦{budget[0].toLocaleString()}</Label>
                            <Slider 
                                min={10000} 
                                max={200000} 
                                step={5000}
                                value={budget}
                                onValueChange={setBudget}
                            />
                        </div>
                    </CardContent>
                 </Card>
            </aside>
             <main className="lg:col-span-3">
                <div className="grid gap-6">
                    {filteredTasks.map(task => (
                        <Card key={task.id}>
                            <CardHeader>
                                <CardTitle className="text-xl">{task.title}</CardTitle>
                                <CardDescription>Budget: ₦{task.budget.toLocaleString()}</CardDescription>
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
                    {filteredTasks.length === 0 && (
                        <div className="text-center py-16 text-muted-foreground">
                            <p>No tasks match your criteria.</p>
                        </div>
                     )}
                </div>
            </main>
        </div>
      </div>
    );
}
