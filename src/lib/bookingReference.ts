import type { Booking } from "@/types/booking";

export function createBookingReference(bookings: Booking[]) {
  const nextNumber = bookings.length + 1;
  return `AD-${String(nextNumber).padStart(3, "0")}`;
}
