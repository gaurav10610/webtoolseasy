import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/lorem-ipsum-generator";
const pageTitle = "Lorem Ipsum Generator - Dummy Text Placeholder Tool";
const pageDescription =
  "Generate Lorem Ipsum dummy text instantly. Create placeholder content for designs, mockups, and websites. Free Lorem Ipsum generator online.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/lorem-ipsum-generator.png`;

const keywords =
  "lorem ipsum generator,dummy text generator,placeholder text,lorem ipsum,fake text generator,text generator,sample text,lorem ipsum dolor";

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
  mainHeading: "Lorem Ipsum Generator: Generate Dummy Placeholder Text Online",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  relatedTools: [
    ApplicationIds.TEXT_EDITOR,
    ApplicationIds.WORD_COUNTER,
    ApplicationIds.CASE_CONVERETR,
  ],
  structuredData: createToolStructuredData({
    pageUrl: "lorem-ipsum-generator",
    pageTitle,
    mainHeading:
      "Lorem Ipsum Generator: Generate Dummy Placeholder Text Online",
    keywords: keywords.split(",").map((word) => word.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "What is Lorem Ipsum?",
    blockData: [
      "Lorem Ipsum is dummy placeholder text used in the printing and typesetting industry. Our Lorem Ipsum generator creates realistic sample text for design mockups, website templates, and content layouts.",
      "Dating back to the 1500s, Lorem Ipsum has become the standard dummy text for designers and developers. Generate paragraphs, words, or sentences of Lorem Ipsum text instantly with our free online tool.",
    ],
  },
  {
    heading: "How to Use the Lorem Ipsum Generator",
    blockData: [
      "Select the number of paragraphs, words, or sentences you need. Click 'Generate' to create Lorem Ipsum text instantly. Copy the generated text to your clipboard with one click.",
      "Choose to start with 'Lorem ipsum dolor sit amet' for traditional output, or generate random placeholder text. Perfect for web designers, graphic designers, and content creators.",
    ],
  },
  {
    heading: "Why Use Lorem Ipsum Text?",
    blockData: [
      "Lorem Ipsum helps visualize how real content will look in your design without being distracted by readable text. It maintains a natural word distribution similar to English, making layouts appear realistic.",
      "Use Lorem Ipsum for website mockups, print designs, presentations, and prototype testing. The text is meaningless Latin that won't distract from your design elements.",
    ],
  },
  {
    heading: "Features of Our Lorem Ipsum Generator",
    blockData: [
      "Generate custom amounts of Lorem Ipsum text - choose paragraphs, words, or sentences. Our tool creates traditional Lorem Ipsum starting with 'Lorem ipsum dolor sit amet' or random variations.",
      "Copy generated text instantly to clipboard. Free to use with no registration required. Create unlimited placeholder text for all your design projects.",
    ],
  },
  {
    heading: "Lorem Ipsum for Web Design",
    blockData: [
      "Web designers use Lorem Ipsum to preview layouts before final content is ready. It helps demonstrate font choices, spacing, and overall design aesthetics without content distractions.",
      "Perfect for creating website templates, WordPress themes, landing pages, and web applications. Generate the exact amount of text you need for any design element.",
    ],
  },
];
