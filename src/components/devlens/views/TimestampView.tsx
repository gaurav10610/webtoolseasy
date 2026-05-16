"use client";

import { useEffect, useMemo, useState } from "react";
import { CopyButton } from "@/components/ui/CopyButton";
import { Panel } from "@/components/ui/Panel";

type TimestampViewProps = {
  input: string;
};

const TIMEZONES = [
  { name: "UTC", timeZone: "UTC" },
  { name: "US/Eastern", timeZone: "America/New_York" },
  { name: "US/Pacific", timeZone: "America/Los_Angeles" },
  { name: "Europe/London", timeZone: "Europe/London" },
  { name: "Europe/Berlin", timeZone: "Europe/Berlin" },
  { name: "Asia/Kolkata", timeZone: "Asia/Kolkata" },
  { name: "Asia/Tokyo", timeZone: "Asia/Tokyo" },
  { name: "Australia/Sydney", timeZone: "Australia/Sydney" },
] as const;

export function toDate(value: string): Date | null {
  if (!/^\d+$/.test(value)) return null;
  const numeric = Number(value);
  if (value.length === 13) return new Date(numeric);
  if (value.length === 16) return new Date(Math.floor(numeric / 1000));
  return new Date(numeric * 1000);
}

export function formatRelativeTime(date: Date, now: Date) {
  const diffSeconds = Math.round((date.getTime() - now.getTime()) / 1000);
  const absolute = Math.abs(diffSeconds);
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  if (absolute < 60) return rtf.format(diffSeconds, "second");
  if (absolute < 3600)
    return rtf.format(Math.round(diffSeconds / 60), "minute");
  if (absolute < 86400)
    return rtf.format(Math.round(diffSeconds / 3600), "hour");
  return rtf.format(Math.round(diffSeconds / 86400), "day");
}

function formatInTimeZone(date: Date, timeZone: string) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);
}

export function getRelativeColor(date: Date, now: Date): string {
  const diff = date.getTime() - now.getTime();
  if (diff < 0) return "text-gray-400";
  if (diff < 3600 * 1000) return "text-amber-400";
  return "text-emerald-400";
}

export function TimestampView({ input }: TimestampViewProps) {
  const result = useMemo(() => {
    const date = toDate(input.trim());
    if (!date || Number.isNaN(date.getTime())) {
      return { error: "Invalid Unix timestamp", date: null as Date | null };
    }

    return { error: null as string | null, date };
  }, [input]);
  const [now, setNow] = useState(() => new Date());
  const [reverseInput, setReverseInput] = useState("");

  useEffect(() => {
    const interval = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  if (result.error || !result.date) {
    return (
      <Panel title="Timestamp" subtitle="Unable to parse timestamp">
        <div className="space-y-3 text-sm text-gray-300">
          <p className="rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-rose-200">
            {result.error}
          </p>
          <CopyButton text={input} label="Copy raw input" />
        </div>
      </Panel>
    );
  }

  const iso = result.date.toISOString();
  const rfc2822 = result.date.toUTCString();
  const local = result.date.toLocaleString();
  const unixSeconds = Math.floor(result.date.getTime() / 1000);
  const unixMilliseconds = result.date.getTime();
  const parsedDate = result.date;
  const unit =
    input.trim().length === 13
      ? "milliseconds"
      : input.trim().length === 16
        ? "microseconds"
        : "seconds";
  const reverseDate = reverseInput ? new Date(reverseInput) : null;
  const reverseValid = reverseDate && !Number.isNaN(reverseDate.getTime());

  return (
    <Panel
      title="Timestamp"
      subtitle={`Unix time converted locally (${unit})`}
      action={<CopyButton text={iso} label="Copy ISO" />}
    >
      <div className="space-y-4">
        {/* Main display */}
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
            ISO 8601
          </div>
          <div className="mt-2 text-lg text-white">{iso}</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
            Local time
          </div>
          <div className="mt-2 text-lg text-white">{local}</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
            Relative time
          </div>
          <div
            className={`mt-2 text-lg font-semibold ${getRelativeColor(result.date, now)}`}
          >
            {formatRelativeTime(result.date, now)}
          </div>
        </div>

        {/* Timezone grid */}
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
            Timezones
          </div>
          <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {TIMEZONES.map((zone) => (
              <div
                key={zone.timeZone}
                className="rounded-2xl border border-white/10 bg-white/5 p-3"
              >
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                  {zone.name}
                </div>
                <div className="mt-2 text-sm leading-6 text-white">
                  {formatInTimeZone(parsedDate, zone.timeZone)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Formats grid */}
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
              RFC 2822
            </div>
            <div className="mt-2 flex items-center gap-2 break-words text-sm text-white">
              <span>{rfc2822}</span>
              <CopyButton text={rfc2822} label="Copy" />
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
              Reverse conversion
            </div>
            <div className="mt-2 space-y-3">
              <input
                type="datetime-local"
                value={reverseInput}
                onChange={(event) => setReverseInput(event.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-[#0b0b0c] px-3 py-2 text-sm text-white outline-none ring-0 placeholder:text-gray-500 focus:border-indigo-500/60"
              />
              {reverseValid ? (
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2 text-xs text-gray-400">
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                      Unix seconds: {Math.floor(reverseDate.getTime() / 1000)}
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                      Unix milliseconds: {reverseDate.getTime()}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <CopyButton
                      text={String(Math.floor(reverseDate.getTime() / 1000))}
                      label="Copy seconds"
                    />
                    <CopyButton
                      text={String(reverseDate.getTime())}
                      label="Copy ms"
                    />
                  </div>
                </div>
              ) : (
                <p className="text-xs text-gray-500">
                  Pick a date and time to convert it back to Unix time.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* All formats */}
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
              Unix seconds
            </div>
            <div className="mt-2 flex items-center gap-2 text-white">
              <span>{unixSeconds}</span>
              <CopyButton text={String(unixSeconds)} label="Copy" />
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
              Unix milliseconds
            </div>
            <div className="mt-2 flex items-center gap-2 text-white">
              <span>{unixMilliseconds}</span>
              <CopyButton text={String(unixMilliseconds)} label="Copy" />
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
              Unix microseconds
            </div>
            <div className="mt-2 flex items-center gap-2 text-white">
              <span>{unixMilliseconds * 1000}</span>
              <CopyButton text={String(unixMilliseconds * 1000)} label="Copy" />
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
              ISO 8601
            </div>
            <div className="mt-2 flex items-center gap-2 text-white">
              <span className="truncate">{iso}</span>
              <CopyButton text={iso} label="Copy" />
            </div>
          </div>
        </div>
      </div>
    </Panel>
  );
}
