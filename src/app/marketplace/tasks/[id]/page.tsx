
"use client"
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

export default function TaskDetailPage({ params }: { params: { id: string } }) {
    const { isAuthenticated, setShowAuthModal } = useAuth();
    const { toast } = useToast();

    // In a real app, you would fetch this data based on params.id
    const task = { 
        id: "1", 
        title: "Build a Landing Page for a New SaaS Product", 
        budget: "₦50,000 - ₦80,000", 
        skills: ["HTML", "CSS", "React", "Next.js"], 
        bids: 5,
        description: "We are launching a new SaaS product and need a high-converting, responsive landing page. The design will be provided in Figma. You will be responsible for translating the design into a pixel-perfect, performant Next.js application.",
        postedBy: { name: "Fatima Bello", company: "Innovate Inc." }
    };

    const handleBidSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Bid Submitted!",
            description: "Your proposal has been sent to the client.",
        });
        // In a real app, you would close the dialog here.
        // For this mock, we'll let the user close it manually.
    }

    const handlePlaceBidClick = () => {
        if (!isAuthenticated) {
            setShowAuthModal(true);
        }
    }

    return (
        <div className="container mx-auto max-w-4xl py-12 px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold">{task.title}</h1>
                        <p className="text-lg text-muted-foreground mt-2">Budget: {task.budget}</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {task.skills.map(skill => <Badge key={skill}>{skill}</Badge>)}
                    </div>
                    
                    <Card>
                        <CardHeader><CardTitle>Project Description</CardTitle></CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{task.description}</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader><CardTitle>Activity</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                           <p className="text-muted-foreground">There are currently <span className="font-bold text-foreground">{task.bids} bids</span> on this project.</p>
                           <p className="text-sm text-muted-foreground">You must be logged in as a student or instructor to view bid details and place your own bid.</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>About the Client</CardTitle>
                        </CardHeader>
                        <CardContent>
                           <p className="font-semibold">{task.postedBy.name}</p>
                           <p className="text-sm text-muted-foreground">{task.postedBy.company}</p>
                        </CardContent>
                    </Card>
                    
                    {isAuthenticated ? (
                         <Dialog>
                            <DialogTrigger asChild>
                                <Button size="lg" className="w-full">Place Your Bid</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Submit a Proposal</DialogTitle>
                                    <DialogDescription>
                                        Your proposal will be sent to the client. Make it count!
                                    </DialogDescription>
                                </DialogHeader>
                                <form onSubmit={handleBidSubmit}>
                                    <div className="grid gap-4 py-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="bid-amount">Your Bid Amount (₦)</Label>
                                            <Input id="bid-amount" type="number" placeholder="e.g. 65000" required/>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="proposal">Your Proposal</Label>
                                            <Textarea id="proposal" placeholder="Explain why you're the best fit for this project..." rows={6} required />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button type="submit">Submit Bid</Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    ) : (
                        <Button size="lg" className="w-full" onClick={handlePlaceBidClick}>Place Your Bid</Button>
                    )}
                   
                </div>
            </div>
        </div>
    );
}
