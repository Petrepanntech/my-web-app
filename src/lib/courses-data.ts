
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
    // Web Development
    {
        id: 1, title: 'HTML, CSS, & JavaScript for Beginners', description: 'The holy trinity of web development. Start your journey here.', instructor: 'Samuel Adebayo', price: 10000, category: 'Web Development', level: 'Beginner', image: 'https://placehold.co/400x225.png', aiHint: 'code editor'
    },
    {
        id: 2, title: 'React: From Beginner to Advanced', description: 'A deep dive into the most popular frontend library.', instructor: 'Adeola Peters', price: 25000, category: 'Web Development', level: 'Intermediate', image: 'https://placehold.co/400x225.png', aiHint: 'react logo'
    },
    {
        id: 3, title: 'Node.js & Express Masterclass', description: 'Build powerful, scalable backend APIs with Node.js.', instructor: 'Samuel Adebayo', price: 30000, category: 'Web Development', level: 'Intermediate', image: 'https://placehold.co/400x225.png', aiHint: 'server code'
    },
    {
        id: 4, title: 'Full-Stack Next.js Development', description: 'Master the leading React framework for production.', instructor: 'Adeola Peters', price: 45000, category: 'Web Development', level: 'Advanced', image: 'https://placehold.co/400x225.png', aiHint: 'nextjs logo'
    },
    {
        id: 5, title: 'Advanced CSS and Sass', description: 'Flexbox, Grid, Animations and more!', instructor: 'Chinedu Okoro', price: 15000, category: 'Web Development', level: 'Intermediate', image: 'https://placehold.co/400x225.png', aiHint: 'css code'
    },
    {
        id: 6, title: 'TypeScript for Modern Web Apps', description: 'Add static typing to your JavaScript projects to build robust applications.', instructor: 'Adeola Peters', price: 20000, category: 'Web Development', level: 'Intermediate', image: 'https://placehold.co/400x225.png', aiHint: 'typescript logo'
    },
     {
        id: 7, title: 'GraphQL: The Big Picture', description: 'Learn to build and consume GraphQL APIs.', instructor: 'Samuel Adebayo', price: 28000, category: 'Web Development', level: 'Advanced', image: 'https://placehold.co/400x225.png', aiHint: 'graphql logo'
    },
    {
        id: 8, title: 'DevOps for Frontend Developers', description: 'Learn Docker, CI/CD, and deployment strategies.', instructor: 'Fatima Bello', price: 35000, category: 'Web Development', level: 'Advanced', image: 'https://placehold.co/400x225.png', aiHint: 'devops pipeline'
    },
    {
        id: 9, title: 'Web Accessibility: Building Inclusive Apps', description: 'Ensure your websites are usable by everyone.', instructor: 'Chinedu Okoro', price: 18000, category: 'Web Development', level: 'Beginner', image: 'https://placehold.co/400x225.png', aiHint: 'accessibility icon'
    },
    {
        id: 10, title: 'Vue.js Fundamentals', description: 'An introduction to the progressive JavaScript framework.', instructor: 'Adeola Peters', price: 22000, category: 'Web Development', level: 'Beginner', image: 'https://placehold.co/400x225.png', aiHint: 'vuejs logo'
    },
    {
        id: 11, title: 'Mastering Git and GitHub', description: 'Version control is a must-have skill for every developer.', instructor: 'Samuel Adebayo', price: 5000, category: 'Web Development', level: 'Beginner', image: 'https://placehold.co/400x225.png', aiHint: 'github logo'
    },
    {
        id: 12, title: 'Three.js for 3D Web Graphics', description: 'Bring your websites to life with 3D graphics.', instructor: 'Chinedu Okoro', price: 40000, category: 'Web Development', level: 'Advanced', image: 'https://placehold.co/400x225.png', aiHint: '3d web'
    },
    {
        id: 13, title: 'Web Performance Optimization', description: 'Make your websites faster and more efficient.', instructor: 'Adeola Peters', price: 32000, category: 'Web Development', level: 'Advanced', image: 'https://placehold.co/400x225.png', aiHint: 'speed test'
    },
    {
        id: 14, title: 'Introduction to Web3 and DApps', description: 'Explore the future of the web with blockchain technology.', instructor: 'Samuel Adebayo', price: 48000, category: 'Web Development', level: 'Advanced', image: 'https://placehold.co/400x225.png', aiHint: 'blockchain network'
    },
    {
        id: 15, title: 'Python & Django Full-Stack Web Dev', description: 'A powerful backend alternative for Python lovers.', instructor: 'Fatima Bello', price: 30000, category: 'Web Development', level: 'Intermediate', image: 'https://placehold.co/400x225.png', aiHint: 'python django'
    },

    // UI/UX Design
    {
        id: 16, title: 'Figma for UI/UX: From Zero to Hero', description: 'Master the most popular tool for interface design.', instructor: 'Aisha Nwosu', price: 20000, category: 'UI/UX Design', level: 'Beginner', image: 'https://placehold.co/400x225.png', aiHint: 'figma logo'
    },
    {
        id: 17, title: 'User Research and Persona Creation', description: 'Understand your users to build products they love.', instructor: 'Aisha Nwosu', price: 25000, category: 'UI/UX Design', level: 'Intermediate', image: 'https://placehold.co/400x225.png', aiHint: 'user research'
    },
    {
        id: 18, title: 'Building and Maintaining Design Systems', description: 'Create scalable and consistent design languages.', instructor: 'Aisha Nwosu', price: 40000, category: 'UI/UX Design', level: 'Advanced', image: 'https://placehold.co/400x225.png', aiHint: 'design system'
    },
    {
        id: 19, title: 'Mobile App Design Principles', description: 'Learn the specifics of designing for iOS and Android.', instructor: 'Chinedu Okoro', price: 22000, category: 'UI/UX Design', level: 'Intermediate', image: 'https://placehold.co/400x225.png', aiHint: 'mobile app'
    },
     {
        id: 20, title: 'UX Writing: The Complete Guide', description: 'Craft clear, concise, and effective copy for your interfaces.', instructor: 'Tunde Oladipo', price: 15000, category: 'UI/UX Design', level: 'Beginner', image: 'https://placehold.co/400x225.png', aiHint: 'writing interface'
    },
    {
        id: 21, title: 'Prototyping with ProtoPie', description: 'Create high-fidelity, realistic prototypes that feel like real apps.', instructor: 'Aisha Nwosu', price: 30000, category: 'UI/UX Design', level: 'Advanced', image: 'https://placehold.co/400x225.png', aiHint: 'app prototype'
    },
    {
        id: 22, title: 'Design Thinking Fundamentals', description: 'A problem-solving framework for innovation.', instructor: 'Fatima Bello', price: 18000, category: 'UI/UX Design', level: 'Beginner', image: 'https://placehold.co/400x225.png', aiHint: 'design thinking'
    },
    {
        id: 23, title: 'Color Theory for Designers', description: 'Master the art and science of color in your designs.', instructor: 'Chinedu Okoro', price: 12000, category: 'UI/UX Design', level: 'Beginner', image: 'https://placehold.co/400x225.png', aiHint: 'color wheel'
    },
     {
        id: 24, title: 'Advanced Microinteractions & Animations', description: 'Bring your designs to life with delightful animations.', instructor: 'Aisha Nwosu', price: 35000, category: 'UI/UX Design', level: 'Advanced', image: 'https://placehold.co/400x225.png', aiHint: 'animation timeline'
    },
    {
        id: 25, title: 'Usability Testing from A to Z', description: 'Learn how to plan, conduct, and analyze usability tests.', instructor: 'Aisha Nwosu', price: 28000, category: 'UI/UX Design', level: 'Intermediate', image: 'https://placehold.co/400x225.png', aiHint: 'user testing'
    },
    
    // Data Science & AI
    {
        id: 26, title: 'Python for Data Science Bootcamp', description: 'Learn NumPy, Pandas, Matplotlib, and Seaborn.', instructor: 'Dr. Evelyn Reed', price: 30000, category: 'Data Science & AI', level: 'Beginner', image: 'https://placehold.co/400x225.png', aiHint: 'python chart'
    },
    {
        id: 27, title: 'Machine Learning A-Z', description: 'A comprehensive introduction to ML algorithms.', instructor: 'Dr. Evelyn Reed', price: 45000, category: 'Data Science & AI', level: 'Intermediate', image: 'https://placehold.co/400x225.png', aiHint: 'machine learning'
    },
    {
        id: 28, title: 'Deep Learning with TensorFlow', description: 'Build neural networks for complex problems.', instructor: 'Dr. Evelyn Reed', price: 50000, category: 'Data Science & AI', level: 'Advanced', image: 'https://placehold.co/400x225.png', aiHint: 'neural network'
    },
    {
        id: 29, title: 'SQL for Data Analysis', description: 'Query and manipulate large datasets with SQL.', instructor: 'Fatima Bello', price: 15000, category: 'Data Science & AI', level: 'Beginner', image: 'https://placehold.co/400x225.png', aiHint: 'sql database'
    },
    {
        id: 30, title: 'Natural Language Processing (NLP)', description: 'Teach computers to understand human language.', instructor: 'Dr. Evelyn Reed', price: 48000, category: 'Data Science & AI', level: 'Advanced', image: 'https://placehold.co/400x225.png', aiHint: 'text analysis'
    },
    {
        id: 31, title: 'Introduction to AI Ethics', description: 'Explore the ethical implications of artificial intelligence.', instructor: 'Dr. Evelyn Reed', price: 20000, category: 'Data Science & AI', level: 'Beginner', image: 'https://placehold.co/400x225.png', aiHint: 'ai ethics'
    },
     {
        id: 32, title: 'Data Visualization with Tableau', description: 'Create stunning and insightful dashboards.', instructor: 'Tunde Oladipo', price: 25000, category: 'Data Science & AI', level: 'Intermediate', image: 'https://placehold.co/400x225.png', aiHint: 'dashboard chart'
    },
    {
        id: 33, title: 'Time Series Analysis and Forecasting', description: 'Predict future trends from time-stamped data.', instructor: 'Dr. Evelyn Reed', price: 42000, category: 'Data Science & AI', level: 'Advanced', image: 'https://placehold.co/400x225.png', aiHint: 'stock chart'
    },

    // Business & Entrepreneurship
    {
        id: 34, title: 'Startup 101: From Idea to IPO', description: 'The complete guide to building a successful tech startup.', instructor: 'Fatima Bello', price: 35000, category: 'Business & Entrepreneurship', level: 'Beginner', image: 'https://placehold.co/400x225.png', aiHint: 'startup rocket'
    },
    {
        id: 35, title: 'Product Management Fundamentals', description: 'Learn how to build products that customers love.', instructor: 'Fatima Bello', price: 30000, category: 'Business & Entrepreneurship', level: 'Intermediate', image: 'https://placehold.co/400x225.png', aiHint: 'product roadmap'
    },
    {
        id: 36, title: 'Business Strategy for the Digital Age', description: 'Develop winning strategies in a fast-changing world.', instructor: 'Tunde Oladipo', price: 28000, category: 'Business & Entrepreneurship', level: 'Intermediate', image: 'https://placehold.co/400x225.png', aiHint: 'business strategy'
    },
    {
        id: 37, title: 'Financial Modeling for Startups', description: 'Understand and forecast your company\'s financials.', instructor: 'Fatima Bello', price: 40000, category: 'Business & Entrepreneurship', level: 'Advanced', image: 'https://placehold.co/400x225.png', aiHint: 'financial chart'
    },
    
    // Digital Marketing
    {
        id: 38, title: 'The Complete SEO Guide', description: 'Rank number 1 on Google and drive organic traffic.', instructor: 'Tunde Oladipo', price: 25000, category: 'Digital Marketing', level: 'Intermediate', image: 'https://placehold.co/400x225.png', aiHint: 'seo ranking'
    },
    {
        id: 39, title: 'Social Media Marketing Masterclass', description: 'Master Facebook, Instagram, TikTok, and more.', instructor: 'Tunde Oladipo', price: 22000, category: 'Digital Marketing', level: 'Beginner', image: 'https://placehold.co/400x225.png', aiHint: 'social media'
    },
    {
        id: 40, title: 'Content Marketing: A Practical Guide', description: 'Create content that attracts and converts.', instructor: 'Tunde Oladipo', price: 20000, category: 'Digital Marketing', level: 'Intermediate', image: 'https://placehold.co/400x225.png', aiHint: 'content writing'
    },
    {
        id: 41, title: 'Google Ads for Beginners', description: 'Launch and manage profitable PPC campaigns.', instructor: 'Tunde Oladipo', price: 18000, category: 'Digital Marketing', level: 'Beginner', image: 'https://placehold.co/400x225.png', aiHint: 'ppc ads'
    },
    {
        id: 42, title: 'Email Marketing with Mailchimp', description: 'Build and nurture your audience with email.', instructor: 'Tunde Oladipo', price: 15000, category: 'Digital Marketing', level: 'Beginner', image: 'https://placehold.co/400x225.png', aiHint: 'email campaign'
    },
    {
        id: 43, title: 'Marketing Analytics with Google Analytics 4', description: 'Turn data into actionable insights for growth.', instructor: 'Tunde Oladipo', price: 35000, category: 'Digital Marketing', level: 'Advanced', image: 'https://placehold.co/400x225.png', aiHint: 'analytics dashboard'
    },

    // Test Preparation
    {
        id: 44, title: 'JAMB UTME Master Guide', description: 'Comprehensive subject reviews, tips, and mock tests.', instructor: 'Admin Team', price: 5000, category: 'Test Preparation', level: 'Beginner', image: 'https://placehold.co/400x225.png', aiHint: 'exam paper'
    },
    {
        id: 45, title: 'WAEC SSCE Prep Course', description: 'Ace your WASSCE with in-depth tutorials and practice questions.', instructor: 'Admin Team', price: 5000, category: 'Test Preparation', level: 'Beginner', image: 'https://placehold.co/400x225.png', aiHint: 'test results'
    },
    {
        id: 46, title: 'Post-UTME Success Blueprint', description: 'Prepare for university-specific entrance exams.', instructor: 'Admin Team', price: 7500, category: 'Test Preparation', level: 'Intermediate', image: 'https://placehold.co/400x225.png', aiHint: 'university gate'
    },
    {
        id: 47, title: 'Job Aptitude Test Crash Course', description: 'Sharpen your skills for corporate assessment tests.', instructor: 'Admin Team', price: 10000, category: 'Test Preparation', level: 'Intermediate', image: 'https://placehold.co/400x225.png', aiHint: 'job interview'
    },
    {
        id: 48, title: 'Advanced React Testing with Jest & RTL', description: 'Write professional, maintainable tests for your React apps.', instructor: 'Adeola Peters', price: 28000, category: 'Web Development', level: 'Advanced', image: 'https://placehold.co/400x225.png', aiHint: 'code test'
    },
    {
        id: 49, title: 'Motion Design with After Effects', description: 'Create stunning motion graphics for web and video.', instructor: 'Aisha Nwosu', price: 38000, category: 'UI/UX Design', level: 'Advanced', image: 'https://placehold.co/400x225.png', aiHint: 'motion graphics'
    },
    {
        id: 50, title: 'Computer Vision with OpenCV', description: 'Teach computers to see and interpret the visual world.', instructor: 'Dr. Evelyn Reed', price: 50000, category: 'Data Science & AI', level: 'Advanced', image: 'https://placehold.co/400x225.png', aiHint: 'computer vision'
    },
    {
        id: 51, title: 'Venture Capital: Raising Funds for Your Startup', description: 'Learn how to pitch to investors and secure funding.', instructor: 'Fatima Bello', price: 45000, category: 'Business & Entrepreneurship', level: 'Advanced', image: 'https://placehold.co/400x225.png', aiHint: 'venture capital'
    },
    {
        id: 52, title: 'Affiliate Marketing for Beginners', description: 'Earn passive income by promoting products you love.', instructor: 'Tunde Oladipo', price: 12000, category: 'Digital Marketing', level: 'Beginner', image: 'https://placehold.co/400x225.png', aiHint: 'affiliate links'
    },
    {
        id: 53, title: 'Web Scraping with Python', description: 'Extract data from websites using Beautiful Soup and Scrapy.', instructor: 'Samuel Adebayo', price: 22000, category: 'Web Development', level: 'Intermediate', image: 'https://placehold.co/400x225.png', aiHint: 'data scraping'
    },
];
