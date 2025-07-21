import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";

export default function PaymentPage() {
    return (
        <div className="container mx-auto max-w-4xl py-12 px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12">
                <div>
                    <h1 className="text-3xl font-bold">Complete Your Subscription</h1>
                    <p className="text-muted-foreground mt-2">You're one step away from unlocking your potential.</p>
                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle>Annual Plan</CardTitle>
                            <div className="text-3xl font-bold">₦25,000 <span className="text-lg font-normal text-muted-foreground">/ year</span></div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <p className="font-semibold">What's included:</p>
                             <ul className="space-y-2 text-sm text-muted-foreground">
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Access to all courses</li>
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> AI-Personalized learning paths</li>
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Freelance marketplace access</li>
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Community and mentorship</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Payment Details</CardTitle>
                            <CardDescription>Enter your card details to complete payment.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="card-number">Card Number</Label>
                                    <Input id="card-number" placeholder="0000 0000 0000 0000" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="expiry">Expiry Date</Label>
                                        <Input id="expiry" placeholder="MM / YY" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="cvc">CVC</Label>
                                        <Input id="cvc" placeholder="123" />
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                        <CardFooter>
                            <Button size="lg" className="w-full">Pay ₦25,000</Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}
