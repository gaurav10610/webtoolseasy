import { ToolComponentProps } from "@/types/component";
import { CircularLoader } from "@/components/lib/loaders";
import dynamic from "next/dynamic";
import { decompressStringFromBase64 } from "@/util/commonUtils";
import { Metadata } from "next";
import { keysIn } from "lodash-es";

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

export default async function WebToolPage({
  params,
  searchParams = {},
}: Readonly<{
  params: { [key: string]: string };
  searchParams: { [key: string]: string };
}>) {
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
    <ToolComponent hostname={process.env.HOSTNAME} queryParams={queryParams} />
  );
}
