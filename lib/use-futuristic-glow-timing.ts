"use client";

import { useEffect, useState } from "react";

export function useFuturisticGlowTiming(reduced: boolean) {
  const [dur, setDur] = useState("2.4s");
  const [delay, setDelay] = useState("0.12s");

  useEffect(() => {
    if (reduced) {
      return;
    }

    let cancelled = false;
    let timeoutId = 0;

    const roll = () => {
      if (cancelled) {
        return;
      }
      setDur(`${(1.4 + Math.random() * 2.2).toFixed(2)}s`);
      setDelay(`${(Math.random() * 0.55).toFixed(2)}s`);
    };

    const schedule = () => {
      if (cancelled) {
        return;
      }
      roll();
      const wait = 1200 + Math.random() * 2200;
      timeoutId = window.setTimeout(schedule, wait);
    };

    schedule();
    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [reduced]);

  return { dur, delay };
}
