export type BookingStatus =
  | "Booking Received"
  | "Awaiting Confirmation"
  | "In Progress"
  | "Ready for Pickup"
  | "Ready for Delivery"
  | "Completed"
  | "Cancelled";

export type UrgencyLevel = "Normal" | "Urgent" | "Not sure";

export interface Booking {
  id: string;
  reference: string;
  customerName: string;
  phone: string;
  email?: string;
  address: string;
  landmark?: string;
  serviceType: string;
  customService?: string;
  materialType: string;
  customMaterial?: string;
  imageUrls?: string[];
  priceRange: string;
  pickupOption: string;
  pickupAddress?: string;
  pickupLandmark?: string;
  pickupDate?: string;
  pickupTime?: string;
  preferredDate: string;
  preferredTime: string;
  urgency: UrgencyLevel;
  notes?: string;
  status: BookingStatus;
  createdAt: string;
}
