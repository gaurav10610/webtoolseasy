import { AppFollowButtons, AppHeading } from "@/components/commonComponents";
import { FlexList } from "@/components/lib/flexComponents";
import { getRandomId } from "@/util/commonUtils";
import * as appConfigJson from "@/data/apps.json";
import { AppListConfig, AppNavigationConfig } from "@/types/config";
import { AppHomeCard } from "@/components/appCards";
import { Typography } from "@mui/material";
import { isMobileDevice } from "@/lib/server-responsive";
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
  isMobileView,
}: Readonly<{
  category: string;
  configs: AppNavigationConfig[];
  isMobileView: boolean;
}>) {
  return FlexList({
    isFullWidth: true,
    alignCenter: true,
    items: [
      <Typography
        key={getRandomId()}
        variant="h2"
        sx={{
          fontSize: "1.5rem",
          fontWeight: "bold",
        }}
        color="textSecondary"
      >
        {category}
      </Typography>,
      FlexList({
        isFullWidth: true,
        isDirectionRow: true,
        classList: ["flex-hz-center"],
        items: map(configs, (config) => {
          return (
            <AppHomeCard
              key={getRandomId()}
              config={config}
              sx={{
                width: isMobileView ? "100%" : "20%",
              }}
            />
          );
        }),
        sx: {
          flexWrap: "wrap",
        },
      }),
    ],
  });
}

export default function Home() {
  const isMobileView = isMobileDevice();
  const appListConfig = appConfigJson as AppListConfig;
  const categoryWiseAppList = groupBy(values(appListConfig), "category");

  // Remove undefined category
  delete categoryWiseAppList["undefined"];

  return FlexList({
    isFullWidth: true,
    alignCenter: true,
    items: [
      <AppHeading
        key={getRandomId()}
        heading="Free Online Web Tools: Discover Free Tools to Make Work Super Easy"
      />,
      FlexList({
        isFullWidth: true,
        isDirectionRow: true,
        flexGap: "40px",
        items: [
          ...map(categoryWiseAppList, (configs, category) => {
            return SectionAppList({ category, configs, isMobileView });
          }),
        ],
        sx: {
          flexWrap: "wrap",
        },
      }),
      AppFollowButtons(),
    ],
  });
}
