import { useState, useEffect, useCallback } from "react";

export function useSplashScreen() {
  const [shouldShowSplash, setShouldShowSplash] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  const completeSplash = useCallback(() => {
    try {
      sessionStorage.setItem("dis-hub-splash-seen", "true");
    } catch {
      console.warn("sessionStorage is not available");
    }
    try {
      document.documentElement.removeAttribute("data-splash-active");
    } catch {}
    setIsExiting(true);
    // Allow animation transition to complete before unmounting (700ms match duration-700)
    setTimeout(() => {
      setShouldShowSplash(false);
    }, 700);
  }, []);

  useEffect(() => {
    // Determine if user has already seen the splash screen in this session
    let hasSeen = false;
    try {
      hasSeen = !!sessionStorage.getItem("dis-hub-splash-seen");
    } catch {
      // In case of restricted browser policies
      hasSeen = false;
    }

    if (hasSeen) {
      // Queue unmounting to avoid React synchronous setState in effect warnings
      const stateTimer = setTimeout(() => {
        setShouldShowSplash(false);
      }, 0);
      return () => clearTimeout(stateTimer);
    }

    // Support reduced-motion query
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const prefersReducedMotion = mediaQuery.matches;

    // Timing configurations (in milliseconds)
    const duration = prefersReducedMotion ? 400 : 3800;
    const fadeOutDelay = prefersReducedMotion ? 0 : 3100;

    // Stagger transition triggers
    const exitTimer = setTimeout(() => {
      try {
        document.documentElement.removeAttribute("data-splash-active");
      } catch {}
      setIsExiting(true);
    }, fadeOutDelay);

    const finishTimer = setTimeout(() => {
      completeSplash();
    }, duration);

    // Hard fallback safety timer (4.5 seconds)
    const safetyTimer = setTimeout(() => {
      completeSplash();
    }, 4500);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(finishTimer);
      clearTimeout(safetyTimer);
    };
  }, [completeSplash]);

  return {
    shouldShowSplash,
    isExiting,
    completeSplash,
  };
}
