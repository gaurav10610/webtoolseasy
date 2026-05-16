import type { InfraService } from "@/data/pricingEngine";

type TransferCostOptions = {
  crossRegion?: boolean;
};

function internetTierRate(gbPerMonth: number): number {
  // Simplified outbound transfer tiering: first 10TB at $0.09/GB.
  if (gbPerMonth <= 0) return 0;
  return gbPerMonth * 0.09;
}

/**
 * Estimate monthly inter-service transfer cost in USD.
 *
 * Rules implemented:
 * - Same-region EC2 <-> EC2: free
 * - EC2 -> S3 same region: free
 * - EC2 -> CloudFront same region: free
 * - EC2 -> internet: tiered (simplified to $0.09/GB baseline)
 * - Any cross-region transfer: $0.02/GB
 */
export function getTransferCost(
  from: InfraService,
  to: InfraService | "internet",
  gbPerMonth: number,
  options: TransferCostOptions = {},
): number {
  const gb = Math.max(0, gbPerMonth || 0);
  if (gb === 0) return 0;

  if (options.crossRegion) {
    return gb * 0.02;
  }

  if (from === "EC2" && to === "internet") {
    return internetTierRate(gb);
  }

  if (
    (from === "EC2" && to === "EC2") ||
    (from === "EC2" && to === "S3") ||
    (from === "EC2" && to === "CloudFront")
  ) {
    return 0;
  }

  return 0;
}
