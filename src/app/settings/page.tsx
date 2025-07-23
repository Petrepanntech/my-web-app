
"use client"
import { useState, useEffect } from "react";
import DashboardAuthWrapper from "@/components/auth/DashboardAuthWrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "next-themes";
import { useToast } from "@/hooks/use-toast";

export default function SettingsPage() {
    const { user, updateUser } = useAuth();
    const { theme, setTheme } = useTheme();
    const { toast } = useToast();
    
    const [name, setName] = useState('');

    useEffect(() => {
        if (user) {
            setName(user.name);
        }
    }, [user]);

    const handleProfileSave = () => {
        updateUser({ name });
        toast({
            title: "Success",
            description: "Your profile has been updated."
        });
    }
    
    // The wrapper will handle auth check and role validation, but we need to ensure user exists before rendering.
    if (!user) {
        // Render nothing or a loading spinner while user data is being fetched by the context
        return null;
    }

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
                            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" defaultValue={user?.email} disabled />
                        </div>
                         <Button onClick={handleProfileSave}>Save Changes</Button>
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle>Theme</CardTitle>
                        <CardDescription>Customize the look and feel of the app.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                             <div>
                                <Label htmlFor="dark-mode">Dark Mode</Label>
                                <p className="text-sm text-muted-foreground">Toggle between light and dark themes.</p>
                            </div>
                           <Switch
                                id="dark-mode"
                                checked={theme === 'dark'}
                                onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                            />
                        </div>
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

                 <Card>
                    <CardHeader>
                        <CardTitle>Security</CardTitle>
                        <CardDescription>Manage your account security settings.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="current-password">Current Password</Label>
                            <Input id="current-password" type="password" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="new-password">New Password</Label>
                            <Input id="new-password" type="password" />
                        </div>
                         <Button>Change Password</Button>
                    </CardContent>
                </Card>

                 <Card className="border-destructive">
                    <CardHeader>
                        <CardTitle className="text-destructive">Danger Zone</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-semibold">Delete Account</p>
                                <p className="text-sm text-muted-foreground">Permanently delete your account and all associated data. This action cannot be undone.</p>
                            </div>
                             <Button variant="destructive">Delete My Account</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </DashboardAuthWrapper>
  );
}
