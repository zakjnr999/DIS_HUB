"use client";

import { Select } from "@/components/common/Field";
import { orderStatuses } from "@/hooks/useOrders";
import type { OrderStatus } from "@/types/order";

export function StatusSelect({
  onChange,
  value,
}: {
  onChange: (status: OrderStatus) => void;
  value: OrderStatus;
}) {
  return (
    <Select
      aria-label="Update order status"
      className="min-w-48 rounded-md py-2"
      onChange={(event) => onChange(event.target.value as OrderStatus)}
      value={value}
    >
      {orderStatuses.map((status) => (
        <option key={status} value={status}>
          {status}
        </option>
      ))}
    </Select>
  );
}
