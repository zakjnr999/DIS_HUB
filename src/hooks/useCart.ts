"use client";

import { useMemo, useSyncExternalStore } from "react";
import {
  addToCart,
  CART_CHANGED_EVENT,
  clearCart,
  getCartCount,
  getCartSnapshot,
  getCartTotal,
  getDeliveryFee,
  removeFromCart,
  resolveCartLines,
  updateQuantity,
} from "@/lib/cartStorage";
import type { CartItem } from "@/types/cart";

export function useCart() {
  const snapshot = useSyncExternalStore(subscribe, getCartSnapshot, () => "[]");
  const items = useMemo(() => {
    try {
      return JSON.parse(snapshot) as CartItem[];
    } catch {
      return [];
    }
  }, [snapshot]);
  const lines = useMemo(() => resolveCartLines(items), [items]);
  const subtotal = useMemo(() => getCartTotal(lines), [lines]);
  const deliveryFee = useMemo(() => getDeliveryFee(lines), [lines]);

  return {
    addToCart,
    clearCart,
    count: getCartCount(items),
    deliveryFee,
    items,
    lines,
    removeFromCart,
    subtotal,
    total: subtotal + deliveryFee,
    updateQuantity,
  };
}

function subscribe(callback: () => void) {
  window.addEventListener(CART_CHANGED_EVENT, callback);
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener(CART_CHANGED_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}
