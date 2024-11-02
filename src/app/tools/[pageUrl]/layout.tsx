import {
  ApplicationConfig,
  ApplicationIds,
  AppListConfig,
  AppNavigationConfig,
} from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import BaseToolsPage from "@/components/baseToolPage";
import {
  AppHeading,
  RelatedTools,
  ToolDescription,
} from "@/components/commonComponents";
import { FlexList } from "@/components/lib/flexComponents";
import { getRandomId } from "@/util/commonUtils";
import * as appConfigJson from "@/data/apps.json";
import { keys } from "lodash-es";
import { isMobileDevice } from "@/lib/server-responsive";

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

  const isMobileView = isMobileDevice();

  return FlexList({
    isFullWidth: true,
    flexGap: "20px",
    items: [
      <AppHeading key={getRandomId()} heading={toolConfigData.mainHeading!} />,
      <BaseToolsPage key={getRandomId()}>{children}</BaseToolsPage>,
      <RelatedTools
        key={getRandomId()}
        relatedToolsConfigs={relatedToolsConfigs}
        isMobileView={isMobileView}
      />,
      <ToolDescription
        key={getRandomId()}
        descriptionData={toolDescriptionData}
      />,
    ],
  });
}
