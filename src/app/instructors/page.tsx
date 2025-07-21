import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const featuredInstructors = [
  {
    name: "Dr. Evelyn Reed",
    title: "Lead Data Scientist",
    specialties: ["Machine Learning", "Python", "AI Ethics"],
    avatar: "https://i.pravatar.cc/150?u=evelyn",
    bio: "Dr. Reed brings over 15 years of industry experience, passionate about making data science accessible to all."
  },
  {
    name: "Samuel Adebayo",
    title: "Senior Full-Stack Engineer",
    specialties: ["React", "Node.js", "GraphQL", "DevOps"],
    avatar: "https://i.pravatar.cc/150?u=samuel",
    bio: "Samuel is a certified cloud architect and a master of modern web technologies, dedicated to practical, project-based learning."
  },
  {
    name: "Aisha Nwosu",
    title: "Head of Product Design @ Paystack",
    specialties: ["UI/UX", "Figma", "Design Systems", "User Research"],
    avatar: "https://i.pravatar.cc/150?u=aisha",
    bio: "Aisha is a renowned designer with a flair for creating user-centric products that are both beautiful and functional."
  },
   {
    name: "Tunde Oladipo",
    title: "Growth Marketing Expert",
    specialties: ["SEO", "Content Marketing", "PPC", "Marketing Analytics"],
    avatar: "https://i.pravatar.cc/150?u=tunde",
    bio: "Tunde has helped multiple startups achieve exponential growth through data-driven digital marketing strategies."
  }
];

export default function InstructorsPage() {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="space-y-16">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Learn from the Best
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-muted-foreground">
            Our instructors are industry experts and passionate educators dedicated to your success.
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2">
            {featuredInstructors.map(instructor => (
                <Card key={instructor.name}>
                    <CardHeader>
                       <div className="flex items-start gap-6">
                            <Avatar className="h-24 w-24">
                                <AvatarImage src={instructor.avatar} alt={instructor.name} />
                                <AvatarFallback>{instructor.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                            </Avatar>
                            <div>
                                <CardTitle>{instructor.name}</CardTitle>
                                <CardDescription className="mt-1">{instructor.title}</CardDescription>
                            </div>
                       </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">{instructor.bio}</p>
                        <div className="flex flex-wrap gap-2">
                            {instructor.specialties.map(spec => <Badge key={spec} variant="secondary">{spec}</Badge>)}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
      </div>
    </div>
  );
}
