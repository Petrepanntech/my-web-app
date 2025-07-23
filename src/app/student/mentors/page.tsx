
import DashboardAuthWrapper from "@/components/auth/DashboardAuthWrapper";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import Link from "next/link";

const mentors = [
  {
    name: "Samuel Adebayo",
    title: "Senior Full-Stack Engineer",
    specialties: ["React", "Node.js", "GraphQL"],
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    status: "Your Mentor"
  },
  {
    name: "Aisha Nwosu",
    title: "Head of Product Design @ Paystack",
    specialties: ["UI/UX", "Figma", "Design Systems"],
    avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&h=100&fit=crop",
    status: "Available"
  },
  {
    name: "Dr. Evelyn Reed",
    title: "Lead Data Scientist",
    specialties: ["Machine Learning", "Python", "AI Ethics"],
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop",
    status: "Busy"
  },
   {
    name: "Tunde Oladipo",
    title: "Growth Marketing Expert",
    specialties: ["SEO", "Content Marketing", "PPC"],
    avatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=100&h=100&fit=crop",
    status: "Available"
  }
];

export default function Page() {
    return (
        <DashboardAuthWrapper requiredRole="student">
            <div className="container p-4 sm:p-6 lg:p-8">
                <div className="text-center mb-12">
                     <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">This page has been removed</h1>
                </div>
            </div>
        </DashboardAuthWrapper>
    );
}
