import { businessConfig } from "@/config/business";
import { getProductById } from "@/data/products";
import type { CartItem, CartLine } from "@/types/cart";

const STORAGE_KEY = "dis-hub-cart";
export const CART_CHANGED_EVENT = "dis-hub-cart-changed";

function canUseStorage() {
  return typeof window !== "undefined" && "localStorage" in window;
}

export function getCartItems(): CartItem[] {
  if (!canUseStorage()) {
    return [];
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as CartItem[]) : [];
  } catch {
    return [];
  }
}

export function getCartSnapshot() {
  if (!canUseStorage()) {
    return "[]";
  }

  return window.localStorage.getItem(STORAGE_KEY) || "[]";
}

export function setCartItems(items: CartItem[]) {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(CART_CHANGED_EVENT));
}

export function addToCart(productId: string, quantity = 1) {
  const items = getCartItems();
  const existing = items.find((item) => item.productId === productId);

  const nextItems = existing
    ? items.map((item) =>
        item.productId === productId
          ? { ...item, quantity: Math.min(99, item.quantity + quantity) }
          : item,
      )
    : [{ productId, quantity }, ...items];

  setCartItems(nextItems);
  return nextItems;
}

export function removeFromCart(productId: string) {
  const nextItems = getCartItems().filter((item) => item.productId !== productId);
  setCartItems(nextItems);
  return nextItems;
}

export function updateQuantity(productId: string, quantity: number) {
  const normalizedQuantity = Math.max(1, Math.min(99, quantity));
  const nextItems = getCartItems().map((item) =>
    item.productId === productId ? { ...item, quantity: normalizedQuantity } : item,
  );
  setCartItems(nextItems);
  return nextItems;
}

export function clearCart() {
  setCartItems([]);
}

export function resolveCartLines(items: CartItem[]): CartLine[] {
  return items
    .map((item) => {
      const product = getProductById(item.productId);
      if (!product) {
        return null;
      }

      return {
        ...item,
        product,
        subtotal: product.price * item.quantity,
      };
    })
    .filter((line): line is CartLine => Boolean(line));
}

export function getCartTotal(lines: CartLine[]) {
  return lines.reduce((total, line) => total + line.subtotal, 0);
}

export function getCartCount(items: CartItem[]) {
  return items.reduce((total, item) => total + item.quantity, 0);
}

export function getDeliveryFee(lines: CartLine[]) {
  return lines.length ? businessConfig.deliveryFee : 0;
}
