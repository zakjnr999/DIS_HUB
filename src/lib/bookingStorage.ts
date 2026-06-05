import type { Booking, BookingStatus } from "@/types/booking";

const STORAGE_KEY = "adi3ye-service-bookings";
export const BOOKINGS_CHANGED_EVENT = "adi3ye-bookings-changed";

function canUseStorage() {
  return typeof window !== "undefined" && "localStorage" in window;
}

export function getBookings(): Booking[] {
  if (!canUseStorage()) {
    return [];
  }

  try {
    const storedBookings = window.localStorage.getItem(STORAGE_KEY);
    return storedBookings ? (JSON.parse(storedBookings) as Booking[]) : [];
  } catch {
    return [];
  }
}

export function setBookings(bookings: Booking[]) {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  window.dispatchEvent(new Event(BOOKINGS_CHANGED_EVENT));
}

export function getBookingsSnapshot() {
  if (!canUseStorage()) {
    return "[]";
  }

  return window.localStorage.getItem(STORAGE_KEY) || "[]";
}

export function saveBooking(booking: Booking) {
  const bookings = getBookings();
  const nextBookings = [booking, ...bookings];
  setBookings(nextBookings);
  return nextBookings;
}

export function updateBookingStatus(reference: string, status: BookingStatus) {
  const bookings = getBookings();
  const nextBookings = bookings.map((booking) =>
    booking.reference === reference ? { ...booking, status } : booking,
  );

  setBookings(nextBookings);
  return nextBookings;
}

export function clearBookings() {
  setBookings([]);
}

export function getBookingByReference(reference: string) {
  return getBookings().find((booking) => booking.reference === reference);
}
