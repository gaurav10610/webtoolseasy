import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/test-hardware";
const pageTitle = "Device Hardware Tester";
const pageDescription =
  "Test your camera, microphone, speakers and media devices in browser. Quick hardware checks for common issues.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/test-hardware.png`;

const keywords =
  "hardware tester,device tester,web camera test,mic test,speaker test,battery status,media devices test";

export const metadata: Metadata = {
  alternates: { canonical: `${process.env.HOSTNAME}${navigationUrl}` },
  title: pageTitle,
  description: pageDescription,
  keywords,
  metadataBase: new URL(process.env.HOSTNAME!),
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon_48.png", sizes: "48x48" },
      { url: "/favion_512.png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon.png",
  },
  openGraph: {
    title: pageTitle,
    type: "website",
    url: `${process.env.HOSTNAME}${navigationUrl}`,
    siteName: "WebToolsEasy",
    images: [
      {
        url: imageUrl,
        secureUrl: imageUrl,
        alt: pageTitle,
      },
    ],
    description: pageDescription,
  },
  twitter: {
    card: "summary_large_image",
    site: "@webtoolseasy",
    title: pageTitle,
    description: pageDescription,
    images: [imageUrl],
  },
  authors: { name: "Gaurav Kumar Yadav" },
  robots: "index, follow",
};

export const componentConfig: ApplicationConfig = {
  mainHeading: "Test My Hardware Devices - Camera, Mic, Speakers",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((w) => w.trim()),
  relatedTools: [ApplicationIds.TIMEZONE_CONVERTER, ApplicationIds.JSON_VIEWER],
  structuredData: createToolStructuredData({
    pageUrl: "test-hardware",
    pageTitle,
    mainHeading: "Test My Hardware Devices - Camera, Mic, Speakers",
    keywords: keywords.split(",").map((w) => w.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "Quick Hardware Checks",
    blockData: [
      "Use this browser-based tester to verify your camera, microphone, speakers, and connected media devices. Permissions are required for some checks and results may vary across browsers.",
    ],
  },
  {
    heading: "How to Use",
    listData: [
      "Grant camera and microphone permission when prompted",
      "Start camera to preview video and take snapshots",
      "Start microphone to view audio levels and test playback",
      "Enumerate devices to see connected inputs/outputs",
    ],
  },
  {
    heading: "Privacy",
    blockData: [
      "This tool runs entirely in your browser and does not upload media streams or recordings to any server. Grant permissions only when comfortable.",
    ],
  },
];
