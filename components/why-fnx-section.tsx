"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { FnxNeonPerimeter } from "@/components/fnx-neon-perimeter";
import { useFuturisticGlowTiming } from "@/lib/use-futuristic-glow-timing";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

const ROTATE_MS = 5000;

type Reason = {
  title: string;
  blurb: string;
};

const REASONS: Reason[] = [
  {
    title: "Immediate dispatch",
    blurb:
      "Faster first response and routing so high-priority moves don’t sit in a queue " +
      "while your window is closing.",
  },
  {
    title: "24/7 online",
    blurb:
      "A live line when plans change: coverage, updates, and coordination around the " +
      "clock—not just when it’s convenient.",
  },
  {
    title: "Excellent coverage",
    blurb:
      "National reach with a carrier mindset: capacity where you need it, aligned with " +
      "how you run brokers, shippers, and tight lanes.",
  },
  {
    title: "Transparency",
    blurb:
      "What we know, you know—status, exceptions, and accountability without black-box " +
      "blame transfer.",
  },
  {
    title: "Safety-first operations",
    blurb:
      "Rigor on training, equipment, and road discipline: protecting your freight and the " +
      "people who move it, without slowing what matters on your deadline.",
  },
  {
    title: "On-time focus",
    blurb:
      "Deadlines are operational truth here—clear lanes of ownership from pickup through " +
      "delivery, so “commit” means the same to us as it does to you.",
  },
];

export function WhyFnxSection() {
  const uid = useId();
  const [active, setActive] = useState(0);
  const pauseRef = useRef(false);
  const reduced = usePrefersReducedMotion();
  const { dur, delay } = useFuturisticGlowTiming(reduced);
  const current = REASONS[active];

  const advance = useCallback(() => {
    setActive((i) => (i + 1) % REASONS.length);
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
    return () => {
      window.clearInterval(id);
    };
  }, [reduced, advance]);

  return (
    <section
      className="bg-[#F5F5F7] py-[120px] scroll-mt-28 lg:scroll-mt-20"
      id="why-fnx"
    >
      <div className="mx-auto w-full max-w-7xl px-6 md:px-12">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-10 xl:gap-14">
          <div className="lg:col-span-5">
            <h2 className="type-title-section">Why FNX</h2>
            <p className="mt-4 text-lg leading-8 text-[#334155]">
              We understand that our company’s success is built on the quality of our
              service. We work to keep our people safe, and we are equally dedicated to
              meeting the deadlines you stake your reputation on.
            </p>
            <p className="mt-4 text-base leading-8 text-[#475569]">
              The panel highlights what that looks like in practice—dispatch speed,
              around-the-clock access, reach, and straight answers you can use.
            </p>
          </div>

          <div
            className="min-h-0 lg:col-span-7"
            onMouseEnter={() => {
              pauseRef.current = true;
            }}
            onMouseLeave={() => {
              pauseRef.current = false;
            }}
          >
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-[#64748B]">
              At a glance
            </p>
            <div
              className="flex flex-wrap gap-2"
              role="tablist"
              aria-label="Why FNX: select a reason"
            >
              {REASONS.map((r, i) => {
                const isActive = i === active;
                return (
                  <button
                    aria-controls={`${uid}-panel`}
                    aria-selected={isActive}
                    className={
                      isActive
                        ? "rounded-full bg-[#0B1F3A] px-3.5 py-1.5 text-left text-sm font-medium text-white shadow-sm transition"
                        : "rounded-full border border-[#E2E8F0] bg-[#F8FAFC] px-3.5 py-1.5 text-left text-sm font-medium text-[#334155] transition hover:border-[#CBD5E1] hover:bg-white"
                    }
                    id={`${uid}-tab-${i}`}
                    key={r.title}
                    onClick={() => {
                      setActive(i);
                    }}
                    role="tab"
                    type="button"
                  >
                    {r.title}
                  </button>
                );
              })}
            </div>

            <FnxNeonPerimeter
              className="fnx-neon-why-fnx-panel mt-6 max-sm:h-auto max-sm:min-h-0"
              delay={delay}
              dur={dur}
              reduced={reduced}
            >
              <div
                className="min-h-[12rem] overflow-hidden rounded-sm border-0 bg-gradient-to-br from-[#F1F5F9]/90 to-white/80 p-6 sm:min-h-[11rem] sm:p-8"
                id={`${uid}-panel`}
                role="tabpanel"
                aria-labelledby={`${uid}-tab-${active}`}
                tabIndex={0}
              >
                <div className="why-fnx-panel-swap" key={active}>
                  <h3 className="type-card-title text-[#0F172A]">{current.title}</h3>
                  <p className="mt-4 text-base leading-8 text-[#475569]">{current.blurb}</p>
                </div>
              </div>
            </FnxNeonPerimeter>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-1.5" aria-hidden>
                {REASONS.map((_, i) => (
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
        </div>
      </div>
    </section>
  );
}
