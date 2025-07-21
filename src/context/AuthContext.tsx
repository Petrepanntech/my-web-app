"use client";

import type { User, Role } from "@/types";
import React, { createContext, useContext, useState, ReactNode } from "react";

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

const mockUsers: Record<NonNullable<Role>, User> = {
  student: { id: "1", name: "Student User", email: "student@example.com", role: "student", avatar: "https://i.pravatar.cc/150?u=student" },
  instructor: { id: "2", name: "Instructor User", email: "instructor@example.com", role: "instructor", avatar: "https://i.pravatar.cc/150?u=instructor" },
  admin: { id: "3", name: "Admin User", email: "admin@example.com", role: "admin", avatar: "https://i.pravatar.cc/150?u=admin" },
  business: { id: "4", name: "Business User", email: "business@example.com", role: "business", avatar: "https://i.pravatar.cc/150?u=business" },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role>(null);

  const login = (role: Role) => {
    if (role && mockUsers[role]) {
      setUser(mockUsers[role]);
      setShowAuthModal(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

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
