
"use client"
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { courseCategories } from '@/lib/courses-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';


export default function CourseCategoryPage() {
    const params = useParams();
    const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

    const category = courseCategories.find(c => c.slug === slug);
    
    if (!category) {
        return <div className="container py-12 text-center">Category not found.</div>;
    }

    return (
        <div className="container py-12 px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">{category.title} Courses</h1>
                <p className="mt-4 max-w-2xl mx-auto text-xl text-muted-foreground">{category.description}</p>
            </div>
            <main>
                 <Card>
                    <CardHeader>
                        <CardTitle>AI-Powered Learning</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-muted-foreground">
                            In Alternative Academy, you don't browse static course lists. Instead, our AI crafts a personalized learning path just for you.
                        </p>
                        <p className="text-muted-foreground">
                           Once your path is generated, the AI builds a custom course, curating the best free resources from around the web to help you achieve your goals.
                        </p>
                         <Button asChild>
                            <Link href="/student/learning-path">
                                Generate Your Learning Path
                            </Link>
                        </Button>
                    </CardContent>
                 </Card>
            </main>
        </div>
    );
}
