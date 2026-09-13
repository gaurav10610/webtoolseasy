import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/base64-encode";
const pageTitle =
  "Base64 Encode & Decode Online - Convert Text, Files & Images (100% Client-Side)";
const pageDescription =
  "Free online Base64 encoder and decoder. Convert text, JSON, images, PDFs, and files to and from Base64 instantly. Features URL-safe encoding, Data URI snippets, and 100% private in-browser processing.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/base64-encode.png`;

const keywords =
  "base64 encode,base64 decode,base64 converter,base64 encoder online,text to base64,base64 to text,image to base64,file to base64,base64 to file,base64 string encoder,url safe base64,data uri generator,pdf to base64,base64 image decoder";

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
  mainHeading:
    "Free Online Base64 Studio: Encode & Decode Text, Images, PDFs and Binary Files",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  relatedTools: [
    ApplicationIds.JSON_FORMATTER,
    ApplicationIds.UUID_VERSION4_GENERATOR,
  ],
  structuredData: createToolStructuredData({
    pageUrl: "base64-encode",
    pageTitle,
    mainHeading:
      "Free Online Base64 Studio: Encode & Decode Text, Images, PDFs and Binary Files",
    keywords: keywords.split(",").map((word) => word.trim()),
    faqs: [
      {
        question: "Is Base64 encoding secure?",
        answer:
          "Base64 is encoding, not encryption - it transforms data into a text format but doesn't protect it. For privacy, our tool runs entirely in your browser, so your data never leaves your device.",
      },
      {
        question: "Does this tool upload my data to any server?",
        answer:
          "No, all encoding happens 100% client-side in your browser. Your files and data are never uploaded to any server, ensuring complete privacy.",
      },
      {
        question: "Is this Base64 encoder free to use?",
        answer:
          "Yes, our Base64 encoder is completely free with no limits on file size or number of conversions. No signup or registration required.",
      },
    ],
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "Base64 Data URI Schemes & MIME Types Cheat Sheet",
    blockData: [
      "• **PNG Image**: `data:image/png;base64,iVBORw0KGgo...` — Embed inline icons and sprites directly in CSS or HTML `<img>` tags.",
      "• **JPEG Image**: `data:image/jpeg;base64,/9j/4AAQSkZJR...` — Inline photography or thumbnails without separate HTTP requests.",
      "• **SVG Vector**: `data:image/svg+xml;base64,PHN2ZyB4bWx...` — Scalable resolution-independent graphics.",
      "• **PDF Document**: `data:application/pdf;base64,JVBERi0x...` — Preview or download PDFs directly in the browser.",
      "• **JSON Payload**: `data:application/json;base64,eyJhbGci...` — Inline structured configuration.",
    ],
  },
  {
    heading: "Standard Base64 vs URL-Safe Base64 (RFC 4648)",
    blockData: [
      "Standard Base64 uses `+` and `/` characters, and `=` for padding. When passed inside URLs or query strings, these characters cause encoding errors because `+` is interpreted as a space and `/` is a path separator.",
      "**URL-Safe Base64** replaces `+` with `-` (hyphen) and `/` with `_` (underscore), and typically omits trailing `=` padding characters. This format is required for JSON Web Tokens (JWT), OAuth tokens, and web URLs.",
    ],
  },
  {
    heading: "Programmatic Base64 Encoding Recipes",
    blockData: [
      "• **JavaScript (Browser)**: `btoa(unescape(encodeURIComponent(str)))` (Encode) | `decodeURIComponent(escape(atob(b64)))` (Decode)",
      "• **Node.js**: `Buffer.from(str, 'utf-8').toString('base64')` | `Buffer.from(b64, 'base64').toString('utf-8')`",
      "• **Python**: `import base64; base64.b64encode(b'hello').decode()` | `base64.urlsafe_b64encode(b'hello').decode()`",
      "• **CLI / Terminal**: `echo -n 'hello' | base64` (Encode) | `echo -n 'aGVsbG8=' | base64 -d` (Decode)",
    ],
  },
];
