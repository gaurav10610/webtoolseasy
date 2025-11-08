import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/mortgage-calculator";
const pageTitle = "Mortgage Calculator - Home Loan EMI & Payment Plan";
const pageDescription =
  "Calculate mortgage EMI with our free home loan calculator. Get detailed amortization schedule, total interest, and monthly payment breakdown.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/mortgage-calculator.png`;

const keywords =
  "mortgage calculator,home loan calculator,mortgage emi calculator,home loan emi,housing loan calculator,property loan calculator";

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
  mainHeading: "Mortgage Calculator: Plan Your Home Loan with Confidence",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  relatedTools: [
    ApplicationIds.LOAN_EMI_CALCULATOR,
    ApplicationIds.COMPOUND_INTEREST_CALCULATOR,
    ApplicationIds.PERCENTAGE_CALCULATOR,
  ],
  structuredData: createToolStructuredData({
    pageUrl: "mortgage-calculator",
    pageTitle,
    mainHeading: "Mortgage Calculator: Plan Your Home Loan with Confidence",
    keywords: keywords.split(",").map((word) => word.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "What is a Mortgage?",
    blockData: [
      "A mortgage is a loan specifically used to purchase property or real estate. The property itself serves as collateral for the loan. Borrowers repay the loan amount plus interest over a specified period, typically 15 to 30 years, through monthly installments called EMIs (Equated Monthly Installments).",
    ],
  },
  {
    heading: "Why Use a Mortgage Calculator?",
    listData: [
      "Calculate monthly payments: Know exactly how much you'll pay each month.",
      "Compare loan options: Evaluate different loan amounts, interest rates, and terms.",
      "Budget planning: Ensure monthly payments fit within your budget.",
      "Understand total cost: See how much interest you'll pay over the loan term.",
      "Plan down payment: Determine optimal down payment to reduce EMI.",
      "Amortization schedule: View how your payments are split between principal and interest.",
    ],
  },
  {
    heading: "Features of Our Mortgage Calculator",
    listData: [
      "Free to use: No registration or hidden charges.",
      "Comprehensive inputs: Home price, down payment, interest rate, and loan term.",
      "Detailed breakdown: Monthly EMI, total interest, and total payment.",
      "Principal vs Interest: See how much goes toward principal and interest.",
      "Instant results: Get calculations immediately as you adjust values.",
      "Easy to understand: Clear presentation of complex mortgage calculations.",
    ],
  },
  {
    heading: "How to Use the Mortgage Calculator",
    listData: [
      "Enter home price: Input the total cost of the property you want to buy.",
      "Set down payment: Enter how much you'll pay upfront (typically 10-20%).",
      "Input interest rate: Enter the annual interest rate offered by your lender.",
      "Choose loan term: Select repayment period in years (common: 15, 20, 25, 30 years).",
      "View results: See your monthly EMI, total interest, and payment breakdown.",
      "Adjust parameters: Modify values to find the most comfortable payment plan.",
    ],
  },
  {
    heading: "Understanding Home Loan EMI",
    blockData: [
      "EMI (Equated Monthly Installment) is the fixed amount you pay to the lender each month. It consists of two components: principal (loan amount) and interest. In the early years, a larger portion goes toward interest, while later payments reduce more principal. This is called an amortization schedule. Our calculator helps you understand this breakdown and plan your home loan effectively.",
    ],
  },
  {
    heading: "Tips for Home Loan Planning",
    listData: [
      "Higher down payment: Reduces loan amount and total interest paid.",
      "Compare interest rates: Even 0.5% difference can save lakhs over time.",
      "Shorter loan term: Pays off faster but has higher monthly payments.",
      "Prepayment strategy: Make extra payments to reduce principal and interest.",
      "Check eligibility: Ensure EMI doesn't exceed 40-50% of monthly income.",
      "Factor in additional costs: Property tax, insurance, maintenance, and registration fees.",
      "Fixed vs floating rate: Understand pros and cons of each interest rate type.",
    ],
  },
  {
    heading: "Mortgage Affordability",
    blockData: [
      "Financial experts recommend that your monthly housing payment (including EMI, property tax, and insurance) should not exceed 35-40% of your gross monthly income. This ensures you maintain financial stability while repaying your home loan. Use this calculator to find a comfortable payment amount that fits your budget and long-term financial goals.",
    ],
  },
];
