import { workflowPacks } from "../src/data/workflows";
import { _validateWorkflowPackCollection } from "../src/lib/workflowSchemaValidator";

const result = _validateWorkflowPackCollection(workflowPacks);

if (!result.valid) {
  console.error("Workflow pack validation failed");
  for (const error of result.errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(
  `Workflow pack validation passed for ${workflowPacks.length} packs`,
);
