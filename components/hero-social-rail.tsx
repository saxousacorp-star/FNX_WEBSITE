const social = {
  instagram: "https://www.instagram.com",
  facebook: "https://www.facebook.com",
  x: "https://x.com",
  linkedin: "https://www.linkedin.com",
} as const;

const iconClass = "h-3.5 w-3.5 fill-current sm:h-4 sm:w-4";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className={iconClass} aria-hidden>
      <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 2.2a4.8 4.8 0 1 0 0 9.6 4.8 4.8 0 0 0 0-9.6zm0 1.5a3.3 3.3 0 1 1 0 6.6 3.3 3.3 0 0 1 0-6.6zM16.2 4.3a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className={iconClass} aria-hidden>
      <path d="M9.8 22v-8.4H6.5V9.8h3.3V6.4c0-3.2 1.8-4.9 4.6-4.9 1.2 0 2.4.1 2.7.1v3.1h-1.9c-1.4 0-1.7.7-1.7 1.7V9.8h3.5l-.5 3.8h-3V22H9.8z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className={iconClass} aria-hidden>
      <path d="M4 4.5h3.1l4.2 5.6L16 4.5H20l-5.2 6.4L20 20h-3.1l-4.5-5.8L7.1 20H4l5.3-6.4L4 4.5z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className={iconClass} aria-hidden>
      <path d="M4.4 3.1a1.7 1.7 0 1 0 0 3.3 1.7 1.7 0 0 0 0-3.3zM2.5 8.2h3.6V21H2.5V8.2zm6.4 0h3.4v1.7h.1a3.6 3.6 0 0 1 3.2-1.7c3.4 0 4.1 2.2 4.1 5.1V21h-3.7v-6.1c0-1.2 0-2.6-1.6-2.6-1.6 0-1.9 1.3-1.9 2.6V21h-3.6V8.2z" />
    </svg>
  );
}

const linkClass =
  "inline-flex min-h-11 min-w-11 items-center justify-center text-slate-500/55 transition-colors duration-500 hover:text-slate-600/95 focus-visible:text-slate-600 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-slate-400/70";

/**
 * `fixed` para as redes acompanharem a janela ao rolar (sempre visíveis, sem sair com o hero).
 * z-index abaixo do site header (z-50) para a barra de topo continuar acessível.
 */
export function HeroSocialRail() {
  return (
    <nav
      aria-label="Social media"
      className="fixed top-1/2 z-40 flex -translate-y-1/2 flex-col gap-3 [left:max(0.5rem,env(safe-area-inset-left,0px))] sm:gap-[0.9375rem] sm:[left:max(1rem,env(safe-area-inset-left,0px))] lg:[left:max(1.25rem,env(safe-area-inset-left,0px))]"
    >
      <a
        className={linkClass}
        href={social.instagram}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="FNX on Instagram"
      >
        <InstagramIcon />
      </a>
      <a
        className={linkClass}
        href={social.facebook}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="FNX on Facebook"
      >
        <FacebookIcon />
      </a>
      <a
        className={linkClass}
        href={social.x}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="FNX on X"
      >
        <XIcon />
      </a>
      <a
        className={linkClass}
        href={social.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="FNX on LinkedIn"
      >
        <LinkedInIcon />
      </a>
    </nav>
  );
}
