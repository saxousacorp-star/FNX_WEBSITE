import Image from "next/image";
import Link from "next/link";

const headerMaxW = "max-w-[min(100%,calc(96.8rem+1cm))]";

const navLinkClass =
  "whitespace-nowrap text-[12px] font-normal tracking-tight text-[#475569] transition hover:text-[#0B1F3A] lg:text-[13px]";

const btnCtaBase =
  "whitespace-nowrap rounded-lg px-3 py-2 text-[12px] font-normal text-white shadow-sm transition sm:px-4 sm:text-[13px]";
const btnJoin = `${btnCtaBase} bg-[#0B1F3A] hover:bg-[#08162A]`;
const btnTrack = `${btnCtaBase} bg-[#0D6A52] hover:bg-[#0A5544] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0D6A52]`;

export function SiteHeader() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 bg-white/90 pt-[env(safe-area-inset-top,0px)] backdrop-blur-md">
      <div className={`mx-auto w-full min-w-0 ${headerMaxW}`}>
        <div
          className={`hidden h-[calc(4rem+1cm)] w-full min-w-0 items-center gap-2 px-4 sm:px-6 lg:grid lg:grid-cols-[1fr_minmax(0,auto)_1fr] lg:px-8 xl:px-10`}
        >
          <div className="flex min-w-0 items-center justify-start">
            <Link className="shrink-0" href="/#hero">
              <Image
                alt="FNX Logo"
                className="h-[3.3rem] w-auto max-w-none md:h-[4.2rem] lg:h-[3.12rem] xl:h-[3.36rem] [backface-visibility:hidden] [image-rendering:auto] [transform:translateZ(0)]"
                height={200}
                sizes="(max-width: 1024px) 264px, 360px"
                src="/logo1.svg"
                unoptimized
                width={600}
                priority
              />
            </Link>
          </div>

          <nav
            aria-label="Main"
            className="mx-auto flex min-w-0 max-w-full items-center justify-center gap-2.5 sm:gap-3 md:gap-3.5 lg:gap-4 xl:gap-5"
          >
            <Link className={navLinkClass} href="/#about">
              About Us
            </Link>
            <Link className={navLinkClass} href="/#fleet">
              Our Fleet
            </Link>
            <Link className={navLinkClass} href="/#services">
              Services
            </Link>
            <Link className={navLinkClass} href="/#why-fnx">
              Why FNX
            </Link>
            <Link className={navLinkClass} href="/#contact">
              Contact
            </Link>
            <Link className={navLinkClass} href="/get-a-quote">
              Get a Quote
            </Link>
          </nav>

          <div className="flex min-w-0 items-center justify-end gap-1.5 sm:gap-2">
            <Link className={btnJoin} href="/join-our-team">
              Join Our Team
            </Link>
            <Link className={btnTrack} href="/dispatch">
              Track your load
            </Link>
          </div>
        </div>

        <div className="lg:hidden">
          <div className="flex h-14 w-full min-w-0 items-center justify-between gap-2 px-4 sm:h-[calc(4rem+1cm)] sm:px-5">
            <Link className="shrink-0" href="/#hero">
              <Image
                alt="FNX Logo"
                className="h-[2.7rem] w-auto max-w-none sm:h-12 [backface-visibility:hidden] [image-rendering:auto] [transform:translateZ(0)]"
                height={200}
                sizes="(max-width: 640px) 240px, 264px"
                src="/logo1.svg"
                unoptimized
                width={600}
                priority
              />
            </Link>
            <div className="flex min-w-0 items-center justify-end gap-1.5">
              <Link className={btnJoin} href="/join-our-team">
                Join Our Team
              </Link>
              <Link className={btnTrack} href="/dispatch">
                Track your load
              </Link>
            </div>
          </div>
          <nav
            aria-label="Main"
            className="flex items-center justify-center gap-x-3 gap-y-1 overflow-x-auto bg-white/80 px-3 py-2.5 [scrollbar-width:thin] sm:gap-x-3.5"
          >
            <Link className="text-xs font-normal text-[#475569] hover:text-[#0B1F3A]" href="/#about">
              About
            </Link>
            <Link className="text-xs font-normal text-[#475569] hover:text-[#0B1F3A]" href="/#fleet">
              Fleet
            </Link>
            <Link className="text-xs font-normal text-[#475569] hover:text-[#0B1F3A]" href="/#services">
              Services
            </Link>
            <Link className="text-xs font-normal text-[#475569] hover:text-[#0B1F3A]" href="/#why-fnx">
              Why
            </Link>
            <Link className="text-xs font-normal text-[#475569] hover:text-[#0B1F3A]" href="/#contact">
              Contact
            </Link>
            <Link className="text-xs font-normal text-[#475569] hover:text-[#0B1F3A]" href="/get-a-quote">
              Quote
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
