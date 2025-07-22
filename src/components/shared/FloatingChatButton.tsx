
import Link from "next/link";
import { Button } from "../ui/button";
import { MessageCircle } from "lucide-react";

export function FloatingChatButton({ href }: { href: string }) {
    return (
        <Button asChild className="fixed bottom-20 right-4 md:bottom-8 md:right-8 h-16 w-16 rounded-full shadow-lg z-40" size="icon">
            <Link href={href}>
                <MessageCircle className="h-8 w-8" />
                <span className="sr-only">Open Chat</span>
            </Link>
        </Button>
    )
}
