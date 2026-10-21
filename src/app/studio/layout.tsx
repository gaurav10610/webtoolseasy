import type { Metadata } from "next";
import {
  StructuredData,
  generateWebApplicationSchema,
} from "@/components/structuredData";

export const metadata: Metadata = {
  title: "LocalStudio - Free Lossless Video Cutter & Audio Tools Online",
  description:
    "Fast, private video trimming and audio extraction directly in your browser. No server upload, zero quality loss, no watermark, and instant export.",
  keywords: [
    "lossless video cutter",
    "trim video without re-encoding",
    "video cutter online free",
    "extract audio from video online",
    "client-side video trimmer",
    "no watermark video cutter",
    "private video editor",
  ],
  alternates: {
    canonical: `${process.env.HOSTNAME || "https://webtoolseasy.com"}/studio`,
  },
  openGraph: {
    title: "LocalStudio - Free Lossless Video Cutter & Audio Tools Online",
    description:
      "Trim video and extract audio in your browser with zero server uploads and no watermarks.",
    url: `${process.env.HOSTNAME || "https://webtoolseasy.com"}/studio`,
    siteName: "WebToolsEasy",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LocalStudio - Free Lossless Video Cutter & Audio Tools Online",
    description:
      "Trim video clips with 0.1s accuracy and extract pure WAV audio directly in your browser with zero server upload.",
  },
};

export default function LocalStudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schema = generateWebApplicationSchema({
    name: "LocalStudio - Lossless Video Cutter & Audio Extractor",
    description:
      "Client-side video trimming and audio extraction suite operating directly in browser memory without re-encoding quality degradation or cloud uploads.",
    url: `${process.env.HOSTNAME || "https://webtoolseasy.com"}/studio`,
    applicationCategory: "MultimediaApplication",
    keywords: [
      "lossless video cutter",
      "trim video online",
      "extract audio to wav",
      "no watermark video editor",
    ],
  });

  return (
    <>
      <StructuredData data={schema} />
      {children}
    </>
  );
}
