"use client";

import { useAdminAuth } from "@/hooks/useAdminAuth";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { AdminAuth } from "@/components/admin/AdminAuth";

export default function AdminPage() {
  const { isAuthenticated, logout, currentAdmin } = useAdminAuth();

  if (!isAuthenticated) {
    return <AdminAuth />;
  }

  return <AdminDashboard currentAdmin={currentAdmin} onLogout={logout} />;
}
