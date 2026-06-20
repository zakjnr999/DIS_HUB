import { businessConfig } from "@/config/business";
import type { Order } from "@/types/order";

export function createWhatsAppLink(message: string) {
  return `https://wa.me/${businessConfig.whatsappNumber}?text=${encodeURIComponent(
    message,
  )}`;
}

export function createOrderWhatsAppMessage(order: Order) {
  const products = order.items
    .map((item) => `${item.product.name} x ${item.quantity}`)
    .join(", ");

  const lines = [
    `Hello, I need support with my order.`,
    `Order reference: ${order.reference}`,
    `Customer name: ${order.customer.fullName || "Not specified"}`,
    `Phone number: ${order.customer.phone}`,
    `Products: ${products}`,
    `Delivery method: ${order.deliveryMethod}`,
    `Payment method: ${order.paymentMethod}`,
  ];

  if (order.paymentMethod === "Mobile money" && order.transactionId) {
    lines.push(`Momo Transaction ID: ${order.transactionId}`);
  }

  lines.push(`Total: ${formatOrderAmount(order.total)}`);

  return lines.join("\n");
}

function formatOrderAmount(value: number) {
  if (value === 0) {
    return "To be confirmed";
  }

  return new Intl.NumberFormat("en-GH", {
    currency: businessConfig.currency,
    style: "currency",
  }).format(value);
}
