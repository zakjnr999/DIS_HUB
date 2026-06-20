import type { Metadata } from "next";
import { EcommerceHome } from "@/components/home/EcommerceHome";

export const metadata: Metadata = {
  title: "Storefront | DO IT SAFE HUB",
  description:
    "Shop trusted contraceptive and sexual wellness products with clear information and discreet delivery.",
};

export default function HomePage() {
  return <EcommerceHome />;
}
