export type CalculatorPage = {
  service: string;
  name: string;
  description: string;
  costComponents: string[];
  bestPractices: string[];
  scenarioPresets: Array<{
    name: string;
    monthlyEstimate: number;
    assumptions: string[];
  }>;
  assumptionNotes: string[];
};

export const calculatorPages: CalculatorPage[] = [
  {
    service: "EC2",
    name: "Amazon EC2",
    description:
      "Calculate the monthly cost of Amazon EC2 instances based on instance type, region, and running hours. EC2 pricing varies significantly across regions and instance families (compute optimized, memory optimized, etc.).",
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
    scenarioPresets: [
      {
        name: "Startup MVP",
        monthlyEstimate: 28,
        assumptions: [
          "1 x t4g.small instance",
          "~300 GB monthly data transfer out",
          "Single AZ, no autoscaling",
        ],
      },
      {
        name: "Growth SaaS",
        monthlyEstimate: 180,
        assumptions: [
          "3 x t3.medium instances",
          "~2 TB monthly data transfer out",
          "Multi-AZ app tier",
        ],
      },
      {
        name: "Production Critical",
        monthlyEstimate: 520,
        assumptions: [
          "4 x m6i.large instances",
          "~6 TB monthly data transfer out",
          "Load-balanced, rolling deploys",
        ],
      },
    ],
    assumptionNotes: [
      "Estimates exclude enterprise discounts and taxes.",
      "Data transfer tiers can significantly change effective $/GB.",
      "Storage and observability charges are often separate from base compute.",
    ],
  },
  {
    service: "RDS",
    name: "Amazon RDS",
    description:
      "Estimate costs for managed relational databases (PostgreSQL, MySQL, MariaDB). RDS pricing includes compute, storage, and optional Multi-AZ redundancy.",
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
    scenarioPresets: [
      {
        name: "Dev/Staging",
        monthlyEstimate: 45,
        assumptions: [
          "db.t4g.micro single-AZ",
          "50 GB gp3 storage",
          "7-day backups",
        ],
      },
      {
        name: "Core Production",
        monthlyEstimate: 240,
        assumptions: [
          "db.m6g.large Multi-AZ",
          "200 GB gp3 storage",
          "14-day backups",
        ],
      },
      {
        name: "High Throughput",
        monthlyEstimate: 680,
        assumptions: [
          "db.r6g.xlarge Multi-AZ",
          "500 GB storage + higher IOPS",
          "Read replica for analytics",
        ],
      },
    ],
    assumptionNotes: [
      "Backup retention, storage class, and provisioned IOPS can dominate cost.",
      "Cross-AZ traffic and replica usage may add hidden network charges.",
      "Reserved instances and savings plans can materially reduce baseline spend.",
    ],
  },
  {
    service: "S3",
    name: "Amazon S3",
    description:
      "Calculate object storage costs including storage capacity, PUT/GET requests, and data transfer. S3 costs scale linearly with your data volume.",
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
    scenarioPresets: [
      {
        name: "Static Site Assets",
        monthlyEstimate: 9,
        assumptions: [
          "100 GB standard storage",
          "Moderate GET traffic",
          "Minimal PUT requests",
        ],
      },
      {
        name: "App Media Storage",
        monthlyEstimate: 75,
        assumptions: [
          "2 TB mixed storage",
          "High GET request volume",
          "Lifecycle to IA after 30 days",
        ],
      },
      {
        name: "Archive Heavy",
        monthlyEstimate: 190,
        assumptions: [
          "20 TB total footprint",
          "Majority in Glacier/Deep Archive",
          "Low retrieval frequency",
        ],
      },
    ],
    assumptionNotes: [
      "Request costs can surprise teams with many small-object operations.",
      "Retrieval pricing in archival tiers should be modeled separately.",
      "CloudFront in front of S3 can reduce both request and transfer spend.",
    ],
  },
  {
    service: "Lambda",
    name: "AWS Lambda",
    description:
      "Serverless compute cost calculator. Pay only for the compute time you consume. Costs are calculated based on the number of requests and the duration of code execution multiplied by the allocated memory.",
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
    scenarioPresets: [
      {
        name: "Internal Automation",
        monthlyEstimate: 12,
        assumptions: [
          "2M requests/month",
          "512MB memory",
          "Average duration 120ms",
        ],
      },
      {
        name: "Public API",
        monthlyEstimate: 95,
        assumptions: [
          "40M requests/month",
          "1024MB memory",
          "Average duration 220ms",
        ],
      },
      {
        name: "Event Processing",
        monthlyEstimate: 210,
        assumptions: [
          "120M requests/month",
          "1536MB memory",
          "Average duration 300ms",
        ],
      },
    ],
    assumptionNotes: [
      "Cold starts and concurrency spikes can affect real-world performance-cost tradeoffs.",
      "Provisioned concurrency improves latency but adds baseline cost.",
      "Network egress and downstream service costs are outside pure Lambda compute.",
    ],
  },
  {
    service: "ALB",
    name: "Application Load Balancer",
    description:
      "Estimate costs for routing HTTP/HTTPS traffic. ALB pricing is based on a flat hourly rate plus Load Balancer Capacity Units (LCUs) consumed.",
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
    scenarioPresets: [
      {
        name: "Single App",
        monthlyEstimate: 24,
        assumptions: ["1 ALB", "Low connection churn", "~1 LCU average"],
      },
      {
        name: "Multi-Service API",
        monthlyEstimate: 80,
        assumptions: [
          "Shared ALB across 4 services",
          "Moderate rule evaluations",
          "~3 LCUs average",
        ],
      },
      {
        name: "High Traffic",
        monthlyEstimate: 240,
        assumptions: [
          "High active connections",
          "Heavy data processed",
          "~10 LCUs average",
        ],
      },
    ],
    assumptionNotes: [
      "LCU drivers vary by traffic pattern and request size.",
      "ALB + WAF + data transfer should be modeled together for production accuracy.",
      "Rule evaluation complexity can increase effective LCU usage.",
    ],
  },
];
