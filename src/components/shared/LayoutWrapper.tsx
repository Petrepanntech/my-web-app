"use client";

import React, { useState, useEffect } from "react";
import { AppHeader } from "@/components/shared/AppHeader";
import { AuthModal } from "@/components/auth/AuthModal";
import { Toaster } from "@/components/ui/toaster";
import { WelcomeAnimation } from "./WelcomeAnimation";
import { BottomNavBar } from "./BottomNavBar";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading time and then hide the splash screen
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000); // Animation will last for 2 seconds

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <WelcomeAnimation />;
    }

    return (
        <>
            <div className="relative flex min-h-screen flex-col">
                <AppHeader />
                <main className="flex-1 pb-16 md:pb-0">{children}</main>
                <BottomNavBar />
            </div>
            <AuthModal />
            <Toaster />
        </>
    );
}
