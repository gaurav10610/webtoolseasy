import { isMobileDevice } from "@/lib/server-responsive";
import { BaseToolsAds } from "./googleAds";
import { FlexList } from "./lib/flexComponents";

export default function BaseToolsPage({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const isMobileView = isMobileDevice();
  return (
    <FlexList
      isFullWidth={true}
      isDirectionRow={!isMobileView}
      items={[BaseToolsAds(), children, BaseToolsAds()]}
    />
  );
}
