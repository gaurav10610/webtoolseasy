import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";

const navigationUrl = "/tools/javascript-editor";
const pageTitle = "JavaScript Editor Online - Write & Edit JS Code";
const pageDescription =
  "Write, edit, and run JavaScript code with live preview. Free online JS editor with syntax highlighting, error checking, and code completion features.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/js-editor.png`;

const keywords =
  "javascript editor online,js editor,online javascript editor,javascript ide online,write javascript code,edit javascript code,js code editor";

export const metadata: Metadata = {
  alternates: {
    canonical: `${process.env.HOSTNAME}${navigationUrl}`,
  },
  title: pageTitle,
  description: pageDescription,
  keywords,
  metadataBase: new URL(process.env.HOSTNAME!),
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/favicon.png", type: "image/png" }],
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
    "Online JavaScript Editor: Write and Edit JavaScript Code in Your Browser",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  icons: [],
  relatedTools: [ApplicationIds.HTML_EDITOR],
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "Online JavaScript Editor with Live Preview",
    blockData: [
      "Our free online JavaScript editor provides a complete coding environment for writing, testing, and debugging JavaScript code directly in your browser. Features syntax highlighting, real-time error detection, and instant code execution without requiring local development setup.",
      "Perfect for learning JavaScript, prototyping web applications, testing code snippets, or sharing interactive examples. The editor supports modern JavaScript features including ES6+, async/await, and popular libraries for comprehensive development experience.",
    ],
  },
  {
    heading: "Key Features of Our JavaScript IDE",
    listData: [
      "Real-time syntax highlighting and error detection",
      "Instant code execution with live output console",
      "Auto-completion for JavaScript functions and methods",
      "Supports ES6+, Arrow functions, and modern JavaScript",
      "Built-in console for debugging and output viewing",
      "Code sharing with downloadable .js files",
      "No installation required - runs entirely in browser",
    ],
  },
  {
    heading: "Perfect for JavaScript Development",
    blockData: [
      "• **Learning**: Practice JavaScript concepts with immediate feedback and results",
      "• **Prototyping**: Quickly test algorithms, functions, and logic before implementation",
      "• **Teaching**: Share interactive code examples with students and colleagues",
      "• **Debugging**: Isolate and test specific code sections to identify issues",
      "• **Experimentation**: Try new JavaScript features and libraries safely",
    ],
  },
  {
    heading: "Supported JavaScript Features",
    listData: [
      "Modern ES6+ syntax including arrow functions and destructuring",
      "Async/await for handling asynchronous operations",
      "Object-oriented programming with classes and inheritance",
      "Functional programming with map, filter, reduce operations",
      "DOM manipulation for interactive web development",
      "JSON handling and API integration examples",
    ],
  },
];
