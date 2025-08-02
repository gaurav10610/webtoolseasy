import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";

const navigationUrl = "/tools/javascript-formatter";
const pageTitle = "JavaScript Beautifier and Formatter: Beautify and Format JS";
const pageDescription =
  "Beautify and format your JavaScript code with ease with our free online JavaScript beautifier and formatter tool. No download required, no sign-up required.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/js-format.png`;

const keywords =
  "online JavaScript beautifier and formatter,beautify JavaScript code,format JavaScript code,JavaScript beautifier and formatter tool,JavaScript code formatter,JavaScript code style,improve JavaScript code readability,make JavaScript code more consistent,follow JavaScript code style guidelines,free JavaScript beautifier and formatter,no download required,supports all JavaScript features,JavaScript code formatting errors";

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
      { url: "/favicon.png", type: "image/png" },
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
    "Free Online JavaScript Beautifier and Formatter: Beautify and Format Your JavaScript Code with Ease",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  icons: [],
  relatedTools: [
    ApplicationIds.CSS_FORMATTER,
    ApplicationIds.HTML_FORMATTER,
    ApplicationIds.JSON_FORMATTER,
    ApplicationIds.JSON_VIEWER,
  ],
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "What is a JavaScript Beautifier and Formatter?",
    blockData: [
      "A JavaScript beautifier and formatter is a tool that takes your JavaScript code and formats it in a consistent and readable style. This can make your code easier to read, understand, and maintain.",
    ],
  },
  {
    heading: "Why Use a JavaScript Beautifier and Formatter?",
    listData: [
      "To improve the readability of your code. Well-formatted code is easier to read and understand, which can help you to write better code and to debug your code more easily.",
      "To make your code more consistent. A JavaScript beautifier and formatter can help you to format your code in a consistent style, which can make your code more readable and maintainable.",
      "To follow code style guidelines. Many companies have code style guidelines that they require their developers to follow. A JavaScript beautifier and formatter can help you to format your code in accordance with these guidelines.",
    ],
  },
  {
    heading: "Features of Our Online JavaScript Beautifier and Formatter Tool",
    listData: [
      "Free to use. No need to pay or sign up for an account.",
      "No download required. Beautify and format your JavaScript code directly from your web browser.",
      "Supports all JavaScript features. Our beautifier and formatter supports all the features of the JavaScript language, including ES6 and ES7.",
      'Easy to use. Simply paste your JavaScript code into the editor and click the "Beautify and Format" button.',
      "Customizable settings. You can customize the settings of our beautifier and formatter to match your personal preferences.",
    ],
  },
  {
    heading: "How to Use Our Online JavaScript Beautifier and Formatter Tool",
    listData: [
      "Go to our website and paste your JavaScript code into the editor.",
      'Click the "Beautify and Format" button.',
      "View your beautified and formatted JavaScript code in the sidebar.",
      "Copy and paste your beautified and formatted JavaScript code into your project.",
    ],
  },
  {
    heading: "Tips for Using a JavaScript Beautifier and Formatter",
    listData: [
      "Use a consistent code style. Choose a code style and use it consistently throughout your project. This will make your code more readable and maintainable.",
      "Format your code before you commit it to a repository. This will help to ensure that your code is readable and maintainable for other developers.",
      "Use a JavaScript beautifier and formatter to check for formatting errors. A JavaScript beautifier and formatter can help you to identify and fix formatting errors in your code.",
    ],
  },
  {
    blockData: [
      "Our free online JavaScript beautifier and formatter tool is a great way to beautify and format your JavaScript code with ease. It is easy to use and supports all the features of the JavaScript language. With our beautifier and formatter, you can improve the readability, consistency, and maintainability of your JavaScript code.",
    ],
  },
];
