"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

type Service = {
  title: string;
  description: string;
  /** Tailwind background classes; used when `imageSrc` is not set. */
  photo: string;
  imageSrc?: string;
  /** Optional classes for photo framing (e.g. `object-left` for subject on one side). */
  imageClassName?: string;
  /** Optional `sizes` for next/image when the card width differs (e.g. full-width row). */
  imageSizes?: string;
  /** Bypass next/image optimizer (use when replacing `public/` photos and the old one still appears). */
  imageUnoptimized?: boolean;
};

const SERVICES: Service[] = [
  {
    title: "Last Mile",
    description:
      "Final-leg delivery with tight coordination, professional handling, and " +
      "dependable arrival windows for time-sensitive and retail-sensitive freight.",
    photo: "bg-gradient-to-br from-[#94A3B8] to-[#CBD5E1]",
    imageSrc: "/services-last-mile.png",
    imageClassName: "object-[50%_48%] sm:object-[50%_45%]",
  },
  {
    title: "Aircraft on the Ground (AOG)",
    description:
      "AOG support built for high-priority parts movement with urgent dispatch and " +
      "disciplined communication until parts are in place.",
    photo: "bg-gradient-to-br from-[#A8B3BE] to-[#E2E8F0]",
    imageSrc: "/services-aog.png",
  },
  {
    title: "Expedited",
    description:
      "Time-critical freight support with rapid dispatch and disciplined routing.",
    photo: "bg-gradient-to-br from-[#64748B] to-[#94A3B8]",
    imageSrc: "/services-expedited.jpg",
    imageClassName: "object-[58%_46%] sm:object-[52%_44%] md:object-center",
  },
  {
    title: "White Gloves Freight",
    description:
      "Premium, high-touch service for sensitive, high-value, and specialized freight " +
      "that demands extra care and close coordination.",
    photo: "bg-gradient-to-br from-[#787F87] to-[#CBD5E1]",
    imageSrc: "/services-white-glove.png",
    imageClassName: "object-[35%_50%] sm:object-[32%_50%]",
  },
  {
    title: "High-Value Freight",
    description:
      "Dedicated handling and visibility for high-value loads—security-minded planning, " +
      "tight handoffs, and account-level coordination from pickup through delivery.",
    photo: "bg-gradient-to-br from-[#64748B] to-[#475569]",
    imageSrc: "/services-high-value.jpg",
    imageClassName: "object-[48%_46%] sm:object-center",
  },
  {
    title: "Health Care & Medical",
    description:
      "Temperature- and time-sensitive support for health care and medical supply chains, " +
      "with clear chain-of-custody expectations and responsive dispatch when minutes matter.",
    photo: "bg-gradient-to-br from-[#94A3B8] to-[#64748B]",
    imageSrc: "/services-health-care.png",
  },
  {
    title: "Trade show",
    description:
      "Show-floor logistics: marshalling, on-site delivery windows, and equipment moves " +
      "built around your event schedule, venue rules, and teardown timelines.",
    photo: "bg-gradient-to-br from-[#A8A3A3] to-[#E2E8F0]",
    imageSrc: "/trade-show-convention.jpg",
    imageClassName: "object-[50%_48%] sm:object-center",
    imageSizes: "(max-width: 640px) 100vw, (max-width: 1280px) 100vw, min(1600px, 96vw)",
    imageUnoptimized: true,
  },
];

/* 0.3cm between cards */
const gridClass =
  "mt-10 grid w-full grid-cols-1 gap-[0.3cm] sm:mt-12 sm:grid-cols-2 [&>article:nth-child(7)]:sm:col-span-2";

function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3;
}

const serviceImageSizes =
  "(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw";

/** Higher than default 75 for photography in service cards. */
const SERVICE_PHOTO_QUALITY = 92;

function ServiceBox({
  title,
  description,
  photo,
  imageSrc,
  imageClassName,
  imageSizes,
  imageUnoptimized,
  reduced,
}: {
  title: string;
  description: string;
  photo: string;
  imageSrc?: string;
  imageClassName?: string;
  imageSizes?: string;
  imageUnoptimized?: boolean;
  reduced: boolean;
}) {
  const [show, setShow] = useState(false);
  const sizes = imageSizes ?? serviceImageSizes;
  const cardClass =
    "group relative w-full min-h-[26rem] overflow-hidden border-0 bg-transparent shadow-none ring-0 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B1F3A] sm:min-h-[28rem] lg:min-h-[32rem] rounded-sm";

  if (reduced) {
    return (
      <article
        aria-label={`${title}. ${description}`}
        className={cardClass}
      >
        <div className="relative h-full min-h-[26rem] w-full sm:min-h-[28rem] lg:min-h-[32rem]">
          {imageSrc ? (
            <div className="absolute inset-0 h-full min-h-full w-full min-w-0" aria-hidden>
              <Image
                alt=""
                className={["h-full w-full object-cover", imageClassName]
                  .filter(Boolean)
                  .join(" ")}
                fill
                quality={imageUnoptimized ? undefined : SERVICE_PHOTO_QUALITY}
                sizes={sizes}
                src={imageSrc}
                unoptimized={imageUnoptimized === true}
              />
            </div>
          ) : (
            <div aria-hidden className={`absolute inset-0 ${photo}`} />
          )}
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0F172A]/45 to-transparent"
            aria-hidden
          />
          <div className="absolute inset-0 z-20 flex flex-col justify-end p-3 sm:p-4">
            <h3 className="mb-2 text-left text-sm font-medium text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.45)] sm:text-base [font-family:var(--font-jakarta),var(--font-inter),ui-sans-serif]">
              {title}
            </h3>
            <p className="m-0 max-h-[45%] overflow-y-auto text-left text-sm leading-relaxed text-white/95 sm:max-h-[50%] sm:text-[15px]">
              {description}
            </p>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      aria-label={`${title}. ${description}`}
      className={cardClass}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setShow(false);
        }
      }}
      onClick={() => {
        if (window.matchMedia("(max-width: 767px)").matches) {
          setShow((s) => !s);
        }
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          if (window.matchMedia("(max-width: 767px)").matches) {
            setShow((s) => !s);
          }
        }
      }}
      tabIndex={0}
    >
      <div className="relative h-full min-h-[inherit] w-full">
        <div
          aria-hidden
          className={[
            "absolute inset-0 z-0 transition-opacity duration-300 ease-out will-change-[opacity]",
            "md:group-hover:opacity-[0.15] md:group-focus-within:opacity-[0.15]",
            show ? "max-md:opacity-[0.15]" : "max-md:opacity-100",
          ].join(" ")}
        >
          {imageSrc ? (
            <div className="absolute inset-0 h-full min-h-full w-full min-w-0">
              <Image
                alt=""
                className={["h-full w-full object-cover", imageClassName]
                  .filter(Boolean)
                  .join(" ")}
                fill
                quality={imageUnoptimized ? undefined : SERVICE_PHOTO_QUALITY}
                sizes={sizes}
                src={imageSrc}
                unoptimized={imageUnoptimized === true}
              />
            </div>
          ) : (
            <div className={`absolute inset-0 ${photo}`} />
          )}
        </div>
        <div
          className={[
            "pointer-events-none absolute inset-0 z-[1] transition-opacity duration-300 ease-out",
            "bg-white/0",
            "md:opacity-0 md:group-hover:bg-white/50 md:group-hover:opacity-100",
            "md:group-focus-within:bg-white/50 md:group-focus-within:opacity-100",
            show ? "max-md:bg-white/50 max-md:opacity-100" : "max-md:opacity-0",
          ].join(" ")}
          aria-hidden
        />
        <div
          className={[
            "pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-black/30 to-transparent",
            "transition-opacity duration-300",
            "md:opacity-100 md:group-hover:opacity-0",
            show ? "max-md:opacity-0" : "max-md:opacity-100",
          ].join(" ")}
          aria-hidden
        />
        <div
          aria-hidden
          className={[
            "absolute bottom-0 left-0 right-0 z-10 px-3 pb-3 pt-6 transition-opacity duration-300 sm:px-4 sm:pb-4",
            "md:group-hover:opacity-0 md:group-focus-within:opacity-0",
            show ? "max-md:opacity-0" : "max-md:opacity-100",
          ].join(" ")}
        >
          <h3 className="text-left text-sm font-medium leading-tight text-white [text-shadow:0_1px_10px_rgba(0,0,0,0.55)] sm:text-base [font-family:var(--font-jakarta),var(--font-inter),ui-sans-serif]">
            {title}
          </h3>
        </div>
        <div
          aria-hidden
          className={[
            "absolute inset-0 z-20 flex items-center justify-center p-3 sm:p-5",
            "pointer-events-none transition-opacity duration-300 ease-out",
            "opacity-0",
            "md:group-hover:opacity-100 md:group-focus-within:opacity-100",
            show ? "max-md:opacity-100" : "max-md:opacity-0",
          ].join(" ")}
        >
          <p className="max-h-[86%] w-full max-w-prose overflow-y-auto text-center text-sm leading-relaxed text-[#0B1220] [text-shadow:0_0_1px_rgba(255,255,255,0.8)] sm:text-[15px]">
            {description}
          </p>
        </div>
      </div>
    </article>
  );
}

export function ServicesSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  const updateScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) {
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.transform = "translate3d(0,0,0)";
      return;
    }

    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;
    const bandStart = vh * 0.93;
    const bandEnd = vh * 0.24;
    let p: number;
    if (rect.top >= bandStart) {
      p = 0;
    } else if (rect.top <= bandEnd) {
      p = 1;
    } else {
      p = (bandStart - rect.top) / (bandStart - bandEnd);
      p = Math.min(1, Math.max(0, p));
      p = easeOutCubic(p);
    }

    const maxPx =
      window.innerWidth < 640
        ? 24
        : window.innerWidth < 1280
          ? 32
          : 40;
    const x = (1 - p) * maxPx;
    el.style.transform = `translate3d(${x}px,0,0)`;
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) {
      return;
    }

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(updateScroll);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onM = () => onScroll();
    mq.addEventListener("change", onM);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      mq.removeEventListener("change", onM);
    };
  }, [updateScroll]);

  return (
    <section
      className="bg-[#F5F5F7] py-[120px] scroll-mt-28 lg:scroll-mt-20"
      id="services"
    >
      <div className="w-full max-w-full px-[0.3cm]">
        <h2 className="type-title-section">Services</h2>
        <p className="mt-4 max-w-3xl text-base leading-8 text-[#475569]">
          Professional freight modes built for enterprise and time-critical moves.
        </p>
        <div
          className="mt-0 overflow-x-clip will-change-transform"
          ref={trackRef}
        >
          <div className={gridClass}>
            {SERVICES.map((item) => (
              <ServiceBox
                description={item.description}
                imageClassName={item.imageClassName}
                imageSizes={item.imageSizes}
                imageSrc={item.imageSrc}
                imageUnoptimized={item.imageUnoptimized}
                key={item.title}
                photo={item.photo}
                reduced={reduced}
                title={item.title}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
