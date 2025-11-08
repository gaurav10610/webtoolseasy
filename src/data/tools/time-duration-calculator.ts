import { ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";
import { Metadata } from "next";
import { createToolStructuredData } from "@/util/structuredDataUtils";

const navigationUrl = "/tools/time-duration-calculator";
const pageTitle = "Time Duration Calculator - Calculate Time Between";
const pageDescription =
  "Calculate time duration between hours, add or subtract time, and convert between time formats. Free time calculator for work hours, project tracking.";
const imageUrl = `${process.env.SCREENSHOTS_BASE_URL}/tools/time-duration-calculator.png`;

const keywords =
  "time calculator,duration calculator,time between calculator,hours calculator,time difference calculator,work hours calculator,time addition,time subtraction,elapsed time calculator";

export const metadata: Metadata = {
  alternates: {
    canonical: `${process.env.HOSTNAME}${navigationUrl}`,
  },
  title: pageTitle,
  description: pageDescription,
  keywords,
  metadataBase: new URL(
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://webtoolseasy.com"
  ),
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon_48.png", sizes: "48x48" },
      { url: "/favicon_512.png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon.png",
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    images: [
      {
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: "Time Duration Calculator Tool",
      },
    ],
    url: navigationUrl,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: [imageUrl],
  },
  authors: {
    name: "Gaurav Kumar Yadav",
  },
  robots: "index, follow",
};

export const componentConfig = {
  mainHeading: "Time Duration Calculator: Calculate Hours, Minutes & Seconds",
  navigationUrl,
  pageTitle,
  tags: keywords.split(",").map((word) => word.trim()),
  relatedTools: [
    ApplicationIds.DATE_CALCULATOR,
    ApplicationIds.TIMEZONE_CONVERTER,
    ApplicationIds.UNIX_TIMESTAMP_CONVERTER,
  ],
  structuredData: createToolStructuredData({
    pageUrl: "time-duration-calculator",
    pageTitle,
    mainHeading: "Time Duration Calculator: Calculate Hours, Minutes & Seconds",
    keywords: keywords.split(",").map((word) => word.trim()),
  }),
};

export const descriptionData: DescriptionBlock[] = [
  {
    heading: "What is a Time Duration Calculator?",
    blockData: [
      "A time duration calculator computes the elapsed time between two time points, adds or subtracts time periods, and converts between different time formats. It's essential for tracking work hours, calculating project durations, managing schedules, measuring event lengths, and billing hourly work. The calculator handles hours, minutes, and seconds across different time formats including 12-hour and 24-hour systems.",
    ],
  },
  {
    heading: "Calculating Time Duration Between Two Times",
    blockData: [
      "To find the duration between two times, the calculator subtracts the start time from the end time, automatically handling AM/PM conversions and crossing midnight. For example, from 9:30 AM to 5:45 PM equals 8 hours and 15 minutes. If crossing midnight (11:00 PM to 2:00 AM), the calculator properly accounts for the day change. This is crucial for shift workers, event planners, and anyone tracking time across different periods.",
    ],
  },
  {
    heading: "Adding and Subtracting Time",
    blockData: [
      "Time addition and subtraction help plan schedules and calculate end times. Adding 2 hours 30 minutes to 3:15 PM results in 5:45 PM. Subtracting 45 minutes from 10:00 AM gives 9:15 AM. The calculator handles carry-over between minutes and hours automatically. This is useful for scheduling meetings, calculating break times, planning travel, and determining when tasks will complete based on duration estimates.",
    ],
  },
  {
    heading: "Converting Time Formats",
    blockData: [
      "The calculator converts between 12-hour (AM/PM) and 24-hour (military time) formats. 3:30 PM converts to 15:30 in 24-hour format. 13:45 converts to 1:45 PM in 12-hour format. It also converts time durations to decimal hours for payroll calculations. For example, 7 hours 45 minutes equals 7.75 hours, which simplifies timesheet calculations and billing for hourly work.",
    ],
  },
  {
    heading: "Work Hours and Timesheet Calculations",
    blockData: [
      "Calculate total work hours by entering start and end times, including lunch breaks. For example, working from 8:00 AM to 5:00 PM with a 30-minute lunch equals 8.5 hours worked. The calculator helps employees track billable hours, managers verify timesheets, and businesses calculate payroll. Overtime calculations become simple when you know exact hours worked beyond the standard 8-hour or 40-hour week thresholds.",
    ],
  },
  {
    heading: "Project and Event Time Tracking",
    blockData: [
      "Track project durations, meeting lengths, and event timing using the calculator. Determine if a project taking 42 hours over multiple days fits within budget. Calculate total meeting time when sessions run from 9:30 AM to 11:15 AM and 2:00 PM to 4:30 PM. Event planners use it to ensure programs fit schedules. The calculator helps with resource allocation by showing exactly how much time activities consume.",
    ],
  },
  {
    heading: "Time Zone and International Considerations",
    blockData: [
      "When working across time zones, combine this calculator with timezone converters to track durations accurately. A meeting from 2:00 PM EST to 4:00 PM EST lasts 2 hours regardless of timezone conversions. However, scheduling participants from different zones requires converting their local times. The calculator helps coordinate international teams by precisely calculating overlap hours and meeting durations in any timezone.",
    ],
  },
  {
    heading: "Tips for Accurate Time Calculations",
    blockData: [
      "Always clarify 12-hour vs 24-hour format to avoid confusion. When crossing midnight, specify dates to ensure accuracy. For payroll, convert time to decimal hours (7.5 instead of 7:30). Round to nearest quarter-hour if required by company policy. Account for daylight saving time changes when calculating durations spanning DST transitions. Use consistent time formats throughout calculations. Double-check AM/PM designations. The calculator handles these automatically when inputs are correct.",
    ],
  },
];
