export type ArchitectureTemplate = {
  slug: string;
  name: string;
  description: string;
  estimatedCost: number;
  tags: string[];
  payload: any; // The ArchPayload for the canvas
};

export const architectureTemplates: ArchitectureTemplate[] = [
  {
    slug: "classic-3-tier-web",
    name: "Classic 3-Tier Web Architecture",
    description: "A highly available web application architecture spanning two Availability Zones. Includes an Application Load Balancer, two EC2 instances for web/app tier, and an RDS database.",
    estimatedCost: 64.56,
    tags: ["High Availability", "Web Application", "EC2", "RDS"],
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
            config: { instanceType: "db.t3.micro", storageGB: 20, multiAZ: true },
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
    description: "A lightweight serverless API backend using API Gateway (CloudFront proxy here), Lambda for compute, and S3 for static asset storage. Highly scalable and cost-effective for variable traffic.",
    estimatedCost: 10.82,
    tags: ["Serverless", "API", "Lambda", "S3"],
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
            costPerMonth: 8.50,
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
            costPerMonth: 1.00,
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
            config: { storageGB: 50, readReqsMillions: 2, writeReqsMillions: 0.1 },
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
