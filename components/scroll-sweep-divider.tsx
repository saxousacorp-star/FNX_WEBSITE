"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

/**
 * Linha superior que “preenche” da esquerda para a direita consoante a posição de scroll
 * (minimal; sem animação de scroll se `prefers-reduced-motion: reduce`).
 */
export function ScrollSweepDivider() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);
  const reduced = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const el = trackRef.current;
    if (!el) {
      return;
    }

    const update = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      if (reduced) {
        const inView = r.top < vh * 0.9 && r.bottom > 0;
        setProgress(inView ? 1 : 0);
        return;
      }

      // Top do ancora: quando ainda fora, 0; ao aproximar do viewport, preenche de forma contínua
      const startY = vh * 0.95;
      const endY = vh * 0.16;
      const top = r.top;
      const t = (startY - top) / (startY - endY);
      setProgress(Math.min(1, Math.max(0, t)));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [reduced]);

  return (
    <div
      aria-hidden
      className="relative left-1/2 -ml-[50vw] w-screen max-w-[100vw] overflow-x-clip [overflow-clip-margin:0]"
      ref={trackRef}
    >
      <div className="relative h-[1.5px] w-full min-w-0">
        {/* pista ténue: referência visual estável (opcional) */}
        <div className="absolute inset-0 bg-[#0B1F3A]/[0.06]" />
        <div
          className="absolute inset-0 origin-left will-change-transform [transform:translateZ(0)]"
          style={{
            background:
              "linear-gradient(90deg, rgba(11,31,58,0.1) 0%, rgba(11,31,58,0.45) 45%, rgba(11,31,58,0.12) 100%)",
            transform: `scaleX(${progress})`,
            transformOrigin: "left center",
          }}
        />
      </div>
    </div>
  );
}
