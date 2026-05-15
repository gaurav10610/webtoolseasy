import generatedPricing from "./awsPricing.generated.json";

export type InfraService =
  | "EC2"
  | "RDS"
  | "S3"
  | "Lambda"
  | "CloudFront"
  | "ALB";

export type InfraNodeData = {
  label: string;
  service: InfraService;
  region: string;
  config: Record<string, any>;
  costPerMonth: number;
};

type PricingServiceRates = {
  EC2?: Record<string, number>;
  RDS?: Record<string, number>;
  S3?: {
    storagePerGBMonth?: number;
    readReqPerMillion?: number;
    writeReqPerMillion?: number;
  };
  Lambda?: {
    requestPerMillion?: number;
    gbSecond?: number;
  };
  CloudFront?: {
    freeTierGb?: number;
    overagePerGB?: number;
  };
  ALB?: {
    hourly?: number;
    lcuHourly?: number;
  };
};

type PricingDataset = {
  meta?: {
    updatedAt?: string;
    source?: string;
    version?: string;
  };
  regions: Record<string, PricingServiceRates>;
};

const pricingData = generatedPricing as PricingDataset;
const FALLBACK_REGION = "us-east-1";

const fallbackPricing: PricingDataset = {
  meta: {
    source: "embedded-fallback",
    version: "baseline",
  },
  regions: {
    "us-east-1": {
      EC2: {
        "t3.nano": 0.0052,
        "t3.micro": 0.0104,
        "t3.small": 0.0208,
        "t3.medium": 0.0416,
        "t3.large": 0.0832,
        "m5.large": 0.096,
        "c5.large": 0.085,
      },
      RDS: {
        "db.t3.micro": 0.017,
        "db.t3.small": 0.034,
        "db.t3.medium": 0.068,
        "db.m5.large": 0.171,
      },
      S3: {
        storagePerGBMonth: 0.023,
        readReqPerMillion: 0.4,
        writeReqPerMillion: 5,
      },
      Lambda: {
        requestPerMillion: 0.2,
        gbSecond: 0.0000166667,
      },
      CloudFront: {
        freeTierGb: 1000,
        overagePerGB: 0.085,
      },
      ALB: {
        hourly: 0.0225,
        lcuHourly: 0.008,
      },
    },
  },
};

function getRegionRates(region: string): PricingServiceRates {
  return (
    pricingData.regions[region] ??
    pricingData.regions[FALLBACK_REGION] ??
    fallbackPricing.regions[FALLBACK_REGION]
  );
}

export const pricingStatus = {
  isFallback: pricingData.meta?.source !== "aws-pricing-api",
  source: pricingData.meta?.source ?? fallbackPricing.meta?.source ?? "unknown",
  version:
    pricingData.meta?.version ?? fallbackPricing.meta?.version ?? "unknown",
};

// Simplified Pricing Engine (Estimates)
export const pricingEngine = {
  EC2: (config: any) => {
    // config: { instanceType: 't3.micro', count: 1, hoursPerMonth: 730 }
    const rates =
      getRegionRates(config.region || FALLBACK_REGION).EC2 ??
      fallbackPricing.regions[FALLBACK_REGION].EC2 ??
      {};
    const rate = rates[config.instanceType] || 0.0104;
    return rate * (config.hoursPerMonth || 730) * (config.count || 1);
  },
  RDS: (config: any) => {
    // config: { instanceType: 'db.t3.micro', storageGB: 20, multiAZ: false }
    const rates =
      getRegionRates(config.region || FALLBACK_REGION).RDS ??
      fallbackPricing.regions[FALLBACK_REGION].RDS ??
      {};
    const computeRate = rates[config.instanceType] || 0.017;
    const computeCost = computeRate * 730 * (config.multiAZ ? 2 : 1);
    const storageCost = (config.storageGB || 20) * 0.115; // SSD gp2 pricing
    return computeCost + storageCost;
  },
  S3: (config: any) => {
    // config: { storageGB: 100, readReqsMillions: 1, writeReqsMillions: 0.1 }
    const regionRates =
      getRegionRates(config.region || FALLBACK_REGION).S3 ??
      fallbackPricing.regions[FALLBACK_REGION].S3 ??
      {};
    const storageCost =
      (config.storageGB || 0) * (regionRates.storagePerGBMonth || 0.023);
    const readCost =
      (config.readReqsMillions || 0) * (regionRates.readReqPerMillion || 0.4);
    const writeCost =
      (config.writeReqsMillions || 0) * (regionRates.writeReqPerMillion || 5.0);
    return storageCost + readCost + writeCost;
  },
  Lambda: (config: any) => {
    // config: { invocationsMillions: 10, memoryMB: 128, durationMs: 100 }
    const invocations = config.invocationsMillions || 0;
    const regionRates =
      getRegionRates(config.region || FALLBACK_REGION).Lambda ??
      fallbackPricing.regions[FALLBACK_REGION].Lambda ??
      {};
    const reqCost = invocations * (regionRates.requestPerMillion || 0.2);
    const gbSeconds =
      ((invocations * 1000000 * (config.durationMs || 100)) / 1000) *
      ((config.memoryMB || 128) / 1024);
    const computeCost = gbSeconds * (regionRates.gbSecond || 0.0000166667);
    return reqCost + computeCost;
  },
  CloudFront: (config: any) => {
    // config: { dataTransferOutGB: 1000 }
    const gb = config.dataTransferOutGB || 0;
    const regionRates =
      getRegionRates(config.region || FALLBACK_REGION).CloudFront ??
      fallbackPricing.regions[FALLBACK_REGION].CloudFront ??
      {};
    const freeTierGb = regionRates.freeTierGb || 1000;
    if (gb <= freeTierGb) return 0;
    return (gb - freeTierGb) * (regionRates.overagePerGB || 0.085);
  },
  ALB: (config: any) => {
    // config: { hoursPerMonth: 730, lcuCount: 1 }
    const regionRates =
      getRegionRates(config.region || FALLBACK_REGION).ALB ??
      fallbackPricing.regions[FALLBACK_REGION].ALB ??
      {};
    const hourlyCost =
      (config.hoursPerMonth || 730) * (regionRates.hourly || 0.0225);
    const lcuCost =
      (config.hoursPerMonth || 730) *
      (config.lcuCount || 1) *
      (regionRates.lcuHourly || 0.008);
    return hourlyCost + lcuCost;
  },
};

export function calculateNodeCost(
  service: InfraService,
  config: Record<string, any>,
  region = FALLBACK_REGION,
): number {
  const calculator = pricingEngine[service];
  if (!calculator) return 0;
  return calculator({ ...config, region });
}
