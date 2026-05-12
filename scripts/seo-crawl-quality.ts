import { workflowPacks } from "../src/data/workflows";

const baseUrl = process.env.HOSTNAME || "https://webtoolseasy.com";
const issues: string[] = [];

for (const workflow of workflowPacks) {
  const route = `/workflows/${workflow.slug}`;
  if (!workflow.slug || !/^[a-z0-9-]+$/.test(workflow.slug)) {
    issues.push(`${route} has invalid slug format`);
  }

  if (!workflow.summary || workflow.summary.length < 50) {
    issues.push(`${route} has weak summary content`);
  }

  if (!workflow.outputArtifacts || workflow.outputArtifacts.length === 0) {
    issues.push(`${route} has no outputArtifacts metadata`);
  }
}

if (issues.length > 0) {
  console.error("Crawl/index quality checks failed");
  for (const issue of issues) {
    console.error(`- ${issue}`);
  }
  process.exit(1);
}

console.log(
  `Crawl/index quality checks passed for ${baseUrl}/workflows and ${workflowPacks.length} workflow routes`,
);
