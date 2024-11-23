import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";

const navigationUrl = "/tools/json-viewer";
const pageTitle = "Free Online JSON Viewer: View Your JSON in a Tree Structure";
const pageDescription =
  "View your JSON data in a tree structure with our free online JSON viewer tool. No download required, no sign-up required.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/json-viewer.png`;

const keywords =
  "online JSON viewer,view JSON data,JSON tree structure,JSON data tree,JSON data viewer,JSON viewer tool,free JSON viewer,JSON beautifier,expand and collapse,search JSON data";

export const metadata: Metadata = {
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
  mainHeading: "Free Online JSON Viewer: View Your JSON in a Tree Structure",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  icons: [],
  relatedTools: [
    ApplicationIds.JSON_FORMATTER,
    ApplicationIds.JS_FORMATTER,
    ApplicationIds.HTML_FORMATTER,
    ApplicationIds.CSS_FORMATTER,
  ],
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "What is a JSON Viewer?",
    blockData: [
      "A JSON viewer is a tool that allows you to view JSON data in a human-readable format. JSON viewers typically display JSON data in a tree structure, which makes it easier to read and understand.",
    ],
  },
  {
    heading: "Why Use a JSON Viewer?",
    listData: [
      "To make JSON data more readable. JSON data is often stored in a single line of text, which can make it difficult to read and understand. A JSON viewer can display JSON data in a tree structure, which makes it much easier to read and understand.",
      "To debug JSON data. If you are having trouble with your JSON data, a JSON viewer can help you to identify the problem. JSON viewers typically display error messages and warnings, which can help you to fix the problem.",
      "To learn more about JSON. JSON is a powerful data format, but it can be difficult to learn. A JSON viewer can help you to learn more about JSON by displaying the data in a visual format.",
    ],
  },
  {
    heading: "Features of Our Online JSON Viewer Tool",
    listData: [
      "Free to use. No need to pay or sign up for an account.",
      "No download required. View your JSON data directly from your web browser.",
      "Supports all JSON features. Our JSON viewer supports all the features of the JSON language, including JSON5 and JSON Schema.",
      'Easy to use. Simply paste your JSON data into the editor and click the "View JSON" button.',
      "Customizable settings. You can customize the settings of our JSON viewer to match your personal preferences.",
    ],
  },
  {
    heading: "How to Use Our Online JSON Viewer Tool",
    listData: [
      "Go to our website and paste your JSON data into the editor.",
      'Click the "View JSON" button.',
      "View your JSON data in a tree structure in the sidebar.",
      "Expand and collapse the nodes of the tree structure to view the data in more detail.",
    ],
  },
  {
    heading: "Tips for Using a JSON Viewer",
    listData: [
      "Use a JSON beautifier and formatter to format your JSON data before you view it in a JSON viewer. This will make it easier to read and understand your JSON data.",
      "Use the expand and collapse features of the tree structure to view your JSON data in more detail.",
      "Use the search feature of the JSON viewer to search for specific values in your JSON data.",
    ],
  },
  {
    blockData: [
      "Our free online JSON viewer tool is a great way to view your JSON data in a tree structure. It is easy to use and supports all the features of the JSON language. With our JSON viewer, you can easily read and understand your JSON data, debug problems, and learn more about the JSON language.",
    ],
  },
];
