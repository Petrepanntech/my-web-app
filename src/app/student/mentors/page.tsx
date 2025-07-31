
import DashboardAuthWrapper from "@/components/auth/DashboardAuthWrapper";
import { MyMentorCard } from "@/components/shared/MyMentorCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

const assignedMentor = {
    name: "Samuel Adebayo",
    title: "Senior Full-Stack Engineer",
    specialties: ["React", "Node.js", "GraphQL"],
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    bio: "Samuel is a certified cloud architect and a master of modern web technologies, dedicated to practical, project-based learning. He is here to help you with any questions about web development.",
};

const otherMentors = [
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
                     <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">My Mentors</h1>
                     <p className="mt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
                       Connect with your assigned mentor and discover other experts.
                    </p>
                </div>

                <div className="space-y-12">
                    <MyMentorCard mentor={assignedMentor} />

                    <div>
                        <h2 className="text-2xl font-bold mb-6 text-center md:text-left">Explore Other Mentors</h2>
                        <div className="grid gap-8 md:grid-cols-2">
                            {otherMentors.map(mentor => (
                                <Card key={mentor.name}>
                                    <CardHeader>
                                    <div className="flex items-center gap-4">
                                        <Avatar className="h-16 w-16">
                                            <AvatarImage src={mentor.avatar} alt={mentor.name} />
                                            <AvatarFallback>{mentor.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <CardTitle>{mentor.name}</CardTitle>
                                            <CardDescription className="mt-1">{mentor.title}</CardDescription>
                                        </div>
                                    </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {mentor.specialties.map(spec => <Badge key={spec} variant="secondary">{spec}</Badge>)}
                                        </div>
                                        <Button className="w-full">
                                            <MessageSquare className="mr-2 h-4 w-4" />
                                            Message
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </DashboardAuthWrapper>
    );
}
