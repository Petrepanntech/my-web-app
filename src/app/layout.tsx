import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { AppHeader } from "@/components/shared/AppHeader";
import { AuthModal } from "@/components/auth/AuthModal";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

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
      <body className={`${inter.variable} font-sans antialiased`}>
        <AuthProvider>
          <div className="relative flex min-h-screen flex-col">
            <AppHeader />
            <div className="flex-1 pt-8 md:pt-12">{children}</div>
          </div>
          <AuthModal />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
