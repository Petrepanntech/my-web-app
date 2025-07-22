
export interface Task {
    id: string;
    title: string;
    budget: number;
    skills: string[];
    bids: number;
    category: string;
}

export const taskCategories = [
    { title: "Web Development", slug: "web-development" },
    { title: "UI/UX Design", slug: "ui-ux-design" },
    { title: "Content Writing", slug: "content-writing" },
    { title: "Digital Marketing", slug: "digital-marketing" },
    { title: "Data Science", slug: "data-science" },
    { title: "Mobile Development", slug: "mobile-development" },
]

export const allTasks: Task[] = [
    { id: "1", title: "Build a Landing Page for a New SaaS Product", budget: 80000, skills: ["HTML", "CSS", "React", "Next.js"], bids: 5, category: "Web Development" },
    { id: "2", title: "Design a Mobile App UI in Figma", budget: 120000, skills: ["UI/UX", "Figma", "Mobile Design"], bids: 8, category: "UI/UX Design" },
    { id: "3", title: "Write SEO-Optimized Blog Posts for a Tech Blog", budget: 15000, skills: ["Content Writing", "SEO"], bids: 12, category: "Content Writing" },
    { id: "4", title: "Develop a REST API for a Student Management System", budget: 150000, skills: ["Node.js", "Express", "MongoDB", "API"], bids: 3, category: "Web Development" },
    { id: "5", title: "Create a Brand Identity and Logo", budget: 50000, skills: ["Branding", "Logo Design", "Illustrator"], bids: 15, category: "UI/UX Design" },
    { id: "6", title: "Manage Social Media Accounts for a Fashion Brand", budget: 40000, skills: ["Social Media", "Content Creation"], bids: 7, category: "Digital Marketing" },
    { id: "7", title: "Build a Customer Churn Prediction Model", budget: 180000, skills: ["Python", "Scikit-learn", "Pandas"], bids: 2, category: "Data Science" },
    { id: "8", title: "Convert a Website from WordPress to Next.js", budget: 200000, skills: ["Next.js", "WordPress", "React", "API"], bids: 4, category: "Web Development" },
    { id: "9", title: "Technical Writer for API Documentation", budget: 60000, skills: ["Technical Writing", "API"], bids: 9, category: "Content Writing" },
    { id: "10", title: "Set Up and Manage Google Ads Campaign", budget: 35000, skills: ["Google Ads", "PPC", "SEM"], bids: 11, category: "Digital Marketing" },
    { id: "11", title: "Create a 3D Product Mockup in Blender", budget: 75000, skills: ["Blender", "3D Modeling"], bids: 6, category: "UI/UX Design" },
    { id: "12", title: "Build a Simple E-commerce Site with Shopify", budget: 90000, skills: ["Shopify", "Liquid", "E-commerce"], bids: 8, category: "Web Development" },
    { id: "13", title: "User Research for a New Fintech App", budget: 55000, skills: ["User Research", "UX"], bids: 10, category: "UI/UX Design" },
    { id: "14", title: "Data Cleaning and Preparation for a Sales Dataset", budget: 25000, skills: ["Excel", "Python", "Pandas"], bids: 18, category: "Data Science" },
    { id: "15", title: "Develop a React Native Mobile App", budget: 190000, skills: ["React Native", "iOS", "Android"], bids: 3, category: "Mobile Development" },
    { id: "16", title: "Content Calendar Planning for Q4", budget: 20000, skills: ["Content Strategy", "SEO"], bids: 14, category: "Content Writing" },
    { id: "17", title: "Email Marketing Campaign Setup in Mailchimp", budget: 30000, skills: ["Email Marketing", "Mailchimp"], bids: 9, category: "Digital Marketing" },
    { id: "18", title: "Create a Dashboard with Tableau", budget: 70000, skills: ["Tableau", "Data Visualization"], bids: 5, category: "Data Science" },
    { id: "19", title: "Fix CSS Bugs on a Live Website", budget: 10000, skills: ["CSS", "HTML", "Debugging"], bids: 25, category: "Web Development" },
    { id: "20", title: "Redesign a 5-page Website", budget: 110000, skills: ["UI/UX", "Figma", "Web Design"], bids: 7, category: "UI/UX Design" },
    { id: "21", title: "Write a Whitepaper on AI in Healthcare", budget: 45000, skills: ["Research", "Writing", "AI"], bids: 11, category: "Content Writing" },
    { id: "22", title: "SEO Audit and Keyword Research", budget: 28000, skills: ["SEO", "Ahrefs", "Semrush"], bids: 13, category: "Digital Marketing" },
    { id: "23", title: "Develop a Custom WordPress Plugin", budget: 65000, skills: ["PHP", "WordPress", "JavaScript"], bids: 6, category: "Web Development" },
    { id: "24", title: "Create Animated Explainer Video", budget: 95000, skills: ["After Effects", "Motion Graphics"], bids: 4, category: "UI/UX Design" },
    { id: "25", title: "Build a Web Scraper to Collect Job Postings", budget: 50000, skills: ["Python", "Beautiful Soup", "Scrapy"], bids: 8, category: "Data Science" },
    { id: "26", title: "Flutter Developer for a To-Do List App", budget: 130000, skills: ["Flutter", "Dart", "Firebase"], bids: 5, category: "Mobile Development" },
    { id: "27", "title": "Proofread and Edit a 50-page Ebook", "budget": 18000, "skills": ["Editing", "Proofreading"], "bids": 16, "category": "Content Writing" },
    { id: "28", "title": "Create a Pitch Deck for a Startup", "budget": 40000, "skills": ["PowerPoint", "Keynote", "Storytelling"], "bids": 10, "category": "UI/UX Design" },
    { id: "29", "title": "Optimize Website for Core Web Vitals", "budget": 60000, "skills": ["Web Performance", "Lighthouse", "JavaScript"], "bids": 7, "category": "Web Development" },
    { id: "30", "title": "Sentiment Analysis of Customer Reviews", "budget": 85000, "skills": ["NLP", "Python", "TextBlob"], "bids": 3, "category": "Data Science" },
    { id: "31", "title": "Influencer Marketing Campaign Management", "budget": 55000, "skills": ["Influencer Marketing", "Social Media"], "bids": 9, "category": "Digital Marketing" },
    { id: "32", "title": "Create a Design System in Figma", "budget": 150000, "skills": ["Design Systems", "Figma", "UI/UX"], "bids": 4, "category": "UI/UX Design" },
    { id: "33", "title": "Build a GraphQL API with Apollo Server", "budget": 140000, "skills": ["GraphQL", "Node.js", "Apollo"], "bids": 5, "category": "Web Development" },
    { id: "34", "title": "Translate Document from English to Yoruba", "budget": 12000, "skills": ["Translation", "Yoruba", "English"], "bids": 20, "category": "Content Writing" },
    { id: "35", "title": "Add Push Notifications to an iOS App", "budget": 35000, "skills": ["Swift", "Firebase", "iOS"], "bids": 8, "category": "Mobile Development" },
    { id: "36", "title": "Setup Email Automation Flows", "budget": 45000, "skills": ["Email Marketing", "Automation"], "bids": 11, "category": "Digital Marketing" },
    { id: "37", "title": "A/B Testing for a Landing Page", "budget": 30000, "skills": ["A/B Testing", "CRO", "Google Optimize"], "bids": 12, "category": "Digital Marketing" },
    { id: "38", "title": "Create a User Persona for a Travel App", "budget": 22000, "skills": ["UX Research", "Persona"], "bids": 15, "category": "UI/UX Design" },
    { id: "39", "title": "Deploy a Django App on Heroku", "budget": 15000, "skills": ["Django", "Heroku", "DevOps"], "bids": 18, "category": "Web Development" },
    { id: "40", "title": "Time Series Forecasting for Sales Data", "budget": 100000, "skills": ["R", "Forecast", "Statistics"], "bids": 4, "category": "Data Science" },
    { id: "41", "title": "Develop a Chrome Extension", "budget": 70000, "skills": ["JavaScript", "HTML", "CSS", "Chrome API"], "bids": 9, "category": "Web Development" },
    { id: "42", "title": "Create an Infographic for a Blog Post", "budget": 18000, "skills": ["Graphic Design", "Canva", "Illustrator"], "bids": 17, "category": "UI/UX Design" },
    { id: "43", "title": "Write 10 Product Descriptions for an E-commerce Store", "budget": 8000, "skills": ["Copywriting", "E-commerce"], "bids": 22, "category": "Content Writing" },
    { id: "44", "title": "Link Building for a New Website", "budget": 50000, "skills": ["SEO", "Link Building"], "bids": 10, "category": "Digital Marketing" },
    { id: "45", "title": "Database Optimization for a MySQL Server", "budget": 90000, "skills": ["MySQL", "Database", "Performance"], "bids": 6, "category": "Web Development" },
    { id: "46", "title": "Create a Recommender System for a Movie App", "budget": 160000, "skills": ["Machine Learning", "Python", "Collaborative Filtering"], "bids": 3, "category": "Data Science" },
    { id: "47", "title": "Bug Fixes for an Android App", "budget": 45000, "skills": ["Android", "Kotlin", "Java", "Debugging"], "bids": 8, "category": "Mobile Development" },
    { id: "48", "title": "Conduct a Competitor Analysis Report", "budget": 35000, "skills": ["Market Research", "Strategy"], "bids": 12, "category": "Digital Marketing" },
    { id: "49", "title": "User Flow Diagramming for a Checkout Process", "budget": 30000, "skills": ["UX", "Figma", "Miro"], "bids": 14, "category": "UI/UX Design" },
    { id: "50", "title": "Integrate Stripe Payment Gateway", "budget": 40000, "skills": ["Stripe API", "Node.js", "React"], "bids": 11, "category": "Web Development" },
    { id: "51", "title": "Create a Voice User Interface (VUI) design for Alexa", "budget": 75000, "skills": ["VUI Design", "Conversation Design"], "bids": 7, "category": "UI/UX Design" }
]
