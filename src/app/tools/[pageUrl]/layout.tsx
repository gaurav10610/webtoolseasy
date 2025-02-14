import {
  ApplicationConfig,
  ApplicationIds,
  AppListConfig,
  AppNavigationConfig,
} from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import {
  AppHeading,
  PageTags,
  RelatedTools,
  ToolDescription,
} from "@/components/commonComponents";
import { getRandomId } from "@/util/commonUtils";
import * as appConfigJson from "@/data/apps.json";
import { isEmpty, isNil, keys, random } from "lodash-es";
import { Metadata } from "next";
import { SocialShareButtons } from "@/components/socialShareButtons";
import SidePanel from "@/components/sidePanel";
import { BaseToolsAds } from "@/components/baseAds";
import Script from "next/script";
import { SoftwareApplication, WithContext } from "schema-dts";

/**
 * generates meta tags for the page
 * @param params - page url params
 * @returns metadata for the page
 */
export async function generateMetadata(
  props: Readonly<{
    params: Promise<{ [key: string]: string }>;
  }>
): Promise<Metadata> {
  const params = await props.params;
  const { metadata } = await import(`@/data/tools/${params.pageUrl}`);
  return metadata;
}

export default async function WebToolLayout(
  props: Readonly<{
    children: React.ReactNode;
    params: Promise<{ [key: string]: string }>;
  }>
) {
  const params = await props.params;

  const { children } = props;

  const { descriptionData, componentConfig, metadata } = await import(
    `@/data/tools/${params.pageUrl}`
  );

  const pageMetadata: Metadata = metadata as Metadata;
  const toolDescriptionData = descriptionData as DescriptionBlock[];
  const toolConfigData = componentConfig as ApplicationConfig;

  const appListConfig = appConfigJson as AppListConfig;
  const relatedToolsConfigs: AppNavigationConfig[] = keys(appListConfig)
    .filter((toolId) =>
      toolConfigData.relatedTools.includes(toolId as ApplicationIds)
    )
    .map((toolId) => appListConfig[toolId]);

  const applicationSchemaData: WithContext<SoftwareApplication> = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    url: `${process.env.HOSTNAME}/tools/${params.pageUrl}`,
    name: pageMetadata.title as string,
    description: pageMetadata.description as string,
    image: `${process.env.HOSTNAME}${process.env.SCREENSHOTS_BASE_URL}/tools/${params.pageUrl}.png`,
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
    thumbnailUrl: `${process.env.HOSTNAME}${process.env.SCREENSHOTS_BASE_URL}/tools/${params.pageUrl}.png`,
    keywords: pageMetadata.keywords as string,
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
  };

  return (
    <>
      <Script
        id="application-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(applicationSchemaData),
        }}
      />
      <div className="flex flex-col md:flex-row gap-2 p-2 w-full h-full flex-grow overflow-y-auto">
        <SidePanel
          className="hidden w-[20%] md:flex"
          appConfigJson={appConfigJson as AppListConfig}
          pageUrl={params.pageUrl}
        />
        <div className="flex flex-col gap-5 w-full">
          <AppHeading
            key={getRandomId()}
            heading={toolConfigData.mainHeading!}
          />
          <SocialShareButtons
            key={getRandomId()}
            pageUrl={`${process.env.HOSTNAME}/tools/${params.pageUrl}`}
            heading={toolConfigData.pageTitle}
          />
          <div className="flex flex-col gap-2 w-full">{children}</div>
          {!isNil(relatedToolsConfigs) && !isEmpty(relatedToolsConfigs) && (
            <RelatedTools
              key={getRandomId()}
              relatedToolsConfigs={relatedToolsConfigs}
            />
          )}
          <ToolDescription
            key={getRandomId()}
            descriptionData={toolDescriptionData}
          />
          <PageTags key={getRandomId()} tags={toolConfigData.tags} />
        </div>
        <BaseToolsAds className="w-full md:w-[20%]" />
      </div>
    </>
  );
}
