import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/bmi-calculator";
const pageTitle = "BMI Calculator - Body Mass Index Calculator Online";
const pageDescription =
  "Calculate your BMI (Body Mass Index) instantly. Free tool to check if you're underweight, normal, overweight, or obese with health tips.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/bmi-calculator.png`;

const keywords =
  "bmi calculator,body mass index calculator,bmi chart,ideal weight calculator,weight calculator,health calculator";

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
  mainHeading: "BMI Calculator: Check Your Body Mass Index Instantly",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  relatedTools: [
    ApplicationIds.AGE_CALCULATOR,
    ApplicationIds.PERCENTAGE_CALCULATOR,
  ],
  structuredData: createToolStructuredData({
    pageUrl: "bmi-calculator",
    pageTitle,
    mainHeading: "BMI Calculator: Check Your Body Mass Index Instantly",
    keywords: keywords.split(",").map((word) => word.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "What is BMI (Body Mass Index)?",
    blockData: [
      "Body Mass Index (BMI) is a numerical value derived from your height and weight. It's a widely used screening tool to categorize individuals as underweight, normal weight, overweight, or obese. BMI provides a simple, quick assessment of body fat and potential health risks associated with weight.",
    ],
  },
  {
    heading: "Why Use a BMI Calculator?",
    listData: [
      "Quick health assessment: Get an instant indication of your weight status.",
      "Track fitness progress: Monitor changes in your BMI over time.",
      "Health risk awareness: Understand potential health risks associated with your weight.",
      "Set realistic goals: Determine your target weight for optimal health.",
      "Medical screening: Preliminary tool used by healthcare professionals.",
      "Easy to use: Simple inputs (height and weight) provide immediate results.",
    ],
  },
  {
    heading: "Features of Our BMI Calculator",
    listData: [
      "Free to use: No registration or payment required.",
      "Multiple units: Support for metric (kg, cm) and imperial (lbs, ft/in) systems.",
      "Instant results: Calculate BMI as you type.",
      "Category classification: Clear indication of weight category.",
      "Health recommendations: Personalized tips based on your BMI category.",
      "Visual indicators: Color-coded results for easy understanding.",
      "Privacy focused: All calculations done locally in your browser.",
    ],
  },
  {
    heading: "How to Use the BMI Calculator",
    listData: [
      "Select unit system: Choose between metric (kg/cm) or imperial (lbs/ft/in).",
      "Enter your height: Input your height in the selected unit system.",
      "Enter your weight: Input your current weight.",
      "View results: Your BMI is calculated instantly with category classification.",
      "Read recommendations: Get health tips based on your BMI category.",
    ],
  },
  {
    heading: "BMI Categories and Ranges",
    listData: [
      "Underweight: BMI less than 18.5 - May indicate malnutrition or health issues.",
      "Normal weight: BMI 18.5-24.9 - Considered healthy weight range.",
      "Overweight: BMI 25-29.9 - May increase risk of health problems.",
      "Obese (Class I): BMI 30-34.9 - Increased health risks.",
      "Obese (Class II): BMI 35-39.9 - High health risks.",
      "Obese (Class III): BMI 40 or greater - Very high health risks.",
    ],
  },
  {
    heading: "BMI Formula",
    blockData: [
      "BMI is calculated using the formula: BMI = weight (kg) / height² (m²). For imperial units: BMI = (weight (lbs) / height² (in²)) × 703. For example, a person weighing 70 kg with height 1.75 m would have a BMI of 22.86, which falls in the normal weight category.",
    ],
  },
  {
    heading: "Limitations of BMI",
    blockData: [
      "While BMI is a useful screening tool, it has limitations. It doesn't distinguish between muscle and fat mass, so athletes with high muscle mass may have high BMI but low body fat. It also doesn't account for age, gender, bone density, or body composition. BMI should be used as one of several factors in assessing overall health, not as a sole diagnostic tool.",
    ],
  },
  {
    heading: "Tips for Healthy Weight Management",
    listData: [
      "Balanced diet: Eat a variety of nutritious foods in appropriate portions.",
      "Regular exercise: Aim for 150 minutes of moderate activity per week.",
      "Stay hydrated: Drink adequate water throughout the day.",
      "Quality sleep: Get 7-9 hours of sleep for optimal metabolism.",
      "Stress management: High stress can affect weight and eating habits.",
      "Consult professionals: Work with doctors or nutritionists for personalized advice.",
      "Track progress: Monitor changes over time, not daily fluctuations.",
    ],
  },
];
