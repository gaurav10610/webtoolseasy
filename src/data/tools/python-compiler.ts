import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";

const navigationUrl = "/tools/python-compiler";
const pageTitle = "Online Python Compiler - Run Python Code Free";
const pageDescription =
  "Free online Python compiler & interpreter. Write, run, and test Python 3 code in your browser instantly. No setup required.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/python-compiler.png`;

const keywords =
  "online python compiler, python compiler online, run python online, python interpreter online, online python editor, execute python online, python code runner, free python compiler, python in browser, online python ide, python sandbox, test python code online, python 3 compiler";

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
