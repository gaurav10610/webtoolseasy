export type ArchitectureTemplate = {
  slug: string;
  name: string;
  description: string;
  estimatedCost: number;
  tags: string[];
  scenarioVariants: Array<{
    name: string;
    monthlyEstimate: number;
    assumptions: string[];
  }>;
  assumptionNotes: string[];
  payload: any; // The ArchPayload for the canvas
};

export const architectureTemplates: ArchitectureTemplate[] = [
  {
    slug: "classic-3-tier-web",
    name: "Classic 3-Tier Web Architecture",
    description:
      "A highly available web application architecture spanning two Availability Zones. Includes an Application Load Balancer, two EC2 instances for web/app tier, and an RDS database.",
    estimatedCost: 64.56,
    tags: ["High Availability", "Web Application", "EC2", "RDS"],
    scenarioVariants: [
      {
        name: "Lean Startup",
        monthlyEstimate: 52,
        assumptions: [
          "Burstable compute tier",
          "Lower monthly traffic",
          "Single read replica omitted",
        ],
      },
      {
        name: "Balanced Production",
        monthlyEstimate: 135,
        assumptions: [
          "2 web nodes + Multi-AZ database",
          "Moderate outbound traffic",
          "Standard observability enabled",
        ],
      },
      {
        name: "Scale Ready",
        monthlyEstimate: 390,
        assumptions: [
          "Larger compute family",
          "Higher traffic and storage",
          "Enhanced backups and failover",
        ],
      },
    ],
    assumptionNotes: [
      "Traffic egress and inter-AZ transfer are major hidden cost drivers.",
      "Database redundancy settings can more than double baseline spend.",
      "Monitoring, logs, and backups should be budgeted explicitly.",
    ],
    payload: {
      nodes: [
        {
          id: "alb-1",
          type: "infraNode",
          position: { x: 400, y: 100 },
          data: {
            label: "Application Load Balancer",
            service: "ALB",
            region: "us-east-1",
            config: { hoursPerMonth: 730, lcuCount: 1 },
            costPerMonth: 22.26,
          },
        },
        {
          id: "ec2-1",
          type: "infraNode",
          position: { x: 300, y: 300 },
          data: {
            label: "Web Server (AZ-A)",
            service: "EC2",
            region: "us-east-1",
            config: { instanceType: "t3.micro", count: 1, hoursPerMonth: 730 },
            costPerMonth: 7.59,
          },
        },
        {
          id: "ec2-2",
          type: "infraNode",
          position: { x: 500, y: 300 },
          data: {
            label: "Web Server (AZ-B)",
            service: "EC2",
            region: "us-east-1",
            config: { instanceType: "t3.micro", count: 1, hoursPerMonth: 730 },
            costPerMonth: 7.59,
          },
        },
        {
          id: "rds-1",
          type: "infraNode",
          position: { x: 400, y: 500 },
          data: {
            label: "Primary Database",
            service: "RDS",
            region: "us-east-1",
            config: {
              instanceType: "db.t3.micro",
              storageGB: 20,
              multiAZ: true,
            },
            costPerMonth: 27.12,
          },
        },
      ],
      edges: [
        { id: "e1", source: "alb-1", target: "ec2-1", animated: true },
        { id: "e2", source: "alb-1", target: "ec2-2", animated: true },
        { id: "e3", source: "ec2-1", target: "rds-1" },
        { id: "e4", source: "ec2-2", target: "rds-1" },
      ],
    },
  },
  {
    slug: "serverless-api",
    name: "Serverless API Backend",
    description:
      "A lightweight serverless API backend using API Gateway (CloudFront proxy here), Lambda for compute, and S3 for static asset storage. Highly scalable and cost-effective for variable traffic.",
    estimatedCost: 10.82,
    tags: ["Serverless", "API", "Lambda", "S3"],
    scenarioVariants: [
      {
        name: "Prototype",
        monthlyEstimate: 9,
        assumptions: [
          "Low request volume",
          "Limited regional traffic",
          "No provisioned concurrency",
        ],
      },
      {
        name: "Growing Product",
        monthlyEstimate: 45,
        assumptions: [
          "Higher API request rate",
          "Increased CloudFront transfer",
          "S3 request growth",
        ],
      },
      {
        name: "Global Burst",
        monthlyEstimate: 160,
        assumptions: [
          "Global user traffic spikes",
          "Heavy CDN transfer",
          "Higher Lambda compute duration",
        ],
      },
    ],
    assumptionNotes: [
      "Serverless cost scales with invocation patterns and transfer volume.",
      "CloudFront and data transfer can dominate beyond early stages.",
      "Provisioned concurrency improves latency but adds steady baseline cost.",
    ],
    payload: {
      nodes: [
        {
          id: "cf-1",
          type: "infraNode",
          position: { x: 400, y: 100 },
          data: {
            label: "CloudFront Distribution",
            service: "CloudFront",
            region: "us-east-1",
            config: { dataTransferOutGB: 100 },
            costPerMonth: 8.5,
          },
        },
        {
          id: "lambda-1",
          type: "infraNode",
          position: { x: 300, y: 300 },
          data: {
            label: "API Function",
            service: "Lambda",
            region: "us-east-1",
            config: { invocationsMillions: 5, memoryMB: 512, durationMs: 200 },
            costPerMonth: 1.0,
          },
        },
        {
          id: "s3-1",
          type: "infraNode",
          position: { x: 500, y: 300 },
          data: {
            label: "Static Assets",
            service: "S3",
            region: "us-east-1",
            config: {
              storageGB: 50,
              readReqsMillions: 2,
              writeReqsMillions: 0.1,
            },
            costPerMonth: 1.32,
          },
        },
      ],
      edges: [
        { id: "e1", source: "cf-1", target: "lambda-1", animated: true },
        { id: "e2", source: "cf-1", target: "s3-1", animated: true },
      ],
    },
  },
];
