"use client";

import { useMemo, useState } from "react";
import { EmptyOrders } from "@/components/admin/EmptyOrders";
import { OrderStats } from "@/components/admin/OrderStats";
import { OrderTable } from "@/components/admin/OrderTable";
import { Button } from "@/components/common/Button";
import { FieldShell, Input, Select } from "@/components/common/Field";
import { useOrders } from "@/hooks/useOrders";
import type { AdminUser } from "@/hooks/useAdminAuth";

export function AdminDashboard({
  currentAdmin,
  onLogout,
}: {
  currentAdmin: AdminUser | null;
  onLogout: () => void;
}) {
  const { clearDemoOrders, isReady, orderStatuses, orders, setStatus, stats } =
    useOrders();
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All statuses");

  const filteredOrders = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return orders.filter((order) => {
      const matchesQuery =
        !normalizedQuery ||
        [
          order.customer.fullName,
          order.reference,
          order.customer.phone,
          order.items.map((item) => item.product.name).join(" "),
        ]
          .filter((val): val is string => Boolean(val))
          .some((value) => value.toLowerCase().includes(normalizedQuery));

      const matchesStatus =
        statusFilter === "All statuses" || order.status === statusFilter;

      return matchesQuery && matchesStatus;
    });
  }, [orders, query, statusFilter]);

  function clearOrders() {
    const shouldClear = window.confirm(
      "Clear all demo orders stored in this browser?",
    );
    if (shouldClear) {
      clearDemoOrders();
    }
  }

  return (
    <div className="section-padding bg-slate-50">
      <div className="container-shell">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.12em] text-teal-800">
              Welcome back, {currentAdmin?.fullName || "Admin"}
            </p>
            <h1 className="mt-3 text-5xl font-light text-slate-950 md:text-6xl">
              Order admin
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-500">
              Review local ecommerce orders, update demo statuses, and confirm
              product, delivery, and payment details.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button onClick={onLogout} variant="secondary">
              Sign Out
            </Button>
            <Button onClick={clearOrders} variant="danger">
              Clear Demo Orders
            </Button>
          </div>
        </div>

        <OrderStats stats={stats} />

        <div className="mt-8 grid gap-4 rounded-md border border-slate-200 bg-white p-4 md:grid-cols-[1fr_260px]">
          <FieldShell label="Search orders">
            <Input
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Customer, reference, phone, or product"
              value={query}
            />
          </FieldShell>
          <FieldShell label="Filter by status">
            <Select
              onChange={(event) => setStatusFilter(event.target.value)}
              value={statusFilter}
            >
              <option>All statuses</option>
              {orderStatuses.map((status) => (
                <option key={status}>{status}</option>
              ))}
            </Select>
          </FieldShell>
        </div>

        <div className="mt-6">
          {!isReady ? (
            <div className="rounded-md border border-slate-200 bg-white p-8 text-center text-sm font-bold text-slate-500">
              Loading demo orders...
            </div>
          ) : orders.length === 0 ? (
            <EmptyOrders />
          ) : filteredOrders.length === 0 ? (
            <div className="rounded-md border border-slate-200 bg-white p-8 text-center text-sm font-bold text-slate-500">
              No orders match the current filters.
            </div>
          ) : (
            <OrderTable orders={filteredOrders} onStatusChange={setStatus} />
          )}
        </div>
      </div>
    </div>
  );
}
