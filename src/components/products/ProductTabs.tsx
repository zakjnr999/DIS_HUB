"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/products/ProductCard";
import { products } from "@/data/products";
import { cn } from "@/lib/utils";

const tabs = ["New Arrival", "Popular", "Featured Products", "Best Sellers"] as const;

export function ProductTabs() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("New Arrival");

  const visibleProducts = useMemo(() => {
    if (activeTab === "Popular") {
      return products.filter((product) => product.popular);
    }

    if (activeTab === "Featured Products") {
      return products.filter((product) => product.featured);
    }

    if (activeTab === "Best Sellers") {
      return products
        .filter((product) => product.popular || product.featured)
        .slice(0, 8);
    }

    return [...products].sort((a, b) => b.createdOrder - a.createdOrder).slice(0, 8);
  }, [activeTab]);

  return (
    <section className="section-padding bg-white" id="featured-products">
      <div className="container-shell">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-extrabold text-slate-950">Shop products</h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
              Compact product cards, clear labels, and discreet checkout.
            </p>
          </div>
          <a
            className="text-sm font-extrabold text-teal-800 hover:text-teal-950"
            href="/shop"
          >
            View all products
          </a>
        </div>

        <div className="mt-8 flex gap-7 overflow-x-auto border-b border-slate-200">
          {tabs.map((tab) => (
            <button
              className={cn(
                "shrink-0 border-b-2 px-0 pb-3 text-sm font-bold transition",
                activeTab === tab
                  ? "border-slate-950 text-slate-950"
                  : "border-transparent text-slate-400 hover:text-slate-800",
              )}
              key={tab}
              onClick={() => setActiveTab(tab)}
              type="button"
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {visibleProducts.map((product, index) => (
            <ProductCard key={product.id} priority={index < 2} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
