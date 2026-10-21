import { AppHeading } from "@/components/commonComponents";
import { apps } from "@/data/apps";
import { AppCategory, AppNavigationConfig } from "@/types/config";
import { AppHomeCard } from "@/components/appCards";
import { groupBy, map, values } from "lodash-es";
import { Metadata } from "next";
import { SocialShareButtons } from "@/components/socialShareButtons";
import { AppBox, AppChip, AppText } from "@/components/lib/ui";
import Link from "next/link";
import {
  StructuredData,
  generateOrganizationSchema,
  generateWebsiteSchema,
  generateBreadcrumbSchema,
} from "@/components/structuredData";
import { HomeDiscoveryFilter } from "@/components/HomeDiscoveryFilter";

const pageTitle =
  "All 110+ Free Online Tools Directory — 100% Private Client-Side Utilities | WebToolsEasy";
const pageDescription =
  "Complete directory of 110+ free, client-side browser tools for developers, creators, and everyday tasks. JSON formatter, PDF editor, image compressor, Base64 encoder, regex tester & more. Zero cloud uploads, 100% private.";
const keywords =
  "all free online tools, developer tools directory, client-side utilities, json formatter, pdf merge, image compressor, webtoolseasy tools";

export const metadata: Metadata = {
  alternates: {
    canonical: `${process.env.HOSTNAME || "https://webtoolseasy.com"}/tools`,
  },
  title: pageTitle,
  description: pageDescription,
  robots: "index, follow",
  metadataBase: new URL(process.env.HOSTNAME || "https://webtoolseasy.com"),
  openGraph: {
    title: pageTitle,
    type: "website",
    url: `${process.env.HOSTNAME || "https://webtoolseasy.com"}/tools`,
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

function SectionAppList({
  category,
  configs,
  showCategoryTitle = true,
  isPriority = false,
}: Readonly<{
  category: string;
  configs: AppNavigationConfig[];
  showCategoryTitle?: boolean;
  isPriority?: boolean;
}>) {
  const emptyColumns = 4 - (configs.length % 4);

  return (
    <section
      className="flex flex-col gap-4 w-full tool-category-section"
      data-category-section={category}
      style={
        !isPriority
          ? {
              contentVisibility: "auto",
              containIntrinsicSize: "0 400px",
            }
          : undefined
      }
    >
      {showCategoryTitle && (
        <header className="flex items-center gap-3 pb-2 border-b border-gray-200 dark:border-slate-700">
          <AppText
            variant="h2"
            className="!text-xl md:!text-2xl !font-medium !text-gray-800 dark:!text-slate-100"
          >
            {category}
          </AppText>
          <AppChip
            label={`${configs.length} tools`}
            size="small"
            variant="outlined"
            color="primary"
          />
        </header>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
        {map(configs, (config) => (
          <article
            key={config.applicationId}
            className="w-full tool-card-item"
            data-tool-id={config.applicationId}
            data-tool-name={config.displayText.toLowerCase()}
            data-tool-category={(config.category || "").toLowerCase()}
          >
            <AppHomeCard
              config={config}
              className="w-full h-full p-4 hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-100 dark:border-slate-700 dark:bg-slate-900"
            />
          </article>
        ))}
        {emptyColumns < 4 &&
          map(new Array(emptyColumns), (_, idx) => (
            <div key={`empty-${idx}`} className="w-full hidden lg:block" />
          ))}
      </div>
    </section>
  );
}

export default function ToolsDirectoryPage() {
  const EXCLUDED_REDIRECTED = new Set([
    "tools/text-compare",
    "tools/html-to-markdown",
    "tools/mortgage-calculator",
    "tools/text-editor",
  ]);
  const allApps = values(apps).filter(
    (app) => !EXCLUDED_REDIRECTED.has(app.navigateUrl)
  );
  const categoryWiseAppList = groupBy(allApps, "category");
  delete categoryWiseAppList["undefined"];

  const allCategories = [
    ...new Set(
      allApps
        .map((app) => app.category)
        .filter((category) => category && category.trim()),
    ),
  ].sort();

  const CATEGORY_PRIORITY: AppCategory[] = [
    AppCategory.MEDIA,
    AppCategory.PROGRAMMING,
    AppCategory.TEXT,
    AppCategory.ONLINE_EDITORS,
    AppCategory.SEO,
    AppCategory.MISCELLANEOUS,
    AppCategory.FINANCE,
  ];

  const sortedCategories = (Object.keys(categoryWiseAppList) as AppCategory[]).sort(
    (a, b) => {
      const idxA = CATEGORY_PRIORITY.indexOf(a);
      const idxB = CATEGORY_PRIORITY.indexOf(b);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return a.localeCompare(b);
    },
  );

  const organizationSchema = generateOrganizationSchema();
  const websiteSchema = generateWebsiteSchema();
  const breadcrumbSchema = generateBreadcrumbSchema({
    items: [
      { name: "Home", url: `${process.env.HOSTNAME || "https://webtoolseasy.com"}/` },
      { name: "Tools Directory", url: `${process.env.HOSTNAME || "https://webtoolseasy.com"}/tools` },
    ],
  });

  return (
    <>
      <StructuredData data={organizationSchema} />
      <StructuredData data={websiteSchema} />
      <StructuredData data={breadcrumbSchema} />

      <div className="w-full py-4 md:py-6">
        <div className="flex flex-col gap-6 items-center w-full">
          {/* Header */}
          <div className="w-full text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
              <span className="w-2 h-2 rounded-full bg-sky-500"></span>
              Complete Directory • 110+ Client-Side Utilities
            </div>
            <AppHeading heading="All Free Online Tools &amp; Utilities" />
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Every tool runs 100% in your browser using local WebAssembly, HTML5, and JavaScript APIs. Zero files or data ever leave your device.
            </p>
          </div>

          {/* Social Share & Search */}
          <div className="w-full flex justify-end">
            <SocialShareButtons
              pageUrl={`${process.env.HOSTNAME || "https://webtoolseasy.com"}/tools`}
              heading={pageTitle}
            />
          </div>

          <HomeDiscoveryFilter
            categories={allCategories}
            totalTools={allApps.length}
          />

          {/* Quick Categories Navigation */}
          <nav
            className="grid grid-cols-2 gap-3 w-full sm:grid-cols-4 md:grid-cols-7"
            aria-label="Quick category access"
          >
            {sortedCategories.map((category) => {
              const count = allApps.filter((a) => a.category === category).length;
              return (
                <Link
                  key={`quick-dir-${category}`}
                  href={`#category-${encodeURIComponent(category)}`}
                  className="no-underline"
                >
                  <AppBox className="p-3 text-center rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-sky-500 transition shadow-xs hover:shadow-md cursor-pointer">
                    <AppText className="!font-bold !text-sm text-sky-600 dark:text-sky-400">
                      {count}
                    </AppText>
                    <AppText className="truncate text-xs text-slate-500 dark:text-slate-400">
                      {category}
                    </AppText>
                  </AppBox>
                </Link>
              );
            })}
          </nav>

          {/* Categorized Tool Lists */}
          <div className="flex flex-col gap-8 w-full mt-4">
            {sortedCategories.map((category, index) => {
              const configs = categoryWiseAppList[category] || [];
              if (configs.length === 0) return null;
              return (
                <div key={`section-wrapper-${category}`} id={`category-${encodeURIComponent(category)}`}>
                  <SectionAppList
                    category={category}
                    configs={configs}
                    showCategoryTitle={true}
                    isPriority={index === 0}
                  />
                </div>
              );
            })}
          </div>

          {/* No results placeholder */}
          <div
            id="no-tools-found"
            style={{ display: "none" }}
            className="w-full text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800"
          >
            <AppText variant="h6" color="textSecondary" className="mb-2">
              🔍 No tools found matching your criteria
            </AppText>
            <AppText variant="body2" color="textSecondary" className="mb-4">
              Try adjusting your search query or clear the selected filter.
            </AppText>
            <Link href="/tools" className="no-underline">
              <AppChip
                label="Reset Search"
                color="primary"
                className="cursor-pointer"
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
