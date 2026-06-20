import Link from "next/link";
import { businessConfig } from "@/config/business";
import { productCategories } from "@/data/categories";
import { createWhatsAppLink } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer className="bg-black text-white" id="contact">
      <div className="container-shell grid gap-10 py-16 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3 text-xl font-black text-white">
            <img
              alt="DIS HUB Logo"
              className="h-12 w-12 rounded-xl object-contain bg-white/10 p-1"
              src="/DIS_HUB_icon.png"
            />
            <span>{businessConfig.name}</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">
            Discreet contraceptive and sexual wellness essentials with clear
            product information and privacy-conscious order handling.
          </p>
          <div className="mt-8 flex gap-3 text-slate-400">
            {socialPlatforms.map((platform) => {
              const Icon = platform.icon;
              return (
                <a
                  aria-label={platform.label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/10 transition hover:border-teal-300 hover:bg-white hover:text-slate-950"
                  href={platform.href}
                  key={platform.label}
                  rel="noreferrer"
                  target="_blank"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>
        <div>
          <p className="text-sm font-extrabold">Shop</p>
          <div className="mt-4 grid gap-3 text-sm text-slate-400">
            <Link href="/shop">All Products</Link>
            {productCategories.slice(0, 3).map((category) => (
              <Link
                href={`/shop?category=${encodeURIComponent(category.name)}`}
                key={category.slug}
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-extrabold">Customer Support</p>
          <div className="mt-4 grid gap-3 text-sm text-slate-400">
            <Link href={createWhatsAppLink(businessConfig.whatsappDefaultMessage)}>
              Contact Support
            </Link>
            <Link href="/#faq">FAQ</Link>
            <Link href="/#how-it-works">Delivery Information</Link>
            <Link href="/cart">Cart</Link>
          </div>
        </div>
        <div>
          <p className="text-sm font-extrabold">Information</p>
          <div className="mt-4 grid gap-3 text-sm text-slate-400">
            <p>{businessConfig.displayPhone}</p>
            <a href={`mailto:${businessConfig.email}`}>{businessConfig.email}</a>
            <p>{businessConfig.address}</p>
            <p>
              Information on this website is educational only and does not replace
              advice from a qualified healthcare professional.
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-slate-500">
        © 2026 {businessConfig.name}. All rights reserved.
      </div>
    </footer>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
      <rect
        height="17"
        rx="5"
        stroke="currentColor"
        strokeWidth="2"
        width="17"
        x="3.5"
        y="3.5"
      />
      <circle cx="12" cy="12" r="3.7" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.2" cy="6.8" fill="currentColor" r="1.1" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M14.1 8.1V6.7c0-.7.5-.9 1-.9h2V2.4L14.3 2c-3 0-4.6 1.8-4.6 5v1.1H6.8v3.8h2.9V22h4.4V11.9h3l.5-3.8h-3.5Z" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M15.8 2c.3 2.4 1.7 3.9 4.2 4.1v3.7a7.6 7.6 0 0 1-4.1-1.2v6.6c0 4.2-2.5 6.8-6.2 6.8-3.4 0-5.7-2.2-5.7-5.5 0-3.6 2.7-5.9 6.7-5.7v3.8c-1.7-.3-2.8.4-2.8 1.8 0 1.1.8 1.8 1.9 1.8 1.3 0 2.1-.8 2.1-2.8V2h3.9Z" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2a9.8 9.8 0 0 0-8.5 14.7L2.3 22l5.4-1.2A9.9 9.9 0 1 0 12 2Zm0 17.8c-1.4 0-2.8-.4-4-1.1l-.3-.2-3 .7.7-2.9-.2-.3A7.8 7.8 0 1 1 12 19.8Zm4.5-5.9c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.3-.6.8-.8.9-.1.2-.3.2-.5.1a6.3 6.3 0 0 1-3.1-2.7c-.2-.3 0-.4.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.2 5 4.3.7.3 1.3.4 1.7.5.7.2 1.4.2 1.9.1.6-.1 1.4-.6 1.6-1.1.2-.5.2-1 .2-1.1-.1-.1-.3-.2-.5-.3Z" />
    </svg>
  );
}

const socialPlatforms = [
  { label: "Instagram", href: "https://www.instagram.com/", icon: InstagramIcon },
  { label: "Facebook", href: "https://www.facebook.com/", icon: FacebookIcon },
  { label: "TikTok", href: "https://www.tiktok.com/", icon: TikTokIcon },
  {
    label: "WhatsApp",
    href: createWhatsAppLink(businessConfig.whatsappDefaultMessage),
    icon: WhatsAppIcon,
  },
] as const;
