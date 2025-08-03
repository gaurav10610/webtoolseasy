import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";

const navigationUrl = "/tools/css-formatter";
const pageTitle = "CSS Formatter Online - Beautify & Format CSS Code";
const pageDescription =
  "Format and beautify CSS code online for free. Clean, indent, and organize CSS stylesheets with proper structure. Improve code readability instantly.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/css-format.png`;

const keywords =
  "css formatter,css beautifier,format css online,css code formatter,beautify css,css prettifier,clean css code,indent css";

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
    "Free Online CSS Beautifier and Formatter: Beautify and Format Your CSS Code",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  icons: [],
  relatedTools: [
    ApplicationIds.JSON_FORMATTER,
    ApplicationIds.JSON_VIEWER,
    ApplicationIds.JS_FORMATTER,
    ApplicationIds.HTML_FORMATTER,
  ],
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "What is CSS Formatting and Beautification?",
    blockData: [
      "CSS formatting transforms minified or unorganized CSS code into clean, readable stylesheets with proper indentation and spacing. Our free online CSS formatter helps developers beautify CSS code, making it easier to read, debug, and maintain across web projects.",
      "Well-formatted CSS improves code organization, reduces development time, and ensures consistent styling standards. Whether you're working with compressed CSS files, legacy stylesheets, or generated code, our tool instantly beautifies your CSS structure.",
    ],
  },
  {
    heading: "How to Use Our CSS Formatter Tool",
    listData: [
      "Paste your CSS code into the input editor",
      "Click 'Format' to automatically beautify your stylesheet",
      "Choose indentation style (spaces or tabs) and size",
      "Copy the formatted CSS or download as a .css file",
      "Preview changes with syntax highlighting",
    ],
  },
  {
    heading: "Key Features of Our CSS Beautifier",
    listData: [
      "Smart indentation with customizable spacing options",
      "Proper selector and property alignment",
      "Preserves CSS functionality while improving readability",
      "Supports CSS3, Flexbox, Grid, and modern CSS features",
      "Real-time formatting with instant preview",
      "Handles nested CSS and media queries correctly",
    ],
  },
  {
    heading: "Benefits for Web Developers",
    blockData: [
      "**Code Maintenance**: Easily modify complex stylesheets and cascade rules",
      "**Team Collaboration**: Maintain consistent CSS formatting across development teams",
      "**Debugging**: Quickly identify CSS syntax errors and specificity issues",
      "**Performance**: Clean CSS helps with file compression and caching",
      "**Learning**: Understand CSS structure and best practices through formatted examples",
    ],
  },
];
