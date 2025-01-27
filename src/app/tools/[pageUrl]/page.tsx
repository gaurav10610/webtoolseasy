import { decompressStringFromBase64 } from "@/util/commonUtils";
import { keysIn } from "lodash-es";
import { SocialShareButtons } from "@/components/commonComponents";
import ToolComponentWrapper from "@/components/toolComponentWrapper";

export default async function WebToolPage(
  props: Readonly<{
    params: Promise<{ [key: string]: string }>;
    searchParams: Promise<{ [key: string]: string }>;
  }>
) {
  const searchParams = await props.searchParams;
  const params = await props.params;

  const queryParams: { [key: string]: string } = {};

  for (const key of keysIn(searchParams)) {
    queryParams[key] = await decompressStringFromBase64(searchParams[key]);
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      <SocialShareButtons
        pageUrl={`${process.env.HOSTNAME}/tools/${params.pageUrl}`}
      />
      <ToolComponentWrapper
        pageUrl={params.pageUrl}
        queryParams={queryParams}
      />
    </div>
  );
}
