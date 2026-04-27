import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

function metadataBaseUrl(): URL | undefined {
  const normalize = (raw: string): string => {
    const t = raw.trim().replace(/\/$/, "");
    if (!t) {
      return t;
    }
    return /^https?:\/\//i.test(t) ? t : `https://${t}`;
  };

  const tryUrl = (raw: string | undefined): URL | undefined => {
    if (!raw?.trim()) {
      return undefined;
    }
    try {
      return new URL(normalize(raw));
    } catch {
      return undefined;
    }
  };

  return (
    tryUrl(process.env.NEXT_PUBLIC_SITE_URL) ??
    tryUrl(
      process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL.replace(/^https?:\/\//, "")}`
        : undefined,
    )
  );
}

const base = metadataBaseUrl();

export const metadata: Metadata = {
  ...(base ? { metadataBase: base } : {}),
  title: "Fnx Transportation | We do it.",
  description:
    "Expedited nationwide freight: secure capacity, time-critical delivery, and transport with safety and urgency.",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Fnx Transportation",
  },
  twitter: { card: "summary_large_image" },
};

/** Mobile: escala, área do notch, barra de tema; viewport-fit para safe-area. */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F5F5F7" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={`${inter.variable} ${plusJakarta.variable} h-full antialiased`}
      dir="ltr"
      lang="en"
    >
      <body className="flex min-h-screen min-h-[var(--fnx-viewport-min-height)] flex-col font-sans antialiased text-[#1F2933] [background:var(--fnx-app-bg)]">
        {children}
      </body>
    </html>
  );
}
