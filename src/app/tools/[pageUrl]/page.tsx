import { decompressStringFromBase64 } from "@/util/commonUtils";
import { keysIn } from "lodash-es";
import ToolComponentWrapper from "@/components/toolComponentWrapper";
import fs from "fs";

export async function generateStaticParams() {
  const baseToolsPath = `${process.cwd()}/src/components/tools`;
  const files = fs.readdirSync(baseToolsPath);
  return files
    .map((file) => file.replace(".tsx", ""))
    .map((pageUrl) => ({ pageUrl }));
}

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
      <ToolComponentWrapper
        pageUrl={params.pageUrl}
        queryParams={queryParams}
      />
    </div>
  );
}
