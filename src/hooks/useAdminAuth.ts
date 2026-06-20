"use client";

import { useLocalStorage } from "./useLocalStorage";

export interface AdminUser {
  fullName: string;
  email: string;
  password?: string;
}

export function useAdminAuth() {
  const [admins, setAdmins] = useLocalStorage<AdminUser[]>("dis_admin_users", []);
  const [currentAdmin, setCurrentAdmin] = useLocalStorage<AdminUser | null>(
    "dis_current_admin",
    null
  );

  const register = (user: AdminUser) => {
    if (!user.email || !user.password || !user.fullName) {
      throw new Error("All fields are required.");
    }
    const emailLower = user.email.toLowerCase();
    if (admins.some((a) => a.email.toLowerCase() === emailLower)) {
      throw new Error("An admin account with this email already exists.");
    }
    const updatedAdmins = [...admins, user];
    setAdmins(updatedAdmins);
  };

  const login = (email: string, password?: string) => {
    if (!email || !password) {
      throw new Error("Email and password are required.");
    }
    const emailLower = email.toLowerCase();
    const found = admins.find(
      (a) => a.email.toLowerCase() === emailLower && a.password === password
    );
    if (!found) {
      throw new Error("Invalid email or password.");
    }
    setCurrentAdmin(found);
  };

  const logout = () => {
    setCurrentAdmin(null);
  };

  return {
    admins,
    currentAdmin,
    isAuthenticated: !!currentAdmin,
    register,
    login,
    logout,
  };
}
