import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";

const navigationUrl = "/tools/javascript-editor";
const pageTitle = "Online JavaScript Editor: Write and Edit JavaScript Code";
const pageDescription =
  "Write, edit, and run JavaScript code directly from your browser with our free online JavaScript editor. Create interactive web pages with ease.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/js-editor.png`;

const keywords =
  "online JavaScript editor,write JavaScript code,edit JavaScript code,run JavaScript code,free JavaScript editor,supports all JavaScript elements and attributes,syntax highlighting,code completion,error checking,live previews,code sharing,tips for using an online JavaScript editor,test your code before publishing,online js editor,js online editor,javascript ide online,js ide online,java script online editor,javascript compile online";

export const metadata: Metadata = {
  alternates: {
    canonical: `${process.env.HOSTNAME}${navigationUrl}`,
  },
  title: pageTitle,
  description: pageDescription,
  keywords,
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
    heading: "What is an Online JavaScript Editor?",
    blockData: [
      "An online JavaScript editor is a web-based tool that allows you to write, edit, and run JavaScript code directly from your browser. This makes it easy to create and publish interactive web pages without having to download or install any software.",
    ],
  },
  {
    heading: "Why Use an Online JavaScript Editor?",
    listData: [
      `Convenience. Online JavaScript editors are convenient and easy to use. You can access them from any device with a web browser, and you don't need to install any software.`,
      "Collaboration. Online JavaScript editors make it easy to collaborate with others on web development projects. You can share your code with others and work on the same project together in real time.",
      "Features. Online JavaScript editors offer a variety of features to help you write and edit JavaScript code, including syntax highlighting, code completion, error checking, and live previews.",
    ],
  },
  {
    heading: "Features of Our Online JavaScript Editor",
    listData: [
      "Free to use. No need to pay or sign up for an account.",
      "No download required. Write, edit, and run JavaScript code directly from your browser.",
      "Supports all JavaScript elements and attributes. Our editor supports all JavaScript elements and attributes, so you can create any type of interactive web page you want.",
      "Syntax highlighting and code completion. Our editor provides syntax highlighting and code completion to help you write and edit JavaScript code more efficiently.",
      "Error checking and live previews. Our editor checks your code for errors and warnings to help you avoid problems, and it provides live previews of your web page so you can see how your changes look as you make them.",
      `Share and Collaborate: Share your code with ease using the generated URL, enabling seamless collaboration and knowledge sharing.`,
    ],
  },
  {
    heading: "How to Use Our Online JavaScript Editor",
    listData: [
      'Go to our website and click the "New File" button.',
      'Enter a name for your file and click the "Create" button.',
      "Start writing your JavaScript code.",
      'To preview your web page, click the "Preview" button.',
      'To save your changes, click the "Save" button.',
      'To share your code with others, click the "Share" button and copy the link.',
    ],
  },
  {
    heading: "Tips for Using an Online JavaScript Editor",
    listData: [
      "Use a high-quality online JavaScript editor. Not all online JavaScript editors are created equal. Some editors may not support all JavaScript elements and attributes, or they may not provide accurate error checking. Make sure to choose a high-quality online JavaScript editor to ensure that you have a positive experience.",
      "Use the features of your editor. Most online JavaScript editors offer a variety of features to help you write and edit JavaScript code more efficiently. Be sure to explore the features of your editor and learn how to use them to your advantage.",
      "Test your code before publishing it. Once you have finished writing your JavaScript code, be sure to test it before publishing it. You can do this by previewing your web page in your browser or by uploading it to a web server.",
    ],
  },
  {
    blockData: [
      "Our free online JavaScript editor is a great way to write, edit, and run JavaScript code directly from your browser. It is easy to use and offers a variety of features to help you create and publish interactive web pages with ease.",
    ],
  },
];
