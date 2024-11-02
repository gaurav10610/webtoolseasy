import { ToolComponentProps } from "@/types/component";
import { CircularLoader } from "@/components/lib/loaders";
import dynamic from "next/dynamic";
import { decompressStringFromBase64 } from "@/util/commonUtils";

export default async function WebToolPage({
  params,
  searchParams,
}: Readonly<{
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
}>) {
  const ToolComponent = dynamic(
    () => import(`@/components/tools/${params.pageUrl}.tsx`),
    {
      loading: () => CircularLoader({ color: "secondary" }),
      ssr: false,
    }
  ) as React.FC<ToolComponentProps>;

  const contentQueryParam = searchParams.content as string | undefined;

  const queryParams: { [key: string]: string } = {};

  if (contentQueryParam) {
    queryParams["content"] = await decompressStringFromBase64(
      contentQueryParam
    );
  }

  return (
    <ToolComponent hostname={process.env.HOSTNAME} queryParams={queryParams} />
  );
}
