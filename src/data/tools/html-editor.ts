import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";

const navigationUrl = "/tools/html-editor";
const pageTitle = "Online HTML and CSS Editor with Real-Time Preview";
const pageDescription =
  "Write, edit, and run HTML and CSS code directly from your browser with our free online HTML and CSS editor. Create responsive web pages with ease.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/html-editor.png`;

const keywords =
  "online HTML and CSS editor,write HTML code,edit HTML code,run HTML code,write CSS code,edit CSS code,run CSS code,free HTML and CSS editor,supports all HTML and CSS elements and attributes,syntax highlighting,code completion,error checking,live previews,tips for using an online HTML and CSS editor,test your code before publishing,html composer,html editor in html,html ide online,online webpage editor";

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
  mainHeading: "Online HTML and CSS Editor with Real-Time Preview",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  icons: [],
  relatedTools: [ApplicationIds.JS_EDITOR],
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "What is an Online HTML and CSS Editor?",
    blockData: [
      "An online HTML and CSS editor is a web-based tool that allows you to write, edit, and run HTML and CSS code directly from your browser. This makes it easy to create and publish responsive web pages without having to download or install any software.",
    ],
  },
  {
    heading: "Why Use an Online HTML and CSS Editor?",
    listData: [
      `Convenience. Online HTML and CSS editors are convenient and easy to use. You can access them from any device with a web browser, and you don't need to install any software.`,
      "Collaboration. Online HTML and CSS editors make it easy to collaborate with others on web development projects. You can share your code with others and work on the same project together in real time.",
      "Features. Online HTML and CSS editors offer a variety of features to help you write and edit HTML and CSS code, including syntax highlighting, code completion, error checking, and live previews.",
    ],
  },
  {
    heading: "Features of Our Online HTML and CSS Editor",
    listData: [
      "Free to use. No need to pay or sign up for an account.",
      "No download required. Write, edit, and run HTML and CSS code directly from your browser.",
      "Supports all HTML and CSS elements and attributes. Our editor supports all HTML and CSS elements and attributes, so you can create any type of responsive web page you want.",
      "Syntax highlighting and code completion. Our editor provides syntax highlighting and code completion to help you write and edit HTML and CSS code more efficiently.",
      "Error checking and live previews. Our editor checks your code for errors and warnings to help you avoid problems, and it provides live previews of your web page so you can see how your changes look as you make them.,",
      "Stores user state in browser cache meaning your HTML and CSS code will not be lost even if you refresh/reload and reopen the HTML editor browser window",
      `Share and Collaborate: Share your code with ease using the generated URL, enabling seamless collaboration and knowledge sharing.`,
    ],
  },
  {
    heading: "How to Use Our Online HTML and CSS Editor",
    listData: [
      'Go to our website and click the "New File" button.',
      'Enter a name for your file and click the "Create" button.',
      "Select the HTML or CSS tab to start writing your code.",
      'To preview your web page, click the "Preview" button.',
      'To save your changes, click the "Save" button.',
      'To share your code with others, click the "Share" button and copy the link.',
    ],
  },
  {
    heading: "Tips for Using an Online HTML and CSS Editor",
    listData: [
      "Use a high-quality online HTML and CSS editor. Not all online HTML and CSS editors are created equal. Some editors may not support all HTML and CSS elements and attributes, or they may not provide accurate error checking. Make sure to choose a high-quality online HTML and CSS editor to ensure that you have a positive experience.",
      "Use the features of your editor. Most online HTML and CSS editors offer a variety of features to help you write and edit HTML and CSS code more efficiently. Be sure to explore the features of your editor and learn how to use them to your advantage.",
      "Test your code before publishing it. Once you have finished writing your HTML and CSS code, be sure to test it before publishing it. You can do this by previewing your web page in your browser or by uploading it to a web server.",
    ],
  },
  {
    blockData: [
      "Our free online HTML and CSS editor is a great way to write, edit, and run HTML and CSS code directly from your browser. It is easy to use and offers a variety of features to help you create and publish responsive web pages with ease.",
    ],
  },
];
