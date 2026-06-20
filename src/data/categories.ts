import type { ComponentType, SVGProps } from "react";
import { CondomIcon, PillIcon, TestKitIcon } from "@/components/icons";
import { products } from "@/data/products";

export interface ProductCategory {
  name: string;
  slug: string;
  description: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export const productCategories: ProductCategory[] = [
  {
    name: "Emergency Contraceptives",
    slug: "emergency-contraceptives",
    description: "Options for time-sensitive contraceptive needs.",
    icon: PillIcon,
  },
  {
    name: "Condoms",
    slug: "condoms",
    description: "Barrier products packaged for simple, discreet ordering.",
    icon: CondomIcon,
  },
  {
    name: "Pregnancy Test Kits",
    slug: "pregnancy-test-kits",
    description: "Home test kits with clear package instructions.",
    icon: TestKitIcon,
  },
  {
    name: "Daily Contraceptive Pills",
    slug: "daily-contraceptive-pills",
    description: "Routine pill options that may require professional guidance.",
    icon: PillIcon,
  },
].filter((category) =>
  products.some((product) => product.category === category.name),
);

export function getCategoryCount(categoryName: string) {
  return products.filter((product) => product.category === categoryName).length;
}
