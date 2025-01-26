import {
  ApplicationConfig,
  ApplicationIds,
  AppListConfig,
  AppNavigationConfig,
} from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import BaseToolsPage from "@/components/baseToolPage";
import {
  AppFollowButtons,
  AppHeading,
  PageTags,
  RelatedTools,
  ToolDescription,
} from "@/components/commonComponents";
import { getRandomId } from "@/util/commonUtils";
import * as appConfigJson from "@/data/apps.json";
import { isEmpty, isNil, keys } from "lodash-es";
import { Metadata } from "next";

/**
 * generates meta tags for the page
 * @param params - page url params
 * @returns metadata for the page
 */
export async function generateMetadata({
  params,
}: Readonly<{
  params: { [key: string]: string };
}>): Promise<Metadata> {
  const { metadata } = await import(
    `@/data/component-config/${params.pageUrl}`
  );
  return metadata;
}

export default async function WebToolLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: { [key: string]: string } }>) {
  const { descriptionData, componentConfig } = await import(
    `@/data/component-config/${params.pageUrl}`
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
    <div className="flex flex-col gap-5 w-full md:w-[70%]">
      <AppHeading key={getRandomId()} heading={toolConfigData.mainHeading!} />
      <BaseToolsPage key={getRandomId()}>{children}</BaseToolsPage>
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
      <AppFollowButtons key={getRandomId()} />
    </div>
  );
}
