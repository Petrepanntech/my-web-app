

import { Code, Palette, Briefcase, Megaphone, BrainCircuit, BarChart, type LucideIcon } from "lucide-react";

export interface Course {
    id: number;
    title: string;
    description: string;
    instructor: string;
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
];
