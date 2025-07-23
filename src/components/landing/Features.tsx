import Image from "next/image";
import { BarChart, BookOpen, Code, MessageCircle } from "lucide-react";

const features = [
  {
    title: "Personalized Learning Paths",
    description: "Our AI analyzes your skills and aspirations to build a unique learning roadmap just for you, sourcing the best free content from the web.",
    icon: BarChart,
    image: "https://images.unsplash.com/photo-1546410531-bb4daa6b4485?q=80&w=500&h=300&fit=crop",
    aiHint: "learning path"
  },
  {
    title: "Hands-On Freelance Marketplace",
    description: "Apply what you learn with real-world projects from our freelance marketplace, building your portfolio and earning as you go.",
    icon: Code,
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=500&h=300&fit=crop",
    aiHint: "coding project"
  },
];

export function Features() {
  return (
    <section id="features" className="w-full py-16 md:py-28 bg-secondary">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
          <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Everything You Need to Succeed</h2>
          <p className="max-w-[700px] text-muted-foreground md:text-lg">
            Our platform is packed with features designed to accelerate your learning and career growth.
          </p>
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          {features.map((feature) => (
            <div key={feature.title} className="grid md:grid-cols-2 items-center gap-8">
                <div className="space-y-2">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="bg-primary/10 text-primary p-2 rounded-md">
                            <feature.icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold">{feature.title}</h3>
                    </div>
                    <p className="text-muted-foreground">{feature.description}</p>
                </div>
                <Image
                    src={feature.image}
                    alt={feature.title}
                    width={500}
                    height={300}
                    className="object-cover w-full h-full rounded-lg"
                    data-ai-hint={feature.aiHint}
                />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
