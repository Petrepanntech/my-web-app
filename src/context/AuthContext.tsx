
"use client";

import type { User, Role } from "@/types";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase"; // We still need this for client-side sign-in
import { signInWithEmailAndPassword } from "firebase/auth";
import { Loader2 } from "lucide-react";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean; // Expose loading state
  login: (email: any, password: any) => Promise<void>;
  signup: (email: any, password: any, name: any, role: any) => Promise<void>;
  logout: () => void;
  showAuthModal: boolean;
  setShowAuthModal: (show: boolean) => void;
  selectedRole: Role;
  setSelectedRole: (role: Role) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role>('student');
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          if (data.isAuthenticated) {
            setUser(data.user);
          }
        }
      } catch (error) {
        console.error("Failed to fetch user status", error);
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, []);

  const signup = async (email: any, password: any, name: any, role: any) => {
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name, role }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Signup failed');
    }
    
    // After signup, fetch the canonical user data to ensure consistency
    const userRes = await fetch('/api/auth/me');
    const { user: newUserData } = await userRes.json();
    setUser(newUserData);

    setShowAuthModal(false);
    router.push(`/${role}/dashboard`);
    router.refresh(); // Refresh server components
  };

  const login = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const idToken = await userCredential.user.getIdToken();

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Login failed');
    }
    
    // Fetch the user data to set the context
    const userRes = await fetch('/api/auth/me');
    const { user: loggedInUser } = await userRes.json();
    setUser(loggedInUser);
    setShowAuthModal(false);
    router.push(`/${loggedInUser.role}/dashboard`);
    router.refresh();
  };

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
    router.push('/');
    router.refresh();
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        signup,
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
