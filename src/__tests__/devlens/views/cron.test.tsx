import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { CronView } from "@/components/devlens/views/CronView";

describe("CronView", () => {
  it("renders field breakdown for hourly cron", () => {
    const html = renderToStaticMarkup(<CronView input="0 * * * *" />);
    expect(html).toContain("Minute");
    expect(html).toContain("Hour");
    expect(html).toContain("Every hour");
  });

  it("renders named preset @daily", () => {
    const html = renderToStaticMarkup(<CronView input="@daily" />);
    expect(html).toContain("midnight");
  });

  it("renders next trigger time", () => {
    const html = renderToStaticMarkup(<CronView input="*/5 * * * *" />);
    expect(html).toContain("Next trigger");
  });

  it("shows error for invalid expression", () => {
    const html = renderToStaticMarkup(<CronView input="not a cron" />);
    expect(html).toContain("Invalid expression");
  });
});
