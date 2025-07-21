import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function TaskDetailPage({ params }: { params: { id: string } }) {
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

    const bids = [
        { user: { name: "Adeola Peters", avatar: "https://i.pravatar.cc/150?u=adeola" }, amount: "₦65,000", proposal: "I have extensive experience with Next.js and can deliver a high-quality landing page within 5 days." },
        { user: { name: "Samuel Adebayo", avatar: "https://i.pravatar.cc/150?u=samuel" }, amount: "₦70,000", proposal: "As a senior developer, I can ensure the code is clean, scalable, and follows best practices." }
    ]

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
                        <CardHeader><CardTitle>Bids ({task.bids})</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                           {bids.map(bid => (
                               <div key={bid.user.name} className="flex gap-4 p-4 border rounded-md">
                                   <Avatar>
                                        <AvatarImage src={bid.user.avatar} />
                                        <AvatarFallback>{bid.user.name.charAt(0)}</AvatarFallback>
                                   </Avatar>
                                   <div className="flex-1">
                                       <div className="flex justify-between items-start">
                                           <p className="font-semibold">{bid.user.name}</p>
                                           <p className="font-bold text-primary">{bid.amount}</p>
                                       </div>
                                       <p className="text-sm text-muted-foreground mt-1">{bid.proposal}</p>
                                   </div>
                               </div>
                           ))}
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
                    <Button size="lg" className="w-full">Place Your Bid</Button>
                </div>
            </div>
        </div>
    );
}
