import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join Our Team | FNX Log LLC",
  description:
    "Owner-operator application: company, contact, U.S. state, commercial insurance, and message to join the FNX network.",
};

export default function JoinOurTeamLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
