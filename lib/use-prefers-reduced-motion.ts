"use client";

import { useLayoutEffect, useState, useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onStoreChange: () => void) {
  const mq = window.matchMedia(QUERY);
  const handle = () => onStoreChange();
  mq.addEventListener("change", handle);
  return () => mq.removeEventListener("change", handle);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

/**
 * `prefers-reduced-motion` from the browser, after hydration. Always `false` on the
 * server and on the first client pass so server HTML and client match (avoids
 * hydration errors when the live media query would differ from getServerSnapshot).
 */
export function usePrefersReducedMotion() {
  const fromMedia = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [hydrated, setHydrated] = useState(false);

  useLayoutEffect(() => {
    queueMicrotask(() => {
      setHydrated(true);
    });
  }, []);

  if (!hydrated) {
    return false;
  }
  return fromMedia;
}
