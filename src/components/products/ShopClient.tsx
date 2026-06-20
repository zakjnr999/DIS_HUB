"use client";

import { useMemo, useState } from "react";
import { FieldShell, Input, Select } from "@/components/common/Field";
import { ProductCard } from "@/components/products/ProductCard";
import { getCategoryCount, productCategories } from "@/data/categories";
import { products } from "@/data/products";
import { cn } from "@/lib/utils";

const stockOptions = ["All stock", "In stock", "Low stock", "Out of stock"];
const sortOptions = ["Newest", "Price: Low to High", "Price: High to Low", "Name"];

export function ShopClient({ initialCategory }: { initialCategory?: string }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(initialCategory || "All categories");
  const [stock, setStock] = useState("All stock");
  const [sort, setSort] = useState("Newest");
  const [maxPrice, setMaxPrice] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const normalizedMaxPrice = Number(maxPrice);

    const result = products.filter((product) => {
      const matchesQuery =
        !normalizedQuery ||
        [product.name, product.category, product.shortDescription]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);
      const matchesCategory =
        category === "All categories" || product.category === category;
      const matchesStock =
        stock === "All stock" ||
        (stock === "In stock" && product.stockStatus === "in-stock") ||
        (stock === "Low stock" && product.stockStatus === "low-stock") ||
        (stock === "Out of stock" && product.stockStatus === "out-of-stock");
      const matchesPrice =
        !maxPrice || product.price === 0 || product.price <= normalizedMaxPrice;

      return matchesQuery && matchesCategory && matchesStock && matchesPrice;
    });

    if (sort === "Price: Low to High") {
      return result.sort((a, b) => a.price - b.price);
    }

    if (sort === "Price: High to Low") {
      return result.sort((a, b) => b.price - a.price);
    }

    if (sort === "Name") {
      return result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result.sort((a, b) => b.createdOrder - a.createdOrder);
  }, [category, maxPrice, query, sort, stock]);

  function clearFilters() {
    setQuery("");
    setCategory("All categories");
    setStock("All stock");
    setSort("Newest");
    setMaxPrice("");
  }

  const activeFilterCount = [
    category !== "All categories",
    stock !== "All stock",
    sort !== "Newest",
    Boolean(maxPrice),
  ].filter(Boolean).length;

  const filters = (
    <FilterPanel
      activeFilterCount={activeFilterCount}
      category={category}
      clearFilters={clearFilters}
      maxPrice={maxPrice}
      setCategory={setCategory}
      setMaxPrice={setMaxPrice}
      setSort={setSort}
      setStock={setStock}
      sort={sort}
      stock={stock}
    />
  );

  return (
    <div className="bg-[#fafaf7]">
      <section className="border-b border-slate-200 bg-white py-12">
        <div className="container-shell">
          <p className="text-sm font-extrabold text-teal-800">Private ecommerce</p>
          <h1 className="mt-3 text-5xl font-light text-slate-950 md:text-6xl">
            Shop contraceptive and wellness products.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-500">
            Search, filter, and add products to a discreet local demo cart with
            prices shown in Ghana cedis.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-shell">
          <div className="mb-6 grid gap-3 md:grid-cols-[1fr_auto]">
            <FieldShell label="Search products">
              <Input
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by product, category, or label"
                value={query}
              />
            </FieldShell>
            <button
              className="min-h-12 rounded-lg border border-slate-300 bg-white px-5 text-sm font-extrabold text-slate-800 md:self-end lg:hidden"
              onClick={() => setShowFilters(true)}
              type="button"
            >
              Filters
            </button>
          </div>

          <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
            <aside className="hidden self-start lg:sticky lg:top-24 lg:block">
              {filters}
            </aside>

            <div>
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-extrabold text-slate-700">
                  {filteredProducts.length} product
                  {filteredProducts.length === 1 ? "" : "s"}
                </p>
              </div>
              {filteredProducts.length === 0 ? (
                <div className="rounded-xl border border-slate-200 bg-white p-10 text-center">
                  <h2 className="text-xl font-extrabold text-slate-950">
                    No products found
                  </h2>
                  <p className="mt-2 text-sm text-slate-500">
                    Try a different search, category, stock state, or price filter.
                  </p>
                  <button
                    className="mt-5 min-h-11 rounded-lg bg-slate-950 px-5 text-sm font-extrabold text-white"
                    onClick={clearFilters}
                    type="button"
                  >
                    Clear filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
                  {filteredProducts.map((product, index) => (
                    <ProductCard
                      key={product.id}
                      priority={index < 2}
                      product={product}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <div
        className={cn(
          "fixed inset-0 z-[70] bg-black/40 transition lg:hidden",
          showFilters ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setShowFilters(false)}
      />
      <aside
        aria-label="Product filters"
        className={cn(
          "fixed inset-x-0 bottom-0 z-[80] rounded-t-2xl border-t border-slate-200 bg-white p-5 transition lg:hidden max-h-[88vh] flex flex-col",
          showFilters ? "translate-y-0" : "translate-y-full",
        )}
      >
        <div className="mb-4 flex shrink-0 items-center justify-between">
          <h2 className="text-lg font-extrabold text-slate-950">Filters</h2>
          <button
            className="rounded-lg px-3 py-2 text-sm font-extrabold text-slate-500 cursor-pointer"
            onClick={() => setShowFilters(false)}
            type="button"
          >
            Close
          </button>
        </div>
        <div className="overflow-y-auto pr-1 pb-6 flex-1">
          {filters}
        </div>
      </aside>
    </div>
  );
}

function FilterPanel({
  activeFilterCount,
  category,
  clearFilters,
  maxPrice,
  setCategory,
  setMaxPrice,
  setSort,
  setStock,
  sort,
  stock,
}: {
  activeFilterCount: number;
  category: string;
  clearFilters: () => void;
  maxPrice: string;
  setCategory: (value: string) => void;
  setMaxPrice: (value: string) => void;
  setSort: (value: string) => void;
  setStock: (value: string) => void;
  sort: string;
  stock: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="border-b border-slate-200 bg-slate-950 p-5 text-white">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.12em] text-teal-200">
              Refine shop
            </p>
            <h2 className="mt-2 text-2xl font-light">Filters</h2>
          </div>
          <span className="grid h-10 min-w-10 place-items-center rounded-full bg-white px-3 text-sm font-black text-slate-950">
            {activeFilterCount}
          </span>
        </div>
        <p className="mt-3 text-xs leading-5 text-slate-300">
          Find products by category, availability, and ordering preference.
        </p>
      </div>

      <div className="grid gap-6 p-5">
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-black text-slate-950">Categories</h3>
            <span className="text-xs font-bold text-slate-400">
              {products.length} items
            </span>
          </div>
          <div className="grid gap-2">
            <button
              className={cn(
                "flex min-h-11 items-center justify-between rounded-xl border px-3 text-left text-sm font-extrabold transition",
                category === "All categories"
                  ? "border-teal-700 bg-mint-50 text-teal-900"
                  : "border-slate-200 bg-white text-slate-700 hover:border-teal-700/30 hover:bg-slate-50",
              )}
              onClick={() => setCategory("All categories")}
              type="button"
            >
              <span>All categories</span>
              <span className="rounded-full bg-white px-2 py-1 text-[11px] font-black text-slate-500">
                {products.length}
              </span>
            </button>
            {productCategories.map((item) => (
              <button
                className={cn(
                  "flex min-h-11 items-center justify-between rounded-xl border px-3 text-left text-sm font-extrabold transition",
                  category === item.name
                    ? "border-teal-700 bg-mint-50 text-teal-900"
                    : "border-slate-200 bg-white text-slate-700 hover:border-teal-700/30 hover:bg-slate-50",
                )}
                key={item.slug}
                onClick={() => setCategory(item.name)}
                type="button"
              >
                <span>{item.name.replace("Emergency ", "")}</span>
                <span className="rounded-full bg-white px-2 py-1 text-[11px] font-black text-slate-500">
                  {getCategoryCount(item.name)}
                </span>
              </button>
            ))}
          </div>
        </section>

        <div className="h-px bg-slate-200" />

        <section className="grid gap-4">
          <h3 className="text-sm font-black text-slate-950">Availability</h3>
          <div className="grid grid-cols-2 gap-2">
            {stockOptions.map((option) => (
              <button
                className={cn(
                  "min-h-10 rounded-xl border px-3 text-xs font-black transition",
                  stock === option
                    ? "border-teal-700 bg-teal-700 text-white"
                    : "border-slate-200 bg-slate-50 text-slate-600 hover:border-teal-700/30 hover:bg-white",
                )}
                key={option}
                onClick={() => setStock(option)}
                type="button"
              >
                {option}
              </button>
            ))}
          </div>
        </section>

        <section className="grid gap-4">
          <FieldShell hint="Use when prices are configured." label="Maximum price">
            <Input
              className="bg-slate-50"
              inputMode="numeric"
              onChange={(event) => setMaxPrice(event.target.value)}
              placeholder="GHS"
              type="number"
              value={maxPrice}
            />
          </FieldShell>
          <FieldShell label="Sort by">
            <Select
              className="bg-slate-50"
              onChange={(event) => setSort(event.target.value)}
              value={sort}
            >
              {sortOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </Select>
          </FieldShell>
        </section>

        <div className="rounded-2xl bg-mint-50 p-4">
          <p className="text-xs font-black uppercase tracking-[0.1em] text-teal-800">
            Discreet ordering
          </p>
          <p className="mt-2 text-xs leading-5 text-slate-600">
            Product names are not displayed on the outside of the package.
          </p>
        </div>

        <button
          className="min-h-12 rounded-xl border border-slate-300 bg-white px-4 text-sm font-extrabold text-slate-800 transition hover:border-teal-700 hover:text-teal-800 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={activeFilterCount === 0}
          onClick={clearFilters}
          type="button"
        >
          Clear filters
        </button>
      </div>
    </div>
  );
}
