import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CodePair - Free P2P Collaborative Code Editor | Zero-Cloud Pair Programming",
  description:
    "Real-time peer-to-peer pair programming IDE powered by Monaco Editor. Zero servers, zero account required, 100% private WebRTC DataChannel synchronization with multi-cursor collaboration and live execution preview.",
  keywords: [
    "pair programming",
    "collaborative code editor",
    "real-time code editor",
    "monaco editor online",
    "peer to peer code editor",
    "zero cloud coding",
    "online IDE",
    "multi-cursor collaboration",
    "code interview tool",
  ],
  openGraph: {
    title: "CodePair - P2P Real-Time Collaborative Code Editor",
    description:
      "Code collaboratively in real time directly browser-to-browser with multi-cursor sync and live preview. 100% private, zero cloud storage.",
    url: "https://webtoolseasy.com/codepair",
    siteName: "WebToolsEasy",
    type: "website",
  },
};

export default function CodePairLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
