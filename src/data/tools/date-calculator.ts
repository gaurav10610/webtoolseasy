import { ApplicationIds } from "@/types/config";
import { DescriptionBlock } from "@/types/description";

export const dateCalculatorMetadata = {
  pageTitle: "Date Calculator - Calculate Date Differences",
  mainHeading: "Date Calculator",
  tags: [
    "date calculator",
    "date difference calculator",
    "days between dates",
    "add days to date",
    "subtract days from date",
    "working days calculator",
    "business days calculator",
    "age in days calculator",
    "date arithmetic",
    "day counter",
    "date tools",
    "calendar calculator",
  ],
  relatedTools: [
    ApplicationIds.AGE_CALCULATOR,
    ApplicationIds.UNIX_TIMESTAMP_CONVERTER,
    ApplicationIds.TIMEZONE_CONVERTER,
    ApplicationIds.GPA_CALCULATOR,
  ],
};

export const dateCalculatorDescriptionData: DescriptionBlock[] = [
  {
    heading: "What is a Date Calculator?",
    blockData: [
      "A date calculator is a versatile tool that helps you perform various date-related calculations. It can calculate the difference between two dates, add or subtract days from a specific date, count working days, and determine dates for past or future events. Date calculators are essential for project planning, event management, deadline tracking, and personal scheduling.",
    ],
  },
  {
    heading: "Why Use a Date Calculator?",
    blockData: [
      "Date calculations can be complex due to varying month lengths, leap years, and timezone considerations. A date calculator eliminates manual counting errors and provides instant, accurate results. Whether you're planning a project timeline, calculating age in days, determining contract durations, or scheduling events, a date calculator saves time and ensures precision.",
    ],
  },
  {
    heading: "Common Uses for Date Calculations",
    blockData: [
      "Date calculators are widely used across various scenarios: project managers use them to plan timelines and milestones, HR professionals calculate employment duration and leave balances, event planners determine countdown days, financial analysts track investment periods, students calculate study schedules, and individuals plan vacations, birthdays, and anniversaries. They're also essential for legal contracts, loan terms, and subscription management.",
    ],
  },
  {
    heading: "How to Use the Date Calculator",
    blockData: [
      "Using the date calculator is straightforward. For date difference, select two dates and see the exact difference in years, months, weeks, and days. To add or subtract days, choose a start date, specify the number of days to add or subtract, and get the resulting date instantly. The calculator handles all edge cases including leap years, month-end dates, and daylight saving time transitions automatically.",
    ],
  },
  {
    heading: "Understanding Date Differences",
    blockData: [
      "Date differences can be expressed in multiple units: years, months, weeks, days, hours, minutes, and seconds. The calculator provides comprehensive breakdowns including total days, business days (excluding weekends), and weeks. This multi-unit display helps you understand durations in the most relevant context for your needs, whether planning a 90-day project or a 2-year contract.",
    ],
  },
  {
    heading: "Working Days vs Calendar Days",
    blockData: [
      "The calculator distinguishes between calendar days (total days) and working days (business days excluding weekends). This feature is crucial for project planning, delivery estimates, and employment calculations. Working day calculations typically exclude Saturdays and Sundays, though some calculators allow custom weekend definitions for different regions and industries.",
    ],
  },
  {
    heading: "Date Calculator Features",
    blockData: [
      "Modern date calculators offer multiple calculation modes: date difference (days between two dates), add days (find future date), subtract days (find past date), age in multiple units, working days count, and week number calculations. Advanced features include custom weekend patterns, holiday exclusions, timezone support, and the ability to save favorite calculations for repeated use.",
    ],
  },
  {
    heading: "Tips for Accurate Date Planning",
    blockData: [
      "When using date calculators for planning, consider buffer time for unexpected delays, account for holidays and non-working days in business calculations, use working days for professional deadlines, and remember timezone differences for international projects. For long-term planning, review calculations periodically as circumstances change. Always verify critical dates like contract expirations and regulatory deadlines.",
    ],
  },
];
