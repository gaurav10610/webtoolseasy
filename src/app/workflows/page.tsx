import { Metadata } from "next";
import { workflowPacks } from "@/data/workflows";
import { WorkflowCards } from "@/components/workflows/WorkflowCards";
import { AppHeading } from "@/components/commonComponents";
import { AppText } from "@/components/lib/ui";

const pageTitle =
  "Free Workflow Packs for Repeatable Browser Tasks | WebToolsEasy";
const pageDescription =
  "Run repeatable web workflows entirely in your browser with no upload, no signup. Includes API cleanup, blog publish, SEO audit, and more — with reusable presets and export summaries.";

export const dynamic = "force-static";
export const revalidate = 86400;

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: `${process.env.HOSTNAME}/workflows`,
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: `${process.env.HOSTNAME}/workflows`,
  },
  twitter: {
    title: pageTitle,
    description: pageDescription,
  },
};

export default function WorkflowsPage() {
  return (
    <div className="w-full flex flex-col gap-5">
      <AppHeading heading="Workflow Packs" />
      <AppText color="textSecondary">
        Move from one-off tool usage to repeatable outcomes. Every workflow runs
        privacy-first in your browser and can be reused with presets.
      </AppText>
      <WorkflowCards workflows={workflowPacks} />
    </div>
  );
}
