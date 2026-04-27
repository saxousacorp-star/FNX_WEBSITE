import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join Our Team | Fnx Transportation.",
  description:
    "Owner-operator application: company, contact, U.S. state, commercial insurance, and message to join the Fnx network.",
};

export default function JoinOurTeamLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
