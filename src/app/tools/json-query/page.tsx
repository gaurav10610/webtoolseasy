import { TOOL_META } from "@/lib/devlens/toolMeta";
import { createToolPageMetadata } from "@/lib/devlens/toolPageMetadata";
import { buildFaqJsonLd, buildSoftwareJsonLd } from "@/lib/devlens/jsonLd";
import { ToolLandingLayout } from "@/components/devlens/ToolLandingLayout";
import { InlineTool } from "@/components/devlens/InlineTool";

const meta = TOOL_META["json-query"];

export const metadata = createToolPageMetadata(meta);

export default function JsonQueryPage() {
  const pageUrl = "https://webtoolseasy.com/tools/json-query";
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
      <ToolLandingLayout
        meta={meta}
        toolSlot={<InlineTool toolType="json" />}
      />
    </>
  );
}
