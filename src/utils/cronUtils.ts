import cronParser from "cron-parser";
import cronstrue from "cronstrue";

export type CronData = {
  isValid: boolean;
  humanReadable: string;
  nextDates: Date[];
  error?: string;
};

export function analyzeCron(cronString: string, count = 5): CronData {
  try {
    const humanReadable = cronstrue.toString(cronString, { use24HourTimeFormat: true });
    
    const interval = cronParser.parse(cronString);
    const nextDates: Date[] = [];
    
    for (let i = 0; i < count; i++) {
      nextDates.push(interval.next().toDate());
    }

    return {
      isValid: true,
      humanReadable,
      nextDates
    };
  } catch (err: any) {
    return {
      isValid: false,
      humanReadable: "Invalid cron expression",
      nextDates: [],
      error: typeof err === "string" ? err : err.message || "Unknown error"
    };
  }
}

// Generate cron strings from UI builder state
export function buildCron(
  minute: string,
  hour: string,
  dayOfMonth: string,
  month: string,
  dayOfWeek: string
): string {
  return `${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`;
}
