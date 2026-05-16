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

  it("calculates ECS Fargate pricing", () => {
    const cost = calculateNodeCost(
      "ECS",
      {
        vcpu: 1,
        memoryGB: 2,
        taskCount: 2,
        hoursPerMonth: 730,
      },
      "us-east-1",
    );

    const expected = 1 * 2 * 730 * 0.04048 + 2 * 2 * 730 * 0.004445;
    expect(cost).toBeCloseTo(expected, 3);
  });

  it("calculates EKS control plane plus worker nodes", () => {
    const cost = calculateNodeCost(
      "EKS",
      {
        nodeCount: 3,
        instanceType: "t3.medium",
        clusterHours: 730,
      },
      "us-east-1",
    );

    const expected = 0.1 * 730 + 0.0416 * 730 * 3;
    expect(cost).toBeCloseTo(expected, 3);
  });

  it("calculates Lightsail flat monthly pricing", () => {
    const cost = calculateNodeCost(
      "Lightsail",
      {
        plan: "20",
        instanceCount: 2,
      },
      "us-east-1",
    );

    expect(cost).toBeCloseTo(40, 3);
  });

  it("calculates Elastic Beanstalk from underlying resources", () => {
    const cost = calculateNodeCost(
      "ElasticBeanstalk",
      {
        estimatedEc2Monthly: 120,
        estimatedRdsMonthly: 45,
      },
      "us-east-1",
    );

    expect(cost).toBeCloseTo(165, 3);
  });

  it("calculates Batch pricing with spot discount", () => {
    const onDemand = calculateNodeCost(
      "Batch",
      {
        vcpuHours: 500,
        jobType: "on-demand",
      },
      "us-east-1",
    );

    const spot = calculateNodeCost(
      "Batch",
      {
        vcpuHours: 500,
        jobType: "spot",
      },
      "us-east-1",
    );

    expect(onDemand).toBeCloseTo(500 * 0.04656, 3);
    expect(spot).toBeCloseTo(500 * 0.04656 * 0.3, 3);
    expect(spot).toBeLessThan(onDemand);
  });

  it("calculates DynamoDB provisioned capacity pricing", () => {
    const cost = calculateNodeCost(
      "DynamoDB",
      {
        readCapacityUnits: 100,
        writeCapacityUnits: 20,
        storageGB: 20,
        mode: "provisioned",
      },
      "us-east-1",
    );

    const expected = 100 * 0.00013 * 730 + 20 * 0.00065 * 730 + 20 * 0.25;
    expect(cost).toBeCloseTo(expected, 3);
  });

  it("calculates ElastiCache node pricing", () => {
    const cost = calculateNodeCost(
      "ElastiCache",
      {
        nodeType: "cache.t3.small",
        nodeCount: 2,
        engine: "redis",
      },
      "us-east-1",
    );

    expect(cost).toBeCloseTo(0.034 * 730 * 2, 3);
  });

  it("calculates DocumentDB compute plus storage pricing", () => {
    const cost = calculateNodeCost(
      "DocumentDB",
      {
        instanceClass: "db.r5.large",
        instanceCount: 2,
        storageGB: 100,
      },
      "us-east-1",
    );

    expect(cost).toBeCloseTo(0.277 * 730 * 2 + 100 * 0.1, 3);
  });

  it("calculates Neptune compute, storage, and I/O pricing", () => {
    const cost = calculateNodeCost(
      "Neptune",
      {
        instanceClass: "db.r5.large",
        storageGB: 100,
        ioRequestsMillions: 10,
      },
      "us-east-1",
    );

    expect(cost).toBeCloseTo(0.348 * 730 + 100 * 0.1 + 10 * 0.2, 3);
  });

  it("calculates Aurora Serverless v2 ACU pricing", () => {
    const cost = calculateNodeCost(
      "AuroraServerlessV2",
      {
        minACU: 1,
        maxACU: 3,
        storageGB: 50,
        ioRequestsMillions: 5,
      },
      "us-east-1",
    );

    expect(cost).toBeCloseTo(2 * 730 * 0.12 + 50 * 0.1 + 5 * 0.2, 3);
  });

  it("calculates Timestream memory, magnetic, and write pricing", () => {
    const cost = calculateNodeCost(
      "Timestream",
      {
        memoryStoreGB: 5,
        magneticStoreGB: 100,
        writeRecordsMillions: 10,
      },
      "us-east-1",
    );

    expect(cost).toBeCloseTo(5 * 0.03 + 100 * 0.01 + 10 * 0.5, 3);
  });

  it("calculates EFS pricing by storage class", () => {
    const standard = calculateNodeCost(
      "EFS",
      {
        storageClass: "standard",
        sizeGB: 100,
        throughputMode: "bursting",
      },
      "us-east-1",
    );

    const ia = calculateNodeCost(
      "EFS",
      {
        storageClass: "ia",
        sizeGB: 100,
        throughputMode: "bursting",
      },
      "us-east-1",
    );

    expect(standard).toBeCloseTo(100 * 0.3, 3);
    expect(ia).toBeCloseTo(100 * 0.025, 3);
    expect(ia).toBeLessThan(standard);
  });

  it("calculates EBS pricing with IOPS for io volumes", () => {
    const gp3 = calculateNodeCost(
      "EBS",
      {
        volumeType: "gp3",
        sizeGB: 100,
        iops: 3000,
      },
      "us-east-1",
    );

    const io2 = calculateNodeCost(
      "EBS",
      {
        volumeType: "io2",
        sizeGB: 100,
        iops: 100,
      },
      "us-east-1",
    );

    expect(gp3).toBeCloseTo(100 * 0.08, 3);
    expect(io2).toBeCloseTo(100 * 0.125 + 100 * 0.065, 3);
  });

  it("calculates Glacier storage and retrieval pricing", () => {
    const cost = calculateNodeCost(
      "Glacier",
      {
        storageGB: 1000,
        retrievalRequests: 10,
      },
      "us-east-1",
    );

    expect(cost).toBeCloseTo(1000 * 0.004 + 10 * 0.03, 3);
  });

  it("calculates FSx storage and throughput pricing", () => {
    const windows = calculateNodeCost(
      "FSx",
      {
        fileSystemType: "windows",
        storageCapacityGB: 1024,
        throughputMBps: 64,
      },
      "us-east-1",
    );

    const lustre = calculateNodeCost(
      "FSx",
      {
        fileSystemType: "lustre",
        storageCapacityGB: 1024,
        throughputMBps: 64,
      },
      "us-east-1",
    );

    expect(windows).toBeCloseTo(1024 * 0.13 + 64 * 2.2, 3);
    expect(lustre).toBeCloseTo(1024 * 0.14 + 64 * 1.8, 3);
  });

  it("keeps Storage Gateway informational node cost at zero", () => {
    const cost = calculateNodeCost(
      "StorageGateway",
      {
        infoOnly: true,
      },
      "us-east-1",
    );

    expect(cost).toBe(0);
  });

  it("calculates NLB hourly and LCU pricing", () => {
    const cost = calculateNodeCost(
      "NLB",
      {
        hoursPerMonth: 730,
        lcuCount: 2,
      },
      "us-east-1",
    );

    expect(cost).toBeCloseTo(730 * 0.0225 + 730 * 2 * 0.008, 3);
  });

  it("calculates API Gateway REST pricing", () => {
    const cost = calculateNodeCost(
      "APIGatewayREST",
      {
        apiCallsMillions: 10,
        dataTransferGB: 100,
        cacheGBHours: 5,
      },
      "us-east-1",
    );

    expect(cost).toBeCloseTo(10 * 3.5 + 100 * 0.09 + 5 * 0.02, 3);
  });

  it("calculates API Gateway HTTP tiered pricing", () => {
    const underTier = calculateNodeCost(
      "APIGatewayHTTP",
      {
        apiCallsMillions: 50,
      },
      "us-east-1",
    );

    const overTier = calculateNodeCost(
      "APIGatewayHTTP",
      {
        apiCallsMillions: 350,
      },
      "us-east-1",
    );

    expect(underTier).toBeCloseTo(50 * 1, 3);
    expect(overTier).toBeCloseTo(300 * 1 + 50 * 0.9, 3);
  });

  it("calculates Route53 hosted zones, queries, and health checks", () => {
    const cost = calculateNodeCost(
      "Route53",
      {
        hostedZones: 2,
        queriesMillions: 100,
        healthChecks: 2,
      },
      "us-east-1",
    );

    expect(cost).toBeCloseTo(2 * 0.5 + 100 * 0.4 + 2 * 0.5, 3);
  });

  it("calculates NAT Gateway pricing", () => {
    const cost = calculateNodeCost(
      "NATGateway",
      {
        hoursPerMonth: 730,
        dataProcessedGB: 100,
      },
      "us-east-1",
    );

    expect(cost).toBeCloseTo(730 * 0.045 + 100 * 0.045, 3);
  });

  it("calculates PrivateLink endpoint and data pricing", () => {
    const cost = calculateNodeCost(
      "PrivateLink",
      {
        endpoints: 2,
        hoursPerMonth: 730,
        dataProcessedGB: 100,
      },
      "us-east-1",
    );

    expect(cost).toBeCloseTo(2 * 730 * 0.01 + 100 * 0.01, 3);
  });

  it("calculates Global Accelerator pricing", () => {
    const standard = calculateNodeCost(
      "GlobalAccelerator",
      {
        hours: 730,
        dataTransferGB: 100,
        transferTier: "standard",
      },
      "us-east-1",
    );

    const high = calculateNodeCost(
      "GlobalAccelerator",
      {
        hours: 730,
        dataTransferGB: 100,
        transferTier: "high",
      },
      "us-east-1",
    );

    expect(standard).toBeCloseTo(730 * 0.025 + 100 * 0.015, 3);
    expect(high).toBeCloseTo(730 * 0.025 + 100 * 0.08, 3);
    expect(high).toBeGreaterThan(standard);
  });

  it("calculates Data Transfer virtual node by destination", () => {
    const internet = calculateNodeCost(
      "DataTransfer",
      {
        gbPerMonth: 1000,
        destination: "internet",
      },
      "us-east-1",
    );

    const crossRegion = calculateNodeCost(
      "DataTransfer",
      {
        gbPerMonth: 1000,
        destination: "cross-region",
      },
      "us-east-1",
    );

    expect(internet).toBeCloseTo(1000 * 0.09, 3);
    expect(crossRegion).toBeCloseTo(1000 * 0.02, 3);
    expect(crossRegion).toBeLessThan(internet);
  });

  it("calculates SQS standard and FIFO pricing", () => {
    const standard = calculateNodeCost(
      "SQS",
      {
        requestsMillions: 10,
        fifo: false,
      },
      "us-east-1",
    );

    const fifo = calculateNodeCost(
      "SQS",
      {
        requestsMillions: 10,
        fifo: true,
      },
      "us-east-1",
    );

    expect(standard).toBeCloseTo(10 * 0.4, 3);
    expect(fifo).toBeCloseTo(10 * 0.5, 3);
    expect(fifo).toBeGreaterThan(standard);
  });

  it("calculates SNS pricing by protocol", () => {
    const http = calculateNodeCost(
      "SNS",
      {
        notificationsMillions: 10,
        protocol: "http",
      },
      "us-east-1",
    );

    const sms = calculateNodeCost(
      "SNS",
      {
        notificationsMillions: 10,
        protocol: "sms",
      },
      "us-east-1",
    );

    expect(http).toBeCloseTo(10 * 0.5, 3);
    expect(sms).toBeCloseTo(10 * 6, 3);
    expect(sms).toBeGreaterThan(http);
  });

  it("calculates EventBridge custom event pricing", () => {
    const custom = calculateNodeCost(
      "EventBridge",
      {
        eventsMillions: 10,
        eventBusType: "custom",
      },
      "us-east-1",
    );

    const aws = calculateNodeCost(
      "EventBridge",
      {
        eventsMillions: 10,
        eventBusType: "aws",
      },
      "us-east-1",
    );

    expect(custom).toBeCloseTo(10 * 1, 3);
    expect(aws).toBeCloseTo(0, 3);
  });

  it("calculates Kinesis Data Streams shard and retrieval pricing", () => {
    const cost = calculateNodeCost(
      "KinesisDataStreams",
      {
        shardCount: 2,
        hoursPerMonth: 730,
        dataRetrievalGB: 100,
      },
      "us-east-1",
    );

    expect(cost).toBeCloseTo(2 * 730 * 0.015 + 100 * 0.013, 3);
  });

  it("calculates Kinesis Firehose ingest pricing", () => {
    const cost = calculateNodeCost(
      "KinesisFirehose",
      {
        dataIngestedGB: 500,
      },
      "us-east-1",
    );

    expect(cost).toBeCloseTo(500 * 0.029, 3);
  });

  it("calculates MSK broker pricing", () => {
    const cost = calculateNodeCost(
      "MSK",
      {
        brokerType: "kafka.m5.large",
        brokerCount: 3,
      },
      "us-east-1",
    );

    expect(cost).toBeCloseTo(3 * 730 * 0.21, 3);
  });

  it("calculates Bedrock token-based model pricing", () => {
    const cost = calculateNodeCost(
      "Bedrock",
      {
        model: "claude-3-5-sonnet",
        inputTokensMillions: 5,
        outputTokensMillions: 2,
      },
      "us-east-1",
    );

    expect(cost).toBeCloseTo(5 * 3 + 2 * 15, 3);
  });

  it("calculates SageMaker endpoint instance-hour pricing", () => {
    const cost = calculateNodeCost(
      "SageMaker",
      {
        instanceType: "ml.m5.large",
        endpointCount: 1,
        hoursPerMonth: 730,
      },
      "us-east-1",
    );

    expect(cost).toBeCloseTo(0.115 * 730, 3);
  });

  it("calculates Textract per-thousand-page pricing", () => {
    const basic = calculateNodeCost(
      "Textract",
      {
        pagesThousands: 10,
        feature: "basic",
      },
      "us-east-1",
    );

    const forms = calculateNodeCost(
      "Textract",
      {
        pagesThousands: 10,
        feature: "forms",
      },
      "us-east-1",
    );

    expect(basic).toBeCloseTo(10 * 1.5, 3);
    expect(forms).toBeCloseTo(10 * 50, 3);
    expect(forms).toBeGreaterThan(basic);
  });

  it("calculates Rekognition image and video pricing", () => {
    const cost = calculateNodeCost(
      "Rekognition",
      {
        imagesThousands: 100,
        videoMinutes: 10,
      },
      "us-east-1",
    );

    expect(cost).toBeCloseTo(100 * 1 + 10 * 0.12, 3);
  });

  it("calculates Transcribe per-minute pricing", () => {
    const cost = calculateNodeCost(
      "Transcribe",
      {
        minutesPerMonth: 1000,
      },
      "us-east-1",
    );

    expect(cost).toBeCloseTo(1000 * 0.024, 3);
  });

  it("calculates Polly standard vs neural pricing", () => {
    const standard = calculateNodeCost(
      "Polly",
      {
        charactersMillions: 5,
        voiceType: "standard",
      },
      "us-east-1",
    );

    const neural = calculateNodeCost(
      "Polly",
      {
        charactersMillions: 5,
        voiceType: "neural",
      },
      "us-east-1",
    );

    expect(standard).toBeCloseTo(5 * 4, 3);
    expect(neural).toBeCloseTo(5 * 16, 3);
    expect(neural).toBeGreaterThan(standard);
  });

  it("calculates CloudWatch Metrics custom metric and API pricing", () => {
    const cost = calculateNodeCost(
      "CloudWatchMetrics",
      {
        customMetricsCount: 10,
        apiRequestsMillions: 5,
      },
      "us-east-1",
    );

    expect(cost).toBeCloseTo(10 * 0.3 + 5 * 0.01, 3);
  });

  it("calculates CloudWatch Logs ingestion, storage, and query pricing", () => {
    const cost = calculateNodeCost(
      "CloudWatchLogs",
      {
        ingestionGB: 50,
        storageGB: 100,
        insightsQueriesGB: 10,
      },
      "us-east-1",
    );

    expect(cost).toBeCloseTo(50 * 0.5 + 100 * 0.03 + 10 * 0.005, 3);
  });

  it("calculates CloudWatch Alarms monthly alarm pricing", () => {
    const cost = calculateNodeCost(
      "CloudWatchAlarms",
      {
        alarmCount: 20,
      },
      "us-east-1",
    );

    expect(cost).toBeCloseTo(20 * 0.1, 3);
  });

  it("calculates Secrets Manager secrets and API call pricing", () => {
    const cost = calculateNodeCost(
      "SecretsManager",
      {
        secretCount: 10,
        apiCallsPer10k: 20,
      },
      "us-east-1",
    );

    expect(cost).toBeCloseTo(10 * 0.4 + 20 * 0.05, 3);
  });

  it("calculates KMS key and request pricing", () => {
    const cost = calculateNodeCost(
      "KMS",
      {
        cmkCount: 5,
        apiRequestsPer10k: 50,
      },
      "us-east-1",
    );

    expect(cost).toBeCloseTo(5 * 1 + 50 * 0.03, 3);
  });

  it("calculates CodeBuild monthly cost by compute type", () => {
    const small = calculateNodeCost(
      "CodeBuild",
      {
        buildMinutesPerMonth: 1000,
        computeType: "small",
      },
      "us-east-1",
    );

    const large = calculateNodeCost(
      "CodeBuild",
      {
        buildMinutesPerMonth: 1000,
        computeType: "large",
      },
      "us-east-1",
    );

    expect(small).toBeCloseTo(1000 * 0.005, 3);
    expect(large).toBeCloseTo(1000 * 0.02, 3);
    expect(large).toBeGreaterThan(small);
  });

  it("calculates CodePipeline active pipeline pricing", () => {
    const cost = calculateNodeCost(
      "CodePipeline",
      {
        activePipelines: 3,
      },
      "us-east-1",
    );

    expect(cost).toBeCloseTo(3 * 1, 3);
  });

  it("calculates X-Ray trace pricing", () => {
    const cost = calculateNodeCost(
      "XRay",
      {
        tracesMillions: 2,
      },
      "us-east-1",
    );

    expect(cost).toBeCloseTo(2 * 5, 3);
  });

  it("calculates WAF ACL, rule, and request pricing", () => {
    const cost = calculateNodeCost(
      "WAF",
      {
        webACLs: 1,
        rules: 10,
        requestsMillions: 100,
      },
      "us-east-1",
    );

    expect(cost).toBeCloseTo(1 * 5 + 10 * 1 + 100 * 0.6, 3);
  });

  it("keeps Shield Standard at zero monthly cost", () => {
    const cost = calculateNodeCost(
      "ShieldStandard",
      {
        infoOnly: true,
      },
      "us-east-1",
    );

    expect(cost).toBe(0);
  });

  it("calculates Shield Advanced fixed monthly cost", () => {
    const enabled = calculateNodeCost(
      "ShieldAdvanced",
      {
        enabled: true,
      },
      "us-east-1",
    );

    const disabled = calculateNodeCost(
      "ShieldAdvanced",
      {
        enabled: false,
      },
      "us-east-1",
    );

    expect(enabled).toBeCloseTo(3000, 3);
    expect(disabled).toBe(0);
  });

  it("applies EC2 reserved and spot pricing multipliers", () => {
    const onDemand = calculateNodeCost(
      "EC2",
      {
        instanceType: "t3.micro",
        count: 1,
        hoursPerMonth: 730,
        purchaseOption: "on-demand",
      },
      "us-east-1",
    );

    const reserved3yr = calculateNodeCost(
      "EC2",
      {
        instanceType: "t3.micro",
        count: 1,
        hoursPerMonth: 730,
        purchaseOption: "reserved-3yr",
      },
      "us-east-1",
    );

    const spot = calculateNodeCost(
      "EC2",
      {
        instanceType: "t3.micro",
        count: 1,
        hoursPerMonth: 730,
        purchaseOption: "spot",
      },
      "us-east-1",
    );

    expect(reserved3yr).toBeCloseTo(onDemand * 0.55, 3);
    expect(spot).toBeCloseTo(onDemand * 0.3, 3);
    expect(spot).toBeLessThan(reserved3yr);
  });

  it("applies RDS reserved pricing multiplier to compute portion", () => {
    const onDemand = calculateNodeCost(
      "RDS",
      {
        instanceType: "db.t3.micro",
        storageGB: 20,
        multiAZ: false,
        purchaseOption: "on-demand",
      },
      "us-east-1",
    );

    const reserved1yr = calculateNodeCost(
      "RDS",
      {
        instanceType: "db.t3.micro",
        storageGB: 20,
        multiAZ: false,
        purchaseOption: "reserved-1yr",
      },
      "us-east-1",
    );

    expect(reserved1yr).toBeLessThan(onDemand);
  });

  it("applies ElastiCache reserved pricing multipliers", () => {
    const onDemand = calculateNodeCost(
      "ElastiCache",
      {
        nodeType: "cache.t3.small",
        nodeCount: 1,
        engine: "redis",
        purchaseOption: "on-demand",
      },
      "us-east-1",
    );

    const reserved1yr = calculateNodeCost(
      "ElastiCache",
      {
        nodeType: "cache.t3.small",
        nodeCount: 1,
        engine: "redis",
        purchaseOption: "reserved-1yr",
      },
      "us-east-1",
    );

    expect(reserved1yr).toBeCloseTo(onDemand * 0.7, 3);
  });
});
