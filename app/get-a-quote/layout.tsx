import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get a Quote | FNX Log LLC",
  description: "Request a quote for your freight and logistics needs with FNX Log LLC.",
};

export default function GetAQuoteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
