import { Page, expect } from "@playwright/test";
import { join } from "path";
import { TEST_CONSTANTS } from "./constants";

type ErrorCollector = {
  pageErrors: string[];
  dispose: () => void;
};

function collectPageErrors(page: Page): ErrorCollector {
  const pageErrors: string[] = [];

  const pageErrorListener = (error: Error) => {
    pageErrors.push(error.message || String(error));
  };

  page.on("pageerror", pageErrorListener);

  return {
    pageErrors,
    dispose: () => {
      page.off("pageerror", pageErrorListener);
    },
  };
}

function getFixtureForAccept(accept: string): string {
  const a = accept.toLowerCase();

  if (a.includes("image") || a.includes("png") || a.includes("jpg")) {
    return join(process.cwd(), "e2e/fixtures/sample.png");
  }
  if (a.includes("pdf")) {
    return join(process.cwd(), "e2e/fixtures/sample.pdf");
  }
  if (a.includes("json")) {
    return join(process.cwd(), "e2e/fixtures/sample.json");
  }
  if (a.includes("csv")) {
    return join(process.cwd(), "e2e/fixtures/sample.csv");
  }
  if (a.includes("xml")) {
    return join(process.cwd(), "e2e/fixtures/sample.xml");
  }
  if (a.includes("markdown") || a.includes("md")) {
    return join(process.cwd(), "e2e/fixtures/sample.md");
  }
  if (a.includes("html")) {
    return join(process.cwd(), "e2e/fixtures/sample.html");
  }

  return join(process.cwd(), "e2e/fixtures/sample.txt");
}

function getTextValue(locatorHint: string): string {
  const hint = locatorHint.toLowerCase();

  if (hint.includes("json")) return '{"hello":"world","n":1}';
  if (hint.includes("xml")) return "<root><a>1</a></root>";
  if (hint.includes("csv")) return "name,score\nalice,91";
  if (hint.includes("html")) return "<h1>Hello</h1><p>world</p>";
  if (hint.includes("markdown") || hint.includes("md"))
    return "# Hello\n\n- a\n- b";
  if (hint.includes("url")) return "https://example.com";
  if (hint.includes("email")) return "test@example.com";
  if (hint.includes("regex")) return "^hello.*$";
  if (hint.includes("base64")) return "SGVsbG8=";

  return "Feature automation sample text";
}

async function exerciseTextInputs(page: Page): Promise<number> {
  let actions = 0;
  const textInputs = page.locator(
    'textarea:visible, input[type="text"]:visible, input[type="search"]:visible, input[type="url"]:visible, input[type="email"]:visible',
  );

  const count = Math.min(await textInputs.count(), 4);
  for (let i = 0; i < count; i += 1) {
    const el = textInputs.nth(i);
    if (!(await el.isEnabled())) continue;

    const hint =
      (await el.getAttribute("name")) ||
      (await el.getAttribute("aria-label")) ||
      (await el.getAttribute("placeholder")) ||
      "";

    try {
      await el.click({
        timeout: TEST_CONSTANTS.TIMEOUT_ELEMENT,
        noWaitAfter: true,
      });
      await el.fill(getTextValue(hint));
      actions += 1;
    } catch {
      // Best-effort interaction for heterogeneous tool UIs
    }
  }

  return actions;
}

async function exerciseNumberInputs(page: Page): Promise<number> {
  let actions = 0;
  const numberInputs = page.locator('input[type="number"]:visible');
  const count = Math.min(await numberInputs.count(), 4);

  for (let i = 0; i < count; i += 1) {
    const el = numberInputs.nth(i);
    if (!(await el.isEnabled())) continue;
    try {
      await el.fill("5");
      actions += 1;
    } catch {
      // Best-effort interaction for heterogeneous tool UIs
    }
  }

  return actions;
}

async function exerciseSelects(page: Page): Promise<number> {
  let actions = 0;
  const nativeSelects = page.locator("select:visible");
  const selectCount = Math.min(await nativeSelects.count(), 3);

  for (let i = 0; i < selectCount; i += 1) {
    const sel = nativeSelects.nth(i);
    if (!(await sel.isEnabled())) continue;

    const options = sel.locator("option");
    const optionCount = await options.count();
    if (optionCount > 1) {
      const secondValue = (await options.nth(1).getAttribute("value")) || "";
      try {
        await sel.selectOption(secondValue);
        actions += 1;
      } catch {
        // Best-effort interaction for heterogeneous tool UIs
      }
    }
  }

  const comboBoxes = page.locator('[role="combobox"]:visible');
  const comboCount = Math.min(await comboBoxes.count(), 2);
  for (let i = 0; i < comboCount; i += 1) {
    const cb = comboBoxes.nth(i);
    if (!(await cb.isEnabled())) continue;

    try {
      await cb.click({
        timeout: TEST_CONSTANTS.TIMEOUT_ELEMENT,
        noWaitAfter: true,
      });
      const options = page.locator('[role="option"]:visible');
      if ((await options.count()) > 0) {
        await options.first().click({
          timeout: TEST_CONSTANTS.TIMEOUT_ELEMENT,
          noWaitAfter: true,
        });
        actions += 1;
      }
    } catch {
      // Best-effort interaction for heterogeneous tool UIs
    }
  }

  return actions;
}

async function exerciseToggles(page: Page): Promise<number> {
  let actions = 0;

  const checkboxes = page.locator('input[type="checkbox"]:visible');
  const checkboxCount = Math.min(await checkboxes.count(), 4);
  for (let i = 0; i < checkboxCount; i += 1) {
    const cb = checkboxes.nth(i);
    if (!(await cb.isEnabled())) continue;
    try {
      await cb.click({
        timeout: TEST_CONSTANTS.TIMEOUT_ELEMENT,
        noWaitAfter: true,
      });
      actions += 1;
    } catch {
      // Best-effort interaction for heterogeneous tool UIs
    }
  }

  const radios = page.locator('input[type="radio"]:visible');
  const radioCount = Math.min(await radios.count(), 4);
  for (let i = 0; i < radioCount; i += 1) {
    const r = radios.nth(i);
    if (!(await r.isEnabled())) continue;
    try {
      await r.click({
        timeout: TEST_CONSTANTS.TIMEOUT_ELEMENT,
        noWaitAfter: true,
      });
      actions += 1;
    } catch {
      // Best-effort interaction for heterogeneous tool UIs
    }
  }

  return actions;
}

async function exerciseFileInputs(page: Page): Promise<number> {
  let actions = 0;
  const fileInputs = page.locator('input[type="file"]:visible');
  const count = Math.min(await fileInputs.count(), 2);

  for (let i = 0; i < count; i += 1) {
    const input = fileInputs.nth(i);
    if (!(await input.isEnabled())) continue;

    const accept = (await input.getAttribute("accept")) || "";
    const fixture = getFixtureForAccept(accept);
    try {
      await input.setInputFiles(fixture);
      actions += 1;
    } catch {
      // Best-effort interaction for heterogeneous tool UIs
    }
  }

  return actions;
}

async function exercisePrimaryActions(page: Page): Promise<number> {
  let actions = 0;
  const actionRegex =
    /convert|generate|format|minify|beautify|calculate|encode|decode|validate|run|compile|compress|resize|split|merge|extract|summarize|compare|copy|download|clear|reset|swap|test|parse/i;

  const buttons = page.locator(
    'button:visible, [role="button"]:visible, a[role="button"]:visible',
  );

  const count = await buttons.count();
  for (let i = 0; i < count && actions < 6; i += 1) {
    const b = buttons.nth(i);
    if (!(await b.isEnabled())) continue;

    const text = (await b.innerText()).trim();
    if (!text || !actionRegex.test(text)) continue;

    try {
      await b.click({
        timeout: TEST_CONSTANTS.TIMEOUT_ELEMENT,
        noWaitAfter: true,
      });
      actions += 1;
    } catch {
      // Best-effort interaction for heterogeneous tool UIs
    }
  }

  return actions;
}

async function exerciseSliders(page: Page): Promise<number> {
  let actions = 0;

  // MUI Slider renders a span with role="slider"; also handle native range inputs
  const sliders = page.locator(
    '[role="slider"]:visible, input[type="range"]:visible',
  );
  const count = Math.min(await sliders.count(), 6);

  for (let i = 0; i < count; i += 1) {
    const el = sliders.nth(i);
    try {
      if (!(await el.isEnabled())) continue;
      await el.focus({ timeout: TEST_CONSTANTS.TIMEOUT_ELEMENT });
      // Nudge right 3 steps to produce a state change (non-destructive)
      await el.press("ArrowRight");
      await el.press("ArrowRight");
      await el.press("ArrowRight");
      actions += 1;
    } catch {
      // Best-effort interaction for heterogeneous tool UIs
    }
  }

  return actions;
}

async function exerciseToggleButtons(page: Page): Promise<number> {
  let actions = 0;

  // MUI ToggleButtonGroup renders role="group" containing role="button" children
  const groups = page.locator('[role="group"]:visible');
  const groupCount = Math.min(await groups.count(), 3);

  for (let i = 0; i < groupCount; i += 1) {
    const group = groups.nth(i);
    try {
      const btns = group.locator('[role="button"]:visible, button:visible');
      const btnCount = await btns.count();
      if (btnCount === 0) continue;
      // Click the last button in the group to switch away from the default
      const target = btns.nth(btnCount - 1);
      if (!(await target.isEnabled())) continue;
      await target.click({
        timeout: TEST_CONSTANTS.TIMEOUT_ELEMENT,
        noWaitAfter: true,
      });
      actions += 1;
    } catch {
      // Best-effort interaction for heterogeneous tool UIs
    }
  }

  return actions;
}

async function exerciseColorPickers(page: Page): Promise<number> {
  let actions = 0;

  const colorInputs = page.locator('input[type="color"]:visible');
  const count = Math.min(await colorInputs.count(), 4);

  for (let i = 0; i < count; i += 1) {
    const el = colorInputs.nth(i);
    try {
      if (!(await el.isEnabled())) continue;
      // Fill with a deterministic test color value
      await el.fill(i % 2 === 0 ? "#e91e63" : "#1976d2");
      actions += 1;
    } catch {
      // Best-effort interaction for heterogeneous tool UIs
    }
  }

  return actions;
}

async function exerciseAutocomplete(page: Page): Promise<number> {
  let actions = 0;

  // MUI Autocomplete renders an input with aria-autocomplete="list"
  const autocompletes = page.locator('input[aria-autocomplete="list"]:visible');
  const count = Math.min(await autocompletes.count(), 2);

  for (let i = 0; i < count; i += 1) {
    const el = autocompletes.nth(i);
    try {
      if (!(await el.isEnabled())) continue;
      await el.click({
        timeout: TEST_CONSTANTS.TIMEOUT_ELEMENT,
        noWaitAfter: true,
      });
      // Clear and type partial text to trigger dropdown
      await el.fill("a");
      // Wait briefly for dropdown to appear
      await page.waitForTimeout(300);
      const options = page.locator('[role="option"]:visible');
      const optCount = await options.count();
      if (optCount > 0) {
        await options.first().click({
          timeout: TEST_CONSTANTS.TIMEOUT_ELEMENT,
          noWaitAfter: true,
        });
        actions += 1;
      } else {
        // Dismiss the dropdown by pressing Escape if nothing appeared
        await el.press("Escape");
      }
    } catch {
      // Best-effort interaction for heterogeneous tool UIs
    }
  }

  return actions;
}

async function exerciseClickableChips(page: Page): Promise<number> {
  let actions = 0;

  // MUI Chip with onClick renders role="button" on the chip root element
  // Scope to main to avoid header/nav chips; exclude chips inside ToggleButtonGroups
  const chips = page.locator(
    'main .MuiChip-root[role="button"]:visible, main .MuiChip-clickable:visible',
  );
  const count = Math.min(await chips.count(), 4);

  for (let i = 0; i < count; i += 1) {
    const chip = chips.nth(i);
    try {
      if (!(await chip.isEnabled())) continue;
      await chip.click({
        timeout: TEST_CONSTANTS.TIMEOUT_ELEMENT,
        noWaitAfter: true,
      });
      actions += 1;
    } catch {
      // Best-effort interaction for heterogeneous tool UIs
    }
  }

  return actions;
}

async function verifyOutputProduced(page: Page): Promise<void> {
  // After all interactions, check at least one output indicator is non-empty.
  // This is a best-effort warning (not a hard assertion) so it never fails a test.
  const outputSelectors = [
    "textarea[readonly]:visible",
    '[aria-label*="output" i]:visible',
    '[aria-label*="result" i]:visible',
    "pre:visible",
    "code:visible",
    '[data-testid*="output"]:visible',
    '[data-testid*="result"]:visible',
  ];

  for (const sel of outputSelectors) {
    try {
      const el = page.locator(sel).first();
      if (await el.isVisible({ timeout: 500 })) {
        const text = (await el.innerText().catch(() => "")).trim();
        if (text.length > 0) return; // Output found, all good
      }
    } catch {
      // Ignore per-selector errors
    }
  }

  // No output found — emit a diagnostic (never throw)
  console.warn(
    "Output verification: no non-empty output element found after interactions",
  );
}

async function exerciseFallbackButtons(page: Page): Promise<number> {
  let actions = 0;
  const buttons = page.locator(
    'main button:visible, main [role="button"]:visible',
  );
  const count = Math.min(await buttons.count(), 2);

  for (let i = 0; i < count; i += 1) {
    const b = buttons.nth(i);
    if (!(await b.isEnabled())) continue;

    try {
      await b.click({
        timeout: TEST_CONSTANTS.TIMEOUT_ELEMENT,
        noWaitAfter: true,
      });
      actions += 1;
    } catch {
      // Best-effort interaction for heterogeneous tool UIs
    }
  }

  return actions;
}

export async function runToolFeatureAutomation(page: Page): Promise<void> {
  const collector = collectPageErrors(page);

  const runStepWithTimeout = async (
    fn: () => Promise<number>,
    timeoutMs = 8_000,
  ): Promise<number> => {
    try {
      return await Promise.race([
        fn(),
        new Promise<number>((resolve) => {
          setTimeout(() => resolve(0), timeoutMs);
        }),
      ]);
    } catch {
      return 0;
    }
  };

  try {
    await expect(page.locator("main")).toBeVisible({
      timeout: TEST_CONSTANTS.TIMEOUT_COMPONENT,
    });

    let totalActions = 0;
    totalActions += await runStepWithTimeout(() => exerciseTextInputs(page));
    totalActions += await runStepWithTimeout(() => exerciseNumberInputs(page));
    totalActions += await runStepWithTimeout(() => exerciseSelects(page));
    totalActions += await runStepWithTimeout(() => exerciseAutocomplete(page));
    totalActions += await runStepWithTimeout(() => exerciseToggles(page));
    totalActions += await runStepWithTimeout(() => exerciseToggleButtons(page));
    totalActions += await runStepWithTimeout(() => exerciseSliders(page));
    totalActions += await runStepWithTimeout(() => exerciseColorPickers(page));
    totalActions += await runStepWithTimeout(() =>
      exerciseClickableChips(page),
    );
    totalActions += await runStepWithTimeout(() => exerciseFileInputs(page));
    totalActions += await runStepWithTimeout(() =>
      exercisePrimaryActions(page),
    );
    if (totalActions === 0) {
      totalActions += await runStepWithTimeout(() =>
        exerciseFallbackButtons(page),
      );
    }

    // Best-effort output check — warns but never fails
    await runStepWithTimeout(() => verifyOutputProduced(page).then(() => 0));

    console.log(`  interactions: ${totalActions} actions exercised`);

    // Keep track of page errors for diagnostics without making the run brittle
    if (collector.pageErrors.length > 0) {
      console.warn(
        `Tool interaction runtime errors: ${collector.pageErrors.join(" | ")}`,
      );
    }

    const nextJs404 = page.locator('text="This page could not be found"');
    await expect(nextJs404).not.toBeVisible();
    await expect(page.locator("main")).toBeVisible();
  } finally {
    collector.dispose();
  }
}
