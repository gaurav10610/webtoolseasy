import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";

const navigationUrl = "/tools/guid-generator";
const pageTitle = "GUID Generator Online - Generate Single or Bulk GUIDs";
const pageDescription =
  "Generate globally unique identifiers (GUIDs) instantly. Create single or bulk GUIDs for your development projects. Copy and download results easily.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/guid-generator.png`;

const keywords =
  "guid generator,guid generator online,uuid generator,globally unique identifier,generate guid,bulk guid generator,unique id generator";

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
    "Online GUID Generator - Generate Single or Bulk Globally Unique Identifiers (GUIDs)",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  icons: [],
  relatedTools: [
    ApplicationIds.JWT_DECODER,
    ApplicationIds.UUID_VERSION1_GENERATOR,
    ApplicationIds.UUID_VERSION4_GENERATOR,
  ],
};

export const descriptionData: DescriptionBlock[] = [
  {
    blockData: [
      "Globally unique identifiers (GUIDs) are also known as universally unique identifiers (UUIDs). They are 128-bit numbers that are used to identify information in computer systems. GUIDs are generated using a variety of methods, but all GUIDs are designed to be unique.",
      "GUIDs are used in a variety of applications, such as database identifiers, session identifiers, and file identifiers. They are also used in some security applications, such as encryption and authentication.",
      'Our free online GUID generator tool makes it easy to generate GUIDs, whether you need one or many. To use the tool, simply enter the number of GUIDs you need in the text box and click the "Generate" button. The tool will instantly generate a list of GUIDs and show it to you. You can then copy and paste the list of GUIDs into your application.',
    ],
  },
  {
    heading:
      "Here are some of the benefits of using our free online GUID generator tool:",
    listData: [
      `It's quick and easy to use.`,
      `It's completely free.`,
      `It can generate single or bulk GUIDs.`,
      `It generates random and unique GUIDs.`,
      `It's perfect for developers, testers, and anyone else who needs to generate GUIDs.`,
      `It's great for learning more about GUIDs and how they work.`,
    ],
  },
  {
    heading:
      "Here are some examples of how you can use our free online GUID generator tool:",
    listData: [
      "Developers can use the tool to generate GUIDs for database identifiers, session identifiers, and file identifiers.",
      "Testers can use the tool to generate GUIDs for test data.",
      "Anyone can use the tool to generate GUIDs for any reason.",
    ],
  },
  {
    blockData: [
      "No matter what your needs are, our free online GUID generator tool is a valuable resource. Try it today and see how easy it is to use!",
    ],
  },
  {
    heading: "What is a GUID?",
    blockData: [
      "A GUID is a globally unique identifier, also known as a universally unique identifier (UUID). It is a 128-bit number that is used to identify information in computer systems. GUIDs are generated using a variety of methods, but all GUIDs are designed to be unique.",
    ],
  },
  {
    heading: "How to use our GUID generator tool:",
    blockData: [
      'To use our GUID generator tool, simply enter the number of GUIDs you need in the text box and click the "Generate" button. The tool will instantly generate a list of GUIDs and show it to you. You can then copy and paste the list of GUIDs into your application.',
    ],
  },
  {
    heading: "Tips for using our GUID generator tool:",
    listData: [
      "You can generate as many GUIDs as you need.",
      "You can also use our GUID generator tool to generate GUIDs in different formats, such as hexadecimal, base64, and URL safe.",
    ],
  },
  {
    blockData: [
      "We hope you find our free online GUID generator tool helpful!",
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
