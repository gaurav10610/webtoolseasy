import { apps } from "@/data/apps";
import { getAllCategorySlugs, getCategoryConfig } from "@/data/categories";
import { AppNavigationConfig } from "@/types/config";
import { AppHomeCard } from "@/components/appCards";
import { LazyOnView } from "@/components/common/LazyOnView";
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
import { notFound } from "next/navigation";

// Generate static params for all categories
export async function generateStaticParams() {
  const slugs = getAllCategorySlugs();
  return slugs.map((category) => ({ category }));
}

// Generate metadata for each category
export async function generateMetadata(props: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const config = getCategoryConfig(params.category);

  if (!config) {
    return {
      title: "Category Not Found",
    };
  }

  return {
    alternates: {
      canonical: `${process.env.HOSTNAME}/tools/category/${config.slug}`,
    },
    title: config.pageTitle,
    description: config.pageDescription,
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
      title: config.pageTitle,
      type: "website",
      url: `${process.env.HOSTNAME}/tools/category/${config.slug}`,
      images: [
        {
          url: `${process.env.SCREENSHOTS_BASE_URL}/home.png`,
          secureUrl: `${process.env.SCREENSHOTS_BASE_URL}/home.png`,
          alt: config.pageTitle,
        },
      ],
      description: config.pageDescription,
    },
    twitter: {
      card: "summary_large_image",
      site: "@webtoolseasy",
      title: config.pageTitle,
      description: config.pageDescription,
      images: [`${process.env.SCREENSHOTS_BASE_URL}/home.png`],
    },
    keywords: config.keywords,
  };
}

// Generate structured data for the category
function generateCategoryStructuredData(
  config: ReturnType<typeof getCategoryConfig>,
) {
  if (!config) return null;

  return {
    itemListElement: {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: `Free ${config.name}`,
      description: config.pageDescription,
      numberOfItems: config.toolIds.length,
      itemListElement: config.toolIds.map((id, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: apps[id]?.displayText || id,
        url: `${process.env.HOSTNAME}/${apps[id]?.navigateUrl || ""}`,
      })),
    },
    faqPage: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: config.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  };
}

export default async function CategoryPage(props: {
  params: Promise<{ category: string }>;
}) {
  const params = await props.params;
  const config = getCategoryConfig(params.category);

  if (!config) {
    notFound();
  }

  const categoryApps: AppNavigationConfig[] = config.toolIds
    .map((id) => apps[id])
    .filter(Boolean);

  const structuredData = generateCategoryStructuredData(config);

  return (
    <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto p-4">
      <StructuredData data={generateOrganizationSchema()} />
      <StructuredData data={generateWebsiteSchema()} />
      {structuredData && (
        <>
          <StructuredData data={structuredData.itemListElement} />
          <StructuredData data={structuredData.faqPage} />
        </>
      )}

      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 dark:text-slate-400">
        <Link href="/" className="hover:text-blue-600">
          Home
        </Link>
        {" > "}
        <Link
          href={`/?category=${config.breadcrumbCategory}`}
          className="hover:text-blue-600"
        >
          Tools
        </Link>
        {" > "}
        <span className="text-gray-700">{config.name}</span>
      </nav>

      {/* Hero Section */}
      <header
        className={`text-center py-8 bg-gradient-to-r ${config.heroGradient} rounded-xl border ${config.heroBorderColor} dark:shadow-lg`}
      >
        <Typography
          variant="h1"
          className={`!text-3xl md:!text-4xl !font-bold ${config.heroTitleColor} mb-4`}
        >
          {config.heroTitle}
        </Typography>
        <Typography
          variant="body1"
          className="max-w-2xl mx-auto text-gray-600 mb-4 px-4"
        >
          {config.heroDescription}
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
          Available {config.name} ({categoryApps.length})
        </Typography>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {map(categoryApps, (app) => (
            <LazyOnView
              key={app.applicationId}
              className="w-full"
              minHeight={220}
            >
              <article className="w-full">
                <AppHomeCard
                  config={app}
                  className="w-full h-full p-4 hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-100 dark:border-slate-700 dark:bg-slate-900"
                />
              </article>
            </LazyOnView>
          ))}
        </div>
      </section>

      <BaseToolsAds />

      {/* Features Section */}
      <section className="py-8 px-4 bg-gray-50 rounded-xl dark:bg-slate-900/60">
        <Typography
          variant="h2"
          className="!text-xl md:!text-2xl !font-semibold mb-6 text-center"
        >
          {config.featuresTitle}
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {config.features.map((feature, index) => (
            <div key={index} className="text-center p-4">
              <div className="text-4xl mb-3">{feature.emoji}</div>
              <Typography variant="h3" className="!text-lg !font-medium mb-2">
                {feature.title}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {feature.description}
              </Typography>
            </div>
          ))}
        </div>
      </section>

      {/* Sub-Sections (if available) */}
      {config.subSections && config.subSections.length > 0 && (
        <section className="py-8 px-4">
          <Typography
            variant="h2"
            className="!text-xl md:!text-2xl !font-semibold mb-6 text-center"
          >
            {config.subSectionsTitle}
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {config.subSections.map((section, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <Typography variant="h3" className="!text-lg !font-medium mb-2">
                  {section.emoji} {section.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {section.description}
                </Typography>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FAQ Section */}
      <section className="py-8 px-4">
        <Typography
          variant="h2"
          className="!text-xl md:!text-2xl !font-semibold mb-6 text-center"
        >
          Frequently Asked Questions
        </Typography>
        <div className="space-y-4 max-w-3xl mx-auto">
          {config.faqs.map((faq, index) => (
            <details key={index} className="border rounded-lg p-4">
              <summary className="cursor-pointer font-medium">
                {faq.question}
              </summary>
              <p className="mt-2 text-gray-600 dark:text-slate-300">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* Related Categories */}
      <section className="py-4">
        <Typography variant="h2" className="!text-lg !font-medium mb-4">
          Related Tool Categories
        </Typography>
        <div className="flex flex-wrap gap-2">
          {config.relatedCategories.map((related, index) => (
            <Link
              key={index}
              href={`/tools/category/${related.slug}`}
              className={`px-4 py-2 rounded-full ${related.colorClass} ${related.hoverColorClass}`}
            >
              {related.name}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
