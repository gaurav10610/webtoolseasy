import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/url-encoder-decoder";
const pageTitle = "URL Encoder Decoder Free - Encode Decode URLs Online";
const pageDescription =
  "Free online URL encoder and decoder tool. Encode and decode URLs, URI components, query parameters instantly. Supports all special characters.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/url-encoder-decoder.png`;

const keywords =
  "url encoder,url decoder,uri encoder,uri decoder,percent encoding,url encoding tool,query parameter encoder,online url encoder,encode url online,decode url online";

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
  mainHeading:
    "Online URL Encoder Decoder: Encode and Decode URLs, URI Components & Query Parameters",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  icons: [],
  relatedTools: [
    ApplicationIds.BASE64_ENCODE,
    ApplicationIds.BASE64_DECODE,
    ApplicationIds.JWT_DECODER,
    ApplicationIds.JSON_FORMATTER,
    ApplicationIds.CASE_CONVERETR,
  ],
  structuredData: createToolStructuredData({
    pageUrl: "url-encoder-decoder",
    pageTitle,
    mainHeading:
      "Online URL Encoder Decoder: Encode and Decode URLs, URI Components & Query Parameters",
    keywords: keywords.split(",").map((word) => word.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "What is URL Encoding and Decoding?",
    blockData: [
      "URL encoding, also known as percent encoding, converts special characters in URLs into a format that can be safely transmitted over the internet. Our free online URL encoder and decoder tool helps developers and web professionals encode URLs, query parameters, and URI components instantly.",
      "URL encoding is essential for web development, API integrations, and handling special characters in URLs. Characters like spaces, ampersands, and international characters must be encoded to prevent breaking URL structure. Our tool supports both URI encoding and component encoding methods.",
    ],
  },
  {
    heading: "URL Encoding Methods Explained",
    listData: [
      "URI Encoding - Encodes complete URLs while preserving URL structure",
      "Component Encoding - Encodes individual URL parts like query parameters",
      "Percent Encoding - Converts special characters to %XX format",
      "Query Parameter Encoding - Safely encodes form data and parameters",
      "Path Segment Encoding - Encodes file paths and directory names",
      "International Character Support - Handles Unicode and UTF-8 characters",
    ],
  },
  {
    heading: "Common Use Cases for URL Encoding",
    blockData: [
      "**Web Development**: Encode form data, query parameters, and API requests",
      "**API Integration**: Prepare URLs for REST APIs and web service calls",
      "**Search Parameters**: Encode search queries with special characters and spaces",
      "**File Handling**: Convert file names and paths for web-safe URLs",
      "**Email Integration**: Encode email addresses and mailto links properly",
      "**Internationalization**: Handle non-English characters in URLs safely",
    ],
  },
  {
    heading: "Why Use Our URL Encoder Decoder?",
    listData: [
      "Completely free with no registration or software installation required",
      "Client-side processing keeps your URLs private and secure",
      "Supports both URI and component encoding methods",
      "Real-time encoding and decoding with instant results",
      "Copy, download, and share functionality for easy workflow",
      "Mobile-friendly interface works on all devices and browsers",
      "Handles all special characters including spaces, symbols, and Unicode",
      "Swap input/output feature for quick reverse operations",
    ],
  },
  {
    heading: "How to Use the URL Encoder Decoder",
    listData: [
      "Enter your URL, query parameter, or text in the input field",
      "Choose encoding method: URI encoding for complete URLs",
      "Use component encoding for individual URL parts and parameters",
      "Click encode or decode to process your text instantly",
      "Copy the result to clipboard or download as text file",
      "Use swap button to quickly reverse input and output",
    ],
  },
  {
    heading: "Special Characters and Encoding Examples",
    blockData: [
      "**Spaces**: Converted to %20 (hello world → hello%20world)",
      "**Email Symbols**: @ becomes %40 (user@email.com → user%40email.com)",
      "**Ampersands**: & becomes %26 (param1&param2 → param1%26param2)",
      "**Plus Signs**: + becomes %2B for proper URL safety",
      "**Hash Symbols**: # becomes %23 to prevent fragment confusion",
      "**Question Marks**: ? becomes %3F when not used as query separator",
    ],
  },
];
