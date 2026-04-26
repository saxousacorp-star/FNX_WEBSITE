"use client";

import { useRef } from "react";
import { ServiceAreasMap } from "@/components/service-areas-map";

function IconServiceAreas() {
  return (
    <svg
      className="h-7 w-7 shrink-0 text-[#0B1F3A] md:h-8 md:w-8"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M9 3.75H15M12 2.25V6M4.5 7.5h15M6 7.5v12a1.5 1.5 0 001.5 1.5h9a1.5 1.5 0 001.5-1.5v-12M9 10.5v6M15 10.5v6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.6}
      />
    </svg>
  );
}

export function ServiceAreasSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="service-areas-title"
      className="bg-[#F5F5F7] py-20 scroll-mt-28 md:py-28 lg:scroll-mt-20"
      id="service-areas"
    >
      <div className="mx-auto w-full max-w-7xl px-6 md:px-12">
        <div className="text-center">
          <h2
            className="type-service-areas inline-flex items-center justify-center gap-2.5 md:gap-3"
            id="service-areas-title"
          >
            <IconServiceAreas />
            Service Areas
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-[#475569] md:text-lg">
            Headquartered in{" "}
            <span className="font-semibold text-[#0F172A]">Charlotte, North Carolina</span>
            . We run nationwide lanes from the East Coast to the West, the Midwest, and
            the Southeast—with one coordinated network.
          </p>
        </div>
      </div>

      <div className="mt-12 w-full md:mt-14">
        <ServiceAreasMap observeTargetRef={sectionRef} />
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 md:px-12">
        <p className="mt-6 text-center text-sm font-medium text-[#64748B]">
          North Carolina home base — nationwide service
        </p>
      </div>
    </section>
  );
}
