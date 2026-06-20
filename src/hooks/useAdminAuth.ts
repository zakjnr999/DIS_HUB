"use client";

import { useLocalStorage } from "./useLocalStorage";

export interface AdminUser {
  fullName: string;
  email: string;
}

export function useAdminAuth() {
  const [currentAdmin, setCurrentAdmin] = useLocalStorage<AdminUser | null>(
    "dis_current_admin",
    null
  );

  const login = (email: string, password?: string) => {
    if (!email || !password) {
      throw new Error("Email and password are required.");
    }
    const emailLower = email.toLowerCase().trim();
    if (emailLower === "admin@doitsafehub.com" && password === "Apple123") {
      const adminUser: AdminUser = {
        fullName: "Administrator",
        email: "admin@doitsafehub.com",
      };
      setCurrentAdmin(adminUser);
    } else {
      throw new Error("Invalid email or password.");
    }
  };

  const logout = () => {
    setCurrentAdmin(null);
  };

  return {
    currentAdmin,
    isAuthenticated: !!currentAdmin,
    login,
    logout,
  };
}
