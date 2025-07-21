"use client"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";

export function Cta() {
    const { setShowAuthModal } = useAuth();
  return (
    <section className="w-full py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 items-center">
          <div className="flex flex-col justify-center space-y-8 text-center">
            <Card className="w-full max-w-2xl mx-auto bg-primary text-primary-foreground">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold">Ready to Activate Your Future?</CardTitle>
                    <CardDescription className="text-primary-foreground/80">
                        Join thousands of young Nigerians building their dreams with Alternative Academy.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button 
                        size="lg" 
                        variant="secondary"
                        className="text-lg py-7 px-8"
                        onClick={() => setShowAuthModal(true)}
                    >
                        Get Started Now
                    </Button>
                </CardContent>
            </Card>

            <Card className="w-full max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>Have Questions?</CardTitle>
                    <CardDescription>
                        Our team is here to help. Reach out to us for more information.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button asChild variant="outline">
                        <Link href="/about#contact">Contact Us</Link>
                    </Button>
                </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
