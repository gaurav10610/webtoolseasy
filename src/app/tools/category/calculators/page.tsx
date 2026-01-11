import { apps } from "@/data/apps";
import { AppNavigationConfig, ApplicationIds } from "@/types/config";
import { AppHomeCard } from "@/components/appCards";
import { Typography } from "@mui/material";
import { map } from "lodash-es";
import { Metadata } from "next";
import { BaseToolsAds } from "@/components/baseAds";
import Link from "next/link";
import {
  StructuredData,
  generateOrganizationSchema,
  generateWebsiteSchema,
} from "@/components/structuredData";

const pageTitle = "Free Calculator Tools | EMI, SIP, ROI, Mortgage Calculators";
const pageDescription =
  "Free privacy-first calculator tools. EMI, SIP, mortgage, ROI, percentage calculators & more. 100% client-side, no data tracking or server uploads.";
const keywords =
  "free calculator tools, EMI calculator, SIP calculator, mortgage calculator, ROI calculator, percentage calculator, loan calculator, client-side calculator";

// Calculator-related tool IDs
const calculatorToolIds: ApplicationIds[] = [
  ApplicationIds.COMPOUND_INTEREST_CALCULATOR,
  ApplicationIds.LOAN_EMI_CALCULATOR,
  ApplicationIds.SIP_CALCULATOR,
  ApplicationIds.RETIREMENT_CALCULATOR,
  ApplicationIds.MORTGAGE_CALCULATOR,
  ApplicationIds.ROI_CALCULATOR,
  ApplicationIds.PERCENTAGE_CALCULATOR,
  ApplicationIds.DISCOUNT_CALCULATOR,
  ApplicationIds.TIP_CALCULATOR,
  ApplicationIds.BMI_CALCULATOR,
  ApplicationIds.CALORIE_CALCULATOR,
  ApplicationIds.GPA_CALCULATOR,
  ApplicationIds.SALARY_CALCULATOR,
  ApplicationIds.AGE_CALCULATOR,
  ApplicationIds.DATE_CALCULATOR,
  ApplicationIds.TIME_DURATION_CALCULATOR,
  ApplicationIds.FRACTION_CALCULATOR,
  ApplicationIds.UNIT_CONVERTER,
  ApplicationIds.CURRENCY_CONVERTER,
];

export const metadata: Metadata = {
  alternates: {
    canonical: `${process.env.HOSTNAME}/tools/category/calculators`,
  },
  title: pageTitle,
  description: pageDescription,
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon.png",
  },
  authors: {
    name: "Gaurav Kumar Yadav",
  },
  robots: "index, follow",
  metadataBase: new URL(process.env.HOSTNAME!),
  openGraph: {
    title: pageTitle,
    type: "website",
    url: `${process.env.HOSTNAME}/tools/category/calculators`,
    images: [
      {
        url: `${process.env.SCREENSHOTS_BASE_URL}/home.png`,
        secureUrl: `${process.env.SCREENSHOTS_BASE_URL}/home.png`,
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
    images: [`${process.env.SCREENSHOTS_BASE_URL}/home.png`],
  },
  keywords,
};

const structuredData = {
  itemListElement: {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Free Calculator Tools",
    description: pageDescription,
    numberOfItems: calculatorToolIds.length,
    itemListElement: calculatorToolIds.map((id, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: apps[id]?.displayText || id,
      url: `${process.env.HOSTNAME}/${apps[id]?.navigateUrl || ""}`,
    })),
  },
  faqPage: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Are these calculator tools free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, all calculator tools on WebToolsEasy are completely free with no usage limits or registration required.",
        },
      },
      {
        "@type": "Question",
        name: "Is my financial data saved on your servers?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No, all calculations happen 100% in your browser. Your financial data never leaves your device.",
        },
      },
      {
        "@type": "Question",
        name: "How accurate are these calculators?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our calculators use industry-standard formulas and provide accurate results. However, always consult a financial advisor for major decisions.",
        },
      },
      {
        "@type": "Question",
        name: "Do these calculators work offline?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, once loaded, all calculators work entirely offline since calculations happen in your browser.",
        },
      },
    ],
  },
};

export default function CalculatorsPage() {
  const calculatorApps: AppNavigationConfig[] = calculatorToolIds
    .map((id) => apps[id])
    .filter(Boolean);

  return (
    <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto p-4">
      <StructuredData data={generateOrganizationSchema()} />
      <StructuredData data={generateWebsiteSchema()} />
      <StructuredData data={structuredData.itemListElement} />
      <StructuredData data={structuredData.faqPage} />

      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500">
        <Link href="/" className="hover:text-blue-600">
          Home
        </Link>
        {" > "}
        <Link href="/?category=Finance" className="hover:text-blue-600">
          Tools
        </Link>
        {" > "}
        <span className="text-gray-700">Calculator Tools</span>
      </nav>

      {/* Hero Section */}
      <header className="text-center py-8 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl border border-amber-200">
        <Typography
          variant="h1"
          className="!text-3xl md:!text-4xl !font-bold !text-amber-800 mb-4"
        >
          🧮 Free Private Calculator Tools
        </Typography>
        <Typography
          variant="body1"
          className="max-w-2xl mx-auto text-gray-600 mb-4 px-4"
        >
          Calculate EMI, SIP, mortgage, and more directly in your browser. No
          uploads, no servers, no tracking. Your financial data stays 100%
          private.
        </Typography>
        <div className="flex flex-wrap justify-center gap-2 px-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
            ✓ 100% Client-Side
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
            ✓ No Data Tracking
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800">
            ✓ Works Offline
          </span>
        </div>
      </header>

      {/* Tools Grid */}
      <section className="w-full">
        <Typography
          variant="h2"
          className="!text-xl md:!text-2xl !font-semibold mb-6 text-center"
        >
          Available Calculator Tools ({calculatorApps.length})
        </Typography>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {map(calculatorApps, (app) => (
            <AppHomeCard key={app.applicationId} config={app} />
          ))}
        </div>
      </section>

      <BaseToolsAds />

      {/* Features Section */}
      <section className="py-8 px-4 bg-gray-50 rounded-xl">
        <Typography
          variant="h2"
          className="!text-xl md:!text-2xl !font-semibold mb-6 text-center"
        >
          Why Use Our Calculators?
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4">
            <div className="text-4xl mb-3">🔐</div>
            <Typography variant="h3" className="!text-lg !font-medium mb-2">
              Financial Privacy
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Your financial data stays on your device. No tracking, no
              profiling, no data selling.
            </Typography>
          </div>
          <div className="text-center p-4">
            <div className="text-4xl mb-3">📊</div>
            <Typography variant="h3" className="!text-lg !font-medium mb-2">
              Accurate Results
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Industry-standard formulas for precise calculations. Includes
              detailed breakdowns and charts.
            </Typography>
          </div>
          <div className="text-center p-4">
            <div className="text-4xl mb-3">⚡</div>
            <Typography variant="h3" className="!text-lg !font-medium mb-2">
              Instant Calculations
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Real-time results as you type. No waiting for server responses or
              page reloads.
            </Typography>
          </div>
        </div>
      </section>

      {/* Calculator Categories */}
      <section className="py-8 px-4">
        <Typography
          variant="h2"
          className="!text-xl md:!text-2xl !font-semibold mb-6 text-center"
        >
          Calculator Categories
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg">
            <Typography variant="h3" className="!text-lg !font-medium mb-2">
              💰 Financial Calculators
            </Typography>
            <Typography variant="body2" color="textSecondary">
              EMI, SIP, compound interest, ROI, mortgage, and loan calculators.
            </Typography>
          </div>
          <div className="p-4 border rounded-lg">
            <Typography variant="h3" className="!text-lg !font-medium mb-2">
              📐 Math Calculators
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Percentage, fraction, unit converter, and basic math calculators.
            </Typography>
          </div>
          <div className="p-4 border rounded-lg">
            <Typography variant="h3" className="!text-lg !font-medium mb-2">
              🏋️ Health Calculators
            </Typography>
            <Typography variant="body2" color="textSecondary">
              BMI, calorie, and other health-related calculators.
            </Typography>
          </div>
          <div className="p-4 border rounded-lg">
            <Typography variant="h3" className="!text-lg !font-medium mb-2">
              📅 Date & Time
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Age calculator, date calculator, time duration, and timezone
              tools.
            </Typography>
          </div>
          <div className="p-4 border rounded-lg">
            <Typography variant="h3" className="!text-lg !font-medium mb-2">
              🎓 Academic
            </Typography>
            <Typography variant="body2" color="textSecondary">
              GPA calculator and other academic calculation tools.
            </Typography>
          </div>
          <div className="p-4 border rounded-lg">
            <Typography variant="h3" className="!text-lg !font-medium mb-2">
              💵 Everyday
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Tip calculator, discount calculator, salary calculator, and more.
            </Typography>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-8 px-4">
        <Typography
          variant="h2"
          className="!text-xl md:!text-2xl !font-semibold mb-6 text-center"
        >
          Frequently Asked Questions
        </Typography>
        <div className="space-y-4 max-w-3xl mx-auto">
          <details className="border rounded-lg p-4">
            <summary className="cursor-pointer font-medium">
              Is my financial data safe with these calculators?
            </summary>
            <p className="mt-2 text-gray-600">
              Yes, absolutely. All calculations happen 100% in your browser.
              Your financial data never leaves your device - we have no servers
              that see your numbers.
            </p>
          </details>
          <details className="border rounded-lg p-4">
            <summary className="cursor-pointer font-medium">
              How accurate are the EMI and loan calculations?
            </summary>
            <p className="mt-2 text-gray-600">
              Our calculators use industry-standard amortization formulas. The
              results are accurate for planning purposes. Always verify with
              your lender for exact figures.
            </p>
          </details>
          <details className="border rounded-lg p-4">
            <summary className="cursor-pointer font-medium">
              Can I export the calculation results?
            </summary>
            <p className="mt-2 text-gray-600">
              Many calculators provide detailed breakdowns and amortization
              tables that you can copy or print for your records.
            </p>
          </details>
          <details className="border rounded-lg p-4">
            <summary className="cursor-pointer font-medium">
              Are the currency exchange rates up to date?
            </summary>
            <p className="mt-2 text-gray-600">
              The currency converter fetches current exchange rates. For precise
              financial transactions, verify with your bank or financial
              institution.
            </p>
          </details>
        </div>
      </section>

      {/* Related Categories */}
      <section className="py-4">
        <Typography variant="h2" className="!text-lg !font-medium mb-4">
          Related Tool Categories
        </Typography>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/tools/category/pdf-tools"
            className="px-4 py-2 bg-red-50 text-red-700 rounded-full hover:bg-red-100"
          >
            PDF Tools
          </Link>
          <Link
            href="/tools/category/dev-tools"
            className="px-4 py-2 bg-green-50 text-green-700 rounded-full hover:bg-green-100"
          >
            Developer Tools
          </Link>
          <Link
            href="/tools/category/text-tools"
            className="px-4 py-2 bg-purple-50 text-purple-700 rounded-full hover:bg-purple-100"
          >
            Text Tools
          </Link>
        </div>
      </section>
    </div>
  );
}
