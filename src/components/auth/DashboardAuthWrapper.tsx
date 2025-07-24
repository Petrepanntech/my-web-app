
"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import type { Role } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";

interface DashboardAuthWrapperProps {
  children: React.ReactNode;
  requiredRole: Role;
}

export default function DashboardAuthWrapper({ children, requiredRole }: DashboardAuthWrapperProps) {
  const { user, isAuthenticated, setShowAuthModal } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      // If not authenticated, show the auth modal
      setShowAuthModal(true);
      router.push("/");
    } else if (user?.role !== requiredRole) {
      // If role doesn't match, redirect to their own dashboard
      router.push(`/${user?.role}/dashboard`);
    }
  }, [isAuthenticated, user, requiredRole, router, setShowAuthModal]);

  // If authenticated and the role matches, render the children
  if (isAuthenticated && user?.role === requiredRole) {
    return <>{children}</>;
  }
  
  // Otherwise, render a skeleton or loading state while checks are performed
  // This prevents flashing content
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
