import type { Metadata } from "next";
import { ShopClient } from "@/components/products/ShopClient";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Browse contraceptive and sexual wellness products with discreet delivery and clear product information.",
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;

  return <ShopClient initialCategory={params.category} />;
}
