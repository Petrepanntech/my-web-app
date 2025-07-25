
import { Code, Palette, Briefcase, Megaphone, BrainCircuit, BarChart, type LucideIcon } from "lucide-react";

export interface Course {
    id: number;
    title: string;
    description: string;
    mentor: string;
    price: number;
    category: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    image: string;
    aiHint: string;
}

export const courseCategories: {
    title: string;
    description: string;
    icon: LucideIcon;
    slug: string;
    courseCount: number;
}[] = [
  {
    title: "Web Development",
    description: "Master frontend and backend technologies to build modern web applications.",
    icon: Code,
    slug: "web-development",
    courseCount: 15
  },
  {
    title: "UI/UX Design",
    description: "Learn to design intuitive and beautiful user interfaces and experiences.",
    icon: Palette,
    slug: "ui-ux-design",
    courseCount: 10
  },
  {
    title: "Business & Entrepreneurship",
    description: "Acquire the skills to launch and grow your own successful business.",
    icon: Briefcase,
    slug: "business-entrepreneurship",
    courseCount: 8
  },
  {
    title: "Digital Marketing",
    description: "Understand the strategies to market products and services in the digital age.",
    icon: Megaphone,
    slug: "digital-marketing",
    courseCount: 7
  },
  {
    title: "Data Science & AI",
    description: "Dive into data analysis, machine learning, and artificial intelligence.",
    icon: BrainCircuit,
    slug: "data-science-ai",
    courseCount: 12
  },
   {
    title: "Test Preparation",
    description: "Comprehensive guides and practice for standardized tests like JAMB and WAEC.",
    icon: BarChart,
    slug: "test-preparation",
    courseCount: 4
  }
];

export const allCourses: Course[] = [
    // This data is now for placeholder purposes, as courses are meant to be AI-generated.
    // It is used on pages that haven't been fully migrated to the AI flow yet.
    {
        id: 1,
        title: 'Advanced React & Next.js',
        description: 'Master the most powerful features of React and Next.js to build enterprise-grade applications.',
        mentor: 'Samuel Adebayo',
        price: 15000,
        category: 'Web Development',
        level: 'Advanced',
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=400&h=225&fit=crop",
        aiHint: "react logo"
    },
    {
        id: 2,
        title: 'UI/UX Design Fundamentals',
        description: 'Learn the principles of user-centered design, from wireframing to high-fidelity prototypes.',
        mentor: 'Aisha Nwosu',
        price: 12000,
        category: 'UI/UX Design',
        level: 'Beginner',
        image: "https://images.unsplash.com/photo-1607703752089-1169ae7269b6?q=80&w=400&h=225&fit=crop",
        aiHint: "design wireframe"
    },
    {
        id: 3,
        title: 'Node.js & Express Masterclass',
        description: 'Build scalable and efficient backend services and APIs with Node.js and the Express framework.',
        mentor: 'Samuel Adebayo',
        price: 15000,
        category: 'Web Development',
        level: 'Intermediate',
        image: "https://images.unsplash.com/photo-1561736778-92e5e8a27793?q=80&w=400&h=225&fit=crop",
        aiHint: "code server"
    },
];
