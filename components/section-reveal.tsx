"use client";

import { useEffect, useRef } from "react";
import type { HTMLAttributes } from "react";

type SectionRevealProps = HTMLAttributes<HTMLElement> & {
  children: React.ReactNode;
  delayMs?: number;
};

export default function SectionReveal({
  children,
  className,
  delayMs = 0,
  ...rest
}: SectionRevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    element.style.setProperty("--reveal-delay", `${delayMs}ms`);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("section-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [delayMs]);

  return (
    <section
      ref={ref}
      className={`section-reveal ${className ?? ""}`.trim()}
      {...rest}
    >
      {children}
    </section>
  );
}
