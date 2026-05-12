import { Metadata } from "next";
import { workflowPacks } from "@/data/workflows";
import { WorkflowCards } from "@/components/workflows/WorkflowCards";
import { AppHeading } from "@/components/commonComponents";
import { AppText } from "@/components/lib/ui";

const pageTitle = "Workflow Packs - Privacy-First Browser Workspace";
const pageDescription =
  "Run repeatable web workflows with local-first processing, reusable presets, and export summaries. No upload required.";

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
