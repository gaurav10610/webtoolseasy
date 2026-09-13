import { apps } from "@/data/apps";
import { getAllCategorySlugs, getCategoryConfig } from "@/data/categories";
import { AppNavigationConfig } from "@/types/config";
import { AppHomeCard } from "@/components/appCards";
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

  // Get all tools belonging to this category
  const categoryApps: AppNavigationConfig[] = config.toolIds
    .map((id) => apps[id])
    .filter((app): app is AppNavigationConfig => app !== undefined);

  // Generate structured data
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
        <span className="text-gray-700 dark:text-slate-200">{config.name}</span>
      </nav>

      {/* Hero Section */}
      <header
        className={`text-center py-8 bg-gradient-to-r ${config.heroGradient} rounded-xl border ${config.heroBorderColor} dark:shadow-lg`}
      >
        <h1
          className={`text-3xl md:text-4xl font-bold ${config.heroTitleColor} mb-4`}
        >
          {config.heroTitle}
        </h1>
        <p className="max-w-2xl mx-auto text-gray-600 dark:text-slate-300 mb-4 px-4 leading-relaxed">
          {config.heroDescription}
        </p>
        <div className="flex flex-wrap justify-center gap-2 px-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800 dark:bg-green-950/40 dark:text-green-300">
            ✓ 100% Client-Side
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-300">
            ✓ No Upload Required
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800 dark:bg-purple-950/40 dark:text-purple-300">
            ✓ Works Offline
          </span>
        </div>
      </header>

      {/* Tools Grid */}
      <section className="w-full">
        <h2 className="text-xl md:text-2xl font-semibold mb-6 text-center text-slate-800 dark:text-slate-100">
          Available {config.name} ({categoryApps.length})
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {map(categoryApps, (app) => (
            <article key={app.applicationId} className="w-full">
              <AppHomeCard
                config={app}
                className="w-full h-full p-4 hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-100 dark:border-slate-700 dark:bg-slate-900"
              />
            </article>
          ))}
        </div>
      </section>

      <BaseToolsAds />

      {/* Features Section */}
      <section className="py-8 px-4 bg-gray-50 rounded-xl dark:bg-slate-900/60 border border-gray-200/50 dark:border-slate-800">
        <h2 className="text-xl md:text-2xl font-semibold mb-6 text-center text-slate-800 dark:text-slate-100">
          {config.featuresTitle}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {config.features.map((feature, index) => (
            <div key={index} className="text-center p-4">
              <div className="text-4xl mb-3">{feature.emoji}</div>
              <h3 className="text-lg font-medium mb-2 text-slate-800 dark:text-slate-100">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-slate-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Sub-Sections (if available) */}
      {config.subSections && config.subSections.length > 0 && (
        <section className="py-8 px-4">
          <h2 className="text-xl md:text-2xl font-semibold mb-6 text-center text-slate-800 dark:text-slate-100">
            {config.subSectionsTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {config.subSections.map((section, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200 dark:border-slate-800 rounded-lg"
              >
                <h3 className="text-lg font-medium mb-2 text-slate-800 dark:text-slate-100">
                  {section.emoji} {section.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-slate-400">
                  {section.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FAQ Section */}
      <section className="py-8 px-4">
        <h2 className="text-xl md:text-2xl font-semibold mb-6 text-center text-slate-800 dark:text-slate-100">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4 max-w-3xl mx-auto">
          {config.faqs.map((faq, index) => (
            <details
              key={index}
              className="border border-gray-200 dark:border-slate-800 rounded-lg p-4 bg-white dark:bg-slate-900"
            >
              <summary className="cursor-pointer font-medium text-slate-800 dark:text-slate-100">
                {faq.question}
              </summary>
              <p className="mt-2 text-gray-600 dark:text-slate-300 leading-relaxed">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* Related Categories */}
      <section className="py-4">
        <h2 className="text-lg font-medium mb-4 text-slate-800 dark:text-slate-100">
          Related Tool Categories
        </h2>
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
