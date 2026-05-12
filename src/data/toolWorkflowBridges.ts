interface ToolWorkflowBridge {
  workflowSlug: string;
  message: string;
}

export const toolWorkflowBridges: Record<string, ToolWorkflowBridge> = {
  "json-formatter": {
    workflowSlug: "api-payload-cleanup",
    message:
      "This task is often faster as a full workflow with validation, normalization, diff, and export.",
  },
  "json-validator": {
    workflowSlug: "api-payload-cleanup",
    message:
      "Need more than one step? Run the API Payload Cleanup workflow for an end-to-end flow.",
  },
  "markdown-to-html": {
    workflowSlug: "blog-publish",
    message:
      "This conversion is usually one step in a larger publish workflow with metadata and schema generation.",
  },
  "image-compress": {
    workflowSlug: "media-publish",
    message:
      "If you are preparing multiple assets, the Media Publish workflow handles resize, naming, and export together.",
  },
  "pdf-editor": {
    workflowSlug: "private-document-prep",
    message:
      "For repeated document preparation, try the Private Document Prep workflow with a reusable template.",
  },
};
