import type { Metadata } from "next";
import { CheckoutClient } from "@/components/checkout/CheckoutClient";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete a private demo order with discreet delivery details.",
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}
