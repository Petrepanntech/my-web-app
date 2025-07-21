"use client";

import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { Role } from "@/types";

export function AuthModal() {
  const { showAuthModal, setShowAuthModal, login, selectedRole, setSelectedRole } = useAuth();

  const handleLogin = () => {
    if (selectedRole) {
      login(selectedRole);
    }
  };
  
  const handleSignup = () => {
    if (selectedRole) {
      login(selectedRole);
    }
  };

  return (
    <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
      <DialogContent className="sm:max-w-[425px]">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <DialogHeader>
              <DialogTitle>Login</DialogTitle>
              <DialogDescription>
                Select your role to login to your account.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <RoleSelector selectedRole={selectedRole} onRoleChange={setSelectedRole} />
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email-login" className="text-right">
                    Email
                    </Label>
                    <Input id="email-login" type="email" defaultValue="user@example.com" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="password-login" className="text-right">
                    Password
                    </Label>
                    <Input id="password-login" type="password" defaultValue="password" className="col-span-3" />
                </div>
            </div>
            <Button onClick={handleLogin} className="w-full" disabled={!selectedRole}>Login</Button>
          </TabsContent>
          <TabsContent value="signup">
            <DialogHeader>
              <DialogTitle>Sign Up</DialogTitle>
              <DialogDescription>
                Create a new account by selecting your role.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <RoleSelector selectedRole={selectedRole} onRoleChange={setSelectedRole} />
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name-signup" className="text-right">
                    Name
                    </Label>
                    <Input id="name-signup" placeholder="Your Name" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email-signup" className="text-right">
                    Email
                    </Label>
                    <Input id="email-signup" type="email" placeholder="your@email.com" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="password-signup" className="text-right">
                    Password
                    </Label>
                    <Input id="password-signup" type="password" className="col-span-3" />
                </div>
            </div>
            <Button onClick={handleSignup} className="w-full" disabled={!selectedRole}>Sign Up</Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

function RoleSelector({ selectedRole, onRoleChange }: { selectedRole: Role, onRoleChange: (role: Role) => void }) {
    return (
        <div className="space-y-2">
            <Label>I am a...</Label>
            <RadioGroup 
                value={selectedRole || ''} 
                onValueChange={(value) => onRoleChange(value as Role)} 
                className="grid grid-cols-2 gap-4"
            >
                <div>
                    <RadioGroupItem value="student" id="student" className="peer sr-only" />
                    <Label htmlFor="student" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                        Student
                    </Label>
                </div>
                <div>
                    <RadioGroupItem value="instructor" id="instructor" className="peer sr-only" />
                    <Label htmlFor="instructor" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                        Instructor
                    </Label>
                </div>
                <div>
                    <RadioGroupItem value="business" id="business" className="peer sr-only" />
                    <Label htmlFor="business" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                        Business
                    </Label>
                </div>
                <div>
                    <RadioGroupItem value="admin" id="admin" className="peer sr-only" />
                    <Label htmlFor="admin" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                        Admin
                    </Label>
                </div>
            </RadioGroup>
        </div>
    );
}
