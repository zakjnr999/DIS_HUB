import type { Booking } from "@/types/booking";

export function createBookingReference(bookings: Booking[]) {
  const year = new Date().getFullYear();
  const currentYearBookings = bookings.filter((booking) =>
    booking.reference.startsWith(`ADI-${year}-`),
  );
  const nextNumber = currentYearBookings.length + 1;

  return `ADI-${year}-${String(nextNumber).padStart(4, "0")}`;
}
