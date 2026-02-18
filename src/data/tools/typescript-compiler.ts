import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/typescript-compiler";

const pageTitle =
  "TypeScript Compiler Online - Write & Run TypeScript Code Free";
const pageDescription =
  "Compile and run TypeScript code online for free. Free browser-based TypeScript compiler with type checking, ES6+ support, and instant execution. No installation required.";

const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/typescript-compiler.png`;

const keywords =
  "typescript compiler,typescript compiler online,run typescript online,typescript playground,typescript online,typescript compiler free,online typescript compiler,typescript editor online,typescript compiler online free,compile typescript online,typescript runner,typescript code runner";

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
  mainHeading: "Online TypeScript Compiler & Runner",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  relatedTools: [
    ApplicationIds.JS_COMPILER,
    ApplicationIds.JS_EDITOR,
    ApplicationIds.PYTHON_COMPILER,
  ],
  structuredData: createToolStructuredData({
    pageUrl: "typescript-compiler",
    pageTitle,
    mainHeading: "Online TypeScript Compiler & Runner",
    keywords: keywords.split(",").map((word) => word.trim()),
    faqs: [
      {
        question: "Can I run TypeScript directly in the browser?",
        answer:
          "Yes! Our online TypeScript compiler transpiles your TypeScript code to JavaScript using the official TypeScript compiler and executes it directly in your browser. No server upload or installation needed.",
      },
      {
        question: "What TypeScript version is supported?",
        answer:
          "We use TypeScript 5.x with full support for type annotations, generics, enums, interfaces, union types, intersection types, decorators, and all modern ES6+ JavaScript features.",
      },
      {
        question: "Does this TypeScript compiler check types?",
        answer:
          "The compiler transpiles TypeScript to JavaScript and reports diagnostic warnings for type errors. It supports strict mode and provides compile-time feedback for common TypeScript issues.",
      },
      {
        question: "Is my TypeScript code private?",
        answer:
          "Absolutely. All TypeScript compilation and execution happens entirely in your browser using client-side processing. Your code is never uploaded to any server.",
      },
      {
        question: "Can I use async/await and Promises in TypeScript?",
        answer:
          "Yes, our compiler has full support for async/await, Promises, and all asynchronous patterns. The output is captured and displayed in the console panel in real time.",
      },
    ],
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    blockData: [
      "Our free online TypeScript compiler lets you write, compile, and run TypeScript code directly in your web browser. Whether you're learning TypeScript, prototyping a project, or testing type-safe code snippets, our tool provides instant compilation and execution with no setup required.",
    ],
  },
  {
    heading: "Key Features of Our Online TypeScript Compiler",
    listData: [
      "Instant Compilation: TypeScript is transpiled to JavaScript and executed immediately in your browser with real-time console output.",
      "Full TypeScript 5.x Support: Use type annotations, interfaces, generics, enums, tuples, union types, intersection types, and more.",
      "Modern JavaScript Features: Supports ES6+ syntax including arrow functions, destructuring, template literals, async/await, and classes.",
      "Browser-Based Execution: No installation, no downloads — compile and run TypeScript from any device with a web browser.",
      "Code Sharing: Share your TypeScript code snippets via a shareable link for collaboration and learning.",
      "Syntax Highlighting: Full Monaco editor with IntelliSense-like code completion and TypeScript-aware highlighting.",
    ],
  },
  {
    heading: "How to Use the TypeScript Compiler",
    listData: [
      "Write Code: Type or paste your TypeScript code into the editor with full syntax highlighting.",
      'Click "Run TypeScript": The compiler transpiles your code to JavaScript and executes it instantly.',
      "View Output: See console output, return values, and any compilation errors in the output panel.",
      "Share & Iterate: Copy your code, share via link, and iterate quickly with instant feedback.",
    ],
  },
  {
    blockData: [
      "Start writing TypeScript code now with our free online compiler. Perfect for learning TypeScript, testing code snippets, and rapid prototyping — all from the comfort of your browser.",
    ],
  },
];
