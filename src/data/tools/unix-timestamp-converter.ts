import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/unix-timestamp-converter";
const pageTitle =
  "Unix Timestamp Converter Online - Epoch to Date & Date to Epoch";
const pageDescription =
  "Convert Unix timestamps to readable dates and dates to Unix epoch online. Free timestamp converter supports milliseconds, seconds, and multiple date formats. Get current Unix timestamp.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/unix-timestamp-converter.png`;

const keywords =
  "unix timestamp converter,epoch converter,unix timestamp to date,timestamp converter,epoch to date,date to timestamp,unix time converter,epoch time converter,unix timestamp,current unix timestamp,epoch converter online,timestamp converter online free";

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
      : "https://webtoolseasy.com",
  ),
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon_48.png", sizes: "48x48" },
      { url: "/favicon_512.png", sizes: "512x512" },
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
    heading: "Unix Timestamp Resolution & Digits Cheat Sheet",
    blockData: [
      "• **Seconds (10 digits)**: `1773413400` — Standard POSIX/Unix timestamp used in Linux, Python (`time.time()`), and SQL databases.",
      "• **Milliseconds (13 digits)**: `1773413400000` — Standard JavaScript epoch (`Date.now()`, `new Date().getTime()`), Java (`System.currentTimeMillis()`).",
      "• **Microseconds (16 digits)**: `1773413400000000` — High-precision profiling and Python `time.time_ns() // 1000`.",
      "• **Nanoseconds (19 digits)**: `1773413400000000000` — Go (`time.Now().UnixNano()`) and kernel performance telemetry.",
    ],
  },
  {
    heading: "Programmatic Unix Timestamp Recipes",
    blockData: [
      "• **JavaScript / Node.js**: `Math.floor(Date.now() / 1000)` (Seconds) | `new Date(timestamp * 1000).toISOString()` (To ISO)",
      "• **Python**: `import time; int(time.time())` (Current epoch) | `from datetime import datetime; datetime.fromtimestamp(ts)`",
      "• **PostgreSQL**: `SELECT EXTRACT(EPOCH FROM NOW())::BIGINT;` (To epoch) | `to_timestamp(1773413400)` (To timestamp)",
      "• **Bash / Terminal**: `date +%s` (Current) | `date -r 1773413400` (macOS/BSD) or `date -d @1773413400` (Linux)",
      "• **Go**: `time.Now().Unix()` | `time.Unix(timestamp, 0)`",
    ],
  },
  {
    heading: "The Year 2038 Problem (Y2038 Bug)",
    blockData: [
      "On **January 19, 2038, at 03:14:07 UTC**, standard 32-bit signed integers will exceed their maximum capacity of `2,147,483,647` seconds, overflowing into negative numbers (`-2,147,483,648`) and resetting to December 13, 1901.",
      "Modern 64-bit systems represent timestamps using 64-bit integers (`int64`), expanding Unix epoch capability up to 292 billion years into the future. Ensure all databases use `BIGINT` or `TIMESTAMPTZ` rather than 32-bit integer columns.",
    ],
  },
];
