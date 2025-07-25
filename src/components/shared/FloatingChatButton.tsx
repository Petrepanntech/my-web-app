
"use client"
import Link from "next/link";
import { Button } from "../ui/button";
import { MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import AIBuddyPage from "@/app/student/ai-buddy/page";


export function FloatingChatButton({ href }: { href: string }) {
    const pathname = usePathname();

    // Don't render the chat button on the chat page itself
    if (pathname === href) {
        return null;
    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                 <Button className="fixed bottom-20 right-4 md:bottom-8 md:right-8 h-16 w-16 rounded-full shadow-lg z-40" size="icon">
                    <MessageCircle className="h-8 w-8" />
                    <span className="sr-only">Open Chat</span>
                </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:w-3/4 lg:w-1/2 xl:w-1/3 p-0 border-none">
                <SheetHeader>
                  <SheetTitle>P.L.I.H</SheetTitle>
                  <SheetDescription>
                    Chat with P.L.I.H (Petrepann's Little Helper), your personal AI assistant. You can ask questions and get help with your learning.
                  </SheetDescription>
                </SheetHeader>
                <AIBuddyPage />
            </SheetContent>
        </Sheet>
    )
}
