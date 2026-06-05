import { businessConfig } from "@/config/business";
import type { Booking } from "@/types/booking";

export function createWhatsAppLink(message: string) {
  return `https://wa.me/${businessConfig.whatsappNumber}?text=${encodeURIComponent(
    message,
  )}`;
}

export function createBookingWhatsAppMessage(booking: Booking) {
  const service =
    booking.serviceType === "Other" ? booking.customService : booking.serviceType;
  const material =
    booking.materialType === "Other"
      ? booking.customMaterial
      : booking.materialType;

  return [
    `Hello Adi3ye Services, here are my booking details.`,
    `Booking reference: ${booking.reference}`,
    `Customer name: ${booking.customerName}`,
    `Phone number: ${booking.phone}`,
    `Service type: ${service}`,
    `Material type: ${material}`,
    `Price range: ${booking.priceRange}`,
    `Pickup/delivery option: ${booking.pickupOption}`,
    `Preferred date: ${booking.preferredDate}`,
    `Preferred time: ${booking.preferredTime}`,
    booking.notes ? `Notes: ${booking.notes}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}
