import ToolComponentWrapper from "@/components/toolComponentWrapper";
import fs from "fs";
import { Suspense } from "react";
import { ToolPageSkeleton } from "@/components/lib/skeletons";
import { Metadata } from "next";

export async function generateStaticParams() {
  const baseToolsPath = `${process.cwd()}/src/components/tools`;
  const files = fs.readdirSync(baseToolsPath);
  return files
    .map((file) => file.replace(".tsx", ""))
    .map((pageUrl) => ({ pageUrl }));
}

export async function generateMetadata(
  props: Readonly<{
    params: Promise<{ pageUrl: string }>;
  }>
): Promise<Metadata> {
  const params = await props.params;
  try {
    const toolConfig = await import(`@/data/tools/${params.pageUrl}`);
    return toolConfig.metadata;
  } catch (e) {
    return {
      title: "Tool Not Found",
      description: "The requested tool could not be found.",
    };
  }
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
