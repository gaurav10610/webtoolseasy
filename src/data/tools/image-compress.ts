import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";

const navigationUrl = "/tools/image-compress";
const pageTitle = "Free Image Compressor: Reduce Image File Size";
const pageDescription =
  "Compress your images for free with our online image compressor. Reduce image file size without losing quality, perfect for websites, social media, and more.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/image-compressor.png`;

const keywords =
  "free image compressor,online image compressor,reduce image file size,optimize images for web,share images online,compress JPEG images,compress PNG images,compress GIF images,compress BMP images,image compression,image optimization,image resizer,image optimizer,web-optimized images,picture compressor,pic compressor,photo size reducer,reduce resolution of image";

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
