"use client";

import type { CSSProperties, ReactNode } from "react";
import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { FnxNeonPerimeter } from "@/components/fnx-neon-perimeter";
import { useFuturisticGlowTiming } from "@/lib/use-futuristic-glow-timing";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

const ROTATE_MS = 5000;

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

function AboutPanelSwap({ children }: { children: ReactNode }) {
  return <div className="why-fnx-panel-swap">{children}</div>;
}

export function AboutSection() {
  const uid = useId();
  const reduced = usePrefersReducedMotion();
  const { dur, delay } = useFuturisticGlowTiming(reduced);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [scrollRevealed, setScrollRevealed] = useState(false);
  const inView = reduced || scrollRevealed;
  const [active, setActive] = useState(0);
  const pauseRef = useRef(false);

  const advance = useCallback(() => {
    setActive((i) => (i + 1) % blocks.length);
  }, []);

  useEffect(() => {
    if (reduced) {
      return;
    }
    const id = window.setInterval(() => {
      if (!pauseRef.current) {
        advance();
      }
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [reduced, advance]);

  useLayoutEffect(() => {
    if (reduced) {
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
            setScrollRevealed(true);
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

  const current = blocks[active]!;

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

      {/* Mobile: mesmo ritmo que Why FNX — chips, painel único, pontos, auto-rotação */}
      <div
        className="about-anim-target mt-14 min-h-0 w-full min-w-0 sm:hidden"
        style={revealDelay(40)}
        onMouseEnter={() => {
          pauseRef.current = true;
        }}
        onMouseLeave={() => {
          pauseRef.current = false;
        }}
      >
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-[#64748B]">
          What defines us
        </p>
        <div
          className="flex flex-wrap gap-2"
          role="tablist"
          aria-label="About us: select a topic"
        >
          {blocks.map((item, i) => {
            const isActive = i === active;
            return (
              <button
                aria-controls={`${uid}-about-panel`}
                aria-selected={isActive}
                className={
                  isActive
                    ? "rounded-full bg-[#0B1F3A] px-3.5 py-1.5 text-left text-sm font-medium text-white shadow-sm transition"
                    : "rounded-full border border-[#E2E8F0] bg-[#F8FAFC] px-3.5 py-1.5 text-left text-sm font-medium text-[#334155] transition hover:border-[#CBD5E1] hover:bg-white"
                }
                id={`${uid}-about-tab-${i}`}
                key={item.title}
                onClick={() => setActive(i)}
                role="tab"
                type="button"
              >
                {item.title}
              </button>
            );
          })}
        </div>

        <FnxNeonPerimeter className="mt-6" delay={delay} dur={dur} reduced={reduced}>
          <div
            className="min-h-[12rem] overflow-hidden rounded-sm bg-gradient-to-br from-[#F1F5F9]/90 to-white/80 p-6"
            id={`${uid}-about-panel`}
            role="tabpanel"
            aria-labelledby={`${uid}-about-tab-${active}`}
            tabIndex={0}
          >
            <AboutPanelSwap key={active}>
              <h3 className={titleClass}>{current.title}</h3>
              <div className="mt-0">{current.body}</div>
            </AboutPanelSwap>
          </div>
        </FnxNeonPerimeter>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5" aria-hidden>
            {blocks.map((_, i) => (
              <span
                className={
                  i === active
                    ? "h-1.5 w-6 rounded-full bg-[#0B1F3A] transition-all duration-500"
                    : "h-1.5 w-1.5 rounded-full bg-[#CBD5E1] transition-all duration-500"
                }
                key={i}
              />
            ))}
          </div>
          {!reduced ? (
            <p className="text-xs text-[#94A3B8]">Auto · hover to pause</p>
          ) : null}
        </div>
      </div>

      {/* Desktop: grelha 2×2; neon só no perímetro de cada caixa */}
      <div
        className="about-anim-target relative mt-14 hidden w-full min-w-0 sm:mt-16 md:mt-20 lg:mt-24 sm:block"
        style={revealDelay(20)}
      >
        <ul
          className={[
            "relative z-[6] m-0 w-full list-none p-0",
            "grid min-w-0 [box-sizing:border-box]",
            "grid-cols-[repeat(2,minmax(0,1fr))] gap-[0.3cm] [grid-template-areas:'a_b'_'c_d'] items-stretch",
          ].join(" ")}
        >
          {blocks.map((item, i) => {
            const area = (["a", "b", "c", "d"] as const)[i]!;
            return (
              <li
                className="m-0 flex h-full min-h-0 min-w-0 flex-col self-stretch"
                key={item.title}
                style={{ ...revealDelay(CARD_REVEAL_MS[i] ?? 0), gridArea: area }}
              >
                <FnxNeonPerimeter delay={delay} dur={dur} reduced={reduced}>
                  <div className={`${cardClass} flex-1`}>
                    <h3 className={titleClass}>{item.title}</h3>
                    {item.body}
                  </div>
                </FnxNeonPerimeter>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
