import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/uuid-v1-generator";
const pageTitle = "UUID v1 Generator - Generate Time-Based UUIDs";
const pageDescription =
  "Generate UUID v1 identifiers based on MAC address and timestamp. Create single or bulk UUIDs instantly for your development projects and databases.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/uuid-v1-generator.png`;

const keywords =
  "uuid v1 generator,uuid generator online,time-based uuid,mac address uuid,generate uuid,uuid creator,unique identifier generator";

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
  mainHeading:
    "UUID v1 Generator Tool - Generate Single or Bulk Universally Unique Identifiers (UUIDs) Based on MAC Address and Time",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  icons: [],
  relatedTools: [
    ApplicationIds.UUID_VERSION4_GENERATOR,
    ApplicationIds.GUID_GENERATOR,
    ApplicationIds.JWT_DECODER,
  ],
  structuredData: createToolStructuredData({
    pageUrl: "uuid-v1-generator",
    pageTitle,
    mainHeading: "UUID v1 Generator Tool - Generate Single or Bulk Universally Unique Identifiers (UUIDs) Based on MAC Address and Time",
    keywords: keywords.split(",").map((word) => word.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    blockData: [
      "Universally unique identifiers (UUIDs) are also known as globally unique identifiers (GUIDs). They are 128-bit numbers that are used to identify information in computer systems. UUIDs are generated using a variety of methods, but UUID v1s are generated using the MAC address of the computer on which they are generated and the current time.",
      "UUID v1s are often used in applications where it is important to track the origin of data, such as in database systems and distributed systems. They are also used in some security applications, such as encryption and authentication.",
      'Our free online UUID v1 generator tool makes it easy to generate UUID v1s, whether you need one or many. To use the tool, simply enter the number of UUIDs you need in the text box and click the "Generate" button. The tool will instantly generate a list of UUID v1s and show it to you. You can then copy and paste the list of UUIDs into your application.',
    ],
  },
  {
    heading:
      "Here are some of the benefits of using our free online UUID v1 generator tool:",
    listData: [
      `It's quick and easy to use.`,
      `It's completely free.`,
      `It can generate single or bulk UUID v1s.`,
      `It generates random and unique UUID v1s based on MAC address and time.`,
      `It's perfect for developers, testers, and anyone else who needs to generate UUID v1s.`,
      `It's great for learning more about UUID v1s and how they work.`,
    ],
  },
  {
    heading:
      "Here are some examples of how you can use our free online UUID v1 generator tool:",
    listData: [
      "Developers can use the tool to generate UUID v1s for database identifiers, session identifiers, and file identifiers.",
      "Testers can use the tool to generate UUID v1s for test data.",
      "Anyone can use the tool to generate UUID v1s for any reason.",
    ],
  },
  {
    blockData: [
      "No matter what your needs are, our free online UUID v1 generator tool is a valuable resource. Try it today and see how easy it is to use!",
    ],
  },
  {
    heading: "What is a UUID v1?",
    blockData: [
      "A UUID v1 is a version 1 UUID, which is generated using the MAC address of the computer on which it is generated and the current time. UUID v1s are often used in applications where it is important to track the origin of data.",
    ],
  },
  {
    heading: "How to use our UUID v1 generator tool:",
    blockData: [
      'To use our UUID v1 generator tool, simply enter the number of UUIDs you need in the text box and click the "Generate" button. The tool will instantly generate a list of UUID v1s and show it to you. You can then copy and paste the list of UUIDs into your application.',
    ],
  },
  {
    heading: "Tips for using our UUID v1 generator tool:",
    listData: [
      "You can generate as many UUID v1s as you need.",
      "You can also use our UUID v1 generator tool to generate UUID v1s in different formats, such as hexadecimal, base64, and URL safe.",
    ],
  },
  {
    blockData: [
      "We hope you find our free online UUID v1 generator tool helpful!",
    ],
  },
  {
    heading: "References",
    links: [
      {
        displayText: "Read more about UUIDs at Wikipedia",
        url: "https://en.wikipedia.org/wiki/Universally_unique_identifier",
      },
      {
        displayText: "RFC 4122",
        url: "https://www.ietf.org/rfc/rfc4122.txt",
      },
    ],
  },
];
