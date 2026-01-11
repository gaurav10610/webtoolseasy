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
  "Free Image Tools Online | Compress, Resize, Edit Images Privately";
const pageDescription =
  "Free privacy-first image tools. Compress, resize, crop, convert images in your browser. No upload, 100% secure. Background remover, format converter & more.";
const keywords =
  "free image tools, image compressor, image resizer, crop image, background remover, image converter, private image tools, no upload, client-side image editing";

// Image-related tool IDs
const imageToolIds: ApplicationIds[] = [
  ApplicationIds.IMAGE_COMPRESSOR,
  ApplicationIds.IMAGE_RESIZER,
  ApplicationIds.IMAGE_CROPPER,
  ApplicationIds.IMAGE_FORMAT_CONVERTER,
  ApplicationIds.IMAGE_TO_TEXT,
  ApplicationIds.BACKGROUND_REMOVER,
  ApplicationIds.GIF_MAKER,
  ApplicationIds.FAVICON_GENERATOR,
  ApplicationIds.QR_CODE_GENERATOR,
  ApplicationIds.BARCODE_GENERATOR,
  ApplicationIds.MEME_GENERATOR,
  ApplicationIds.ASCII_ART_GENERATOR,
];

export const metadata: Metadata = {
  alternates: {
    canonical: `${process.env.HOSTNAME}/tools/category/image-tools`,
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
    url: `${process.env.HOSTNAME}/tools/category/image-tools`,
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
    name: "Free Image Tools",
    description: pageDescription,
    numberOfItems: imageToolIds.length,
    itemListElement: imageToolIds.map((id, index) => ({
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
        name: "Are these image tools free to use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, all image tools on WebToolsEasy are completely free with no usage limits, watermarks, or registration required.",
        },
      },
      {
        "@type": "Question",
        name: "Do you upload my images to your servers?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No, all image processing happens 100% in your browser. Your images never leave your device, ensuring complete privacy.",
        },
      },
      {
        "@type": "Question",
        name: "What image formats are supported?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our tools support JPEG, PNG, WebP, GIF, BMP, and more. You can also convert between formats.",
        },
      },
      {
        "@type": "Question",
        name: "Is there a file size limit?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Since processing happens locally, limits depend on your device's memory. Most devices handle images up to 50MB easily.",
        },
      },
    ],
  },
};

export default function ImageToolsPage() {
  const imageApps: AppNavigationConfig[] = imageToolIds
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
        <span className="text-gray-700">Image Tools</span>
      </nav>

      {/* Hero Section */}
      <header className="text-center py-8 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
        <Typography
          variant="h1"
          className="!text-3xl md:!text-4xl !font-bold !text-blue-800 mb-4"
        >
          🖼️ Free Private Image Tools
        </Typography>
        <Typography
          variant="body1"
          className="max-w-2xl mx-auto text-gray-600 mb-4 px-4"
        >
          Compress, resize, crop, and convert images directly in your browser.
          No uploads, no servers, no tracking. Your images stay 100% private.
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
          Available Image Tools ({imageApps.length})
        </Typography>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {map(imageApps, (app) => (
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
          Why Use Our Image Tools?
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4">
            <div className="text-4xl mb-3">🔐</div>
            <Typography variant="h3" className="!text-lg !font-medium mb-2">
              Complete Privacy
            </Typography>
            <Typography variant="body2" color="textSecondary">
              All processing happens in your browser. Your images never leave
              your device or touch our servers.
            </Typography>
          </div>
          <div className="text-center p-4">
            <div className="text-4xl mb-3">⚡</div>
            <Typography variant="h3" className="!text-lg !font-medium mb-2">
              Instant Processing
            </Typography>
            <Typography variant="body2" color="textSecondary">
              No upload wait times. Image compression and editing starts
              instantly on your local machine.
            </Typography>
          </div>
          <div className="text-center p-4">
            <div className="text-4xl mb-3">🎨</div>
            <Typography variant="h3" className="!text-lg !font-medium mb-2">
              Professional Quality
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Get professional-grade compression and editing without expensive
              software subscriptions.
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
              Are these image tools really free?
            </summary>
            <p className="mt-2 text-gray-600">
              Yes, all our image tools are completely free with no usage limits,
              no watermarks, and no registration required.
            </p>
          </details>
          <details className="border rounded-lg p-4">
            <summary className="cursor-pointer font-medium">
              How does privacy-first image compression work?
            </summary>
            <p className="mt-2 text-gray-600">
              All image processing happens 100% in your browser using
              JavaScript. Your images never leave your device - we have no
              servers that handle your files.
            </p>
          </details>
          <details className="border rounded-lg p-4">
            <summary className="cursor-pointer font-medium">
              What compression quality can I expect?
            </summary>
            <p className="mt-2 text-gray-600">
              Our tools offer adjustable quality settings. You can typically
              reduce file sizes by 50-80% while maintaining excellent visual
              quality.
            </p>
          </details>
          <details className="border rounded-lg p-4">
            <summary className="cursor-pointer font-medium">
              Can I batch process multiple images?
            </summary>
            <p className="mt-2 text-gray-600">
              Yes, many of our image tools support batch processing. Select
              multiple images at once to compress, resize, or convert them all
              together.
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
