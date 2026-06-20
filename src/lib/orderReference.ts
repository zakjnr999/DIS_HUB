import type { Order } from "@/types/order";

export function createOrderReference(orders: Order[]) {
  const year = new Date().getFullYear();
  const nextNumber = orders.length + 1;
  return `CTR-${year}-${String(nextNumber).padStart(4, "0")}`;
}
