import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/unix-timestamp-converter";
const pageTitle = "UNIX Timestamp Converter - Epoch Time Converter Online";
const pageDescription =
  "Convert UNIX timestamps to readable dates and vice versa. Free epoch time converter with timezone support. Convert timestamps instantly.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/unix-timestamp-converter.png`;

const keywords =
  "unix timestamp converter,epoch converter,timestamp to date,unix time converter,epoch time,timestamp converter,date to timestamp";

export const metadata: Metadata = {
  alternates: {
    canonical: `${process.env.HOSTNAME}${navigationUrl}`,
  },
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
  authors: {
    name: "Gaurav Kumar Yadav",
  },
  robots: "index, follow",
};

export const componentConfig: ApplicationConfig = {
  mainHeading: "UNIX Timestamp Converter: Convert Epoch Time to Date Online",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  relatedTools: [ApplicationIds.TIMEZONE_CONVERTER],
  structuredData: createToolStructuredData({
    pageUrl: "unix-timestamp-converter",
    pageTitle,
    mainHeading: "UNIX Timestamp Converter: Convert Epoch Time to Date Online",
    keywords: keywords.split(",").map((word) => word.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "What is UNIX Timestamp?",
    blockData: [
      "A UNIX timestamp (also called Epoch time) is the number of seconds that have elapsed since January 1, 1970, 00:00:00 UTC. Our converter transforms these numeric timestamps into human-readable dates and vice versa.",
      "UNIX timestamps are widely used in programming, databases, and APIs because they're timezone-independent and easy to compare. Convert between timestamp and date formats instantly with our free tool.",
    ],
  },
  {
    heading: "How to Use the UNIX Timestamp Converter",
    blockData: [
      "Enter a UNIX timestamp to convert it to a readable date, or select a date and time to get its UNIX timestamp. The tool shows multiple date formats and supports both seconds and milliseconds timestamps.",
      "View the current UNIX timestamp, convert historical dates, or calculate future timestamps. Perfect for developers, database administrators, and anyone working with time-based data.",
    ],
  },
  {
    heading: "UNIX Timestamp Formats",
    blockData: [
      "Standard UNIX timestamps are in seconds (10 digits), while JavaScript and some systems use milliseconds (13 digits). Our tool automatically detects and converts both formats.",
      "The tool displays dates in multiple formats: ISO 8601, UTC, local time, and human-readable format. Choose the format that best fits your needs.",
    ],
  },
  {
    heading: "Common Uses for UNIX Timestamps",
    blockData: [
      "Developers use UNIX timestamps for database records, API responses, log files, and session management. They're ideal for calculating time differences and scheduling events.",
      "UNIX timestamps avoid timezone confusion and daylight saving time issues. They're perfect for distributed systems where different servers may be in different timezones.",
    ],
  },
  {
    heading: "Understanding Epoch Time",
    blockData: [
      "The Unix epoch started on January 1, 1970, chosen as a convenient reference point for time calculations in early Unix systems. All UNIX timestamps count seconds from this moment.",
      "UNIX timestamps will eventually reach their 32-bit limit in 2038 (Year 2038 problem), but modern 64-bit systems handle much larger timestamps, extending functionality for billions of years.",
    ],
  },
];
