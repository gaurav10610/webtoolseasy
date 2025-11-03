import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/markdown-editor";
const pageTitle = "Markdown Editor Online - Live Preview & Export";
const pageDescription =
  "Write and edit Markdown with live preview. Free online editor with syntax highlighting, export to HTML/PDF, and real-time formatting assistance.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/markdown-editor.png`;

const keywords =
  "markdown editor,markdown editor online,md editor,markdown preview,live markdown editor,markdown to html,markdown converter";

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
  mainHeading:
    "Free Online Markdown Editor: Write, Edit and Preview Markdown in Real Time",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  relatedTools: [ApplicationIds.TEXT_COMPARE, ApplicationIds.JWT_DECODER],
  structuredData: createToolStructuredData({
    pageUrl: "markdown-editor",
    pageTitle,
    mainHeading: "Free Online Markdown Editor: Write, Edit and Preview Markdown in Real Time",
    keywords: keywords.split(",").map((word) => word.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "Online Markdown Editor with Live Preview",
    blockData: [
      "Our free online Markdown editor provides a complete writing environment for creating, editing, and previewing Markdown documents in real-time. Features split-screen editing with instant HTML preview, syntax highlighting, and export options for various file formats.",
      "Perfect for technical documentation, blog posts, README files, and collaborative writing projects. The editor supports GitHub Flavored Markdown (GFM) including tables, code blocks, and task lists for comprehensive document creation.",
    ],
  },
  {
    heading: "Advanced Markdown Features Supported",
    listData: [
      "GitHub Flavored Markdown (GFM) with tables and task lists",
      "Syntax highlighting for code blocks in multiple languages",
      "Live preview with synchronized scrolling",
      "Mathematical equations with LaTeX/MathJax support",
      "Mermaid diagrams for flowcharts and graphs",
      "Export to HTML, PDF, and plain text formats",
      "Auto-save and document version history",
    ],
  },
  {
    heading: "Perfect for Content Creation",
    blockData: [
      "**Technical Documentation**: Create API docs, user manuals, and project documentation",
      "**Blog Writing**: Draft and preview blog posts with proper formatting",
      "**README Files**: Design project descriptions for GitHub and GitLab repositories",
      "**Note Taking**: Organize structured notes with headings, lists, and links",
      "**Academic Writing**: Format research papers with citations and references",
    ],
  },
  {
    heading: "Enhanced Writing Experience",
    listData: [
      "Distraction-free writing interface with focus mode",
      "Real-time word count and reading time estimates",
      "Customizable themes for comfortable writing sessions",
      "Keyboard shortcuts for rapid formatting",
      "Image embedding with drag-and-drop support",
      "Table editing with visual grid interface",
    ],
  },
];
