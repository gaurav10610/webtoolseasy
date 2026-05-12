import { describe, expect, it } from "vitest";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import WorkflowEnhancements, {
  _getWorkflowSupportLinks,
  WorkflowLegalCopy,
  WorkflowPrivacyDisclaimer,
  WorkflowProofSection,
  WorkflowSupportHooks,
  WorkflowTrustBadges,
} from "@/components/workflows/WorkflowEnhancements";

describe("Workflow Page Enhancements (TB-146 to TB-150)", () => {
  it("renders proof section", () => {
    const html = renderToStaticMarkup(
      <WorkflowProofSection
        workflowName="API Payload Cleanup"
        summary="Normalize payloads before delivery."
      />,
    );

    expect(html).toContain("Why This Workflow");
    expect(html).toContain("Normalize payloads before delivery.");
  });

  it("renders trust badges", () => {
    const html = renderToStaticMarkup(
      <WorkflowTrustBadges workflowSlug="api-payload-cleanup" />,
    );

    expect(html).toContain("Trust Badges");
    expect(html).toContain("Local Processing First");
  });

  it("renders privacy disclaimer", () => {
    const html = renderToStaticMarkup(
      <WorkflowPrivacyDisclaimer workflowName="API Payload Cleanup" />,
    );

    expect(html).toContain("Privacy Disclaimer");
    expect(html).toContain("aggregate-only");
  });

  it("renders legal copy", () => {
    const html = renderToStaticMarkup(<WorkflowLegalCopy />);

    expect(html).toContain("Template Sharing Terms");
    expect(html).toContain("community moderation");
  });

  it("builds support links with workflow slug", () => {
    const links = _getWorkflowSupportLinks("api-payload-cleanup");

    expect(links).toHaveLength(4);
    expect(links[0].href).toContain("workflow=api-payload-cleanup");
  });

  it("renders support hooks", () => {
    const html = renderToStaticMarkup(
      <WorkflowSupportHooks workflowSlug="api-payload-cleanup" />,
    );

    expect(html).toContain("Need Help After Completion?");
    expect(html).toContain("Open support request");
  });

  it("renders full enhancements composition", () => {
    const html = renderToStaticMarkup(
      <WorkflowEnhancements
        workflowName="API Payload Cleanup"
        workflowSlug="api-payload-cleanup"
        summary="Normalize payloads before delivery."
      />,
    );

    expect(html).toContain("Why This Workflow");
    expect(html).toContain("Trust Badges");
    expect(html).toContain("Privacy Disclaimer");
    expect(html).toContain("Template Sharing Terms");
    expect(html).toContain("Need Help After Completion?");
  });
});
