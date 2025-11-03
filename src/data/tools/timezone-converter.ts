import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/timezone-converter";
const pageTitle = "Timezone Converter - World Timezones & Current Time";
const pageDescription =
  "Convert times across major world time zones. See current time in top global zones and switch between 12/24 hour formats.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/timezone-converter.png`;

const keywords =
  "timezone converter, world time converter, current time zones, convert time zones online, time zone difference, international meeting time, convert local time";

export const metadata: Metadata = {
  alternates: { canonical: `${process.env.HOSTNAME}${navigationUrl}` },
  title: pageTitle,
  description: pageDescription,
  keywords,
  metadataBase: new URL(
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://webtoolseasy.com"
  ),
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
    description: pageDescription,
    siteName: "WebToolsEasy",
    images: [
      {
        url: imageUrl,
        secureUrl: imageUrl,
        width: 1200,
        height: 630,
        alt: pageTitle,
      },
    ],
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
  mainHeading: "Timezone Converter - Convert time across world time zones",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((k) => k.trim()),
  relatedTools: [ApplicationIds.JSON_VIEWER, ApplicationIds.HASH_GENERATOR],
  structuredData: createToolStructuredData({
    pageUrl: "timezone-converter",
    pageTitle,
    mainHeading: "Timezone Converter - Convert time across world time zones",
    keywords: keywords.split(",").map((k) => k.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "What is a Timezone Converter?",
    blockData: [
      "A timezone converter helps you convert times between different locations around the world. Use this tool to quickly view the current time in popular time zones, calculate time differences, and convert a specific timestamp for scheduling meetings or coordinating events across countries.",
    ],
  },
  {
    heading: "How to use",
    listData: [
      "Optionally enter an ISO timestamp in the input panel (e.g. 2025-08-31T10:00) or leave blank to use current time.",
      "Toggle between 12-hour and 24-hour formats using the toolbar button.",
      "View current times across the top global time zones instantly.",
      "Copy or share the results using the toolbar buttons.",
    ],
  },
  {
    heading: "Why use this tool",
    blockData: [
      "Accurate timezone conversions using your browser's built-in Intl APIs. Fast, private, and browser-based — no data is sent to our servers. Ideal for remote teams, event planning, and travelers.",
    ],
  },
  {
    heading: "Common use cases",
    listData: [
      "Schedule international meetings with clear local times for each participant",
      "Check current time across major cities when planning calls or launches",
      "Quickly convert a timestamp to different zones when reviewing logs or reports",
    ],
  },
  {
    heading: "Frequently asked questions",
    listData: [
      "Q: Is the conversion accurate? A: Yes — the tool uses the browser's timezone database and IANA zone names for reliable results.",
      "Q: Do you store my data? A: No — all conversions are done in your browser and nothing is transmitted to our servers.",
    ],
  },
];
