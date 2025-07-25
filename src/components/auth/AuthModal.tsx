
"use client";

import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "../ui/label";
import type { Role } from "@/types";

export function AuthModal() {
  const { showAuthModal, setShowAuthModal, selectedRole, setSelectedRole, login } = useAuth();
  
  const handleLogin = () => {
      login(selectedRole);
  };

  return (
    <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Select Your Role</DialogTitle>
          <DialogDescription>
            Choose your role to access the appropriate dashboard. This is a mock authentication.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
            <RoleSelector selectedRole={selectedRole} onRoleChange={setSelectedRole} />
        </div>
        <DialogFooter>
          <Button onClick={handleLogin} disabled={!selectedRole}>Login</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function RoleSelector({ selectedRole, onRoleChange }: { selectedRole: Role, onRoleChange: (role: Role) => void }) {
    return (
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
                <RadioGroupItem value="mentor" id="mentor" className="peer sr-only" />
                <Label htmlFor="mentor" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                    Mentor
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
    );
}
