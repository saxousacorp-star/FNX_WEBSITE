import { SiteCredits } from "@/components/site-credits";
import { SiteHeader } from "@/components/site-header";
import { PageBackLink } from "@/components/page-back-link";
import { TrackLoadForm } from "@/components/track-load-form";

export default function DispatchPage() {
  return (
    <main className="min-h-screen min-h-[var(--fnx-viewport-min-height)] scroll-smooth bg-[#F8FAFC] pt-[calc(6rem+1cm+env(safe-area-inset-top,0px))] text-[#1F2933] lg:pt-[calc(3.5rem+1cm+env(safe-area-inset-top,0px))] [scroll-padding-top:calc(5.5rem+env(safe-area-inset-top,0px))]">
      <SiteHeader />

      <div className="mx-auto w-full max-w-3xl px-6 py-16 md:px-8 md:py-24">
        <PageBackLink href="/" />
        <p className="type-eyebrow-muted">FNX Log LLC</p>
        <h1 className="type-page-h1 mt-3">Track your load</h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-[#475569]">
          Enter your load ID and lane states to open tracking. Full TMS integration
          can replace this step when you go live.
        </p>

        <div className="mt-10 rounded-2xl border border-[#E2E8F0] bg-white p-8 shadow-sm md:p-10">
          <TrackLoadForm />
        </div>

        <SiteCredits className="mt-16 w-full border-t border-[#E2E8F0] pt-10" />
      </div>
    </main>
  );
}
