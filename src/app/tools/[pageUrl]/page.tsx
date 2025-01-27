import { ToolComponentProps } from "@/types/component";
import { CircularLoader } from "@/components/lib/loaders";
import dynamic from "next/dynamic";
import { decompressStringFromBase64 } from "@/util/commonUtils";
import { keysIn } from "lodash-es";
import { SocialShareButtons } from "@/components/commonComponents";

export default async function WebToolPage(
  props: Readonly<{
    params: { [key: string]: string };
    searchParams: { [key: string]: string };
  }>
) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const ToolComponent = dynamic(
    () => import(`@/components/tools/${params.pageUrl}.tsx`),
    {
      loading: () => CircularLoader({ color: "secondary" }),
      ssr: false,
    }
  ) as React.FC<ToolComponentProps>;

  const queryParams: { [key: string]: string } = {};

  for (const key of keysIn(searchParams)) {
    queryParams[key] = await decompressStringFromBase64(searchParams[key]);
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      <SocialShareButtons
        pageUrl={`${process.env.HOSTNAME}/tools/${params.pageUrl}`}
      />
      <ToolComponent
        hostname={process.env.HOSTNAME}
        queryParams={queryParams}
      />
    </div>
  );
}
