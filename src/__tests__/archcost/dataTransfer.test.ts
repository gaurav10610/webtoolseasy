import { describe, expect, it } from "vitest";
import { getTransferCost } from "@/lib/archcost/dataTransferPricing";

describe("dataTransferPricing", () => {
  it("returns 0 for same-region EC2 to EC2", () => {
    expect(getTransferCost("EC2", "EC2", 500)).toBe(0);
  });

  it("returns 0 for same-region EC2 to S3 and CloudFront", () => {
    expect(getTransferCost("EC2", "S3", 1200)).toBe(0);
    expect(getTransferCost("EC2", "CloudFront", 1200)).toBe(0);
  });

  it("charges baseline outbound transfer to internet", () => {
    expect(getTransferCost("EC2", "internet", 100)).toBeCloseTo(9, 6);
  });

  it("applies cross-region transfer pricing", () => {
    expect(
      getTransferCost("EC2", "EC2", 50, { crossRegion: true }),
    ).toBeCloseTo(1, 6);
  });

  it("guards against empty or negative transfer amounts", () => {
    expect(getTransferCost("EC2", "internet", 0)).toBe(0);
    expect(getTransferCost("EC2", "internet", -5)).toBe(0);
  });
});
