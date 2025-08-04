import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/html-editor";
const pageTitle = "HTML CSS Editor Online - Live Preview & Code Editor";
const pageDescription =
  "Write, edit, and run HTML & CSS code with real-time preview. Free online editor with syntax highlighting, code completion, and responsive design testing.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/html-editor.png`;

const keywords =
  "html editor online,css editor,html css editor,live preview,online web editor,html code editor,css code editor,web development tool";

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
  mainHeading: "Online HTML and CSS Editor with Real-Time Preview",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  icons: [],
  relatedTools: [ApplicationIds.JS_EDITOR, ApplicationIds.PYTHON_COMPILER],
  structuredData: createToolStructuredData({
    pageUrl: "html-editor",
    pageTitle,
    mainHeading: "Online HTML and CSS Editor with Real-Time Preview",
    keywords: keywords.split(",").map((word) => word.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "Online HTML & CSS Editor with Live Preview",
    blockData: [
      "Our free online HTML and CSS editor provides a complete web development environment for creating, editing, and testing websites directly in your browser. Features real-time preview, syntax highlighting, and integrated CSS styling capabilities for rapid web development.",
      "Perfect for web design prototyping, learning HTML/CSS, testing responsive layouts, or creating quick web demos. The editor supports modern HTML5 elements, CSS3 features, and provides instant visual feedback as you code.",
    ],
  },
  {
    heading: "Comprehensive Web Development Features",
    listData: [
      "Split-screen editor with HTML, CSS, and live preview panels",
      "Real-time syntax highlighting and error detection",
      "Auto-completion for HTML tags and CSS properties",
      "Responsive design testing with device preview modes",
      "Integrated CSS framework support (Bootstrap, Flexbox, Grid)",
      "Code sharing and export options for easy collaboration",
      "No installation required - works entirely in browser",
    ],
  },
  {
    heading: "Perfect for Web Development Learning",
    blockData: [
      "• **Students**: Learn HTML and CSS with immediate visual feedback and results",
      "• **Designers**: Prototype web layouts and test responsive designs quickly",
      "• **Developers**: Test code snippets and debug HTML/CSS issues rapidly",
      "• **Teachers**: Create interactive coding examples and tutorials",
      "• **Freelancers**: Build quick demos and proof-of-concepts for clients",
    ],
  },
  {
    heading: "Supported Web Technologies",
    listData: [
      "Modern HTML5 semantic elements and attributes",
      "CSS3 animations, transitions, and transform effects",
      "Flexbox and CSS Grid for advanced layouts",
      "Responsive design with media queries",
      "Web fonts and custom typography styling",
      "Modern CSS features like variables and calc()",
    ],
  },
];
