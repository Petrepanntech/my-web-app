
import DashboardAuthWrapper from "@/components/auth/DashboardAuthWrapper";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreVertical, Search } from "lucide-react";

const users = [
    { name: "Student User", email: "student@example.com", role: "student", status: "Active", joined: "2024-01-15", avatar: "https://i.pravatar.cc/150?u=student" },
    { name: "Instructor User", email: "instructor@example.com", role: "instructor", status: "Active", joined: "2024-01-20", avatar: "https://i.pravatar.cc/150?u=instructor" },
    { name: "Business User", email: "business@example.com", role: "business", status: "Active", joined: "2024-02-10", avatar: "https://i.pravatar.cc/150?u=business" },
    { name: "Admin User", email: "admin@example.com", role: "admin", status: "Active", joined: "2024-01-01", avatar: "https://i.pravatar.cc/150?u=admin" },
    { name: "Adeola Peters", email: "adeola@example.com", role: "student", status: "Suspended", joined: "2024-03-05", avatar: "https://i.pravatar.cc/150?u=adeola" },
    { name: "Samuel Adebayo", email: "samuel@example.com", role: "instructor", status: "Active", joined: "2024-02-22", avatar: "https://i.pravatar.cc/150?u=samuel" },
];


export default function Page() {
    return (
        <DashboardAuthWrapper requiredRole="admin">
            <div className="container p-4 sm:p-6 lg:p-8">
                 <div className="mb-12">
                    <h1 className="text-4xl font-extrabold tracking-tight">User Management</h1>
                    <p className="mt-2 text-xl text-muted-foreground">
                       View, edit, and manage all user accounts on the platform.
                    </p>
                </div>
                
                <Card>
                    <CardHeader>
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                                <CardTitle>All Users</CardTitle>
                                <CardDescription>Total of {users.length} users found.</CardDescription>
                            </div>
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Search users..." className="pl-8 w-full md:w-64" />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>User</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Date Joined</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.map((user) => (
                                    <TableRow key={user.email}>
                                        <TableCell>
                                            <div className="flex items-center gap-4">
                                                <Avatar>
                                                    <AvatarImage src={user.avatar} />
                                                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <div className="font-medium">{user.name}</div>
                                                    <div className="text-sm text-muted-foreground">{user.email}</div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="capitalize">{user.role}</TableCell>
                                        <TableCell>
                                            <Badge variant={user.status === "Active" ? "secondary" : "destructive"}>{user.status}</Badge>
                                        </TableCell>
                                        <TableCell>{user.joined}</TableCell>
                                        <TableCell className="text-right">
                                             <Button variant="ghost" size="icon">
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </DashboardAuthWrapper>
    );
}
