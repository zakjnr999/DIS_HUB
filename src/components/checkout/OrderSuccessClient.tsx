"use client";

import { useMemo, useSyncExternalStore } from "react";
import { Button } from "@/components/common/Button";
import { ConfirmationIcon } from "@/components/icons";
import { getOrdersSnapshot, ORDERS_CHANGED_EVENT } from "@/lib/orderStorage";
import { createOrderWhatsAppMessage, createWhatsAppLink } from "@/lib/whatsapp";
import { formatCurrency } from "@/lib/utils";
import type { Order } from "@/types/order";

export function OrderSuccessClient({ reference }: { reference?: string }) {
  const snapshot = useSyncExternalStore(subscribe, getOrdersSnapshot, () => "[]");
  const order = useMemo(() => {
    try {
      const orders = JSON.parse(snapshot) as Order[];
      return orders.find((item) => item.reference === reference) || null;
    } catch {
      return null;
    }
  }, [reference, snapshot]);

  if (!order) {
    return (
      <div className="section-padding bg-[#fafaf7]">
        <div className="container-shell rounded-2xl border border-slate-200 bg-white p-10 text-center">
          <h1 className="text-4xl font-light text-slate-950">
            Order details are not available.
          </h1>
          <p className="mt-3 text-sm text-slate-500">
            The demo order may have been created in another browser session.
          </p>
          <Button className="mt-6" href="/shop">
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="section-padding bg-[#fafaf7]">
      <div className="container-shell">
        <div className="rounded-2xl border border-slate-200 bg-white p-8">
          <ConfirmationIcon className="h-14 w-14 text-teal-700" />
          <h1 className="mt-5 text-5xl font-light text-slate-950">
            Order received.
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
            Your order has been saved locally. Support will confirm product
            availability, pricing, delivery, and payment details.
          </p>


          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
            <div className="rounded-xl border border-slate-200 p-5">
              <p className="text-xs font-black uppercase tracking-[0.1em] text-teal-800">
                Reference
              </p>
              <p className="mt-2 text-3xl font-black text-slate-950">
                {order.reference}
              </p>
              <div className="mt-6 grid gap-3 text-sm text-slate-600">
                <p>
                  <strong className="text-slate-950">Customer:</strong>{" "}
                  {order.customer.fullName || "Not specified"}
                </p>
                <p>
                  <strong className="text-slate-950">Phone:</strong>{" "}
                  {order.customer.phone}
                </p>
                <p>
                  <strong className="text-slate-950">Delivery method:</strong>{" "}
                  {order.deliveryMethod}
                </p>
                <p>
                  <strong className="text-slate-950">Payment method:</strong>{" "}
                  {order.paymentMethod}
                </p>
                {order.paymentMethod === "Mobile money" && (
                  <p>
                    <strong className="text-slate-950">Transaction ID:</strong>{" "}
                    <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono font-semibold">{order.transactionId || "N/A"}</code>
                  </p>
                )}
                <p>
                  <strong className="text-slate-950">Status:</strong> {order.status}
                </p>
              </div>
            </div>

            <aside className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <h2 className="text-lg font-extrabold text-slate-950">Summary</h2>
              <div className="mt-5 grid gap-3 text-sm">
                {order.items.map((item) => (
                  <div className="flex justify-between gap-4" key={item.productId}>
                    <span className="text-slate-600">
                      {item.product.name} x {item.quantity}
                    </span>
                    <span className="font-black text-slate-950">
                      {formatCurrency(item.subtotal)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-5 border-t border-slate-200 pt-5">
                <div className="flex justify-between text-lg font-black">
                  <span>Total</span>
                  <span>{formatCurrency(order.total)}</span>
                </div>
              </div>
            </aside>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              href={createWhatsAppLink(createOrderWhatsAppMessage(order))}
              target="_blank"
            >
              Send Order Details on WhatsApp
            </Button>
            <Button href="/shop" variant="secondary">
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function subscribe(callback: () => void) {
  window.addEventListener(ORDERS_CHANGED_EVENT, callback);
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener(ORDERS_CHANGED_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}
