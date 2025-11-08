import { ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/calorie-calculator";
const pageTitle = "Calorie Calculator - Daily Calorie Needs & BMR";
const pageDescription =
  "Calculate daily calorie needs, BMR, and TDEE. Free calorie calculator for weight loss, maintenance, and muscle gain goals with personalized results.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/calorie-calculator.png`;

const keywords =
  "calorie calculator,daily calorie needs,BMR calculator,TDEE calculator,calories per day,weight loss calculator,calorie intake calculator,how many calories,maintenance calories";

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
      { url: "/favicon_512.png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon.png",
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    images: [
      {
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: "Calorie Calculator Tool",
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

export const componentConfig = {
  mainHeading: "Calorie Calculator: Calculate Daily Calorie Needs & BMR",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  relatedTools: [
    ApplicationIds.BMI_CALCULATOR,
    ApplicationIds.PERCENTAGE_CALCULATOR,
  ],
  structuredData: createToolStructuredData({
    pageUrl: "calorie-calculator",
    pageTitle,
    mainHeading: "Calorie Calculator: Calculate Daily Calorie Needs & BMR",
    keywords: keywords.split(",").map((word) => word.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "What is a Calorie Calculator?",
    blockData: [
      "A calorie calculator determines your daily calorie needs based on your age, gender, weight, height, and activity level. It calculates your Basal Metabolic Rate (BMR) - the calories you burn at rest - and Total Daily Energy Expenditure (TDEE) - your total calories burned including physical activity. This tool is essential for weight management, fitness goals, and nutrition planning.",
    ],
  },
  {
    heading: "Understanding BMR and TDEE",
    blockData: [
      "BMR (Basal Metabolic Rate) is the number of calories your body needs to perform basic life-sustaining functions like breathing, circulation, and cell production. TDEE (Total Daily Energy Expenditure) accounts for your activity level by multiplying BMR by an activity factor. TDEE represents your maintenance calories - eat this amount to maintain current weight. Understanding both metrics helps create effective diet plans.",
    ],
  },
  {
    heading: "How to Use the Calorie Calculator",
    blockData: [
      "Enter your age, gender, weight, and height. Select your activity level from sedentary to very active. Choose your goal: weight loss, maintenance, or weight gain. The calculator uses proven formulas (Mifflin-St Jeor) to compute your BMR and TDEE, then provides personalized calorie targets based on your goal. Results include macronutrient recommendations for optimal nutrition.",
    ],
  },
  {
    heading: "Activity Level Guidelines",
    blockData: [
      "Sedentary: Little to no exercise, desk job. Light Activity: Exercise 1-3 days/week, light walking. Moderate Activity: Exercise 3-5 days/week, moderate cardio. Very Active: Exercise 6-7 days/week, intense training. Extra Active: Athlete, physical job plus intense training. Accurately assessing your activity level ensures precise calorie recommendations. Most people overestimate their activity level.",
    ],
  },
  {
    heading: "Calorie Deficit for Weight Loss",
    blockData: [
      "To lose weight, create a calorie deficit by consuming fewer calories than your TDEE. A deficit of 500 calories daily results in approximately 0.5 kg (1 lb) weight loss per week. A 1000 calorie deficit yields 1 kg (2 lbs) weekly loss. Never drop below 1200 calories (women) or 1500 calories (men) to avoid nutritional deficiencies. Sustainable weight loss combines moderate calorie reduction with regular exercise.",
    ],
  },
  {
    heading: "Calorie Surplus for Muscle Gain",
    blockData: [
      "Building muscle requires a calorie surplus - consuming more than your TDEE. A surplus of 200-500 calories daily supports muscle growth while minimizing fat gain. Combine surplus calories with strength training and adequate protein (1.6-2.2g per kg body weight). Bulk too aggressively and you'll gain excess fat. Track progress weekly and adjust intake based on results and body composition changes.",
    ],
  },
  {
    heading: "Macronutrient Distribution",
    blockData: [
      "Macronutrients (protein, carbohydrates, fats) should be balanced for optimal health. Protein: 10-35% of calories (higher for athletes, 1.6-2.2g/kg). Carbohydrates: 45-65% of calories (fuel for energy). Fats: 20-35% of calories (essential for hormones). Athletes may need higher protein. Low-carb dieters reduce carbs to 5-20%. The calculator provides macro targets based on your goals and activity level.",
    ],
  },
  {
    heading: "Tips for Accurate Results",
    blockData: [
      "Weigh yourself consistently (same time, same conditions). Track calories accurately using a food scale and app. Be honest about activity levels - most overestimate. Recalculate every 4-6 weeks as weight changes. Account for non-exercise activity (NEAT). Monitor progress through measurements, not just scale weight. Adjust calorie intake based on results. Remember: calculators provide estimates; individual metabolism varies. Listen to your body and adjust accordingly.",
    ],
  },
];
