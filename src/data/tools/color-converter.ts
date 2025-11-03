import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/color-converter";
const pageTitle = "Color Converter - HEX RGB HSL CMYK Converter Online";
const pageDescription =
  "Convert colors between HEX, RGB, HSL, and CMYK formats instantly. Free online color converter with live preview. Perfect for designers and developers.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/color-converter.png`;

const keywords =
  "color converter,hex to rgb,rgb to hex,hsl converter,cmyk converter,color format converter,hex color converter,rgb color picker";

export const metadata: Metadata = {
  alternates: {
    canonical: `${process.env.HOSTNAME}${navigationUrl}`,
  },
  title: pageTitle,
  description: pageDescription,
  keywords,
  metadataBase: new URL(
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://webtoolseasy.com"
  ),
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
  mainHeading: "Color Converter: Convert Between HEX, RGB, HSL, and CMYK",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  relatedTools: [ApplicationIds.COLOR_PALETTE_GENERATOR],
  structuredData: createToolStructuredData({
    pageUrl: "color-converter",
    pageTitle,
    mainHeading: "Color Converter: Convert Between HEX, RGB, HSL, and CMYK",
    keywords: keywords.split(",").map((word) => word.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "What is a Color Converter?",
    blockData: [
      "A color converter transforms color values between different formats: HEX, RGB, HSL, and CMYK. Our tool instantly converts colors and displays a live preview, making it essential for designers and developers.",
      "Each color format serves different purposes. HEX and RGB for web design, HSL for intuitive color adjustments, and CMYK for print design. Convert seamlessly between all formats with our free online tool.",
    ],
  },
  {
    heading: "How to Use the Color Converter",
    blockData: [
      "Enter a color value in any format: HEX (#FF5733), RGB (255, 87, 51), HSL (9°, 100%, 60%), or CMYK (0%, 66%, 80%, 0%). The tool automatically detects the format and converts to all other formats.",
      "See a live preview of your color and copy any format with one click. Perfect for web development, graphic design, and any project requiring color format conversions.",
    ],
  },
  {
    heading: "Understanding Color Formats",
    blockData: [
      "HEX: Hexadecimal color codes used in web design (#RRGGBB). RGB: Red, Green, Blue values (0-255) for digital displays. HSL: Hue, Saturation, Lightness - intuitive for color manipulation.",
      "CMYK: Cyan, Magenta, Yellow, Key (black) percentages for print design. Each format has specific use cases in digital and print media.",
    ],
  },
  {
    heading: "When to Use Each Color Format",
    blockData: [
      "Use HEX for CSS and web development - it's compact and widely supported. RGB for digital displays, image editing, and when you need precise color control. HSL when adjusting color properties like brightness or saturation.",
      "CMYK is essential for print design and professional printing services. Converting between formats ensures your colors look consistent across different media.",
    ],
  },
  {
    heading: "Color Conversion Tips",
    blockData: [
      "Note that CMYK to RGB conversions may not be exact due to different color spaces. RGB displays can show colors that CMYK printers cannot reproduce, and vice versa.",
      "Test your colors on actual output devices when accuracy is critical. Use our converter for quick conversions, then fine-tune based on your specific requirements.",
    ],
  },
];
