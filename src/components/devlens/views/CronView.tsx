"use client";

import { useMemo } from "react";
import { Cron } from "croner";
import { Badge } from "@/components/ui/Badge";
import { CopyButton } from "@/components/ui/CopyButton";
import { Panel } from "@/components/ui/Panel";

type CronViewProps = {
  input: string;
};

// Human-readable field descriptions
const FIELD_NAMES = ["Minute", "Hour", "Day of month", "Month", "Day of week"];

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DOW_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function describeField(value: string, fieldIndex: number): string {
  if (value === "*") {
    return (
      "every " + ["minute", "hour", "day", "month", "day of week"][fieldIndex]
    );
  }
  if (value.startsWith("*/")) {
    const n = value.slice(2);
    const unit = ["minutes", "hours", "days", "months", "days"][fieldIndex];
    return `every ${n} ${unit}`;
  }
  if (value.includes(",")) {
    const parts = value.split(",");
    const labels = parts.map((p) => formatFieldValue(p, fieldIndex));
    return labels.join(", ");
  }
  if (value.includes("-")) {
    const [from, to] = value.split("-");
    return `${formatFieldValue(from, fieldIndex)} through ${formatFieldValue(to, fieldIndex)}`;
  }
  return formatFieldValue(value, fieldIndex);
}

function formatFieldValue(value: string, fieldIndex: number): string {
  const n = parseInt(value, 10);
  if (isNaN(n)) return value;
  if (fieldIndex === 3 && n >= 1 && n <= 12) return MONTH_NAMES[n - 1];
  if (fieldIndex === 4 && n >= 0 && n <= 6) return DOW_NAMES[n];
  if (fieldIndex === 1) {
    const period = n >= 12 ? "PM" : "AM";
    const h = n === 0 ? 12 : n > 12 ? n - 12 : n;
    return `${h}:00 ${period}`;
  }
  return value;
}

function describeSchedule(parts: string[]): string {
  if (parts.length < 5) return "Invalid expression";

  const [minute, hour, dom, month, dow] = parts;

  // Named presets
  if (
    minute === "0" &&
    hour === "0" &&
    dom === "*" &&
    month === "*" &&
    dow === "*"
  )
    return "Every day at midnight";
  if (
    minute === "0" &&
    hour === "*" &&
    dom === "*" &&
    month === "*" &&
    dow === "*"
  )
    return "Every hour";
  if (
    minute === "*" &&
    hour === "*" &&
    dom === "*" &&
    month === "*" &&
    dow === "*"
  )
    return "Every minute";
  if (
    minute === "0" &&
    hour === "9" &&
    dom === "*" &&
    month === "*" &&
    dow === "1-5"
  )
    return "Weekdays at 9:00 AM";
  if (
    minute === "0" &&
    hour === "0" &&
    dom === "1" &&
    month === "*" &&
    dow === "*"
  )
    return "First day of every month at midnight";
  if (
    minute === "0" &&
    hour === "0" &&
    dom === "*" &&
    month === "*" &&
    dow === "0"
  )
    return "Every Sunday at midnight";

  const pieces = [
    minute !== "*" ? `at minute ${describeField(minute, 0)}` : null,
    hour !== "*" ? `at ${describeField(hour, 1)}` : null,
    dom !== "*" ? `on ${describeField(dom, 2)} of the month` : null,
    month !== "*" ? `in ${describeField(month, 3)}` : null,
    dow !== "*" ? `on ${describeField(dow, 4)}` : null,
  ].filter(Boolean);

  return pieces.length === 0 ? "Every minute" : pieces.join(", ");
}

export function CronView({ input }: CronViewProps) {
  const parsed = useMemo(() => {
    const expr = input.trim();

    // Named presets
    const presets: Record<string, string> = {
      "@yearly": "0 0 1 1 *",
      "@annually": "0 0 1 1 *",
      "@monthly": "0 0 1 * *",
      "@weekly": "0 0 * * 0",
      "@daily": "0 0 * * *",
      "@midnight": "0 0 * * *",
      "@hourly": "0 * * * *",
    };

    const normalized = presets[expr.toLowerCase()] ?? expr;
    const parts = normalized.split(/\s+/);

    if (parts.length !== 5) {
      return {
        error: `Expected 5 fields (minute hour dom month dow), got ${parts.length}.`,
        parts: [],
        next: [],
        description: "",
      };
    }

    try {
      const job = new Cron(normalized, { paused: true });
      const next: Date[] = [];
      let cursor = new Date();
      for (let i = 0; i < 10; i++) {
        const n = job.nextRun(cursor);
        if (!n) break;
        next.push(n);
        cursor = new Date(n.getTime() + 1000);
      }
      job.stop();

      return {
        error: null,
        parts,
        next,
        description: describeSchedule(parts),
      };
    } catch (err) {
      return {
        error: err instanceof Error ? err.message : "Invalid cron expression",
        parts,
        next: [],
        description: "",
      };
    }
  }, [input]);

  if (parsed.error) {
    return (
      <Panel title="Cron" subtitle="Invalid expression">
        <div className="space-y-3 text-sm text-gray-300">
          <p className="rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-rose-200">
            {parsed.error}
          </p>
          <CopyButton text={input} label="Copy raw input" />
        </div>
      </Panel>
    );
  }

  const { parts, next, description } = parsed;
  const nextRun = next[0];
  const now = new Date();
  const msUntilNext = nextRun ? nextRun.getTime() - now.getTime() : null;

  function formatRelative(ms: number): string {
    const s = Math.round(ms / 1000);
    if (s < 60) return `in ${s}s`;
    const m = Math.round(s / 60);
    if (m < 60) return `in ${m}m`;
    const h = Math.round(m / 60);
    if (h < 24) return `in ${h}h`;
    const d = Math.round(h / 24);
    return `in ${d}d`;
  }

  return (
    <Panel
      title="Cron"
      subtitle={description}
      action={<CopyButton text={input} label="Copy expression" />}
    >
      <div className="space-y-4 text-sm text-gray-300">
        {/* Field breakdown */}
        <div className="grid grid-cols-5 gap-2">
          {parts.map((part, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/10 bg-black/20 px-2 py-3 text-center"
            >
              <div className="font-mono text-lg font-bold text-white">
                {part}
              </div>
              <div className="mt-1 text-xs text-gray-500">{FIELD_NAMES[i]}</div>
            </div>
          ))}
        </div>

        {/* Field descriptions */}
        <div className="divide-y divide-white/5 rounded-2xl border border-white/10 bg-black/20">
          {parts.map((part, i) => (
            <div
              key={i}
              className="flex items-center justify-between gap-4 px-4 py-2"
            >
              <span className="text-xs text-gray-500">{FIELD_NAMES[i]}</span>
              <span className="text-right text-sm text-gray-200">
                {describeField(part, i)}
              </span>
            </div>
          ))}
        </div>

        {/* Next run */}
        {nextRun && (
          <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/10 px-4 py-3">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
              Next trigger
            </div>
            <div className="mt-1 flex items-center justify-between gap-3">
              <div>
                <span className="font-mono text-sm text-white">
                  {nextRun.toISOString().replace("T", " ").slice(0, 19)} UTC
                </span>
                {msUntilNext !== null && (
                  <Badge variant="neutral" className="ml-2">
                    {formatRelative(msUntilNext)}
                  </Badge>
                )}
              </div>
              <CopyButton text={nextRun.toISOString()} label="Copy" />
            </div>
          </div>
        )}

        {/* Upcoming schedule */}
        {next.length > 1 && (
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
              Next 10 triggers (UTC)
            </div>
            <div className="divide-y divide-white/5 rounded-2xl border border-white/10 bg-black/20">
              {next.map((date, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-3 px-4 py-2"
                >
                  <span className="text-xs text-gray-500">#{i + 1}</span>
                  <span className="font-mono text-sm text-gray-200">
                    {date.toISOString().replace("T", " ").slice(0, 19)}
                  </span>
                  <CopyButton text={date.toISOString()} label="Copy" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Panel>
  );
}
