export type InfraService = 'EC2' | 'RDS' | 'S3' | 'Lambda' | 'CloudFront' | 'ALB';

export type InfraNodeData = {
  label: string;
  service: InfraService;
  region: string;
  config: Record<string, any>;
  costPerMonth: number;
};

// Simplified Pricing Engine (Estimates)
export const pricingEngine = {
  EC2: (config: any) => {
    // config: { instanceType: 't3.micro', count: 1, hoursPerMonth: 730 }
    const rates: Record<string, number> = {
      't3.nano': 0.0052,
      't3.micro': 0.0104,
      't3.small': 0.0208,
      't3.medium': 0.0416,
      't3.large': 0.0832,
      'm5.large': 0.096,
      'c5.large': 0.085,
    };
    const rate = rates[config.instanceType] || 0.0104;
    return rate * (config.hoursPerMonth || 730) * (config.count || 1);
  },
  RDS: (config: any) => {
    // config: { instanceType: 'db.t3.micro', storageGB: 20, multiAZ: false }
    const rates: Record<string, number> = {
      'db.t3.micro': 0.017,
      'db.t3.small': 0.034,
      'db.t3.medium': 0.068,
      'db.m5.large': 0.171,
    };
    const computeRate = rates[config.instanceType] || 0.017;
    const computeCost = computeRate * 730 * (config.multiAZ ? 2 : 1);
    const storageCost = (config.storageGB || 20) * 0.115; // SSD gp2 pricing
    return computeCost + storageCost;
  },
  S3: (config: any) => {
    // config: { storageGB: 100, readReqsMillions: 1, writeReqsMillions: 0.1 }
    const storageCost = (config.storageGB || 0) * 0.023;
    const readCost = (config.readReqsMillions || 0) * 0.40;
    const writeCost = (config.writeReqsMillions || 0) * 5.00;
    return storageCost + readCost + writeCost;
  },
  Lambda: (config: any) => {
    // config: { invocationsMillions: 10, memoryMB: 128, durationMs: 100 }
    const invocations = config.invocationsMillions || 0;
    const reqCost = invocations * 0.20;
    const gbSeconds = (invocations * 1000000) * (config.durationMs || 100) / 1000 * ((config.memoryMB || 128) / 1024);
    const computeCost = gbSeconds * 0.0000166667;
    return reqCost + computeCost;
  },
  CloudFront: (config: any) => {
    // config: { dataTransferOutGB: 1000 }
    const gb = config.dataTransferOutGB || 0;
    if (gb <= 1000) return 0; // Free tier
    return (gb - 1000) * 0.085;
  },
  ALB: (config: any) => {
    // config: { hoursPerMonth: 730, lcuCount: 1 }
    const hourlyCost = (config.hoursPerMonth || 730) * 0.0225;
    const lcuCost = (config.hoursPerMonth || 730) * (config.lcuCount || 1) * 0.008;
    return hourlyCost + lcuCost;
  }
};

export function calculateNodeCost(service: InfraService, config: Record<string, any>): number {
  const calculator = pricingEngine[service];
  if (!calculator) return 0;
  return calculator(config);
}
