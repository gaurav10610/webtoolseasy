import { describe, expect, it } from "vitest";
import {
  formatRelativeTime,
  getRelativeColor,
  toDate,
} from "@/components/devlens/views/TimestampView";

describe("TimestampView helpers", () => {
  it("parses seconds, milliseconds, and microseconds", () => {
    const seconds = toDate("1710000000");
    const millis = toDate("1710000000000");
    const micros = toDate("1710000000000000");

    expect(seconds?.getTime()).toBe(1710000000 * 1000);
    expect(millis?.getTime()).toBe(1710000000000);
    expect(micros?.getTime()).toBe(1710000000000);
  });

  it("rejects non-numeric timestamp input", () => {
    expect(toDate("not-a-timestamp")).toBeNull();
    expect(toDate("1234abc")).toBeNull();
  });

  it("formats relative time in expected unit windows", () => {
    const now = new Date("2026-01-01T00:00:00.000Z");
    const plus2Minutes = new Date("2026-01-01T00:02:00.000Z");
    const minus2Days = new Date("2025-12-30T00:00:00.000Z");

    expect(formatRelativeTime(plus2Minutes, now)).toContain("minute");
    expect(formatRelativeTime(minus2Days, now)).toContain("day");
  });

  it("returns color classes for past, near future, and far future timestamps", () => {
    const now = new Date("2026-01-01T00:00:00.000Z");

    expect(getRelativeColor(new Date("2025-12-31T23:59:59.000Z"), now)).toBe(
      "text-gray-400",
    );
    expect(getRelativeColor(new Date("2026-01-01T00:30:00.000Z"), now)).toBe(
      "text-amber-400",
    );
    expect(getRelativeColor(new Date("2026-01-01T02:00:00.000Z"), now)).toBe(
      "text-emerald-400",
    );
  });
});
