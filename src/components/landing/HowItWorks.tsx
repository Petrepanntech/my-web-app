import { UserPlus, BookUser, Briefcase, Award } from "lucide-react";

const steps = [
    {
        icon: UserPlus,
        title: "1. Sign Up",
        description: "Create your free account and tell us about your learning goals and interests."
    },
    {
        icon: BookUser,
        title: "2. Get Your Path",
        description: "Our AI generates a personalized learning path and curates a course for you from free online resources."
    },
    {
        icon: Briefcase,
        title: "3. Learn & Earn",
        description: "Start learning, complete projects, and apply for freelance jobs on the marketplace."
    },
    {
        icon: Award,
        title: "4. Grow & Succeed",
        description: "Build your portfolio, earn achievements, and unlock your full potential."
    }
]

export function HowItWorks() {
  return (
    <section className="w-full py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Four Simple Steps to Success</h2>
        </div>
        <div className="relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2"></div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {steps.map((step) => (
                    <div key={step.title} className="relative">
                        <div className="flex flex-col items-center text-center">
                             <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground border-4 border-background z-10">
                                <step.icon className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                            <p className="text-sm text-muted-foreground">{step.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
}
