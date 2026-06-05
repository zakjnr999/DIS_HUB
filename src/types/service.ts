import type { ComponentType, SVGProps } from "react";

export interface Service {
  slug: string;
  title: string;
  description: string;
  turnaround: string;
  image: string;
  imageAlt: string;
  iconName:
    | "dress"
    | "alteration"
    | "repair"
    | "embroidery"
    | "ironing"
    | "bridal"
    | "uniform"
    | "fabric";
}

export type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;
