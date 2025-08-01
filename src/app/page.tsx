import { AppHeading } from "@/components/commonComponents";
import { getRandomId } from "@/util/commonUtils";
import * as appConfigJson from "@/data/apps.json";
import { AppListConfig, AppNavigationConfig } from "@/types/config";
import { AppHomeCard } from "@/components/appCards";
import {
  Typography,
  Chip,
  Box,
  Fade,
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

const pageTitle =
  "Free Online Web Tools for Productivity, Development & Utilities";
const pageDescription =
  "Discover a comprehensive suite of free online web tools for productivity, development, and various utilities. Enhance your workflow with our easy-to-use solutions for everyday tasks and professional projects!";
const keywords =
  "free online web tools, online productivity tools, web development tools, free web utilities, online tools for developers, productivity software, developer resources, daily task utilities, easy-to-use web apps, comprehensive tool suite, online converters, online calculators, text tools, coding utilities";

// Feature flags
const ENABLE_POPULAR_TOOLS = false; // Set to true to enable popular tools section

export const metadata: Metadata = {
  alternates: {
    canonical: `${process.env.HOSTNAME}`,
  },
  title: pageTitle,
  description: pageDescription,
  icons: "/favicon.png",
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

// Enhanced App Discovery Filter Component (Server-side with Forms)
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
      <Fade in={true} timeout={800}>
        <div className="flex flex-col gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
          {/* Header */}
          <div className="flex items-center gap-2 mb-2">
            <FilterListIcon color="primary" />
            <Typography variant="h6" className="!font-medium">
              Discover Tools ({filteredCount} of {totalTools})
            </Typography>
          </div>

          {/* Search Form */}
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

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            <Link
              href={
                searchQuery
                  ? `/?search=${encodeURIComponent(searchQuery)}`
                  : "/"
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
                    color={
                      selectedCategory === category ? "primary" : "default"
                    }
                    className="cursor-pointer hover:shadow-md transition-shadow"
                  />
                </Link>
              );
            })}
          </div>

          {/* Active Filters Display */}
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
        </div>
      </Fade>
    </Box>
  );
}

// Popular Tools Component
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
    <Fade in={true} timeout={1000}>
      <Box
        className={`${
          isMobile ? "p-4" : "p-6"
        } bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200`}
      >
        <div
          className={`flex items-center ${
            isMobile ? "gap-2 mb-4 flex-wrap" : "gap-3 mb-4"
          }`}
        >
          <Typography
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
        </div>
        <div
          className={`grid ${
            isMobile ? "grid-cols-1 gap-3" : "grid-cols-1 md:grid-cols-3 gap-4"
          }`}
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
        </div>
      </Box>
    </Fade>
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
    <Fade in={true} timeout={600}>
      <div className="flex flex-col gap-4 w-full">
        {showCategoryTitle && (
          <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
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
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
          {map(configs, (config, index) => {
            return (
              <div
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
              </div>
            );
          })}
          {/* Fill empty columns on desktop */}
          {map(new Array(emptyColumns), () => {
            return (
              <div key={getRandomId()} className="w-full hidden md:block" />
            );
          })}
        </div>
      </div>
    </Fade>
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

  const appListConfig = appConfigJson as AppListConfig;
  const allApps = values(appListConfig);

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

  // Get all unique categories for filters
  const allCategories = Array.from(
    new Set(allApps.map((app) => app.category))
  ).filter(Boolean);

  return (
    <div className="w-full px-2 py-4">
      {/* Desktop Layout with 60% restriction */}
      <div className="hidden md:flex w-full max-w-none">
        {/* Left sidebar - 20% */}
        <div className="w-[20%] pr-2">
          <BaseToolsAds className="w-full" />
        </div>

        {/* Main content area - 60% */}
        <div className="w-[60%] px-2">
          <div className="flex flex-col gap-4 items-center w-full">
            <AppHeading heading="Free Online Web Tools for Productivity, Development & Utilities" />
            <SocialShareButtons
              pageUrl={`${process.env.HOSTNAME}`}
              heading={pageTitle}
            />

            {/* Enhanced App Discovery Filters */}
            <AppDiscoveryFilters
              categories={allCategories}
              selectedCategory={selectedCategory}
              searchQuery={searchQuery}
              totalTools={allApps.length}
              filteredCount={filteredApps.length}
            />

            {/* Quick Stats */}
            {!selectedCategory && !searchQuery && (
              <Fade in={true} timeout={1200}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mb-4">
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
                </div>
              </Fade>
            )}

            {/* Results */}
            {filteredApps.length > 0 ? (
              <div className="flex flex-col gap-8 w-full mt-5">
                {/* Featured Tools Section (only show when no filters applied and feature is enabled) */}
                {!selectedCategory && !searchQuery && ENABLE_POPULAR_TOOLS && (
                  <PopularToolsSection allApps={allApps} />
                )}

                {/* All Categories */}
                {map(categoryWiseAppList, (configs, category) => {
                  return (
                    <SectionAppList
                      key={getRandomId()}
                      category={category}
                      configs={configs}
                      showCategoryTitle={!searchQuery} // Hide category titles when searching
                    />
                  );
                })}
              </div>
            ) : (
              <Fade in={true} timeout={600}>
                <Box className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
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
                  <div className="flex justify-center gap-2 flex-wrap">
                    <Link href="/" className="no-underline">
                      <Chip
                        label="Clear All Filters"
                        color="primary"
                        className="cursor-pointer"
                      />
                    </Link>
                  </div>
                </Box>
              </Fade>
            )}
          </div>
        </div>

        {/* Right sidebar - 20% */}
        <div className="w-[20%] pl-2">
          <BaseToolsAds className="w-full" />
        </div>
      </div>

      {/* Mobile Layout - Full width */}
      <div className="flex md:hidden flex-col gap-4 items-center w-full">
        <AppHeading heading="Free Online Web Tools for Productivity, Development & Utilities" />
        <SocialShareButtons
          pageUrl={`${process.env.HOSTNAME}`}
          heading={pageTitle}
        />

        {/* Enhanced App Discovery Filters - Mobile */}
        <AppDiscoveryFilters
          categories={allCategories}
          selectedCategory={selectedCategory}
          searchQuery={searchQuery}
          totalTools={allApps.length}
          filteredCount={filteredApps.length}
        />

        {/* Results - Mobile */}
        {filteredApps.length > 0 ? (
          <div className="flex flex-col gap-8 w-full mt-5">
            {/* Featured Tools Section - Mobile (only show when no filters applied and feature is enabled) */}
            {!selectedCategory && !searchQuery && ENABLE_POPULAR_TOOLS && (
              <PopularToolsSection allApps={allApps} isMobile={true} />
            )}

            {/* All Categories - Mobile */}
            {map(categoryWiseAppList, (configs, category) => {
              return (
                <SectionAppList
                  key={getRandomId()}
                  category={category}
                  configs={configs}
                  showCategoryTitle={!searchQuery} // Hide category titles when searching
                />
              );
            })}
          </div>
        ) : (
          <Fade in={true} timeout={600}>
            <Box className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
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
            </Box>
          </Fade>
        )}
        <BaseToolsAds className="w-full" />
      </div>
    </div>
  );
}
