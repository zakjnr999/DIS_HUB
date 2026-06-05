"use client";

import { useMemo, useSyncExternalStore } from "react";
import { bookingStatuses } from "@/data/bookingStatuses";
import {
  BOOKINGS_CHANGED_EVENT,
  clearBookings,
  getBookingsSnapshot,
  updateBookingStatus,
} from "@/lib/bookingStorage";
import type { Booking, BookingStatus } from "@/types/booking";

export function useBookings() {
  const snapshot = useSyncExternalStore(subscribe, getBookingsSnapshot, () => "[]");
  const bookings = useMemo(() => {
    try {
      return JSON.parse(snapshot) as Booking[];
    } catch {
      return [];
    }
  }, [snapshot]);

  function setStatus(reference: string, status: BookingStatus) {
    updateBookingStatus(reference, status);
  }

  function clearDemoBookings() {
    clearBookings();
  }

  const stats = {
    total: bookings.length,
    received: bookings.filter((booking) => booking.status === "Booking Received")
      .length,
    inProgress: bookings.filter((booking) => booking.status === "In Progress")
      .length,
    completed: bookings.filter((booking) => booking.status === "Completed")
      .length,
  };

  return {
    bookings,
    bookingStatuses,
    clearDemoBookings,
    isReady: true,
    setStatus,
    stats,
  };
}

function subscribe(callback: () => void) {
  window.addEventListener(BOOKINGS_CHANGED_EVENT, callback);
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener(BOOKINGS_CHANGED_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}
