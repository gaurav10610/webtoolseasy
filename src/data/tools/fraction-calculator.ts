import { ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/fraction-calculator";
const pageTitle = "Fraction Calculator - Add, Subtract, Simplify";
const pageDescription =
  "Add, subtract, multiply, and divide fractions. Simplify fractions, convert mixed numbers, and get step-by-step solutions instantly.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/fraction-calculator.png`;

const keywords =
  "fraction calculator,add fractions,subtract fractions,multiply fractions,divide fractions,simplify fractions,mixed numbers,fraction to decimal,decimal to fraction,reduce fractions";

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
        alt: "Fraction Calculator Tool",
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
  mainHeading: "Fraction Calculator: Add, Subtract, Multiply, Divide Fractions",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  relatedTools: [
    ApplicationIds.PERCENTAGE_CALCULATOR,
    ApplicationIds.UNIT_CONVERTER,
    ApplicationIds.BMI_CALCULATOR,
  ],
  structuredData: createToolStructuredData({
    pageUrl: "fraction-calculator",
    pageTitle,
    mainHeading:
      "Fraction Calculator: Add, Subtract, Multiply, Divide Fractions",
    keywords: keywords.split(",").map((word) => word.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "What is a Fraction Calculator?",
    blockData: [
      "A fraction calculator performs mathematical operations with fractions including addition, subtraction, multiplication, and division. It automatically simplifies results to lowest terms, converts between mixed numbers and improper fractions, and shows step-by-step solutions. This tool is essential for students learning fractions, teachers preparing materials, cooks adjusting recipes, and professionals working with measurements in construction, sewing, and engineering.",
    ],
  },
  {
    heading: "Adding and Subtracting Fractions",
    blockData: [
      "To add or subtract fractions, you must first find a common denominator. For example, 1/4 + 1/3 requires converting to 12ths: 3/12 + 4/12 = 7/12. The calculator automatically finds the least common denominator (LCD), converts fractions, performs the operation, and simplifies the result. Mixed numbers like 2 1/2 + 1 1/4 are converted to improper fractions (5/2 + 5/4) before calculation, then the result is converted back to mixed number form.",
    ],
  },
  {
    heading: "Multiplying and Dividing Fractions",
    blockData: [
      "Multiplying fractions is straightforward: multiply the numerators together and denominators together. For example, 2/3 × 3/4 = 6/12 = 1/2 (simplified). Dividing fractions uses the 'flip and multiply' rule: to divide by a fraction, multiply by its reciprocal. For example, 2/3 ÷ 3/4 becomes 2/3 × 4/3 = 8/9. The calculator handles these operations automatically and simplifies results to lowest terms using the greatest common divisor (GCD).",
    ],
  },
  {
    heading: "Simplifying Fractions",
    blockData: [
      "Simplifying (or reducing) fractions means dividing both numerator and denominator by their greatest common divisor. For example, 12/18 simplifies to 2/3 by dividing both by 6. The calculator uses the Euclidean algorithm to find the GCD efficiently. Proper simplification is crucial for standardized test answers, comparing fractions, and presenting professional results. The calculator always displays results in simplest form unless you specifically want the unsimplified result.",
    ],
  },
  {
    heading: "Mixed Numbers and Improper Fractions",
    blockData: [
      "A mixed number like 2 1/2 combines a whole number and fraction. An improper fraction like 5/2 has a numerator larger than its denominator. To convert 2 1/2 to improper: (2 × 2 + 1)/2 = 5/2. To convert 5/2 to mixed: divide 5 by 2 to get 2 with remainder 1, written as 2 1/2. The calculator automatically converts between these forms and shows both representations when relevant. Mixed numbers are more intuitive for measurements while improper fractions simplify calculations.",
    ],
  },
  {
    heading: "Converting Fractions to Decimals",
    blockData: [
      "To convert a fraction to decimal, divide the numerator by the denominator. For example, 3/4 = 0.75. Some fractions produce repeating decimals: 1/3 = 0.333... The calculator shows both exact and rounded decimal equivalents. To convert a decimal to fraction, count decimal places: 0.75 has 2 places, so it's 75/100 = 3/4 simplified. Terminating decimals convert exactly while repeating decimals require special handling or approximation.",
    ],
  },
  {
    heading: "Practical Applications of Fractions",
    blockData: [
      "Fractions appear throughout daily life: cooking (halve a 2/3 cup measurement = 1/3 cup), construction (adding board lengths: 3 1/2 + 2 3/4 inches), time (1/4 hour = 15 minutes), money (1/2 dollar = 50 cents), and measurements. Students use fractions in math homework, standardized tests, and science labs. Professionals use them in finance (fractional shares), manufacturing (tolerances), and healthcare (medication dosages). Understanding fraction operations ensures accuracy in these critical applications.",
    ],
  },
  {
    heading: "Tips for Working with Fractions",
    blockData: [
      "Always simplify final answers unless instructed otherwise. When comparing fractions, convert to common denominators or decimals. For complex problems, break them into steps: parentheses first, then multiplication/division, finally addition/subtraction. Remember that multiplying by a fraction smaller than 1 makes the result smaller (2 × 1/2 = 1). Check your work by converting to decimals for verification. Use the calculator's step-by-step display to understand the solution process and learn fraction operations thoroughly.",
    ],
  },
];
