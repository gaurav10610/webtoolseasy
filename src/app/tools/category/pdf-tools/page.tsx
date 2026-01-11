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

const pageTitle = "Free PDF Tools Online | Edit, Merge, Split, Compress PDFs";
const pageDescription =
  "Free privacy-first PDF tools. Edit, merge, split, compress PDFs in your browser. No upload, 100% secure. PDF to Word, images to PDF converter & more.";
const keywords =
  "free PDF tools, PDF editor online, merge PDF, split PDF, compress PDF, PDF to Word, images to PDF, private PDF tools, no upload PDF, client-side PDF";

// PDF-related tool IDs
const pdfToolIds: ApplicationIds[] = [
  ApplicationIds.PDF_EDITOR,
  ApplicationIds.PDF_MERGE,
  ApplicationIds.PDF_SPLIT,
  ApplicationIds.PDF_COMPRESS,
  ApplicationIds.PDF_TO_IMAGES,
  ApplicationIds.IMAGES_TO_PDF,
  ApplicationIds.PDF_TO_WORD,
  ApplicationIds.WORD_TO_PDF,
];

export const metadata: Metadata = {
  alternates: {
    canonical: `${process.env.HOSTNAME}/tools/category/pdf-tools`,
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
    url: `${process.env.HOSTNAME}/tools/category/pdf-tools`,
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
    name: "Free PDF Tools",
    description: pageDescription,
    numberOfItems: pdfToolIds.length,
    itemListElement: pdfToolIds.map((id, index) => ({
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
        name: "Are these PDF tools free to use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, all PDF tools on WebToolsEasy are completely free with no usage limits, watermarks, or registration required.",
        },
      },
      {
        "@type": "Question",
        name: "Do you upload my PDF files to your servers?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No, all PDF processing happens 100% in your browser. Your files never leave your device, ensuring complete privacy and security.",
        },
      },
      {
        "@type": "Question",
        name: "What PDF operations can I perform?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can edit PDFs, merge multiple PDFs, split PDFs into pages, compress PDFs, convert PDF to Word, convert images to PDF, and more.",
        },
      },
      {
        "@type": "Question",
        name: "Do these tools work offline?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, once loaded, these tools work entirely offline since all processing happens in your browser without server communication.",
        },
      },
    ],
  },
};

export default function PdfToolsPage() {
  const pdfApps: AppNavigationConfig[] = pdfToolIds
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
        <Link href="/?category=Media" className="hover:text-blue-600">
          Tools
        </Link>
        {" > "}
        <span className="text-gray-700">PDF Tools</span>
      </nav>

      {/* Hero Section */}
      <header className="text-center py-8 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border border-red-200">
        <Typography
          variant="h1"
          className="!text-3xl md:!text-4xl !font-bold !text-red-800 mb-4"
        >
          🔒 Free Private PDF Tools
        </Typography>
        <Typography
          variant="body1"
          className="max-w-2xl mx-auto text-gray-600 mb-4 px-4"
        >
          Edit, merge, split, and convert PDFs directly in your browser. No
          uploads, no servers, no tracking. Your documents stay 100% private.
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
          Available PDF Tools ({pdfApps.length})
        </Typography>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {map(pdfApps, (app) => (
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
          Why Use Our PDF Tools?
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4">
            <div className="text-4xl mb-3">🔐</div>
            <Typography variant="h3" className="!text-lg !font-medium mb-2">
              Complete Privacy
            </Typography>
            <Typography variant="body2" color="textSecondary">
              All processing happens in your browser. Your PDFs never leave your
              device or touch our servers.
            </Typography>
          </div>
          <div className="text-center p-4">
            <div className="text-4xl mb-3">⚡</div>
            <Typography variant="h3" className="!text-lg !font-medium mb-2">
              Lightning Fast
            </Typography>
            <Typography variant="body2" color="textSecondary">
              No upload or download wait times. Processing starts instantly on
              your local machine.
            </Typography>
          </div>
          <div className="text-center p-4">
            <div className="text-4xl mb-3">🌐</div>
            <Typography variant="h3" className="!text-lg !font-medium mb-2">
              Works Offline
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Once loaded, use these tools without an internet connection.
              Perfect for sensitive documents.
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
              Are these PDF tools really free?
            </summary>
            <p className="mt-2 text-gray-600">
              Yes, all our PDF tools are completely free with no usage limits,
              no watermarks, and no registration required.
            </p>
          </details>
          <details className="border rounded-lg p-4">
            <summary className="cursor-pointer font-medium">
              How is my privacy protected?
            </summary>
            <p className="mt-2 text-gray-600">
              All PDF processing happens 100% in your browser using JavaScript.
              Your files never leave your device - we have no servers that
              handle your documents.
            </p>
          </details>
          <details className="border rounded-lg p-4">
            <summary className="cursor-pointer font-medium">
              What file size limits are there?
            </summary>
            <p className="mt-2 text-gray-600">
              Since processing happens locally, limits depend on your
              device&apos;s memory. Most modern devices handle PDFs up to 100MB+
              easily.
            </p>
          </details>
          <details className="border rounded-lg p-4">
            <summary className="cursor-pointer font-medium">
              Can I use these tools on mobile?
            </summary>
            <p className="mt-2 text-gray-600">
              Yes, all tools are fully responsive and work on smartphones and
              tablets. Processing happens right on your mobile device.
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
            href="/tools/category/image-tools"
            className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100"
          >
            Image Tools
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
