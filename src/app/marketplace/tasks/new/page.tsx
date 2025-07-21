import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function NewTaskPage() {
    return (
        <div className="container mx-auto max-w-2xl py-12 px-4 sm:px-6 lg:px-8">
            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl">Post a New Task</CardTitle>
                    <CardDescription>Describe your project and find the perfect talent to get it done.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Task Title</Label>
                            <Input id="title" placeholder="e.g., Build a responsive landing page" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" placeholder="Provide a detailed description of the task, including requirements, deliverables, and timeline." rows={6} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                             <div className="space-y-2">
                                <Label htmlFor="budget">Budget (₦)</Label>
                                <Input id="budget" placeholder="e.g., 50,000" />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="skills">Required Skills</Label>
                                <Input id="skills" placeholder="e.g., React, Figma, SEO (comma-separated)" />
                            </div>
                        </div>
                        <Button type="submit" size="lg" className="w-full">Post Task</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
