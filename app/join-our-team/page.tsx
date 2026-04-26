import Link from "next/link";
import { PageBackLink } from "@/components/page-back-link";
import { SiteCredits } from "@/components/site-credits";
import { SiteHeader } from "@/components/site-header";
import { OwnerOperatorForm } from "@/components/owner-operator-form";

export default function JoinOurTeamPage() {
  return (
    <main className="min-h-dvh scroll-smooth bg-[#F8FAFC] pt-[calc(6rem+1cm+env(safe-area-inset-top,0px))] text-[#1F2933] lg:pt-[calc(3.5rem+1cm+env(safe-area-inset-top,0px))] [scroll-padding-top:calc(5.5rem+env(safe-area-inset-top,0px))]">
      <SiteHeader />

      <div className="mx-auto w-full max-w-3xl px-6 py-16 md:px-8 md:py-24">
        <PageBackLink href="/" />
        <p className="type-eyebrow-muted">Owner-Operator</p>
        <h1 className="type-page-h1 mt-3">Join our team</h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-[#475569]">
          Apply as an owner-operator: share your business, contact, U.S. state, commercial
          insurance, and a short message. We use this to review how you can work with
          the FNX network.
        </p>

        <div className="mt-10 rounded-2xl border border-[#E2E8F0] bg-white p-8 shadow-sm md:p-10">
          <OwnerOperatorForm />
        </div>

        <p className="mt-10 text-center text-sm text-[#64748B]">
          <Link
            className="font-medium text-[#0B1F3A] underline decoration-[#0B1F3A]/30 underline-offset-2 transition hover:decoration-[#0B1F3A]"
            href="/#owners"
          >
            Read more on the home page
          </Link>
        </p>

        <SiteCredits className="mt-16 w-full border-t border-[#E2E8F0] pt-10" />
      </div>
    </main>
  );
}
