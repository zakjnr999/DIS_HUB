import Link from "next/link";
import { businessConfig } from "@/config/business";
import { services } from "@/data/services";
import { createWhatsAppLink } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer className="bg-[#3B2416] text-[#FBF6ED]">
      <div className="container-shell pt-6">
        <div className="stitch-line opacity-40" />
      </div>
      <div className="container-shell grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <p className="font-heading text-3xl font-bold">{businessConfig.name}</p>
          <p className="mt-4 max-w-sm text-sm leading-6 text-[#E8D8C3]">
            Professional tailoring, alteration, clothing care, and booking
            support for customers who want neat finishing and reliable service.
          </p>
        </div>
        <div>
          <p className="font-bold text-[#F7EFE3]">Quick links</p>
          <div className="mt-4 grid gap-2 text-sm text-[#E8D8C3]">
            <Link href="/#about">About</Link>
            <Link href="/#services">Services</Link>
            <Link href="/book">Book a Service</Link>
            <Link href="/admin">Admin Demo</Link>
          </div>
        </div>
        <div>
          <p className="font-bold text-[#F7EFE3]">Services</p>
          <div className="mt-4 grid gap-2 text-sm text-[#E8D8C3]">
            {services.slice(0, 5).map((service) => (
              <Link href="/#services" key={service.slug}>
                {service.title}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="font-bold text-[#F7EFE3]">Contact</p>
          <div className="mt-4 grid gap-2 text-sm text-[#E8D8C3]">
            <a href={businessConfig.phoneHref}>{businessConfig.displayPhone}</a>
            <a href={`mailto:${businessConfig.email}`}>{businessConfig.email}</a>
            <a href={createWhatsAppLink(businessConfig.whatsappDefaultMessage)}>
              WhatsApp customer service
            </a>
            <p>{businessConfig.socialLinks.join(" / ")}</p>
          </div>
        </div>
      </div>
      <div className="border-t border-[#E8D8C3]/15 py-5 text-center text-sm text-[#E8D8C3]">
        © 2026 Adi3ye Services. All rights reserved.
      </div>
    </footer>
  );
}
