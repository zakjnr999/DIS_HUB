"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/common/Button";
import { businessConfig } from "@/config/business";
import { createWhatsAppLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#services", label: "Services" },
  { href: "/book", label: "Book" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const isHome = pathname === "/";

  return (
    <header
      className={cn(
        "top-0 z-50 w-full py-4",
        isHome
          ? "absolute bg-transparent"
          : "sticky bg-[#FBF6ED]/72 backdrop-blur-xl",
      )}
    >
      <nav
        aria-label="Primary navigation"
        className={cn(
          "container-shell flex min-h-14 items-center justify-between gap-3 overflow-hidden rounded-full border px-3 py-2 transition-colors",
          isHome
            ? "border-white/20 bg-white/10 text-[#FFFDF8] shadow-[0_18px_48px_rgba(0,0,0,0.16)] backdrop-blur-md"
            : "border-[#E8D8C3]/72 bg-[#FFFDF8]/74 text-[#1F1B18] shadow-[0_16px_42px_rgba(59,36,22,0.10)]",
        )}
      >
        <Link className="flex min-w-0 items-center gap-2.5 font-black" href="/">
          <Image
            alt={`${businessConfig.name} Logo`}
            className="h-10 w-10 shrink-0 rounded-full object-cover shadow-[0_10px_24px_rgba(59,36,22,0.18)]"
            height={40}
            src="/adeyie_icon.png"
            width={40}
          />
          <span className="truncate font-heading text-lg sm:text-xl">
            {businessConfig.name}
          </span>
        </Link>

        <div
          className={cn(
            "hidden items-center gap-1 rounded-full p-1 lg:flex",
            isHome ? "bg-black/16" : "bg-[#F7EFE3]/70",
          )}
        >
          {links.map((link) => (
            <Link
              className={cn(
                "rounded-full px-3.5 py-2 text-sm font-extrabold transition",
                isHome
                  ? "text-[#F7EFE3] hover:bg-white/16 hover:text-white"
                  : "text-[#7A5636] hover:bg-[#FFFDF8] hover:text-[#1F1B18]",
                pathname === link.href &&
                  (isHome
                    ? "bg-white/18 text-white shadow-[0_8px_18px_rgba(0,0,0,0.12)]"
                    : "bg-[#FFFDF8] text-[#1F1B18] shadow-[0_8px_18px_rgba(59,36,22,0.08)]"),
              )}
              href={link.href}
              key={link.href}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <a
            className={cn(
              "rounded-full px-4 py-2 text-sm font-extrabold transition",
              isHome
                ? "text-[#FFFDF8] hover:bg-white/16"
                : "text-[#7A5636] hover:bg-[#F7EFE3] hover:text-[#1F1B18]",
            )}
            href={businessConfig.phoneHref}
          >
            Call
          </a>
          <Button
            size="sm"
            variant={isHome ? "light" : "primary"}
            href={createWhatsAppLink(businessConfig.whatsappDefaultMessage)}
          >
            WhatsApp
          </Button>
        </div>

        <button
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
          className={cn(
            "grid h-11 w-11 shrink-0 place-items-center rounded-full border shadow-sm lg:hidden",
            isHome
              ? "border-white/24 bg-white/14"
              : "border-[#E8D8C3] bg-[#FFFDF8]",
          )}
          onClick={() => setIsOpen((value) => !value)}
          type="button"
        >
          <span className="grid gap-1.5">
            <span
              className={cn(
                "block h-0.5 w-5 rounded-full",
                isHome ? "bg-[#FFFDF8]" : "bg-[#3B2416]",
              )}
            />
            <span
              className={cn(
                "block h-0.5 w-5 rounded-full",
                isHome ? "bg-[#FFFDF8]" : "bg-[#3B2416]",
              )}
            />
            <span
              className={cn(
                "block h-0.5 w-5 rounded-full",
                isHome ? "bg-[#FFFDF8]" : "bg-[#3B2416]",
              )}
            />
          </span>
        </button>
      </nav>

      <div
        className={cn(
          "grid overflow-hidden transition-all duration-300 lg:hidden",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="min-h-0">
          <div
            className={cn(
              "container-shell mt-2 grid gap-2 rounded-[2rem] border p-3 shadow-[0_16px_42px_rgba(59,36,22,0.10)] backdrop-blur-xl",
              isHome
                ? "border-white/20 bg-[#24140C]/72"
                : "border-[#E8D8C3] bg-[#FFFDF8]/92",
            )}
          >
            {links.map((link) => (
              <Link
                className={cn(
                  "rounded-full px-4 py-3 text-sm font-bold",
                  isHome
                    ? "text-[#F7EFE3] hover:bg-white/12"
                    : "text-[#3B2416] hover:bg-[#E8D8C3]/45",
                )}
                href={link.href}
                key={link.href}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button
              className="mt-2 w-full"
              href={createWhatsAppLink(businessConfig.whatsappDefaultMessage)}
            >
              Speak to Customer Service
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
