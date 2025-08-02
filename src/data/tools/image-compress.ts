import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";

const navigationUrl = "/tools/image-compress";
const pageTitle = "Image Compressor Free - Reduce Photo File Size";
const pageDescription =
  "Free image compressor to reduce file size. Compress JPG, PNG, WEBP images while maintaining quality. Perfect for web optimization.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/image-compressor.png`;

const keywords =
  "image compressor,compress images online,reduce image size,image optimizer,photo compressor,compress jpg,compress png,image compression tool";

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
      { url: "/favicon.png", type: "image/png" },
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
    "Free Online Image Compressor: Compress JPEG, PNG, WEBP & BMP Images",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  icons: [],
  relatedTools: [ApplicationIds.IMAGE_CROPPER],
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "Why Use an Image Compressor?",
    listData: [
      `To improve website performance. Smaller image files load faster, which can improve your website's loading speed and SEO.`,
      "To save storage space. Compressed images take up less space on your computer or server.",
      "To share images online. Many social media platforms and other websites have image size restrictions, so compressing your images can help you share them without any problems.",
    ],
  },
  {
    heading: "Features of Our Free Online Image Compressor",
    listData: [
      "Free to use. No need to pay or sign up for an account.",
      "No download required. Compress your images directly from your web browser.",
      "Supports multiple image formats. Compress JPEG, PNG, WEBP & BMP images.",
      "Reduces image file size without losing quality. Our image compressor uses advanced algorithms to reduce file size without sacrificing quality.",
      'Easy to use. Simply upload your images and click the "Compress" button.',
    ],
  },
  {
    heading: "How to Use Our Free Online Image Compressor",
    listData: [
      'Go to our website and click the "Upload Images" button.',
      "Select the images you want to compress.",
      'Click the "Compress" button.',
      "Download your compressed images.",
    ],
  },
  {
    heading: "Tips for Using an Image Compressor",
    listData: [
      "Choose the right compression level. The higher the compression level, the smaller the file size will be, but the image quality may also decrease. Experiment with different compression levels to find the best balance between file size and quality.",
      "Resize your images before compressing them. This can help to further reduce the file size without sacrificing quality.",
    ],
  },
  {
    blockData: [
      "Our free online image compressor is a great way to reduce image file size without losing quality. It is easy to use and supports multiple image formats. With our image compressor, you can improve website performance, save storage space, and share images online without any problems.",
    ],
  },
];
