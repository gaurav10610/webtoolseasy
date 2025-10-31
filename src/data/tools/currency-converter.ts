import { ApplicationConfig } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/currency-converter";
const pageTitle = "Currency Converter - Live Exchange Rates Calculator";
const pageDescription =
  "Convert currencies instantly with live exchange rates. Support for 150+ currencies including USD, EUR, GBP, INR, CNY, JPY and more.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/currency-converter.png`;
const keywords =
  "currency converter,exchange rate,forex converter,money converter,USD to EUR,currency calculator,foreign exchange,convert currency";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: keywords,
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    images: [
      {
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: "Currency Converter Tool",
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
};

export const componentConfig: ApplicationConfig = {
  mainHeading: "Currency Converter: Live Exchange Rates Calculator",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  relatedTools: [],
  structuredData: createToolStructuredData({
    pageUrl: "currency-converter",
    pageTitle,
    mainHeading: "Currency Converter: Live Exchange Rates Calculator",
    keywords: keywords.split(",").map((word) => word.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "Real-Time Currency Converter",
    blockData: [
      "Convert between 150+ world currencies with live exchange rates updated every hour. Our free currency converter provides accurate real-time foreign exchange rates for international travelers, businesses, and financial professionals.",
      "Perfect for travel planning, international shopping, business transactions, and anyone needing quick currency conversions with up-to-date exchange rates.",
    ],
  },
  {
    heading: "Features of Our Currency Converter",
    blockData: [
      "• Live exchange rates from reliable financial sources",
      "• Support for 150+ currencies worldwide including USD, EUR, GBP, INR, JPY, CNY, AUD, CAD",
      "• Quick conversion for popular currency pairs",
      "• Swap currencies with one click",
      "• Clean, mobile-friendly interface",
      "• No registration required - 100% free",
    ],
  },
  {
    heading: "Popular Currency Pairs",
    blockData: [
      "USD to EUR, USD to GBP, USD to INR, USD to JPY, EUR to GBP, EUR to USD, GBP to USD, GBP to EUR, INR to USD, CNY to USD, AUD to USD, CAD to USD, CHF to USD, BRL to USD",
    ],
  },
  {
    heading: "How to Convert Currency",
    blockData: [
      "1. Enter the amount you want to convert in the input field",
      "2. Select your source currency from the dropdown (e.g., USD)",
      "3. Select your target currency from the dropdown (e.g., EUR)",
      "4. View instant conversion results with current exchange rate",
      "5. Check last update time for rate accuracy",
      "6. Use swap button to quickly reverse the conversion direction",
    ],
  },
  {
    heading: "Use Cases for Currency Conversion",
    blockData: [
      "• Travel planning and vacation budgeting",
      "• International online shopping and e-commerce",
      "• Foreign investment and stock trading calculations",
      "• Freelance payment conversions for remote work",
      "• Import/export business pricing",
      "• Cross-border salary and compensation comparisons",
      "• International money transfer planning",
      "• Studying abroad cost estimation",
    ],
  },
];
