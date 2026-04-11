import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/python-compiler";

const pageTitle = "Python Compiler Online - Run Python Code Free";
const pageDescription =
  "Run Python code online for free. Free browser-based Python compiler with syntax highlighting and output console. Execute Python scripts instantly — no installation required.";

const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/python-compiler.png`;

const keywords =
  "python compiler,python compiler online,run python online,python online,python compiler free,python editor online,online python compiler,python interpreter online,python compiler online free,execute python online,python code runner,run python code online free";

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
  mainHeading: "Online Python Compiler & Interpreter",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  relatedTools: [
    ApplicationIds.JS_COMPILER,
    ApplicationIds.TS_COMPILER,
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
    blockData: [
      "Our online Python compiler provides a simple and efficient way to write, run, and test your Python code directly from your web browser. Whether you're a student learning the fundamentals of Python, a developer testing an algorithm, or a data scientist experimenting with a script, our tool eliminates the need for any local setup or installation. Just write your code and execute it instantly.",
    ],
  },
  {
    heading: "Key Features of Our Online Python Interpreter",
    listData: [
      `Instant Execution: Get immediate results for your Python scripts with our fast and reliable online interpreter.`,
      `Browser-Based Convenience: No downloads, no installations. Code in Python from any device with an internet connection, anytime.`,
      `Supports Python 3: Work with the latest features and syntax of the most popular Python version.`,
      `Clean & Simple UI: A user-friendly editor with syntax highlighting makes coding in Python a breeze.`,
      `Ideal for Learning: Perfect for beginners to practice Python syntax, data structures, and algorithms without environment setup hassles.`,
      `Quick Prototyping: A great tool for professionals to quickly test code snippets, functions, or ideas.`,
      `Secure & Isolated: Your code is executed in a secure, sandboxed environment to ensure safety and privacy.`,
    ],
  },
  {
    heading: "How to Run Python Code Online",
    listData: [
      `Write Code: Type or paste your Python code into the editor.`,
      `Click "Run": Press the run button to execute your code on our server.`,
      `See Output: View the program's output, including any print statements or error messages, in the results panel.`,
      `Iterate & Improve: Modify your code and run it again. It's that simple to test and debug.`,
    ],
  },
  {
    blockData: [
      "Ready to start coding? Use our free online Python compiler now and bring your ideas to life with the power and simplicity of Python.",
    ],
  },
];
