import { ApplicationConfig } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/color-palette-generator";
const pageTitle = "Color Palette Generator"; // <=55 chars
const pageDescription =
  "Generate harmonious color palettes online. Pick a base color, explore complementary, triadic and analogous palettes, and export SVG or CSS variables."; // <=150 chars
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/color-palette-generator.png`;

const keywords =
  "color palette generator,color picker,palette maker,generate color palette,complementary colors,triadic colors,analogous palettes,download palette,css variables,export palette";

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
  mainHeading: "Color Palette Generator: Create Harmonious Palettes",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((w) => w.trim()),
  relatedTools: [],
  structuredData: createToolStructuredData({
    pageUrl: "color-palette-generator",
    pageTitle,
    mainHeading: "Color Palette Generator: Create Harmonious Palettes",
    keywords: keywords.split(",").map((w) => w.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "Create color palettes quickly",
    blockData: [
      "Generate complementary, triadic, and analogous palettes from any base color. The tool provides quick color suggestions suitable for UI design, branding, and digital illustrations.",
      "Copy hex codes, export palettes as SVG for design tools, or copy CSS variables to integrate colors directly into your website styles.",
    ],
  },
  {
    heading: "How to use",
    listData: [
      "Select a base color with the color picker or paste a hex value.",
      "Adjust palette size and choose a harmony mode (analogous, complementary, triadic, or shades) to explore variations.",
      "Click to copy hex values, or download an SVG palette and use CSS variables for quick integration in web projects.",
    ],
  },
  {
    heading: "Why designers use this tool",
    blockData: [
      "Fast color exploration: generate palette variations in seconds and iterate quickly.",
      "Export friendly: SVG and CSS variable export options make it easy to transfer palettes to design apps or live sites.",
      "Practical for UI and branding: get accessible harmonious colors that work together in interfaces and marketing materials.",
    ],
  },
];

export default componentConfig;
