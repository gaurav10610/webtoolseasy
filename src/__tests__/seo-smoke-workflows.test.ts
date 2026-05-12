import { describe, expect, it } from "vitest";
import { _runWorkflowSeoSmokeChecks } from "@/lib/seoSmokeWorkflows";

describe("Workflow SEO Smoke Checks (TB-189)", () => {
  it("runs smoke checks for workflows and landing route", () => {
    const result = _runWorkflowSeoSmokeChecks("https://webtoolseasy.com");

    expect(result.checkedRoutes[0]).toContain("/workflows");
    expect(result.checkedRoutes.length).toBeGreaterThan(1);
  });

  it("passes with no hard errors", () => {
    const result = _runWorkflowSeoSmokeChecks("https://webtoolseasy.com");
    expect(result.passed).toBe(true);
  });
});
