import { ApplicationConfig } from "@/@types/config";
import { DescriptionBlock } from "@/@types/description";
import {
  AppHeading,
  ToolDescriptionBlock,
} from "@/components/commonComponents";
import { FlexList } from "@/components/lib/flexComponents";
import { getRandomId } from "@/util/commonUtils";
import { map } from "lodash-es";

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
      <div key={getRandomId()} className="full-width">
        {children}
      </div>,
      ...map(toolDescriptionData, (descriptionBlock) => (
        <ToolDescriptionBlock
          key={getRandomId()}
          descriptionBlock={descriptionBlock}
        />
      )),
    ],
  });
}
