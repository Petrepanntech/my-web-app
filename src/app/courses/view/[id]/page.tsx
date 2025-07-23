
"use client"
import { useParams } from 'next/navigation';
import DashboardAuthWrapper from "@/components/auth/DashboardAuthWrapper";
import { allCourses } from '@/lib/courses-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CheckCircle, Circle, PlayCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { BackButton } from '@/components/shared/BackButton';

const courseCurriculum = {
    '1': [
        { title: 'Module 1: Introduction to HTML', completed: true, lessons: ['What is HTML?', 'Basic Tags', 'Lists and Tables'] },
        { title: 'Module 2: Styling with CSS', completed: true, lessons: ['CSS Selectors', 'The Box Model', 'Flexbox'] },
        { title: 'Module 3: JavaScript Fundamentals', completed: true, lessons: ['Variables and Data Types', 'Functions', 'DOM Manipulation'] },
        { title: 'Module 4: Final Project', completed: true, lessons: ['Build a Personal Portfolio'] },
    ],
    '2': [
        { title: 'Module 1: React Basics', completed: true, lessons: ['Components and Props', 'State and Lifecycle', 'Handling Events'] },
        { title: 'Module 2: Hooks Deep Dive', completed: true, lessons: ['useState', 'useEffect', 'useContext'] },
        { title: 'Module 3: State Management', completed: true, lessons: ['Introduction to Zustand', 'Creating Stores', 'Async Actions'] },
        { title: 'Module 4: Final Project', completed: false, lessons: ['Build a Full-Stack E-commerce App'] },
    ],
    '3': [
        { title: 'Module 1: Introduction to Node.js', completed: true, lessons: ['Node.js Architecture', 'NPM and Modules'] },
        { title: 'Module 2: Express.js', completed: true, lessons: ['Routing', 'Middleware', 'Request and Response'] },
        { title: 'Module 3: Building a RESTful API', completed: true, lessons: ['CRUD Operations', 'Connecting to MongoDB'] },
        { title: 'Module 4: Authentication', completed: false, lessons: ['JWT and Sessions'] },
    ],
     '16': [
        { title: 'Module 1: Figma Fundamentals', completed: true, lessons: ['The Editor', 'Frames and Groups', 'Vector Shapes'] },
        { title: 'Module 2: Design Principles', completed: true, lessons: ['Typography', 'Color Theory', 'Layout and Grid'] },
        { title: 'Module 3: Prototyping', completed: false, lessons: ['Creating Connections', 'Smart Animate', 'User Testing'] },
        { title: 'Module 4: Design Systems', completed: false, lessons: ['Components and Variants', 'Styles', 'Team Libraries'] },
    ],
};

type Curriculum = { title: string; completed: boolean; lessons: string[] }[];

export default function CourseViewPage() {
    const params = useParams();
    const id = Array.isArray(params.id) ? params.id[0] : params.id;
    const course = allCourses.find(c => c.id.toString() === id);
    const curriculum: Curriculum = (courseCurriculum as any)[id] || [];

    const completedModules = curriculum.filter(m => m.completed).length;
    const totalModules = curriculum.length;
    const progress = totalModules > 0 ? (completedModules / totalModules) * 100 : 0;
    
    if (!course) {
        return <div className="container py-12 text-center">Course not found.</div>;
    }

    return (
        <DashboardAuthWrapper requiredRole="student">
            <div className="container mx-auto max-w-4xl py-12">
                <BackButton className="mb-4" />
                <div className="mb-8">
                    <h1 className="text-4xl font-bold">{course.title}</h1>
                    <p className="text-lg text-muted-foreground mt-2">{course.instructor}</p>
                </div>
                
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Your Progress</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Progress value={progress} className="h-4" />
                        <p className="text-center mt-2 text-muted-foreground">{Math.round(progress)}% Complete ({completedModules} of {totalModules} modules)</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Course Curriculum</CardTitle>
                        <CardDescription>Start learning by selecting a lesson.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Accordion type="single" collapsible className="w-full">
                            {curriculum.map((module, index) => (
                                <AccordionItem key={module.title} value={`item-${index}`}>
                                    <AccordionTrigger>
                                        <div className='flex items-center gap-4'>
                                            {module.completed ? <CheckCircle className="h-5 w-5 text-green-500" /> : <Circle className="h-5 w-5 text-muted-foreground" />}
                                            <span>Module {index + 1}: {module.title}</span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <ul className="space-y-3 pl-8">
                                            {module.lessons.map(lesson => (
                                                <li key={lesson} className="flex items-center gap-3 text-muted-foreground hover:text-foreground cursor-pointer">
                                                    <PlayCircle className="h-4 w-4" />
                                                    <span>{lesson}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </CardContent>
                </Card>
            </div>
        </DashboardAuthWrapper>
    )
}
