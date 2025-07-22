
"use client"
import DashboardAuthWrapper from "@/components/auth/DashboardAuthWrapper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ChartTooltipContent, ChartContainer } from "@/components/ui/chart";
import { DollarSign, Users, BookOpen, Activity } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const chartData = [
  { month: "Jan", signups: 120 }, { month: "Feb", signups: 200 }, { month: "Mar", signups: 180 },
  { month: "Apr", signups: 280 }, { month: "May", signups: 350 }, { month: "Jun", signups: 420 },
];

const chartConfig = {
  signups: {
    label: "Signups",
    color: "hsl(var(--primary))",
  },
};

const recentTransactions = [
    { id: "TXN123", user: "Adeola Peters", type: "Subscription", amount: "₦25,000", status: "Success" },
    { id: "TXN124", user: "Innovate Inc.", type: "Task Payment", amount: "₦80,000", status: "Success" },
    { id: "TXN125", user: "Chinedu Okoro", type: "Subscription", amount: "₦25,000", status: "Success" },
    { id: "TXN126", user: "Samuel Adebayo", type: "Withdrawal", amount: "₦150,000", status: "Pending" },
    { id: "TXN127", user: "Aisha Nwosu", type: "Course Sale", amount: "₦15,000", status: "Success" },
]

export default function Page() {
    return (
        <DashboardAuthWrapper requiredRole="admin">
            <div className="container p-4 sm:p-6 lg:p-8">
                 <div className="mb-12">
                    <h1 className="text-4xl font-extrabold tracking-tight">Admin Dashboard</h1>
                    <p className="mt-2 text-xl text-muted-foreground">
                       Platform overview and key metrics at a glance.
                    </p>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">₦6,550,000</div>
                            <p className="text-xs text-muted-foreground">+12.5% from last month</p>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">1,832</div>
                            <p className="text-xs text-muted-foreground">+50 new this month</p>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
                            <BookOpen className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">84</div>
                            <p className="text-xs text-muted-foreground">+5 new this month</p>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Marketplace Tasks</CardTitle>
                            <Activity className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">215</div>
                            <p className="text-xs text-muted-foreground">32 active</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-8 lg:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>New User Signups</CardTitle>
                            <CardDescription>Last 6 months</CardDescription>
                        </CardHeader>
                        <CardContent className="h-80">
                           <ChartContainer config={chartConfig} className="w-full h-full">
                               <LineChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip content={<ChartTooltipContent />} />
                                    <Line type="monotone" dataKey="signups" stroke="hsl(var(--primary))" activeDot={{ r: 8 }} />
                                </LineChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Transactions</CardTitle>
                            <CardDescription>A log of the latest financial activities.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>User</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead className="text-right">Amount</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {recentTransactions.map((tx) => (
                                        <TableRow key={tx.id}>
                                            <TableCell>
                                                <div className="font-medium">{tx.user}</div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={tx.type === "Withdrawal" ? "destructive" : "outline"}>{tx.type}</Badge>
                                            </TableCell>
                                            <TableCell className="text-right">{tx.amount}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardAuthWrapper>
    );
}
