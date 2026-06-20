"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/common/Button";
import { useCart } from "@/hooks/useCart";
import { formatCurrency } from "@/lib/utils";

export function CartClient() {
  const { deliveryFee, lines, removeFromCart, subtotal, total, updateQuantity } =
    useCart();

  if (!lines.length) {
    return (
      <div className="section-padding bg-[#fafaf7]">
        <div className="container-shell rounded-2xl border border-slate-200 bg-white p-10 text-center">
          <h1 className="text-4xl font-light text-slate-950">Your cart is empty.</h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
            Add contraceptive and wellness products to start a private demo order.
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
        <h1 className="text-5xl font-light text-slate-950">Shopping cart</h1>
        <p className="mt-3 text-sm text-slate-500">
          Review products before moving to private checkout.
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="grid gap-4">
            {lines.map((line) => (
              <article
                className="grid gap-4 rounded-xl border border-slate-200 bg-white p-4 sm:grid-cols-[140px_1fr]"
                key={line.productId}
              >
                <div className="relative aspect-square rounded-lg bg-slate-50">
                  <Image
                    alt={line.product.imageAlt}
                    className="object-contain p-4"
                    fill
                    sizes="140px"
                    src={line.product.image}
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
                  <div>
                    <Link
                      className="text-lg font-extrabold text-slate-950 hover:text-teal-800"
                      href={`/products/${line.product.slug}`}
                    >
                      {line.product.name}
                    </Link>
                    <p className="mt-1 text-sm font-semibold text-slate-500">
                      {line.product.category}
                    </p>
                    <p className="mt-3 text-sm font-black text-slate-950">
                      {formatCurrency(line.product.price, line.product.currency)}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 sm:flex-col sm:items-end">
                    <div className="flex h-10 overflow-hidden rounded-lg border border-slate-200">
                      <button
                        aria-label={`Decrease ${line.product.name} quantity`}
                        className="w-10 font-bold"
                        onClick={() =>
                          updateQuantity(line.productId, line.quantity - 1)
                        }
                        type="button"
                      >
                        -
                      </button>
                      <output className="grid w-11 place-items-center border-x border-slate-200 text-sm font-black">
                        {line.quantity}
                      </output>
                      <button
                        aria-label={`Increase ${line.product.name} quantity`}
                        className="w-10 font-bold"
                        onClick={() =>
                          updateQuantity(line.productId, line.quantity + 1)
                        }
                        type="button"
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="text-sm font-extrabold text-red-700 hover:text-red-800"
                      onClick={() => removeFromCart(line.productId)}
                      type="button"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <aside className="h-fit rounded-xl border border-slate-200 bg-white p-5 lg:sticky lg:top-24">
            <h2 className="text-lg font-extrabold text-slate-950">Order summary</h2>
            <div className="mt-5 grid gap-3 border-b border-slate-200 pb-5 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Items subtotal</span>
                <span className="font-black text-slate-950">
                  {formatCurrency(subtotal)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Delivery fee</span>
                <span className="font-black text-slate-950">
                  {deliveryFee ? formatCurrency(deliveryFee) : "To confirm"}
                </span>
              </div>
            </div>
            <div className="mt-5 flex justify-between text-lg">
              <span className="font-extrabold text-slate-950">Total</span>
              <span className="font-black text-slate-950">
                {formatCurrency(total)}
              </span>
            </div>
            <Button className="mt-6 w-full" href="/checkout">
              Proceed to Checkout
            </Button>
            <Button className="mt-3 w-full" href="/shop" variant="secondary">
              Continue Shopping
            </Button>
            <p className="mt-4 text-xs leading-5 text-slate-500">
              Product names are not displayed on the outside of the package.
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
}
