import generatedPricing from "./awsPricing.generated.json";

export type InfraService =
  | "EC2"
  | "RDS"
  | "S3"
  | "Lambda"
  | "CloudFront"
  | "ALB"
  | "ECS"
  | "EKS"
  | "Lightsail"
  | "ElasticBeanstalk"
  | "Batch"
  | "DynamoDB"
  | "ElastiCache"
  | "DocumentDB"
  | "Neptune"
  | "AuroraServerlessV2"
  | "Timestream"
  | "EFS"
  | "EBS"
  | "Glacier"
  | "FSx"
  | "StorageGateway"
  | "NLB"
  | "APIGatewayREST"
  | "APIGatewayHTTP"
  | "Route53"
  | "NATGateway"
  | "PrivateLink"
  | "GlobalAccelerator"
  | "DataTransfer"
  | "SQS"
  | "SNS"
  | "EventBridge"
  | "KinesisDataStreams"
  | "KinesisFirehose"
  | "MSK"
  | "Bedrock"
  | "SageMaker"
  | "Textract"
  | "Rekognition"
  | "Transcribe"
  | "Polly"
  | "CloudWatchMetrics"
  | "CloudWatchLogs"
  | "CloudWatchAlarms"
  | "SecretsManager"
  | "KMS"
  | "CodeBuild"
  | "CodePipeline"
  | "XRay"
  | "WAF"
  | "ShieldStandard"
  | "ShieldAdvanced";

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
  ECS?: {
    fargateVcpuHourly?: number;
    fargateMemoryGbHourly?: number;
  };
  EKS?: {
    clusterHourly?: number;
    workerInstanceHourly?: Record<string, number>;
  };
  Lightsail?: {
    planMonthly?: Record<string, number>;
  };
  ElasticBeanstalk?: {
    platformMonthly?: number;
  };
  Batch?: {
    onDemandVcpuHour?: number;
    spotDiscountMultiplier?: number;
  };
  DynamoDB?: {
    rcuHour?: number;
    wcuHour?: number;
    storageGbMonth?: number;
  };
  ElastiCache?: {
    nodeHourly?: Record<string, number>;
    engineMultiplier?: Record<string, number>;
  };
  DocumentDB?: {
    instanceHourly?: Record<string, number>;
    storageGbMonth?: number;
  };
  Neptune?: {
    instanceHourly?: Record<string, number>;
    storageGbMonth?: number;
    ioPerMillion?: number;
  };
  AuroraServerlessV2?: {
    acuHour?: number;
    storageGbMonth?: number;
    ioPerMillion?: number;
  };
  Timestream?: {
    memoryGbMonth?: number;
    magneticGbMonth?: number;
    writePerMillion?: number;
  };
  EFS?: {
    standardGbMonth?: number;
    iaGbMonth?: number;
    throughputProvisionedMbpsMonth?: number;
  };
  EBS?: {
    volumeGbMonth?: Record<string, number>;
    iopsMonthIo1Io2?: number;
  };
  Glacier?: {
    storageGbMonth?: number;
    retrievalRequest?: number;
  };
  FSx?: {
    storageGbMonth?: Record<string, number>;
    throughputMbpsMonth?: Record<string, number>;
  };
  StorageGateway?: {
    monthly?: number;
  };
  NLB?: {
    hourly?: number;
    lcuHourly?: number;
  };
  APIGatewayREST?: {
    perMillionCalls?: number;
    dataPerGB?: number;
    cacheGbHour?: number;
  };
  APIGatewayHTTP?: {
    first300MMillion?: number;
    nextMillion?: number;
  };
  Route53?: {
    hostedZoneMonth?: number;
    queryPerMillion?: number;
    healthCheckMonth?: number;
  };
  NATGateway?: {
    hourly?: number;
    dataPerGB?: number;
  };
  PrivateLink?: {
    endpointHourly?: number;
    dataPerGB?: number;
  };
  GlobalAccelerator?: {
    hourly?: number;
    transferPerGB?: Record<string, number>;
  };
  DataTransfer?: {
    internetPerGB?: number;
    crossRegionPerGB?: number;
    cdnPerGB?: number;
  };
  SQS?: {
    standardPerMillion?: number;
    fifoPerMillion?: number;
  };
  SNS?: {
    protocolPerMillion?: Record<string, number>;
  };
  EventBridge?: {
    customPerMillion?: number;
    awsPerMillion?: number;
    partnerPerMillion?: number;
  };
  KinesisDataStreams?: {
    shardHour?: number;
    retrievalPerGB?: number;
  };
  KinesisFirehose?: {
    ingestPerGB?: number;
  };
  MSK?: {
    brokerHour?: Record<string, number>;
  };
  Bedrock?: {
    inputPerMillion?: Record<string, number>;
    outputPerMillion?: Record<string, number>;
  };
  SageMaker?: {
    instanceHour?: Record<string, number>;
  };
  Textract?: {
    featurePerThousandPages?: Record<string, number>;
  };
  Rekognition?: {
    imagePerThousand?: number;
    videoPerMinute?: number;
  };
  Transcribe?: {
    perMinute?: number;
  };
  Polly?: {
    perMillionCharacters?: Record<string, number>;
  };
  CloudWatchMetrics?: {
    metricMonth?: number;
    apiPerMillion?: number;
  };
  CloudWatchLogs?: {
    ingestionPerGB?: number;
    storagePerGB?: number;
    insightsPerGB?: number;
  };
  CloudWatchAlarms?: {
    alarmMonth?: number;
  };
  SecretsManager?: {
    secretMonth?: number;
    apiPer10k?: number;
  };
  KMS?: {
    keyMonth?: number;
    apiPer10k?: number;
  };
  CodeBuild?: {
    minuteRate?: Record<string, number>;
  };
  CodePipeline?: {
    pipelineMonth?: number;
  };
  XRay?: {
    perMillionTraces?: number;
  };
  WAF?: {
    webAclMonth?: number;
    ruleMonth?: number;
    requestPerMillion?: number;
  };
  ShieldStandard?: {
    monthly?: number;
  };
  ShieldAdvanced?: {
    monthly?: number;
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
      ECS: {
        fargateVcpuHourly: 0.04048,
        fargateMemoryGbHourly: 0.004445,
      },
      EKS: {
        clusterHourly: 0.1,
        workerInstanceHourly: {
          "t3.small": 0.0208,
          "t3.medium": 0.0416,
          "t3.large": 0.0832,
          "m5.large": 0.096,
          "c5.large": 0.085,
        },
      },
      Lightsail: {
        planMonthly: {
          "3.5": 3.5,
          "5": 5,
          "10": 10,
          "20": 20,
          "40": 40,
          "80": 80,
          "160": 160,
        },
      },
      ElasticBeanstalk: {
        platformMonthly: 0,
      },
      Batch: {
        onDemandVcpuHour: 0.04656,
        spotDiscountMultiplier: 0.3,
      },
      DynamoDB: {
        rcuHour: 0.00013,
        wcuHour: 0.00065,
        storageGbMonth: 0.25,
      },
      ElastiCache: {
        nodeHourly: {
          "cache.t3.micro": 0.017,
          "cache.t3.small": 0.034,
          "cache.t3.medium": 0.068,
          "cache.m5.large": 0.156,
        },
        engineMultiplier: {
          redis: 1,
          memcached: 0.95,
        },
      },
      DocumentDB: {
        instanceHourly: {
          "db.r5.large": 0.277,
          "db.r5.xlarge": 0.554,
          "db.r6g.large": 0.238,
        },
        storageGbMonth: 0.1,
      },
      Neptune: {
        instanceHourly: {
          "db.r5.large": 0.348,
          "db.r5.xlarge": 0.696,
          "db.r6g.large": 0.301,
        },
        storageGbMonth: 0.1,
        ioPerMillion: 0.2,
      },
      AuroraServerlessV2: {
        acuHour: 0.12,
        storageGbMonth: 0.1,
        ioPerMillion: 0.2,
      },
      Timestream: {
        memoryGbMonth: 0.03,
        magneticGbMonth: 0.01,
        writePerMillion: 0.5,
      },
      EFS: {
        standardGbMonth: 0.3,
        iaGbMonth: 0.025,
        throughputProvisionedMbpsMonth: 6,
      },
      EBS: {
        volumeGbMonth: {
          gp3: 0.08,
          gp2: 0.1,
          io1: 0.125,
          io2: 0.125,
          st1: 0.045,
          sc1: 0.025,
        },
        iopsMonthIo1Io2: 0.065,
      },
      Glacier: {
        storageGbMonth: 0.004,
        retrievalRequest: 0.03,
      },
      FSx: {
        storageGbMonth: {
          windows: 0.13,
          lustre: 0.14,
        },
        throughputMbpsMonth: {
          windows: 2.2,
          lustre: 1.8,
        },
      },
      StorageGateway: {
        monthly: 0,
      },
      NLB: {
        hourly: 0.0225,
        lcuHourly: 0.008,
      },
      APIGatewayREST: {
        perMillionCalls: 3.5,
        dataPerGB: 0.09,
        cacheGbHour: 0.02,
      },
      APIGatewayHTTP: {
        first300MMillion: 1,
        nextMillion: 0.9,
      },
      Route53: {
        hostedZoneMonth: 0.5,
        queryPerMillion: 0.4,
        healthCheckMonth: 0.5,
      },
      NATGateway: {
        hourly: 0.045,
        dataPerGB: 0.045,
      },
      PrivateLink: {
        endpointHourly: 0.01,
        dataPerGB: 0.01,
      },
      GlobalAccelerator: {
        hourly: 0.025,
        transferPerGB: {
          standard: 0.015,
          high: 0.08,
        },
      },
      DataTransfer: {
        internetPerGB: 0.09,
        crossRegionPerGB: 0.02,
        cdnPerGB: 0.02,
      },
      SQS: {
        standardPerMillion: 0.4,
        fifoPerMillion: 0.5,
      },
      SNS: {
        protocolPerMillion: {
          http: 0.5,
          email: 2,
          sms: 6,
          sqs: 0.6,
        },
      },
      EventBridge: {
        customPerMillion: 1,
        awsPerMillion: 0,
        partnerPerMillion: 1,
      },
      KinesisDataStreams: {
        shardHour: 0.015,
        retrievalPerGB: 0.013,
      },
      KinesisFirehose: {
        ingestPerGB: 0.029,
      },
      MSK: {
        brokerHour: {
          "kafka.t3.small": 0.14,
          "kafka.m5.large": 0.21,
          "kafka.m5.xlarge": 0.42,
        },
      },
      Bedrock: {
        inputPerMillion: {
          "claude-3-5-sonnet": 3,
          "gpt-4o-tier": 5,
          "llama-tier": 1,
        },
        outputPerMillion: {
          "claude-3-5-sonnet": 15,
          "gpt-4o-tier": 15,
          "llama-tier": 2,
        },
      },
      SageMaker: {
        instanceHour: {
          "ml.t3.medium": 0.058,
          "ml.m5.large": 0.115,
          "ml.g4dn.xlarge": 0.736,
        },
      },
      Textract: {
        featurePerThousandPages: {
          basic: 1.5,
          tables: 15,
          forms: 50,
        },
      },
      Rekognition: {
        imagePerThousand: 1,
        videoPerMinute: 0.12,
      },
      Transcribe: {
        perMinute: 0.024,
      },
      Polly: {
        perMillionCharacters: {
          standard: 4,
          neural: 16,
        },
      },
      CloudWatchMetrics: {
        metricMonth: 0.3,
        apiPerMillion: 0.01,
      },
      CloudWatchLogs: {
        ingestionPerGB: 0.5,
        storagePerGB: 0.03,
        insightsPerGB: 0.005,
      },
      CloudWatchAlarms: {
        alarmMonth: 0.1,
      },
      SecretsManager: {
        secretMonth: 0.4,
        apiPer10k: 0.05,
      },
      KMS: {
        keyMonth: 1,
        apiPer10k: 0.03,
      },
      CodeBuild: {
        minuteRate: {
          small: 0.005,
          medium: 0.01,
          large: 0.02,
        },
      },
      CodePipeline: {
        pipelineMonth: 1,
      },
      XRay: {
        perMillionTraces: 5,
      },
      WAF: {
        webAclMonth: 5,
        ruleMonth: 1,
        requestPerMillion: 0.6,
      },
      ShieldStandard: {
        monthly: 0,
      },
      ShieldAdvanced: {
        monthly: 3000,
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

function getPurchaseMultiplier(option: string | undefined): number {
  if (option === "reserved-1yr") return 0.7;
  if (option === "reserved-3yr") return 0.55;
  if (option === "spot") return 0.3;
  return 1;
}

// Simplified Pricing Engine (Estimates)
export const pricingEngine = {
  EC2: (config: any) => {
    // config: { instanceType: 't3.micro', count: 1, hoursPerMonth: 730 }
    const rates =
      getRegionRates(config.region || FALLBACK_REGION).EC2 ??
      fallbackPricing.regions[FALLBACK_REGION].EC2 ??
      {};
    const rate = rates[config.instanceType] || 0.0104;
    const baseCost = rate * (config.hoursPerMonth || 730) * (config.count || 1);
    return baseCost * getPurchaseMultiplier(config.purchaseOption);
  },
  RDS: (config: any) => {
    // config: { instanceType: 'db.t3.micro', storageGB: 20, multiAZ: false }
    const rates =
      getRegionRates(config.region || FALLBACK_REGION).RDS ??
      fallbackPricing.regions[FALLBACK_REGION].RDS ??
      {};
    const computeRate = rates[config.instanceType] || 0.017;
    const computeCost =
      computeRate *
      730 *
      (config.multiAZ ? 2 : 1) *
      getPurchaseMultiplier(config.purchaseOption);
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
  ECS: (config: any) => {
    // config: { vcpu: 0.5, memoryGB: 1, taskCount: 2, hoursPerMonth: 730 }
    const regionRates =
      getRegionRates(config.region || FALLBACK_REGION).ECS ??
      fallbackPricing.regions[FALLBACK_REGION].ECS ??
      {};
    const hours = config.hoursPerMonth || 730;
    const taskCount = config.taskCount || 1;
    const vcpu = config.vcpu || 0.5;
    const memoryGB = config.memoryGB || 1;

    const vcpuCost =
      hours * taskCount * vcpu * (regionRates.fargateVcpuHourly || 0.04048);
    const memoryCost =
      hours *
      taskCount *
      memoryGB *
      (regionRates.fargateMemoryGbHourly || 0.004445);
    return vcpuCost + memoryCost;
  },
  EKS: (config: any) => {
    // config: { nodeCount: 3, instanceType: 't3.medium', clusterHours: 730 }
    const regionRates =
      getRegionRates(config.region || FALLBACK_REGION).EKS ??
      fallbackPricing.regions[FALLBACK_REGION].EKS ??
      {};
    const clusterHours = config.clusterHours || 730;
    const nodeCount = config.nodeCount || 3;
    const workerRates = regionRates.workerInstanceHourly || {};
    const workerRate =
      workerRates[config.instanceType] || workerRates["t3.medium"] || 0.0416;

    return (
      (regionRates.clusterHourly || 0.1) * clusterHours +
      workerRate * clusterHours * nodeCount
    );
  },
  Lightsail: (config: any) => {
    // config: { plan: '10', instanceCount: 1 }
    const regionRates =
      getRegionRates(config.region || FALLBACK_REGION).Lightsail ??
      fallbackPricing.regions[FALLBACK_REGION].Lightsail ??
      {};
    const plans = regionRates.planMonthly || {};
    const planMonthly = plans[String(config.plan || "10")] || plans["10"] || 10;
    return planMonthly * (config.instanceCount || 1);
  },
  ElasticBeanstalk: (config: any) => {
    // config: { estimatedEc2Monthly: 75, estimatedRdsMonthly: 0 }
    const regionRates =
      getRegionRates(config.region || FALLBACK_REGION).ElasticBeanstalk ??
      fallbackPricing.regions[FALLBACK_REGION].ElasticBeanstalk ??
      {};
    return (
      (config.estimatedEc2Monthly || 0) +
      (config.estimatedRdsMonthly || 0) +
      (regionRates.platformMonthly || 0)
    );
  },
  Batch: (config: any) => {
    // config: { vcpuHours: 500, jobType: 'on-demand' }
    const regionRates =
      getRegionRates(config.region || FALLBACK_REGION).Batch ??
      fallbackPricing.regions[FALLBACK_REGION].Batch ??
      {};
    const onDemand =
      (config.vcpuHours || 0) * (regionRates.onDemandVcpuHour || 0.04656);
    if (config.jobType === "spot") {
      return onDemand * (regionRates.spotDiscountMultiplier || 0.3);
    }
    return onDemand;
  },
  DynamoDB: (config: any) => {
    // config: { readCapacityUnits, writeCapacityUnits, storageGB, mode }
    const regionRates =
      getRegionRates(config.region || FALLBACK_REGION).DynamoDB ??
      fallbackPricing.regions[FALLBACK_REGION].DynamoDB ??
      {};
    const rcuCost =
      (config.readCapacityUnits || 0) * 730 * (regionRates.rcuHour || 0.00013);
    const wcuCost =
      (config.writeCapacityUnits || 0) * 730 * (regionRates.wcuHour || 0.00065);
    const storageCost =
      (config.storageGB || 0) * (regionRates.storageGbMonth || 0.25);
    return rcuCost + wcuCost + storageCost;
  },
  ElastiCache: (config: any) => {
    // config: { nodeType, nodeCount, engine }
    const regionRates =
      getRegionRates(config.region || FALLBACK_REGION).ElastiCache ??
      fallbackPricing.regions[FALLBACK_REGION].ElastiCache ??
      {};
    const nodeHourly = regionRates.nodeHourly || {};
    const baseRate =
      nodeHourly[config.nodeType] || nodeHourly["cache.t3.micro"] || 0.017;
    const engineMultiplier =
      (regionRates.engineMultiplier || {})[config.engine] ||
      (regionRates.engineMultiplier || {}).redis ||
      1;
    const purchaseMultiplier = getPurchaseMultiplier(config.purchaseOption);
    return (
      baseRate *
      730 *
      (config.nodeCount || 1) *
      engineMultiplier *
      purchaseMultiplier
    );
  },
  DocumentDB: (config: any) => {
    // config: { instanceClass, instanceCount, storageGB }
    const regionRates =
      getRegionRates(config.region || FALLBACK_REGION).DocumentDB ??
      fallbackPricing.regions[FALLBACK_REGION].DocumentDB ??
      {};
    const instanceRate =
      (regionRates.instanceHourly || {})[config.instanceClass] ||
      (regionRates.instanceHourly || {})["db.r5.large"] ||
      0.277;
    return (
      instanceRate * 730 * (config.instanceCount || 1) +
      (config.storageGB || 0) * (regionRates.storageGbMonth || 0.1)
    );
  },
  Neptune: (config: any) => {
    // config: { instanceClass, storageGB, ioRequestsMillions }
    const regionRates =
      getRegionRates(config.region || FALLBACK_REGION).Neptune ??
      fallbackPricing.regions[FALLBACK_REGION].Neptune ??
      {};
    const instanceRate =
      (regionRates.instanceHourly || {})[config.instanceClass] ||
      (regionRates.instanceHourly || {})["db.r5.large"] ||
      0.348;
    const computeCost = instanceRate * 730;
    const storageCost =
      (config.storageGB || 0) * (regionRates.storageGbMonth || 0.1);
    const ioCost =
      (config.ioRequestsMillions || 0) * (regionRates.ioPerMillion || 0.2);
    return computeCost + storageCost + ioCost;
  },
  AuroraServerlessV2: (config: any) => {
    // config: { minACU, maxACU, storageGB, ioRequestsMillions }
    const regionRates =
      getRegionRates(config.region || FALLBACK_REGION).AuroraServerlessV2 ??
      fallbackPricing.regions[FALLBACK_REGION].AuroraServerlessV2 ??
      {};
    const minAcu = Number(config.minACU || 0.5);
    const maxAcu = Number(config.maxACU || 1);
    const avgAcu =
      Math.max(minAcu, maxAcu) === minAcu ? minAcu : (minAcu + maxAcu) / 2;
    const acuCost = avgAcu * 730 * (regionRates.acuHour || 0.12);
    const storageCost =
      (config.storageGB || 0) * (regionRates.storageGbMonth || 0.1);
    const ioCost =
      (config.ioRequestsMillions || 0) * (regionRates.ioPerMillion || 0.2);
    return acuCost + storageCost + ioCost;
  },
  Timestream: (config: any) => {
    // config: { memoryStoreGB, magneticStoreGB, writeRecordsMillions }
    const regionRates =
      getRegionRates(config.region || FALLBACK_REGION).Timestream ??
      fallbackPricing.regions[FALLBACK_REGION].Timestream ??
      {};
    const memoryCost =
      (config.memoryStoreGB || 0) * (regionRates.memoryGbMonth || 0.03);
    const magneticCost =
      (config.magneticStoreGB || 0) * (regionRates.magneticGbMonth || 0.01);
    const writeCost =
      (config.writeRecordsMillions || 0) * (regionRates.writePerMillion || 0.5);
    return memoryCost + magneticCost + writeCost;
  },
  EFS: (config: any) => {
    // config: { storageClass, sizeGB, throughputMode }
    const regionRates =
      getRegionRates(config.region || FALLBACK_REGION).EFS ??
      fallbackPricing.regions[FALLBACK_REGION].EFS ??
      {};
    const storageClass = String(config.storageClass || "standard");
    const sizeGB = Number(config.sizeGB || 0);
    const storageRate =
      storageClass === "ia"
        ? regionRates.iaGbMonth || 0.025
        : regionRates.standardGbMonth || 0.3;
    const throughputCost =
      config.throughputMode === "provisioned"
        ? Number(regionRates.throughputProvisionedMbpsMonth || 6)
        : 0;
    return sizeGB * storageRate + throughputCost;
  },
  EBS: (config: any) => {
    // config: { volumeType, sizeGB, iops }
    const regionRates =
      getRegionRates(config.region || FALLBACK_REGION).EBS ??
      fallbackPricing.regions[FALLBACK_REGION].EBS ??
      {};
    const volumeType = String(config.volumeType || "gp3");
    const rate =
      (regionRates.volumeGbMonth || {})[volumeType] ||
      (regionRates.volumeGbMonth || {}).gp3 ||
      0.08;
    const base = Number(config.sizeGB || 0) * rate;
    if (volumeType === "io1" || volumeType === "io2") {
      return (
        base + Number(config.iops || 0) * (regionRates.iopsMonthIo1Io2 || 0.065)
      );
    }
    return base;
  },
  Glacier: (config: any) => {
    // config: { storageGB, retrievalRequests }
    const regionRates =
      getRegionRates(config.region || FALLBACK_REGION).Glacier ??
      fallbackPricing.regions[FALLBACK_REGION].Glacier ??
      {};
    return (
      Number(config.storageGB || 0) * (regionRates.storageGbMonth || 0.004) +
      Number(config.retrievalRequests || 0) *
        (regionRates.retrievalRequest || 0.03)
    );
  },
  FSx: (config: any) => {
    // config: { fileSystemType, storageCapacityGB, throughputMBps }
    const regionRates =
      getRegionRates(config.region || FALLBACK_REGION).FSx ??
      fallbackPricing.regions[FALLBACK_REGION].FSx ??
      {};
    const fileSystemType = String(config.fileSystemType || "windows");
    const storageRate =
      (regionRates.storageGbMonth || {})[fileSystemType] ||
      (regionRates.storageGbMonth || {}).windows ||
      0.13;
    const throughputRate =
      (regionRates.throughputMbpsMonth || {})[fileSystemType] ||
      (regionRates.throughputMbpsMonth || {}).windows ||
      2.2;
    return (
      Number(config.storageCapacityGB || 0) * storageRate +
      Number(config.throughputMBps || 0) * throughputRate
    );
  },
  StorageGateway: (config: any) => {
    const regionRates =
      getRegionRates(config.region || FALLBACK_REGION).StorageGateway ??
      fallbackPricing.regions[FALLBACK_REGION].StorageGateway ??
      {};
    if (config.infoOnly) return 0;
    return Number(regionRates.monthly || 0);
  },
  NLB: (config: any) => {
    // config: { hoursPerMonth, lcuCount }
    const regionRates =
      getRegionRates(config.region || FALLBACK_REGION).NLB ??
      fallbackPricing.regions[FALLBACK_REGION].NLB ??
      {};
    const hours = Number(config.hoursPerMonth || 730);
    const lcus = Number(config.lcuCount || 1);
    return (
      hours * (regionRates.hourly || 0.0225) +
      hours * lcus * (regionRates.lcuHourly || 0.008)
    );
  },
  APIGatewayREST: (config: any) => {
    // config: { apiCallsMillions, dataTransferGB, cacheGBHours }
    const regionRates =
      getRegionRates(config.region || FALLBACK_REGION).APIGatewayREST ??
      fallbackPricing.regions[FALLBACK_REGION].APIGatewayREST ??
      {};
    return (
      Number(config.apiCallsMillions || 0) *
        (regionRates.perMillionCalls || 3.5) +
      Number(config.dataTransferGB || 0) * (regionRates.dataPerGB || 0.09) +
      Number(config.cacheGBHours || 0) * (regionRates.cacheGbHour || 0.02)
    );
  },
  APIGatewayHTTP: (config: any) => {
    // config: { apiCallsMillions }
    const regionRates =
      getRegionRates(config.region || FALLBACK_REGION).APIGatewayHTTP ??
      fallbackPricing.regions[FALLBACK_REGION].APIGatewayHTTP ??
      {};
    const calls = Number(config.apiCallsMillions || 0);
    const first300 = Math.min(calls, 300);
    const remaining = Math.max(calls - 300, 0);
    return (
      first300 * (regionRates.first300MMillion || 1) +
      remaining * (regionRates.nextMillion || 0.9)
    );
  },
  Route53: (config: any) => {
    // config: { hostedZones, queriesMillions, healthChecks }
    const regionRates =
      getRegionRates(config.region || FALLBACK_REGION).Route53 ??
      fallbackPricing.regions[FALLBACK_REGION].Route53 ??
      {};
    return (
      Number(config.hostedZones || 0) * (regionRates.hostedZoneMonth || 0.5) +
      Number(config.queriesMillions || 0) *
        (regionRates.queryPerMillion || 0.4) +
      Number(config.healthChecks || 0) * (regionRates.healthCheckMonth || 0.5)
    );
  },
  NATGateway: (config: any) => {
    // config: { hoursPerMonth, dataProcessedGB }
    const regionRates =
      getRegionRates(config.region || FALLBACK_REGION).NATGateway ??
      fallbackPricing.regions[FALLBACK_REGION].NATGateway ??
      {};
    return (
      Number(config.hoursPerMonth || 0) * (regionRates.hourly || 0.045) +
      Number(config.dataProcessedGB || 0) * (regionRates.dataPerGB || 0.045)
    );
  },
  PrivateLink: (config: any) => {
    // config: { endpoints, hoursPerMonth, dataProcessedGB }
    const regionRates =
      getRegionRates(config.region || FALLBACK_REGION).PrivateLink ??
      fallbackPricing.regions[FALLBACK_REGION].PrivateLink ??
      {};
    return (
      Number(config.endpoints || 0) *
        Number(config.hoursPerMonth || 0) *
        (regionRates.endpointHourly || 0.01) +
      Number(config.dataProcessedGB || 0) * (regionRates.dataPerGB || 0.01)
    );
  },
  GlobalAccelerator: (config: any) => {
    // config: { hours, dataTransferGB, transferTier }
    const regionRates =
      getRegionRates(config.region || FALLBACK_REGION).GlobalAccelerator ??
      fallbackPricing.regions[FALLBACK_REGION].GlobalAccelerator ??
      {};
    const transferRates = regionRates.transferPerGB || {};
    const tier = String(config.transferTier || "standard");
    const transferRate = transferRates[tier] || transferRates.standard || 0.015;
    return (
      Number(config.hours || 0) * (regionRates.hourly || 0.025) +
      Number(config.dataTransferGB || 0) * transferRate
    );
  },
  DataTransfer: (config: any) => {
    // config: { gbPerMonth, destination }
    const regionRates =
      getRegionRates(config.region || FALLBACK_REGION).DataTransfer ??
      fallbackPricing.regions[FALLBACK_REGION].DataTransfer ??
      {};
    const destination = String(config.destination || "internet");
    const gbPerMonth = Number(config.gbPerMonth || 0);
    if (destination === "cross-region") {
      return gbPerMonth * (regionRates.crossRegionPerGB || 0.02);
    }
    if (destination === "cdn") {
      return gbPerMonth * (regionRates.cdnPerGB || 0.02);
    }
    return gbPerMonth * (regionRates.internetPerGB || 0.09);
  },
  SQS: (config: any) => {
    // config: { requestsMillions, fifo }
    const regionRates =
      getRegionRates(config.region || FALLBACK_REGION).SQS ??
      fallbackPricing.regions[FALLBACK_REGION].SQS ??
      {};
    const rate = config.fifo
      ? regionRates.fifoPerMillion || 0.5
      : regionRates.standardPerMillion || 0.4;
    return Number(config.requestsMillions || 0) * rate;
  },
  SNS: (config: any) => {
    // config: { notificationsMillions, protocol }
    const regionRates =
      getRegionRates(config.region || FALLBACK_REGION).SNS ??
      fallbackPricing.regions[FALLBACK_REGION].SNS ??
      {};
    const protocol = String(config.protocol || "http");
    const protocolRates = regionRates.protocolPerMillion || {};
    const rate = protocolRates[protocol] || protocolRates.http || 0.5;
    return Number(config.notificationsMillions || 0) * rate;
  },
  EventBridge: (config: any) => {
    // config: { eventsMillions, eventBusType }
    const regionRates =
      getRegionRates(config.region || FALLBACK_REGION).EventBridge ??
      fallbackPricing.regions[FALLBACK_REGION].EventBridge ??
      {};
    const type = String(config.eventBusType || "custom");
    let rate = regionRates.customPerMillion || 1;
    if (type === "aws") rate = regionRates.awsPerMillion || 0;
    if (type === "partner") rate = regionRates.partnerPerMillion || 1;
    return Number(config.eventsMillions || 0) * rate;
  },
  KinesisDataStreams: (config: any) => {
    // config: { shardCount, hoursPerMonth, dataRetrievalGB }
    const regionRates =
      getRegionRates(config.region || FALLBACK_REGION).KinesisDataStreams ??
      fallbackPricing.regions[FALLBACK_REGION].KinesisDataStreams ??
      {};
    return (
      Number(config.shardCount || 0) *
        Number(config.hoursPerMonth || 0) *
        (regionRates.shardHour || 0.015) +
      Number(config.dataRetrievalGB || 0) *
        (regionRates.retrievalPerGB || 0.013)
    );
  },
  KinesisFirehose: (config: any) => {
    // config: { dataIngestedGB }
    const regionRates =
      getRegionRates(config.region || FALLBACK_REGION).KinesisFirehose ??
      fallbackPricing.regions[FALLBACK_REGION].KinesisFirehose ??
      {};
    return (
      Number(config.dataIngestedGB || 0) * (regionRates.ingestPerGB || 0.029)
    );
  },
  MSK: (config: any) => {
    // config: { brokerType, brokerCount }
    const regionRates =
      getRegionRates(config.region || FALLBACK_REGION).MSK ??
      fallbackPricing.regions[FALLBACK_REGION].MSK ??
      {};
    const brokerRates = regionRates.brokerHour || {};
    const rate =
      brokerRates[String(config.brokerType || "kafka.m5.large")] ||
      brokerRates["kafka.m5.large"] ||
      0.21;
    return Number(config.brokerCount || 0) * 730 * rate;
  },
  Bedrock: (config: any) => {
    // config: { model, inputTokensMillions, outputTokensMillions }
    const regionRates =
      getRegionRates(config.region || FALLBACK_REGION).Bedrock ??
      fallbackPricing.regions[FALLBACK_REGION].Bedrock ??
      {};
    const model = String(config.model || "claude-3-5-sonnet");
    const inputRate =
      (regionRates.inputPerMillion || {})[model] ||
      (regionRates.inputPerMillion || {})["claude-3-5-sonnet"] ||
      3;
    const outputRate =
      (regionRates.outputPerMillion || {})[model] ||
      (regionRates.outputPerMillion || {})["claude-3-5-sonnet"] ||
      15;
    return (
      Number(config.inputTokensMillions || 0) * inputRate +
      Number(config.outputTokensMillions || 0) * outputRate
    );
  },
  SageMaker: (config: any) => {
    // config: { instanceType, endpointCount, hoursPerMonth }
    const regionRates =
      getRegionRates(config.region || FALLBACK_REGION).SageMaker ??
      fallbackPricing.regions[FALLBACK_REGION].SageMaker ??
      {};
    const instanceRate =
      (regionRates.instanceHour || {})[
        String(config.instanceType || "ml.m5.large")
      ] ||
      (regionRates.instanceHour || {})["ml.m5.large"] ||
      0.115;
    return (
      instanceRate *
      Number(config.endpointCount || 0) *
      Number(config.hoursPerMonth || 0)
    );
  },
  Textract: (config: any) => {
    // config: { pagesThousands, feature }
    const regionRates =
      getRegionRates(config.region || FALLBACK_REGION).Textract ??
      fallbackPricing.regions[FALLBACK_REGION].Textract ??
      {};
    const feature = String(config.feature || "basic");
    const rate =
      (regionRates.featurePerThousandPages || {})[feature] ||
      (regionRates.featurePerThousandPages || {}).basic ||
      1.5;
    return Number(config.pagesThousands || 0) * rate;
  },
  Rekognition: (config: any) => {
    // config: { imagesThousands, videoMinutes }
    const regionRates =
      getRegionRates(config.region || FALLBACK_REGION).Rekognition ??
      fallbackPricing.regions[FALLBACK_REGION].Rekognition ??
      {};
    return (
      Number(config.imagesThousands || 0) *
        (regionRates.imagePerThousand || 1) +
      Number(config.videoMinutes || 0) * (regionRates.videoPerMinute || 0.12)
    );
  },
  Transcribe: (config: any) => {
    // config: { minutesPerMonth }
    const regionRates =
      getRegionRates(config.region || FALLBACK_REGION).Transcribe ??
      fallbackPricing.regions[FALLBACK_REGION].Transcribe ??
      {};
    return (
      Number(config.minutesPerMonth || 0) * (regionRates.perMinute || 0.024)
    );
  },
  Polly: (config: any) => {
    // config: { charactersMillions, voiceType }
    const regionRates =
      getRegionRates(config.region || FALLBACK_REGION).Polly ??
      fallbackPricing.regions[FALLBACK_REGION].Polly ??
      {};
    const voiceType = String(config.voiceType || "standard");
    const rate =
      (regionRates.perMillionCharacters || {})[voiceType] ||
      (regionRates.perMillionCharacters || {}).standard ||
      4;
    return Number(config.charactersMillions || 0) * rate;
  },
  CloudWatchMetrics: (config: any) => {
    const regionRates =
      getRegionRates(config.region || FALLBACK_REGION).CloudWatchMetrics ??
      fallbackPricing.regions[FALLBACK_REGION].CloudWatchMetrics ??
      {};
    return (
      Number(config.customMetricsCount || 0) *
        (regionRates.metricMonth || 0.3) +
      Number(config.apiRequestsMillions || 0) *
        (regionRates.apiPerMillion || 0.01)
    );
  },
  CloudWatchLogs: (config: any) => {
    const regionRates =
      getRegionRates(config.region || FALLBACK_REGION).CloudWatchLogs ??
      fallbackPricing.regions[FALLBACK_REGION].CloudWatchLogs ??
      {};
    return (
      Number(config.ingestionGB || 0) * (regionRates.ingestionPerGB || 0.5) +
      Number(config.storageGB || 0) * (regionRates.storagePerGB || 0.03) +
      Number(config.insightsQueriesGB || 0) *
        (regionRates.insightsPerGB || 0.005)
    );
  },
  CloudWatchAlarms: (config: any) => {
    const regionRates =
      getRegionRates(config.region || FALLBACK_REGION).CloudWatchAlarms ??
      fallbackPricing.regions[FALLBACK_REGION].CloudWatchAlarms ??
      {};
    return Number(config.alarmCount || 0) * (regionRates.alarmMonth || 0.1);
  },
  SecretsManager: (config: any) => {
    const regionRates =
      getRegionRates(config.region || FALLBACK_REGION).SecretsManager ??
      fallbackPricing.regions[FALLBACK_REGION].SecretsManager ??
      {};
    return (
      Number(config.secretCount || 0) * (regionRates.secretMonth || 0.4) +
      Number(config.apiCallsPer10k || 0) * (regionRates.apiPer10k || 0.05)
    );
  },
  KMS: (config: any) => {
    const regionRates =
      getRegionRates(config.region || FALLBACK_REGION).KMS ??
      fallbackPricing.regions[FALLBACK_REGION].KMS ??
      {};
    return (
      Number(config.cmkCount || 0) * (regionRates.keyMonth || 1) +
      Number(config.apiRequestsPer10k || 0) * (regionRates.apiPer10k || 0.03)
    );
  },
  CodeBuild: (config: any) => {
    const regionRates =
      getRegionRates(config.region || FALLBACK_REGION).CodeBuild ??
      fallbackPricing.regions[FALLBACK_REGION].CodeBuild ??
      {};
    const computeType = String(config.computeType || "small");
    const rate =
      (regionRates.minuteRate || {})[computeType] ||
      (regionRates.minuteRate || {}).small ||
      0.005;
    return Number(config.buildMinutesPerMonth || 0) * rate;
  },
  CodePipeline: (config: any) => {
    const regionRates =
      getRegionRates(config.region || FALLBACK_REGION).CodePipeline ??
      fallbackPricing.regions[FALLBACK_REGION].CodePipeline ??
      {};
    return (
      Number(config.activePipelines || 0) * (regionRates.pipelineMonth || 1)
    );
  },
  XRay: (config: any) => {
    const regionRates =
      getRegionRates(config.region || FALLBACK_REGION).XRay ??
      fallbackPricing.regions[FALLBACK_REGION].XRay ??
      {};
    return (
      Number(config.tracesMillions || 0) * (regionRates.perMillionTraces || 5)
    );
  },
  WAF: (config: any) => {
    const regionRates =
      getRegionRates(config.region || FALLBACK_REGION).WAF ??
      fallbackPricing.regions[FALLBACK_REGION].WAF ??
      {};
    return (
      Number(config.webACLs || 0) * (regionRates.webAclMonth || 5) +
      Number(config.rules || 0) * (regionRates.ruleMonth || 1) +
      Number(config.requestsMillions || 0) *
        (regionRates.requestPerMillion || 0.6)
    );
  },
  ShieldStandard: () => {
    const regionRates =
      getRegionRates(FALLBACK_REGION).ShieldStandard ??
      fallbackPricing.regions[FALLBACK_REGION].ShieldStandard ??
      {};
    return Number(regionRates.monthly || 0);
  },
  ShieldAdvanced: (config: any) => {
    const regionRates =
      getRegionRates(config.region || FALLBACK_REGION).ShieldAdvanced ??
      fallbackPricing.regions[FALLBACK_REGION].ShieldAdvanced ??
      {};
    if (!config.enabled) return 0;
    return Number(regionRates.monthly || 3000);
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
