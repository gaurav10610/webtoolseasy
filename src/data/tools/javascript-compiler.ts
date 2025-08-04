import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/javascript-compiler";
const pageTitle = "JavaScript Compiler Online - Run JS Code in Browser";
const pageDescription =
  "Compile and execute JavaScript code instantly in your browser. Free online JS compiler with debugging tools perfect for learning and testing code.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/javascript-compiler.png`;

const keywords =
  "javascript compiler online,js compiler,run javascript online,javascript online,execute js code,online js compiler,javascript code runner";

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
    "Online JavaScript Compiler: Compile & Run JavaScript in Browser",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  icons: [],
  relatedTools: [
    ApplicationIds.HTML_EDITOR,
    ApplicationIds.MARKDOWN_EDITOR,
    ApplicationIds.PYTHON_COMPILER,
  ],
  structuredData: createToolStructuredData({
    pageUrl: "javascript-compiler",
    pageTitle,
    mainHeading:
      "Online JavaScript Compiler: Compile & Run JavaScript in Browser",
    keywords: keywords.split(",").map((word) => word.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "Online JavaScript Compiler and Runtime Environment",
    blockData: [
      "Our free online JavaScript compiler provides a complete development environment for writing, executing, and testing JavaScript code directly in your browser. Features ES6+ support, real-time execution, debugging tools, and console output for comprehensive JavaScript development experience.",
      "Perfect for learning JavaScript programming, testing algorithms, debugging code snippets, and rapid prototyping. The compiler supports modern JavaScript features including async/await, arrow functions, and object destructuring for contemporary web development.",
    ],
  },
  {
    heading: "Advanced JavaScript Execution Features",
    listData: [
      "Modern ES6+ JavaScript support with latest syntax features",
      "Real-time code execution with immediate console output",
      "Integrated debugging tools and error detection",
      "Syntax highlighting and auto-completion",
      "Support for async/await and Promise-based programming",
      "DOM manipulation and event handling capabilities",
      "Code sharing and export functionality",
    ],
  },
  {
    heading: "Ideal for JavaScript Development",
    blockData: [
      "• **Web Developers**: Test JavaScript functions, algorithms, and browser APIs quickly",
      "• **Students**: Learn JavaScript concepts with immediate feedback and visualization",
      "• **Professionals**: Debug code snippets and validate logic before implementation",
      "• **Educators**: Create interactive JavaScript examples for teaching",
      "• **Freelancers**: Prototype client solutions and demonstrate JavaScript concepts",
    ],
  },
  {
    heading: "Supported JavaScript Technologies",
    listData: [
      "Modern ECMAScript features (ES6, ES7, ES8+)",
      "Asynchronous programming with Promises and async/await",
      "Object-oriented programming with classes and modules",
      "Functional programming with higher-order functions",
      "JSON manipulation and API interaction",
      "Browser APIs and web development features",
    ],
  },
];
