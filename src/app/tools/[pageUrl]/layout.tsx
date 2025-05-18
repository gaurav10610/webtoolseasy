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
import { isEmpty, isNil, keys } from "lodash-es";
import { Metadata } from "next";
import { SocialShareButtons } from "@/components/socialShareButtons";
import SidePanel from "@/components/sidePanel";
import { BaseToolsAds } from "@/components/baseAds";

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

  const { descriptionData, componentConfig } = await import(
    `@/data/tools/${params.pageUrl}`
  );

  const toolDescriptionData = descriptionData as DescriptionBlock[];
  const toolConfigData = componentConfig as ApplicationConfig;

  const appListConfig = appConfigJson as AppListConfig;
  const relatedToolsConfigs: AppNavigationConfig[] = keys(appListConfig)
    .filter((toolId) =>
      toolConfigData.relatedTools.includes(toolId as ApplicationIds)
    )
    .map((toolId) => appListConfig[toolId]);

  return (
    <div className="flex flex-col md:flex-row gap-2 p-2 w-full h-full flex-grow overflow-y-auto">
      <SidePanel
        className="hidden w-[20%] md:flex"
        appConfigJson={appConfigJson as AppListConfig}
        pageUrl={params.pageUrl}
      />
      <div className="flex flex-col gap-5 w-full">
        <AppHeading key={getRandomId()} heading={toolConfigData.mainHeading!} />
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
  );
}
