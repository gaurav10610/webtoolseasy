export function isWorkflowsEnabled(): boolean {
  const flag = process.env.NEXT_PUBLIC_ENABLE_WORKFLOWS;
  return flag === undefined ? true : flag === "true";
}

export function isTemplatesEnabled(): boolean {
  const flag = process.env.NEXT_PUBLIC_ENABLE_TEMPLATES;
  return flag === undefined ? true : flag === "true";
}

export function isWorkflowSyncEnabled(): boolean {
  return process.env.NEXT_PUBLIC_ENABLE_WORKFLOW_SYNC === "true";
}
