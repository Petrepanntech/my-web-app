
import DashboardAuthWrapper from "@/components/auth/DashboardAuthWrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Copy, DollarSign } from "lucide-react";

const referralLink = "https://alt.academy/join?ref=stud123";

const transactionHistory = [
    { type: "Referral Bonus", amount: "+ ₦1,000", date: "2024-08-01", details: "From Chinedu Okoro" },
    { type: "Task Payment", amount: "+ ₦25,000", date: "2024-07-25", details: "Project: Figma Mockup" },
    { type: "Withdrawal", amount: "- ₦15,000", date: "2024-07-20", details: "To GTBank ******5432" },
    { type: "Referral Bonus", amount: "+ ₦1,000", date: "2024-07-18", details: "From Adeola Peters" },
];

export default function Page() {
    return (
        <DashboardAuthWrapper requiredRole="student">
            <div className="container p-4 sm:p-6 lg:p-8">
                 <div className="mb-12">
                    <h1 className="text-4xl font-extrabold tracking-tight">Wallet & Referrals</h1>
                    <p className="mt-2 text-xl text-muted-foreground">
                       Manage your earnings and invite friends to join.
                    </p>
                </div>
                
                <div className="grid gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-1 space-y-8">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <DollarSign className="h-6 w-6" />
                                    My Wallet
                                </CardTitle>
                            </CardHeader>
                             <CardContent className="text-center">
                                <p className="text-sm text-muted-foreground">Current Balance</p>
                                <p className="text-4xl font-bold mt-2 mb-4">₦12,000</p>
                                <Button className="w-full">Withdraw Funds</Button>
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader>
                                <CardTitle>Refer a Friend</CardTitle>
                                <CardDescription>Earn ₦1,000 for every friend who signs up and subscribes!</CardDescription>
                            </CardHeader>
                             <CardContent>
                                <div className="flex gap-2">
                                    <Input value={referralLink} readOnly />
                                    <Button size="icon" variant="outline"><Copy className="h-4 w-4"/></Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                     <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Transaction History</CardTitle>
                            </CardHeader>
                            <CardContent>
                                 <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Description</TableHead>
                                            <TableHead className="text-right">Amount</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {transactionHistory.map((tx) => (
                                            <TableRow key={tx.details}>
                                                <TableCell className="text-xs text-muted-foreground">{tx.date}</TableCell>
                                                <TableCell>
                                                    <div className="font-medium">{tx.type}</div>
                                                    <div className="text-xs text-muted-foreground">{tx.details}</div>
                                                </TableCell>
                                                <TableCell className={`text-right font-semibold ${tx.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>{tx.amount}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </DashboardAuthWrapper>
    );
}
