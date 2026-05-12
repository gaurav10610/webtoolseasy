export type WorkflowErrorCode =
  | "validation"
  | "transform"
  | "export"
  | "unknown";

export interface WorkflowError {
  code: WorkflowErrorCode;
  message: string;
  stepId?: string;
  retriable: boolean;
  cause?: unknown;
}

export function _createWorkflowError(input: {
  code: WorkflowErrorCode;
  message: string;
  stepId?: string;
  cause?: unknown;
  retriable?: boolean;
}): WorkflowError {
  return {
    code: input.code,
    message: input.message,
    stepId: input.stepId,
    cause: input.cause,
    retriable: input.retriable ?? input.code !== "validation",
  };
}

export function _normalizeWorkflowError(
  error: unknown,
  stepId?: string,
): WorkflowError {
  if (typeof error === "object" && error && "code" in error) {
    return error as WorkflowError;
  }

  if (error instanceof Error) {
    return _createWorkflowError({
      code: "unknown",
      message: error.message,
      cause: error,
      stepId,
    });
  }

  return _createWorkflowError({
    code: "unknown",
    message: "Unknown workflow failure",
    cause: error,
    stepId,
  });
}
