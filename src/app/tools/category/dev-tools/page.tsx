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

const pageTitle =
  "Free Developer Tools Online | JSON, Code Formatters, Encoders";
const pageDescription =
  "Free privacy-first developer tools. JSON formatter, code minifier, Base64 encoder, JWT decoder, regex tester & more. 100% client-side, no server uploads.";
const keywords =
  "free developer tools, JSON formatter, code minifier, Base64 encoder, JWT decoder, regex tester, UUID generator, hash generator, client-side tools";

// Developer-related tool IDs
const devToolIds: ApplicationIds[] = [
  ApplicationIds.JSON_FORMATTER,
  ApplicationIds.JSON_VIEWER,
  ApplicationIds.JS_FORMATTER,
  ApplicationIds.CSS_FORMATTER,
  ApplicationIds.HTML_FORMATTER,
  ApplicationIds.YAML_FORMATTER,
  ApplicationIds.SQL_FORMATTER,
  ApplicationIds.CODE_MINIFIER,
  ApplicationIds.BASE64_ENCODE,
  ApplicationIds.BASE64_DECODE,
  ApplicationIds.JWT_DECODER,
  ApplicationIds.HASH_GENERATOR,
  ApplicationIds.UUID_VERSION4_GENERATOR,
  ApplicationIds.UUID_VERSION1_GENERATOR,
  ApplicationIds.UUID_VERSION7_GENERATOR,
  ApplicationIds.GUID_GENERATOR,
  ApplicationIds.ULID_GENERATOR,
  ApplicationIds.REGEX_TESTER,
  ApplicationIds.CRON_GENERATOR,
  ApplicationIds.XML_TO_JSON,
  ApplicationIds.JSON_TO_CSV,
  ApplicationIds.CSV_TO_JSON,
  ApplicationIds.JSON_TO_YAML,
  ApplicationIds.URL_ENCODER_DECODER,
  ApplicationIds.STRING_ESCAPE,
  ApplicationIds.HTML_ENTITIES_ENCODER_DECODER,
  ApplicationIds.UNIX_TIMESTAMP_CONVERTER,
  ApplicationIds.DIFF_CHECKER,
  ApplicationIds.LOREM_IPSUM_GENERATOR,
  ApplicationIds.TABLE_GENERATOR,
];

export const metadata: Metadata = {
  alternates: {
    canonical: `${process.env.HOSTNAME}/tools/category/dev-tools`,
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
    url: `${process.env.HOSTNAME}/tools/category/dev-tools`,
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
    name: "Free Developer Tools",
    description: pageDescription,
    numberOfItems: devToolIds.length,
    itemListElement: devToolIds.map((id, index) => ({
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
        name: "Are these developer tools free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, all developer tools on WebToolsEasy are completely free with no usage limits or registration required.",
        },
      },
      {
        "@type": "Question",
        name: "Is it safe to paste my code or JWT tokens here?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, all processing happens 100% in your browser. Your code, tokens, and data never leave your device or touch our servers.",
        },
      },
      {
        "@type": "Question",
        name: "What formatting options are available?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We support JSON, JavaScript, HTML, CSS, YAML, SQL formatting with customizable indentation and styling options.",
        },
      },
      {
        "@type": "Question",
        name: "Do these tools work offline?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, once loaded, all tools work entirely offline since processing happens in your browser without server communication.",
        },
      },
    ],
  },
};

export default function DevToolsPage() {
  const devApps: AppNavigationConfig[] = devToolIds
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
        <Link href="/?category=Programming" className="hover:text-blue-600">
          Tools
        </Link>
        {" > "}
        <span className="text-gray-700">Developer Tools</span>
      </nav>

      {/* Hero Section */}
      <header className="text-center py-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
        <Typography
          variant="h1"
          className="!text-3xl md:!text-4xl !font-bold !text-green-800 mb-4"
        >
          🛠️ Free Private Developer Tools
        </Typography>
        <Typography
          variant="body1"
          className="max-w-2xl mx-auto text-gray-600 mb-4 px-4"
        >
          Format, encode, decode, and generate code directly in your browser. No
          uploads, no servers, no tracking. Your code stays 100% private.
        </Typography>
        <div className="flex flex-wrap justify-center gap-2 px-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
            ✓ 100% Client-Side
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
            ✓ No Upload Required
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
          Available Developer Tools ({devApps.length})
        </Typography>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {map(devApps, (app) => (
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
          Why Developers Love These Tools
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4">
            <div className="text-4xl mb-3">🔐</div>
            <Typography variant="h3" className="!text-lg !font-medium mb-2">
              Safe for Secrets
            </Typography>
            <Typography variant="body2" color="textSecondary">
              JWT tokens, API keys, and sensitive code never leave your browser.
              Perfect for production debugging.
            </Typography>
          </div>
          <div className="text-center p-4">
            <div className="text-4xl mb-3">⚡</div>
            <Typography variant="h3" className="!text-lg !font-medium mb-2">
              Instant Results
            </Typography>
            <Typography variant="body2" color="textSecondary">
              No network latency. Format, encode, and transform data instantly
              without waiting for server responses.
            </Typography>
          </div>
          <div className="text-center p-4">
            <div className="text-4xl mb-3">🌐</div>
            <Typography variant="h3" className="!text-lg !font-medium mb-2">
              Works Anywhere
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Use these tools in air-gapped environments, VPNs, or restricted
              networks. No external dependencies.
            </Typography>
          </div>
        </div>
      </section>

      {/* Tool Categories */}
      <section className="py-8 px-4">
        <Typography
          variant="h2"
          className="!text-xl md:!text-2xl !font-semibold mb-6 text-center"
        >
          Tool Categories
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg">
            <Typography variant="h3" className="!text-lg !font-medium mb-2">
              📝 Formatters
            </Typography>
            <Typography variant="body2" color="textSecondary">
              JSON, JavaScript, HTML, CSS, YAML, SQL formatters with
              customizable styling.
            </Typography>
          </div>
          <div className="p-4 border rounded-lg">
            <Typography variant="h3" className="!text-lg !font-medium mb-2">
              🔄 Encoders/Decoders
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Base64, URL encoding, HTML entities, string escaping, and more.
            </Typography>
          </div>
          <div className="p-4 border rounded-lg">
            <Typography variant="h3" className="!text-lg !font-medium mb-2">
              🔑 Generators
            </Typography>
            <Typography variant="body2" color="textSecondary">
              UUID, GUID, ULID, hash, password, and other secure generators.
            </Typography>
          </div>
          <div className="p-4 border rounded-lg">
            <Typography variant="h3" className="!text-lg !font-medium mb-2">
              🔄 Converters
            </Typography>
            <Typography variant="body2" color="textSecondary">
              XML to JSON, JSON to CSV, JSON to YAML, and format converters.
            </Typography>
          </div>
          <div className="p-4 border rounded-lg">
            <Typography variant="h3" className="!text-lg !font-medium mb-2">
              🧪 Testers
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Regex tester, JWT decoder, diff checker for code comparison.
            </Typography>
          </div>
          <div className="p-4 border rounded-lg">
            <Typography variant="h3" className="!text-lg !font-medium mb-2">
              ⏰ Utilities
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Unix timestamp converter, cron generator, lorem ipsum generator.
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
              Is it safe to paste JWT tokens or API keys?
            </summary>
            <p className="mt-2 text-gray-600">
              Yes, absolutely safe. All decoding and processing happens 100% in
              your browser. Your tokens never leave your device - we have no
              backend servers that see your data.
            </p>
          </details>
          <details className="border rounded-lg p-4">
            <summary className="cursor-pointer font-medium">
              Can I use these tools for production debugging?
            </summary>
            <p className="mt-2 text-gray-600">
              Yes, these tools are perfect for production debugging because your
              sensitive data stays local. Many developers prefer these tools
              over online alternatives for this reason.
            </p>
          </details>
          <details className="border rounded-lg p-4">
            <summary className="cursor-pointer font-medium">
              Do these tools work in air-gapped environments?
            </summary>
            <p className="mt-2 text-gray-600">
              Once loaded, all tools work completely offline. You can even save
              the page locally and use it without any network connection.
            </p>
          </details>
          <details className="border rounded-lg p-4">
            <summary className="cursor-pointer font-medium">
              What programming languages do the formatters support?
            </summary>
            <p className="mt-2 text-gray-600">
              We support JSON, JavaScript, HTML, CSS, YAML, and SQL formatting.
              Each formatter has customizable indentation and styling options.
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
            href="/tools/category/image-tools"
            className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100"
          >
            Image Tools
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
