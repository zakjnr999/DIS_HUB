"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CartIcon, SearchIcon, AdminIcon, MenuIcon } from "@/components/icons";
import { businessConfig } from "@/config/business";
import { useCart } from "@/hooks/useCart";
import { createWhatsAppLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/#categories", label: "Categories" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#faq", label: "FAQ" },
  { href: createWhatsAppLink(businessConfig.whatsappDefaultMessage), label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
      <div className="container-shell flex min-h-[72px] items-center gap-4">
        <Link className="group shrink-0 flex items-center gap-1 text-xl font-black tracking-tighter" href="/">
          <span className="text-slate-950">DIS</span>
          <span className="bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent">HUB</span>
          <span className="h-1.5 w-1.5 rounded-full bg-teal-500 transition-transform duration-300 group-hover:scale-150" />
        </Link>

        <Link
          className="hidden min-h-10 w-[320px] items-center gap-2 rounded-lg bg-slate-100 px-4 text-sm font-semibold text-slate-400 md:flex"
          href="/shop"
        >
          <SearchIcon className="h-4 w-4" />
          Search products
        </Link>

        <nav
          aria-label="Primary navigation"
          className="ml-auto hidden items-center gap-7 lg:flex"
        >
          {links.map((link) => (
            <Link
              className={cn(
                "text-xs font-extrabold transition hover:text-slate-950",
                pathname === link.href ? "text-slate-950" : "text-slate-400",
              )}
              href={link.href}
              key={link.label}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <Link
            aria-label="Open search"
            className="grid h-10 w-10 place-items-center rounded-lg text-slate-700 hover:bg-slate-100 md:hidden"
            href="/shop"
          >
            <SearchIcon className="h-5 w-5" />
          </Link>
          <Link
            aria-label="Admin panel"
            className="grid h-10 w-10 place-items-center rounded-lg text-slate-700 hover:bg-slate-100"
            href="/admin"
          >
            <AdminIcon className="h-5 w-5" />
          </Link>
          <Link
            aria-label={`Open cart with ${count} items`}
            className="relative grid h-10 w-10 place-items-center rounded-lg text-slate-700 hover:bg-slate-100"
            href="/cart"
          >
            <CartIcon className="h-5 w-5" />
            {count > 0 ? (
              <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-teal-700 px-1 text-[10px] font-black text-white">
                {count}
              </span>
            ) : null}
          </Link>
          <button
            aria-expanded={isOpen}
            aria-label="Toggle menu"
            className="grid h-10 w-10 place-items-center rounded-lg text-slate-800 hover:bg-slate-100 lg:hidden"
            onClick={() => setIsOpen((value) => !value)}
            type="button"
          >
            <MenuIcon className="h-5 w-5 text-slate-700" />
          </button>
        </div>
      </div>

      <div
        className={cn(
          "grid overflow-hidden border-t border-slate-200 bg-white transition-all lg:hidden",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="min-h-0">
          <div className="container-shell grid gap-1 py-3">
            {links.map((link) => (
              <Link
                className="rounded-lg px-3 py-3 text-sm font-extrabold text-slate-700 hover:bg-slate-100"
                href={link.href}
                key={link.label}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
