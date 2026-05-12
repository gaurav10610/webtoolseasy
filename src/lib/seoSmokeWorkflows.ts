import { workflowPacks } from "@/data/workflows";

export interface SeoSmokeIssue {
  route: string;
  severity: "warning" | "error";
  message: string;
}

export function _runWorkflowSeoSmokeChecks(baseUrl: string): {
  passed: boolean;
  issues: SeoSmokeIssue[];
  checkedRoutes: string[];
} {
  const issues: SeoSmokeIssue[] = [];
  const checkedRoutes: string[] = [];

  checkedRoutes.push(`${baseUrl}/workflows`);

  for (const workflow of workflowPacks) {
    const route = `${baseUrl}/workflows/${workflow.slug}`;
    checkedRoutes.push(route);

    if (!workflow.summary || workflow.summary.trim().length < 50) {
      issues.push({
        route,
        severity: "warning",
        message: "Summary too short for robust metadata description",
      });
    }

    if (!workflow.name || workflow.name.trim().length < 4) {
      issues.push({
        route,
        severity: "error",
        message: "Workflow name missing or too short",
      });
    }

    if (!workflow.tags || workflow.tags.length < 2) {
      issues.push({
        route,
        severity: "warning",
        message: "Workflow has weak topical tag coverage",
      });
    }
  }

  return {
    passed: issues.filter((issue) => issue.severity === "error").length === 0,
    issues,
    checkedRoutes,
  };
}
