"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@/components/common/Button";
import { FieldShell, Input, Select, Textarea } from "@/components/common/Field";
import { useCart } from "@/hooks/useCart";
import { createOrderReference } from "@/lib/orderReference";
import { getOrders, saveOrder } from "@/lib/orderStorage";
import {
  checkoutSchema,
  defaultCheckoutValues,
  type CheckoutFormValues,
} from "@/lib/validation";
import { formatCurrency } from "@/lib/utils";
import type { Order } from "@/types/order";

export function CheckoutClient() {
  const router = useRouter();
  const { clearCart, deliveryFee, lines, subtotal, total } = useCart();
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    watch,
  } = useForm<CheckoutFormValues>({
    defaultValues: defaultCheckoutValues,
    resolver: zodResolver(checkoutSchema),
  });

  const paymentMethod = watch("paymentMethod");

  function onSubmit(values: CheckoutFormValues) {
    if (!lines.length) {
      router.push("/cart");
      return;
    }

    const existingOrders = getOrders();
    const order: Order = {
      id: crypto.randomUUID(),
      reference: createOrderReference(existingOrders),
      createdAt: new Date().toISOString(),
      customer: {
        address: values.address,
        city: values.city,
        deliveryInstructions: values.deliveryInstructions,
        email: values.email || undefined,
        fullName: values.fullName || undefined,
        landmark: values.landmark,
        phone: values.phone,
      },
      deliveryFee,
      deliveryMethod: values.deliveryMethod,
      items: lines,
      notes: values.notes,
      paymentMethod: values.paymentMethod,
      transactionId: values.paymentMethod === "Mobile money" ? values.transactionId : undefined,
      status: "Order Received",
      subtotal,
      total,
    };

    saveOrder(order);
    clearCart();
    window.sessionStorage.setItem("dis-hub-last-order", order.reference);
    router.push(`/order-success?reference=${encodeURIComponent(order.reference)}`);
  }

  if (!lines.length) {
    return (
      <div className="section-padding bg-[#fafaf7]">
        <div className="container-shell rounded-2xl border border-slate-200 bg-white p-10 text-center">
          <h1 className="text-4xl font-light text-slate-950">
            Your cart needs products first.
          </h1>
          <Button className="mt-6" href="/shop">
            Shop Products
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="section-padding bg-[#fafaf7]">
      <div className="container-shell">
        <h1 className="text-5xl font-light text-slate-950">Private checkout</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
          This demo saves orders locally and does not process payment. Payment
          integration can be added later.
        </p>

        <form
          className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid gap-5">
            <CheckoutSection title="Contact information">
              <div className="grid gap-4 md:grid-cols-2">
                <FieldShell error={errors.fullName?.message} label="Full name">
                  <Input {...register("fullName")} autoComplete="name" />
                </FieldShell>
                <FieldShell error={errors.phone?.message} label="Phone number" required>
                  <Input {...register("phone")} autoComplete="tel" />
                </FieldShell>
                <FieldShell error={errors.email?.message} label="Email address">
                  <Input {...register("email")} autoComplete="email" type="email" />
                </FieldShell>
                <FieldShell error={errors.city?.message} label="Region / city" required>
                  <Input {...register("city")} autoComplete="address-level2" />
                </FieldShell>
              </div>
            </CheckoutSection>

            <CheckoutSection title="Delivery address">
              <div className="grid gap-4">
                <FieldShell error={errors.address?.message} label="Delivery address" required>
                  <Input {...register("address")} autoComplete="street-address" />
                </FieldShell>
                <FieldShell error={errors.landmark?.message} label="Landmark" required>
                  <Input {...register("landmark")} />
                </FieldShell>
                <FieldShell label="Delivery instructions">
                  <Textarea {...register("deliveryInstructions")} />
                </FieldShell>
              </div>
            </CheckoutSection>

            <CheckoutSection title="Delivery and payment">
              <div className="grid gap-4 md:grid-cols-2">
                <FieldShell error={errors.deliveryMethod?.message} label="Delivery method">
                  <Select {...register("deliveryMethod")}>
                    <option>Standard delivery</option>
                    <option>Express delivery</option>
                    <option>Pickup</option>
                  </Select>
                </FieldShell>
                <FieldShell error={errors.paymentMethod?.message} label="Payment method">
                  <Select {...register("paymentMethod")}>
                    <option>Cash on delivery</option>
                    <option>Mobile money</option>
                    <option>Pay online later</option>
                  </Select>
                </FieldShell>
              </div>

              {paymentMethod === "Mobile money" && (
                <div className="rounded-2xl border border-teal-600/10 bg-mint-50/50 p-5 mt-2">
                  <p className="text-xs font-black uppercase tracking-[0.1em] text-teal-800">
                    Momo Payment details
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    Please send the total sum of <strong className="font-extrabold text-slate-900">{formatCurrency(total)}</strong> to the following account:
                  </p>
                  <div className="mt-3 grid gap-1.5 rounded-xl bg-white p-4 border border-teal-900/5 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-semibold">Momo Number:</span>
                      <strong className="font-black text-slate-900">0533777072</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-semibold">Account Name:</span>
                      <strong className="font-black text-slate-950">Nahimatu Abdul Majeed</strong>
                    </div>
                  </div>
                  <div className="mt-4">
                    <FieldShell error={errors.transactionId?.message} label="Transaction ID" required>
                      <Input
                        {...register("transactionId")}
                        placeholder="Enter the 10-digit transaction ID"
                      />
                    </FieldShell>
                  </div>
                </div>
              )}

              <FieldShell label="Order notes">
                <Textarea {...register("notes")} />
              </FieldShell>
              <FieldShell error={errors.confirmed?.message} label="Confirm order details">
                <label className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm font-semibold text-slate-600">
                  <input
                    className="mt-1 h-4 w-4 accent-teal-700"
                    type="checkbox"
                    {...register("confirmed")}
                  />
                  I confirm that my contact and delivery details are correct.
                </label>
              </FieldShell>
            </CheckoutSection>
          </div>

          <aside className="h-fit rounded-xl border border-slate-200 bg-white p-5 lg:sticky lg:top-24">
            <h2 className="text-lg font-extrabold text-slate-950">Order summary</h2>
            <div className="mt-5 grid gap-4">
              {lines.map((line) => (
                <div className="flex justify-between gap-4 text-sm" key={line.productId}>
                  <span className="text-slate-600">
                    {line.product.name} x {line.quantity}
                  </span>
                  <span className="font-black text-slate-950">
                    {formatCurrency(line.subtotal)}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-5 grid gap-3 border-y border-slate-200 py-5 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Subtotal</span>
                <span className="font-black">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Delivery</span>
                <span className="font-black">{formatCurrency(deliveryFee)}</span>
              </div>
            </div>
            <div className="mt-5 flex justify-between text-lg font-black">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
            <Button className="mt-6 w-full" disabled={isSubmitting} type="submit">
              Place Demo Order
            </Button>
            <p className="mt-4 text-xs leading-5 text-slate-500">
              Orders are packaged discreetly. No payment is processed by this demo.
            </p>
          </aside>
        </form>
      </div>
    </div>
  );
}

function CheckoutSection({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5">
      <h2 className="mb-5 text-lg font-extrabold text-slate-950">{title}</h2>
      <div className="grid gap-4">{children}</div>
    </section>
  );
}
