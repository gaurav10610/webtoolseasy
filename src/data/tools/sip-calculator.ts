import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/sip-calculator";
const pageTitle = "SIP Calculator - Mutual Fund Investment Planning";
const pageDescription =
  "Calculate SIP returns for mutual fund investments. Free calculator shows wealth creation with monthly SIP, expected returns, and investment period.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/sip-calculator.png`;

const keywords =
  "sip calculator,mutual fund calculator,systematic investment plan,sip returns calculator,investment calculator,sip planning tool";

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
  mainHeading:
    "SIP Calculator: Plan Your Mutual Fund Investments with Confidence",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  relatedTools: [
    ApplicationIds.COMPOUND_INTEREST_CALCULATOR,
    ApplicationIds.LOAN_EMI_CALCULATOR,
    ApplicationIds.PERCENTAGE_CALCULATOR,
  ],
  structuredData: createToolStructuredData({
    pageUrl: "sip-calculator",
    pageTitle,
    mainHeading:
      "SIP Calculator: Plan Your Mutual Fund Investments with Confidence",
    keywords: keywords.split(",").map((word) => word.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "What is a SIP (Systematic Investment Plan)?",
    blockData: [
      "A Systematic Investment Plan (SIP) is a disciplined investment approach where you invest a fixed amount regularly in mutual funds. SIP allows you to invest small amounts periodically rather than making a lump sum investment, helping you build wealth over time through the power of compounding.",
    ],
  },
  {
    heading: "Why Use a SIP Calculator?",
    listData: [
      "Plan your investments: Determine how much you need to invest monthly to reach your financial goals.",
      "Visualize growth: See how your investments grow over time with the power of compounding.",
      "Compare scenarios: Test different investment amounts and time periods to find the best strategy.",
      "Set realistic goals: Understand the relationship between investment amount, time, and expected returns.",
      "Make informed decisions: Calculate potential returns before committing to an investment plan.",
    ],
  },
  {
    heading: "Features of Our SIP Calculator",
    listData: [
      "Free to use: No registration or payment required.",
      "Instant calculations: Get immediate results as you adjust parameters.",
      "Visual representation: Charts show the growth of your investment over time.",
      "Detailed breakdown: See invested amount, estimated returns, and total value.",
      "Flexible inputs: Adjust monthly investment, expected return rate, and investment period.",
      "Easy to understand: Simple interface with clear results and explanations.",
    ],
  },
  {
    heading: "How to Use the SIP Calculator",
    listData: [
      "Enter monthly SIP amount: Input how much you plan to invest every month.",
      "Set expected annual return: Enter the expected rate of return (typically 10-15% for equity funds).",
      "Choose investment period: Select the duration in years for your SIP.",
      "View results: See your total investment, expected returns, and final corpus value.",
      "Adjust parameters: Modify values to explore different investment scenarios.",
    ],
  },
  {
    heading: "Benefits of SIP Investing",
    listData: [
      "Rupee cost averaging: Buy more units when prices are low and fewer when high.",
      "Disciplined investing: Regular investments build a saving habit.",
      "Power of compounding: Returns are reinvested, generating more returns over time.",
      "Flexibility: Start small and increase amounts as income grows.",
      "Convenience: Automatic deductions make investing hassle-free.",
      "Lower risk: Spread investments across market cycles to reduce timing risk.",
    ],
  },
  {
    heading: "Understanding SIP Returns",
    blockData: [
      "SIP returns depend on the performance of the mutual fund, market conditions, and investment duration. While equity mutual funds historically deliver 12-15% annual returns over the long term, returns can vary. Our calculator uses the compound annual growth rate (CAGR) to estimate future value. Remember, past performance doesn't guarantee future results, and all investments carry some level of risk.",
    ],
  },
];
