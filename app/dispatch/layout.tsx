import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Track your load | Fnx Transportation.",
  description: "Track your shipment with Fnx Transportation.",
};

export default function DispatchLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
