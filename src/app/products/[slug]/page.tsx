import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AddToCartPanel } from "@/components/products/AddToCartPanel";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductImage } from "@/components/products/ProductImage";
import { products, getProductBySlug, stockLabels } from "@/data/products";
import { formatCurrency } from "@/lib/utils";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {};
  }

  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      description: product.shortDescription,
      images: [{ alt: product.imageAlt, url: product.image }],
      title: product.name,
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const related = products
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, 4);

  return (
    <div className="bg-[#fafaf7]">
      <section className="section-padding bg-white">
        <div className="container-shell grid gap-10 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <ProductImage
              alt={product.imageAlt}
              className="aspect-square rounded-xl bg-white"
              priority
              src={product.image}
            />
          </div>

          <div>
            <p className="text-sm font-extrabold text-teal-800">{product.category}</p>
            <h1 className="mt-3 text-4xl font-light text-slate-950 md:text-6xl">
              {product.name}
            </h1>
            <p className="mt-5 text-sm leading-6 text-slate-500">
              {product.description}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <p className="text-2xl font-black text-slate-950">
                {formatCurrency(product.price, product.currency)}
              </p>
              <span className="rounded-full bg-mint-100 px-3 py-1 text-xs font-black text-teal-800">
                {stockLabels[product.stockStatus]}
              </span>
              {product.requiresConsultation ? (
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-600">
                  Guidance recommended
                </span>
              ) : null}
            </div>

            <AddToCartPanel product={product} />

            <div className="mt-8 grid gap-3 border-y border-slate-200 py-5 text-sm text-slate-600">
              <p>Orders are packaged discreetly.</p>
              <p>Product names are not displayed on the outside of the package.</p>
              <p>Support can help with ordering and general product information.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-shell grid gap-6 lg:grid-cols-3">
          {[
            ["Product overview", product.shortDescription],
            ["Usage information", product.usageNote || "Read the package leaflet before use."],
            [
              "Important information",
              product.importantInformation ||
                "Speak with a qualified healthcare professional when unsure.",
            ],
          ].map(([title, text]) => (
            <article className="rounded-xl border border-slate-200 bg-white p-6" key={title}>
              <h2 className="text-sm font-extrabold text-slate-950">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-500">{text}</p>
            </article>
          ))}
        </div>
        <div className="container-shell mt-6 rounded-xl border border-teal-900/10 bg-mint-50 p-5 text-sm leading-6 text-slate-600">
          {product.disclaimer}
        </div>
      </section>

      {related.length ? (
        <section className="section-padding bg-white">
          <div className="container-shell">
            <h2 className="text-xl font-extrabold text-slate-950">
              Related products
            </h2>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {related.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
