export type Role = 'student' | 'mentor' | 'admin' | 'business' | null;

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: Role;
}

export interface NavItem {
  href: string;
  label: string;
  roles: Role[];
}

export interface NavGroup {
    label: string;
    items: NavItem[];
}
