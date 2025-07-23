
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, Briefcase, Users, LayoutDashboard, TestTube2, UserCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import type { Role } from "@/types";

const baseNavItems = [
  { href: "/", label: "Home", icon: Home, roles: null },
  { href: "/courses", label: "Courses", icon: BookOpen, roles: null },
  { href: "/marketplace/tasks", label: "Marketplace", icon: Briefcase, roles: null },
  { href: "/community", label: "Community", icon: Users, roles: null },
];

const studentNavItems = [
  { href: "/student/dashboard", label: "Home", icon: LayoutDashboard },
  { href: "/student/courses", label: "Courses", icon: BookOpen },
  { href: "/marketplace/tasks", label: "Tasks", icon: Briefcase },
  { href: "/student/cbt-practice", label: "CBT", icon: TestTube2 },
];

const instructorNavItems = [
    { href: "/instructor/dashboard", label: "Home", icon: LayoutDashboard },
    { href: "/instructor/courses", label: "Courses", icon: BookOpen },
    { href: "/instructor/students", label: "Students", icon: Users },
    { href: "/instructor/earnings", label: "Earnings", icon: UserCircle },
];

const businessNavItems = [
    { href: "/business/dashboard", label: "Home", icon: LayoutDashboard },
    { href: "/business/tasks", label: "Tasks", icon: Briefcase },
    { href: "/business/mou", label: "MOUs", icon: BookOpen },
    { href: "/business/consultancy", label: "Consult", icon: UserCircle },
];

const adminNavItems = [
    { href: "/admin/dashboard", label: "Home", icon: LayoutDashboard },
    { href: "/admin/user-management", label: "Users", icon: Users },
    { href: "/admin/course-management", label: "Courses", icon: BookOpen },
    { href: "/admin/marketplace-admin", label: "Marketplace", icon: Briefcase },
];


const navItemsByRole: Record<Role | 'public', typeof baseNavItems> = {
    public: baseNavItems,
    student: studentNavItems,
    instructor: instructorNavItems,
    business: businessNavItems,
    admin: adminNavItems,
    null: baseNavItems,
}

export function BottomNavBar() {
  const pathname = usePathname();
  const { user, isAuthenticated } = useAuth();
  
  // Don't show the nav bar on these pages
  const hiddenPaths = [
      /^\/student\/cbt-practice\/setup\/.*$/, // e.g. /student/cbt-practice/setup/jamb
      /^\/student\/cbt-practice\/test\/.*$/, // e.g. /student/cbt-practice/test/jamb
      /^\/student\/cbt-practice\/results$/,
      /^\/marketplace\/tasks\/[^/]+$/, // e.g., /marketplace/tasks/1
  ];

  if(hiddenPaths.some(path => path.test(pathname))) return null;

  const currentNavItems = navItemsByRole[user?.role || 'public'];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-background border-t z-50">
      <div className="flex justify-around items-center h-full">
        {currentNavItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link key={href} href={href} className="flex flex-col items-center justify-center flex-1 h-full">
              <Icon className={cn("h-6 w-6 mb-1", isActive ? "text-primary-foreground bg-primary p-1 rounded-md" : "text-muted-foreground")} />
              <span className={cn("text-xs", isActive ? "text-primary" : "text-muted-foreground")}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
