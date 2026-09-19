import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/markdown-to-html-converter";
const pageTitle = "Markdown ⇄ HTML Converter Online - Convert MD to HTML & HTML to MD";
const pageDescription =
  "Convert Markdown to clean HTML and HTML to Markdown instantly. Free bidirectional online converter with live preview, syntax highlighting, and zero uploads.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/markdown-to-html-converter.png`;

const keywords =
  "markdown to html,html to markdown,convert html to markdown,html to md,markdown to html converter,convert markdown to html,md to html,markdown converter,html to markdown converter online,markdown parser,md to html converter,markdown to html free,convert md to html online";

export const metadata: Metadata = {
  alternates: {
    canonical: `${process.env.HOSTNAME}${navigationUrl}`,
  },
  title: "Markdown ⇄ HTML Converter Online - Convert MD to HTML & HTML to MD",
  description:
    "Convert Markdown to clean HTML and HTML to Markdown instantly. Free bidirectional online converter with live preview, syntax highlighting, and zero uploads.",
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
    "Markdown ⇄ HTML Converter: Bidirectional Markdown to HTML & HTML to Markdown Online",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  relatedTools: [
    ApplicationIds.MARKDOWN_EDITOR,
    ApplicationIds.HTML_EDITOR,
    ApplicationIds.HTML_FORMATTER,
  ],
  structuredData: createToolStructuredData({
    pageUrl: "markdown-to-html-converter",
    pageTitle: "Markdown ⇄ HTML Converter Online",
    mainHeading:
      "Markdown ⇄ HTML Converter: Transform Markdown to HTML and HTML to Markdown Online",
    keywords: keywords.split(",").map((word) => word.trim()),
    faqs: [
      {
        question: "Can I convert HTML back to Markdown?",
        answer:
          "Yes! This tool supports bidirectional conversion. You can convert Markdown to HTML or convert HTML back into clean Markdown with a single click.",
      },
      {
        question: "Is my content processed privately?",
        answer:
          "Yes. All conversion runs 100% in your browser using client-side JavaScript. No data is sent to any server.",
      },
      {
        question: "Does it support GitHub-flavored Markdown (GFM)?",
        answer:
          "Yes, standard and GitHub-flavored markdown elements like tables, fenced code blocks, checklists, and strikethrough are fully supported.",
      },
    ],
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "What is Markdown to HTML Conversion?",
    blockData: [
      "Markdown to HTML conversion transforms lightweight Markdown syntax into structured HTML code. Our converter parses Markdown formatting like headers, lists, links, and code blocks into valid HTML elements.",
      "Perfect for bloggers, developers, and content creators who write in Markdown but need HTML output for websites, CMS platforms, or documentation systems.",
    ],
  },
  {
    heading: "How to Use the Markdown to HTML Converter",
    blockData: [
      "Paste your Markdown text into the input field. The tool instantly converts it to HTML with live preview. Copy the generated HTML code or view the rendered output.",
      "Supports standard Markdown syntax including headers (#), bold (**text**), italics (*text*), links, lists, code blocks, and more. See the HTML output update in real-time as you type.",
    ],
  },
  {
    heading: "Why Convert Markdown to HTML?",
    blockData: [
      "Many blogging platforms and CMS systems require HTML input. Converting Markdown to HTML lets you write in a simple, readable format while generating clean, semantic HTML code.",
      "Markdown is faster to write than HTML, with less visual clutter. Convert your Markdown documents to HTML for websites, documentation, email newsletters, and web applications.",
    ],
  },
  {
    heading: "Supported Markdown Features",
    blockData: [
      "Our converter handles all standard Markdown syntax: headers (# H1 through ###### H6), paragraphs, line breaks, bold, italic, links, images, ordered and unordered lists, code blocks, and inline code.",
      "Advanced features include blockquotes, horizontal rules, tables, and nested lists. The converter produces clean, properly formatted HTML that's ready to use on any website.",
    ],
  },
  {
    heading: "Markdown to HTML Best Practices",
    blockData: [
      "Use Markdown for content authoring to separate content from presentation. Convert to HTML when you need to integrate with HTML-based systems or want more control over styling.",
      "Review the generated HTML to ensure it meets your needs. You can further customize the HTML output with CSS classes or inline styles after conversion.",
    ],
  },
];
