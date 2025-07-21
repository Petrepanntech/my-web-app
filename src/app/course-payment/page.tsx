// This is a placeholder page for individual course payments.
// In a real application, this would likely be part of a modal or a dynamic route
// like /courses/[courseId]/enroll

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CoursePaymentPage() {
    const course = {
        title: "Advanced React & Next.js",
        price: "15,000"
    }

    return (
        <div className="container mx-auto max-w-lg py-12 px-4 sm:px-6 lg:px-8">
            <h1 className="text-center text-3xl font-bold mb-8">Enroll in Course</h1>
            <Card>
                <CardHeader>
                    <CardTitle>You are enrolling in:</CardTitle>
                    <CardDescription className="text-xl font-semibold text-foreground pt-2">{course.title}</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4">
                         <div className="text-3xl font-bold text-center py-4">
                            Total: ₦{course.price}
                        </div>
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
                    <Button size="lg" className="w-full">Pay ₦{course.price} and Enroll</Button>
                </CardFooter>
            </Card>
        </div>
    );
}
