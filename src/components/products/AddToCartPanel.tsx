"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/common/Button";
import { useCart } from "@/hooks/useCart";
import type { Product } from "@/types/product";

export function AddToCartPanel({ product }: { product: Product }) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const { addToCart, items } = useCart();
  const unavailable = product.stockStatus === "out-of-stock";
  const inCart = items.some((item) => item.productId === product.id);

  function addSelectedQuantity() {
    addToCart(product.id, quantity);
  }

  function buyNow() {
    addSelectedQuantity();
    router.push("/checkout");
  }

  return (
    <div className="mt-6 grid gap-4">
      <div className="flex items-center gap-3">
        <span className="text-sm font-extrabold text-slate-700">Quantity</span>
        <div className="flex h-11 overflow-hidden rounded-lg border border-slate-200">
          <button
            aria-label="Decrease quantity"
            className="w-11 text-lg font-bold text-slate-700 hover:bg-slate-50"
            onClick={() => setQuantity((value) => Math.max(1, value - 1))}
            type="button"
          >
            -
          </button>
          <output className="grid w-12 place-items-center border-x border-slate-200 text-sm font-black">
            {quantity}
          </output>
          <button
            aria-label="Increase quantity"
            className="w-11 text-lg font-bold text-slate-700 hover:bg-slate-50"
            onClick={() => setQuantity((value) => Math.min(99, value + 1))}
            type="button"
          >
            +
          </button>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Button disabled={unavailable} onClick={addSelectedQuantity}>
          {inCart ? "Added to Cart" : "Add to Cart"}
        </Button>
        <Button disabled={unavailable} onClick={buyNow} variant="secondary">
          Buy Now
        </Button>
      </div>
    </div>
  );
}
