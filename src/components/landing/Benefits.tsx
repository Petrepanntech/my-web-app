import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, BrainCircuit, Users, Briefcase } from "lucide-react";

const benefits = [
  {
    icon: BrainCircuit,
    title: "AI-Curated Content",
    description: "Our AI engine sources the best, most relevant learning materials, including video lectures, so you're always up-to-date.",
  },
  {
    icon: Users,
    title: "Expert Mentorship",
    description: "Connect directly with high-caliber mentors for one-on-one guidance and support throughout your learning journey.",
  },
  {
    icon: Briefcase,
    title: "Earn As You Grow",
    description: "Utilize our affiliate program and complete promotional tasks to earn money, all managed through your integrated wallet.",
  },
  {
    icon: Zap,
    title: "Community Powered",
    description: "Join a vibrant community hub to collaborate, ask questions, and build your professional network.",
  },
];

export function Benefits() {
  return (
    <section className="w-full py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Why Choose Alternative Academy?</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-lg">
                We provide more than just courses. We offer a complete ecosystem for growth.
            </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => (
            <Card key={benefit.title} className="text-center">
              <CardHeader>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <benefit.icon className="h-6 w-6" />
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <h3 className="text-lg font-bold">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
