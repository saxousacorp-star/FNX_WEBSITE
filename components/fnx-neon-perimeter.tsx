"use client";

import type { ReactNode } from "react";
import { fnxNeonGlowVars } from "@/lib/fnx-neon-glow-vars";

type Props = {
  children: ReactNode;
  dur: string;
  delay: string;
  reduced: boolean;
  /** Extra inset (px) so the halo clears the card; default works for rounded-sm cards. */
  glowInset?: number;
  className?: string;
};

/**
 * Halo cyan animado em todo o perímetro, por baixo do conteúdo (caixa “sobre” o neon).
 */
export function FnxNeonPerimeter({
  children,
  dur,
  delay,
  reduced,
  glowInset = 5,
  className = "",
}: Props) {
  const outer = [
    "relative flex h-full min-h-0 w-full min-w-0 flex-col",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (reduced) {
    return <div className={outer}>{children}</div>;
  }

  const inset = `-${glowInset}px`;
  const style = fnxNeonGlowVars(dur, delay);

  return (
    <div className={outer}>
      <div
        aria-hidden
        className="fnx-neon-perimeter-glow pointer-events-none absolute z-0 rounded-sm"
        style={{
          ...style,
          inset,
        }}
      />
      <div className="relative z-[1] flex min-h-0 w-full min-w-0 flex-1 flex-col">
        {children}
      </div>
    </div>
  );
}
