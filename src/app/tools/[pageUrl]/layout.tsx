import { ApplicationConfig } from "@/@types/config";
import { DescriptionBlock } from "@/@types/description";
import BaseToolsPage from "@/components/baseToolPage";
import { AppHeading, ToolDescription } from "@/components/commonComponents";
import { FlexList } from "@/components/lib/flexComponents";
import { getRandomId } from "@/util/commonUtils";

export default async function WebToolLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: { [key: string]: string } }>) {
  const { descriptionData, componentConfig } = await import(
    `@/data/component-config/${params.pageUrl}`
  );
  const toolDescriptionData = descriptionData as DescriptionBlock[];
  const toolConfigData = componentConfig as ApplicationConfig;

  return FlexList({
    isFullWidth: true,
    flexGap: "20px",
    items: [
      <AppHeading key={getRandomId()} heading={toolConfigData.mainHeading!} />,
      <BaseToolsPage key={getRandomId()}>{children}</BaseToolsPage>,
      <ToolDescription
        key={getRandomId()}
        descriptionData={toolDescriptionData}
      />,
    ],
  });
}
