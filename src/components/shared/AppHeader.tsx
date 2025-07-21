"use client";

import Link from "next/link";
import { Menu, GraduationCap } from "lucide-react";

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
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { allDashboardNavItems, publicNavItems } from "@/lib/constants";
import { Separator } from "../ui/separator";

export function AppHeader() {
  const { isAuthenticated, user, logout, setShowAuthModal } = useAuth();

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
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {publicNavItems.map(item => (
                <Link key={item.label} href={item.href} className="transition-colors hover:text-foreground/80 text-foreground/60">
                    {item.label}
                </Link>
            ))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2">
          {isAuthenticated && user ? (
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
                <DropdownMenuItem onClick={logout}>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <div className="hidden md:flex items-center gap-2">
                <Button variant="ghost" onClick={() => setShowAuthModal(true)}>
                  Login
                </Button>
                <Button onClick={() => setShowAuthModal(true)}>Sign Up</Button>
              </div>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="md:hidden">
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Open navigation menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right">
                        <SheetHeader className="sr-only">
                          <SheetTitle>Mobile Menu</SheetTitle>
                          <SheetDescription>Navigation links for mobile view.</SheetDescription>
                        </SheetHeader>
                        <nav className="grid gap-6 text-lg font-medium mt-8">
                            {publicNavItems.map((item) => (
                                <SheetClose key={item.href} asChild>
                                    <Link href={item.href} className="hover:text-primary">{item.label}</Link>
                                </SheetClose>
                            ))}
                            <Separator />
                            <SheetClose asChild>
                                <Button variant="ghost" onClick={() => setShowAuthModal(true)}>Login</Button>
                            </SheetClose>
                             <SheetClose asChild>
                                <Button onClick={() => setShowAuthModal(true)}>Sign Up</Button>
                            </SheetClose>
                        </nav>
                    </SheetContent>
                </Sheet>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
