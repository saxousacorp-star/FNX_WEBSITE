import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
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
      {
        source: "/owner-operator",
        destination: "/join-our-team",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
