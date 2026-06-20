"use client";

import React from "react";
import { useSplashScreen } from "@/hooks/useSplashScreen";
import { SplashScreen } from "@/components/splash/SplashScreen";
import { EcommerceHome } from "./EcommerceHome";

export function HomeClientWrapper() {
  const { shouldShowSplash, isExiting, completeSplash } = useSplashScreen();

  return (
    <>
      {shouldShowSplash && (
        <SplashScreen 
          isExiting={isExiting} 
          onComplete={completeSplash} 
        />
      )}
      
      <div
        className={`homepage-content-wrapper transition-all duration-700 ease-out ${
          shouldShowSplash && !isExiting
            ? "pointer-events-none opacity-0 translate-y-2"
            : "opacity-100 translate-y-0"
        }`}
      >
        <EcommerceHome />
      </div>
    </>
  );
}
