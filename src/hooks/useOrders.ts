"use client";

import { useMemo, useSyncExternalStore } from "react";
import {
  clearOrders,
  getOrdersSnapshot,
  ORDERS_CHANGED_EVENT,
  updateOrderStatus,
} from "@/lib/orderStorage";
import type { Order, OrderStatus } from "@/types/order";

export const orderStatuses: OrderStatus[] = [
  "Order Received",
  "Confirmed",
  "Processing",
  "Out for Delivery",
  "Delivered",
  "Cancelled",
];

export function useOrders() {
  const snapshot = useSyncExternalStore(subscribe, getOrdersSnapshot, () => "[]");
  const orders = useMemo(() => {
    try {
      return JSON.parse(snapshot) as Order[];
    } catch {
      return [];
    }
  }, [snapshot]);

  const stats = {
    total: orders.length,
    pending: orders.filter((order) => order.status === "Order Received").length,
    processing: orders.filter((order) => order.status === "Processing").length,
    outForDelivery: orders.filter((order) => order.status === "Out for Delivery")
      .length,
    delivered: orders.filter((order) => order.status === "Delivered").length,
    cancelled: orders.filter((order) => order.status === "Cancelled").length,
    revenue: orders
      .filter((order) => order.status !== "Cancelled")
      .reduce((total, order) => total + order.total, 0),
  };

  return {
    clearDemoOrders: clearOrders,
    isReady: true,
    orderStatuses,
    orders,
    setStatus: updateOrderStatus,
    stats,
  };
}

function subscribe(callback: () => void) {
  window.addEventListener(ORDERS_CHANGED_EVENT, callback);
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener(ORDERS_CHANGED_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}
