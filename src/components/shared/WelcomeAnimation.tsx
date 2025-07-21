"use client";

import { GraduationCap } from "lucide-react";

export function WelcomeAnimation() {
  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
    >
      <div className="animate-fade-in-scale">
        <GraduationCap className="h-20 w-20 text-primary" />
      </div>
      <h1 className="mt-4 animate-fade-in-scale text-3xl font-bold" style={{ animationDelay: '200ms' }}>
        Alternative Academy
      </h1>
    </div>
  );
}
