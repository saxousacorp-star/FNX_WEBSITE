export function SiteCredits({ className = "" }: { className?: string }) {
  const year = new Date().getFullYear();

  return (
    <div className={className}>
      <p className="text-center text-xs leading-relaxed text-[#64748B] sm:text-left">
        <span className="text-[#475569]">© {year} FNX Log LLC. All rights reserved.</span>
        <span className="mx-1.5 text-slate-400" aria-hidden>
          ·
        </span>
        <span>Site developed by ORBIX AI USA LLC.</span>
      </p>
    </div>
  );
}
