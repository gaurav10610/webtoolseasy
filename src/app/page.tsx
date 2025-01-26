import { AppFollowButtons, AppHeading } from "@/components/commonComponents";
import { getRandomId } from "@/util/commonUtils";
import * as appConfigJson from "@/data/apps.json";
import { AppListConfig, AppNavigationConfig } from "@/types/config";
import { AppHomeCard } from "@/components/appCards";
import { Typography } from "@mui/material";
import { groupBy, map, values } from "lodash-es";
import { Metadata } from "next";

const pageTitle = "Online Web Tools: Browse Free Tools to Boost Productivity";
const pageDescription =
  "WebToolsEasy features multiple free online web tools. Find the perfect tool for your needs, whether you're looking for a way to edit photos, or record a screen.";

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
  openGraph: {
    title: pageTitle,
    type: "website",
    url: `${process.env.HOSTNAME}`,
    images: [
      {
        url: `${process.env.SCREENSHOTS_BASE_URL}/tools-directory.png`,
        secureUrl: `${process.env.SCREENSHOTS_BASE_URL}/tools-directory.png`,
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
    images: [`${process.env.SCREENSHOTS_BASE_URL}/tools-directory.png`],
  },
  keywords:
    "web tools, online tools, web development, web design, HTML tools, CSS tools, JavaScript tools, SEO tools, image compression, code formatter, JSON formatter, URL encoder, URL decoder, base64 encoder, base64 decoder, text editor, color picker, regex tester, lorem ipsum generator, password generator, hash generator, QR code generator, web utilities",
};

function SectionAppList({
  category,
  configs,
}: Readonly<{
  category: string;
  configs: AppNavigationConfig[];
}>) {
  return (
    <div className="flex flex-col gap-2 items-center w-full">
      <Typography
        key={getRandomId()}
        variant="h2"
        className="text-2xl font-bold"
        color="textSecondary"
      >
        {category}
      </Typography>
      <div className="flex flex-row flex-wrap gap-2 w-full justify-center">
        {map(configs, (config) => {
          return (
            <AppHomeCard
              key={getRandomId()}
              config={config}
              className="w-full md:w-[25%]"
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
    <div className="flex flex-col gap-2 items-center w-full">
      <AppHeading
        key={getRandomId()}
        heading="Free Online Web Tools: Discover Free Tools to Make Work Super Easy"
      />
      <div className="flex flex-row gap-10 w-full">
        {map(categoryWiseAppList, (configs, category) => {
          return SectionAppList({ category, configs });
        })}
      </div>
      <AppFollowButtons />
    </div>
  );
}
