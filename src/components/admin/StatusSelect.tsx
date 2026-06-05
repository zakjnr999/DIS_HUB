"use client";

import { Select } from "@/components/common/Field";
import { bookingStatuses } from "@/data/bookingStatuses";
import type { BookingStatus } from "@/types/booking";

export function StatusSelect({
  onChange,
  value,
}: {
  onChange: (status: BookingStatus) => void;
  value: BookingStatus;
}) {
  return (
    <Select
      aria-label="Update booking status"
      className="min-w-48 rounded-full py-2"
      onChange={(event) => onChange(event.target.value as BookingStatus)}
      value={value}
    >
      {bookingStatuses.map((status) => (
        <option key={status} value={status}>
          {status}
        </option>
      ))}
    </Select>
  );
}
