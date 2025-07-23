
"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
  LayoutDashboard,
  Book,
  Briefcase,
  TestTube2,
  Users
} from "lucide-react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { useAuth } from "@/context/AuthContext"

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export function CommandMenu({open, setOpen}: Props) {
    const router = useRouter();
    const { user } = useAuth();
  
    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
        if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
            e.preventDefault()
            setOpen((open) => !open)
        }
        }
        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [setOpen])

    const runCommand = (command: () => unknown) => {
        setOpen(false)
        command()
    }

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem onSelect={() => runCommand(() => router.push('/courses'))}>
            <Book className="mr-2 h-4 w-4" />
            <span>Courses</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push('/marketplace/tasks'))}>
            <Briefcase className="mr-2 h-4 w-4" />
            <span>Marketplace</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push('/community'))}>
            <Users className="mr-2 h-4 w-4" />
            <span>Community</span>
          </CommandItem>
        </CommandGroup>
        {user &&
            <>
                <CommandSeparator />
                <CommandGroup heading="My Dashboard">
                    <CommandItem onSelect={() => runCommand(() => router.push(`/${user.role}/dashboard`))}>
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => router.push(`/${user.role}/courses`))}>
                        <Book className="mr-2 h-4 w-4" />
                        <span>My Courses</span>
                    </CommandItem>
                    {user.role === 'student' && 
                        <CommandItem onSelect={() => runCommand(() => router.push(`/student/cbt-practice`))}>
                            <TestTube2 className="mr-2 h-4 w-4" />
                            <span>CBT Practice</span>
                        </CommandItem>
                    }
                </CommandGroup>
            </>
        }
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem onSelect={() => runCommand(() => router.push('/settings'))}>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push('/settings'))}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
