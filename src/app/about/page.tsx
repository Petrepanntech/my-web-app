import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-5xl py-12 px-4 sm:px-6 lg:px-8">
      <div className="space-y-24">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            About Alternative Academy
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-muted-foreground">
            Empowering Nigerian youth through accessible, AI-driven education and economic opportunities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Our Mission</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                To provide a comprehensive ecosystem that combines AI-driven personalized learning, a decentralized freelance marketplace, and a vibrant community hub, making quality education and economic opportunities accessible to all Nigerian youth.
                </p>
            </div>
             <Image
                src="https://placehold.co/600x400.png"
                alt="Our Mission"
                width={600}
                height={400}
                className="rounded-lg shadow-md"
                data-ai-hint="team collaboration"
            />
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
            <Image
                src="https://placehold.co/600x400.png"
                alt="Our Vision"
                width={600}
                height={400}
                className="rounded-lg shadow-md md:order-last"
                data-ai-hint="future vision"
            />
             <div>
                <h2 className="text-3xl font-bold tracking-tight">Our Vision</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                To become the leading platform for alternative education and economic empowerment for Nigerian youth, fostering a generation of skilled, innovative, and self-reliant individuals who can thrive in the global digital economy.
                </p>
            </div>
        </div>

        <Card id="contact">
            <CardHeader>
                <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">Have questions or want to partner with us? We'd love to hear from you.</p>
                <div className="mt-6 space-y-4">
                    <p><strong>Email:</strong> <a href="mailto:info@alternative.academy" className="text-primary hover:underline">info@alternative.academy</a></p>
                    <p><strong>Address:</strong> 123 Innovation Drive, Lagos, Nigeria</p>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
