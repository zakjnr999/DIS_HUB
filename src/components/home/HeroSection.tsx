"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/common/Button";
import { Badge } from "@/components/common/Badge";
import { DressSewingIcon, PickupIcon, SupportIcon } from "@/components/icons";
import { businessConfig } from "@/config/business";
import { images } from "@/config/images";
import { createWhatsAppLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const features = [
    { icon: DressSewingIcon, label: "Custom Sewing" },
    { icon: PickupIcon, label: "Pickup Available" },
    { icon: SupportIcon, label: "Customer Support" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % features.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [features.length]);

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-[#3B2416]">
      <Image
        alt={images.hero.alt}
        className="object-cover"
        fill
        priority
        sizes="100vw"
        src={images.hero.src}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#24140C]/86 via-[#3B2416]/56 to-[#3B2416]/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#24140C]/72 via-transparent to-[#24140C]/20" />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.08]"
        style={{ backgroundImage: `url(${images.backgroundPattern})` }}
      />

      <div className="container-shell relative flex min-h-[100svh] items-center pb-20 pt-32 sm:pt-36 xl:min-h-[820px]">
        <div className="w-full min-w-0 max-w-3xl text-[#FBF6ED] soft-reveal">
          <Badge variant="outline">
            Fashion service booking platform
          </Badge>
          <h1 className="font-heading mt-6 max-w-[11ch] text-5xl font-bold leading-[0.98] text-[#FFFDF8] drop-shadow-[0_12px_42px_rgba(0,0,0,0.22)] sm:max-w-3xl sm:text-6xl sm:leading-[0.94] md:text-7xl xl:text-8xl">
            Clothing care with a boutique touch.
          </h1>
          <p className="mt-6 max-w-xl text-lg font-extrabold text-[#F7EFE3] sm:text-xl">
            {businessConfig.tagline}
          </p>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[#E8D8C3] sm:text-lg sm:leading-8">
            Book tailoring, alterations, repairs, ironing, beading, and dress
            services with a warm, guided experience built around your outfit.
          </p>
          <div className="mt-8 h-px w-40 bg-gradient-to-r from-[#C8A96A] to-transparent" />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" className="w-full sm:w-auto" href="/book">
              Book a Service
            </Button>
            <Button
              size="lg"
              className="w-full sm:w-auto"
              href={createWhatsAppLink(businessConfig.whatsappDefaultMessage)}
              variant="secondary"
            >
              Speak to Customer Service
            </Button>
          </div>

          <div className="mt-10 flex items-center gap-4">
            <div className="relative h-6 flex-1 max-w-[280px]">
              {features.map((item, index) => {
                const Icon = item.icon;
                const isActive = index === activeIndex;
                return (
                  <div
                    key={item.label}
                    className={cn(
                      "flex items-center gap-3 text-xs font-black uppercase tracking-[0.12em] text-[#F7EFE3] transition-all duration-700 absolute inset-y-0 left-0",
                      isActive
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-2 pointer-events-none"
                    )}
                  >
                    <Icon className="h-5 w-5 text-[#C8A96A] shrink-0" />
                    <span>{item.label}</span>
                  </div>
                );
              })}
            </div>
            <div className="flex gap-1.5">
              {features.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    index === activeIndex ? "w-4 bg-[#C8A96A]" : "w-1.5 bg-white/20"
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                  type="button"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-10 right-8 hidden max-w-xs rounded-2xl border border-white/16 bg-[#FBF6ED]/14 p-4 text-[#FBF6ED] shadow-[0_18px_48px_rgba(0,0,0,0.2)] backdrop-blur-md lg:block">
        <div className="flex items-center gap-3">
          <DressSewingIcon className="h-10 w-10 shrink-0 text-[#C8A96A]" />
          <div>
            <p className="text-xs font-black uppercase tracking-[0.14em] text-[#E8D8C3]">
              Premium service studio
            </p>
            <p className="font-heading mt-1 text-2xl font-bold">
              Tailoring. Care. Fit.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
