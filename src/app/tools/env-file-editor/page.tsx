import { TOOL_META } from "@/lib/devlens/toolMeta";
import { createToolPageMetadata } from "@/lib/devlens/toolPageMetadata";
import { buildFaqJsonLd, buildSoftwareJsonLd } from "@/lib/devlens/jsonLd";
import { ToolLandingLayout } from "@/components/devlens/ToolLandingLayout";
import { InlineTool } from "@/components/devlens/InlineTool";

const meta = TOOL_META["env-file-editor"];

export const metadata = createToolPageMetadata(meta);

export default function EnvFileEditorPage() {
  const pageUrl = "https://webtoolseasy.com/tools/env-file-editor";
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildFaqJsonLd(meta)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildSoftwareJsonLd(meta, pageUrl)),
        }}
      />
      <ToolLandingLayout meta={meta} toolSlot={<InlineTool toolType="env" />} />
    </>
  );
}
