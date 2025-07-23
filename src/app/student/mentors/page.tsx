
import DashboardAuthWrapper from "@/components/auth/DashboardAuthWrapper";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import Link from "next/link";

const mentors = [
  {
    name: "Samuel Adebayo",
    title: "Senior Full-Stack Engineer",
    specialties: ["React", "Node.js", "GraphQL"],
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    status: "Your Mentor"
  },
  {
    name: "Aisha Nwosu",
    title: "Head of Product Design @ Paystack",
    specialties: ["UI/UX", "Figma", "Design Systems"],
    avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&h=100&fit=crop",
    status: "Available"
  },
  {
    name: "Dr. Evelyn Reed",
    title: "Lead Data Scientist",
    specialties: ["Machine Learning", "Python", "AI Ethics"],
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop",
    status: "Busy"
  },
   {
    name: "Tunde Oladipo",
    title: "Growth Marketing Expert",
    specialties: ["SEO", "Content Marketing", "PPC"],
    avatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=100&h=100&fit=crop",
    status: "Available"
  }
];

export default function Page() {
    return (
        <DashboardAuthWrapper requiredRole="student">
            <div className="container p-4 sm:p-6 lg:p-8">
                <div className="text-center mb-12">
                     <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Connect with a Mentor</h1>
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
                       Get guidance and support from industry experts to accelerate your growth.
                    </p>
                </div>
                
                <div className="grid gap-8 md:grid-cols-2">
                    {mentors.map(mentor => (
                        <Card key={mentor.name}>
                             <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start gap-4">
                                            <Avatar className="h-20 w-20">
                                                <AvatarImage src={mentor.avatar} alt={mentor.name} />
                                                <AvatarFallback>{mentor.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <CardTitle>{mentor.name}</CardTitle>
                                                <CardDescription className="mt-1">{mentor.title}</CardDescription>
                                            </div>
                                    </div>
                                    <Badge variant={mentor.status === 'Your Mentor' ? 'default' : mentor.status === 'Available' ? 'secondary' : 'outline'}>{mentor.status}</Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {mentor.specialties.map(spec => <Badge key={spec} variant="secondary">{spec}</Badge>)}
                                </div>
                                <Button asChild className="w-full" disabled={mentor.status === 'Busy'}>
                                    <Link href="/student/chat">
                                        <MessageSquare className="mr-2 h-4 w-4" />
                                        {mentor.status === 'Your Mentor' ? 'Chat Now' : 'Request Mentorship'}
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </DashboardAuthWrapper>
    );
}
