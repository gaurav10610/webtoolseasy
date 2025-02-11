import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";

const navigationUrl = "/tools/base64-decode";
const pageTitle = "Base64 to File Decoder: Convert Base64 to Any File Format";
const pageDescription =
  "Convert Base64 to any file format with ease with our free online Base64 to file decoder tool. Decode Base64 to Image, Text, PDF and File.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/base64-decode.png`;

const keywords =
  "online Base64 to file decoder,decode Base64 to file,Base64 to file decoder tool,Base64 decoding,Base64 encoding,Base64 secure,Base64 transmission,Base64 storage,free Base64 to file decoder,no download required,supports all Base64 encoding schemes,supports all file formats,easy to use,Base64 decoding scheme,store decoded files securely, Base64 to image, Base64 to text, Base64 to pdf";

export const metadata: Metadata = {
  alternates: {
    canonical: `${process.env.HOSTNAME}${navigationUrl}`,
  },
  title: pageTitle,
  description: pageDescription,
  metadataBase: new URL(process.env.HOSTNAME!),
  icons: "/favicon.png",
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
    "Free Online Base64 to File Decoder: Convert Base64 to Image, Text, PDF and File",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  icons: [],
  relatedTools: [ApplicationIds.BASE64_ENCODE],
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "What is Base64 Decoding?",
    blockData: [
      "Base64 decoding is the process of converting a Base64 encoded string back to binary data. Base64 encoding is a way to convert binary data into a string of ASCII characters. This is useful for storing and transmitting binary data in text-based formats, such as email or XML.",
    ],
  },
  {
    heading: "Why Use a Base64 to File Decoder?",
    listData: [
      "To decode Base64 encoded files. Base64 encoded files are often used to store and transmit binary files in text-based formats. A Base64 to file decoder can be used to decode these files back to their original binary form.",
      "To debug Base64 encoded files. If you are having trouble with a Base64 encoded file, a Base64 to file decoder can be used to debug the file. This can help you to identify and fix any problems with the file.",
      "To learn more about Base64 encoding. Base64 encoding is a powerful data format, but it can be difficult to learn. A Base64 to file decoder can be used to learn more about Base64 encoding by displaying the decoded data in its original binary form.",
    ],
  },
  {
    heading: "Features of Our Online Base64 to File Decoder Tool",
    listData: [
      "Free to use. No need to pay or sign up for an account.",
      "No download required. Decode your Base64 data directly from your web browser.",
      "Supports all Base64 encoding schemes. Our decoder supports all Base64 encoding schemes, including standard Base64, URL-safe Base64, and MIME Base64.",
      "Supports all file formats. Our decoder can decode Base64 encoded data into any file format, including text files, image files, video files, and audio files.",
      'Easy to use. Simply paste your Base64 encoded data into the editor and select the output file format. Then, click the "Decode" button.',
      "Customizable settings. You can customize the settings of our decoder to match your personal preferences.",
    ],
  },
  {
    heading: "How to Use Our Online Base64 to File Decoder Tool",
    listData: [
      "Paste your Base64 encoded data into the editor.",
      'Click the "Decode" button.',
      'Download your decoded file by clicking the "Download" button.',
    ],
  },
  {
    heading: "Tips for Using a Base64 to File Decoder",
    listData: [
      "Choose a secure Base64 to file decoder. Make sure to choose a Base64 to file decoder that is secure and that will not leak your data.",
      "Use a consistent decoding scheme. Choose a Base64 decoding scheme and use it consistently throughout your project. This will make it easier to decode your data later.",
      "Store your decoded files securely. Once you have decoded your files, make sure to store them securely. Decoded files are still vulnerable to attack, so it is important to store them securely.",
    ],
  },
  {
    blockData: [
      "Our free online Base64 to file decoder tool is a great way to convert Base64 to any file format with ease. It is easy to use and supports all Base64 encoding schemes and file formats. With our decoder, you can easily decode Base64 encoded files, debug Base64 encoded files, and learn more about Base64 encoding.",
    ],
  },
];
