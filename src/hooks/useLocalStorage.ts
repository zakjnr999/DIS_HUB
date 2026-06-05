"use client";

import { useMemo, useSyncExternalStore } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const snapshot = useSyncExternalStore(
    (callback) => {
      window.addEventListener("storage", callback);
      return () => window.removeEventListener("storage", callback);
    },
    () => window.localStorage.getItem(key),
    () => null,
  );

  const value = useMemo(() => {
    try {
      return snapshot ? (JSON.parse(snapshot) as T) : initialValue;
    } catch {
      return initialValue;
    }
  }, [initialValue, snapshot]);

  function updateValue(nextValue: T) {
    window.localStorage.setItem(key, JSON.stringify(nextValue));
    window.dispatchEvent(new Event("storage"));
  }

  return [value, updateValue] as const;
}
