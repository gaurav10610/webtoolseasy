export type CalculatorPage = {
  service: string;
  name: string;
  description: string;
  costComponents: string[];
  bestPractices: string[];
};

export const calculatorPages: CalculatorPage[] = [
  {
    service: "EC2",
    name: "Amazon EC2",
    description: "Calculate the monthly cost of Amazon EC2 instances based on instance type, region, and running hours. EC2 pricing varies significantly across regions and instance families (compute optimized, memory optimized, etc.).",
    costComponents: [
      "Instance Type (hourly rate)",
      "Operating System (Linux, Windows)",
      "EBS Storage attached to the instance",
      "Data Transfer Out",
    ],
    bestPractices: [
      "Use Graviton (ARM) instances for up to 20% cost savings",
      "Purchase Savings Plans for steady-state workloads",
      "Stop development instances during off-hours",
    ],
  },
  {
    service: "RDS",
    name: "Amazon RDS",
    description: "Estimate costs for managed relational databases (PostgreSQL, MySQL, MariaDB). RDS pricing includes compute, storage, and optional Multi-AZ redundancy.",
    costComponents: [
      "Database Instance Class (compute & memory)",
      "Storage (gb-month)",
      "Multi-AZ Deployment (doubles instance and storage costs)",
      "Backup Storage",
    ],
    bestPractices: [
      "Use Multi-AZ only for production databases",
      "Consider Aurora Serverless for intermittent workloads",
      "Monitor IOPS usage to avoid over-provisioning gp3 storage",
    ],
  },
  {
    service: "S3",
    name: "Amazon S3",
    description: "Calculate object storage costs including storage capacity, PUT/GET requests, and data transfer. S3 costs scale linearly with your data volume.",
    costComponents: [
      "Storage Class (Standard, Infrequent Access, Glacier)",
      "Volume of Data Stored (per GB)",
      "Number of Requests (PUT, COPY, POST, LIST, GET)",
      "Data Transfer Out (Internet and cross-region)",
    ],
    bestPractices: [
      "Implement S3 Lifecycle policies to move older data to cheaper storage classes",
      "Use S3 Intelligent-Tiering for data with unknown access patterns",
      "Delete incomplete multipart uploads automatically",
    ],
  },
  {
    service: "Lambda",
    name: "AWS Lambda",
    description: "Serverless compute cost calculator. Pay only for the compute time you consume. Costs are calculated based on the number of requests and the duration of code execution multiplied by the allocated memory.",
    costComponents: [
      "Number of Requests",
      "Execution Duration (in milliseconds)",
      "Allocated Memory (MB)",
      "Data Transfer Out",
    ],
    bestPractices: [
      "Optimize code execution time to reduce duration costs",
      "Right-size memory allocation (more memory can sometimes mean faster execution and lower overall cost)",
      "Use ARM architecture for up to 34% better price performance",
    ],
  },
  {
    service: "ALB",
    name: "Application Load Balancer",
    description: "Estimate costs for routing HTTP/HTTPS traffic. ALB pricing is based on a flat hourly rate plus Load Balancer Capacity Units (LCUs) consumed.",
    costComponents: [
      "Hourly Base Rate",
      "Load Balancer Capacity Units (LCUs)",
      "LCUs measure: New connections, Active connections, Processed bytes, and Rule evaluations",
    ],
    bestPractices: [
      "Consolidate multiple ALBs using host-based or path-based routing",
      "Delete idle load balancers",
      "Use CloudFront in front of ALB to cache static assets and reduce LCU usage",
    ],
  },
];
