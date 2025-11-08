import { ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/salary-calculator";
const pageTitle = "Salary Calculator - Hourly to Annual Conversion";
const pageDescription =
  "Convert between hourly, monthly, and annual salary. Free salary calculator with take-home pay estimates. Calculate hourly wage, yearly income, and more.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/salary-calculator.png`;

const keywords =
  "salary calculator,hourly to annual,annual to hourly,monthly salary calculator,wage calculator,hourly wage calculator,yearly salary,paycheck calculator,income calculator";

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
        alt: "Salary Calculator Tool",
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
  mainHeading: "Salary Calculator: Convert Hourly, Monthly & Annual Pay",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  relatedTools: [
    ApplicationIds.PERCENTAGE_CALCULATOR,
    ApplicationIds.TIP_CALCULATOR,
    ApplicationIds.DISCOUNT_CALCULATOR,
  ],
  structuredData: createToolStructuredData({
    pageUrl: "salary-calculator",
    pageTitle,
    mainHeading: "Salary Calculator: Convert Hourly, Monthly & Annual Pay",
    keywords: keywords.split(",").map((word) => word.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "What is a Salary Calculator?",
    blockData: [
      "A salary calculator converts between different pay periods - hourly, weekly, bi-weekly, monthly, and annual - helping you understand your earnings in various formats. It's essential for comparing job offers, negotiating salaries, budgeting, and understanding your total compensation. The calculator accounts for standard work hours and provides breakdowns of take-home pay after taxes and deductions.",
    ],
  },
  {
    heading: "How to Convert Hourly to Annual Salary",
    blockData: [
      "To convert hourly wage to annual salary, multiply your hourly rate by the number of hours worked per week, then multiply by 52 weeks per year. For example: $20/hour × 40 hours/week × 52 weeks = $41,600 per year. This calculation assumes full-time employment with 2,080 working hours annually (40 hours × 52 weeks). Part-time workers should adjust hours accordingly. The calculator automates this process instantly.",
    ],
  },
  {
    heading: "Converting Annual Salary to Hourly Wage",
    blockData: [
      "To convert annual salary to hourly rate, divide your yearly salary by 2,080 (standard full-time hours per year). For example: $50,000 ÷ 2,080 hours = $24.04/hour. This calculation helps you compare salaried positions with hourly jobs, understand overtime value, or evaluate job offers. Remember that salaried positions often include benefits not reflected in hourly rates.",
    ],
  },
  {
    heading: "Understanding Take-Home Pay",
    blockData: [
      "Take-home pay (net income) is your gross salary minus taxes and deductions. Federal income tax, state tax, Social Security (6.2%), Medicare (1.45%), health insurance, and retirement contributions all reduce gross pay. A $60,000 annual salary might result in $45,000-$48,000 take-home, depending on location and circumstances. The calculator provides estimates - actual deductions vary by jurisdiction and personal situation.",
    ],
  },
  {
    heading: "Comparing Different Pay Structures",
    blockData: [
      "When comparing job offers, convert all salaries to the same period for accurate comparison. Consider total compensation including benefits, paid time off, bonuses, retirement matching, health insurance, and professional development. An hourly position at $25/hour with benefits may be more valuable than a $50,000 salaried role without benefits. Calculate effective hourly rate by dividing total compensation by actual hours worked.",
    ],
  },
  {
    heading: "Standard Work Hours and Overtime",
    blockData: [
      "Standard full-time employment is 40 hours per week, 2,080 hours annually (accounting for 52 weeks). Part-time is typically 20-35 hours weekly. Hourly employees often earn overtime (1.5× regular rate) for hours exceeding 40 per week. Salaried employees may be exempt from overtime, working variable hours for fixed pay. Understanding these distinctions is crucial when evaluating compensation and work-life balance.",
    ],
  },
  {
    heading: "Salary Negotiation and Job Search",
    blockData: [
      "Use salary calculators to prepare for negotiations by knowing your worth in various formats. Research industry standards for your role, experience level, and location. When discussing offers, understand whether figures quoted are gross or net, include bonuses, and account for benefits value. Convert hourly rates to annual for long-term planning, or annual to hourly to evaluate overtime and extra work value.",
    ],
  },
  {
    heading: "Tips for Accurate Salary Calculations",
    blockData: [
      "Account for unpaid time off when calculating actual annual income. Include all income sources: base salary, bonuses, commissions, tips. Consider regional cost of living - $60,000 in one city may not equal $60,000 elsewhere. Factor in non-monetary benefits: health insurance, retirement matching, flexible schedule. Use consistent assumptions (40-hour weeks, 52 weeks) when comparing. Remember calculators provide estimates - consult tax professionals for precise take-home pay calculations.",
    ],
  },
];
