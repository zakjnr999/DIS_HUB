"use client";

import { useMemo, useState } from "react";
import { BookingStats } from "@/components/admin/BookingStats";
import { BookingTable } from "@/components/admin/BookingTable";
import { EmptyBookings } from "@/components/admin/EmptyBookings";
import { Button } from "@/components/common/Button";
import { FieldShell, Input, Select } from "@/components/common/Field";
import { bookingStatuses } from "@/data/bookingStatuses";
import { useBookings } from "@/hooks/useBookings";

export function AdminDashboard() {
  const { bookings, clearDemoBookings, isReady, setStatus, stats } = useBookings();
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All statuses");

  const filteredBookings = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return bookings.filter((booking) => {
      const matchesQuery =
        !normalizedQuery ||
        [
          booking.customerName,
          booking.reference,
          booking.serviceType,
          booking.customService,
        ]
          .filter(Boolean)
          .some((value) => value?.toLowerCase().includes(normalizedQuery));

      const matchesStatus =
        statusFilter === "All statuses" || booking.status === statusFilter;

      return matchesQuery && matchesStatus;
    });
  }, [bookings, query, statusFilter]);

  function clearBookings() {
    const shouldClear = window.confirm(
      "Clear all demo bookings stored in this browser?",
    );
    if (shouldClear) {
      clearDemoBookings();
    }
  }

  return (
    <div className="section-padding bg-[#FBF6ED]">
      <div className="container-shell">
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.12em] text-[#7A5636]">
            Presentation dashboard
          </p>
          <h1 className="font-heading mt-3 text-5xl font-bold text-[#1F1B18] md:text-7xl">
            Booking admin
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#7B6F65]">
            Demo-only local dashboard for reviewing bookings and updating status
            while keeping the structure ready for authentication and API calls.
          </p>
          <div className="stitch-line mt-6 w-36" />
        </div>
        <Button onClick={clearBookings} variant="danger">
          Clear Demo Bookings
        </Button>
      </div>

      <BookingStats stats={stats} />

      <div className="mt-8 grid gap-4 rounded-[2rem] border border-[#E8D8C3] bg-[#FFFDF8]/76 p-4 shadow-sm md:grid-cols-[1fr_260px]">
        <FieldShell label="Search bookings">
          <Input
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Customer, reference, or service"
            value={query}
          />
        </FieldShell>
        <FieldShell label="Filter by status">
          <Select
            onChange={(event) => setStatusFilter(event.target.value)}
            value={statusFilter}
          >
            <option>All statuses</option>
            {bookingStatuses.map((status) => (
              <option key={status}>{status}</option>
            ))}
          </Select>
        </FieldShell>
      </div>

      <div className="mt-6">
        {!isReady ? (
          <div className="rounded-[2rem] border border-[#E8D8C3] bg-[#FFFDF8] p-8 text-center text-sm font-bold text-[#7B6F65]">
            Loading demo bookings...
          </div>
        ) : bookings.length === 0 ? (
          <EmptyBookings />
        ) : filteredBookings.length === 0 ? (
          <div className="rounded-[2rem] border border-[#E8D8C3] bg-[#FFFDF8] p-8 text-center text-sm font-bold text-[#7B6F65]">
            No bookings match the current filters.
          </div>
        ) : (
          <BookingTable bookings={filteredBookings} onStatusChange={setStatus} />
        )}
      </div>
      </div>
    </div>
  );
}
