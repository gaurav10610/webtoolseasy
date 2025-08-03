import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/python-compiler";
const pageTitle = "Python Compiler Online - Run Python Code Free";
const pageDescription =
  "Run and execute Python 3 code instantly in your browser. Free online Python compiler and interpreter with debugging tools. No setup required.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/python-compiler.png`;

const keywords =
  "python compiler online,run python online,python interpreter online,online python editor,execute python online,python code runner,python 3 compiler";

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
  mainHeading: "Online Python Compiler & Interpreter",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  icons: [],
  relatedTools: [
    ApplicationIds.HTML_EDITOR,
    ApplicationIds.MARKDOWN_EDITOR,
    ApplicationIds.JS_COMPILER,
  ],
  structuredData: createToolStructuredData({
    pageUrl: "python-compiler",
    pageTitle,
    mainHeading: "Online Python Compiler & Interpreter",
    keywords: keywords.split(",").map((word) => word.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "Online Python Compiler and Interpreter",
    blockData: [
      "Our free online Python compiler provides a complete coding environment for writing, executing, and testing Python code directly in your browser. Features Python 3.x support, real-time execution, syntax highlighting, and debugging capabilities without requiring local installation or setup.",
      "Perfect for learning Python programming, prototyping algorithms, testing code snippets, and educational purposes. The compiler supports standard Python libraries and provides instant feedback for rapid development and experimentation.",
    ],
  },
  {
    heading: "Comprehensive Python Development Features",
    listData: [
      "Full Python 3.x interpreter with standard library support",
      "Real-time code execution with instant output display",
      "Syntax highlighting and error detection",
      "Interactive console for testing and debugging",
      "Support for Python data structures, functions, and classes",
      "File input/output operations and string manipulation",
      "Code sharing and export functionality",
    ],
  },
  {
    heading: "Ideal for Python Learning and Development",
    blockData: [
      "• **Students**: Learn Python syntax, data structures, and algorithms with immediate feedback",
      "• **Developers**: Quickly test Python functions, algorithms, and logic before implementation",
      "• **Data Scientists**: Experiment with Python data manipulation and analysis scripts",
      "• **Teachers**: Create interactive Python coding examples and assignments",
      "• **Professionals**: Prototype solutions and validate Python code snippets",
    ],
  },
  {
    heading: "Supported Python Features",
    listData: [
      "Object-oriented programming with classes and inheritance",
      "Functional programming with lambda functions and comprehensions",
      "Standard library modules (math, random, datetime, etc.)",
      "Exception handling with try-except blocks",
      "File operations and data manipulation",
      "String processing and regular expressions",
    ],
  },
];
