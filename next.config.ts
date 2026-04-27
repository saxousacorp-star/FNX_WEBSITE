import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
] as const;

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 92, 100],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [...securityHeaders],
      },
      {
        // Evita “imagem antiga” em cache ao substituir o ficheiro com o mesmo nome
        source: "/nsssf.svg",
        headers: [
          { key: "Cache-Control", value: "no-cache" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // /favicon.ico → PNG derivado de assets/logoaba.svg (uso exclusivo: aba do browser)
      {
        source: "/favicon.ico",
        destination: "/icon.png",
        permanent: false,
      },
      {
        source: "/owner-operator",
        destination: "/join-our-team",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
