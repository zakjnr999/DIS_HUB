import { images, productImages } from "@/config/images";
import type { Product, StockStatus } from "@/types/product";

const sharedDisclaimer =
  "Product information is provided for general guidance and does not replace advice from a qualified healthcare professional.";

function product(product: Omit<Product, "currency" | "priceConfigured">): Product {
  return { ...product, currency: "GHS", priceConfigured: product.price > 0 };
}

export const products: Product[] = [
  product({
    id: "postinor-2",
    slug: "postinor-2",
    name: "Postinor-2",
    category: "Emergency Contraceptives",
    shortDescription: "Levonorgestrel emergency contraceptive pack.",
    description:
      "Postinor-2 is an emergency contraceptive product. Follow the product leaflet and speak with a qualified healthcare professional when you need personal guidance.",
    image: productImages.singles.postinor2.src,
    imageAlt: productImages.singles.postinor2.alt,
    price: 5.5,
    stockStatus: "in-stock",
    featured: true,
    popular: true,
    requiresConsultation: true,
    usageNote: "Read and follow the instructions in the product package.",
    importantInformation:
      "Emergency contraception is not intended for routine ongoing contraception. Ask a pharmacist or clinician when unsure.",
    disclaimer: sharedDisclaimer,
    createdOrder: 1,
  }),
  product({
    id: "lydia-postpill",
    slug: "lydia-postpill",
    name: "Lydia Postpill",
    category: "Emergency Contraceptives",
    shortDescription: "Emergency contraception pill, 1.5 mg pack.",
    description:
      "Lydia Postpill is an emergency contraceptive product. Use only as directed by the product information and seek professional guidance for personal questions.",
    image: images.products.lydiaPostpill.src,
    imageAlt: images.products.lydiaPostpill.alt,
    price: 22,
    stockStatus: "in-stock",
    featured: true,
    usageNote: "Check the package leaflet before use.",
    importantInformation:
      "This website cannot assess your medical history or recommend a personal treatment plan.",
    disclaimer: sharedDisclaimer,
    createdOrder: 2,
  }),
  product({
    id: "contra-72",
    slug: "contra-72",
    name: "Contra-72",
    category: "Emergency Contraceptives",
    shortDescription: "Levonorgestrel 0.75 mg emergency contraceptive pill.",
    description:
      "Contra-72 is an emergency contraceptive pill product. Review the label and package leaflet before use.",
    image: images.products.contra72.src,
    imageAlt: images.products.contra72.alt,
    price: 8.8,
    stockStatus: "low-stock",
    popular: true,
    requiresConsultation: true,
    usageNote: "Use according to the product directions.",
    importantInformation:
      "Speak with a pharmacist or clinician if you have questions about suitability or timing.",
    disclaimer: sharedDisclaimer,
    createdOrder: 3,
  }),
  product({
    id: "secure",
    slug: "secure",
    name: "Secure",
    category: "Emergency Contraceptives",
    shortDescription: "Levonorgestrel 1.5 mg emergency contraceptive pill.",
    description:
      "Secure is an emergency contraceptive pill product supplied as one tablet. Product details should be confirmed from the package leaflet.",
    image: images.products.secure.src,
    imageAlt: images.products.secure.alt,
    price: 19.8,
    stockStatus: "in-stock",
    usageNote: "Follow the package instructions.",
    importantInformation:
      "Emergency contraceptives do not replace regular contraception advice from a healthcare professional.",
    disclaimer: sharedDisclaimer,
    createdOrder: 4,
  }),
  product({
    id: "oviva",
    slug: "oviva",
    name: "Oviva Oral Contraceptive Tablets",
    category: "Daily Contraceptive Pills",
    shortDescription: "21-tablet oral contraceptive pack.",
    description:
      "Oviva is an oral contraceptive tablet product. Daily contraceptive pills should be chosen with appropriate professional advice.",
    image: images.products.oviva.src,
    imageAlt: images.products.oviva.alt,
    price: 11,
    stockStatus: "in-stock",
    featured: true,
    requiresConsultation: true,
    usageNote: "Read the full package leaflet and use only as directed.",
    importantInformation:
      "Ask a qualified healthcare professional about suitability, missed pills, side effects, or interactions.",
    disclaimer: sharedDisclaimer,
    createdOrder: 5,
  }),
  product({
    id: "ebony-condoms",
    slug: "ebony-condoms",
    name: "Ebony Premium Lubricated Condoms",
    category: "Condoms",
    shortDescription: "Pack of 3 premium lubricated condoms.",
    description:
      "Ebony condoms are barrier contraceptive products. Check the package for storage, expiry, and correct-use instructions.",
    image: images.products.ebonyCondoms.src,
    imageAlt: images.products.ebonyCondoms.alt,
    price: 15.5,
    stockStatus: "in-stock",
    popular: true,
    usageNote: "Use a new condom each time and follow the package directions.",
    importantInformation:
      "Do not use a product if the wrapper is damaged or past its expiry date.",
    disclaimer: sharedDisclaimer,
    createdOrder: 6,
  }),
  product({
    id: "fiesta-condoms",
    slug: "fiesta-condoms",
    name: "Fiesta Premium Lubricated Condoms",
    category: "Condoms",
    shortDescription: "Pack of 3 premium lubricated condoms.",
    description:
      "Fiesta condoms are premium lubricated barrier products. Review the package for correct use and storage information.",
    image: productImages.singles.fiesta.src,
    imageAlt: productImages.singles.fiesta.alt,
    price: 15.5,
    stockStatus: "in-stock",
    featured: true,
    popular: true,
    usageNote: "Follow the package directions for correct use.",
    importantInformation:
      "Store away from heat and check the package before use.",
    disclaimer: sharedDisclaimer,
    createdOrder: 7,
  }),
  product({
    id: "kiss-condoms",
    slug: "kiss-condoms",
    name: "Kiss Premium Lubricated Condoms",
    category: "Condoms",
    shortDescription: "Pack of 3 premium lubricated condoms.",
    description:
      "Kiss condoms are premium lubricated barrier products packaged for convenient use.",
    image: images.products.kissCondoms.src,
    imageAlt: images.products.kissCondoms.alt,
    price: 15.5,
    stockStatus: "in-stock",
    usageNote: "Check expiry and wrapper condition before use.",
    importantInformation:
      "Follow package instructions and use only compatible lubricants.",
    disclaimer: sharedDisclaimer,
    createdOrder: 8,
  }),
  product({
    id: "pregnancy-test-kit",
    slug: "pregnancy-test-kit",
    name: "hCG Pregnancy Test Kit",
    category: "Pregnancy Test Kits",
    shortDescription: "Single home pregnancy test kit.",
    description:
      "A home pregnancy test kit for checking results according to the included product instructions.",
    image: productImages.singles.pregnancyTest.src,
    imageAlt: productImages.singles.pregnancyTest.alt,
    price: 5.5,
    stockStatus: "in-stock",
    featured: true,
    popular: true,
    usageNote: "Read the full instructions before taking or interpreting a test.",
    importantInformation:
      "For uncertain results or health concerns, speak with a qualified healthcare professional.",
    disclaimer: sharedDisclaimer,
    createdOrder: 9,
  }),
];

export const stockLabels: Record<StockStatus, string> = {
  "in-stock": "In stock",
  "low-stock": "Low stock",
  "out-of-stock": "Out of stock",
};

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getProductById(id: string) {
  return products.find((product) => product.id === id);
}
