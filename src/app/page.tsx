import { AppHeading } from "@/components/commonComponents";
import { getRandomId } from "@/util/commonUtils";
import * as appConfigJson from "@/data/apps.json";
import { AppListConfig, AppNavigationConfig } from "@/types/config";
import { AppHomeCard } from "@/components/appCards";
import { Typography } from "@mui/material";
import { groupBy, map, values } from "lodash-es";
import { Metadata } from "next";
import { SocialShareButtons } from "@/components/socialShareButtons";
import { BaseToolsAds } from "@/components/baseAds";

const pageTitle =
  "Free Online Web Tools for Productivity, Development & Utilities";
const pageDescription =
  "Discover a comprehensive suite of free online web tools for productivity, development, and various utilities. Enhance your workflow with our easy-to-use solutions for everyday tasks and professional projects!";
const keywords =
  "free online web tools, online productivity tools, web development tools, free web utilities, online tools for developers, productivity software, developer resources, daily task utilities, easy-to-use web apps, comprehensive tool suite, online converters, online calculators, text tools, coding utilities";

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

function SectionAppList({
  category,
  configs,
}: Readonly<{
  category: string;
  configs: AppNavigationConfig[];
}>) {
  const emptyColumns = 4 - (configs.length % 4);

  return (
    <div className="flex flex-col gap-2 w-full">
      <Typography
        key={getRandomId()}
        variant="h2"
        className="!text-xl md:!text-2xl !font-medium"
        color="textSecondary"
      >
        {category}
      </Typography>
      <div className="flex flex-row flex-wrap w-full md:justify-between">
        {map(configs, (config) => {
          return (
            <AppHomeCard
              key={getRandomId()}
              config={config}
              className="w-full md:w-[24.3%] pl-2 pr-2 pt-3 pb-3 mb-3"
            />
          );
        })}
        {map(new Array(emptyColumns), () => {
          return (
            <div
              key={getRandomId()}
              className="w-full hidden md:block md:w-[24.3%] pl-2 pr-2 pt-3 pb-3 mb-3"
            />
          );
        })}
      </div>
    </div>
  );
}

export default function Home() {
  const appListConfig = appConfigJson as AppListConfig;
  const categoryWiseAppList = groupBy(values(appListConfig), "category");

  // Remove undefined category
  delete categoryWiseAppList["undefined"];

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
            <div className="flex flex-col gap-10 w-full mt-5">
              {map(categoryWiseAppList, (configs, category) => {
                return (
                  <SectionAppList
                    key={getRandomId()}
                    category={category}
                    configs={configs}
                  />
                );
              })}
            </div>
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
        <div className="flex flex-col gap-10 w-full mt-5">
          {map(categoryWiseAppList, (configs, category) => {
            return (
              <SectionAppList
                key={getRandomId()}
                category={category}
                configs={configs}
              />
            );
          })}
        </div>
        <BaseToolsAds className="w-full" />
      </div>
    </div>
  );
}
