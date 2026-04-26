import Link from "next/link";

const linkClass =
  "group mb-6 inline-flex items-center justify-center text-[#0B1F3A] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B1F3A]";

type PageBackLinkProps = {
  href?: string;
  /** Screen reader label (no visible text). */
  "aria-label"?: string;
};

export function PageBackLink({
  href = "/",
  "aria-label": ariaLabel = "Back to home",
}: PageBackLinkProps) {
  return (
    <Link aria-label={ariaLabel} className={linkClass} href={href}>
      <span
        className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#E2E8F0] bg-white text-[#0B1F3A] shadow-sm transition group-hover:border-[#CBD5E1]"
      >
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
      </span>
    </Link>
  );
}
