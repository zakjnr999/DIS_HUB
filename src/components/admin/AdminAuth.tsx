"use client";

import { useState } from "react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { AdminIcon } from "@/components/icons";
import { FieldShell, Input } from "@/components/common/Field";
import { Button } from "@/components/common/Button";

export function AdminAuth() {
  const { login } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      login(email, password);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred.";
      setError(errorMessage);
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-[#fafaf7] px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
        <div className="flex flex-col items-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
            <AdminIcon className="h-8 w-8" />
          </div>
          <h2 className="mt-5 text-3xl font-extrabold text-slate-900">
            Admin Sign In
          </h2>
          <p className="mt-2 text-center text-sm text-slate-500">
            Access the local orders panel to manage store data.
          </p>
        </div>

        {error && (
          <div className="mt-6 rounded-2xl bg-red-50 p-4 border border-red-100 text-sm font-semibold text-red-800 animate-pulse">
            {error}
          </div>
        )}

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <FieldShell label="Email Address" required>
            <Input
              type="email"
              placeholder="admin@doitsafehub.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FieldShell>

          <FieldShell label="Password" required>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FieldShell>

          <Button type="submit" className="w-full mt-2" size="md">
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
}
