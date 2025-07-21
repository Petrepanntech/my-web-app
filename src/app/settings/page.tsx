"use client"
import DashboardAuthWrapper from "@/components/auth/DashboardAuthWrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/context/AuthContext";

export default function SettingsPage() {
    const { user } = useAuth();
    
    // The wrapper will handle auth check and role validation.
    // For a global settings page, we just need to ensure the user is logged in.
    // We can pass `null` to allow any authenticated user, but that breaks Role type.
    // Let's assume a user must exist, and the wrapper just checks for any valid role.
    // For this mock, let's just use the current user's role.
    if (!user) return null; // Or a loading/redirect component

  return (
    <DashboardAuthWrapper requiredRole={user.role}>
        <div className="container mx-auto max-w-3xl py-12 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold mb-8">Settings</h1>
            <div className="space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Profile</CardTitle>
                        <CardDescription>Update your personal information.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" defaultValue={user?.name} />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" defaultValue={user?.email} />
                        </div>
                         <Button>Save Changes</Button>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Notifications</CardTitle>
                        <CardDescription>Manage your notification preferences.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                       <div className="flex items-center justify-between">
                            <div>
                                <Label htmlFor="email-notifications">Email Notifications</Label>
                                <p className="text-sm text-muted-foreground">Receive updates about courses and marketplace activity.</p>
                            </div>
                            <Switch id="email-notifications" defaultChecked />
                       </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <Label htmlFor="community-updates">Community Updates</Label>
                                <p className="text-sm text-muted-foreground">Get notified about new posts in the community hub.</p>
                            </div>
                            <Switch id="community-updates" />
                       </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </DashboardAuthWrapper>
  );
}
