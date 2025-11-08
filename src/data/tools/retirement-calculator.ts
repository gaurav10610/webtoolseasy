import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/retirement-calculator";
const pageTitle = "Retirement Calculator - Plan Your Golden Years";
const pageDescription =
  "Calculate retirement savings needed. Free tool helps plan your retirement corpus based on current age, savings, and monthly contributions.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/retirement-calculator.png`;

const keywords =
  "retirement calculator,retirement planning,retirement corpus calculator,pension calculator,retirement savings calculator,future planning tool";

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
  mainHeading: "Retirement Calculator: Secure Your Financial Future Today",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  relatedTools: [
    ApplicationIds.COMPOUND_INTEREST_CALCULATOR,
    ApplicationIds.LOAN_EMI_CALCULATOR,
    ApplicationIds.AGE_CALCULATOR,
  ],
  structuredData: createToolStructuredData({
    pageUrl: "retirement-calculator",
    pageTitle,
    mainHeading: "Retirement Calculator: Secure Your Financial Future Today",
    keywords: keywords.split(",").map((word) => word.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "What is Retirement Planning?",
    blockData: [
      "Retirement planning is the process of determining retirement income goals and the actions needed to achieve those goals. It involves identifying sources of income, estimating expenses, implementing a savings program, and managing assets and risk. A well-planned retirement ensures financial security during your golden years.",
    ],
  },
  {
    heading: "Why Use a Retirement Calculator?",
    listData: [
      "Calculate retirement corpus: Determine how much you need to save for a comfortable retirement.",
      "Plan monthly savings: Find out how much to save each month to reach your retirement goals.",
      "Account for inflation: Factor in rising costs to ensure your savings maintain purchasing power.",
      "Set realistic goals: Understand the relationship between current savings, contributions, and retirement age.",
      "Make informed decisions: Adjust your savings strategy based on projected retirement needs.",
      "Peace of mind: Know you're on track for a financially secure retirement.",
    ],
  },
  {
    heading: "Features of Our Retirement Calculator",
    listData: [
      "Free to use: No registration or hidden fees.",
      "Comprehensive planning: Consider current age, retirement age, savings, and contributions.",
      "Inflation adjustment: Calculate real value of retirement corpus accounting for inflation.",
      "Expected returns: Factor in investment growth over time.",
      "Visual results: Easy-to-understand breakdown of your retirement savings.",
      "Flexible inputs: Adjust any parameter to see how it affects your retirement plan.",
    ],
  },
  {
    heading: "How to Use the Retirement Calculator",
    listData: [
      "Enter your current age: Input how old you are today.",
      "Set retirement age: Choose when you plan to retire (typically 60-65).",
      "Input current savings: Enter how much you've already saved for retirement.",
      "Enter monthly contribution: Input how much you plan to save each month.",
      "Set expected return rate: Enter expected annual return on investments (8-12% typical).",
      "View results: See your projected retirement corpus and monthly income estimates.",
    ],
  },
  {
    heading: "Tips for Retirement Planning",
    listData: [
      "Start early: The power of compounding works best over long periods.",
      "Increase contributions with income: Boost savings as your salary grows.",
      "Diversify investments: Balance risk and return with a mix of assets.",
      "Account for medical expenses: Healthcare costs typically increase in retirement.",
      "Consider inflation: Plan for 5-7% annual inflation in your calculations.",
      "Review regularly: Update your plan annually or when life circumstances change.",
      "Have an emergency fund: Keep 6-12 months of expenses separate from retirement savings.",
    ],
  },
  {
    heading: "Understanding Retirement Corpus",
    blockData: [
      "Your retirement corpus is the total amount of savings you need to maintain your desired lifestyle after retirement. This calculator estimates your corpus based on years until retirement, monthly contributions, and expected investment returns. It's recommended to have 25-30 times your annual expenses as retirement corpus. Factor in life expectancy, lifestyle choices, and inflation when planning your retirement savings.",
    ],
  },
];
