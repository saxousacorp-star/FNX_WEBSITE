"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * Seta flutuante (bottom-left) visível quando o rodapé entra no viewport.
 * Só relevante em páginas com #contact (ex.: home).
 */
export function FooterHeroArrow() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const footer = document.getElementById("contact");
    if (!footer) {
      return;
    }

    const ob = new IntersectionObserver(
      (entries) => {
        setVisible(Boolean(entries[0]?.isIntersecting));
      },
      { root: null, rootMargin: "0px", threshold: 0 },
    );
    ob.observe(footer);
    return () => {
      ob.disconnect();
    };
  }, []);

  return (
    <Link
      aria-hidden={!visible}
      aria-label="Back to top of page"
      className={[
        "fixed z-40 inline-flex rounded-full border border-[#E2E8F0]/90 bg-white/90 p-2.5 text-[#94A3B8] shadow-[0_1px_2px_rgba(15,23,42,0.06)] backdrop-blur-sm",
        "transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none",
        "bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-[max(1.25rem,env(safe-area-inset-left))]",
        "hover:-translate-y-0.5 hover:text-[#0B1F3A] focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B1F3A]/25",
        visible
          ? "translate-y-0 pointer-events-auto opacity-100"
          : "pointer-events-none translate-y-2 opacity-0",
      ].join(" ")}
      href="/#hero"
      tabIndex={visible ? 0 : -1}
    >
      <svg
        className="h-5 w-5 shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        aria-hidden
      >
        <path d="M6 15l6-6 6 6" />
      </svg>
    </Link>
  );
}
