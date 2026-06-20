"use client";

import React, { useEffect } from "react";
import { SplashLogo } from "./SplashLogo";
import { SplashProgress } from "./SplashProgress";

interface SplashScreenProps {
  isExiting: boolean;
  onComplete: () => void;
}

export function SplashScreen({ isExiting, onComplete }: SplashScreenProps) {
  // Lock body scrolling while splash screen is mounted
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050816] text-[#fafaf7] px-6 transition-all duration-700 ease-out select-none ${isExiting ? "opacity-0 scale-98 pointer-events-none" : "opacity-100 scale-100"
        }`}
      role="status"
    >
      {/* Background Radial Glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(15,118,110,0.15)_0%,rgba(5,8,22,0)_70%)]"
      />

      {/* Main Content Composition */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-md w-full">
        {/* Animated Brand Mark */}
        <div aria-hidden="true" className="mb-6 animate-splash-logo-container">
          <SplashLogo />
        </div>

        {/* Welcome Headline */}
        <h1 className="text-3xl font-light tracking-[0.02em] text-[#fafaf7] sm:text-4xl animate-splash-welcome">
          Welcome to <span className="font-extrabold text-teal-300">DIS HUB</span>
        </h1>

        {/* Supporting Line */}
        <p className="mt-3 text-sm font-light text-slate-300 tracking-wide max-w-xs sm:max-w-sm animate-splash-desc">
          Private care. Trusted products. Discreet delivery.
        </p>

        {/* Trust Labels */}
        <div
          aria-hidden="true"
          className="mt-6 flex flex-wrap items-center justify-center gap-x-2 gap-y-1.5 text-[11px] font-bold text-teal-400/80 tracking-wider uppercase animate-splash-labels"
        >
          <span>Discreet Packaging</span>
          <span className="text-slate-700 font-normal select-none">•</span>
          <span>Trusted Products</span>
          <span className="text-slate-700 font-normal select-none">•</span>
          <span>Private Ordering</span>
        </div>

        {/* Divider Spacer */}
        <div className="h-16 flex items-center justify-center mt-8">
          <div className="flex flex-col items-center gap-3 w-full">
            {/* Horizontal Line Progress */}
            <div className="animate-splash-progress-container w-full flex justify-center">
              <SplashProgress />
            </div>

            {/* Subtitle status info */}
            <p className="text-[11px] font-semibold text-slate-500 tracking-wide animate-splash-status">
              Preparing your private shopping experience…
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
