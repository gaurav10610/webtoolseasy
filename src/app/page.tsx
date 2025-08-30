import { AppHeading } from "@/components/commonComponents";
import { getRandomId } from "@/util/commonUtils";
import { apps } from "@/data/apps";
import { AppNavigationConfig, AppCategory } from "@/types/config";
import { AppHomeCard } from "@/components/appCards";
import {
  Typography,
  Chip,
  Box,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import { groupBy, map, values, filter, includes, toLower } from "lodash-es";
import { Metadata } from "next";
import { SocialShareButtons } from "@/components/socialShareButtons";
import { BaseToolsAds } from "@/components/baseAds";
import Link from "next/link";
import {
  StructuredData,
  generateOrganizationSchema,
  generateWebsiteSchema,
} from "@/components/structuredData";
import { SkeletonWithProps } from "@/components/lib/skeletons";
import { Suspense } from "react";

const pageTitle = "Free Online Tools - Web Utilities & Productivity";
const pageDescription =
  "Access 30+ free online tools for development, text editing, media conversion & more. No downloads required. Boost productivity instantly.";
const keywords =
  "free online tools, web utilities, productivity tools, developer tools, text editor online, converter tools, no download required";

const ENABLE_POPULAR_TOOLS = false;

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
    <Box className="w-full mb-6">
      <section className="flex flex-col gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
        <header className="flex items-center gap-2 mb-2">
          <FilterListIcon color="primary" />
          <Typography variant="h6" className="!font-medium">
            Discover Tools ({filteredCount} of {totalTools})
          </Typography>
        </header>

        <form method="GET" className="w-full">
          {selectedCategory && (
            <input type="hidden" name="category" value={selectedCategory} />
          )}
          <TextField
            name="search"
            placeholder="Search tools by name or description... (Press Enter to search)"
            size="small"
            fullWidth
            defaultValue={searchQuery || ""}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
            className="mb-3"
          />
        </form>

        <nav className="flex flex-wrap gap-2" aria-label="Category filters">
          <Link
            href={
              searchQuery ? `/?search=${encodeURIComponent(searchQuery)}` : "/"
            }
            className="no-underline"
          >
            <Chip
              label="All Categories"
              variant={!selectedCategory ? "filled" : "outlined"}
              color={!selectedCategory ? "primary" : "default"}
              className="cursor-pointer hover:shadow-md transition-shadow"
            />
          </Link>
          {map(categories, (category) => {
            const href = searchQuery
              ? `/?category=${encodeURIComponent(
                  category
                )}&search=${encodeURIComponent(searchQuery)}`
              : `/?category=${encodeURIComponent(category)}`;

            return (
              <Link key={getRandomId()} href={href} className="no-underline">
                <Chip
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
          <div className="flex items-center gap-2 pt-2 border-t border-blue-200">
            <Typography variant="body2" color="textSecondary">
              Active filters:
            </Typography>
            {selectedCategory && (
              <Link
                href={
                  searchQuery
                    ? `/?search=${encodeURIComponent(searchQuery)}`
                    : "/"
                }
                className="no-underline"
              >
                <Chip
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
                <Chip
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
    </Box>
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
        <Typography
          id="popular-tools-heading"
          variant={isMobile ? "h6" : "h5"}
          className="!font-semibold !text-purple-800"
        >
          🌟 Popular Tools
        </Typography>
        <Chip
          label="Most Used"
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
            <div
              key={getRandomId()}
              className="w-full"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <AppHomeCard
                config={config}
                className={`w-full h-full ${
                  isMobile ? "p-3" : "p-4"
                } hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-purple-200 bg-white`}
              />
            </div>
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
        <header className="flex items-center gap-3 pb-2 border-b border-gray-200">
          <Typography
            key={getRandomId()}
            variant="h2"
            className="!text-xl md:!text-2xl !font-medium !text-gray-800"
            color="textSecondary"
          >
            {category}
          </Typography>
          <Chip
            label={`${configs.length} tools`}
            size="small"
            variant="outlined"
            color="primary"
          />
        </header>
      )}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
        <Suspense
          fallback={
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
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
              <article
                key={getRandomId()}
                className="w-full"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <AppHomeCard
                  config={config}
                  className="w-full h-full p-4 hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-100"
                />
              </article>
            );
          })}
          {map(new Array(emptyColumns), () => {
            return (
              <div key={getRandomId()} className="w-full hidden md:block" />
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
      (app) => app.category === selectedCategory
    );
  }

  // Filter by search query
  if (searchQuery) {
    const searchLower = toLower(searchQuery);
    filteredApps = filter(
      filteredApps,
      (app) =>
        includes(toLower(app.displayText), searchLower) ||
        includes(toLower(app.category), searchLower)
    );
  }

  const categoryWiseAppList = groupBy(filteredApps, "category");

  // Remove undefined category
  delete categoryWiseAppList["undefined"];

  const allCategories = [
    ...new Set(
      allApps
        .map((app) => app.category)
        .filter((category) => category && category.trim())
    ),
  ].sort();

  // Generate structured data for home page
  const organizationSchema = generateOrganizationSchema();
  const websiteSchema = generateWebsiteSchema();

  return (
    <>
      {/* Structured Data */}
      <StructuredData data={organizationSchema} />
      <StructuredData data={websiteSchema} />

      <div className="w-full px-2 py-4">
        {/* Desktop Layout with 60% restriction */}
        <div className="hidden md:flex w-full max-w-none">
          <aside className="w-[20%] pr-2">
            <BaseToolsAds className="w-full" />
          </aside>

          <section className="w-[60%] px-2">
            <div className="flex flex-col gap-4 items-center w-full">
              <AppHeading heading="Free Online Tools - Web Utilities & Productivity Suite" />
              <SocialShareButtons
                pageUrl={`${process.env.HOSTNAME}`}
                heading={pageTitle}
              />

              <AppDiscoveryFilters
                categories={allCategories}
                selectedCategory={selectedCategory}
                searchQuery={searchQuery}
                totalTools={allApps.length}
                filteredCount={filteredApps.length}
              />

              {!selectedCategory && !searchQuery && (
                <nav
                  className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mb-4"
                  aria-label="Quick category access"
                >
                  <Suspense
                    fallback={
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mb-4">
                        {Array.from({ length: 4 }, (_, i) => (
                          <SkeletonWithProps
                            key={i}
                            height={80}
                            className="rounded-lg"
                          />
                        ))}
                      </div>
                    }
                  >
                    {allCategories.slice(0, 4).map((category) => {
                      const categoryCount = allApps.filter(
                        (app) => app.category === category
                      ).length;
                      return (
                        <Link
                          key={getRandomId()}
                          href={`/?category=${encodeURIComponent(category)}`}
                          className="no-underline"
                        >
                          <Box className="p-3 text-center bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer hover:border-blue-300">
                            <Typography
                              variant="h6"
                              className="!font-bold !text-blue-600"
                            >
                              {categoryCount}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              className="truncate"
                            >
                              {category}
                            </Typography>
                          </Box>
                        </Link>
                      );
                    })}
                  </Suspense>
                </nav>
              )}

              {filteredApps.length > 0 ? (
                <div className="flex flex-col gap-8 w-full mt-5">
                  {!selectedCategory &&
                    !searchQuery &&
                    ENABLE_POPULAR_TOOLS && (
                      <PopularToolsSection allApps={allApps} />
                    )}

                  {map(categoryWiseAppList, (configs, category) => {
                    return (
                      <SectionAppList
                        key={getRandomId()}
                        category={category}
                        configs={configs}
                        showCategoryTitle={!searchQuery}
                      />
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
                  <Typography
                    variant="h6"
                    color="textSecondary"
                    className="mb-4"
                  >
                    🔍 No tools found matching your criteria
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    className="mb-4"
                  >
                    Try adjusting your search or removing filters
                  </Typography>
                  <Link href="/" className="no-underline">
                    <Chip
                      label="Clear All Filters"
                      color="primary"
                      className="cursor-pointer"
                    />
                  </Link>
                </div>
              )}
            </div>
          </section>

          <aside className="w-[20%] pl-2">
            <BaseToolsAds className="w-full" />
          </aside>
        </div>

        <div className="flex md:hidden flex-col gap-4 items-center w-full">
          <AppHeading heading="Free Online Tools - Web Utilities & Productivity Suite" />
          <SocialShareButtons
            pageUrl={`${process.env.HOSTNAME}`}
            heading={pageTitle}
          />

          <AppDiscoveryFilters
            categories={allCategories}
            selectedCategory={selectedCategory}
            searchQuery={searchQuery}
            totalTools={allApps.length}
            filteredCount={filteredApps.length}
          />

          {filteredApps.length > 0 ? (
            <div className="flex flex-col gap-8 w-full mt-5">
              {!selectedCategory && !searchQuery && ENABLE_POPULAR_TOOLS && (
                <PopularToolsSection allApps={allApps} isMobile={true} />
              )}

              {map(categoryWiseAppList, (configs, category) => {
                return (
                  <SectionAppList
                    key={getRandomId()}
                    category={category}
                    configs={configs}
                    showCategoryTitle={!searchQuery}
                  />
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
              <Typography variant="h6" color="textSecondary" className="mb-4">
                🔍 No tools found
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                className="mb-4"
              >
                Try adjusting your search or removing filters
              </Typography>
              <Link href="/" className="no-underline">
                <Chip
                  label="Clear Filters"
                  color="primary"
                  className="cursor-pointer"
                />
              </Link>
            </div>
          )}
          <BaseToolsAds className="w-full" />
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
          (c): c is AppCategory => !!c && enumValues.has(c as AppCategory)
        )
    )
  ).sort((a: AppCategory, b: AppCategory) =>
    String(a).localeCompare(String(b))
  );

  return categories.map((category) => ({ category: String(category) }));
}
