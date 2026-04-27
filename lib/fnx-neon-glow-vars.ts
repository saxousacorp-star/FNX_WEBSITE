import type { CSSProperties } from "react";

export function fnxNeonGlowVars(dur: string, delay: string): CSSProperties {
  return {
    ["--about-glow-dur" as string]: dur,
    ["--about-glow-delay" as string]: delay,
  };
}
