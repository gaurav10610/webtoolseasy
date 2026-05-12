import { _runWorkflowSeoSmokeChecks } from "../src/lib/seoSmokeWorkflows";

const baseUrl = process.env.HOSTNAME || "https://webtoolseasy.com";
const result = _runWorkflowSeoSmokeChecks(baseUrl);

if (!result.passed) {
  console.error("Workflow SEO smoke checks failed");
  console.error(result);
  process.exit(1);
}

if (result.issues.length > 0) {
  console.warn("Workflow SEO smoke checks passed with warnings");
  console.warn(result.issues);
} else {
  console.log("Workflow SEO smoke checks passed cleanly");
}
