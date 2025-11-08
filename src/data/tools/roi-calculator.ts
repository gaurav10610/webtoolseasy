import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/roi-calculator";
const pageTitle = "ROI Calculator - Return on Investment Calculator";
const pageDescription =
  "Calculate return on investment (ROI) instantly. Free tool to measure investment performance, profitability, and annual returns.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/roi-calculator.png`;

const keywords =
  "roi calculator,return on investment calculator,investment return calculator,profit calculator,investment performance,annualized return";

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
  mainHeading: "ROI Calculator: Measure Your Investment Returns Accurately",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  relatedTools: [
    ApplicationIds.COMPOUND_INTEREST_CALCULATOR,
    ApplicationIds.PERCENTAGE_CALCULATOR,
    ApplicationIds.CURRENCY_CONVERTER,
  ],
  structuredData: createToolStructuredData({
    pageUrl: "roi-calculator",
    pageTitle,
    mainHeading: "ROI Calculator: Measure Your Investment Returns Accurately",
    keywords: keywords.split(",").map((word) => word.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "What is ROI (Return on Investment)?",
    blockData: [
      "Return on Investment (ROI) is a financial metric used to measure the profitability of an investment. It shows how much profit or loss an investment has generated relative to its cost. ROI is expressed as a percentage and helps investors compare the efficiency of different investments. A positive ROI indicates profit, while a negative ROI indicates a loss.",
    ],
  },
  {
    heading: "Why Calculate ROI?",
    listData: [
      "Measure performance: Evaluate how well your investments are performing.",
      "Compare options: Decide between different investment opportunities.",
      "Track progress: Monitor investment growth over time.",
      "Make decisions: Determine whether to hold, sell, or buy more.",
      "Assess risk: Understand returns relative to investment amount.",
      "Business analysis: Evaluate profitability of business projects or marketing campaigns.",
    ],
  },
  {
    heading: "Features of Our ROI Calculator",
    listData: [
      "Free to use: No registration or subscription required.",
      "Multiple calculations: Simple ROI and annualized ROI.",
      "Profit/loss breakdown: See actual gains or losses in currency.",
      "Time-based returns: Calculate annual return rate for investments held over time.",
      "Percentage returns: Clear ROI percentage for easy comparison.",
      "Instant results: Real-time calculations as you enter values.",
    ],
  },
  {
    heading: "How to Use the ROI Calculator",
    listData: [
      "Enter initial investment: Input the amount you invested initially.",
      "Enter final value: Input the current or final value of your investment.",
      "Add investment duration (optional): Enter time period for annualized return calculation.",
      "View results: See ROI percentage, profit/loss amount, and annualized returns.",
      "Compare investments: Calculate ROI for multiple investments to compare performance.",
    ],
  },
  {
    heading: "ROI Calculation Formula",
    blockData: [
      "ROI is calculated using the formula: ROI = ((Final Value - Initial Investment) / Initial Investment) × 100. For example, if you invested ₹10,000 and it grew to ₹12,000, your ROI would be 20%. For investments held over multiple years, annualized ROI provides a better comparison by showing the average yearly return rate.",
    ],
  },
  {
    heading: "Understanding Good ROI",
    blockData: [
      "What constitutes a 'good' ROI varies by industry, investment type, and risk level. Stock market returns average 10-12% annually over the long term. Real estate typically returns 8-12% annually. Fixed deposits offer 5-7% with lower risk. Higher ROI usually comes with higher risk. Consider your risk tolerance, investment timeline, and financial goals when evaluating ROI.",
    ],
  },
  {
    heading: "Types of Investments to Calculate ROI",
    listData: [
      "Stocks and mutual funds: Measure equity investment performance.",
      "Real estate: Calculate property investment returns including appreciation.",
      "Business ventures: Evaluate profitability of business investments.",
      "Marketing campaigns: Assess return on advertising spend.",
      "Education and training: Measure career advancement ROI.",
      "Cryptocurrency: Track digital asset investment performance.",
      "Fixed deposits: Compare safe investment returns.",
    ],
  },
  {
    heading: "Important Considerations",
    blockData: [
      "ROI doesn't account for time value of money unless you calculate annualized returns. It also doesn't consider risk factors or interim cash flows like dividends. Use ROI alongside other metrics like IRR (Internal Rate of Return) and payback period for comprehensive investment analysis. Remember to factor in taxes, fees, and inflation when calculating real returns.",
    ],
  },
];
