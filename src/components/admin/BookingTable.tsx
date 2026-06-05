"use client";

import { StatusSelect } from "@/components/admin/StatusSelect";
import type { Booking, BookingStatus } from "@/types/booking";

export function BookingTable({
  bookings,
  onStatusChange,
}: {
  bookings: Booking[];
  onStatusChange: (reference: string, status: BookingStatus) => void;
}) {
  return (
    <div>
      <div className="grid gap-4 md:hidden">
        {bookings.map((booking) => (
          <article
            className="rounded-[2rem] border border-[#E8D8C3] bg-[#FFFDF8]/82 p-5 shadow-sm"
            key={booking.reference}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.1em] text-[#7A5636]">
                  {booking.reference}
                </p>
                <h3 className="mt-1 text-lg font-black text-[#1F1B18]">
                  {booking.customerName}
                </h3>
              </div>
              <span className="rounded-full bg-[#F7EFE3] px-3 py-1 text-xs font-black text-[#7A5636]">
                {booking.status}
              </span>
            </div>
            <div className="mt-4 grid gap-3 text-sm text-[#7B6F65]">
              <p>
                <strong className="text-[#3B2416]">Phone:</strong> {booking.phone}
              </p>
              <p>
                <strong className="text-[#3B2416]">Service:</strong>{" "}
                {booking.serviceType === "Other"
                  ? booking.customService
                  : booking.serviceType}
              </p>
              <p>
                <strong className="text-[#3B2416]">Material:</strong>{" "}
                {booking.materialType === "Other"
                  ? booking.customMaterial
                  : booking.materialType}
              </p>
              <p>
                <strong className="text-[#3B2416]">Schedule:</strong>{" "}
                {booking.preferredDate} at {booking.preferredTime}
              </p>
            </div>
            <div className="mt-4">
              <StatusSelect
                onChange={(status) => onStatusChange(booking.reference, status)}
                value={booking.status}
              />
            </div>
          </article>
        ))}
      </div>
      <div className="hidden overflow-hidden rounded-[2rem] border border-[#E8D8C3] bg-[#FFFDF8]/86 shadow-sm md:block">
        <div className="overflow-x-auto">
        <table className="min-w-[980px] w-full border-collapse text-left text-sm">
          <thead className="bg-[#F7EFE3] text-xs uppercase tracking-[0.08em] text-[#7A5636]">
            <tr>
              <th className="px-4 py-3">Reference</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Service</th>
              <th className="px-4 py-3">Material</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Pickup/delivery</th>
              <th className="px-4 py-3">Schedule</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr className="border-t border-[#E8D8C3]/65" key={booking.reference}>
                <td className="px-4 py-4 font-black text-[#7A5636]">
                  {booking.reference}
                </td>
                <td className="px-4 py-4 font-bold text-[#1F1B18]">
                  {booking.customerName}
                </td>
                <td className="px-4 py-4 text-[#7B6F65]">{booking.phone}</td>
                <td className="px-4 py-4 text-[#7B6F65]">
                  {booking.serviceType === "Other"
                    ? booking.customService
                    : booking.serviceType}
                </td>
                <td className="px-4 py-4 text-[#7B6F65]">
                  {booking.materialType === "Other"
                    ? booking.customMaterial
                    : booking.materialType}
                </td>
                <td className="px-4 py-4 text-[#7B6F65]">{booking.priceRange}</td>
                <td className="px-4 py-4 text-[#7B6F65]">{booking.pickupOption}</td>
                <td className="px-4 py-4 text-[#7B6F65]">
                  {booking.preferredDate} at {booking.preferredTime}
                </td>
                <td className="px-4 py-4">
                  <StatusSelect
                    onChange={(status) => onStatusChange(booking.reference, status)}
                    value={booking.status}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
