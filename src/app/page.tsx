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
  generateFAQPageSchema,
} from "@/components/structuredData";
import { HomeDiscoveryFilter } from "@/components/HomeDiscoveryFilter";

const pageTitle =
  "110+ Free Online Tools - JSON Formatter, PDF Editor, Image Compressor & More | WebToolsEasy";
const pageDescription =
  "Use 110+ free online tools that run 100% in your browser with complete privacy. JSON formatter, PDF editor, image compressor, code beautifier, resume builder, video converter & more. No signup, no data upload, works offline.";
const keywords =
  "free online tools, private browser tools, client-side developer tools, no upload pdf editor, offline privacy-first tools";

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

function PopularToolsSection({
  allApps,
  isMobile = false,
}: Readonly<{
  allApps: AppNavigationConfig[];
  isMobile?: boolean;
}>) {
  const topAppIds = [
    "jsonformatter",
    "base64encode",
    "uuidv4generator",
    "pdfmerge",
    "imagecompressor",
    "wordcounter",
  ];
  const featuredTools = topAppIds
    .map((id) => allApps.find((app) => app.applicationId === id))
    .filter((app): app is AppNavigationConfig => !!app)
    .slice(0, isMobile ? 4 : 6);

  return (
    <div id="popular-tools-wrapper" className="w-full">
      <section
        className={`${
          isMobile ? "p-4" : "p-6"
        } bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-xl border border-purple-200 dark:border-purple-800/40`}
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
            className="!font-semibold !text-purple-800 dark:!text-purple-300"
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
          {featuredTools.map((config) => (
            <div key={config.applicationId} className="w-full">
              <AppHomeCard
                config={config}
                isPriority={true}
                className={`w-full h-full ${
                  isMobile ? "p-3" : "p-4"
                } hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-purple-200 bg-white dark:border-purple-700 dark:bg-slate-900`}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

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

export default function Home() {
  const allApps = values(apps);
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
    AppCategory.PROGRAMMING,
    AppCategory.MEDIA,
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

  const quickCategories = CATEGORY_PRIORITY.filter((c) =>
    allCategories.includes(c),
  ).slice(0, 4);

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
      {/* Structured Data */}
      <StructuredData data={organizationSchema} />
      <StructuredData data={websiteSchema} />
      <StructuredData data={faqSchema} />

      <div className="w-full py-2 md:py-4">
        <div className="flex flex-col gap-4 items-center w-full">
          <AppHeading heading="Free Online Tools — No Signup, No Upload, 100% Private" />

          <section className="app-shell-section w-full">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
              <div className="max-w-3xl">
                <AppText className="!text-base !text-[var(--mui-palette-text-secondary)]">
                  115+ free online tools for developers, designers, and everyday
                  tasks. Format JSON, compress images, edit PDFs, convert files,
                  and more — everything runs in your browser with complete
                  privacy.
                </AppText>
              </div>
              <SocialShareButtons
                pageUrl={`${process.env.HOSTNAME}`}
                heading={pageTitle}
              />
            </div>
          </section>

          <HomeDiscoveryFilter
            categories={allCategories}
            totalTools={allApps.length}
          />

          <nav
            className="grid grid-cols-2 gap-4 w-full mb-2 md:grid-cols-4"
            aria-label="Quick category access"
          >
            {quickCategories.map((category) => {
              const categoryCount = allApps.filter(
                (app) => app.category === category,
              ).length;
              return (
                <Link
                  key={`quick-${category}`}
                  href={`/?category=${encodeURIComponent(category)}`}
                  prefetch={false}
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
          </nav>

          <div className="flex flex-col gap-8 w-full mt-2">
            {ENABLE_POPULAR_TOOLS && <PopularToolsSection allApps={allApps} />}

            {sortedCategories.map((category, index) => {
              const configs = categoryWiseAppList[category] || [];
              if (configs.length === 0) return null;
              return (
                <SectionAppList
                  key={`section-${category}`}
                  category={category}
                  configs={configs}
                  showCategoryTitle={true}
                  isPriority={index === 0}
                />
              );
            })}
          </div>

          <div
            id="no-tools-found"
            style={{ display: "none" }}
            className="app-shell-section w-full text-center py-10"
          >
            <AppText variant="h6" color="textSecondary" className="mb-4">
              🔍 No tools found matching your criteria
            </AppText>
            <AppText variant="body2" color="textSecondary" className="mb-4">
              Try adjusting your search or clearing filters.
            </AppText>
            <Link href="/" className="no-underline">
              <AppChip
                label="Clear all filters"
                color="primary"
                className="cursor-pointer"
              />
            </Link>
          </div>

          {/* SEO Content Section — visible to search engines and users */}
          <section className="w-full px-4 py-8 mt-2 bg-gradient-to-b from-gray-50 to-white dark:from-slate-900/60 dark:to-slate-900/30 rounded-xl border border-gray-100 dark:border-slate-800">
            <div className="max-w-4xl mx-auto">
              <AppText
                variant="h2"
                className="!text-2xl md:!text-3xl !font-semibold !text-gray-800 dark:!text-slate-100 !mb-6"
              >
                Free Online Tools for Developers, Designers &amp; Everyone
              </AppText>

              <AppText
                variant="body1"
                className="!text-gray-600 dark:!text-slate-300 !mb-4 !leading-relaxed"
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
                className="!text-xl !font-medium !text-gray-700 dark:!text-slate-200 !mt-6 !mb-3"
              >
                Popular Developer Tools
              </AppText>
              <AppText
                variant="body1"
                className="!text-gray-600 dark:!text-slate-300 !mb-4 !leading-relaxed"
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
                className="!text-xl !font-medium !text-gray-700 dark:!text-slate-200 !mt-6 !mb-3"
              >
                Image &amp; Media Tools
              </AppText>
              <AppText
                variant="body1"
                className="!text-gray-600 dark:!text-slate-300 !mb-4 !leading-relaxed"
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
                className="!text-xl !font-medium !text-gray-700 dark:!text-slate-200 !mt-6 !mb-3"
              >
                PDF &amp; Document Tools
              </AppText>
              <AppText
                variant="body1"
                className="!text-gray-600 dark:!text-slate-300 !mb-4 !leading-relaxed"
              >
                Edit, merge, split, and compress PDF files online for free.
                Convert PDFs to images or Word documents and vice versa. Our{" "}
                <strong>resume builder</strong> and{" "}
                <strong>invoice generator</strong> create professional documents
                instantly with no signup required.
              </AppText>

              <AppText
                variant="h3"
                className="!text-xl !font-medium !text-gray-700 dark:!text-slate-200 !mt-6 !mb-3"
              >
                Why Choose WebToolsEasy?
              </AppText>
              <ul className="list-disc pl-6 text-gray-600 dark:text-slate-300 space-y-2 mb-6">
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
