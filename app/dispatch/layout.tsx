import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Track your load | FNX Log LLC",
  description: "Track your shipment with FNX Log LLC.",
};

export default function DispatchLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
