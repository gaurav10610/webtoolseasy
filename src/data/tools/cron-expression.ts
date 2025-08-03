import { ApplicationConfig } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";

const navigationUrl = "/tools/cron-expression";
const pageTitle = "Cron Expression Generator - Create Cron Jobs Online";
const pageDescription =
  "Generate cron expressions visually with our free online tool. Create scheduled tasks easily with interactive interface and real-time validation.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/cron-expression.png`;

const keywords =
  "cron expression generator,cron job generator,cron expression builder,schedule tasks,cron maker,crontab generator,task scheduler";

export const metadata: Metadata = {
  alternates: {
    canonical: `${process.env.HOSTNAME}${navigationUrl}`,
  },
  title: pageTitle,
  description: pageDescription,
  keywords,
  metadataBase: new URL(process.env.HOSTNAME!),
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/favicon.png", type: "image/png" }],
    shortcut: "/favicon.ico",
    apple: "/favicon.png",
  },
  openGraph: {
    title: pageTitle,
    type: "website",
    url: `${process.env.HOSTNAME}${navigationUrl}`,
    images: [
      {
        url: imageUrl,
        secureUrl: imageUrl,
        alt: pageTitle,
      },
    ],
    description: pageDescription,
  },
  twitter: {
    card: "summary_large_image",
    site: "@webtoolseasy",
    title: pageTitle,
    description: pageDescription,
    images: [imageUrl],
  },
  authors: {
    name: "Gaurav Kumar Yadav",
  },
  robots: "index, follow",
};

export const componentConfig: ApplicationConfig = {
  mainHeading: "Free Online Cron Expression Generator: Create Cron Expressions",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  icons: [],
  relatedTools: [],
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "Cron Expression Generator and Scheduler",
    blockData: [
      "Our free online cron expression generator helps you create and validate cron jobs for task scheduling on Unix, Linux, and cloud platforms. Build complex scheduling patterns with an intuitive interface that translates human-readable schedules into proper cron syntax.",
      "Perfect for system administrators, developers, and DevOps engineers who need to automate tasks, backups, data processing, and maintenance scripts. Generate cron expressions for any frequency from minutes to years with visual feedback and validation.",
    ],
  },
  {
    heading: "Cron Expression Builder Features",
    listData: [
      "Visual cron builder with dropdown menus for each field",
      "Real-time validation and syntax checking",
      "Human-readable description of generated schedules",
      "Support for special characters (*, /, -, ?)",
      "Advanced scheduling patterns and intervals",
      "Copy-ready cron expressions for immediate use",
      "Examples for common scheduling scenarios",
    ],
  },
  {
    heading: "Common Cron Scheduling Use Cases",
    blockData: [
      "**System Maintenance**: Schedule backups, log rotations, and cleanup tasks",
      "**Data Processing**: Automate ETL jobs, report generation, and batch processing",
      "**Web Development**: Cache clearing, sitemap updates, and monitoring tasks",
      "**DevOps**: Deployment automation, health checks, and resource monitoring",
      "**Content Management**: Automated publishing, email campaigns, and content updates",
    ],
  },
  {
    heading: "Cron Syntax and Format Support",
    listData: [
      "Standard 5-field format: minute hour day month weekday",
      "Extended 6-field format with seconds support",
      "Special time strings (@hourly, @daily, @weekly, @monthly)",
      "Range expressions (1-5) and list values (1,3,5)",
      "Step values (*/5) for interval-based scheduling",
      "Compatible with Linux crontab, Jenkins, and cloud platforms",
    ],
  },
];
