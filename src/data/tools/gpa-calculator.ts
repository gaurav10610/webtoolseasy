import { ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/gpa-calculator";
const pageTitle = "GPA Calculator - Calculate Grade Point Average";
const pageDescription =
  "Calculate your GPA based on course grades and credit hours. Track semester and cumulative GPA for academic planning and scholarship eligibility.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/gpa-calculator.png`;

const keywords =
  "gpa calculator,grade point average calculator,cumulative gpa calculator,semester gpa,college gpa calculator,high school gpa,weighted gpa calculator,unweighted gpa,academic calculator,grade calculator,student gpa tool";

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

export const componentConfig = {
  mainHeading: "GPA Calculator",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  relatedTools: [
    ApplicationIds.PERCENTAGE_CALCULATOR,
    ApplicationIds.AGE_CALCULATOR,
    ApplicationIds.DATE_CALCULATOR,
  ],
  structuredData: createToolStructuredData({
    pageUrl: "gpa-calculator",
    pageTitle,
    mainHeading: "GPA Calculator",
    keywords: keywords.split(",").map((word) => word.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "What is a GPA Calculator?",
    blockData: [
      "A GPA (Grade Point Average) calculator is an essential academic tool that helps students calculate their grade point average based on course grades and credit hours. It converts letter grades into grade points, multiplies by credit hours, and calculates the weighted average. GPA calculators support both semester GPA calculations and cumulative GPA tracking across multiple terms, helping students monitor academic performance and plan for future courses.",
    ],
  },
  {
    heading: "Why Calculate Your GPA?",
    blockData: [
      "Tracking your GPA is crucial for academic planning and future opportunities. It helps you monitor academic progress, determine eligibility for scholarships and financial aid, assess admission chances for graduate programs, maintain academic standing requirements, identify areas needing improvement, and set realistic academic goals. Many universities require minimum GPAs for program progression, honors programs, and graduation, making GPA calculation essential for students at all levels.",
    ],
  },
  {
    heading: "GPA Grading Scales",
    blockData: [
      "Most institutions use a 4.0 GPA scale where A = 4.0, B = 3.0, C = 2.0, D = 1.0, and F = 0.0. Some schools use plus/minus grading: A+ (4.0), A (4.0), A- (3.7), B+ (3.3), B (3.0), B- (2.7), C+ (2.3), C (2.0), C- (1.7), D+ (1.3), D (1.0), D- (0.7), F (0.0). Weighted GPAs for honors or AP classes may use a 5.0 scale. Always verify your institution's specific grading scale as systems can vary between schools and countries.",
    ],
  },
  {
    heading: "How to Calculate GPA",
    blockData: [
      "To calculate GPA: (1) Convert each letter grade to grade points using your school's scale, (2) Multiply grade points by credit hours for each course to get quality points, (3) Sum all quality points, (4) Sum all credit hours, (5) Divide total quality points by total credit hours. For example: If you earned an A (4.0) in a 3-credit course and a B (3.0) in a 4-credit course: (4.0 × 3 + 3.0 × 4) ÷ (3 + 4) = 24 ÷ 7 = 3.43 GPA.",
    ],
  },
  {
    heading: "Cumulative vs Semester GPA",
    blockData: [
      "Semester GPA is your grade point average for a single academic term, calculated from that term's courses only. Cumulative GPA is your overall average across all terms attended, incorporating all completed coursework. To update cumulative GPA: (Previous Total Quality Points + New Semester Quality Points) ÷ (Previous Total Credits + New Semester Credits). Both GPAs are important - semester GPA shows recent performance, while cumulative GPA reflects overall academic achievement and is used for honors, scholarships, and graduation requirements.",
    ],
  },
  {
    heading: "Weighted vs Unweighted GPA",
    blockData: [
      "Unweighted GPA uses a standard 4.0 scale for all courses, treating regular and advanced classes equally. Weighted GPA gives extra points for challenging courses - honors classes might use a 4.5 scale and AP/IB courses a 5.0 scale. For example, an A in a regular class = 4.0, but an A in an AP class = 5.0 on a weighted scale. Weighted GPAs reward students for taking rigorous coursework and can exceed 4.0. Colleges often recalculate GPAs using their own systems, so understand both your weighted and unweighted GPA.",
    ],
  },
  {
    heading: "GPA Requirements and Benchmarks",
    blockData: [
      "Different academic goals require different GPA benchmarks. Graduating typically requires 2.0+ GPA. Dean's List recognition usually needs 3.5+. Academic probation warnings often occur below 2.0. Competitive graduate programs seek 3.5+ GPAs. Summa cum laude honors require 3.9+, magna cum laude 3.7+, and cum laude 3.5+. Scholarships often have GPA requirements between 3.0-3.5. Many professional schools and graduate programs consider both overall GPA and major GPA separately. Understanding these benchmarks helps set academic targets.",
    ],
  },
  {
    heading: "Tips for Improving Your GPA",
    blockData: [
      "To improve GPA: Focus on classes with more credit hours as they have greater impact on your average. Retake failed or low-grade courses if your institution's policy allows grade replacement. Take additional courses to dilute lower grades with higher ones. Prioritize challenging courses where you can excel. Use GPA calculators to predict outcomes of different grade scenarios. Seek tutoring and academic support early when struggling. Balance your course load to avoid overwhelming schedules. Remember that consistent B+ performance often beats alternating As and Cs.",
    ],
  },
];
