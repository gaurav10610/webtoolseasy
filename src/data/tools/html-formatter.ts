import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";

const navigationUrl = "/tools/html-formatter";
const pageTitle = "HTML Formatter Online Free - Beautify HTML Code";
const pageDescription =
  "Free HTML formatter and beautifier. Clean, indent, and format HTML code online. Improve readability and code structure.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/html-format.png`;

const keywords =
  "html formatter,html beautifier,format html online,html code formatter,beautify html,html prettifier,clean html code,indent html,html tool";

export const metadata: Metadata = {
  alternates: {
    canonical: `${process.env.HOSTNAME}${navigationUrl}`,
  },
  title: pageTitle,
  description: pageDescription,
  keywords,
  metadataBase: new URL(process.env.HOSTNAME!),
  icons: "/favicon.png",
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
    "Free Online HTML Beautifier and Formatter: Beautify and Format HTML Code",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  icons: [],
  relatedTools: [
    ApplicationIds.JS_FORMATTER,
    ApplicationIds.JSON_FORMATTER,
    ApplicationIds.JSON_VIEWER,
    ApplicationIds.CSS_FORMATTER,
  ],
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "What is an HTML Beautifier?",
    blockData: [
      "An HTML beautifier is a tool that takes your HTML code and formats it in a consistent and readable style. This can make your code easier to read, understand, and maintain.",
    ],
  },
  {
    heading: "Why Use an HTML Beautifier?",
    listData: [
      "To improve the readability of your code. Well-formatted code is easier to read and understand, which can help you to write better code and to debug your code more easily.",
      "To make your code more consistent. An HTML beautifier can help you to format your code in a consistent style, which can make your code more readable and maintainable.",
      "To follow code style guidelines. Many companies have code style guidelines that they require their developers to follow. An HTML beautifier can help you to format your code in accordance with these guidelines.",
    ],
  },
  {
    heading: "Features of Our Online HTML Beautifier Tool",
    listData: [
      "Free to use. No need to pay or sign up for an account.",
      "No download required. Beautify your HTML code directly from your web browser.",
      "Supports all HTML features. Our beautifier supports all the features of the HTML language, including HTML5 and HTML6.",
      'Easy to use. Simply paste your HTML code into the editor and click the "Beautify" button.',
      "Customizable settings. You can customize the settings of our beautifier to match your personal preferences.",
    ],
  },
  {
    heading: "How to Use Our Online HTML Beautifier Tool",
    listData: [
      "Go to our website and paste your HTML code into the editor.",
      'Click the "Beautify" button.',
      "View your beautified HTML code in the sidebar.",
      "Copy and paste your beautified HTML code into your project.",
    ],
  },
  {
    heading: "Tips for Using an HTML Beautifier",
    listData: [
      "Use a consistent code style. Choose a code style and use it consistently throughout your project. This will make your code more readable and maintainable.",
      "Format your code before you commit it to a repository. This will help to ensure that your code is readable and maintainable for other developers.",
      "Use an HTML beautifier to check for formatting errors. An HTML beautifier can help you to identify and fix formatting errors in your code.",
    ],
  },
  {
    blockData: [
      "Our free online HTML beautifier tool is a great way to beautify your HTML code with ease. It is easy to use and supports all the features of the HTML language. With our beautifier, you can improve the readability, consistency, and maintainability of your HTML code.",
    ],
  },
];
