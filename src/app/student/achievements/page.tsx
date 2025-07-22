
import DashboardAuthWrapper from "@/components/auth/DashboardAuthWrapper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Book, Briefcase, Star, Users } from "lucide-react";
import Image from 'next/image';

const achievements = [
    { title: "Course Completist", description: "Finish your first course", icon: Book, unlocked: true, image: "https://placehold.co/100x100.png", aiHint: "gold medal" },
    { title: "First Gig", description: "Complete your first freelance task", icon: Briefcase, unlocked: true, image: "https://placehold.co/100x100.png", aiHint: "first place" },
    { title: "Community Helper", description: "Post 10 helpful replies in the hub", icon: Users, unlocked: false, image: "https://placehold.co/100x100.png", aiHint: "helping hand" },
    { title: "Perfect Score", description: "Get 100% on a CBT practice test", icon: Award, unlocked: true, image: "https://placehold.co/100x100.png", aiHint: "trophy award" },
    { title: "Top Rated", description: "Receive a 5-star rating on a project", icon: Star, unlocked: false, image: "https://placehold.co/100x100.png", aiHint: "gold star" },
    { title: "Lifelong Learner", description: "Complete 5 courses", icon: Book, unlocked: false, image: "https://placehold.co/100x100.png", aiHint: "stack books" },
];


export default function Page() {
    return (
        <DashboardAuthWrapper requiredRole="student">
             <div className="container p-4 sm:p-6 lg:p-8">
                <div className="text-center mb-12">
                     <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">My Achievements</h1>
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
                       Celebrate your milestones and track your progress.
                    </p>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {achievements.map(ach => (
                        <Card key={ach.title} className={`transition-opacity ${!ach.unlocked ? 'opacity-50' : ''}`}>
                            <CardContent className="pt-6 flex flex-col items-center text-center">
                               <Image 
                                    src={ach.image}
                                    alt={`${ach.title} badge`}
                                    width={100}
                                    height={100}
                                    className="rounded-full mb-4 border-4 border-primary"
                                    data-ai-hint={ach.aiHint}
                                />
                                <h3 className="text-lg font-bold">{ach.title}</h3>
                                <p className="text-sm text-muted-foreground mt-1">{ach.description}</p>
                                {ach.unlocked && <p className="text-xs font-semibold text-green-600 mt-2">UNLOCKED</p>}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </DashboardAuthWrapper>
    );
}

