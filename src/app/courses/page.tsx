import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Code, Palette, Briefcase, Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";

const courseCategories = [
  {
    title: "Web Development",
    description: "Master frontend and backend technologies to build modern web applications.",
    icon: Code,
    slug: "web-development"
  },
  {
    title: "UI/UX Design",
    description: "Learn to design intuitive and beautiful user interfaces and experiences.",
    icon: Palette,
    slug: "ui-ux-design"
  },
  {
    title: "Business & Entrepreneurship",
    description: "Acquire the skills to launch and grow your own successful business.",
    icon: Briefcase,
    slug: "business"
  },
  {
    title: "Digital Marketing",
    description: "Understand the strategies to market products and services in the digital age.",
    icon: Megaphone,
    slug: "digital-marketing"
  }
];

export default function CoursesPage() {
  return (
    <div className="container mx-auto max-w-5xl py-12 px-4 sm:px-6 lg:px-8">
      <div className="space-y-16">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Explore Our Courses
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-muted-foreground">
            Find the perfect course to kickstart your journey and unlock new skills.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {courseCategories.map((category) => (
            <Card key={category.title} className="flex flex-col">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <category.icon className="w-8 h-8 text-primary" />
                  <CardTitle>{category.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground">{category.description}</p>
              </CardContent>
              <div className="p-6 pt-0">
                <Button asChild variant="outline">
                    <Link href={`/courses/${category.slug}`}>
                        View Courses <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
