import { WorkflowStepConfig } from "@/types/workflow";

export function _assertNoUploadForLocalOnlyStep(
  step: WorkflowStepConfig,
  requestUrl: string,
): void {
  if (step.executionMode !== "local-only") {
    return;
  }

  const url = new URL(requestUrl, "http://localhost");
  const isLikelyUploadPath =
    /upload|submit|sync|api\//i.test(url.pathname) ||
    ["POST", "PUT", "PATCH"].includes(
      (url.searchParams.get("method") || "").toUpperCase(),
    );

  if (isLikelyUploadPath) {
    throw new Error(
      `Local-only step ${step.id} blocked attempted upload request to ${url.pathname}`,
    );
  }
}

export function _createLocalOnlyFetchGuard(step: WorkflowStepConfig) {
  return (input: RequestInfo | URL, init?: RequestInit): void => {
    const requestUrl =
      typeof input === "string"
        ? input
        : input instanceof URL
          ? input.toString()
          : input.url;

    const method = (init?.method || "GET").toUpperCase();
    const shouldCheck =
      method !== "GET" || /upload|sync|api\//i.test(requestUrl);

    if (!shouldCheck) return;

    _assertNoUploadForLocalOnlyStep(step, `${requestUrl}?method=${method}`);
  };
}
