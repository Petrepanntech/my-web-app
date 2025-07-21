import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, BrainCircuit, Users, Briefcase } from "lucide-react";

const benefits = [
  {
    icon: BrainCircuit,
    title: "AI-Powered Learning",
    description: "Personalized learning paths that adapt to your pace and goals, ensuring you master in-demand skills effectively.",
  },
  {
    icon: Briefcase,
    title: "Earn While You Learn",
    description: "Access a decentralized marketplace to find freelance gigs, apply your skills, and build your professional portfolio.",
  },
  {
    icon: Users,
    title: "Vibrant Community",
    description: "Connect with peers, mentors, and industry experts. Collaborate on projects and grow your network.",
  },
  {
    icon: Zap,
    title: "Future-Proof Skills",
    description: "Our curriculum is designed to equip you with the most relevant and future-proof skills for the modern economy.",
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
