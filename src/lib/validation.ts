import { z } from "zod";
import { pickupRequiredOptions } from "@/data/pickupOptions";

const phoneRegex = /^[+()0-9\s-]{7,20}$/;

export const bookingSchema = z
  .object({
    customerName: z.string().trim().min(2, "Full name is required."),
    phone: z
      .string()
      .trim()
      .min(7, "Phone number is required.")
      .regex(phoneRegex, "Enter a valid phone number."),
    email: z
      .string()
      .trim()
      .optional()
      .or(z.literal(""))
      .refine((value) => !value || z.email().safeParse(value).success, {
        message: "Enter a valid email address.",
      }),
    address: z.string().trim().min(3, "Location/address is required."),
    landmark: z.string().trim().optional(),
    serviceType: z.string().trim().min(1, "Choose a service."),
    customService: z.string().trim().optional(),
    materialType: z.string().trim().min(1, "Choose a material type."),
    customMaterial: z.string().trim().optional(),
    imageUrls: z.array(z.string()).max(3).optional(),
    priceRange: z.string().trim().min(1, "Choose a price range."),
    pickupOption: z.string().trim().min(1, "Choose a pickup or delivery option."),
    pickupAddress: z.string().trim().optional(),
    pickupLandmark: z.string().trim().optional(),
    pickupDate: z.string().trim().optional(),
    pickupTime: z.string().trim().optional(),
    preferredDate: z.string().trim().min(1, "Choose a preferred service date."),
    preferredTime: z.string().trim().min(1, "Choose a preferred service time."),
    urgency: z.enum(["Normal", "Urgent", "Not sure"], {
      message: "Choose an urgency level.",
    }),
    notes: z.string().trim().optional(),
    confirmed: z.boolean().refine(Boolean, {
      message: "Please confirm that the booking details are correct.",
    }),
  })
  .superRefine((data, context) => {
    if (data.serviceType === "Other" && !data.customService) {
      context.addIssue({
        code: "custom",
        path: ["customService"],
        message: "Tell us the service you need.",
      });
    }

    if (data.materialType === "Other" && !data.customMaterial) {
      context.addIssue({
        code: "custom",
        path: ["customMaterial"],
        message: "Tell us the material or fabric type.",
      });
    }

    if (pickupRequiredOptions.includes(data.pickupOption)) {
      if (!data.pickupAddress) {
        context.addIssue({
          code: "custom",
          path: ["pickupAddress"],
          message: "Pickup address is required.",
        });
      }

      if (!data.pickupDate) {
        context.addIssue({
          code: "custom",
          path: ["pickupDate"],
          message: "Pickup date is required.",
        });
      }

      if (!data.pickupTime) {
        context.addIssue({
          code: "custom",
          path: ["pickupTime"],
          message: "Pickup time is required.",
        });
      }
    }
  });

export type BookingFormValues = z.infer<typeof bookingSchema>;

export const defaultBookingValues: BookingFormValues = {
  customerName: "",
  phone: "",
  email: "",
  address: "",
  landmark: "",
  serviceType: "",
  customService: "",
  materialType: "",
  customMaterial: "",
  imageUrls: [],
  priceRange: "",
  pickupOption: "",
  pickupAddress: "",
  pickupLandmark: "",
  pickupDate: "",
  pickupTime: "",
  preferredDate: "",
  preferredTime: "",
  urgency: "Normal",
  notes: "",
  confirmed: false,
};
