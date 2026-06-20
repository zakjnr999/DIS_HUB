"use client";

import Link from "next/link";
import { HeartIcon } from "@/components/icons";
import { ProductImage } from "@/components/products/ProductImage";
import { stockLabels } from "@/data/products";
import { useCart } from "@/hooks/useCart";
import { useFavorites } from "@/hooks/useFavorites";
import { cn, formatCurrency } from "@/lib/utils";
import type { Product } from "@/types/product";

export function ProductCard({
  className,
  product,
  priority,
}: {
  className?: string;
  product: Product;
  priority?: boolean;
}) {
  const { addToCart, items } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const unavailable = product.stockStatus === "out-of-stock";
  const favorite = isFavorite(product.id);
  const inCart = items.some((item) => item.productId === product.id);

  function handleAddToCart() {
    addToCart(product.id);
  }

  return (
    <article
      className={cn(
        "scroll-reveal-card group rounded-xl border border-[var(--soft-border)] bg-white p-3 transition hover:-translate-y-0.5 hover:border-teal-700/20",
        className,
      )}
    >
      <div className="relative rounded-lg bg-slate-50">
        <Link aria-label={`View ${product.name}`} href={`/products/${product.slug}`}>
          <ProductImage
            alt={product.imageAlt}
            className="aspect-square rounded-lg bg-slate-50"
            priority={priority}
            src={product.image}
          />
        </Link>
        <button
          aria-label={
            favorite ? `Remove ${product.name} from favorites` : `Save ${product.name}`
          }
          aria-pressed={favorite}
          className={cn(
            "absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full border transition",
            favorite
              ? "border-teal-700 bg-teal-700 text-white"
              : "border-slate-200 bg-white text-slate-400 hover:text-teal-700",
          )}
          onClick={() => toggleFavorite(product.id)}
          type="button"
        >
          <HeartIcon className="h-4 w-4" />
        </button>
      </div>

      <div className="pt-3">
        <Link
          className="product-card-title min-h-10 text-sm font-extrabold leading-5 text-slate-900 hover:text-teal-800"
          href={`/products/${product.slug}`}
        >
          {product.name}
        </Link>
        <p className="mt-1 text-xs font-semibold text-slate-500">
          {product.category}
        </p>
        <div className="mt-3 flex items-center justify-between gap-2">
          <p className="text-base font-black text-slate-950">
            {formatCurrency(product.price, product.currency)}
          </p>
          <span
            className={cn(
              "rounded-full px-2 py-1 text-[10px] font-black uppercase tracking-[0.04em]",
              product.stockStatus === "low-stock"
                ? "bg-amber-50 text-amber-700"
                : product.stockStatus === "out-of-stock"
                  ? "bg-red-50 text-red-700"
                  : "bg-mint-100 text-teal-800",
            )}
          >
            {stockLabels[product.stockStatus]}
          </span>
        </div>
        <button
          className={cn(
            "mt-3 min-h-10 w-full rounded-lg px-4 py-2 text-xs font-extrabold text-white transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 disabled:cursor-not-allowed disabled:opacity-50",
            inCart
              ? "bg-teal-700 hover:bg-teal-800"
              : "bg-slate-950 hover:bg-teal-800",
          )}
          disabled={unavailable}
          onClick={handleAddToCart}
          type="button"
        >
          {unavailable ? "Out of Stock" : inCart ? "Added to Cart" : "Add to Cart"}
        </button>
      </div>
    </article>
  );
}
