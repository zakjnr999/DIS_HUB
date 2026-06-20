import type { Order, OrderStatus } from "@/types/order";

const STORAGE_KEY = "dis-hub-orders";
export const ORDERS_CHANGED_EVENT = "dis-hub-orders-changed";

function canUseStorage() {
  return typeof window !== "undefined" && "localStorage" in window;
}

export function getOrders(): Order[] {
  if (!canUseStorage()) {
    return [];
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as Order[]) : [];
  } catch {
    return [];
  }
}

export function getOrdersSnapshot() {
  if (!canUseStorage()) {
    return "[]";
  }

  return window.localStorage.getItem(STORAGE_KEY) || "[]";
}

export function setOrders(orders: Order[]) {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  window.dispatchEvent(new Event(ORDERS_CHANGED_EVENT));
}

export function saveOrder(order: Order) {
  const nextOrders = [order, ...getOrders()];
  setOrders(nextOrders);
  return nextOrders;
}

export function updateOrderStatus(reference: string, status: OrderStatus) {
  const nextOrders = getOrders().map((order) =>
    order.reference === reference ? { ...order, status } : order,
  );
  setOrders(nextOrders);
  return nextOrders;
}

export function clearOrders() {
  setOrders([]);
}

export function getOrderByReference(reference: string) {
  return getOrders().find((order) => order.reference === reference);
}
