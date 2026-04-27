"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

const MOBILE_CAROUSEL_QUERY = "(max-width: 639px)";
const CAROUSEL_AUTO_MS = 1750;

/**
 * Mesma cor sólida que o fundo da secção, para não haver franja (composição) entre
 * `transparent` e `#F5F5F7`.
 */
const FLEET_FRAME_BG = "bg-[#F5F5F7]";

/* Mesmo ritmo de grelha que `ServicesSection` (1 col. → 2 a partir de `sm`). */
const fleetDesktopGridClass =
  "m-0 hidden w-full list-none grid-cols-2 gap-[0.3cm] p-0 sm:grid";
const fleetMobileStackClass =
  "m-0 grid w-full list-none grid-cols-1 gap-[0.3cm] p-0 sm:hidden";

/**
 * `public/nsssf.svg` (Small Straight). Inclui `?v=` para forçar novo fetch; incrementa o número
 * sempre que substituíres o SVG. Há ainda `no-cache` em `next.config.ts` para o path base.
 */
const SMALL_STRAIGHT_SRC = "/nsssf.svg?v=1";

type FleetSlide = {
  label: string;
  description: string;
  imageSrc?: string;
  /**
   * Slide com imagem: `scale-down` = sem recorte e sem ampliar além do natural; fundo FLEET; gradiente; sem dim no hover.
   */
  imageCutout?: boolean;
  /**
   * Fundo do raster (PNG no SVG) foi exportado a branco: anti-alias halo sobre `#F5F5F7`.
   * `darken` funde o branco do arte com o fundo da caixa, sem piorar a maior parte do veículo.
   */
  matteToSectionBg?: boolean;
};

const SLIDES: FleetSlide[] = [
  {
    label: "Cargo Van",
    description:
      "Maximum agility for time-critical, smaller payloads. Direct, discreet, and built for rapid nationwide deployment.",
    imageSrc: "/cvsf.svg",
    imageCutout: true,
    matteToSectionBg: true,
  },
  {
    label: "Sprinter Van",
    description:
      "The industry standard for expedited freight. High speed, high volume, and relentlessly reliable coast-to-coast.",
    imageSrc: "/spvsf.svg",
    imageCutout: true,
    matteToSectionBg: true,
  },
  {
    label: "Sprinter Reefer",
    description:
      "Precision temperature control. The elite choice for high-ticket pharmaceutical, medical, and sensitive logistics.",
    imageSrc: "/spvrsf.svg",
    imageCutout: true,
  },
  {
    label: "Small Straight",
    description:
      "Heavy-duty capacity meets expedited speed. The ultimate solution for large, exclusive-use freight with zero transfers.",
    imageSrc: SMALL_STRAIGHT_SRC,
    imageCutout: true,
  },
];

function FleetSlideCell({
  description,
  imageSrc,
  imageCutout,
  inView,
  label,
  matteToSectionBg,
  reduced,
  priority,
}: {
  description: string;
  imageSrc?: string;
  imageCutout?: boolean;
  inView: boolean;
  label: string;
  matteToSectionBg?: boolean;
  reduced: boolean;
  priority?: boolean;
}) {
  const [show, setShow] = useState(false);

  const imageBox = imageSrc ? (
    <div
      className={[
        "absolute inset-0 h-full min-h-0 w-full min-w-0 overflow-hidden",
        // isolate barra mix-blend com o fundo #F5F5F7 no `<Image>`; omitir com matte
        !matteToSectionBg && "[isolation:isolate]",
        FLEET_FRAME_BG,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-hidden
    >
      <Image
        alt=""
        className={[
          "block h-full w-full min-h-0 min-w-0 [object-fit:scale-down] object-center outline-none [backface-visibility:hidden]",
          matteToSectionBg ? "[mix-blend-mode:darken]" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        fill
        priority={priority}
        quality={100}
        sizes="(max-width: 767px) 100vw, (max-width: 1280px) 50vw, 40vw"
        src={imageSrc}
        unoptimized
      />
    </div>
  ) : (
    <div
      className={["absolute inset-0", FLEET_FRAME_BG].join(" ")}
      aria-hidden
    />
  );

  if (reduced) {
    return (
      <div
        className="relative min-h-0 min-w-0 overflow-hidden border-0 ring-0"
        aria-hidden={!inView}
      >
        <div
          className={[
            "relative aspect-[2/1] w-full min-h-[14rem] overflow-hidden sm:min-h-[16rem] md:aspect-[16/9] md:min-h-[18rem]",
            FLEET_FRAME_BG,
          ].join(" ")}
        >
          {imageBox}
          <div
            className={
              imageCutout
                ? "pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0F172A]/50 via-[#0F172A]/15 to-transparent"
                : "pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0F172A]/45 to-transparent"
            }
            aria-hidden
          />
          <div className="absolute inset-0 z-20 flex flex-col justify-end p-3 sm:p-4">
            <h3 className="mb-2 text-left text-sm font-medium text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.45)] sm:text-base [font-family:var(--font-jakarta),var(--font-inter),ui-sans-serif]">
              {label}
            </h3>
            {description.trim() ? (
              <p className="m-0 max-h-[45%] overflow-y-auto text-left text-sm leading-relaxed text-white/95 sm:max-h-[50%] sm:text-[15px]">
                {description}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative min-h-0 min-w-0 overflow-hidden border-0 ring-0"
      aria-hidden={!inView}
    >
      <article
        aria-label={`${label}. ${description}`}
        className="group relative h-full w-full overflow-hidden border-0 bg-transparent shadow-none ring-0 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B1F3A]"
        inert={!inView}
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
        tabIndex={inView ? 0 : -1}
      >
        <div
          className={[
            "relative aspect-[2/1] w-full min-h-[14rem] overflow-hidden sm:min-h-[16rem] md:aspect-[16/9] md:min-h-[18rem]",
            FLEET_FRAME_BG,
          ].join(" ")}
        >
          <div
            aria-hidden
            className={
              imageCutout
                ? [
                    "absolute inset-0 z-0 overflow-hidden transition-opacity duration-300 ease-out will-change-[opacity]",
                    "md:group-hover:opacity-80 md:group-focus-within:opacity-80",
                    show ? "max-md:opacity-80" : "max-md:opacity-100",
                    !matteToSectionBg && "[isolation:isolate]",
                  ]
                    .filter(Boolean)
                    .join(" ")
                : [
                    "absolute inset-0 z-0 transition-opacity duration-300 ease-out will-change-[opacity]",
                    "md:group-hover:opacity-[0.12] md:group-focus-within:opacity-[0.12]",
                    show ? "max-md:opacity-[0.12]" : "max-md:opacity-100",
                  ].join(" ")
            }
          >
            {imageBox}
          </div>
          <div
            className={[
              "pointer-events-none absolute inset-0 z-[1] transition-opacity duration-300 ease-out",
              "bg-white/0",
              "md:opacity-0 md:group-hover:bg-white/60 md:group-hover:opacity-100",
              "md:group-focus-within:bg-white/60 md:group-focus-within:opacity-100",
              show ? "max-md:bg-white/60 max-md:opacity-100" : "max-md:opacity-0",
            ].join(" ")}
            aria-hidden
          />
          <div
            className={[
              "pointer-events-none z-[2] transition-opacity duration-300",
              imageCutout
                ? "absolute inset-0 bg-gradient-to-t from-[#0F172A]/45 via-[#0F172A]/12 to-transparent"
                : "absolute inset-0 bg-gradient-to-t from-black/30 to-transparent",
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
              {label}
            </h3>
          </div>
          {description.trim() ? (
            <div
              className={[
                "absolute inset-0 z-20 flex items-center justify-center p-3 sm:p-5",
                "pointer-events-none transition-opacity duration-300 ease-out",
                "opacity-0",
                "md:group-hover:opacity-100 md:group-focus-within:opacity-100",
                show ? "max-md:opacity-100" : "max-md:opacity-0",
              ].join(" ")}
              aria-hidden
            >
              <p className="max-h-[86%] w-full max-w-prose overflow-y-auto text-center text-sm leading-relaxed text-[#0B1220] [text-shadow:0_0_1px_rgba(255,255,255,0.8)] sm:text-[15px]">
                {description}
              </p>
            </div>
          ) : null}
        </div>
      </article>
    </div>
  );
}

export function OurFleetCarousel() {
  const reduced = usePrefersReducedMotion();
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [mobileCarousel, setMobileCarousel] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_CAROUSEL_QUERY);
    const sync = () => setMobileCarousel(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduced || !mobileCarousel) {
      return;
    }
    const tick = () => {
      if (document.visibilityState !== "visible") {
        return;
      }
      setCarouselIndex((i) => (i + 1) % SLIDES.length);
    };
    const id = window.setInterval(tick, CAROUSEL_AUTO_MS);
    return () => window.clearInterval(id);
  }, [reduced, mobileCarousel]);

  return (
    <>
      <ul className={fleetDesktopGridClass} role="list">
        {SLIDES.map((slide, i) => (
          <li className="m-0 min-w-0 border-0 p-0" key={slide.label}>
            <FleetSlideCell
              description={slide.description}
              imageCutout={slide.imageCutout}
              imageSrc={slide.imageSrc}
              inView
              label={slide.label}
              matteToSectionBg={slide.matteToSectionBg}
              priority={i < 2}
              reduced={reduced}
            />
          </li>
        ))}
      </ul>

      {reduced ? (
        <ul className={fleetMobileStackClass} role="list">
          {SLIDES.map((slide, i) => (
            <li className="m-0 min-w-0 border-0 p-0" key={`stack-${slide.label}`}>
              <FleetSlideCell
                description={slide.description}
                imageCutout={slide.imageCutout}
                imageSrc={slide.imageSrc}
                inView
                label={slide.label}
                matteToSectionBg={slide.matteToSectionBg}
                priority={i < 2}
                reduced={reduced}
              />
            </li>
          ))}
        </ul>
      ) : (
        <div
          aria-label="Our fleet carousel"
          className="sm:hidden"
          role="region"
        >
          <div className="overflow-hidden rounded-sm">
            <div
              className="flex transition-transform duration-500 ease-out motion-reduce:transition-none"
              style={{
                transform: `translate3d(-${carouselIndex * 100}%,0,0)`,
              }}
            >
              {SLIDES.map((slide, i) => (
                <div
                  className="min-w-0 shrink-0 basis-full"
                  key={slide.label}
                >
                  <FleetSlideCell
                    description={slide.description}
                    imageCutout={slide.imageCutout}
                    imageSrc={slide.imageSrc}
                    inView={i === carouselIndex}
                    label={slide.label}
                    matteToSectionBg={slide.matteToSectionBg}
                    priority={i < 2}
                    reduced={reduced}
                  />
                </div>
              ))}
            </div>
          </div>
          <div
            aria-label="Slide indicators"
            className="mt-4 flex justify-center gap-1.5"
            role="tablist"
          >
            {SLIDES.map((slide, i) => (
              <button
                aria-label={`${slide.label}, slide ${i + 1} of ${SLIDES.length}`}
                aria-selected={i === carouselIndex}
                className={[
                  "h-2 rounded-full transition-[width,background-color] duration-300",
                  i === carouselIndex
                    ? "w-6 bg-[#0B1F3A]"
                    : "w-2 bg-[#CBD5E1] hover:bg-[#94A3B8]",
                ].join(" ")}
                key={slide.label}
                onClick={() => setCarouselIndex(i)}
                role="tab"
                type="button"
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
