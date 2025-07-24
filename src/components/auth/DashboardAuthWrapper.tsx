"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import type { Role } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

interface DashboardAuthWrapperProps {
  children: React.ReactNode;
  requiredRole: Role;
}

export default function DashboardAuthWrapper({ children, requiredRole }: DashboardAuthWrapperProps) {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // We only want to perform checks after the initial loading is done
    if (!loading) {
      if (!isAuthenticated) {
        // If not authenticated, show the auth modal
        router.push("/");
      } else if (user?.role !== requiredRole) {
        // If role doesn't match, redirect to their own dashboard
        router.push(`/${user?.role}/dashboard`);
      }
    }
  }, [loading, isAuthenticated, user, requiredRole, router]);

  // Use the loading state from the AuthContext
  if (loading) {
    return (
        <div className="flex items-center justify-center h-screen">
            <Loader2 className="h-8 w-8 animate-spin" />
        </div>
    );
  }

  // If authenticated and the role matches, render the children
  if (isAuthenticated && user?.role === requiredRole) {
    return <>{children}</>;
  }
  
  // If the logic above is still processing or redirecting, show a skeleton
  return <DashboardSkeleton />;
}

function DashboardSkeleton() {
    return (
        <div className="container py-8">
            <Skeleton className="h-12 w-1/4 mb-8" />
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-32 w-full" />
            </div>
        </div>
    )
}
