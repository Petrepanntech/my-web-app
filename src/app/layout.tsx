import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { AppHeader } from "@/components/shared/AppHeader";
import { AuthModal } from "@/components/auth/AuthModal";
import { Toaster } from "@/components/ui/toaster";
import { LayoutWrapper } from "@/components/shared/LayoutWrapper";

export const metadata: Metadata = {
  title: "Alternative Academy",
  description: "Empowering Nigerian youth with AI-driven education and a freelance marketplace.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <AuthProvider>
            <LayoutWrapper>
              {children}
            </LayoutWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
