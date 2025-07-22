
"use client"
import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { allCourses, courseCategories } from '@/lib/courses-data';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

export default function CourseCategoryPage() {
    const params = useParams();
    const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

    const category = courseCategories.find(c => c.slug === slug);
    const courses = allCourses.filter(course => course.category === category?.title);
    
    const [level, setLevel] = useState('all');
    const [price, setPrice] = useState([50000]);

    const filteredCourses = courses.filter(course => {
        const levelMatch = level === 'all' || course.level.toLowerCase() === level;
        const priceMatch = course.price <= price[0];
        return levelMatch && priceMatch;
    });

    if (!category) {
        return <div className="container py-12 text-center">Category not found.</div>;
    }

    return (
        <div className="container py-12 px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">{category.title} Courses</h1>
                <p className="mt-4 max-w-2xl mx-auto text-xl text-muted-foreground">{category.description}</p>
            </div>
            <div className="grid lg:grid-cols-4 gap-8">
                <aside className="lg:col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle>Filters</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label>Level</Label>
                                <Select value={level} onValueChange={setLevel}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Level" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Levels</SelectItem>
                                        <SelectItem value="beginner">Beginner</SelectItem>
                                        <SelectItem value="intermediate">Intermediate</SelectItem>
                                        <SelectItem value="advanced">Advanced</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-4">
                                <Label>Max Price: ₦{price[0].toLocaleString()}</Label>
                                <Slider 
                                    min={5000} 
                                    max={50000} 
                                    step={1000}
                                    value={price}
                                    onValueChange={setPrice}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </aside>
                <main className="lg:col-span-3">
                     <div className="grid md:grid-cols-2 gap-6">
                        {filteredCourses.map(course => (
                            <Card key={course.id} className="flex flex-col">
                                <Image 
                                    src={course.image}
                                    alt={course.title}
                                    width={400}
                                    height={200}
                                    className="w-full h-48 object-cover rounded-t-lg"
                                    data-ai-hint={course.aiHint}
                                />
                                <CardHeader>
                                    <CardTitle>{course.title}</CardTitle>
                                    <CardDescription>{course.instructor}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow space-y-4">
                                    <div className="flex justify-between items-center">
                                        <Badge variant="outline">{course.level}</Badge>
                                        <div className="font-bold text-lg">₦{course.price.toLocaleString()}</div>
                                    </div>
                                     <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
                                </CardContent>
                                <CardFooter>
                                    <Button asChild className="w-full">
                                        <Link href="/course-payment">Enroll Now</Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                     </div>
                     {filteredCourses.length === 0 && (
                        <div className="text-center py-16 text-muted-foreground">
                            <p>No courses match your criteria.</p>
                        </div>
                     )}
                </main>
            </div>
        </div>
    );
}
