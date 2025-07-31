
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

interface Mentor {
    name: string;
    title: string;
    specialties: string[];
    avatar: string;
    bio: string;
}

interface MyMentorCardProps {
    mentor: Mentor;
}

export function MyMentorCard({ mentor }: MyMentorCardProps) {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-6 text-center md:text-left">Your Assigned Mentor</h2>
            <Card className="overflow-hidden">
                <div className="grid md:grid-cols-3">
                    <div className="md:col-span-1">
                        <Avatar className="h-full w-full rounded-none">
                            <AvatarImage src={mentor.avatar} alt={mentor.name} className="object-cover" />
                            <AvatarFallback>{mentor.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                        </Avatar>
                    </div>
                    <div className="md:col-span-2">
                        <CardHeader>
                            <CardTitle className="text-2xl">{mentor.name}</CardTitle>
                            <CardDescription>{mentor.title}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">{mentor.bio}</p>
                            <div className="flex flex-wrap gap-2 mb-6">
                                {mentor.specialties.map(spec => <Badge key={spec} variant="secondary">{spec}</Badge>)}
                            </div>
                            <Button size="lg">
                                <MessageSquare className="mr-2 h-4 w-4" />
                                Message Your Mentor
                            </Button>
                        </CardContent>
                    </div>
                </div>
            </Card>
        </div>
    )
}
