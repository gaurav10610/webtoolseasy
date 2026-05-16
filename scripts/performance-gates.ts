import { chromium } from "@playwright/test";

type PageMetrics = {
  path: string;
  ttfbMs: number;
  lcpMs: number;
  hasWasm: boolean;
  blockingHeadScripts: string[];
};

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const TARGET_PATHS = ["/studio", "/canvas", "/tools/jwt-decoder"];

const THRESHOLDS = {
  maxLcpMs: 2500,
  maxTtfbMs: 100,
};

async function collectMetrics(path: string): Promise<PageMetrics> {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.addInitScript(() => {
    (window as any).__wteLcp = 0;
    try {
      const observer = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          (window as any).__wteLcp = entry.startTime;
        }
      });
      observer.observe({ type: "largest-contentful-paint", buffered: true });
    } catch {
      // Ignore unsupported browsers/environments.
    }
  });

  const response = await page.goto(`${BASE_URL}${path}`, {
    waitUntil: "networkidle",
  });

  if (!response || !response.ok()) {
    await browser.close();
    throw new Error(
      `Failed to load ${path}: ${response?.status() ?? "no response"}`,
    );
  }

  const measurements = await page.evaluate(() => {
    const navigation = performance.getEntriesByType("navigation")[0] as
      | PerformanceNavigationTiming
      | undefined;
    const ttfb = navigation
      ? navigation.responseStart
      : Number.POSITIVE_INFINITY;
    const lcp = (window as any).__wteLcp || 0;

    const resources = performance
      .getEntriesByType("resource")
      .map((entry) => entry.name.toLowerCase());

    const headScripts = Array.from(
      document.head.querySelectorAll("script[src]"),
    ).map((script) => {
      const htmlScript = script as HTMLScriptElement;
      return {
        src: htmlScript.src,
        async: htmlScript.async,
        defer: htmlScript.defer,
        type: htmlScript.type,
        noModule: htmlScript.noModule,
      };
    });

    return { ttfb, lcp, resources, headScripts };
  });

  await browser.close();

  const blockingHeadScripts = measurements.headScripts
    .filter(
      (script) =>
        !script.async &&
        !script.defer &&
        !script.noModule &&
        script.type !== "module" &&
        script.src.length > 0,
    )
    .map((script) => script.src);

  return {
    path,
    ttfbMs: measurements.ttfb,
    lcpMs: measurements.lcp,
    hasWasm: measurements.resources.some((name) => name.includes(".wasm")),
    blockingHeadScripts,
  };
}

async function main() {
  const results = await Promise.all(
    TARGET_PATHS.map((path) => collectMetrics(path)),
  );

  const failures: string[] = [];
  for (const result of results) {
    if (result.lcpMs > THRESHOLDS.maxLcpMs) {
      failures.push(
        `${result.path} LCP ${result.lcpMs.toFixed(1)}ms exceeds ${THRESHOLDS.maxLcpMs}ms`,
      );
    }

    if (result.ttfbMs > THRESHOLDS.maxTtfbMs) {
      failures.push(
        `${result.path} TTFB ${result.ttfbMs.toFixed(1)}ms exceeds ${THRESHOLDS.maxTtfbMs}ms`,
      );
    }

    if (result.hasWasm) {
      failures.push(`${result.path} loaded .wasm on initial page load`);
    }

    // Only enforce render-blocking script rule on tool landing pages.
    if (
      result.path.startsWith("/tools/") &&
      result.blockingHeadScripts.length > 0
    ) {
      failures.push(
        `${result.path} has render-blocking head scripts: ${result.blockingHeadScripts.join(", ")}`,
      );
    }
  }

  if (failures.length > 0) {
    console.error("Performance gates failed:");
    for (const failure of failures) {
      console.error(`- ${failure}`);
    }
    process.exit(1);
  }

  console.log("Performance gates passed");
  for (const result of results) {
    console.log(
      `${result.path} -> LCP ${result.lcpMs.toFixed(1)}ms, TTFB ${result.ttfbMs.toFixed(1)}ms, WASM ${result.hasWasm ? "yes" : "no"}`,
    );
  }
}

main().catch((error) => {
  console.error(
    "Performance gate execution failed:",
    error instanceof Error ? error.message : error,
  );
  process.exit(1);
});
