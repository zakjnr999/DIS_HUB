import type { Metadata } from "next";
import { CartClient } from "@/components/cart/CartClient";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review your selected products before private checkout.",
};

export default function CartPage() {
  return <CartClient />;
}
