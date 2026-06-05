import type { BookingStatus } from "@/types/booking";

export const bookingStatuses: BookingStatus[] = [
  "Booking Received",
  "Awaiting Confirmation",
  "In Progress",
  "Ready for Pickup",
  "Ready for Delivery",
  "Completed",
  "Cancelled",
];
