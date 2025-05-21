import { ApplicationConfig } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";

const navigationUrl = "/tools/image-to-text";
const pageTitle = "Image to Text (Extract Text from Image)";
const pageDescription =
  "Effortlessly extract text from images with our free online Image to Text converter. Our OCR tool accurately converts JPG, PNG, and other image formats into editable text. No registration needed, fast and easy to use for all your text extraction needs. Convert pictures to text, photos to text, and scanned documents into searchable content instantly.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/image-to-text.png`;

const keywords =
  "image to text, extract text from image, OCR, online OCR, free OCR, convert image to text, JPG to text, PNG to text, photo to text, picture to text, scan to text, text extractor, online text extractor, free text extractor";

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
    "Free Online Image to Text Converter: Extract Text from Images Instantly",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  icons: [],
  relatedTools: [],
};

export const descriptionData: DescriptionBlock[] = [];
