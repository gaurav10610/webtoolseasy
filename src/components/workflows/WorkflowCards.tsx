import Link from "next/link";
import { AppBox, AppChip, AppText } from "@/components/lib/ui";
import { WorkflowPackConfig } from "@/types/workflow";

export function WorkflowCards({
  workflows,
}: Readonly<{ workflows: WorkflowPackConfig[] }>) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {workflows.map((workflow) => (
        <Link
          key={workflow.id}
          href={`/workflows/${workflow.slug}`}
          className="no-underline"
        >
          <AppBox className="app-shell-section h-full flex flex-col gap-3 hover:shadow-md transition-shadow">
            <AppText className="!text-lg !font-semibold">
              {workflow.name}
            </AppText>
            <AppText variant="body2" color="textSecondary">
              {workflow.summary}
            </AppText>
            <div className="flex flex-wrap gap-2">
              <AppChip
                size="small"
                label={workflow.category}
                variant="outlined"
              />
              <AppChip
                size="small"
                label={`${workflow.steps.length} steps`}
                color="primary"
                variant="outlined"
              />
            </div>
          </AppBox>
        </Link>
      ))}
    </div>
  );
}
