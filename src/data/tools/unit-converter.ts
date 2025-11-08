import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/unit-converter";
const pageTitle = "Unit Converter - Convert Length, Weight & Temperature";
const pageDescription =
  "Free online unit converter for length, weight, temperature, area, volume, and more. Instant conversions between metric and imperial units.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/unit-converter.png`;

const keywords =
  "unit converter,measurement converter,length converter,weight converter,temperature converter,metric converter,imperial converter";

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
  mainHeading: "Unit Converter: Convert Measurements Instantly",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  relatedTools: [
    ApplicationIds.CURRENCY_CONVERTER,
    ApplicationIds.PERCENTAGE_CALCULATOR,
  ],
  structuredData: createToolStructuredData({
    pageUrl: "unit-converter",
    pageTitle,
    mainHeading: "Unit Converter: Convert Measurements Instantly",
    keywords: keywords.split(",").map((word) => word.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "What is a Unit Converter?",
    blockData: [
      "A unit converter is a tool that transforms measurements from one unit of measurement to another. It helps convert between different systems like metric and imperial, making it essential for international communication, cooking, construction, science, and everyday tasks where different measurement systems are used.",
    ],
  },
  {
    heading: "Why Use Our Unit Converter?",
    listData: [
      "Multiple categories: Convert length, weight, temperature, area, volume, speed, and more.",
      "Instant results: See conversions in real-time as you type.",
      "Accurate calculations: Precise conversion formulas for reliable results.",
      "User-friendly: Simple interface with clear unit selections.",
      "No registration: Free to use without creating an account.",
      "Works offline: Once loaded, works without internet connection.",
      "Mobile optimized: Perfect for on-the-go conversions.",
    ],
  },
  {
    heading: "Supported Conversion Categories",
    listData: [
      "Length: Convert meters, kilometers, miles, feet, inches, yards, and more.",
      "Weight/Mass: Convert kilograms, grams, pounds, ounces, tons.",
      "Temperature: Convert Celsius, Fahrenheit, and Kelvin.",
      "Area: Convert square meters, square feet, acres, hectares.",
      "Volume: Convert liters, gallons, cups, milliliters, fluid ounces.",
      "Speed: Convert km/h, mph, m/s, knots.",
    ],
  },
  {
    heading: "How to Use the Unit Converter",
    listData: [
      "Select category: Choose the type of measurement (length, weight, etc.).",
      "Pick source unit: Select the unit you're converting from.",
      "Enter value: Type the number you want to convert.",
      "Choose target unit: Select the unit you want to convert to.",
      "View result: The converted value appears instantly.",
      "Try different units: Switch between units to see multiple conversions.",
    ],
  },
  {
    heading: "Common Conversions",
    listData: [
      "Length: 1 meter = 3.281 feet, 1 mile = 1.609 kilometers, 1 inch = 2.54 centimeters.",
      "Weight: 1 kilogram = 2.205 pounds, 1 pound = 453.6 grams, 1 ton = 1000 kilograms.",
      "Temperature: 0°C = 32°F, 100°C = 212°F, Room temp: 20°C = 68°F.",
      "Volume: 1 liter = 0.264 gallons, 1 gallon = 3.785 liters, 1 cup = 236.6 milliliters.",
    ],
  },
  {
    heading: "When to Use a Unit Converter",
    listData: [
      "Cooking and recipes: Convert between metric and imperial measurements.",
      "Travel: Understand distances, speeds, and temperatures in different countries.",
      "Construction: Convert dimensions and materials between measurement systems.",
      "Science and education: Perform accurate unit conversions for experiments and homework.",
      "Shopping: Compare product sizes and quantities from different regions.",
      "Fitness: Track weight, height, and distance in preferred units.",
      "International business: Communicate measurements across borders.",
    ],
  },
  {
    heading: "Metric vs Imperial Systems",
    blockData: [
      "The metric system (International System of Units - SI) is used by most countries worldwide and includes units like meters, kilograms, and liters. The imperial system (used primarily in the United States) includes feet, pounds, and gallons. Understanding both systems and being able to convert between them is essential for international communication, travel, and business.",
    ],
  },
  {
    heading: "Tips for Accurate Conversions",
    listData: [
      "Double-check units: Ensure you're converting between the correct unit types.",
      "Use appropriate precision: Round results to meaningful decimal places.",
      "Understand context: Consider if exact or approximate conversions are needed.",
      "Verify critical conversions: For important measurements, cross-check results.",
      "Keep formulas handy: Learn common conversion factors for quick mental math.",
    ],
  },
];
