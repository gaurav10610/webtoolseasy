import { ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/tip-calculator";
const pageTitle = "Tip Calculator - Calculate Tips and Split Bills";
const pageDescription =
  "Calculate tips and split bills easily. Determine tip amounts by percentage, divide costs among people, and see total amounts per person instantly.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/tip-calculator.png`;

const keywords =
  "tip calculator,gratuity calculator,bill splitter,split bill calculator,restaurant tip calculator,tip percentage calculator,dining calculator,service charge calculator,calculate tip,tip calculator with split,group dining calculator";

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
  mainHeading: "Tip Calculator",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  relatedTools: [
    ApplicationIds.PERCENTAGE_CALCULATOR,
    ApplicationIds.DISCOUNT_CALCULATOR,
    ApplicationIds.DATE_CALCULATOR,
  ],
  structuredData: createToolStructuredData({
    pageUrl: "tip-calculator",
    pageTitle,
    mainHeading: "Tip Calculator",
    keywords: keywords.split(",").map((word) => word.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "What is a Tip Calculator?",
    blockData: [
      "A tip calculator is a convenient tool that helps you quickly calculate gratuity amounts for dining, delivery services, and other tipped services. It computes the tip amount based on your chosen percentage, shows the total bill including tip, and can split the cost among multiple people. This eliminates mental math and ensures fair, accurate tipping for any service situation.",
    ],
  },
  {
    heading: "Why Use a Tip Calculator?",
    blockData: [
      "Tip calculators make dining out stress-free by instantly computing appropriate gratuity amounts. They help you tip fairly based on service quality, avoid under-tipping or over-tipping, quickly split bills among friends or colleagues, and understand the total cost including tip before paying. They're especially useful for group dining, delivery orders, and when calculating tips on pre-tax amounts or after discounts.",
    ],
  },
  {
    heading: "Standard Tipping Guidelines",
    blockData: [
      "Tipping customs vary by service and location. In the United States, standard restaurant tips range from 15-20% for good service, 20-25% for excellent service, and 10-15% for basic service. Delivery services typically warrant 10-20% depending on distance and weather conditions. Other services like bartenders ($1-2 per drink), hairdressers (15-20%), and taxi drivers (10-15%) have their own conventions. Always consider service quality and local customs when tipping.",
    ],
  },
  {
    heading: "How to Calculate Tips",
    blockData: [
      "Calculating tips is straightforward: Tip Amount = Bill Amount × (Tip Percentage ÷ 100). For example, a $50 bill with 20% tip equals $10 tip ($50 × 0.20). The total with tip is $60. For split bills, divide the total (bill + tip) by the number of people. The calculator handles all math instantly, letting you adjust tip percentages to match service quality and your budget.",
    ],
  },
  {
    heading: "Tipping on Pre-Tax vs Post-Tax Amounts",
    blockData: [
      "There's debate about whether to calculate tips on pre-tax or post-tax amounts. Most etiquette experts recommend tipping on the pre-tax amount, as tax isn't part of the service. However, some prefer post-tax tipping for simplicity. The difference is usually small - on a $100 pre-tax bill with 8% tax, a 20% tip would be $20 (pre-tax) versus $21.60 (post-tax). Choose the method that feels right for you and your local customs.",
    ],
  },
  {
    heading: "Splitting Bills Fairly",
    blockData: [
      "When dining with groups, bill splitting can be complex. The tip calculator offers multiple split options: equal split (dividing total evenly), proportional split (based on what each person ordered), and custom splits. For equal splits, the calculator divides the total bill plus tip by the number of people. This ensures everyone pays their fair share including an equal portion of the gratuity, simplifying group dining experiences.",
    ],
  },
  {
    heading: "Special Tipping Situations",
    blockData: [
      "Certain situations require adjusted tipping considerations. For buffets, 10% is common since servers do less work. When using coupons or discounts, tip on the original pre-discount amount to fairly compensate service. For take-out orders, 10% is appreciated but optional. Poor service might warrant 10-15% with feedback to management. Exceptional service, complex orders, large groups, and special requests deserve higher tips (25-30%) to recognize extra effort.",
    ],
  },
  {
    heading: "Tip Calculator Features",
    blockData: [
      "Modern tip calculators offer multiple helpful features: preset tip percentages (10%, 15%, 18%, 20%, 25%), custom percentage input for precise control, bill splitting for groups of any size, pre-tax vs post-tax calculation options, rounding controls for convenient payment amounts, per-person cost breakdown, and the ability to save favorite tip percentages. These features make tipping and bill splitting effortless in any dining scenario.",
    ],
  },
];
