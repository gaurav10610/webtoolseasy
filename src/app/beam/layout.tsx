import type { Metadata } from "next";
import {
  StructuredData,
  generateWebApplicationSchema,
} from "@/components/structuredData";

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
  alternates: {
    canonical: `${process.env.HOSTNAME || "https://webtoolseasy.com"}/beam`,
  },
  openGraph: {
    title: "BeamSuite - Free Wireless Phone Camera & Screen to OBS",
    description:
      "Turn your iPhone or Android phone into an ultra-low latency camera source for OBS Studio. Sub-100ms WebRTC streaming.",
    url: `${process.env.HOSTNAME || "https://webtoolseasy.com"}/beam`,
    siteName: "WebToolsEasy",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BeamSuite - Free Wireless Phone Camera & Screen to OBS",
    description:
      "Turn your phone into a high-definition, sub-100ms wireless OBS camera without installing apps.",
  },
};

export default function BeamSuiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schema = generateWebApplicationSchema({
    name: "BeamSuite - Wireless Phone Camera & Screen to OBS",
    description:
      "Sub-100ms ultra-low latency WebRTC video bridge connecting smartphone cameras and screen shares directly to OBS Studio browser sources.",
    url: `${process.env.HOSTNAME || "https://webtoolseasy.com"}/beam`,
    applicationCategory: "MultimediaApplication",
    keywords: [
      "obs camera",
      "wireless webcam",
      "vdo ninja alternative",
      "phone camera to obs",
      "low latency streaming",
    ],
  });

  return (
    <>
      <StructuredData data={schema} />
      {children}
    </>
  );
}
