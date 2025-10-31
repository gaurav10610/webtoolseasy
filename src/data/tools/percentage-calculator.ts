import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/percentage-calculator";
const pageTitle = "Percentage Calculator - Calculate Percentages Online";
const pageDescription =
  "Free percentage calculator. Calculate percentage of value, increase, decrease, and percentage difference instantly. Easy-to-use online tool.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/percentage-calculator.png`;

const keywords =
  "percentage calculator,calculate percentage,percent calculator,percentage increase,percentage decrease,percentage difference,percent of number";

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
  mainHeading: "Percentage Calculator: Calculate Percentages Online Free",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  relatedTools: [ApplicationIds.COMPOUND_INTEREST_CALCULATOR],
  structuredData: createToolStructuredData({
    pageUrl: "percentage-calculator",
    pageTitle,
    mainHeading: "Percentage Calculator: Calculate Percentages Online Free",
    keywords: keywords.split(",").map((word) => word.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "What is a Percentage Calculator?",
    blockData: [
      "A percentage calculator helps you quickly calculate percentages in various scenarios. Our free tool handles percentage calculations including finding what percentage one number is of another, calculating percentage increase or decrease, and finding the original value before percentage changes.",
      "Perfect for students, business professionals, shoppers calculating discounts, and anyone needing quick percentage calculations without manual math.",
    ],
  },
  {
    heading: "How to Use the Percentage Calculator",
    blockData: [
      "Choose the type of calculation you need: percentage of a number, percentage increase/decrease, or percentage difference. Enter the values in the input fields, and results appear instantly.",
      "Our calculator shows step-by-step calculations and formulas used, helping you understand the math behind percentage calculations.",
    ],
  },
  {
    heading: "Common Percentage Calculations",
    blockData: [
      "Calculate what is X% of Y (e.g., What is 15% of 200?). Find what percentage X is of Y (e.g., 30 is what percent of 150?). Calculate percentage increase from X to Y (e.g., increase from 100 to 125).",
      "Determine percentage decrease from X to Y (e.g., decrease from 200 to 150). Calculate the percentage difference between two numbers for comparison purposes.",
    ],
  },
  {
    heading: "Real-World Uses for Percentage Calculator",
    blockData: [
      "Shopping: Calculate discounts and sale prices. Finance: Determine interest rates, profit margins, and investment returns. Education: Solve percentage problems and check homework answers.",
      "Business: Calculate commission rates, tax amounts, markup percentages, and growth rates. Health: Track weight loss or gain percentages and body fat percentage changes.",
    ],
  },
  {
    heading: "Percentage Calculation Formulas",
    blockData: [
      "Percentage of a number: (Percentage / 100) × Number. Example: 25% of 80 = (25/100) × 80 = 20. Percentage increase: ((New Value - Original Value) / Original Value) × 100.",
      "Percentage decrease: ((Original Value - New Value) / Original Value) × 100. Percentage difference: (|Value 1 - Value 2| / ((Value 1 + Value 2) / 2)) × 100.",
    ],
  },
];
