
"use client";

import type { User, Role } from "@/types";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (role: Role) => void;
  logout: () => void;
  updateUser: (newDetails: Partial<User>) => void;
  showAuthModal: boolean;
  setShowAuthModal: (show: boolean) => void;
  selectedRole: Role;
  setSelectedRole: (role: Role) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockUsers: Record<NonNullable<Role>, User> = {
  student: { id: "1", name: "Student User", email: "student@example.com", role: "student", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop" },
  instructor: { id: "2", name: "Instructor User", email: "instructor@example.com", role: "instructor", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop" },
  admin: { id: "3", name: "Admin User", email: "admin@example.com", role: "admin", avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=50&h=50&fit=crop" },
  business: { id: "4", name: "Business User", email: "business@example.com", role: "business", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop" },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const router = useRouter();

  const login = (role: Role) => {
    if (role && mockUsers[role]) {
      setUser(mockUsers[role]);
      setShowAuthModal(false);
      router.push(`/${role}/dashboard`);
    }
  };

  const logout = () => {
    setUser(null);
    router.push('/');
  };

  const updateUser = (newDetails: Partial<User>) => {
    if (user) {
        setUser(prevUser => prevUser ? { ...prevUser, ...newDetails } : null);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        updateUser,
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
