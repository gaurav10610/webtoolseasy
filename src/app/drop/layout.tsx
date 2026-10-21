import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DropStream - Free Unlimited P2P File & Folder Transfer Online",
  description:
    "Send unlimited files and entire folders directly between devices with peer-to-peer WebRTC encryption. Zero cloud storage, no file size limit, and no signup.",
  keywords: [
    "p2p file transfer",
    "send large files online",
    "unlimited file transfer",
    "browser to browser transfer",
    "webrtc file sharing",
    "snapdrop alternative",
    "wetransfer alternative free",
    "private file drop",
  ],
  openGraph: {
    title: "DropStream - Free Unlimited P2P File & Folder Transfer Online",
    description:
      "Send unlimited files and entire folders directly between devices with peer-to-peer WebRTC encryption. Zero cloud storage, no file size limit.",
    url: `${process.env.HOSTNAME || "https://webtoolseasy.com"}/drop`,
    siteName: "WebToolsEasy",
    type: "website",
  },
};

export default function DropStreamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
