"use client"

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

export function Hero() {
  const { setShowAuthModal } = useAuth();
  return (
    <section className="w-full pt-16 pb-24 md:pt-24 md:pb-36 bg-secondary">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-6 text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none">
            Unlock Your Potential. Power Your Future.
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Alternative Academy is Nigeria's leading platform for AI-powered education, freelance opportunities, and community-driven growth.
          </p>
          <Button size="lg" className="py-7 px-8 text-lg" onClick={() => setShowAuthModal(true)}>
            Get Started Free
          </Button>
        </div>
      </div>
    </section>
  );
}
