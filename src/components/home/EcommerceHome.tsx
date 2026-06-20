import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/common/Button";
import {
  CartIcon,
  CheckoutIcon,
  DeliveryIcon,
  PackageIcon,
  PrivacyIcon,
  SupportIcon,
} from "@/components/icons";
import { ProductTabs } from "@/components/products/ProductTabs";
import { ProductCard } from "@/components/products/ProductCard";
import { productCategories, getCategoryCount } from "@/data/categories";
import { educationCards } from "@/data/education";
import { faqs } from "@/data/faqs";
import { products } from "@/data/products";
import { createWhatsAppLink } from "@/lib/whatsapp";
import { businessConfig } from "@/config/business";
import { productImages } from "@/config/images";

export function EcommerceHome() {
  const offers = products.filter((product) => product.popular).slice(0, 4);
  const dailyPillProduct =
    products.find((product) => product.slug === "oviva") || products[0];

  return (
    <>
      <section className="border-b border-slate-200 bg-slate-950 text-white">
        <div className="container-shell grid min-h-[520px] items-center gap-8 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:py-16">
          <div className="scroll-reveal-soft">
            <p className="text-sm font-extrabold text-slate-400">
              Private. Trusted. Delivered.
            </p>
            <h1 className="mt-4 max-w-xl text-5xl font-light leading-[1.02] tracking-normal text-white md:text-7xl">
              Contraceptive care made <span className="font-extrabold">simple.</span>
            </h1>
            <p className="mt-5 max-w-lg text-sm leading-6 text-slate-300 md:text-base">
              Shop trusted contraceptive and sexual wellness products with clear
              information and discreet delivery.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href="/shop" size="lg">
                Shop Now
              </Button>
              <Link
                className="text-sm font-extrabold text-white underline-offset-4 hover:underline"
                href={createWhatsAppLink(businessConfig.whatsappDefaultMessage)}
              >
                Speak to Support
              </Link>
            </div>
          </div>
          <div className="relative grid min-h-[340px] place-items-center overflow-hidden lg:min-h-[460px]">
            <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-400/20 blur-3xl md:h-96 md:w-96" />
            <Image
              alt={productImages.heroComposition.alt}
              className="product-float-slow relative z-10 h-auto w-full max-w-[680px] object-contain drop-shadow-2xl"
              height={productImages.heroComposition.height}
              priority
              sizes="(max-width: 768px) 92vw, (max-width: 1200px) 54vw, 680px"
              src={productImages.heroComposition.src}
              width={productImages.heroComposition.width}
            />
            <Image
              alt={productImages.floating.pillBlister.alt}
              className="product-float absolute right-4 top-2 z-20 hidden h-auto w-36 object-contain drop-shadow-xl md:block lg:w-44"
              height={productImages.floating.pillBlister.height}
              sizes="176px"
              src={productImages.floating.pillBlister.src}
              width={productImages.floating.pillBlister.width}
            />
            <Image
              alt={productImages.floating.condomSachets.alt}
              className="product-float absolute bottom-2 left-2 z-20 hidden h-auto w-28 object-contain drop-shadow-xl lg:block"
              height={productImages.floating.condomSachets.height}
              sizes="112px"
              src={productImages.floating.condomSachets.src}
              width={productImages.floating.condomSachets.width}
            />
          </div>
        </div>
      </section>

      <section className="scroll-reveal bg-white">
        <div className="container-shell grid gap-px bg-slate-200 lg:grid-cols-4">
          <PromoBlock
            className="lg:col-span-2"
            description="Time-sensitive products with package-first guidance."
            href="/shop?category=Emergency%20Contraceptives"
            image={productImages.categories.emergencyContraceptives}
            tone="light"
            title="Emergency contraceptives"
            wide
          />
          <PromoBlock
            description="Barrier products packed for private ordering."
            href="/shop?category=Condoms"
            image={productImages.categories.condoms}
            tone="dark"
            title="Condom range"
          />
          <PromoBlock
            description="Home test kits with clear instructions."
            href="/shop?category=Pregnancy%20Test%20Kits"
            image={productImages.categories.pregnancyTests}
            tone="mint"
            title="Pregnancy tests"
          />
          <PromoBlock
            description="Explore routine pill options with professional guidance."
            href="/shop?category=Daily%20Contraceptive%20Pills"
            image={{
              alt: dailyPillProduct.imageAlt,
              height: 1254,
              src: dailyPillProduct.image,
              width: 1254,
            }}
            tone="gray"
            title="Daily contraceptive pills"
          />
          <div className="min-h-[420px] bg-slate-100 p-8 lg:col-span-3 lg:p-12">
            <div className="grid h-full min-h-[340px] items-center gap-8 md:grid-cols-[0.82fr_1.18fr]">
              <div className="self-center">
                <h2 className="max-w-lg text-5xl font-light leading-[1.02] text-slate-900 md:text-6xl lg:text-7xl">
                  Clear product information
                </h2>
                <p className="mt-5 max-w-lg text-base leading-7 text-slate-500">
                  Browse by product type, check stock states, and ask support for
                  ordering help without diagnosis or pressure.
                </p>
                <Button className="mt-7" href="/shop" variant="secondary">
                  Browse Shop
                </Button>
              </div>
              <div className="relative grid h-72 place-items-center md:h-80 lg:h-96">
                <div className="absolute inset-8 rounded-full bg-white/50 blur-3xl" />
                <Image
                  alt={productImages.promotions.emergencyContraceptives.alt}
                  className="product-float-slow relative h-full w-full max-w-[680px] object-contain drop-shadow-xl"
                  height={productImages.promotions.emergencyContraceptives.height}
                  sizes="(max-width: 768px) 88vw, 680px"
                  src={productImages.promotions.emergencyContraceptives.src}
                  width={productImages.promotions.emergencyContraceptives.width}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <CategoryRail />
      <ProductTabs />
      <FeatureStrip />

      <section className="scroll-reveal section-padding bg-white">
        <div className="container-shell">
          <h2 className="text-xl font-extrabold text-slate-950">Selected offers</h2>
          <p className="mt-2 text-sm text-slate-500">
            Popular picks grouped for easy browsing with prices shown in Ghana
            cedis.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {offers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <CampaignBanner />
      <TrustAndEducation />
      <FAQSection />
    </>
  );
}

function PromoBlock({
  className,
  description,
  href,
  image,
  title,
  tone,
  wide = false,
}: {
  className?: string;
  description: string;
  href: string;
  image: {
    alt: string;
    height: number;
    src: string;
    width: number;
  };
  title: string;
  tone: "dark" | "gray" | "light" | "mint";
  wide?: boolean;
}) {
  const tones = {
    dark: "bg-slate-900 text-white",
    gray: "bg-slate-100 text-slate-950",
    light: "bg-white text-slate-950",
    mint: "bg-mint-50 text-slate-950",
  };

  return (
    <article
      className={`${tones[tone]} ${className || ""} scroll-reveal-card min-h-[320px] overflow-hidden p-6 sm:p-8`}
    >
      <div
        className={
          wide
            ? "grid h-full items-center gap-6 md:grid-cols-[0.82fr_1.18fr]"
            : "grid h-full content-between gap-4"
        }
      >
        <div
          className={
            wide
              ? "grid h-60 place-items-center sm:h-72 md:order-2"
              : "grid h-56 place-items-center sm:h-48"
          }
        >
          <Image
            alt={image.alt}
            className={
              wide
                ? "product-float h-full w-full max-w-[520px] object-contain drop-shadow-xl"
                : "product-float h-full w-full max-w-[230px] object-contain drop-shadow-xl sm:max-w-[260px]"
            }
            height={image.height}
            sizes={wide ? "(max-width: 768px) 86vw, 520px" : "260px"}
            src={image.src}
            width={image.width}
          />
        </div>
        <div className={wide ? "md:order-1" : "mt-3 sm:mt-0"}>
          <h2
            className={
              wide
                ? "text-4xl font-light leading-tight"
                : "text-[2rem] font-light leading-tight sm:text-3xl"
            }
          >
            {title}
          </h2>
          <p
            className={`mt-3 max-w-sm text-sm leading-6 ${
              tone === "dark" ? "text-slate-300" : "text-slate-500"
            }`}
          >
            {description}
          </p>
          <Link
            className={`mt-5 inline-flex min-h-10 items-center rounded-lg border px-5 text-xs font-extrabold ${
              tone === "dark"
                ? "border-white/40 text-white hover:bg-white hover:text-slate-950"
                : "border-slate-400 text-slate-950 hover:border-teal-800 hover:text-teal-800"
            }`}
            href={href}
          >
            Shop Now
          </Link>
        </div>
      </div>
    </article>
  );
}

function CategoryRail() {
  return (
    <section
      className="scroll-reveal border-y border-slate-200 bg-[#fafaf7] py-12"
      id="categories"
    >
      <div className="container-shell">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-slate-950">Browse by Category</h2>
          <div className="hidden gap-2 sm:flex">
            <span className="grid h-8 w-8 place-items-center rounded-full border border-slate-300">
              ‹
            </span>
            <span className="grid h-8 w-8 place-items-center rounded-full border border-slate-300">
              ›
            </span>
          </div>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {productCategories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                className="grid h-28 min-w-36 place-items-center rounded-xl bg-slate-100 p-4 text-center transition hover:bg-mint-100"
                href={`/shop?category=${encodeURIComponent(category.name)}`}
                key={category.slug}
              >
                <Icon className="h-7 w-7 text-slate-800" />
                <div>
                  <p className="text-xs font-extrabold text-slate-950">
                    {category.name.replace("Emergency ", "")}
                  </p>
                  <p className="mt-1 text-[11px] font-semibold text-slate-500">
                    {getCategoryCount(category.name)} products
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FeatureStrip() {
  const panels = [
    {
      cta: "Shop Products",
      description:
        "Browse available emergency contraceptive products with clear package information.",
      eyebrow: "Time-sensitive care",
      href: "/shop?category=Emergency%20Contraceptives",
      image: productImages.promotions.emergencyContraceptives,
      title: "Emergency contraceptives",
      tone: "bg-white",
    },
    {
      cta: "Browse Condoms",
      description: "Explore available condom brands and package options.",
      eyebrow: "Protection options",
      href: "/shop?category=Condoms",
      image: productImages.promotions.condoms,
      title: "Condom range",
      tone: "bg-slate-900 text-white",
    },
    {
      cta: "View Test Kits",
      description: "Shop convenient home pregnancy testing products.",
      eyebrow: "At-home testing",
      href: "/shop?category=Pregnancy%20Test%20Kits",
      image: productImages.promotions.pregnancyTests,
      title: "Pregnancy test kits",
      tone: "bg-mint-50",
    },
  ];

  return (
    <section className="scroll-reveal bg-[#fafaf7]">
      <div className="container-shell grid lg:grid-cols-3">
        {panels.map((panel, index) => {
          const dark = panel.tone.includes("slate-900");
          return (
            <article
              className={`${panel.tone} scroll-reveal-card grid min-h-[460px] content-between p-7`}
              key={panel.title}
            >
              <div
                className={`grid h-64 place-items-center ${
                  index === 1 ? "order-2 mt-6" : ""
                }`}
              >
                <Image
                  alt={panel.image.alt}
                  className="product-float h-full w-full object-contain drop-shadow-xl"
                  height={panel.image.height}
                  sizes="(max-width: 1024px) 80vw, 300px"
                  src={panel.image.src}
                  width={panel.image.width}
                />
              </div>
              <div>
                <p
                  className={`text-xs font-black uppercase tracking-[0.1em] ${
                    dark ? "text-slate-400" : "text-teal-800"
                  }`}
                >
                  {panel.eyebrow}
                </p>
                <h2 className="mt-3 text-3xl font-light">{panel.title}</h2>
                <p
                  className={`mt-3 text-sm leading-6 ${
                    dark ? "text-slate-300" : "text-slate-500"
                  }`}
                >
                  {panel.description}
                </p>
                <Button
                  className="mt-6"
                  href={panel.href}
                  variant={dark ? "light" : "secondary"}
                >
                  {panel.cta}
                </Button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function CampaignBanner() {
  return (
    <section className="scroll-reveal bg-white py-10">
      <div className="relative overflow-hidden bg-slate-950 text-white">
        <div className="container-shell grid min-h-[340px] items-center gap-8 py-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="text-4xl font-light md:text-6xl">
              Private care, <span className="font-extrabold">delivered discreetly.</span>
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-slate-300">
              Shop essential contraceptive and wellness products with
              privacy-conscious delivery.
            </p>
            <Button className="mt-7" href="/shop" variant="light">
              Browse Products
            </Button>
          </div>
          <div className="relative grid min-h-[240px] place-items-center">
            <div className="absolute inset-8 rounded-full bg-teal-400/10 blur-3xl" />
            <Image
              alt={productImages.promotions.emergencyContraceptives.alt}
              className="product-float-slow relative h-auto w-full max-w-[560px] object-contain drop-shadow-2xl"
              height={productImages.promotions.emergencyContraceptives.height}
              sizes="(max-width: 1024px) 90vw, 560px"
              src={productImages.promotions.emergencyContraceptives.src}
              width={productImages.promotions.emergencyContraceptives.width}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustAndEducation() {
  const trust = [
    { label: "Discreet packaging", icon: PackageIcon },
    { label: "Private checkout", icon: PrivacyIcon },
    { label: "Reliable delivery", icon: DeliveryIcon },
    { label: "Customer support", icon: SupportIcon },
  ];

  return (
    <section className="scroll-reveal section-padding bg-mint-50" id="how-it-works">
      <div className="container-shell">
        <div className="grid gap-3 border-y border-teal-900/10 py-6 sm:grid-cols-2 lg:grid-cols-4">
          {trust.map((item) => {
            const Icon = item.icon;
            return (
              <div className="scroll-reveal-card flex items-center gap-3" key={item.label}>
                <Icon className="h-8 w-8 text-teal-800" />
                <p className="text-sm font-extrabold text-slate-950">{item.label}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-extrabold text-teal-800">
              Clear guidance, no diagnosis
            </p>
            <h2 className="mt-3 text-4xl font-light text-slate-950">
              Learn the basics before you order.
            </h2>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              Information on this website is for educational purposes only. Speak
              with a qualified healthcare professional when you need personalized
              guidance.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {educationCards.map((card) => (
              <article
                className="scroll-reveal-card rounded-xl border border-teal-900/10 bg-white p-5"
                key={card.title}
              >
                <h3 className="text-sm font-extrabold text-slate-950">{card.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">{card.text}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-12 relative">
          {/* Horizontal line for desktop */}
          <div className="absolute top-[24px] left-[15%] right-[15%] hidden h-[2px] bg-teal-950/10 md:block z-0" />
          
          <div className="relative z-10 grid gap-8 md:grid-cols-3">
            {[
              { number: "01", title: "Choose products", icon: CartIcon, desc: "Select contraceptives or test kits" },
              { number: "02", title: "Checkout privately", icon: CheckoutIcon, desc: "Your ordering data is secured" },
              { number: "03", title: "Receive discreetly", icon: DeliveryIcon, desc: "Package has zero external markings" },
            ].map((step) => {
              const Icon = step.icon;
              return (
                <div className="flex flex-col items-center text-center group z-10" key={step.title}>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white border-2 border-teal-700/10 text-teal-800 transition duration-300 group-hover:bg-teal-700 group-hover:text-white group-hover:scale-110 shadow-sm">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="mt-3 text-[10px] font-black uppercase tracking-wider text-teal-700 bg-white px-2 py-0.5 rounded-full shadow-sm">
                    Step {step.number}
                  </span>
                  <h3 className="mt-2 text-sm font-extrabold text-slate-950 group-hover:text-teal-900 transition">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500 max-w-[200px]">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section className="scroll-reveal section-padding bg-white" id="faq">
      <div className="container-shell grid gap-8 lg:grid-cols-[0.7fr_1fr]">
        <div>
          <h2 className="text-4xl font-light text-slate-950">Questions before checkout?</h2>
          <p className="mt-4 text-sm leading-6 text-slate-500">
            Short answers for private ordering, product information, and support.
          </p>
        </div>
        <div className="grid gap-3">
          {faqs.map((faq) => (
            <details className="rounded-xl border border-slate-200 bg-white p-5" key={faq.question}>
              <summary className="cursor-pointer text-sm font-extrabold text-slate-950">
                {faq.question}
              </summary>
              <p className="mt-3 text-sm leading-6 text-slate-500">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
