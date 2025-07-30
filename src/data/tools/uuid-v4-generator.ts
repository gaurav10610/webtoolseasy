import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";

const navigationUrl = "/tools/uuid-v4-generator";
const pageTitle = "UUID Generator Online Free - Generate UUID v4 Bulk";
const pageDescription =
  "Free UUID v4 generator online. Create single or bulk UUIDs instantly. Copy, download multiple unique identifiers for development.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/uuid-v4-generator.png`;

const keywords =
  "uuid generator,uuid v4 generator,generate uuid online,uuid creator,unique identifier generator,bulk uuid,random uuid,guid generator,uuid tool";

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
    "UUID v4 Generator Tool - Generate Single or Bulk Universally Unique Identifiers (UUIDs) Online for Free",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  icons: [],
  relatedTools: [
    ApplicationIds.JWT_DECODER,
    ApplicationIds.UUID_VERSION1_GENERATOR,
    ApplicationIds.GUID_GENERATOR,
  ],
};

export const descriptionData: DescriptionBlock[] = [
  {
    blockData: [
      "Universally unique identifiers (UUIDs) are also known as globally unique identifiers (GUIDs). They are 128-bit numbers that are used to identify information in computer systems. UUIDs are generated using a random number generator and are designed to be unique.",
      "UUIDs are used in a variety of applications, such as database identifiers, session identifiers, and file identifiers. They are also used in distributed systems to ensure that all systems are using the same unique identifier for a given piece of information.",
      'Our free online UUID v4 generator tool makes it easy to generate UUIDs, whether you need one or many. To use the tool, simply enter the number of UUIDs you need in the text box and click the "Generate" button. The tool will instantly generate a list of UUID v4s and show it to you. You can then copy and paste the list of UUIDs into your application.',
    ],
  },
  {
    heading:
      "Here are some of the benefits of using our free online UUID v4 generator tool:",
    listData: [
      `It's quick and easy to use.`,
      `It's completely free.`,
      `It can generate single or bulk UUID v4s.`,
      `It generates random and unique UUID v4s.`,
      `It's perfect for developers, testers, and anyone else who needs to generate UUIDs.`,
      `It's great for learning more about UUIDs and how they work.`,
    ],
  },
  {
    heading:
      "Here are some examples of how you can use our free online UUID v4 generator tool:",
    listData: [
      "Developers can use the tool to generate UUIDs for database identifiers, session identifiers, and file identifiers.",
      "Testers can use the tool to generate UUIDs for test data.",
      "Anyone can use the tool to generate UUIDs for any reason.",
    ],
  },
  {
    blockData: [
      "No matter what your needs are, our free online UUID v4 generator tool is a valuable resource. Try it today and see how easy it is to use!",
    ],
  },
  {
    heading: "What is a UUID v4?",
    blockData: [
      "A UUID v4 is a version 4 UUID, which is generated using a random number generator. UUID v4s are the most commonly used type of UUID and are considered to be the most secure.",
    ],
  },
  {
    heading: "How to use our UUID v4 generator tool:",
    blockData: [
      'To use our UUID v4 generator tool, simply enter the number of UUIDs you need in the text box and click the "Generate" button. The tool will instantly generate a list of UUID v4s and show it to you. You can then copy and paste the list of UUIDs into your application.',
    ],
  },
  {
    heading: "Tips for using our UUID v4 generator tool:",
    listData: [
      "You can generate as many UUID v4s as you need.",
      "You can also use our UUID v4 generator tool to generate UUID v4s in different formats, such as hexadecimal, base64, and URL safe.",
    ],
  },
  {
    blockData: [
      "We hope you find our free online UUID v4 generator tool helpful!",
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
