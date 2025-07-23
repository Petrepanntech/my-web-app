"use client"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

export function Cta() {
    const { setShowAuthModal } = useAuth();
  return (
    <section className="w-full py-12 md:py-24 bg-background">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 items-center">
          <div className="flex flex-col justify-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Ready to Start Your Journey?
            </h2>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
              Create an account and get your personalized, AI-generated learning path in minutes.
            </p>
            <Button 
                size="lg" 
                className="mx-auto"
                onClick={() => setShowAuthModal(true)}
            >
                Get Started For Free
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
