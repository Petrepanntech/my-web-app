
"use client";

import { AppHeader } from "@/components/shared/AppHeader";
import { AuthModal } from "@/components/auth/AuthModal";
import { Toaster } from "@/components/ui/toaster";
import { BottomNavBar } from "./BottomNavBar";
import { ChatProvider } from "@/context/ChatContext";
import { ChatWindow } from "./ChatWindow";
import { FloatingChatButton } from "./FloatingChatButton";
import { useAuth } from "@/context/AuthContext";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useAuth();
    
    return (
        <ChatProvider>
            <div className="relative flex min-h-screen flex-col">
                <AppHeader />
                <main className="flex-1 pb-16 md:pb-0">{children}</main>
                <BottomNavBar />
                {isAuthenticated && (
                    <>
                        <ChatWindow />
                        <FloatingChatButton />
                    </>
                )}
            </div>
            <AuthModal />
            <Toaster />
        </ChatProvider>
    );
}
