import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, BookOpen, Code, MessageCircle } from "lucide-react";

const features = [
  {
    title: "Personalized Learning Paths",
    description: "Our AI analyzes your skills and aspirations to build a unique learning roadmap just for you.",
    icon: BarChart,
    image: "https://images.unsplash.com/photo-1546410531-bb4daa6b4485?q=80&w=500&h=300&fit=crop",
    aiHint: "learning path"
  },
  {
    title: "Hands-On Projects",
    description: "Apply what you learn with real-world projects from our freelance marketplace.",
    icon: Code,
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=500&h=300&fit=crop",
    aiHint: "coding project"
  },
  {
    title: "Expert-Led Courses",
    description: "Learn from the best in the industry with our comprehensive and up-to-date course catalog.",
    icon: BookOpen,
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=500&h=300&fit=crop",
    aiHint: "online course"
  },
  {
    title: "Mentorship & Community",
    description: "Get guidance from experienced mentors and collaborate with a vibrant community of learners.",
    icon: MessageCircle,
    image: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?q=80&w=500&h=300&fit=crop",
    aiHint: "community mentor"
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
            <Card key={feature.title} className="overflow-hidden">
                <div className="grid md:grid-cols-2 items-center">
                    <div className="p-8">
                        <div className="flex items-center gap-4 mb-4">
                            <feature.icon className="w-8 h-8 text-primary" />
                            <h3 className="text-xl font-bold">{feature.title}</h3>
                        </div>
                        <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                    <Image
                        src={feature.image}
                        alt={feature.title}
                        width={500}
                        height={300}
                        className="object-cover w-full h-48 md:h-full"
                        data-ai-hint={feature.aiHint}
                    />
                </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
