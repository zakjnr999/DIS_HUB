import type { CartLine } from "@/types/cart";

export type OrderStatus =
  | "Order Received"
  | "Confirmed"
  | "Processing"
  | "Out for Delivery"
  | "Delivered"
  | "Cancelled";

export type DeliveryMethod = "Standard delivery" | "Express delivery" | "Pickup";
export type PaymentMethod = "Cash on delivery" | "Mobile money" | "Pay online later";

export interface OrderCustomer {
  fullName?: string;
  phone: string;
  email?: string;
  city: string;
  address: string;
  landmark: string;
  deliveryInstructions?: string;
}

export interface Order {
  id: string;
  reference: string;
  customer: OrderCustomer;
  items: CartLine[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  deliveryMethod: DeliveryMethod;
  paymentMethod: PaymentMethod;
  transactionId?: string;
  notes?: string;
  status: OrderStatus;
  createdAt: string;
}
