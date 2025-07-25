
import type { NavItem, NavGroup } from '@/types';

export const publicNavItems: NavItem[] = [
  { href: '/courses', label: 'Courses', roles: null },
  { href: '/instructors', label: 'Mentors', roles: null },
  { href: '/marketplace/tasks', label: 'Jobs', roles: null },
  { href: '/community', label: 'Community', roles: null },
  { href: '/about', label: 'About', roles: null },
];

export const allDashboardNavItems: NavGroup[] = [
    {
        label: 'Student',
        items: [
            { href: '/student/dashboard', label: 'Dashboard', roles: ['student'] },
            { href: '/student/courses', label: 'My Courses', roles: ['student'] },
            { href: '/student/learning-path', label: 'Learning Path', roles: ['student'] },
            { href: '/student/assignments', label: 'Assignments', roles: ['student'] },
            { href: '/student/cbt-practice', label: 'CBT Practice', roles: ['student'] },
            { href: '/student/achievements', label: 'Achievements', roles: ['student'] },
            { href: '/student/ai-tutor', label: 'AI Tutor', roles: ['student'] },
        ]
    },
    {
        label: 'Instructor',
        items: [
            { href: '/instructor/dashboard', label: 'Dashboard', roles: ['instructor'] },
            { href: '/instructor/courses', label: 'My Courses', roles: ['instructor'] },
            { href: '/instructor/students', label: 'My Students', roles: ['instructor'] },
            { href: '/instructor/earnings', label: 'Earnings', roles: ['instructor'] },
            { href: '/instructor/analytics', label: 'Analytics', roles: ['instructor'] },
        ]
    },
    {
        label: 'Admin',
        items: [
            { href: '/admin/dashboard', label: 'Dashboard', roles: ['admin'] },
            { href: '/admin/course-management', label: 'Course Management', roles: ['admin'] },
            { href: '/admin/user-management', label: 'User Management', roles: ['admin'] },
            { href: '/admin/instructor-marketplace', label: 'Instructor Marketplace', roles: ['admin'] },
            { href: '/admin/marketplace-admin', label: 'Marketplace Admin', roles: ['admin'] },
            { href: '/admin/analytics', label: 'Analytics', roles: ['admin'] },
            { href: '/admin/referrals', label: 'Referrals', roles: ['admin'] },
            { href: '/admin/communications', label: 'Communications', roles: ['admin'] },
            { href: '/admin/security', label: 'Security', roles: ['admin'] },
        ]
    },
    {
        label: 'Business',
        items: [
            { href: '/business/dashboard', label: 'Dashboard', roles: ['business'] },
            { href: '/business/tasks', label: 'My Tasks/Bids', roles: ['business'] },
            { href: '/business/mou', label: 'MOU Management', roles: ['business'] },
            { href: '/business/consultancy', label: 'Consultancy', roles: ['business'] },
        ]
    }
]
