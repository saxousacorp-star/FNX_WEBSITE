"use client";

import type { RefObject } from "react";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import type { USStatesMapData } from "@/lib/us-states-map";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import mapData from "@/data/us-states-map.json";

const data = mapData as USStatesMapData;

const LOGO_BLUE = "#0B1F3A";
const STATE_BASE = "#C8CDD3";
const STATE_STROKE = "#F8FAFC";

type RegionName = keyof USStatesMapData["regions"];

const REGION_ORDER: [RegionName, { x: number; y: number }][] = Object.entries(
  data.regions,
) as [RegionName, { x: number; y: number }][];

const LINE_BASE_MS = Math.round(720 * 1.1);
const STAGGER_BASE_MS = Math.round(110 * 1.1);
const SLOWER = 1.55;
const LINE_MS = Math.round(LINE_BASE_MS * SLOWER);
const STAGGER_MS = Math.round(STAGGER_BASE_MS * SLOWER);
const OPACITY_CIRCLE_MS = Math.round(420 * 1.1);
const OPACITY_LABEL_MS = Math.round(500 * 1.1);

const { hub } = data;

function easeOutCubic(t: number) {
  const c = 1 - t;
  return 1 - c * c * c;
}

function labelAnchor(
  a: { x: number; y: number },
  b: { x: number; y: number },
) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  return { x: b.x + ux * 32, y: b.y + uy * 28 };
}

function lineLength(
  a: { x: number; y: number },
  b: { x: number; y: number },
) {
  return Math.hypot(b.x - a.x, b.y - a.y);
}

function applyLineDash(
  line: SVGLineElement,
  totalLen: number,
  visibleFraction: number,
) {
  const L = totalLen;
  if (L <= 0) {
    return;
  }
  const offset = L * (1 - Math.max(0, Math.min(1, visibleFraction)));
  const d = `${L} ${L}`;
  line.setAttribute("stroke-dasharray", d);
  line.setAttribute("stroke-dashoffset", String(offset));
  line.style.strokeDasharray = d;
  line.style.strokeDashoffset = String(offset);
}

function finalizeLinesSolid(lines: SVGLineElement[]) {
  for (const line of lines) {
    line.removeAttribute("stroke-dasharray");
    line.removeAttribute("stroke-dashoffset");
    line.style.removeProperty("stroke-dasharray");
    line.style.removeProperty("stroke-dashoffset");
  }
}

function isElementInViewport(el: Element) {
  const r = el.getBoundingClientRect();
  const h = typeof window === "undefined" ? 0 : window.innerHeight;
  const w = typeof window === "undefined" ? 0 : window.innerWidth;
  return r.bottom > 0 && r.right > 0 && r.top < h && r.left < w;
}

type ServiceAreasMapProps = {
  observeTargetRef?: RefObject<HTMLElement | null>;
};

export function ServiceAreasMap({ observeTargetRef }: ServiceAreasMapProps) {
  const { viewBox, states } = data;

  const [inView, setInView] = useState(false);
  const [lineLayerId, setLineLayerId] = useState(0);
  const reducedMotion = usePrefersReducedMotion();
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const linesGRef = useRef<SVGGElement | null>(null);
  const lineRafRef = useRef(0);
  const gAttachedRef = useRef(false);

  const setLineGroupRef = useCallback(
    (node: SVGGElement | null) => {
      linesGRef.current = node;
      if (node) {
        if (!gAttachedRef.current) {
          gAttachedRef.current = true;
          setLineLayerId((n) => n + 1);
        }
      } else {
        gAttachedRef.current = false;
      }
    },
    [],
  );

  /* Visibility: contêiner do mapa, secção opcional, scroll/resize (fallback se IO não disparar). */
  useLayoutEffect(() => {
    const targets: Element[] = [];
    if (wrapRef.current) {
      targets.push(wrapRef.current);
    }
    const section = observeTargetRef?.current;
    if (section) {
      targets.push(section);
    }
    if (targets.length === 0) {
      return;
    }

    const onScrollOrResize = () => {
      for (const t of targets) {
        if (isElementInViewport(t)) {
          setInView(true);
          return;
        }
      }
    };

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true);
            return;
          }
        }
      },
      { root: null, rootMargin: "0px 0px 8% 0px", threshold: 0 },
    );

    for (const t of targets) {
      obs.observe(t);
    }
    for (const e of obs.takeRecords()) {
      if (e.isIntersecting) {
        queueMicrotask(() => {
          setInView(true);
        });
        break;
      }
    }

    onScrollOrResize();

    // IO/takeRecords + 1º layout podem atrasar; rects estáveis após 1–2 frames.
    let ivRaf0 = 0;
    let ivRaf1 = 0;
    ivRaf0 = requestAnimationFrame(() => {
      onScrollOrResize();
      ivRaf1 = requestAnimationFrame(() => onScrollOrResize());
    });

    const wrap = wrapRef.current;
    const ro = wrap
      ? new ResizeObserver(() => onScrollOrResize())
      : null;
    if (wrap && ro) {
      ro.observe(wrap);
    }

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });

    return () => {
      cancelAnimationFrame(ivRaf0);
      cancelAnimationFrame(ivRaf1);
      ro?.disconnect();
      obs.disconnect();
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [observeTargetRef]);

  useLayoutEffect(() => {
    cancelAnimationFrame(lineRafRef.current);
    lineRafRef.current = 0;

    const g = linesGRef.current;
    if (!g) {
      return;
    }
    const lines = [...g.querySelectorAll<SVGLineElement>("line")];
    if (lines.length === 0) {
      return;
    }

    const lens = lines.map((line, i) => {
      const gl = line.getTotalLength();
      return gl > 0
        ? gl
        : lineLength(hub, REGION_ORDER[i]![1]);
    });

    if (reducedMotion) {
      finalizeLinesSolid(lines);
      return;
    }

    if (!inView) {
      for (const [i, line] of lines.entries()) {
        const L = lens[i]!;
        if (L > 0) {
          applyLineDash(line, L, 0);
        }
      }
      return;
    }

    for (const [i, line] of lines.entries()) {
      const L = lens[i]!;
      if (L > 0) {
        applyLineDash(line, L, 0);
      }
    }

    const t0 = performance.now();

    const tick = (now: number) => {
      const elapsed = now - t0;
      let anyRunning = false;
      for (const [i, line] of lines.entries()) {
        const L = lens[i]!;
        if (L <= 0) {
          continue;
        }
        const startI = i * STAGGER_MS;
        if (elapsed < startI) {
          applyLineDash(line, L, 0);
          anyRunning = true;
          continue;
        }
        const u = (elapsed - startI) / LINE_MS;
        if (u < 1) {
          applyLineDash(line, L, easeOutCubic(u));
          anyRunning = true;
        } else {
          applyLineDash(line, L, 1);
        }
      }
      if (anyRunning) {
        lineRafRef.current = requestAnimationFrame(tick);
      } else {
        finalizeLinesSolid(lines);
      }
    };

    lineRafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(lineRafRef.current);
      lineRafRef.current = 0;
    };
  }, [inView, reducedMotion, lineLayerId]);

  const showRegionGraphics = reducedMotion || inView;

  return (
    <div
      className="w-full"
      id="service-areas-map-wrap"
      ref={wrapRef}
    >
      <svg
        aria-hidden
        className="h-auto w-full [aspect-ratio:975/610] min-h-0"
        preserveAspectRatio="xMidYMid meet"
        role="presentation"
        viewBox={viewBox}
      >
        {Object.entries(states).map(([abbr, d]) => {
          if (abbr === "NC") {
            return null;
          }
          return (
            <path
              d={d}
              fill={STATE_BASE}
              key={abbr}
              stroke={STATE_STROKE}
              strokeWidth={0.75}
              vectorEffect="non-scaling-stroke"
            />
          );
        })}

        {states.NC ? (
          <path
            d={states.NC}
            fill={LOGO_BLUE}
            stroke={STATE_STROKE}
            strokeWidth={0.9}
          />
        ) : null}

        <g ref={setLineGroupRef}>
          {REGION_ORDER.map(([name, end]) => {
            return (
              <line
                key={name}
                stroke="white"
                strokeLinecap="round"
                strokeWidth={2.8}
                vectorEffect="non-scaling-stroke"
                x1={hub.x}
                x2={end.x}
                y1={hub.y}
                y2={end.y}
              />
            );
          })}
        </g>

        {REGION_ORDER.map(([name, end], index) => {
          const lineDoneMs = index * STAGGER_MS + LINE_MS;
          const circleDelay = Math.max(0, lineDoneMs - 90);
          return (
            <circle
              cx={end.x}
              cy={end.y}
              fill="white"
              key={`e-${name}`}
              r={3.2}
              style={{
                opacity: showRegionGraphics ? 1 : 0,
                transition:
                  reducedMotion || !showRegionGraphics
                    ? "none"
                    : `opacity ${OPACITY_CIRCLE_MS}ms ease-out ${circleDelay}ms`,
              }}
            />
          );
        })}

        <circle
          cx={hub.x}
          cy={hub.y}
          fill="white"
          r={5.5}
          stroke={LOGO_BLUE}
          strokeWidth={1.2}
        />

        {REGION_ORDER.map(([name, end], index) => {
          const p = labelAnchor(hub, end);
          const w = Math.max(76, 7.1 * name.length);
          const lineDoneMs = index * STAGGER_MS + LINE_MS;
          const labelDelay = lineDoneMs - 20;
          return (
            <g
              key={name}
              style={{
                opacity: showRegionGraphics ? 1 : 0,
                transition:
                  reducedMotion || !showRegionGraphics
                    ? "none"
                    : `opacity ${OPACITY_LABEL_MS}ms ease-out ${labelDelay}ms`,
              }}
            >
              <rect
                fill={LOGO_BLUE}
                height={22}
                rx={4}
                width={w}
                x={p.x - w / 2}
                y={p.y - 11}
              />
              <text
                className="select-none [font-family:var(--font-jakarta),var(--font-inter),ui-sans-serif]"
                dominantBaseline="middle"
                fill="white"
                fontSize={11.5}
                fontWeight={600}
                textAnchor="middle"
                x={p.x}
                y={p.y}
              >
                {name}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
