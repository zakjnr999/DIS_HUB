"use client";

import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";
import { ConfirmationIcon } from "@/components/icons";
import { businessConfig } from "@/config/business";
import { useBookings } from "@/hooks/useBookings";
import { createBookingWhatsAppMessage, createWhatsAppLink } from "@/lib/whatsapp";

export function BookingSuccess({ reference }: { reference?: string }) {
  const { bookings } = useBookings();
  const booking = bookings.find((item) => item.reference === reference);

  if (!reference) {
    return (
      <div className="section-padding bg-[#FBF6ED]">
        <div className="container-shell">
        <Card className="mx-auto max-w-2xl p-8 text-center">
          <h1 className="font-heading text-4xl font-bold text-[#1F1B18]">
            No booking reference found
          </h1>
          <Button className="mt-6" href="/book">
            Make a Booking
          </Button>
        </Card>
        </div>
      </div>
    );
  }

  const whatsappLink = booking
    ? createWhatsAppLink(createBookingWhatsAppMessage(booking))
    : createWhatsAppLink(businessConfig.whatsappDefaultMessage);

  return (
    <div className="section-padding bg-[#FBF6ED]">
      <div className="container-shell">
      <Card className="mx-auto max-w-3xl p-6 text-center md:p-9">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-[#F7EFE3] text-[#7A5636] shadow-inner">
          <ConfirmationIcon className="h-12 w-12" />
        </div>
        <h1 className="font-heading mt-6 text-4xl font-bold text-[#1F1B18] md:text-6xl">
          Your booking has been received
        </h1>
        <p className="mt-3 text-[#7B6F65]">
          Booking reference number:
          <span className="ml-2 rounded-full bg-[#F7EFE3] px-3 py-1 font-black text-[#7A5636]">
            {reference}
          </span>
        </p>

        {booking ? (
          <div className="mt-8 grid gap-3 rounded-[1.7rem] bg-[#F7EFE3] p-5 text-left sm:grid-cols-2">
            {[
              ["Customer", booking.customerName],
              ["Phone", booking.phone],
              [
                "Service",
                booking.serviceType === "Other"
                  ? booking.customService || booking.serviceType
                  : booking.serviceType,
              ],
              ["Material", booking.materialType],
              ["Price", booking.priceRange],
              ["Pickup/delivery", booking.pickupOption],
              ["Preferred date", booking.preferredDate],
              ["Preferred time", booking.preferredTime],
            ].map(([label, value]) => (
              <div key={label}>
                <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#7A5636]">
                  {label}
                </p>
                <p className="mt-1 font-bold text-[#1F1B18]">{value}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-6 rounded-2xl bg-[#F7EFE3] p-4 text-sm font-semibold text-[#7A5636]">
            This booking is not available in this browser storage. The reference
            number can still be shared with customer service.
          </p>
        )}

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          <Button href={whatsappLink}>Send Details on WhatsApp</Button>
          <Button href="/book" variant="secondary">
            Make Another Booking
          </Button>
          <Button href="/" variant="secondary">
            Go Home
          </Button>
        </div>
      </Card>
      </div>
    </div>
  );
}
