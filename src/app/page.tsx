import { AppHeading } from "@/components/commonComponents";
import { apps } from "@/data/apps";
import { AppNavigationConfig, AppCategory } from "@/types/config";
import { AppHomeCard } from "@/components/appCards";
import { LazyOnView } from "@/components/common/LazyOnView";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import { groupBy, map, values, filter, includes, toLower } from "lodash-es";
import { Metadata } from "next";
import { SocialShareButtons } from "@/components/socialShareButtons";
import {
  AppAdornment,
  AppBox,
  AppChip,
  AppField,
  AppText,
} from "@/components/lib/ui";
import Link from "next/link";
import {
  StructuredData,
  generateOrganizationSchema,
  generateWebsiteSchema,
  generateFAQPageSchema,
} from "@/components/structuredData";
import { SkeletonWithProps } from "@/components/lib/skeletons";
import { Suspense } from "react";
import { featuredWorkflowSlugs, workflowBySlug } from "@/data/workflows";
import ExperimentHooks from "@/components/workflows/ExperimentHooks";

const pageTitle =
  "110+ Free Online Browser Tools — No Signup, No Upload | WebToolsEasy";
const pageDescription =
  "Free online tools for JSON formatting, PDF editing, image compression, code beautification, SEO analysis, and more. Everything runs in your browser — no upload, no signup, 100% private. Includes guided workflow packs for repeatable outcomes.";
const keywords =
  "free online tools, json formatter, pdf editor, image compressor, code beautifier, browser tools, no signup, privacy-first, developer tools, text tools, SEO tools, resume builder, password generator, qr code generator";

const ENABLE_POPULAR_TOOLS = true;

export const metadata: Metadata = {
  alternates: {
    canonical: `${process.env.HOSTNAME}`,
  },
  title: pageTitle,
  description: pageDescription,
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon_48.png", sizes: "48x48" },
      { url: "/favicon_512.png", sizes: "512x512" },
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
    url: `${process.env.HOSTNAME}`,
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

function AppDiscoveryFilters({
  categories,
  selectedCategory,
  searchQuery,
  totalTools,
  filteredCount,
}: Readonly<{
  categories: string[];
  selectedCategory: string | null;
  searchQuery: string | null;
  totalTools: number;
  filteredCount: number;
}>) {
  return (
    <AppBox className="w-full mb-6">
      <section className="app-shell-section flex flex-col gap-4">
        <header className="flex items-center gap-2 mb-1">
          <FilterListIcon color="primary" />
          <AppText variant="h6" className="!font-semibold">
            Discover tools ({filteredCount} of {totalTools})
          </AppText>
        </header>

        <form method="GET" className="w-full">
          {selectedCategory && (
            <input type="hidden" name="category" value={selectedCategory} />
          )}
          <AppField
            name="search"
            placeholder="Search tools by name or category and press Enter"
            size="small"
            fullWidth
            defaultValue={searchQuery || ""}
            slotProps={{
              input: {
                startAdornment: (
                  <AppAdornment position="start">
                    <SearchIcon color="action" />
                  </AppAdornment>
                ),
              },
            }}
          />
        </form>

        <nav className="flex flex-wrap gap-2" aria-label="Category filters">
          <Link
            href={
              searchQuery ? `/?search=${encodeURIComponent(searchQuery)}` : "/"
            }
            className="no-underline"
          >
            <AppChip
              label="All categories"
              variant={!selectedCategory ? "filled" : "outlined"}
              color={!selectedCategory ? "primary" : "default"}
              className="cursor-pointer hover:shadow-md transition-shadow"
            />
          </Link>
          {map(categories, (category) => {
            const href = searchQuery
              ? `/?category=${encodeURIComponent(
                  category,
                )}&search=${encodeURIComponent(searchQuery)}`
              : `/?category=${encodeURIComponent(category)}`;

            return (
              <Link
                key={`cat-${category}`}
                href={href}
                className="no-underline"
              >
                <AppChip
                  label={category}
                  variant={
                    selectedCategory === category ? "filled" : "outlined"
                  }
                  color={selectedCategory === category ? "primary" : "default"}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                />
              </Link>
            );
          })}
        </nav>

        {(selectedCategory || searchQuery) && (
          <div className="flex flex-wrap items-center gap-2 border-t border-[var(--mui-palette-divider)] pt-2">
            <AppText variant="body2" color="textSecondary">
              Active filters:
            </AppText>
            {selectedCategory && (
              <Link
                href={
                  searchQuery
                    ? `/?search=${encodeURIComponent(searchQuery)}`
                    : "/"
                }
                className="no-underline"
              >
                <AppChip
                  label={`Category: ${selectedCategory}`}
                  size="small"
                  color="secondary"
                  className="cursor-pointer"
                />
              </Link>
            )}
            {searchQuery && (
              <Link
                href={
                  selectedCategory
                    ? `/?category=${encodeURIComponent(selectedCategory)}`
                    : "/"
                }
                className="no-underline"
              >
                <AppChip
                  label={`Search: ${searchQuery}`}
                  size="small"
                  color="secondary"
                  className="cursor-pointer"
                />
              </Link>
            )}
          </div>
        )}
      </section>
    </AppBox>
  );
}

function PopularToolsSection({
  allApps,
  isMobile = false,
}: Readonly<{
  allApps: AppNavigationConfig[];
  isMobile?: boolean;
}>) {
  const featuredTools = [
    ...allApps
      .filter((app) => app.category === "Programming")
      .slice(0, isMobile ? 2 : 3),
    ...allApps
      .filter((app) => app.category === "Text")
      .slice(0, isMobile ? 2 : 3),
  ];

  return (
    <section
      className={`${
        isMobile ? "p-4" : "p-6"
      } bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200`}
      aria-labelledby="popular-tools-heading"
    >
      <header
        className={`flex items-center ${
          isMobile ? "gap-2 mb-4 flex-wrap" : "gap-3 mb-4"
        }`}
      >
        <AppText
          id="popular-tools-heading"
          variant={isMobile ? "h6" : "h5"}
          className="!font-semibold !text-purple-800"
        >
          🌟 Popular Tools
        </AppText>
        <AppChip
          label="Most used"
          color="secondary"
          variant="outlined"
          size="small"
        />
      </header>
      <div
        className={`grid ${
          isMobile ? "grid-cols-1 gap-3" : "grid-cols-1 md:grid-cols-3 gap-4"
        }`}
      >
        <Suspense
          fallback={
            <div
              className={`grid ${
                isMobile
                  ? "grid-cols-1 gap-3"
                  : "grid-cols-1 md:grid-cols-3 gap-4"
              }`}
            >
              {Array.from({ length: featuredTools.length }, (_, i) => (
                <SkeletonWithProps
                  key={i}
                  height={200}
                  className="rounded-lg"
                />
              ))}
            </div>
          }
        >
          {featuredTools.map((config, index) => (
            <LazyOnView
              key={config.applicationId}
              className="w-full"
              minHeight={isMobile ? 180 : 220}
            >
              <div style={{ animationDelay: `${index * 150}ms` }}>
                <AppHomeCard
                  config={config}
                  className={`w-full h-full ${
                    isMobile ? "p-3" : "p-4"
                  } hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-purple-200 bg-white dark:border-purple-700 dark:bg-slate-900`}
                />
              </div>
            </LazyOnView>
          ))}
        </Suspense>
      </div>
    </section>
  );
}

function SectionAppList({
  category,
  configs,
  showCategoryTitle = true,
}: Readonly<{
  category: string;
  configs: AppNavigationConfig[];
  showCategoryTitle?: boolean;
}>) {
  const emptyColumns = 4 - (configs.length % 4);

  return (
    <section className="flex flex-col gap-4 w-full">
      {showCategoryTitle && (
        <header className="flex items-center gap-3 pb-2 border-b border-gray-200 dark:border-slate-700">
          <AppText
            variant="h2"
            className="!text-xl md:!text-2xl !font-medium !text-gray-800"
            color="textSecondary"
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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 w-full">
        <Suspense
          fallback={
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 w-full">
              {Array.from({ length: Math.min(configs.length, 8) }, (_, i) => (
                <SkeletonWithProps
                  key={i}
                  height={180}
                  className="rounded-lg"
                />
              ))}
            </div>
          }
        >
          {map(configs, (config, index) => {
            return (
              <LazyOnView
                key={config.applicationId}
                className="w-full"
                minHeight={200}
              >
                <article
                  className="w-full"
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <AppHomeCard
                    config={config}
                    className="w-full h-full p-4 hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-100 dark:border-slate-700 dark:bg-slate-900"
                  />
                </article>
              </LazyOnView>
            );
          })}
          {map(new Array(emptyColumns), (_, idx) => {
            return (
              <div key={`empty-${idx}`} className="w-full hidden md:block" />
            );
          })}
        </Suspense>
      </div>
    </section>
  );
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const selectedCategory =
    typeof params.category === "string" ? params.category : null;
  const searchQuery = typeof params.search === "string" ? params.search : null;

  const allApps = values(apps);

  // Filter apps based on query params
  let filteredApps = allApps;

  // Filter by category
  if (selectedCategory) {
    filteredApps = filter(
      filteredApps,
      (app) => app.category === selectedCategory,
    );
  }

  // Filter by search query
  if (searchQuery) {
    const searchLower = toLower(searchQuery);
    filteredApps = filter(
      filteredApps,
      (app) =>
        includes(toLower(app.displayText), searchLower) ||
        includes(toLower(app.category), searchLower),
    );
  }

  const categoryWiseAppList = groupBy(filteredApps, "category");

  // Remove undefined category
  delete categoryWiseAppList["undefined"];

  const allCategories = [
    ...new Set(
      allApps
        .map((app) => app.category)
        .filter((category) => category && category.trim()),
    ),
  ].sort();

  // Generate structured data for home page
  const organizationSchema = generateOrganizationSchema();
  const websiteSchema = generateWebsiteSchema();
  const faqSchema = generateFAQPageSchema({
    faqs: [
      {
        question: "What is WebToolsEasy?",
        answer:
          "WebToolsEasy is a collection of 115+ free online tools including JSON formatter, PDF editor, image compressor, code beautifier, resume builder, and more. All tools run 100% in your browser — your data never leaves your device.",
      },
      {
        question: "Are these tools completely free?",
        answer:
          "Yes, all 115+ tools on WebToolsEasy are completely free to use with no hidden charges, no signup required, and no usage limits.",
      },
      {
        question: "Is my data safe when using these tools?",
        answer:
          "Absolutely. All tools process your data locally in your browser using client-side JavaScript. No data is ever uploaded to any server, ensuring 100% privacy and security.",
      },
      {
        question: "Do these tools work offline?",
        answer:
          "Yes. Once the page is loaded, most tools work without an internet connection since all processing happens directly in your browser.",
      },
      {
        question: "What categories of tools are available?",
        answer:
          "WebToolsEasy offers tools across 7 categories: Programming (JSON formatter, code minifier, regex tester), Media (image compressor, video converter, GIF maker), Text (word counter, case converter), Finance (loan calculator, SIP calculator), Online Editors (JavaScript editor, HTML editor, Markdown editor), SEO & Development (meta tag generator, robots.txt generator), and Miscellaneous (password generator, QR code generator, resume builder).",
      },
    ],
  });

  return (
    <>
      <ExperimentHooks event="entry" />
      {/* Structured Data */}
      <StructuredData data={organizationSchema} />
      <StructuredData data={websiteSchema} />
      <StructuredData data={faqSchema} />

      <div className="w-full py-2 md:py-4">
        <div className="flex flex-col gap-4 items-center w-full">
          <AppHeading heading="Free Privacy-First Browser Tools — No Signup, No Upload" />
          <section className="app-shell-section w-full">
            <div className="flex flex-wrap items-center gap-2">
              {featuredWorkflowSlugs.map((slug) => {
                const workflow = workflowBySlug[slug];
                return (
                  <Link
                    key={slug}
                    href={`/workflows/${slug}`}
                    className="no-underline"
                  >
                    <AppChip
                      label={`Workflow: ${workflow?.name ?? slug}`}
                      color="secondary"
                      variant="outlined"
                      className="cursor-pointer"
                    />
                  </Link>
                );
              })}
              <Link href="/templates" className="no-underline">
                <AppChip
                  label="Browse Templates"
                  color="primary"
                  className="cursor-pointer"
                />
              </Link>
            </div>
          </section>

          <section className="app-shell-section w-full">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
              <div className="max-w-3xl">
                <AppText className="!text-base !text-[var(--mui-palette-text-secondary)]">
                  Start with guided workflow packs for repeatable outcomes, then
                  drop into individual tools as needed. Everything still runs in
                  your browser with complete privacy-first processing.
                </AppText>
              </div>
              <SocialShareButtons
                pageUrl={`${process.env.HOSTNAME}`}
                heading={pageTitle}
              />
            </div>
          </section>

          <AppDiscoveryFilters
            categories={allCategories}
            selectedCategory={selectedCategory}
            searchQuery={searchQuery}
            totalTools={allApps.length}
            filteredCount={filteredApps.length}
          />

          {!selectedCategory && !searchQuery && (
            <nav
              className="grid grid-cols-2 gap-4 w-full mb-2 md:grid-cols-4"
              aria-label="Quick category access"
            >
              <Suspense
                fallback={
                  <div className="grid grid-cols-2 gap-4 w-full md:grid-cols-4">
                    {Array.from({ length: 4 }, (_, i) => (
                      <SkeletonWithProps
                        key={i}
                        height={88}
                        className="rounded-lg"
                      />
                    ))}
                  </div>
                }
              >
                {allCategories.slice(0, 4).map((category) => {
                  const categoryCount = allApps.filter(
                    (app) => app.category === category,
                  ).length;
                  return (
                    <Link
                      key={`quick-${category}`}
                      href={`/?category=${encodeURIComponent(category)}`}
                      className="no-underline"
                    >
                      <AppBox className="app-shell-section !p-4 text-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md cursor-pointer">
                        <AppText
                          variant="h6"
                          className="!font-bold !text-[var(--mui-palette-primary-main)]"
                        >
                          {categoryCount}
                        </AppText>
                        <AppText
                          variant="body2"
                          color="textSecondary"
                          className="truncate"
                        >
                          {category}
                        </AppText>
                      </AppBox>
                    </Link>
                  );
                })}
              </Suspense>
            </nav>
          )}

          {filteredApps.length > 0 ? (
            <div className="flex flex-col gap-8 w-full mt-2">
              {!selectedCategory && !searchQuery && ENABLE_POPULAR_TOOLS && (
                <PopularToolsSection allApps={allApps} />
              )}

              {map(categoryWiseAppList, (configs, category) => {
                return (
                  <SectionAppList
                    key={`section-${category}`}
                    category={category}
                    configs={configs}
                    showCategoryTitle={!searchQuery}
                  />
                );
              })}
            </div>
          ) : (
            <div className="app-shell-section w-full text-center py-10">
              <AppText variant="h6" color="textSecondary" className="mb-4">
                🔍 No tools found matching your criteria
              </AppText>
              <AppText variant="body2" color="textSecondary" className="mb-4">
                Try adjusting your search or removing filters.
              </AppText>
              <Link href="/" className="no-underline">
                <AppChip
                  label="Clear all filters"
                  color="primary"
                  className="cursor-pointer"
                />
              </Link>
            </div>
          )}

          {/* SEO Content Section — visible to search engines and users */}
          <section className="w-full px-4 py-8 mt-2 bg-gradient-to-b from-gray-50 to-white rounded-xl border border-gray-100">
            <div className="max-w-4xl mx-auto">
              <AppText
                variant="h2"
                className="!text-2xl md:!text-3xl !font-semibold !text-gray-800 !mb-6"
              >
                Free Online Tools for Developers, Designers &amp; Everyone
              </AppText>

              <AppText
                variant="body1"
                className="!text-gray-600 !mb-4 !leading-relaxed"
              >
                WebToolsEasy provides 115+ free browser-based utilities that
                handle everything from JSON formatting and code beautification
                to PDF editing, image compression, and financial calculations.
                Unlike other online tools,{" "}
                <strong>your data never leaves your browser</strong> — every
                operation runs locally using client-side JavaScript, giving you
                complete privacy and security without any server uploads.
              </AppText>

              <AppText
                variant="h3"
                className="!text-xl !font-medium !text-gray-700 !mt-6 !mb-3"
              >
                Popular Developer Tools
              </AppText>
              <AppText
                variant="body1"
                className="!text-gray-600 !mb-4 !leading-relaxed"
              >
                Our developer toolkit includes a powerful{" "}
                <strong>JSON formatter</strong> and validator,{" "}
                <strong>JavaScript editor</strong> with live preview,{" "}
                <strong>HTML/CSS/SQL formatter</strong>,{" "}
                <strong>regex tester</strong>,{" "}
                <strong>Base64 encoder/decoder</strong>,{" "}
                <strong>JWT decoder</strong>, <strong>diff checker</strong>, and
                converters for JSON&#8596;CSV, JSON&#8596;YAML, XML&#8596;JSON,
                and Markdown&#8596;HTML. All formatters support syntax
                highlighting, error detection, and one-click copy.
              </AppText>

              <AppText
                variant="h3"
                className="!text-xl !font-medium !text-gray-700 !mt-6 !mb-3"
              >
                Image &amp; Media Tools
              </AppText>
              <AppText
                variant="body1"
                className="!text-gray-600 !mb-4 !leading-relaxed"
              >
                Compress images, convert formats (PNG, JPG, WebP, SVG), resize
                and crop photos, remove backgrounds, and create GIFs — all
                without uploading to any server. Our{" "}
                <strong>video converter</strong>,{" "}
                <strong>screen recorder</strong>, and{" "}
                <strong>audio recorder</strong> tools let you work with media
                files directly in your browser using WebAssembly-powered
                processing.
              </AppText>

              <AppText
                variant="h3"
                className="!text-xl !font-medium !text-gray-700 !mt-6 !mb-3"
              >
                PDF &amp; Document Tools
              </AppText>
              <AppText
                variant="body1"
                className="!text-gray-600 !mb-4 !leading-relaxed"
              >
                Edit, merge, split, and compress PDF files online for free.
                Convert PDFs to images or Word documents and vice versa. Our{" "}
                <strong>resume builder</strong> and{" "}
                <strong>invoice generator</strong> create professional documents
                instantly with no signup required.
              </AppText>

              <AppText
                variant="h3"
                className="!text-xl !font-medium !text-gray-700 !mt-6 !mb-3"
              >
                Why Choose WebToolsEasy?
              </AppText>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
                <li>
                  <strong>100% Free</strong> — No hidden fees, no premium tiers,
                  no usage limits
                </li>
                <li>
                  <strong>Complete Privacy</strong> — All processing happens in
                  your browser, zero server uploads
                </li>
                <li>
                  <strong>No Signup Required</strong> — Use any tool instantly
                  without creating an account
                </li>
                <li>
                  <strong>Works Offline</strong> — Once loaded, most tools
                  function without internet
                </li>
                <li>
                  <strong>Mobile Friendly</strong> — Responsive design works on
                  phones, tablets, and desktops
                </li>
                <li>
                  <strong>Auto-Save</strong> — Your work is automatically saved
                  and restored on page reload
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export async function generateStaticParams(): Promise<{ category: string }[]> {
  const allApps = values(apps) as AppNavigationConfig[];
  const enumValues = new Set(Object.values(AppCategory));

  const categories = Array.from(
    new Set(
      allApps
        .map((a) => a.category)
        .filter(
          (c): c is AppCategory => !!c && enumValues.has(c as AppCategory),
        ),
    ),
  ).sort((a: AppCategory, b: AppCategory) =>
    String(a).localeCompare(String(b)),
  );

  return categories.map((category) => ({ category: String(category) }));
}
