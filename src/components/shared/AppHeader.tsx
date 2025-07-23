
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
import { publicNavItems, allDashboardNavItems } from "@/lib/constants";
import { Input } from "../ui/input";
import { Card, CardContent } from "../ui/card";
import { CommandMenu } from "./CommandMenu";
import React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const mockNotifications = [
    { title: "New Bid Received", description: "You received a new bid on 'Build a Landing Page'.", time: "2m ago" },
    { title: "Assignment Graded", description: "Your 'State Management' assignment has been graded.", time: "1h ago" },
    { title: "Message from Aisha N.", description: "Hey, I'm available for a mentorship call this week.", time: "3h ago" },
    { title: "Welcome to the Community!", description: "Start by introducing yourself in the community hub.", time: "1d ago" },
];

export function AppHeader() {
  const { isAuthenticated, user, logout, setShowAuthModal } = useAuth();
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = React.useState(false);


  const userNavItems = user?.role ? allDashboardNavItems.find(group => group.label.toLowerCase() === user.role)?.items || [] : [];
  const navItems = isAuthenticated && user ? userNavItems : publicNavItems;

  return (
    <>
    <CommandMenu open={open} setOpen={setOpen} />
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="font-bold hidden sm:inline-block">
                Alternative Academy
            </span>
            </Link>
            <nav className="flex items-center gap-6 text-sm">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className="transition-colors hover:text-foreground/80 text-foreground/60"
                    >
                        {item.label}
                    </Link>
                ))}
            </nav>
        </div>
        <MobileNav />
        
        <div className="flex flex-1 items-center justify-end space-x-1 sm:space-x-2 md:space-x-4">
            <div className="flex-1 sm:flex-none sm:w-auto">
                 <Button
                    variant="outline"
                    className="relative h-9 w-full justify-start rounded-[0.5rem] text-sm text-muted-foreground sm:w-48 md:w-64 sm:pr-12"
                    onClick={() => setOpen(true)}
                >
                    <Search className="h-4 w-4 mr-2" />
                    <span className="hidden lg:inline-flex">Search anything...</span>
                     <span className="inline-flex lg:hidden">Search...</span>
                    <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                        <span className="text-xs">⌘</span>K
                    </kbd>
                </Button>
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
                    <DropdownMenuItem asChild>
                        <Link href={`/${user.role}/dashboard`}>Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild><Link href="/settings">Profile</Link></DropdownMenuItem>
                    <DropdownMenuItem asChild><Link href="/settings">Settings</Link></DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
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

                <DropdownMenuSeparator />
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
    </>
  );
}

function MobileNav() {
    const [open, setOpen] = React.useState(false)
    const pathname = usePathname()
    const { isAuthenticated, user } = useAuth();
    const navItems = isAuthenticated && user ? allDashboardNavItems.find(group => group.label.toLowerCase() === user.role)?.items || [] : publicNavItems;

    return (
        <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="pr-0">
          <Link
            href="/"
            className="mr-6 flex items-center space-x-2"
            onClick={() => setOpen(false)}
            >
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="font-bold">Alternative Academy</span>
          </Link>
          <SheetHeader>
            <SheetTitle className="sr-only">Mobile Navigation</SheetTitle>
          </SheetHeader>
          <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "text-muted-foreground",
                    pathname === item.href && "text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    )
}
