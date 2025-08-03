import { ApplicationConfig } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/compound-interest-calculator";
const pageTitle = "Compound Interest Calculator - Investment Growth Tool";
const pageDescription =
  "Calculate compound interest for investments and savings. Free calculator shows growth over time with customizable interest rates and compounding periods.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/compound-interest-calculator.png`;

const keywords =
  "compound interest calculator,investment calculator,financial calculator,savings calculator,interest rate calculator,future value calculator";

export const metadata: Metadata = {
  alternates: {
    canonical: `${process.env.HOSTNAME}${navigationUrl}`,
  },
  title: pageTitle,
  description: pageDescription,
  keywords,
  metadataBase: new URL(process.env.HOSTNAME!),
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/favicon.png", type: "image/png" }],
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
    "Compound Interest Calculator: Calculate Your Future Earnings with Ease",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  icons: [],
  relatedTools: [],
  structuredData: createToolStructuredData({
    pageUrl: "compound-interest-calculator",
    pageTitle,
    mainHeading:
      "Compound Interest Calculator: Calculate Your Future Earnings with Ease",
    keywords: keywords.split(",").map((word) => word.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "What is Compound Interest?",
    blockData: [
      "Compound interest is interest that is earned on both the principal and the accumulated interest. This means that your earnings grow at an exponential rate over time.",
    ],
  },
  {
    heading: "Why Use a Compound Interest Calculator?",
    listData: [
      "To calculate your future earnings. A compound interest calculator can help you to calculate how much your investment will grow over time. This can help you to make informed decisions about your finances.",
      `To set financial goals. Once you know how much your investment can grow over time, you can set financial goals for yourself. For example, you may want to save for retirement or for your child's education.`,
      "To track your progress. A compound interest calculator can help you to track the progress of your investments over time. This can help you to stay motivated and to make sure that you are on track to reach your financial goals.",
    ],
  },
  {
    heading: "Features of Our Online Compound Interest Calculator",
    listData: [
      "Free to use. No need to pay or sign up for an account.",
      "No download required. Calculate compound interest directly from your web browser.",
      "Easy to use. Simply enter your investment amount, interest rate, and investment term, and our calculator will show you how much your investment will grow over time.",
      "Customizable settings. You can customize the settings of our calculator to match your personal preferences. For example, you can choose to calculate compound interest annually, semi-annually, quarterly, or monthly.",
    ],
  },
  {
    heading: "How to Use Our Online Compound Interest Calculator",
    listData: [
      "Go to our website and enter your investment amount, interest rate, and investment term into the calculator.",
      "Select the compounding frequency from the dropdown menu.",
      'Click the "Calculate" button.',
      "View your future earnings in the sidebar.",
    ],
  },
  {
    heading: "Tips for Using a Compound Interest Calculator",
    listData: [
      "Use realistic interest rates. When using a compound interest calculator, it is important to use realistic interest rates. You can find current interest rates for a variety of investments online or at your local bank.",
      "Consider the compounding frequency. The compounding frequency is the number of times per year that your interest is compounded. The more frequently your interest is compounded, the faster your investment will grow.",
      "Reinvest your earnings. If you reinvest your earnings, your investment will grow even faster. This is because you will be earning interest on both your principal and your accumulated interest.",
    ],
  },
  {
    blockData: [
      "Our free online compound interest calculator is a great way to calculate your future earnings with ease. It is easy to use and supports all compounding frequencies. With our calculator, you can easily calculate how much your investment will grow over time and set financial goals for yourself.",
    ],
  },
];
