import { PageBackLink } from "@/components/page-back-link";
import { SiteCredits } from "@/components/site-credits";
import { SiteHeader } from "@/components/site-header";
import { QuoteForm } from "@/components/quote-form";

export default function GetAQuotePage() {
  return (
    <main className="min-h-dvh scroll-smooth bg-[#F8FAFC] pt-[calc(6rem+1cm+env(safe-area-inset-top,0px))] text-[#1F2933] lg:pt-[calc(3.5rem+1cm+env(safe-area-inset-top,0px))] [scroll-padding-top:calc(5.5rem+env(safe-area-inset-top,0px))]">
      <SiteHeader />

      <div className="mx-auto w-full max-w-3xl px-6 py-16 md:px-8 md:py-24">
        <PageBackLink href="/" />
        <p className="type-eyebrow-muted">FNX Log LLC</p>
        <h1 className="type-page-h1 mt-3">Get a Quote</h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-[#475569]">
          Tell us who you are, how to reach you, where you operate, and what you need—we’ll
          follow up with a tailored quote.
        </p>

        <div className="mt-10 rounded-2xl border border-[#E2E8F0] bg-white p-8 shadow-sm md:p-10">
          <QuoteForm />
        </div>

        <SiteCredits className="mt-16 w-full border-t border-[#E2E8F0] pt-10" />
      </div>
    </main>
  );
}
