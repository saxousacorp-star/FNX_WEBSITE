import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get a Quote | Fnx Transportation.",
  description: "Request a quote for your freight and logistics needs with Fnx Transportation.",
};

export default function GetAQuoteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
