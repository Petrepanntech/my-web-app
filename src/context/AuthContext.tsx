
"use client";

import type { User, Role } from "@/types";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (role: Role) => void;
  logout: () => void;
  showAuthModal: boolean;
  setShowAuthModal: (show: boolean) => void;
  selectedRole: Role;
  setSelectedRole: (role: Role) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockUsers: { [key in NonNullable<Role>]: User } = {
    student: { id: "1", name: "Student User", email: "student@example.com", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop", role: "student" },
    instructor: { id: "2", name: "Instructor User", email: "instructor@example.com", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop", role: "instructor" },
    business: { id: "3", name: "Business User", email: "business@example.com", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop", role: "business" },
    admin: { id: "4", name: "Admin User", email: "admin@example.com", avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=50&h=50&fit=crop", role: "admin" },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role>('student');
  const router = useRouter();

  useEffect(() => {
    // Check if user is "logged in" from a previous session
    const savedUser = sessionStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (role: Role) => {
    if (!role) return;
    const mockUser = mockUsers[role];
    setUser(mockUser);
    sessionStorage.setItem("user", JSON.stringify(mockUser));
    setShowAuthModal(false);
    router.push(`/${role}/dashboard`);
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("user");
    router.push("/");
  };
  
  // This is a mock function, so we don't need a real loading state
  if (loading) {
    return null; 
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        showAuthModal,
        setShowAuthModal,
        selectedRole,
        setSelectedRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
