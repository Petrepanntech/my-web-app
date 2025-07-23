
"use client"
import { useParams } from 'next/navigation';
import DashboardAuthWrapper from "@/components/auth/DashboardAuthWrapper";
import { allCourses } from '@/lib/courses-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CheckCircle, Circle, PlayCircle, Video } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { BackButton } from '@/components/shared/BackButton';

const courseCurriculum = {
    '1': [
        { title: 'Module 1: Introduction to HTML', completed: true, lessons: [{type: 'lecture', title: 'What is HTML?'}, {type: 'video', title: 'Curated Video: HTML Basics (YouTube)'}] },
        { title: 'Module 2: Styling with CSS', completed: true, lessons: [{type: 'lecture', title: 'CSS Selectors'}, {type: 'lecture', title: 'The Box Model'}, {type: 'video', title: 'Curated Video: Flexbox vs. Grid (YouTube)'}] },
        { title: 'Module 3: JavaScript Fundamentals', completed: true, lessons: [{type: 'lecture', title: 'Variables and Data Types'}, {type: 'video', title: 'Proprietary Lecture: Advanced Functions'}, {type: 'lecture', title: 'DOM Manipulation'}] },
        { title: 'Module 4: Final Project', completed: true, lessons: [{type: 'lecture', title: 'Build a Personal Portfolio'}] },
    ],
    '2': [
        { title: 'Module 1: React Basics', completed: true, lessons: [{type: 'lecture', title: 'Components and Props'}, {type: 'video', title: 'Curated Video: Understanding JSX (YouTube)'}, {type: 'lecture', title: 'State and Lifecycle'}, {type: 'lecture', title: 'Handling Events'}] },
        { title: 'Module 2: Hooks Deep Dive', completed: true, lessons: [{type: 'video', title: 'Proprietary Lecture: Mastering useEffect'}, {type: 'lecture', title: 'useState'}, {type: 'lecture', title: 'useContext'}] },
        { title: 'Module 3: State Management', completed: true, lessons: [{type: 'lecture', title: 'Introduction to Zustand'}, {type: 'lecture', title: 'Creating Stores'}, {type: 'lecture', title: 'Async Actions'}] },
        { title: 'Module 4: Final Project', completed: false, lessons: [{type: 'lecture', title: 'Build a Full-Stack E-commerce App'}] },
    ],
    '3': [
        { title: 'Module 1: Introduction to Node.js', completed: true, lessons: [{type: 'lecture', title: 'Node.js Architecture'}, {type: 'lecture', title: 'NPM and Modules'}] },
        { title: 'Module 2: Express.js', completed: true, lessons: [{type: 'lecture', title: 'Routing'}, {type: 'video', title: 'Curated Video: Express Middleware Explained (YouTube)'}, {type: 'lecture', title: 'Request and Response'}] },
        { title: 'Module 3: Building a RESTful API', completed: true, lessons: [{type: 'lecture', title: 'CRUD Operations'}, {type: 'lecture', title: 'Connecting to MongoDB'}] },
        { title: 'Module 4: Authentication', completed: false, lessons: [{type: 'video', title: 'Proprietary Lecture: JWT vs. Sessions'}] },
    ],
     '16': [
        { title: 'Module 1: Figma Fundamentals', completed: true, lessons: [{type: 'lecture', title: 'The Editor'}, {type: 'video', title: 'Curated Video: Mastering Auto Layout (YouTube)'}, {type: 'lecture', title: 'Frames and Groups'}, {type: 'lecture', title: 'Vector Shapes'}] },
        { title: 'Module 2: Design Principles', completed: true, lessons: [{type: 'lecture', title: 'Typography'}, {type: 'lecture', title: 'Color Theory'}, {type: 'lecture', title: 'Layout and Grid'}] },
        { title: 'Module 3: Prototyping', completed: false, lessons: [{type: 'lecture', title: 'Creating Connections'}, {type: 'video', title: 'Proprietary Lecture: Advanced Smart Animate'}, {type: 'lecture', title: 'User Testing'}] },
        { title: 'Module 4: Design Systems', completed: false, lessons: [{type: 'lecture', title: 'Components and Variants'}, {type: 'lecture', title: 'Styles'}, {type: 'lecture', title: 'Team Libraries'}] },
    ],
};

type Lesson = { type: 'lecture' | 'video', title: string };
type Module = { title: string; completed: boolean; lessons: Lesson[] };
type Curriculum = Module[];

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
                    <p className="text-lg text-muted-foreground mt-2">Your Mentor: {course.instructor}</p>
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
                        <CardDescription>Start learning by selecting a lecture or video.</CardDescription>
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
                                                <li key={lesson.title} className="flex items-center gap-3 text-muted-foreground hover:text-foreground cursor-pointer">
                                                    {lesson.type === 'lecture' ? <PlayCircle className="h-4 w-4" /> : <Video className="h-4 w-4" />}
                                                    <span>{lesson.title}</span>
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
