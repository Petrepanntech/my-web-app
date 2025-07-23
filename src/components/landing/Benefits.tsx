import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, BrainCircuit, Users, Briefcase } from "lucide-react";

const benefits = [
  {
    icon: BrainCircuit,
    title: "AI-Powered Curation",
    description: "Our AI engine finds the best, most relevant learning materials from across the web, so you're always up-to-date.",
  },
  {
    icon: Zap,
    title: "Always Free",
    description: "Quality education shouldn't have a price tag. Our platform is free to use, forever.",
  },
  {
    icon: Briefcase,
    title: "Real-World Ready",
    description: "Apply your skills by bidding on freelance projects in our integrated marketplace.",
  },
  {
    icon: Users,
    title: "Community Driven",
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
            <Card key={benefit.title} className="text-center border-0 shadow-none">
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
