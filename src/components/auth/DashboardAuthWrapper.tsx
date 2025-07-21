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
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    // This effect runs on the client after hydration.
    // We can safely check auth state and redirect.
    if (!isAuthenticated) {
      router.push("/");
    } else if (user?.role !== requiredRole) {
      // Redirect to their own dashboard or a generic home page if role doesn't match
      router.push(`/${user?.role}/dashboard`);
    } else {
        setIsLoading(false);
    }
  }, [isAuthenticated, user, requiredRole, router]);

  if (isLoading) {
    return <DashboardSkeleton />;
  }
  
  return <>{children}</>;
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
