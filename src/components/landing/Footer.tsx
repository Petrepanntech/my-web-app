import Link from "next/link";
import { GraduationCap } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full py-6 px-4 md:px-6 border-t bg-background">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
            <Link href="/" className="flex items-center space-x-2">
                <GraduationCap className="h-6 w-6 text-primary" />
                <span className="font-bold">Alternative Academy</span>
            </Link>
            <p className="text-sm text-muted-foreground text-center md:text-left">
                © {new Date().getFullYear()} Alternative Academy. All rights reserved.
            </p>
            <nav className="flex gap-4 sm:gap-6">
                <Link href="/about" className="text-sm hover:underline underline-offset-4">
                About
                </Link>
                <Link href="/community" className="text-sm hover:underline underline-offset-4">
                Community
                </Link>
            </nav>
        </div>
    </footer>
  );
}
