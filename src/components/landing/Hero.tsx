"use client"

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

export function Hero() {
  const { setShowAuthModal } = useAuth();
  return (
    <section className="w-full py-20 md:py-32 bg-secondary">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
            Unlock Your Potential. Power Your Future.
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Alternative Academy is Nigeria's leading platform for AI-powered education, freelance opportunities, and community-driven growth.
          </p>
          <Button size="lg" onClick={() => setShowAuthModal(true)}>
            Get Started Free
          </Button>
        </div>
      </div>
    </section>
  );
}
