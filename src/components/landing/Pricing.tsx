"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

const features = [
    "Access to all courses",
    "AI-Personalized learning paths",
    "Freelance marketplace access",
    "Community and mentorship",
    "Verified Certificate of Completion"
]

export function Pricing() {
  return (
    <section className="w-full py-12 md:py-24 bg-secondary">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Simple, Transparent Pricing</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-lg">
                One plan. Unlimited access. Unlock your future today.
            </p>
        </div>
        <div className="flex justify-center">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Annual Plan</CardTitle>
                    <CardDescription>All-inclusive access to the platform.</CardDescription>
                    <div className="text-5xl font-bold my-4">
                        ₦25,000<span className="text-xl font-normal text-muted-foreground">/year</span>
                    </div>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-3">
                        {features.map(feature => (
                            <li key={feature} className="flex items-center gap-2">
                                <Check className="w-5 h-5 text-primary" />
                                <span className="text-sm">{feature}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
                <CardFooter>
                    <Button asChild className="w-full" size="lg">
                        <Link href="/payment">Subscribe Now</Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
      </div>
    </section>
  );
}
