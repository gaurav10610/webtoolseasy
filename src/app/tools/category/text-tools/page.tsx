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
  "Free Text Tools Online | Word Counter, Case Converter, Markdown";
const pageDescription =
  "Free privacy-first text tools. Word counter, case converter, text compare, markdown editor & more. 100% client-side processing, no server uploads.";
const keywords =
  "free text tools, word counter, case converter, text compare, markdown editor, text summarizer, paraphrasing tool, client-side text tools";

// Text-related tool IDs
const textToolIds: ApplicationIds[] = [
  ApplicationIds.WORD_COUNTER,
  ApplicationIds.CASE_CONVERETR,
  ApplicationIds.TEXT_COMPARE,
  ApplicationIds.MARKDOWN_EDITOR,
  ApplicationIds.TEXT_SUMMARIZER,
  ApplicationIds.PARAPHRASING_TOOL,
  ApplicationIds.TEXT_EDITOR,
  ApplicationIds.LOREM_IPSUM_GENERATOR,
  ApplicationIds.HTML_TO_MARKDOWN,
  ApplicationIds.MARKDOWN_TO_HTML_CONVERTER,
  ApplicationIds.TEXT_TO_SPEECH,
  ApplicationIds.SPEECH_TO_TEXT,
];

export const metadata: Metadata = {
  alternates: {
    canonical: `${process.env.HOSTNAME}/tools/category/text-tools`,
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
    url: `${process.env.HOSTNAME}/tools/category/text-tools`,
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
    name: "Free Text Tools",
    description: pageDescription,
    numberOfItems: textToolIds.length,
    itemListElement: textToolIds.map((id, index) => ({
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
        name: "Are these text tools free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, all text tools on WebToolsEasy are completely free with no usage limits or registration required.",
        },
      },
      {
        "@type": "Question",
        name: "Is my text saved on your servers?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No, all text processing happens 100% in your browser. Your text never leaves your device.",
        },
      },
      {
        "@type": "Question",
        name: "Can I use these tools for sensitive documents?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, these tools are perfect for sensitive content because all processing happens locally in your browser.",
        },
      },
      {
        "@type": "Question",
        name: "Do the text tools work offline?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, once loaded, most tools work entirely offline since processing happens in your browser.",
        },
      },
    ],
  },
};

export default function TextToolsPage() {
  const textApps: AppNavigationConfig[] = textToolIds
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
        <Link href="/?category=Text" className="hover:text-blue-600">
          Tools
        </Link>
        {" > "}
        <span className="text-gray-700">Text Tools</span>
      </nav>

      {/* Hero Section */}
      <header className="text-center py-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
        <Typography
          variant="h1"
          className="!text-3xl md:!text-4xl !font-bold !text-purple-800 mb-4"
        >
          ✍️ Free Private Text Tools
        </Typography>
        <Typography
          variant="body1"
          className="max-w-2xl mx-auto text-gray-600 mb-4 px-4"
        >
          Count words, convert cases, compare texts, and edit markdown directly
          in your browser. No uploads, no servers, no tracking. Your content
          stays 100% private.
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
          Available Text Tools ({textApps.length})
        </Typography>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {map(textApps, (app) => (
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
          Why Use Our Text Tools?
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4">
            <div className="text-4xl mb-3">🔐</div>
            <Typography variant="h3" className="!text-lg !font-medium mb-2">
              Document Privacy
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Your documents and text stay on your device. Perfect for
              confidential content and sensitive information.
            </Typography>
          </div>
          <div className="text-center p-4">
            <div className="text-4xl mb-3">📊</div>
            <Typography variant="h3" className="!text-lg !font-medium mb-2">
              Accurate Analysis
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Get precise word counts, character counts, reading time estimates,
              and text statistics instantly.
            </Typography>
          </div>
          <div className="text-center p-4">
            <div className="text-4xl mb-3">✏️</div>
            <Typography variant="h3" className="!text-lg !font-medium mb-2">
              Writing Assistance
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Summarize text, paraphrase content, and improve your writing with
              our AI-powered tools.
            </Typography>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-8 px-4">
        <Typography
          variant="h2"
          className="!text-xl md:!text-2xl !font-semibold mb-6 text-center"
        >
          Common Use Cases
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          <div className="p-4 border rounded-lg">
            <Typography variant="h3" className="!text-lg !font-medium mb-2">
              📝 Content Writers
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Track word count for articles, meet character limits for social
              media, and estimate reading time.
            </Typography>
          </div>
          <div className="p-4 border rounded-lg">
            <Typography variant="h3" className="!text-lg !font-medium mb-2">
              🎓 Students & Academics
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Check essay word counts, compare document versions, and convert
              between formats.
            </Typography>
          </div>
          <div className="p-4 border rounded-lg">
            <Typography variant="h3" className="!text-lg !font-medium mb-2">
              💼 Professionals
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Compare contracts, convert case formats, and work with markdown
              documentation.
            </Typography>
          </div>
          <div className="p-4 border rounded-lg">
            <Typography variant="h3" className="!text-lg !font-medium mb-2">
              👨‍💻 Developers
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Write documentation in markdown, convert between HTML and
              markdown, generate lorem ipsum.
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
              How accurate is the word counter?
            </summary>
            <p className="mt-2 text-gray-600">
              Our word counter uses industry-standard algorithms to accurately
              count words, characters, sentences, and paragraphs. It handles
              multiple languages and special characters correctly.
            </p>
          </details>
          <details className="border rounded-lg p-4">
            <summary className="cursor-pointer font-medium">
              Can I use these tools for confidential documents?
            </summary>
            <p className="mt-2 text-gray-600">
              Yes, these tools are ideal for confidential documents. All
              processing happens in your browser - your text never leaves your
              device or reaches our servers.
            </p>
          </details>
          <details className="border rounded-lg p-4">
            <summary className="cursor-pointer font-medium">
              Does the markdown editor support live preview?
            </summary>
            <p className="mt-2 text-gray-600">
              Yes, our markdown editor provides real-time preview as you type.
              You can see your formatted output instantly and export to HTML.
            </p>
          </details>
          <details className="border rounded-lg p-4">
            <summary className="cursor-pointer font-medium">
              What case formats does the case converter support?
            </summary>
            <p className="mt-2 text-gray-600">
              Our case converter supports UPPERCASE, lowercase, Title Case,
              Sentence case, camelCase, PascalCase, snake_case, kebab-case, and
              more.
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
            href="/tools/category/image-tools"
            className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100"
          >
            Image Tools
          </Link>
        </div>
      </section>
    </div>
  );
}
