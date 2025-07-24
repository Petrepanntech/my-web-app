
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { LayoutWrapper } from "@/components/shared/LayoutWrapper";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
            <LayoutWrapper>
              {children}
            </LayoutWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
