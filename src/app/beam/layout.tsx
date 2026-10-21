import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BeamSuite - Free Wireless Phone Camera & Screen to OBS via WebRTC",
  description:
    "Turn your iPhone or Android phone into an ultra-low latency 1080p camera source for OBS Studio. 100% peer-to-peer, sub-100ms latency, zero install, and no watermarks.",
  keywords: [
    "phone as webcam",
    "obs camera source",
    "wireless camera for obs",
    "vdo ninja alternative",
    "stream phone camera to obs",
    "webrtc obs camera",
    "free obs wireless webcam",
    "screen beam low latency",
  ],
  openGraph: {
    title: "BeamSuite - Free Wireless Phone Camera & Screen to OBS",
    description:
      "Turn your iPhone or Android phone into an ultra-low latency camera source for OBS Studio. Sub-100ms WebRTC streaming.",
    url: `${process.env.HOSTNAME || "https://webtoolseasy.com"}/beam`,
    siteName: "WebToolsEasy",
    type: "website",
  },
};

export default function BeamSuiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
