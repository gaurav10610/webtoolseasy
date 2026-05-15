import { describe, expect, it } from "vitest";
import { calculateNodeCost, pricingStatus } from "@/data/pricingEngine";

describe("pricingEngine", () => {
  it("calculates region-aware EC2 monthly cost", () => {
    const usEast = calculateNodeCost(
      "EC2",
      {
        instanceType: "t3.micro",
        count: 1,
        hoursPerMonth: 730,
      },
      "us-east-1",
    );

    const usWest = calculateNodeCost(
      "EC2",
      {
        instanceType: "t3.micro",
        count: 1,
        hoursPerMonth: 730,
      },
      "us-west-2",
    );

    expect(usEast).toBeCloseTo(7.592, 3);
    expect(usWest).toBeCloseTo(7.884, 3);
    expect(usWest).toBeGreaterThan(usEast);
  });

  it("uses the embedded baseline until the AWS sync workflow replaces it", () => {
    expect(pricingStatus.isFallback).toBe(true);
    expect(pricingStatus.source).toBe("embedded-manual-baseline");
  });

  it("calculates simple storage pricing for S3", () => {
    const cost = calculateNodeCost(
      "S3",
      {
        storageGB: 100,
        readReqsMillions: 1,
        writeReqsMillions: 0.1,
      },
      "us-east-1",
    );

    expect(cost).toBeGreaterThan(0);
    expect(cost).toBeCloseTo(100 * 0.023 + 0.4 + 0.5, 3);
  });
});
