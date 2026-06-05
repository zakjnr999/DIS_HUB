import { images } from "@/config/images";
import type { Service } from "@/types/service";

export const services: Service[] = [
  {
    slug: "custom-dress-sewing",
    title: "Custom Dress Sewing",
    description:
      "We create beautiful custom dresses based on your preferred style, measurements, and design inspiration.",
    turnaround: "3-7 days depending on design complexity.",
    image: images.services.customDressSewing.src,
    imageAlt: images.services.customDressSewing.alt,
    iconName: "dress",
  },
  {
    slug: "dress-alteration",
    title: "Dress Alteration",
    description:
      "Resize, adjust, and refit dresses or clothing items to improve comfort and appearance.",
    turnaround: "1-3 days depending on the work needed.",
    image: images.services.dressAlteration.src,
    imageAlt: images.services.dressAlteration.alt,
    iconName: "alteration",
  },
  {
    slug: "repairs-mending",
    title: "Repairs & Mending",
    description:
      "Fix torn clothes, damaged seams, loose buttons, broken zips, and other clothing issues.",
    turnaround: "Same day to 2 days depending on the repair.",
    image: images.services.repairsMending.src,
    imageAlt: images.services.repairsMending.alt,
    iconName: "repair",
  },
  {
    slug: "beading-embroidery",
    title: "Beading & Embroidery",
    description:
      "Add beautiful decorative details, beadwork, embroidery, and custom finishing to your outfit.",
    turnaround: "3-10 days depending on design details.",
    image: images.services.beadingEmbroidery.src,
    imageAlt: images.services.beadingEmbroidery.alt,
    iconName: "embroidery",
  },
  {
    slug: "ironing-pressing",
    title: "Ironing & Pressing",
    description:
      "Professional ironing and pressing to give your clothes a neat, clean, and polished finish.",
    turnaround: "Same day or next day.",
    image: images.services.ironingPressing.src,
    imageAlt: images.services.ironingPressing.alt,
    iconName: "ironing",
  },
  {
    slug: "bridal-occasion-wear",
    title: "Bridal / Occasion Wear",
    description:
      "Special sewing, adjustments, and finishing for bridal dresses, engagement outfits, and occasion wear.",
    turnaround: "Depends on style and urgency.",
    image: images.services.bridalOccasion.src,
    imageAlt: images.services.bridalOccasion.alt,
    iconName: "bridal",
  },
  {
    slug: "uniform-sewing",
    title: "Uniform Sewing",
    description:
      "Neat and professional uniform sewing for individuals, schools, groups, or businesses.",
    turnaround: "Depends on quantity and design.",
    image: images.services.uniformSewing.src,
    imageAlt: images.services.uniformSewing.alt,
    iconName: "uniform",
  },
  {
    slug: "fabric-consultation",
    title: "Fabric Consultation",
    description:
      "We help you choose suitable fabrics and materials for your outfit, style, and event.",
    turnaround: "Available on request.",
    image: images.services.fabricConsultation.src,
    imageAlt: images.services.fabricConsultation.alt,
    iconName: "fabric",
  },
];

export const serviceOptions = [...services.map((service) => service.title), "Other"];
