import { describe, expect, it } from "vitest";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { WorkflowCards } from "@/components/workflows/WorkflowCards";
import { workflowPacks } from "@/data/workflows";

describe("Workflow accessibility smoke checks (TB-094)", () => {
  it("renders accessible link/card structure", () => {
    const html = renderToStaticMarkup(
      <WorkflowCards workflows={workflowPacks.slice(0, 2)} />,
    );

    expect(html).toContain('href="/workflows/');
    expect(html).toContain("steps");
  });

  it("contains readable heading text for cards", () => {
    const html = renderToStaticMarkup(
      <WorkflowCards workflows={workflowPacks.slice(0, 1)} />,
    );

    expect(html).toContain(workflowPacks[0].name);
  });
});
