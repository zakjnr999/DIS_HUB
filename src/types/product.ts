export type StockStatus = "in-stock" | "low-stock" | "out-of-stock";

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  shortDescription: string;
  description: string;
  image: string;
  imageAlt: string;
  price: number;
  currency: "GHS";
  stockStatus: StockStatus;
  featured?: boolean;
  popular?: boolean;
  requiresConsultation?: boolean;
  usageNote?: string;
  importantInformation?: string;
  disclaimer?: string;
  priceConfigured?: boolean;
  createdOrder: number;
}
