import { ApplicationConfig, ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/loan-emi-calculator";
const pageTitle = "Loan EMI Calculator - Calculate Monthly Payments Online";
const pageDescription =
  "Free loan EMI calculator. Calculate monthly payments for home loans, car loans, personal loans. View amortization schedule with interest breakdown.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/loan-emi-calculator.png`;

const keywords =
  "loan calculator,EMI calculator,mortgage calculator,home loan calculator,car loan calculator,monthly payment calculator,loan amortization";

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
  mainHeading: "Loan EMI Calculator: Calculate Monthly Payments & Amortization",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  relatedTools: [ApplicationIds.COMPOUND_INTEREST_CALCULATOR],
  structuredData: createToolStructuredData({
    pageUrl: "loan-emi-calculator",
    pageTitle,
    mainHeading:
      "Loan EMI Calculator: Calculate Monthly Payments & Amortization",
    keywords: keywords.split(",").map((word) => word.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "What is EMI?",
    blockData: [
      "EMI (Equated Monthly Installment) is the fixed amount you pay every month to repay a loan. It includes both principal and interest components. Our EMI calculator helps you determine your monthly payment amount instantly.",
      "Understanding your EMI helps you plan your finances better and choose the right loan tenure and amount that fits your budget.",
    ],
  },
  {
    heading: "How to Use the Loan EMI Calculator",
    blockData: [
      "Enter your loan amount, interest rate (annual), and loan tenure in months or years. The calculator instantly shows your monthly EMI, total interest payable, and total amount to be repaid.",
      "View the detailed amortization schedule to see how your payment is split between principal and interest each month. This helps you understand your loan repayment journey.",
    ],
  },
  {
    heading: "EMI Calculation Formula",
    blockData: [
      "EMI is calculated using the formula: EMI = [P × r × (1 + r)^n] / [(1 + r)^n - 1], where P is the loan principal, r is the monthly interest rate (annual rate / 12 / 100), and n is the loan tenure in months.",
      "Our calculator uses this industry-standard formula to provide accurate EMI calculations for home loans, car loans, personal loans, and other types of loans.",
    ],
  },
  {
    heading: "Understanding Your Loan Repayment",
    blockData: [
      "In the early years of your loan, a larger portion of your EMI goes toward interest payment. As the loan matures, more of your EMI goes toward principal repayment. This is called loan amortization.",
      "The amortization schedule shows you this progression month by month, helping you understand when you'll pay off the majority of your interest and principal.",
    ],
  },
  {
    heading: "Tips for Managing Your Loan EMI",
    blockData: [
      "Choose a loan tenure that balances affordable monthly payments with minimal total interest. Shorter tenures mean higher EMIs but lower overall interest. Make prepayments when possible to reduce interest burden.",
      "Use our calculator to compare different loan scenarios before committing. Understanding your EMI obligations helps you make informed financial decisions and avoid overextending your budget.",
    ],
  },
];
