import type { Metadata } from "next";
import {
  StructuredData,
  generateWebApplicationSchema,
} from "@/components/structuredData";

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
  alternates: {
    canonical: `${process.env.HOSTNAME || "https://webtoolseasy.com"}/drop`,
  },
  openGraph: {
    title: "DropStream - Free Unlimited P2P File & Folder Transfer Online",
    description:
      "Send unlimited files and entire folders directly between devices with peer-to-peer WebRTC encryption. Zero cloud storage, no file size limit.",
    url: `${process.env.HOSTNAME || "https://webtoolseasy.com"}/drop`,
    siteName: "WebToolsEasy",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DropStream - Free Unlimited P2P File & Folder Transfer",
    description:
      "Send unlimited files and folders directly between browsers with WebRTC end-to-end encryption.",
  },
};

export default function DropStreamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schema = generateWebApplicationSchema({
    name: "DropStream - Unlimited P2P File & Folder Transfer",
    description:
      "Send unlimited files and folders directly between browsers using WebRTC peer-to-peer encryption with zero cloud storage.",
    url: `${process.env.HOSTNAME || "https://webtoolseasy.com"}/drop`,
    applicationCategory: "UtilitiesApplication",
    keywords: [
      "p2p file transfer",
      "webrtc file sharing",
      "send large files",
      "unlimited file transfer",
    ],
  });

  return (
    <>
      <StructuredData data={schema} />
      {children}
    </>
  );
}
