import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";

const navigationUrl = "/tools/base64-encode";
const pageTitle = "File to Base64 Encoder: Convert Any File to Base64";
const pageDescription =
  "Convert any file to Base64 with ease with our free online file to the Base64 encoder tool. Image, Text, PDF or File to Base64.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/base64-encode.png`;

const keywords =
  "online file to Base64 encoder,convert file to Base64,file to Base64 encoder tool,Base64 encoding,Base64 decoding,Base64 secure,Base64 transmission,Base64 storage,free file to Base64 encoder,no download required,supports all file formats,easy to use,customizable settings,Base64 encoding scheme,store encoded data securely,image to Base64,text to Base64,pdf to Base64";

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
    "Free Online File to Base64 Encoder: Convert Image, Text, PDF and File to Base64",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  icons: [],
  relatedTools: [ApplicationIds.BASE64_DECODE],
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "What is Base64 Encoding?",
    blockData: [
      "Base64 encoding is a way to convert binary data into a string of ASCII characters. This is useful for storing and transmitting binary data in text-based formats, such as email or XML.",
    ],
  },
  {
    heading: "Why Use a File to Base64 Encoder?",
    listData: [
      "To store binary files in text-based formats. Base64 encoding allows you to store binary files in text-based formats, such as email or XML. This makes it easier to store and transmit binary files.",
      "To transmit binary files over networks. Base64 encoding can be used to transmit binary files over networks that do not support binary data. For example, you can use Base64 encoding to transmit binary files over email.",
      "To secure binary files. Base64 encoding can be used to secure binary files by making them more difficult to read and understand. For example, you can use Base64 encoding to secure passwords or other sensitive data.",
    ],
  },
  {
    heading: "Features of Our Online File to Base64 Encoder Tool",
    listData: [
      "Free to use. No need to pay or sign up for an account.",
      "No download required. Convert your files to Base64 directly from your web browser.",
      "Supports all file formats. Our encoder supports all file formats, including text, images, videos, and audio.",
      'Easy to use. Simply select your file and click the "Encode" button.',
      "Customizable settings. You can customize the settings of our encoder to match your personal preferences.",
    ],
  },
  {
    heading: "How to Use Our Online File to Base64 Encoder Tool",
    listData: [
      "Go to our website and select the file you want to encode.",
      'Click the "Encode" button.',
      "View your encoded data in the sidebar.",
      "Copy and paste your encoded data into your project.",
    ],
  },
  {
    heading: "Tips for Using a File to Base64 Encoder",
    listData: [
      "Choose a secure file to Base64 encoder. Make sure to choose a file to Base64 encoder that is secure and that will not leak your data.",
      "Use a consistent encoding scheme. Choose a Base64 encoding scheme and use it consistently throughout your project. This will make it easier to decode your data later.",
      "Store your encoded data securely. Once you have encoded your data, make sure to store it securely. Encoded data is still vulnerable to attack, so it is important to store it securely.",
    ],
  },
  {
    blockData: [
      "Our free online file to Base64 encoder tool is a great way to convert any file to Base64 with ease. It is easy to use and supports all file formats. With our encoder, you can easily store, transmit, and secure your binary files.",
    ],
  },
];
