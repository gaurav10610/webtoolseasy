import ToolComponentWrapper from "@/components/toolComponentWrapper";
import fs from "fs";
import { Suspense } from "react";
import { ToolPageSkeleton } from "@/components/lib/skeletons";

export async function generateStaticParams() {
  const baseToolsPath = `${process.cwd()}/src/components/tools`;
  const files = fs.readdirSync(baseToolsPath);
  return files
    .map((file) => file.replace(".tsx", ""))
    .map((pageUrl) => ({ pageUrl }));
}

export default async function WebToolPage(
  props: Readonly<{
    params: Promise<{ pageUrl: string }>;
  }>
) {
  const params = await props.params;

  return (
    <div className="flex flex-col gap-2 w-full">
      <Suspense fallback={<ToolPageSkeleton />}>
        <ToolComponentWrapper
          pageUrl={params.pageUrl}
          hostname={process.env.HOSTNAME!}
        />
      </Suspense>
    </div>
  );
}
