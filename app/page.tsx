import Image from "next/image";
import Link from "next/link";
import { OurFleetCarousel } from "@/components/fleet-carousel";
import { FooterHeroArrow } from "@/components/footer-hero-arrow";
import { HeroBackgroundVideo } from "@/components/hero-background-video";
import { HeroSocialRail } from "@/components/hero-social-rail";
import { OwnerSectionVideo } from "@/components/owner-section-video";
import { AboutSection } from "@/components/about-section";
import { ScrollSweepDivider } from "@/components/scroll-sweep-divider";
import { ServiceAreasSection } from "@/components/service-areas-section";
import { ServicesSection } from "@/components/services-section";
import { SiteCredits } from "@/components/site-credits";
import { SiteHeader } from "@/components/site-header";
import { TestimonialsSection } from "@/components/testimonials-section";
import { SmartAiFastSection } from "@/components/smartai-fast-section";
import { WhyFnxSection } from "@/components/why-fnx-section";

const contactIconClass =
  "mt-0.5 h-5 w-5 shrink-0 text-[#0B1F3A]";

/** Produção: URL pública (ex. Vercel Blob) se `owner.mp4` não estiver no repo. Local: `/owner.mp4`. */
const ownerSectionVideoSrc =
  process.env.NEXT_PUBLIC_OWNER_VIDEO_URL?.trim() || "/owner.mp4";

function IconLocation() {
  return (
    <svg
      className={contactIconClass}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
      />
    </svg>
  );
}

function IconMail() {
  return (
    <svg
      className={contactIconClass}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.75 6.75v10.5a1.5 1.5 0 01-1.5 1.5H3.75a1.5 1.5 0 01-1.5-1.5V6.75m19.5 0A1.5 1.5 0 0019.5 5.25h-15A1.5 1.5 0 002.25 6.75m19.5 0v.243a1.5 1.5 0 01-.6 1.2l-7.2 5.4a1.5 1.5 0 01-1.8 0l-7.2-5.4a1.5 1.5 0 01-.6-1.2V6.75"
      />
    </svg>
  );
}

function IconPhone() {
  return (
    <svg
      className={contactIconClass}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
      />
    </svg>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen min-h-[var(--fnx-viewport-min-height)] scroll-smooth bg-[#F5F5F7] pt-[calc(6rem+1cm+env(safe-area-inset-top,0px))] text-[#1F2933] lg:pt-[calc(3.5rem+1cm+env(safe-area-inset-top,0px))] [scroll-padding-top:calc(5.5rem+env(safe-area-inset-top,0px))]">
      <SiteHeader />

      <section
        id="hero"
        className="relative min-h-[var(--fnx-hero-section-min)] overflow-hidden max-sm:min-h-[var(--fnx-hero-section-min-mobile)]"
      >
        <HeroBackgroundVideo />
        <div
          className="absolute inset-0 z-0 hidden bg-[#C8D0D8] bg-cover bg-center motion-reduce:block"
          aria-hidden
        />
        <div
          className="absolute inset-0 z-[1] bg-gradient-to-r from-white via-white/88 to-white/20 max-sm:from-white max-sm:via-white/92 max-sm:to-white/35"
          aria-hidden
        />
        <HeroSocialRail />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-20 pt-8 sm:px-6 sm:pt-16 lg:px-10 max-sm:pb-28 sm:pb-20 lg:pb-24 lg:pt-20">
          <div className="max-w-2xl translate-x-0 text-left sm:-translate-x-[2cm]">
            <h1 className="type-hero">
              Drive Forward. Deliver Right. Every Time.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-[#334155] sm:text-lg">
              We handle your most important expedited deliveries with extreme care. Secure,
              direct capacity across the nation so you can focus on what matters most.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Link
                className="inline-flex items-center justify-center rounded-lg bg-[#0B1F3A] px-8 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#08162A]"
                href="/get-a-quote"
              >
                Get a Quote
              </Link>
              <Link
                className="inline-flex items-center justify-center rounded-lg border-2 border-[#0B1F3A] bg-white px-8 py-3.5 text-sm font-semibold text-[#0B1F3A] transition hover:bg-[#F8FAFC]"
                href="/join-our-team"
              >
                Become an Owner Operator
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="overflow-x-clip bg-[#F5F5F7] py-[120px] scroll-mt-28 lg:scroll-mt-20">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-8 lg:px-10">
          <AboutSection />
        </div>

        <div
          className="mt-20 bg-[#F5F5F7] scroll-mt-28 lg:scroll-mt-20"
          id="fleet"
        >
          <div className="mx-auto w-full max-w-full px-[0.3cm] pb-20 pt-16">
            <div className="max-w-4xl">
              <p className="type-fleet-eyebrow">Our Fleet</p>
              <h2 className="type-title-section-lg mt-3 sm:mt-4">
                Engineered for the Urgent.
              </h2>
              <p className="mt-4 max-w-4xl text-lg leading-relaxed text-[#475569] md:text-xl">
                From agile vans to heavy-duty straights. Our diverse fleet guarantees the
                exact capacity brokers demand and the premium freight owner-operators
                deserve.
              </p>
            </div>
            <div
              aria-label="Our fleet"
              className="mt-10 w-full sm:mt-12 md:mt-14"
              role="region"
            >
              <OurFleetCarousel />
            </div>
          </div>
        </div>
      </section>

      <ServiceAreasSection />

      <ServicesSection />

      <SmartAiFastSection />

      <WhyFnxSection />

      <TestimonialsSection />

      <section
        className="scroll-mt-28 bg-[#F5F5F7] pb-[120px] pt-0 lg:scroll-mt-20"
        id="owners"
      >
        <ScrollSweepDivider />
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-6 pt-[120px] md:max-w-none md:grid-cols-2 md:items-stretch md:gap-0 md:px-0">
          <div className="z-0 min-w-0 md:pl-[0.5cm]">
            <div className="relative min-h-0 w-full min-h-[220px] overflow-hidden bg-[#F5F5F7] aspect-[4/3] sm:aspect-[3/2] md:aspect-auto md:h-full">
              <OwnerSectionVideo videoSrc={ownerSectionVideoSrc} />
            </div>
          </div>
          <div className="relative z-[1] min-w-0 bg-[#F5F5F7] before:pointer-events-none before:absolute before:-left-3 before:top-0 before:z-0 before:hidden before:h-full before:w-3 before:bg-gradient-to-r before:from-[#F5F5F7]/0 before:to-[#F5F5F7] before:md:block md:pr-12">
            <p className="type-eyebrow-muted">Owner-Operator Portal</p>
            <h2 className="type-owners-hero mt-4 sm:mt-5">
              Built for Professional Owner Operators
            </h2>
            <p className="mt-6 text-lg leading-8 text-[#475569]">
              Join a network that values communication, consistency, and dependable
              lane opportunities nationwide.
            </p>
            <ul className="mt-8 grid list-none grid-cols-1 gap-[0.3cm] sm:grid-cols-2">
              <li className="rounded-2xl bg-black/[0.025] px-4 py-3.5">
                <p className="text-sm font-semibold text-[#0F172A]">No forced freight</p>
                <p className="mt-1.5 text-sm leading-relaxed text-[#64748B]">
                  You choose the loads you run—no pressure into lanes that do not fit your
                  business.
                </p>
              </li>
              <li className="rounded-2xl bg-black/[0.025] px-4 py-3.5">
                <p className="text-sm font-semibold text-[#0F172A]">Lanes we know</p>
                <p className="mt-1.5 text-sm leading-relaxed text-[#64748B]">
                  Predictable miles on routes we understand, so you are not guessing your
                  next week.
                </p>
              </li>
              <li className="rounded-2xl bg-black/[0.025] px-4 py-3.5">
                <p className="text-sm font-semibold text-[#0F172A]">Stronger earning potential</p>
                <p className="mt-1.5 text-sm leading-relaxed text-[#64748B]">
                  Room to build better revenue and grow what you take home, mile by mile.
                </p>
              </li>
              <li className="rounded-2xl bg-black/[0.025] px-4 py-3.5">
                <p className="text-sm font-semibold text-[#0F172A]">You own the business</p>
                <p className="mt-1.5 text-sm leading-relaxed text-[#64748B]">
                  Your truck, your brand, your call—we back independent owners, we do not
                  replace them.
                </p>
              </li>
            </ul>
            <div className="mt-[0.3cm] w-full">
              <Link
                className="flex w-full items-center justify-center rounded-lg bg-[#0B1F3A] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#08162A]"
                href="/join-our-team"
              >
                Join our team
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer id="contact" className="bg-[#F5F5F7] py-14 sm:py-16 md:py-24">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 md:px-12">
          <div className="grid w-full grid-cols-1 gap-12 sm:gap-14 lg:grid-cols-2 lg:items-start lg:gap-x-16 lg:gap-y-0 xl:gap-x-24">
            {/* Logo + contactos: mesma grelha, alinhamento à esquerda; no mobile bloco centrado com largura máx. igual */}
            <div className="flex w-full min-w-0 flex-col items-center gap-10 text-center sm:items-start sm:text-left lg:max-w-md">
              <div className="flex w-full justify-center sm:justify-start">
                <Image
                  alt="FNX Logo"
                  className="h-28 w-auto max-w-[min(100%,20rem)] shrink-0 sm:h-32 md:h-36 [backface-visibility:hidden] [image-rendering:auto] [transform:translateZ(0)]"
                  height={200}
                  sizes="(max-width: 640px) 280px, 400px"
                  src="/logo1.svg"
                  unoptimized
                  width={600}
                />
              </div>
              <address className="not-italic">
                <ul className="mx-auto flex w-full max-w-sm flex-col gap-4 text-sm leading-7 text-[#334155] sm:mx-0 sm:max-w-none">
                  <li className="flex items-start justify-center gap-3 sm:justify-start">
                    <IconLocation />
                    <span>Charlotte, North Carolina, USA</span>
                  </li>
                  <li className="flex items-start justify-center gap-3 sm:justify-start">
                    <IconMail />
                    <a
                      className="transition hover:text-[#0F172A] hover:underline"
                      href="mailto:ops@fnxtransportation.com"
                    >
                      ops@fnxtransportation.com
                    </a>
                  </li>
                  <li className="flex items-start justify-center gap-3 sm:justify-start">
                    <IconPhone />
                    <a
                      className="transition hover:text-[#0F172A] hover:underline"
                      href="tel:+19804723916"
                    >
                      +1 (980) 472-3916
                    </a>
                  </li>
                </ul>
              </address>
            </div>

            <div className="flex w-full min-w-0 flex-col items-center gap-10 text-center sm:items-start sm:gap-12 sm:text-left lg:max-w-md lg:justify-self-end lg:pl-0 xl:pl-8">
              <div className="w-full max-w-sm sm:max-w-none">
                <p className="type-footer-label">Company</p>
                <ul className="mt-4 space-y-2.5 text-sm leading-6 text-[#334155]">
                  <li>
                    <a className="transition hover:text-[#0F172A] hover:underline" href="#services">
                      Services
                    </a>
                  </li>
                  <li>
                    <a className="transition hover:text-[#0F172A] hover:underline" href="#why-fnx">
                      Why us
                    </a>
                  </li>
                  <li>
                    <a className="transition hover:text-[#0F172A] hover:underline" href="#contact">
                      Contacts
                    </a>
                  </li>
                  <li>
                    <a
                      className="transition hover:text-[#0F172A] hover:underline"
                      href="/get-a-quote"
                    >
                      Get a quote
                    </a>
                  </li>
                </ul>
              </div>
              <div className="flex w-full max-w-sm flex-col gap-8 sm:max-w-none">
                <div>
                  <p className="type-footer-label">Job apply</p>
                  <ul className="mt-4 space-y-2.5 text-sm text-[#334155]">
                    <li>
                      <Link
                        className="transition hover:text-[#0F172A] hover:underline"
                        href="/join-our-team"
                      >
                        Join our team
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="type-footer-label">Terms</p>
                  <ul className="mt-4 space-y-2.5 text-sm text-[#334155]">
                    <li>
                      <a className="transition hover:text-[#0F172A] hover:underline" href="#">
                        Privacy Policy
                      </a>
                    </li>
                    <li>
                      <a className="transition hover:text-[#0F172A] hover:underline" href="#">
                        Terms And Conditions
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <SiteCredits className="mx-auto mt-12 w-full max-w-7xl border-t border-slate-200/80 px-5 pt-8 sm:mt-14 sm:px-6 md:mt-20 md:px-12 md:pt-10" />
      </footer>

      <FooterHeroArrow />
    </main>
  );
}
