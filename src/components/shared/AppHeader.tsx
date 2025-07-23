
"use client";

import Link from "next/link";
import { Menu, GraduationCap, Search, Bell, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { allDashboardNavItems } from "@/lib/constants";
import { Input } from "../ui/input";
import { Card, CardContent } from "../ui/card";

const mockNotifications = [
    { title: "New Bid Received", description: "You received a new bid on 'Build a Landing Page'.", time: "2m ago" },
    { title: "Assignment Graded", description: "Your 'State Management' assignment has been graded.", time: "1h ago" },
    { title: "Message from Aisha N.", description: "Hey, I'm available for a mentorship call this week.", time: "3h ago" },
    { title: "Welcome to the Community!", description: "Start by introducing yourself in the community hub.", time: "1d ago" },
];

export function AppHeader() {
  const { isAuthenticated, user, logout, setShowAuthModal } = useAuth();
  const { setTheme } = useTheme();

  const userNavItems = user?.role ? allDashboardNavItems.find(group => group.label.toLowerCase() === user.role)?.items || [] : [];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <GraduationCap className="h-6 w-6 text-primary" />
          <span className="font-bold hidden sm:inline-block">
            Alternative Academy
          </span>
           <span className="font-bold inline-block sm:hidden">
            AA
          </span>
        </Link>
        
        <div className="flex flex-1 items-center justify-end space-x-2 md:space-x-4">
            <div className="relative w-full max-w-xs sm:max-w-sm hidden sm:block">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search..." className="pl-8" />
            </div>
          {isAuthenticated && user ? (
            <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <div className="relative">
                            <Bell className="h-5 w-5" />
                            <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                            </span>
                        </div>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80" align="end">
                    <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <div className="space-y-2 p-2">
                    {mockNotifications.map((notification, index) => (
                       <div key={index} className="text-sm p-2 rounded-md hover:bg-muted">
                            <p className="font-semibold">{notification.title}</p>
                            <p className="text-xs text-muted-foreground">{notification.description}</p>
                            <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                       </div>
                    ))}
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Navigation</DropdownMenuLabel>
                    {userNavItems.map((item) => (
                        <DropdownMenuItem key={item.href} asChild>
                            <Link href={item.href}>{item.label}</Link>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild><Link href="/settings">Settings</Link></DropdownMenuItem>
                 <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="ml-2">Toggle theme</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                        <DropdownMenuItem onClick={() => setTheme("light")}>
                            Light
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("dark")}>
                            Dark
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("system")}>
                            System
                        </DropdownMenuItem>
                        </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                </DropdownMenuSub>

                <DropdownMenuItem onClick={logout}>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            </>
          ) : (
             <div className="hidden md:flex items-center gap-2">
                <Button variant="ghost" onClick={() => setShowAuthModal(true)}>
                  Login
                </Button>
                <Button onClick={() => setShowAuthModal(true)}>Sign Up</Button>
              </div>
          )}
        </div>
      </div>
    </header>
  );
}
