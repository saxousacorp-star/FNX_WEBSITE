"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

const revealDelay = (ms: number): CSSProperties => ({
  ["--about-reveal-delay" as string]: `${ms}ms`,
});

/** Números: sem `whitespace-nowrap` para a grelha não forçar colunas com larguras diferentes. */
const numberHighlightAboutClass =
  "min-w-0 [font-family:var(--font-jakarta),var(--font-inter),ui-sans-serif] text-2xl font-semibold tabular-nums tracking-tight text-[#0B1F3A] sm:text-3xl md:text-[2rem]";

const cardClass =
  "box-border flex min-h-0 w-full min-w-0 flex-col rounded-sm border border-slate-200/70 bg-white/90 p-8 shadow-[0_1px_0_0_rgba(15,23,42,0.04),0_12px_40px_-20px_rgba(15,23,42,0.08)] md:p-10 lg:p-12";

const titleClass =
  "text-lg font-medium leading-snug tracking-[-0.02em] text-[#0F172A] [font-family:var(--font-jakarta),var(--font-inter),ui-sans-serif] sm:text-xl";

const bodyClass = "mt-4 min-w-0 text-base leading-[1.75] text-[#475569] sm:text-[17px] sm:leading-8";

const CARD_REVEAL_MS = [55, 110, 185, 250] as const;

function RoadTestedBody() {
  return (
    <p className={bodyClass}>
      Our trusted fleet has successfully executed over{" "}
      <span className={numberHighlightAboutClass}>800</span> {"time\u2011critical"} deliveries across{" "}
      <span className={numberHighlightAboutClass}>2,000,000+</span> miles nationwide.
    </p>
  );
}

const blocks: { title: string; body: ReactNode }[] = [
  {
    title: "The Foundation",
    body: (
      <p className={bodyClass}>
        Engineered by leadership with deep expertise in Lean methodologies, Just-In-Time
        operations, and strict logistics management.
      </p>
    ),
  },
  {
    title: "Road-Tested Authority",
    body: <RoadTestedBody />,
  },
  {
    title: "High-Ticket Responsibility",
    body: (
      <p className={bodyClass}>
        Designed to handle high-value freight where there is zero margin for error. We treat
        your business with extreme responsibility.
      </p>
    ),
  },
  {
    title: "Our True Value",
    body: (
      <p className={bodyClass}>
        Technology optimizes routes, but people drive our success. Our team is our
        greatest asset, and our clients are our most valued treasure.
      </p>
    ),
  },
];

function useFuturisticGlowTiming(reduced: boolean) {
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

const glowVarStyle = (dur: string, delay: string): CSSProperties => ({
  ["--about-glow-dur" as string]: dur,
  ["--about-glow-delay" as string]: delay,
});

function AboutInterPairGlowH({
  dur,
  delay,
  reduced,
}: {
  dur: string;
  delay: string;
  reduced: boolean;
}) {
  if (reduced) {
    return (
      <div
        className="pointer-events-none h-full w-full [background:linear-gradient(90deg,transparent_0%,rgba(14,165,233,0.2)_50%,transparent_100%)] opacity-30"
        aria-hidden
      />
    );
  }
  return (
    <div
      className="about-glow-future-line pointer-events-none absolute top-1/2 right-0 left-0 h-px -translate-y-1/2 rounded-full"
      style={glowVarStyle(dur, delay)}
      aria-hidden
    />
  );
}

function AboutInterPairGlowV({ dur, delay, reduced }: { dur: string; delay: string; reduced: boolean }) {
  if (reduced) {
    return (
      <div
        className="pointer-events-none absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-[#0ea5e9]/20"
        aria-hidden
      />
    );
  }
  return (
    <div
      className="about-glow-future-line pointer-events-none absolute top-0 left-1/2 h-full w-px -translate-x-1/2 rounded-full [background:linear-gradient(180deg,transparent_0%,rgba(14,165,233,0.2)_20%,rgba(6,182,212,0.9)_50%,rgba(56,189,248,0.25)_80%,transparent_100%)] [box-shadow:0_0_12px_2px_rgba(14,165,233,0.35),0_0_28px_6px_rgba(56,189,248,0.15)]"
      style={glowVarStyle(dur, delay)}
      aria-hidden
    />
  );
}

export function AboutSection() {
  const reduced = usePrefersReducedMotion();
  const { dur, delay } = useFuturisticGlowTiming(reduced);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useLayoutEffect(() => {
    if (reduced) {
      setInView(true);
      return;
    }

    const el = rootRef.current;
    if (!el) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true);
            observer.disconnect();
            return;
          }
        }
      },
      { root: null, rootMargin: "0px 0px -5% 0px", threshold: 0.08 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced]);

  return (
    <div
      className={[
        "relative flex min-h-[58vh] w-full min-w-0 flex-col scroll-mt-28 lg:scroll-mt-20",
        inView ? "about-section--visible" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      id="about"
      ref={rootRef}
    >
      <div className="about-anim-target relative w-full max-w-3xl" style={revealDelay(0)}>
        <p className="type-eyebrow-muted">About us</p>
        <h2 className="type-title-section mt-3 md:mt-4">FNX Transportation</h2>
        <p className="mt-4 max-w-2xl text-base leading-8 text-[#475569] sm:text-lg sm:leading-8">
          We take pride in our national operations.
        </p>
      </div>

      <div className="relative mt-14 w-full min-w-0 sm:mt-16 md:mt-20 lg:mt-24">
        <div
          className="pointer-events-none absolute inset-0 z-[4] hidden sm:block"
          aria-hidden
        >
          <AboutInterPairGlowV dur={dur} delay={delay} reduced={reduced} />
        </div>
        <ul
          className={[
            "relative z-[6] m-0 w-full list-none p-0",
            "grid min-w-0 [box-sizing:border-box]",
            "max-sm:[grid-template-areas:'a'_'b'_'sep'_'c'_'d'] max-sm:gap-y-[0.3cm]",
            "sm:[grid-template-columns:minmax(0,1fr)_minmax(0,1fr)] sm:gap-x-[0.3cm] sm:gap-y-0",
            "sm:[grid-template-areas:'a_b'_'sep_sep'_'c_d'] sm:items-stretch",
          ].join(" ")}
        >
          {blocks.slice(0, 2).map((item, i) => {
            const area = i === 0 ? "a" : "b";
            return (
              <li
                className="about-anim-target m-0 flex min-h-0 min-w-0 flex-col"
                key={item.title}
                style={{ ...revealDelay(CARD_REVEAL_MS[i] ?? 0), gridArea: area }}
              >
                <div className={`${cardClass} h-full min-h-0`}>
                  <h3 className={titleClass}>{item.title}</h3>
                  {item.body}
                </div>
              </li>
            );
          })}
          <li
            className="relative m-0 h-0 min-h-0 w-full min-w-0 overflow-visible p-0 max-sm:h-0 sm:min-h-[0.3cm] sm:py-0"
            role="presentation"
            aria-hidden
            style={{ gridArea: "sep" }}
          >
            <AboutInterPairGlowH dur={dur} delay={delay} reduced={reduced} />
          </li>
          {blocks.slice(2, 4).map((item, i) => {
            const area = i === 0 ? "c" : "d";
            return (
              <li
                className="about-anim-target m-0 flex min-h-0 min-w-0 flex-col"
                key={item.title}
                style={{
                  ...revealDelay(CARD_REVEAL_MS[i + 2] ?? 200),
                  gridArea: area,
                }}
              >
                <div className={`${cardClass} h-full min-h-0`}>
                  <h3 className={titleClass}>{item.title}</h3>
                  {item.body}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
