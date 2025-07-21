import DashboardAuthWrapper from "@/components/auth/DashboardAuthWrapper";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const cbtCategories = [
    { name: "JAMB", description: "Practice for Joint Admissions and Matriculation Board exams." },
    { name: "WAEC", description: "Prepare for the West African Senior School Certificate Examination." },
    { name: "Post-UTME", description: "Get ready for university-specific entrance examinations." },
    { name: "NECO", description: "Practice for the National Examinations Council tests." },
    { name: "Aptitude Tests", description: "Sharpen your skills for job-related aptitude tests." },
];


export default function CbtPracticePage() {
    return (
        <DashboardAuthWrapper requiredRole="student">
            <div className="container mx-auto max-w-4xl py-12">
                <div className="text-center mb-12">
                     <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">CBT Practice Center</h1>
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
                       Excel in your exams with our comprehensive practice tests.
                    </p>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {cbtCategories.map(cat => (
                        <Link href={`/student/cbt-practice/${cat.name.toLowerCase()}`} key={cat.name}>
                            <Card className="hover:border-primary transition-colors h-full">
                                <CardHeader>
                                    <CardTitle>{cat.name}</CardTitle>
                                    <CardDescription>{cat.description}</CardDescription>
                                </CardHeader>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </DashboardAuthWrapper>
    );
}
