import Link from "next/link";
import { Metadata } from "next";
import { workflowPacks } from "@/data/workflows";
import { AppHeading } from "@/components/commonComponents";
import { AppBox, AppChip, AppText } from "@/components/lib/ui";

export const metadata: Metadata = {
  title: "Workflow Templates - Reusable Recipe Starters",
  description:
    "Clone reusable workflow templates to speed up recurring web tasks.",
  alternates: {
    canonical: `${process.env.HOSTNAME}/templates`,
  },
};

export default function TemplatesPage() {
  return (
    <div className="w-full flex flex-col gap-5">
      <AppHeading heading="Templates" />
      <AppText color="textSecondary">
        Reusable recipe starters for recurring tasks. Clone a template and run
        it in your browser with local-first privacy.
      </AppText>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {workflowPacks.map((workflow) => (
          <Link
            key={workflow.id}
            href={`/workflows/${workflow.slug}?template=starter`}
            className="no-underline"
          >
            <AppBox className="app-shell-section h-full flex flex-col gap-2 hover:shadow-md transition-shadow">
              <AppText className="!font-semibold">
                {workflow.name} Starter
              </AppText>
              <AppText variant="body2" color="textSecondary">
                {workflow.summary}
              </AppText>
              <div className="flex gap-2">
                <AppChip size="small" label="Starter" color="primary" />
                <AppChip
                  size="small"
                  label={`${workflow.steps.length} steps`}
                />
              </div>
            </AppBox>
          </Link>
        ))}
      </div>
    </div>
  );
}
