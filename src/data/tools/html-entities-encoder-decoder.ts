import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/html-entities-encoder-decoder";
const pageTitle = "HTML Entity Encoder Decoder - Escape HTML Characters";
const pageDescription =
  "Encode and decode HTML entities instantly. Convert special characters to HTML entities and vice versa. Free HTML entity converter online.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/html-entities-encoder-decoder.png`;

const keywords =
  "html entities encoder,html decoder,html escape,html entity converter,encode html,decode html entities,html special characters";

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
    "HTML Entities Encoder & Decoder: Convert HTML Special Characters",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  relatedTools: [
    ApplicationIds.HTML_FORMATTER,
    ApplicationIds.HTML_EDITOR,
    ApplicationIds.STRING_ESCAPE,
  ],
  structuredData: createToolStructuredData({
    pageUrl: "html-entities-encoder-decoder",
    pageTitle,
    mainHeading:
      "HTML Entities Encoder & Decoder: Convert HTML Special Characters",
    keywords: keywords.split(",").map((word) => word.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "What are HTML Entities?",
    blockData: [
      "HTML entities are special codes used to display reserved characters in HTML. Characters like <, >, &, and quotes must be encoded as entities (&lt;, &gt;, &amp;, &quot;) to display correctly in web pages.",
      "Our HTML entity encoder converts special characters to their HTML entity equivalents, preventing them from being interpreted as HTML code. The decoder converts HTML entities back to regular characters.",
    ],
  },
  {
    heading: "How to Use the HTML Entity Encoder Decoder",
    blockData: [
      "Paste your text into the input field. Click 'Encode' to convert special characters to HTML entities, or 'Decode' to convert HTML entities back to regular text.",
      "The tool handles both named entities (&amp;, &lt;, &gt;) and numeric entities (&#38;, &#60;, &#62;). Copy the converted text with one click.",
    ],
  },
  {
    heading: "Why Encode HTML Entities?",
    blockData: [
      "Encoding prevents XSS (Cross-Site Scripting) attacks by ensuring user input is treated as text, not executable code. It's essential for displaying code snippets, user comments, and any untrusted content on web pages.",
      "HTML entities ensure your content displays correctly across all browsers and platforms. They're crucial for international characters, mathematical symbols, and special typography.",
    ],
  },
  {
    heading: "Common HTML Entities",
    blockData: [
      "Frequently encoded characters include: < (&lt;), > (&gt;), & (&amp;), \" (&quot;), ' (&apos;). These characters have special meaning in HTML and must be encoded to display as text.",
      "Non-ASCII characters like ©, ®, €, and accented letters can also be represented as HTML entities for compatibility with older systems and character encodings.",
    ],
  },
  {
    heading: "HTML Entity Encoding Best Practices",
    blockData: [
      "Always encode user-generated content before displaying it on web pages. Use HTML entities when embedding code examples in your HTML documentation or blog posts.",
      "Modern web development frameworks often handle entity encoding automatically, but understanding the process is crucial for security and proper HTML structure.",
    ],
  },
];
