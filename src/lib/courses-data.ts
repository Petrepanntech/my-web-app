

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
        id: 1, title: 'HTML, CSS, & JavaScript for Beginners', description: 'The holy trinity of web development. Start your journey here.', instructor: 'Samuel Adebayo', price: 10000, category: 'Web Development', level: 'Beginner', image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=400&h=225&fit=crop', aiHint: 'code editor'
    },
    {
        id: 2, title: 'React: From Beginner to Advanced', description: 'A deep dive into the most popular frontend library.', instructor: 'Adeola Peters', price: 25000, category: 'Web Development', level: 'Intermediate', image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=400&h=225&fit=crop', aiHint: 'react logo'
    },
    {
        id: 3, title: 'Node.js & Express Masterclass', description: 'Build powerful, scalable backend APIs with Node.js.', instructor: 'Samuel Adebayo', price: 30000, category: 'Web Development', level: 'Intermediate', image: 'https://images.unsplash.com/photo-1565034946487-077786996e27?q=80&w=400&h=225&fit=crop', aiHint: 'server code'
    },
    {
        id: 4, title: 'Full-Stack Next.js Development', description: 'Master the leading React framework for production.', instructor: 'Adeola Peters', price: 45000, category: 'Web Development', level: 'Advanced', image: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=400&h=225&fit=crop', aiHint: 'nextjs logo'
    },
    {
        id: 5, title: 'Advanced CSS and Sass', description: 'Flexbox, Grid, Animations and more!', instructor: 'Chinedu Okoro', price: 15000, category: 'Web Development', level: 'Intermediate', image: 'https://images.unsplash.com/photo-1507721999472-8ed4421b436d?q=80&w=400&h=225&fit=crop', aiHint: 'css code'
    },
    {
        id: 6, title: 'TypeScript for Modern Web Apps', description: 'Add static typing to your JavaScript projects to build robust applications.', instructor: 'Adeola Peters', price: 20000, category: 'Web Development', level: 'Intermediate', image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=400&h=225&fit=crop', aiHint: 'typescript logo'
    },
     {
        id: 7, title: 'GraphQL: The Big Picture', description: 'Learn to build and consume GraphQL APIs.', instructor: 'Samuel Adebayo', price: 28000, category: 'Web Development', level: 'Advanced', image: 'https://images.unsplash.com/photo-1620286203598-5c4a15b3c27c?q=80&w=400&h=225&fit=crop', aiHint: 'graphql logo'
    },
    {
        id: 8, title: 'DevOps for Frontend Developers', description: 'Learn Docker, CI/CD, and deployment strategies.', instructor: 'Fatima Bello', price: 35000, category: 'Web Development', level: 'Advanced', image: 'https://images.unsplash.com/photo-1545670724-42784d1a49f4?q=80&w=400&h=225&fit=crop', aiHint: 'devops pipeline'
    },
    {
        id: 9, title: 'Web Accessibility: Building Inclusive Apps', description: 'Ensure your websites are usable by everyone.', instructor: 'Chinedu Okoro', price: 18000, category: 'Web Development', level: 'Beginner', image: 'https://images.unsplash.com/photo-1508051772398-917e37e95419?q=80&w=400&h=225&fit=crop', aiHint: 'accessibility icon'
    },
    {
        id: 10, title: 'Vue.js Fundamentals', description: 'An introduction to the progressive JavaScript framework.', instructor: 'Adeola Peters', price: 22000, category: 'Web Development', level: 'Beginner', image: 'https://images.unsplash.com/photo-1634563148446-2162b713b965?q=80&w=400&h=225&fit=crop', aiHint: 'vuejs logo'
    },
    {
        id: 11, title: 'Mastering Git and GitHub', description: 'Version control is a must-have skill for every developer.', instructor: 'Samuel Adebayo', price: 5000, category: 'Web Development', level: 'Beginner', image: 'https://images.unsplash.com/photo-1624996752380-8ec242e0f85d?q=80&w=400&h=225&fit=crop', aiHint: 'github logo'
    },
    {
        id: 12, title: 'Three.js for 3D Web Graphics', description: 'Bring your websites to life with 3D graphics.', instructor: 'Chinedu Okoro', price: 40000, category: 'Web Development', level: 'Advanced', image: 'https://images.unsplash.com/photo-1617994210204-68c17a869a8e?q=80&w=400&h=225&fit=crop', aiHint: '3d web'
    },
    {
        id: 13, title: 'Web Performance Optimization', description: 'Make your websites faster and more efficient.', instructor: 'Adeola Peters', price: 32000, category: 'Web Development', level: 'Advanced', image: 'https://images.unsplash.com/photo-1508830524289-0adcbe822b40?q=80&w=400&h=225&fit=crop', aiHint: 'speed test'
    },
    {
        id: 14, title: 'Introduction to Web3 and DApps', description: 'Explore the future of the web with blockchain technology.', instructor: 'Samuel Adebayo', price: 48000, category: 'Web Development', level: 'Advanced', image: 'https://images.unsplash.com/photo-1642104793543-85b82759ab73?q=80&w=400&h=225&fit=crop', aiHint: 'blockchain network'
    },
    {
        id: 15, title: 'Python & Django Full-Stack Web Dev', description: 'A powerful backend alternative for Python lovers.', instructor: 'Fatima Bello', price: 30000, category: 'Web Development', level: 'Intermediate', image: 'https://images.unsplash.com/photo-1589143899385-24b39d53517c?q=80&w=400&h=225&fit=crop', aiHint: 'python django'
    },

    // UI/UX Design
    {
        id: 16, title: 'Figma for UI/UX: From Zero to Hero', description: 'Master the most popular tool for interface design.', instructor: 'Aisha Nwosu', price: 20000, category: 'UI/UX Design', level: 'Beginner', image: 'https://images.unsplash.com/photo-1600132806370-bf17e65e93e0?q=80&w=400&h=225&fit=crop', aiHint: 'figma logo'
    },
    {
        id: 17, title: 'User Research and Persona Creation', description: 'Understand your users to build products they love.', instructor: 'Aisha Nwosu', price: 25000, category: 'UI/UX Design', level: 'Intermediate', image: 'https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=400&h=225&fit=crop', aiHint: 'user research'
    },
    {
        id: 18, title: 'Building and Maintaining Design Systems', description: 'Create scalable and consistent design languages.', instructor: 'Aisha Nwosu', price: 40000, category: 'UI/UX Design', level: 'Advanced', image: 'https://images.unsplash.com/photo-1618788372246-79faff0c3742?q=80&w=400&h=225&fit=crop', aiHint: 'design system'
    },
    {
        id: 19, title: 'Mobile App Design Principles', description: 'Learn the specifics of designing for iOS and Android.', instructor: 'Chinedu Okoro', price: 22000, category: 'UI/UX Design', level: 'Intermediate', image: 'https://images.unsplash.com/photo-1601972602555-64939a48919c?q=80&w=400&h=225&fit=crop', aiHint: 'mobile app'
    },
     {
        id: 20, title: 'UX Writing: The Complete Guide', description: 'Craft clear, concise, and effective copy for your interfaces.', instructor: 'Tunde Oladipo', price: 15000, category: 'UI/UX Design', level: 'Beginner', image: 'https://images.unsplash.com/photo-1587614295999-6c1c13675123?q=80&w=400&h=225&fit=crop', aiHint: 'writing interface'
    },
    {
        id: 21, title: 'Prototyping with ProtoPie', description: 'Create high-fidelity, realistic prototypes that feel like real apps.', instructor: 'Aisha Nwosu', price: 30000, category: 'UI/UX Design', level: 'Advanced', image: 'https://images.unsplash.com/photo-1581287053822-fd7bf4f4bf38?q=80&w=400&h=225&fit=crop', aiHint: 'app prototype'
    },
    {
        id: 22, title: 'Design Thinking Fundamentals', description: 'A problem-solving framework for innovation.', instructor: 'Fatima Bello', price: 18000, category: 'UI/UX Design', level: 'Beginner', image: 'https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?q=80&w=400&h=225&fit=crop', aiHint: 'design thinking'
    },
    {
        id: 23, title: 'Color Theory for Designers', description: 'Master the art and science of color in your designs.', instructor: 'Chinedu Okoro', price: 12000, category: 'UI/UX Design', level: 'Beginner', image: 'https://images.unsplash.com/photo-1561069934-eee225952461?q=80&w=400&h=225&fit=crop', aiHint: 'color wheel'
    },
     {
        id: 24, title: 'Advanced Microinteractions & Animations', description: 'Bring your designs to life with delightful animations.', instructor: 'Aisha Nwosu', price: 35000, category: 'UI/UX Design', level: 'Advanced', image: 'https://images.unsplash.com/photo-1558655146-364adaf2e730?q=80&w=400&h=225&fit=crop', aiHint: 'animation timeline'
    },
    {
        id: 25, title: 'Usability Testing from A to Z', description: 'Learn how to plan, conduct, and analyze usability tests.', instructor: 'Aisha Nwosu', price: 28000, category: 'UI/UX Design', level: 'Intermediate', image: 'https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=400&h=225&fit=crop', aiHint: 'user testing'
    },
    
    // Data Science & AI
    {
        id: 26, title: 'Python for Data Science Bootcamp', description: 'Learn NumPy, Pandas, Matplotlib, and Seaborn.', instructor: 'Dr. Evelyn Reed', price: 30000, category: 'Data Science & AI', level: 'Beginner', image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&w=400&h=225&fit=crop', aiHint: 'python chart'
    },
    {
        id: 27, title: 'Machine Learning A-Z', description: 'A comprehensive introduction to ML algorithms.', instructor: 'Dr. Evelyn Reed', price: 45000, category: 'Data Science & AI', level: 'Intermediate', image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?q=80&w=400&h=225&fit=crop', aiHint: 'machine learning'
    },
    {
        id: 28, title: 'Deep Learning with TensorFlow', description: 'Build neural networks for complex problems.', instructor: 'Dr. Evelyn Reed', price: 50000, category: 'Data Science & AI', level: 'Advanced', image: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=400&h=225&fit=crop', aiHint: 'neural network'
    },
    {
        id: 29, title: 'SQL for Data Analysis', description: 'Query and manipulate large datasets with SQL.', instructor: 'Fatima Bello', price: 15000, category: 'Data Science & AI', level: 'Beginner', image: 'https://images.unsplash.com/photo-1529078155058-5d716f45d60g?q=80&w=400&h=225&fit=crop', aiHint: 'sql database'
    },
    {
        id: 30, title: 'Natural Language Processing (NLP)', description: 'Teach computers to understand human language.', instructor: 'Dr. Evelyn Reed', price: 48000, category: 'Data Science & AI', level: 'Advanced', image: 'https://images.unsplash.com/photo-1558544955-4a572c36662e?q=80&w=400&h=225&fit=crop', aiHint: 'text analysis'
    },
    {
        id: 31, title: 'Introduction to AI Ethics', description: 'Explore the ethical implications of artificial intelligence.', instructor: 'Dr. Evelyn Reed', price: 20000, category: 'Data Science & AI', level: 'Beginner', image: 'https://images.unsplash.com/photo-1516116216624-53e697314945?q=80&w=400&h=225&fit=crop', aiHint: 'ai ethics'
    },
     {
        id: 32, title: 'Data Visualization with Tableau', description: 'Create stunning and insightful dashboards.', instructor: 'Tunde Oladipo', price: 25000, category: 'Data Science & AI', level: 'Intermediate', image: 'https://images.unsplash.com/photo-1620712943543-95965183db31?q=80&w=400&h=225&fit=crop', aiHint: 'dashboard chart'
    },
    {
        id: 33, title: 'Time Series Analysis and Forecasting', description: 'Predict future trends from time-stamped data.', instructor: 'Dr. Evelyn Reed', price: 42000, category: 'Data Science & AI', level: 'Advanced', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=400&h=225&fit=crop', aiHint: 'stock chart'
    },

    // Business & Entrepreneurship
    {
        id: 34, title: 'Startup 101: From Idea to IPO', description: 'The complete guide to building a successful tech startup.', instructor: 'Fatima Bello', price: 35000, category: 'Business & Entrepreneurship', level: 'Beginner', image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=400&h=225&fit=crop', aiHint: 'startup rocket'
    },
    {
        id: 35, title: 'Product Management Fundamentals', description: 'Learn how to build products that customers love.', instructor: 'Fatima Bello', price: 30000, category: 'Business & Entrepreneurship', level: 'Intermediate', image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=400&h=225&fit=crop', aiHint: 'product roadmap'
    },
    {
        id: 36, title: 'Business Strategy for the Digital Age', description: 'Develop winning strategies in a fast-changing world.', instructor: 'Tunde Oladipo', price: 28000, category: 'Business & Entrepreneurship', level: 'Intermediate', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=400&h=225&fit=crop', aiHint: 'business strategy'
    },
    {
        id: 37, title: 'Financial Modeling for Startups', description: 'Understand and forecast your company\'s financials.', instructor: 'Fatima Bello', price: 40000, category: 'Business & Entrepreneurship', level: 'Advanced', image: 'https://images.unsplash.com/photo-1554224155-169544351720?q=80&w=400&h=225&fit=crop', aiHint: 'financial chart'
    },
    
    // Digital Marketing
    {
        id: 38, title: 'The Complete SEO Guide', description: 'Rank number 1 on Google and drive organic traffic.', instructor: 'Tunde Oladipo', price: 25000, category: 'Digital Marketing', level: 'Intermediate', image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=400&h=225&fit=crop', aiHint: 'seo ranking'
    },
    {
        id: 39, title: 'Social Media Marketing Masterclass', description: 'Master Facebook, Instagram, TikTok, and more.', instructor: 'Tunde Oladipo', price: 22000, category: 'Digital Marketing', level: 'Beginner', image: 'https://images.unsplash.com/photo-1611162617213-6d22e4f133d4?q=80&w=400&h=225&fit=crop', aiHint: 'social media'
    },
    {
        id: 40, title: 'Content Marketing: A Practical Guide', description: 'Create content that attracts and converts.', instructor: 'Tunde Oladipo', price: 20000, category: 'Digital Marketing', level: 'Intermediate', image: 'https://images.unsplash.com/photo-1585255479275-f86a63c65965?q=80&w=400&h=225&fit=crop', aiHint: 'content writing'
    },
    {
        id: 41, title: 'Google Ads for Beginners', description: 'Launch and manage profitable PPC campaigns.', instructor: 'Tunde Oladipo', price: 18000, category: 'Digital Marketing', level: 'Beginner', image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=400&h=225&fit=crop', aiHint: 'ppc ads'
    },
    {
        id: 42, title: 'Email Marketing with Mailchimp', description: 'Build and nurture your audience with email.', instructor: 'Tunde Oladipo', price: 15000, category: 'Digital Marketing', level: 'Beginner', image: 'https://images.unsplash.com/photo-1557053964-937650b63311?q=80&w=400&h=225&fit=crop', aiHint: 'email campaign'
    },
    {
        id: 43, title: 'Marketing Analytics with Google Analytics 4', description: 'Turn data into actionable insights for growth.', instructor: 'Tunde Oladipo', price: 35000, category: 'Digital Marketing', level: 'Advanced', image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=400&h=225&fit=crop', aiHint: 'analytics dashboard'
    },

    // Test Preparation
    {
        id: 44, title: 'JAMB UTME Master Guide', description: 'Comprehensive subject reviews, tips, and mock tests.', instructor: 'Admin Team', price: 5000, category: 'Test Preparation', level: 'Beginner', image: 'https://images.unsplash.com/photo-1501290741922-b56c0d0884af?q=80&w=400&h=225&fit=crop', aiHint: 'exam paper'
    },
    {
        id: 45, title: 'WAEC SSCE Prep Course', description: 'Ace your WASSCE with in-depth tutorials and practice questions.', instructor: 'Admin Team', price: 5000, category: 'Test Preparation', level: 'Beginner', image: 'https://images.unsplash.com/photo-1599423300689-7d8a4d74a706?q=80&w=400&h=225&fit=crop', aiHint: 'test results'
    },
    {
        id: 46, title: 'Post-UTME Success Blueprint', description: 'Prepare for university-specific entrance exams.', instructor: 'Admin Team', price: 7500, category: 'Test Preparation', level: 'Intermediate', image: 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=400&h=225&fit=crop', aiHint: 'university gate'
    },
    {
        id: 47, title: 'Job Aptitude Test Crash Course', description: 'Sharpen your skills for corporate assessment tests.', instructor: 'Admin Team', price: 10000, category: 'Test Preparation', level: 'Intermediate', image: 'https://images.unsplash.com/photo-1497032628192-86f99d791b7e?q=80&w=400&h=225&fit=crop', aiHint: 'job interview'
    },
    {
        id: 48, title: 'Advanced React Testing with Jest & RTL', description: 'Write professional, maintainable tests for your React apps.', instructor: 'Adeola Peters', price: 28000, category: 'Web Development', level: 'Advanced', image: 'https://images.unsplash.com/photo-1599423300689-7d8a4d74a706?q=80&w=400&h=225&fit=crop', aiHint: 'code test'
    },
    {
        id: 49, title: 'Motion Design with After Effects', description: 'Create stunning motion graphics for web and video.', instructor: 'Aisha Nwosu', price: 38000, category: 'UI/UX Design', level: 'Advanced', image: 'https://images.unsplash.com/photo-1558655146-364adaf2e730?q=80&w=400&h=225&fit=crop', aiHint: 'motion graphics'
    },
    {
        id: 50, title: 'Computer Vision with OpenCV', description: 'Teach computers to see and interpret the visual world.', instructor: 'Dr. Evelyn Reed', price: 50000, category: 'Data Science & AI', level: 'Advanced', image: 'https://images.unsplash.com/photo-1533709403815-fd37f6a73a38?q=80&w=400&h=225&fit=crop', aiHint: 'computer vision'
    },
    {
        id: 51, title: 'Venture Capital: Raising Funds for Your Startup', description: 'Learn how to pitch to investors and secure funding.', instructor: 'Fatima Bello', price: 45000, category: 'Business & Entrepreneurship', level: 'Advanced', image: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?q=80&w=400&h=225&fit=crop', aiHint: 'venture capital'
    },
    {
        id: 52, title: 'Affiliate Marketing for Beginners', description: 'Earn passive income by promoting products you love.', instructor: 'Tunde Oladipo', price: 12000, category: 'Digital Marketing', level: 'Beginner', image: 'https://images.unsplash.com/photo-1556742512-35a0044a6a57?q=80&w=400&h=225&fit=crop', aiHint: 'affiliate links'
    },
    {
        id: 53, title: 'Web Scraping with Python', description: 'Extract data from websites using Beautiful Soup and Scrapy.', instructor: 'Samuel Adebayo', price: 22000, category: 'Web Development', level: 'Intermediate', image: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=400&h=225&fit=crop', aiHint: 'data scraping'
    },
];
