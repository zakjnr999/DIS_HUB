"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function QRCodeWidget() {
  const [visible, setVisible] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("https://fashion-web-ebon.vercel.app");
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname + window.location.search;
      // Map local or preview paths to the live Vercel deployment URL
      setCurrentUrl(`https://fashion-web-ebon.vercel.app${path}`);
    }

    const handleScroll = () => {
      if (window.scrollY > 250) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (dismissed) return null;

  return (
    <div
      className={cn(
        "fixed bottom-6 left-6 z-40 hidden flex-col items-center rounded-2xl border border-[#E8D8C3] bg-[#FFFDF8] p-4 text-center shadow-[0_20px_50px_rgba(59,36,22,0.12)] transition-all duration-500 ease-in-out lg:flex w-[160px]",
        visible
          ? "translate-y-0 opacity-100 scale-100 pointer-events-auto"
          : "translate-y-8 opacity-0 scale-95 pointer-events-none"
      )}
    >
      <button
        onClick={() => setDismissed(true)}
        className="absolute right-2 top-2 grid h-5 w-5 place-items-center rounded-full text-[#7B6F65] hover:bg-[#F7EFE3] hover:text-[#1F1B18] transition duration-200"
        aria-label="Dismiss QR code"
        type="button"
      >
        <span className="text-xs font-bold leading-none">×</span>
      </button>

      <p className="text-[10px] font-black uppercase tracking-[0.1em] text-[#7A5636] mb-2">
        Scan to Book
      </p>

      <div className="relative h-[110px] w-[110px] bg-white p-1 rounded-lg border border-[#E8D8C3]/50">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(currentUrl)}&color=3b2416&bgcolor=fffdf8`}
          alt="Scan QR code to open on mobile"
          className="h-full w-full object-contain"
          loading="lazy"
        />
      </div>

      <p className="text-[9px] font-medium leading-normal text-[#7B6F65] mt-2 max-w-[12ch]">
        Open on your mobile phone
      </p>
    </div>
  );
}
