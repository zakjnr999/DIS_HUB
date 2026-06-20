"use client";

import { useMemo, useSyncExternalStore } from "react";

const STORAGE_KEY = "dis-hub-favorites";
const FAVORITES_CHANGED_EVENT = "dis-hub-favorites-changed";

function canUseStorage() {
  return typeof window !== "undefined" && "localStorage" in window;
}

function getFavoritesSnapshot() {
  if (!canUseStorage()) {
    return "[]";
  }

  return window.localStorage.getItem(STORAGE_KEY) || "[]";
}

function setFavoriteIds(ids: string[]) {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  window.dispatchEvent(new Event(FAVORITES_CHANGED_EVENT));
}

export function useFavorites() {
  const snapshot = useSyncExternalStore(subscribe, getFavoritesSnapshot, () => "[]");
  const favoriteIds = useMemo(() => {
    try {
      return JSON.parse(snapshot) as string[];
    } catch {
      return [];
    }
  }, [snapshot]);

  function isFavorite(productId: string) {
    return favoriteIds.includes(productId);
  }

  function toggleFavorite(productId: string) {
    const nextFavorites = isFavorite(productId)
      ? favoriteIds.filter((id) => id !== productId)
      : [productId, ...favoriteIds];

    setFavoriteIds(nextFavorites);
  }

  return { favoriteIds, isFavorite, toggleFavorite };
}

function subscribe(callback: () => void) {
  window.addEventListener(FAVORITES_CHANGED_EVENT, callback);
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener(FAVORITES_CHANGED_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}
