import { AppHeading } from "@/components/commonComponents";
import { getRandomId } from "@/util/commonUtils";
import * as appConfigJson from "@/data/apps.json";
import { AppListConfig, AppNavigationConfig } from "@/types/config";
import { AppHomeCard } from "@/components/appCards";
import { Typography } from "@mui/material";
import { groupBy, join, map, random, values } from "lodash-es";
import { Metadata } from "next";
import { SocialShareButtons } from "@/components/socialShareButtons";
import { BaseToolsAds } from "@/components/baseAds";
import Script from "next/script";
import { WithContext, Organization, ItemList } from "schema-dts";

const pageTitle = "Online Web Tools: Browse Free Tools to Boost Productivity";
const pageDescription =
  "WebToolsEasy features multiple free online web tools. Find the perfect tool for your needs, whether you're looking for a way to edit photos, or record a screen.";
const keywords =
  "web tools, online tools, web development, web design, HTML tools, CSS tools, JavaScript tools, SEO tools, image compression, code formatter, JSON formatter, URL encoder, URL decoder, base64 encoder, base64 decoder, text editor, color picker, regex tester, lorem ipsum generator, password generator, hash generator, QR code generator, web utilities";

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
      <div className="flex flex-row flex-wrap gap-4 w-full">
        {map(configs, (config) => {
          return (
            <AppHomeCard
              key={getRandomId()}
              config={config}
              className="w-full md:w-[23%] pl-2 pr-2 pt-3 pb-3"
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

  const orgSchemaData: WithContext<Organization> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "WebToolsEasy",
    url: process.env.HOSTNAME,
    logo: `${process.env.HOSTNAME}/favicon.png`,
    description:
      "WebToolsEasy features multiple free online web tools. Free web tools to make work super easy",
    sameAs: [
      "https://www.facebook.com/people/Webtoolseasy/100088911459047/",
      "https://www.linkedin.com/company/webtoolseasy/",
      "https://twitter.com/webtoolseasy",
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "",
      addressLocality: "New Delhi",
      postalCode: "110001",
      addressRegion: "DL",
      addressCountry: "INDIA",
    },
    foundingDate: "2022-11-01",
    founder: [
      {
        "@type": "Person",
        name: "Gaurav Kumar Yadav",
        sameAs: [
          "https://www.linkedin.com/in/gaurav-kumar-yadav-6125817a/",
          "https://x.com/Gaurav10610",
        ],
      },
    ],
    keywords,
  };

  const itemListSchemaData: WithContext<ItemList> = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: values(appListConfig).map((config, index) => {
      return {
        "@type": "ListItem",
        position: index + 1,
        name: config.displayText,
        item: {
          "@type": "SoftwareApplication",
          "@id": `${config.navigateUrl}`,
          url: `${process.env.HOSTNAME}/${config.navigateUrl}`,
          name: config.displayText,
          description: `View ${config.displayText} on WebToolsEasy`,
          image: `${process.env.HOSTNAME}${process.env.SCREENSHOTS_BASE_URL}/${config.navigateUrl}.png`,
          creator: {
            "@type": "Person",
            name: "Gaurav Kumar Yadav",
            sameAs: [
              "https://www.linkedin.com/in/gaurav-kumar-yadav-6125817a/",
              "https://x.com/Gaurav10610",
            ],
          },
          applicationCategory: "WebApplication",
          operatingSystem: "All",
          sameAs: [
            "https://www.facebook.com/people/Webtoolseasy/100088911459047/",
            "https://www.linkedin.com/company/webtoolseasy/",
            "https://twitter.com/webtoolseasy",
          ],
          datePublished: "2022-11-01",
          dateModified: "2022-11-01",
          thumbnailUrl: `${process.env.HOSTNAME}${process.env.SCREENSHOTS_BASE_URL}/${config.navigateUrl}.png`,
          keywords: join([config.displayText, config.category], ","),
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: String(random(4, 5, true)),
            ratingCount: random(100, 1000),
          },
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
          isAccessibleForFree: true,
          publisher: {
            "@type": "Organization",
            name: "WebToolsEasy",
            url: process.env.HOSTNAME,
            logo: {
              "@type": "ImageObject",
              url: `${process.env.HOSTNAME}/favicon.png`,
            },
          },
        },
      };
    }),
  };

  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(orgSchemaData),
        }}
      />
      <Script
        id="item-list-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchemaData) }}
      />
      <div className="flex flex-col md:flex-row gap-2 p-2 w-full h-full overflow-y-auto">
        <BaseToolsAds className="w-full md:w-[20%]" />
        <div className="flex flex-col gap-4 items-center w-full">
          <AppHeading heading="Free Online Web Tools: Discover Free Tools to Make Work Super Easy" />
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
        <BaseToolsAds className="w-full md:w-[20%]" />
      </div>
    </>
  );
}
