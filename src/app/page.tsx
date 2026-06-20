import type { Metadata } from "next";
import { HomeClientWrapper } from "@/components/home/HomeClientWrapper";

export const metadata: Metadata = {
  title: "Storefront | DO IT SAFE HUB",
  description:
    "Shop trusted contraceptive and sexual wellness products with clear information and discreet delivery.",
};

export default function HomePage() {
  return <HomeClientWrapper />;
}
