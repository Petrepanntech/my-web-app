
import DashboardAuthWrapper from "@/components/auth/DashboardAuthWrapper";
import { Card, CardContent } from "@/components/ui/card";
import Image from 'next/image';

const achievements = [
    { title: "Course Completist", description: "Finish your first course", unlocked: true, image: "https://placehold.co/100x100.png", aiHint: "gold medal" },
    { title: "First Gig", description: "Complete your first freelance task", unlocked: true, image: "https://placehold.co/100x100.png", aiHint: "first place" },
    { title: "Perfect Score", description: "Get 100% on a CBT practice test", unlocked: true, image: "https://placehold.co/100x100.png", aiHint: "trophy award" },
    { title: "Community Helper", description: "Post 10 helpful replies in the hub", unlocked: true, image: "https://placehold.co/100x100.png", aiHint: "helping hand" },
    { title: "Top Rated", description: "Receive a 5-star rating on a project", unlocked: true, image: "https://placehold.co/100x100.png", aiHint: "gold star" },
    { title: "Lifelong Learner", description: "Complete 5 courses", unlocked: true, image: "https://placehold.co/100x100.png", aiHint: "stack books" },
    { title: "React Ranger", description: "Complete the advanced React course", unlocked: true, image: "https://placehold.co/100x100.png", aiHint: "atom symbol" },
    { title: "Design Virtuoso", description: "Finish the UI/UX design masterclass", unlocked: true, image: "https://placehold.co/100x100.png", aiHint: "paint palette" },
    { title: "Weekend Warrior", description: "Log in every day for a week", unlocked: true, image: "https://placehold.co/100x100.png", aiHint: "calendar week" },
    { title: "Referral Rockstar", description: "Refer 3 friends who subscribe", unlocked: false, image: "https://placehold.co/100x100.png", aiHint: "megaphone" },
    { title: "Marketplace Mogul", description: "Earn over ₦100,000", unlocked: false, image: "https://placehold.co/100x100.png", aiHint: "money bag" },
    { title: "Mentor's Mentee", description: "Complete a mentorship session", unlocked: false, image: "https://placehold.co/100x100.png", aiHint: "handshake" },
    { title: "Python Pro", description: "Complete the Python for Data Science course", unlocked: false, image: "https://placehold.co/100x100.png", aiHint: "python snake" },
    { title: "Bug Squasher", description: "Win a coding challenge", unlocked: false, image: "https://placehold.co/100x100.png", aiHint: "bug" },
    { title: "Early Bird", description: "Submit an assignment 24h early", unlocked: false, image: "https://placehold.co/100x100.png", aiHint: "early bird" },
    { title: "Night Owl", description: "Complete a module after midnight", unlocked: false, image: "https://placehold.co/100x100.png", aiHint: "owl" },
    { title: "JAMB Champion", description: "Score over 300 in a JAMB practice test", unlocked: false, image: "https://placehold.co/100x100.png", aiHint: "champion cup" },
    { title: "Speed Typer", description: "Win a typing speed challenge", unlocked: false, image: "https://placehold.co/100x100.png", aiHint: "keyboard" },
    { title: "Forum Favorite", description: "Get 50 upvotes on a community post", unlocked: false, image: "https://placehold.co/100x100.png", aiHint: "heart" },
    { title: "Project Pioneer", description: "Be the first to bid on a new project type", unlocked: false, image: "https://placehold.co/100x100.png", aiHint: "pioneer flag" }
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
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
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
