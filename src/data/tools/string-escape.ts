import { ApplicationConfig } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/string-escape";
const pageTitle = "String Escape & Unescape"; // <=55 chars
const pageDescription =
  "Escape and unescape strings for JavaScript, HTML, URL and Base64 online. Convert, copy, or download results quickly in your browser."; // <=150 chars
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/string-escape.png`;

const keywords =
  "string escape,string unescape,html escape,js escape,json escape,json unescape,url encode,base64 encode,online string converter";

export const metadata: Metadata = {
  alternates: {
    canonical: `${process.env.HOSTNAME}${navigationUrl}`,
  },
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
    description: pageDescription,
    siteName: "WebToolsEasy",
    images: [
      {
        url: imageUrl,
        secureUrl: imageUrl,
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
  authors: {
    name: "Gaurav Kumar Yadav",
  },
  robots: "index, follow",
};

export const componentConfig: ApplicationConfig = {
  mainHeading: "String Escape & Unescape: JS, HTML, URL, Base64",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((w) => w.trim()),
  relatedTools: [],
  structuredData: createToolStructuredData({
    pageUrl: "string-escape",
    pageTitle,
    mainHeading: "String Escape & Unescape: JS, HTML, URL, Base64",
    keywords: keywords.split(",").map((w) => w.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "Quickly escape and unescape strings",
    blockData: [
      "Escape or unescape strings for JavaScript and HTML safely, encode URLs, and perform Base64 conversions directly in your browser.",
      "Copy the output or download it for use in code snippets, templates, or debugging tasks.",
    ],
  },
  {
    heading: "How to use",
    listData: [
      "Paste or type your input string in the left editor",
      "Use toolbar actions to escape/unescape for JS or JSON, encode/decode URLs, or convert to/from Base64",
      "Copy the result from the right panel or use the share link to save your input",
    ],
  },
  {
    heading: "Why this tool",
    listData: [
      "Fast, private browser-based processing — no server uploads",
      "Handy for preparing strings for source code, HTML templates or URL parameters",
      "Simple, clean interface designed for quick conversions",
    ],
  },
];

export default componentConfig;
