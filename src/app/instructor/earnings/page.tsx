
"use client"
import DashboardAuthWrapper from "@/components/auth/DashboardAuthWrapper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Banknote } from "lucide-react";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import dynamic from 'next/dynamic';
import { Skeleton } from "@/components/ui/skeleton";

const ResponsiveContainer = dynamic(() => import('recharts').then(mod => mod.ResponsiveContainer), { 
    ssr: false,
    loading: () => <Skeleton className="h-full w-full" /> 
});
const AreaChart = dynamic(() => import('recharts').then(mod => mod.AreaChart), { ssr: false });
const Area = dynamic(() => import('recharts').then(mod => mod.Area), { ssr: false });
const XAxis = dynamic(() => import('recharts').then(mod => mod.XAxis), { ssr: false });
const YAxis = dynamic(() => import('recharts').then(mod => mod.YAxis), { ssr: false });
const Tooltip = dynamic(() => import('recharts').then(mod => mod.Tooltip), { ssr: false });
const CartesianGrid = dynamic(() => import('recharts').then(mod => mod.CartesianGrid), { ssr: false });

const earningsData = [
  { date: "Jan", earnings: 50000 },
  { date: "Feb", earnings: 75000 },
  { date: "Mar", earnings: 120000 },
  { date: "Apr", earnings: 95000 },
  { date: "May", earnings: 150000 },
  { date: "Jun", earnings: 180000 },
];

const chartConfig = {
  earnings: {
    label: "Earnings (₦)",
    color: "hsl(var(--primary))",
  },
};

const payoutHistory = [
    { id: "PAYOUT005", date: "2024-07-15", amount: "₦150,000", status: "Completed" },
    { id: "PAYOUT004", date: "2024-06-15", amount: "₦125,000", status: "Completed" },
    { id: "PAYOUT003", date: "2024-05-15", amount: "₦90,000", status: "Completed" },
]


export default function Page() {
    return (
        <DashboardAuthWrapper requiredRole="mentor">
            <div className="container p-4 sm:p-6 lg:p-8">
                 <div className="mb-12">
                    <h1 className="text-4xl font-extrabold tracking-tight">Earnings & Payouts</h1>
                    <p className="mt-2 text-xl text-muted-foreground">
                       Track your revenue and manage your withdrawals.
                    </p>
                </div>
                
                <div className="grid gap-8">
                    <div className="grid md:grid-cols-2 gap-8">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Available for Payout</CardTitle>
                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">₦215,000</div>
                                <p className="text-xs text-muted-foreground">Next payout on Aug 15, 2024</p>
                                <Button className="mt-4">Request Payout</Button>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Lifetime Earnings</CardTitle>
                                <Banknote className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">₦850,000</div>
                                <p className="text-xs text-muted-foreground">From 2 published courses</p>
                            </CardContent>
                        </Card>
                    </div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Earnings this Year</CardTitle>
                        </CardHeader>
                        <CardContent className="h-80">
                           <ChartContainer config={chartConfig} className="w-full h-full">
                               <AreaChart data={earningsData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis tickFormatter={(value) => `₦${value/1000}k`} />
                                    <Tooltip content={<ChartTooltipContent />} />
                                    <Area type="monotone" dataKey="earnings" stroke="hsl(var(--primary))" fill="url(#colorEarnings)" />
                                </AreaChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle>Payout History</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Payout ID</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Amount</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {payoutHistory.map((payout) => (
                                        <TableRow key={payout.id}>
                                            <TableCell className="font-medium">{payout.id}</TableCell>
                                            <TableCell>{payout.date}</TableCell>
                                            <TableCell><Badge variant="secondary">{payout.status}</Badge></TableCell>
                                            <TableCell className="text-right font-semibold">{payout.amount}</TableCell>
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
