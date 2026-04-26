"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

type SmartAiFastSectionProps = {
  className?: string;
};

/**
 * Bloco “SmartAI + Fast”: título com sublinhado que se desdobra ao entrar no viewport
 * (minimal, sem dependências de animação).
 */
export function SmartAiFastSection({ className = "" }: SmartAiFastSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) {
      return;
    }

    const run = (entry: IntersectionObserverEntry) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.unobserve(entry.target);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          run(e);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const active = inView;
  const lineWide = active || reduced;

  return (
    <section
      id="smartai-fast"
      className={[
        "scroll-mt-28 border-t border-white/[0.07] bg-gradient-to-b from-[#2D3748] to-[#262e3a] py-[120px] lg:scroll-mt-20",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      ref={sectionRef}
    >
      <div className="mx-auto w-full max-w-7xl px-6 md:px-12">
        <p
          className={[
            "type-eyebrow-white flex flex-wrap items-baseline gap-x-1.5 gap-y-0",
            "[transition-timing-function:cubic-bezier(0.22,1,0.36,1)]",
            "transition-[opacity,transform] duration-700 will-change-transform",
            active ? "translate-y-0 opacity-100" : "translate-y-1.5 opacity-0",
            reduced && "translate-y-0 opacity-100",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <span className="text-white/90">SmartAI</span>
          <span className="font-light text-white/35" aria-hidden>
            +
          </span>
          <span className="font-medium tracking-wide text-white/95 [font-size:0.75em] sm:text-inherit">
            <span className="text-white/75">f</span>
            <span className="text-white/75">a</span>
            <span className="text-white">ST</span>
          </span>
        </p>

        <h2 className="type-smartai mt-6 max-w-4xl text-white">
          <span className="block w-full max-w-4xl">
            <span
              className={[
                "block text-white [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]",
                "transition-[opacity,transform] duration-700 will-change-transform",
                active ? "translate-y-0 opacity-100" : "translate-y-2.5 opacity-0",
                reduced && "translate-y-0 opacity-100",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              Intelligence at full speed—visibility you can act on, every mile.
            </span>
            <span
              aria-hidden
              className={[
                "mt-3 block h-[1.5px] w-full max-w-[min(100%,32rem)] origin-left",
                "bg-gradient-to-r from-white/[0.12] via-white/55 to-white/18 [transition-property:transform]",
                "[transition-timing-function:cubic-bezier(0.22,1,0.36,1)]",
                lineWide ? "scale-x-100" : "scale-x-0",
                reduced ? "duration-0" : "duration-[1100ms]",
              ].join(" ")}
            />
          </span>
        </h2>

        <p
          className={[
            "mt-8 max-w-3xl text-lg leading-8 text-white/90",
            "transition-[opacity,transform] duration-[780ms] will-change-transform",
            active ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
            reduced && "translate-y-0 opacity-100",
          ]
            .filter(Boolean)
            .join(" ")}
          style={{ transitionDelay: active || reduced ? "120ms" : "0ms" }}
        >
          We use AI to run fleet tracking at full throttle: sharper every day, surfacing risks
          the moment they appear so small issues don’t turn into lost time. That real-time
          map of what can go wrong is how we keep mission success within reach.
        </p>
        <p
          className={[
            "mt-6 max-w-3xl text-base leading-8 text-white/80",
            "transition-[opacity,transform] duration-[780ms] will-change-transform",
            active ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
            reduced && "translate-y-0 opacity-100",
          ]
            .filter(Boolean)
            .join(" ")}
          style={{ transitionDelay: active || reduced ? "200ms" : "0ms" }}
        >
          Pair that with a committed team, and the outcome is simple—stronger safety for our
          fleet, better odds on your deadlines, and the transparency you should expect from
          a national partner. In our book, that combination is the product we offer:
          performance you can see, and trust you can measure.
        </p>

        {/**
         * Orbixtrans: só com URL pública (NEXT_PUBLIC_ORBIXTRANS_URL). Link externo em novo separador
         * (noopener/noreferrer) — sem iframe nem sessão com este site; sem login FNX requerido.
         */}
        {typeof process.env.NEXT_PUBLIC_ORBIXTRANS_URL === "string" &&
        process.env.NEXT_PUBLIC_ORBIXTRANS_URL.length > 0 ? (
          <div
            className={[
              "mt-10 max-w-3xl border-t border-white/[0.1] pt-8",
              "transition-[opacity,transform] duration-[780ms] will-change-transform",
              active ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
              reduced && "translate-y-0 opacity-100",
            ]
              .filter(Boolean)
              .join(" ")}
            style={{ transitionDelay: active || reduced ? "240ms" : "0ms" }}
          >
            <a
              className="inline-flex items-center justify-center rounded-lg border border-white/25 bg-white/10 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-white/16 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40"
              href={process.env.NEXT_PUBLIC_ORBIXTRANS_URL}
              rel="noopener noreferrer"
              target="_blank"
            >
              Open Orbixtrans
            </a>
            <p className="mt-3 text-sm leading-relaxed text-white/55">
              The Orbixtrans assistant opens in a new tab on its own site. No FNX account is
              required to browse this page.
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
