import type { Metadata } from "next";
import { OrderSuccessClient } from "@/components/checkout/OrderSuccessClient";

export const metadata: Metadata = {
  title: "Order Received",
  description: "Your demo order confirmation and support options.",
};

export default async function OrderSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ reference?: string }>;
}) {
  const params = await searchParams;

  return <OrderSuccessClient reference={params.reference} />;
}
