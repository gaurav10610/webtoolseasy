import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/age-calculator";
const pageTitle = "Age Calculator - Calculate Your Exact Age Online";
const pageDescription =
  "Free age calculator to find your exact age in years, months, days, hours, and minutes. Calculate age from birthdate instantly with our online tool.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/age-calculator.png`;
const keywords =
  "age calculator,calculate age,how old am I,age from birthdate,birthday calculator,age in days,age in months,exact age calculator,date of birth calculator";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: keywords,
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    images: [
      {
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: "Age Calculator Tool",
      },
    ],
    url: navigationUrl,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
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
  mainHeading: "Age Calculator: Calculate Your Exact Age from Birthdate",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  relatedTools: [ApplicationIds.UNIX_TIMESTAMP_CONVERTER],
  structuredData: createToolStructuredData({
    pageUrl: "age-calculator",
    pageTitle,
    mainHeading: "Age Calculator: Calculate Your Exact Age from Birthdate",
    keywords: keywords.split(",").map((word) => word.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "What is an Age Calculator?",
    blockData: [
      "An age calculator is a free online tool that calculates your exact age from your date of birth to any specified date. Our calculator provides your age in multiple formats including years, months, days, hours, minutes, and even seconds.",
      "Perfect for anyone wondering 'how old am I exactly', planning birthdays, filling out forms, calculating eligibility for age-restricted activities, or just satisfying curiosity about your precise age.",
    ],
  },
  {
    heading: "Features of Our Age Calculator",
    blockData: [
      "• Calculate exact age in years, months, and days",
      "• View age in multiple time units (days, hours, minutes, seconds)",
      "• Days until next birthday countdown",
      "• Calculate age between any two dates",
      "• Day of the week you were born",
      "• Next milestone birthday calculator",
      "• 100% accurate date calculations",
    ],
  },
  {
    heading: "How to Calculate Your Age",
    blockData: [
      "1. Enter your date of birth using the date picker",
      "2. The tool automatically calculates to today's date",
      "3. Optionally select a different 'calculate to' date",
      "4. View your exact age in years, months, and days",
      "5. See additional formats (total days, hours, minutes lived)",
      "6. Check days remaining until your next birthday",
    ],
  },
  {
    heading: "Why Calculate Your Age?",
    blockData: [
      "• Verify age for legal requirements and eligibility",
      "• Fill out forms and applications accurately",
      "• Plan milestone birthday celebrations",
      "• Calculate work experience duration",
      "• Determine age for school admissions",
      "• Social media and dating profiles",
      "• Medical records and health tracking",
      "• Fun facts about your time alive",
    ],
  },
  {
    heading: "Understanding Age Calculation",
    blockData: [
      "Age is calculated by finding the difference between your birth date and the current date (or specified date). Our calculator accounts for leap years, varying month lengths, and provides accurate results down to the second.",
      "The calculator uses precise date arithmetic to ensure accuracy across all time zones and calendar systems. Your exact age changes every second, and our tool reflects this with real-time calculations.",
    ],
  },
];
