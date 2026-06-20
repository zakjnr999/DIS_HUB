import { z } from "zod";

const phoneRegex = /^[+()0-9\s-]{7,20}$/;

export const checkoutSchema = z
  .object({
    fullName: z.string().trim().optional().or(z.literal("")),
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
      .refine((value) => !value || z.string().email().safeParse(value).success, {
        message: "Enter a valid email address.",
      }),
    city: z.string().trim().min(2, "Region or city is required."),
    address: z.string().trim().min(5, "Delivery address is required."),
    landmark: z.string().trim().min(2, "Landmark is required."),
    deliveryInstructions: z.string().trim().optional(),
    deliveryMethod: z.enum(["Standard delivery", "Express delivery", "Pickup"]),
    paymentMethod: z.enum(["Cash on delivery", "Mobile money", "Pay online later"]),
    transactionId: z.string().trim().optional().or(z.literal("")),
    notes: z.string().trim().optional(),
    confirmed: z.boolean().refine(Boolean, {
      message: "Please confirm that your order details are correct.",
    }),
  })
  .refine(
    (data) => {
      if (data.paymentMethod === "Mobile money") {
        return Boolean(data.transactionId && data.transactionId.trim().length > 0);
      }
      return true;
    },
    {
      message: "Transaction ID is required for Mobile Money payments.",
      path: ["transactionId"],
    }
  );

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export const defaultCheckoutValues: CheckoutFormValues = {
  fullName: "",
  phone: "",
  email: "",
  city: "",
  address: "",
  landmark: "",
  deliveryInstructions: "",
  deliveryMethod: "Standard delivery",
  paymentMethod: "Cash on delivery",
  transactionId: "",
  notes: "",
  confirmed: false,
};
