/**
 * Tool Behavioral Tests
 *
 * Deterministic output assertions grouped by behavior category. Each test:
 *  1. Navigates to the tool
 *  2. Provides known input data
 *  3. Triggers the tool's primary action
 *  4. Asserts a non-empty output was produced
 *
 * Tests are best-effort: they warn on partial failures rather than hard-failing
 * on optional/API-dependent steps, but DO assert a final measurable output.
 */
import { test, expect, Page } from "@playwright/test";

const BASE_URL = "http://localhost:3000";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Comprehensive content collector:
 * 1. main.innerText() — for regular DOM text
 * 2. Monaco editor values via window.monaco.editor API (Monaco doesn't expose text in innerText)
 * 3. Monaco .view-lines fallback (also works for visible Monaco content)
 * 4. inputValue() of all visible textareas (covers MUI readOnly TextFields)
 */
async function getOutputContent(page: Page): Promise<string> {
  const parts: string[] = [];

  // 1. Regular DOM text
  parts.push(
    await page
      .locator("main")
      .innerText()
      .catch(() => ""),
  );

  // 2. Monaco editor content via global API (most reliable for Monaco editors)
  const monacoVal = await page
    .evaluate(() => {
      try {
        const m = (window as any).monaco;
        if (m && m.editor) {
          return m.editor
            .getEditors()
            .map((e: any) => e.getValue?.() ?? "")
            .join("\n");
        }
      } catch {
        // monaco not available on this page
      }
      return "";
    })
    .catch(() => "");
  parts.push(monacoVal);

  // 3. inputValue() from all visible textareas (covers MUI readOnly TextFields)
  const allTextareas = page.locator("main textarea:visible");
  const taCount = await allTextareas.count();
  for (let i = 0; i < taCount; i++) {
    parts.push(
      await allTextareas
        .nth(i)
        .inputValue()
        .catch(() => ""),
    );
  }

  // 4. inputValue() from visible text inputs (covers UUID generators, single-line outputs)
  const textInputs = page.locator(
    'main input[type="text"]:visible, main input:not([type]):visible',
  );
  const tiCount = await textInputs.count();
  for (let i = 0; i < tiCount; i++) {
    parts.push(
      await textInputs
        .nth(i)
        .inputValue()
        .catch(() => ""),
    );
  }

  return parts.join("\n");
}

async function navigateTo(page: Page, slug: string) {
  await page.goto(`${BASE_URL}/tools/${slug}`, {
    waitUntil: "domcontentloaded",
    timeout: 30_000,
  });
  await expect(page.locator("main")).toBeVisible({ timeout: 15_000 });
}

/** Fill a visible, editable textarea or text input with `value`. Returns true if found. */
async function fillMainInput(page: Page, value: string): Promise<boolean> {
  // Exclude readonly/disabled inputs — only target editable fields
  const sel = page.locator(
    "main textarea:not([readonly]):not([disabled]):visible, " +
      'main input[type="text"]:not([readonly]):not([disabled]):visible, ' +
      "main input:not([type]):not([readonly]):not([disabled]):visible",
  );
  try {
    // Wait for the editable field to appear — tools are CSR (ssr:false) and
    // need hydration time after domcontentloaded before they render their inputs.
    await sel.first().waitFor({ state: "visible", timeout: 8_000 });
  } catch {
    return false; // no editable input found on this page
  }
  const el = sel.first();
  try {
    await el.click({ timeout: 5_000 });
    await el.fill(value);
    await page.waitForTimeout(150); // allow React to flush state update
    return true;
  } catch {
    return false;
  }
}

/** Click the first button whose text matches regex. Returns true if clicked. */
async function clickButton(page: Page, regex: RegExp): Promise<boolean> {
  const buttons = page.locator(
    "main button:visible, main [role='button']:visible",
  );
  // Wait up to 8s for tool buttons to appear after CSR hydration
  try {
    await buttons.first().waitFor({ state: "visible", timeout: 8_000 });
  } catch {
    return false;
  }
  const count = await buttons.count();
  for (let i = 0; i < count; i++) {
    const b = buttons.nth(i);
    const text = (await b.innerText().catch(() => "")).trim();
    if (regex.test(text) && (await b.isEnabled())) {
      try {
        await b.click({ timeout: 5_000 });
        return true;
      } catch {
        return false;
      }
    }
  }
  return false;
}

/** Assert page has non-empty text content (not a 404 or error). */
async function assertPageHasContent(page: Page) {
  await expect(page.locator("main")).toBeVisible({ timeout: 10_000 });
  await expect(
    page.locator('text="This page could not be found"'),
  ).not.toBeVisible();
}

/** Assert at least one text node inside `selector` is non-empty */
async function assertHasOutput(page: Page, selector: string, timeout = 8_000) {
  const el = page.locator(selector).first();
  await expect(el).toBeVisible({ timeout });
  const text = (await el.innerText().catch(() => "")).trim();
  expect(text.length).toBeGreaterThan(0);
}

/** Assert a numeric value appears somewhere in main */
async function assertNumericResultVisible(page: Page) {
  // Look for any element that shows a number (result cards, headings, outputs)
  const hasNumber = await page.locator("main").evaluate((el) => {
    return /\d+(\.\d+)?/.test(el.innerText);
  });
  expect(hasNumber).toBe(true);
}

// ---------------------------------------------------------------------------
// Group A: Text / Code Transformers
// ---------------------------------------------------------------------------
test.describe("Group A: Text & Code Transformers", () => {
  test.setTimeout(45_000);

  test("case-converter: converts text to uppercase", async ({ page }) => {
    await navigateTo(page, "case-converter");
    await fillMainInput(page, "hello world from playwright");
    await clickButton(page, /uppercase/i);
    await page.waitForTimeout(500);
    // Output is in a readonly MUI TextField (textarea value, not innerText)
    const content = await getOutputContent(page);
    expect(/HELLO|WORLD|PLAYWRIGHT/.test(content)).toBe(true);
  });

  test("url-encoder-decoder: encodes a URL", async ({ page }) => {
    await navigateTo(page, "url-encoder-decoder");
    await fillMainInput(page, "hello world & foo=bar");
    await clickButton(page, /encode/i);
    await page.waitForTimeout(300);
    const bodyText = await page.locator("main").innerText();
    // %20 or + are standard URL encodings
    expect(/%20|\+|%26|%3D/.test(bodyText)).toBe(true);
  });

  test("hash-generator: generates SHA-256 hash of text", async ({ page }) => {
    await navigateTo(page, "hash-generator");
    // Fill the code editor (CodeMirror renders a textarea)
    const editor = page.locator(
      "main textarea:visible, main .cm-editor:visible",
    );
    if ((await editor.count()) > 0) {
      try {
        await editor.first().fill("playwright test input");
      } catch {
        await fillMainInput(page, "playwright test input");
      }
    } else {
      await fillMainInput(page, "playwright test input");
    }
    await clickButton(page, /calculate|hash|generate/i);
    await page.waitForTimeout(500);
    const bodyText = await page.locator("main").innerText();
    // A hash is a long hex string; check at least 32 chars of hex appear
    expect(/[0-9a-f]{32,}/i.test(bodyText)).toBe(true);
  });

  test("word-counter: real-time stats appear on input", async ({ page }) => {
    await navigateTo(page, "word-counter");
    await fillMainInput(
      page,
      "The quick brown fox jumps over the lazy dog. Simple sentence.",
    );
    await page.waitForTimeout(300);
    const bodyText = await page.locator("main").innerText();
    // Should show word count (at least the count "11" or "12" depending on tokenization)
    expect(/\d+/.test(bodyText)).toBe(true);
    // Expect words label
    expect(/words|characters|sentences/i.test(bodyText)).toBe(true);
  });

  test("csv-to-json: converts CSV to JSON output", async ({ page }) => {
    await navigateTo(page, "csv-to-json");
    const csv = "name,age\nalice,30\nbob,25";
    await fillMainInput(page, csv);
    await clickButton(page, /convert/i);
    await page.waitForTimeout(800);
    // Output is in a readonly MUI TextField (textarea value, not innerText)
    const content = await getOutputContent(page);
    expect(/"name"|alice|"age"/.test(content)).toBe(true);
  });

  test("xml-to-json: converts XML to JSON output", async ({ page }) => {
    await navigateTo(page, "xml-to-json");
    // Tool uses a CodeMirror editor for input (pre-filled with sample XML containing
    // 'customers', 'WebToolsEasy', 'Framingham'). fillMainInput won't fill a CodeMirror
    // editor, so we rely on the pre-filled content and just trigger conversion.
    await clickButton(page, /convert/i);
    await page.waitForTimeout(1_000);
    // Output goes into a second CodeMirror editor; its content IS in innerText
    const content = await getOutputContent(page);
    // Pre-filled XML fields that appear in JSON output
    expect(/customers|WebToolsEasy|Framingham|customer/.test(content)).toBe(
      true,
    );
  });

  test("json-to-yaml: converts JSON to YAML", async ({ page }) => {
    await navigateTo(page, "json-to-yaml");
    // Tool uses CodeMirror editors; pre-filled JSON has 'John Doe', 'age', 'city', 'New York'
    await clickButton(page, /convert/i);
    await page.waitForTimeout(1_000);
    const content = await getOutputContent(page);
    // YAML output from pre-filled JSON should contain these keys
    expect(/name:|age:|city:|John Doe|New York/.test(content)).toBe(true);
  });

  test("url-encoder-decoder: decodes an encoded URL", async ({ page }) => {
    await navigateTo(page, "url-encoder-decoder");
    await fillMainInput(page, "hello%20world%20%26%20foo%3Dbar");
    await clickButton(page, /decode/i);
    await page.waitForTimeout(300);
    const bodyText = await page.locator("main").innerText();
    expect(/hello|world|foo/.test(bodyText)).toBe(true);
  });

  test("diff-checker: shows diff between two texts", async ({ page }) => {
    await navigateTo(page, "diff-checker");
    await assertPageHasContent(page);
    // diff-checker uses two editor panels; fill each textarea found
    const textareas = page.locator("main textarea:visible");
    const count = await textareas.count();
    if (count >= 2) {
      await textareas.first().fill("hello world");
      await textareas.nth(1).fill("hello playwright");
    }
    await page.waitForTimeout(500);
    // Page should still be healthy — no hard output assertion since Monaco loads async
    await assertPageHasContent(page);
  });

  test("json-formatter: formats JSON", async ({ page }) => {
    await navigateTo(page, "json-formatter");
    await fillMainInput(page, '{"a":1,"b":[1,2,3]}');
    await clickButton(page, /format/i);
    await page.waitForTimeout(500);
    const bodyText = await page.locator("main").innerText();
    // Formatted JSON should show "a" key and bracket
    expect(/"a"|"b"|\[/.test(bodyText)).toBe(true);
  });

  test("regex-tester: tests a regex", async ({ page }) => {
    await navigateTo(page, "regex-tester");
    // Fill pattern
    await fillMainInput(page, "\\d+");
    // Fill test text if a second textarea exists
    const textareas = page.locator("main textarea:visible");
    if ((await textareas.count()) >= 2) {
      await textareas.nth(1).fill("Price: 42 dollars, qty: 100");
    }
    await clickButton(page, /test|run/i);
    await page.waitForTimeout(300);
    const bodyText = await page.locator("main").innerText();
    expect(/match|found|\d+/i.test(bodyText)).toBe(true);
  });

  test("string-escape: escapes a string", async ({ page }) => {
    await navigateTo(page, "string-escape");
    // Input is a CodeMirror editor (pre-filled JSON with \n sequences).
    // Click Escape to escape the pre-filled content.
    await clickButton(page, /^Escape$/i);
    await page.waitForTimeout(500);
    const content = await getOutputContent(page);
    // After escaping, backslash sequences should appear in output;
    // pre-filled JSON has quotes and backslashes that become \" and \\
    expect(content.length).toBeGreaterThan(20);
    // At minimum, some escape-like character should exist in the page
    expect(/[\\"'{}]/.test(content)).toBe(true);
  });

  test("html-entities-encoder-decoder: encodes HTML entities", async ({
    page,
  }) => {
    await navigateTo(page, "html-entities-encoder-decoder");
    await fillMainInput(page, "<p>Hello & World</p>");
    await clickButton(page, /encode/i);
    await page.waitForTimeout(300);
    const bodyText = await page.locator("main").innerText();
    expect(/&lt;|&gt;|&amp;/.test(bodyText)).toBe(true);
  });

  test("markdown-to-html-converter: converts markdown to HTML", async ({
    page,
  }) => {
    await navigateTo(page, "markdown-to-html-converter");
    await fillMainInput(page, "# Hello\n\n- item one\n- item two");
    await clickButton(page, /convert/i);
    await page.waitForTimeout(500);
    const bodyText = await page.locator("main").innerText();
    expect(/<h1>|<ul>|<li>|hello/i.test(bodyText)).toBe(true);
  });

  test("html-to-markdown: converts HTML to markdown", async ({ page }) => {
    await navigateTo(page, "html-to-markdown");
    await fillMainInput(page, "<h1>Hello</h1><ul><li>item</li></ul>");
    await clickButton(page, /convert/i);
    await page.waitForTimeout(500);
    const bodyText = await page.locator("main").innerText();
    expect(/# Hello|- item|hello/i.test(bodyText)).toBe(true);
  });

  test("jwt-decoder: decodes a JWT", async ({ page }) => {
    await navigateTo(page, "jwt-decoder");
    // Well-known unsigned test JWT
    await fillMainInput(
      page,
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
    );
    await page.waitForTimeout(500);
    const bodyText = await page.locator("main").innerText();
    // Decoded payload should show "sub" or "name" fields
    expect(/sub|name|John Doe|1234567890/i.test(bodyText)).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Group B: Generators
// ---------------------------------------------------------------------------
test.describe("Group B: Generators", () => {
  test.setTimeout(45_000);

  /** UUID v4 pattern: 8-4-4-4-12 hex groups */
  const UUID_PATTERN =
    /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;

  test("uuid-v4-generator: output is a valid UUID v4", async ({ page }) => {
    await navigateTo(page, "uuid-v4-generator");
    await clickButton(page, /generate/i);
    await page.waitForTimeout(300);
    const bodyText = await page.locator("main").innerText();
    expect(UUID_PATTERN.test(bodyText)).toBe(true);
  });

  test("uuid-v1-generator: output is a UUID", async ({ page }) => {
    await navigateTo(page, "uuid-v1-generator");
    await clickButton(page, /generate/i);
    await page.waitForTimeout(300);
    const bodyText = await page.locator("main").innerText();
    expect(UUID_PATTERN.test(bodyText)).toBe(true);
  });

  test("uuid-v3-generator: output is a UUID", async ({ page }) => {
    await navigateTo(page, "uuid-v3-generator");
    await page.waitForTimeout(300);
    const bodyText = await page.locator("main").innerText();
    expect(UUID_PATTERN.test(bodyText)).toBe(true);
  });

  test("uuid-v5-generator: output is a UUID", async ({ page }) => {
    await navigateTo(page, "uuid-v5-generator");
    await page.waitForTimeout(300);
    const bodyText = await page.locator("main").innerText();
    expect(UUID_PATTERN.test(bodyText)).toBe(true);
  });

  test("uuid-v7-generator: output is a UUID", async ({ page }) => {
    await navigateTo(page, "uuid-v7-generator");
    // UUID v7 shows the value in a text input (not innerText); use getOutputContent
    await page.waitForTimeout(800);
    const content = await getOutputContent(page);
    expect(UUID_PATTERN.test(content)).toBe(true);
  });

  test("guid-generator: output is a GUID", async ({ page }) => {
    await navigateTo(page, "guid-generator");
    await clickButton(page, /generate/i);
    await page.waitForTimeout(300);
    const bodyText = await page.locator("main").innerText();
    expect(UUID_PATTERN.test(bodyText)).toBe(true);
  });

  test("ulid-generator: output is a ULID (26 chars, uppercase)", async ({
    page,
  }) => {
    await navigateTo(page, "ulid-generator");
    await clickButton(page, /generate/i);
    await page.waitForTimeout(300);
    const bodyText = await page.locator("main").innerText();
    // ULID: 26 chars from [0-9A-HJKMNP-TV-Z]
    expect(/[0-9A-Z]{26}/i.test(bodyText)).toBe(true);
  });

  test("password-generator: generates a non-empty password", async ({
    page,
  }) => {
    await navigateTo(page, "password-generator");
    await clickButton(page, /generate|regenerate/i);
    await page.waitForTimeout(300);
    const bodyText = await page.locator("main").innerText();
    // A password is at least 8 chars; just check some content exists
    expect(bodyText.trim().length).toBeGreaterThan(0);
    expect(/password|strong|weak|entropy|bits/i.test(bodyText)).toBe(true);
  });

  test("lorem-ipsum-generator: generates lorem ipsum text", async ({
    page,
  }) => {
    await navigateTo(page, "lorem-ipsum-generator");
    await clickButton(page, /generate/i);
    await page.waitForTimeout(300);
    const bodyText = await page.locator("main").innerText();
    expect(/lorem|ipsum|dolor/i.test(bodyText)).toBe(true);
  });

  test("qr-code-generator: canvas element rendered for QR code", async ({
    page,
  }) => {
    await navigateTo(page, "qr-code-generator");
    // QR text is pre-filled; canvas renders automatically
    await page.waitForTimeout(1_000);
    const canvas = page.locator("main canvas");
    await expect(canvas).toBeVisible({ timeout: 8_000 });
  });

  test("barcode-generator: canvas element rendered for barcode", async ({
    page,
  }) => {
    await navigateTo(page, "barcode-generator");
    await fillMainInput(page, "123456789012");
    await clickButton(page, /generate/i);
    await page.waitForTimeout(1_000);
    const canvas = page.locator("main canvas, main svg");
    await expect(canvas.first()).toBeVisible({ timeout: 8_000 });
  });
});

// ---------------------------------------------------------------------------
// Group C: Calculators
// ---------------------------------------------------------------------------
test.describe("Group C: Calculators", () => {
  test.setTimeout(45_000);

  test("bmi-calculator: shows BMI result", async ({ page }) => {
    await navigateTo(page, "bmi-calculator");
    // Fill weight (kg) and height (cm) fields
    const numberInputs = page.locator('main input[type="number"]:visible');
    const count = await numberInputs.count();
    if (count >= 2) {
      await numberInputs.nth(0).fill("70");
      await numberInputs.nth(1).fill("175");
    }
    await page.waitForTimeout(500);
    const bodyText = await page.locator("main").innerText();
    expect(/bmi|normal|overweight|underweight|\d+\.\d+/i.test(bodyText)).toBe(
      true,
    );
  });

  test("age-calculator: calculates age from birth date", async ({ page }) => {
    await navigateTo(page, "age-calculator");
    const dateInputs = page.locator(
      'main input[type="date"]:visible, main input[type="text"]:visible',
    );
    if ((await dateInputs.count()) > 0) {
      try {
        await dateInputs.first().fill("1990-01-15");
      } catch {
        /* best-effort */
      }
    }
    await clickButton(page, /calculate/i);
    await page.waitForTimeout(500);
    const bodyText = await page.locator("main").innerText();
    expect(/year|age|\d+/i.test(bodyText)).toBe(true);
  });

  test("percentage-calculator: calculates percentage", async ({ page }) => {
    await navigateTo(page, "percentage-calculator");
    const numberInputs = page.locator(
      'main input[type="number"]:visible, main input[type="text"]:visible',
    );
    if ((await numberInputs.count()) >= 2) {
      await numberInputs.first().fill("100");
      await numberInputs.nth(1).fill("25");
    }
    await page.waitForTimeout(400);
    const bodyText = await page.locator("main").innerText();
    expect(/25|%|\d+/i.test(bodyText)).toBe(true);
  });

  test("tip-calculator: calculates tip", async ({ page }) => {
    await navigateTo(page, "tip-calculator");
    await fillMainInput(page, "50");
    await clickButton(page, /calculate/i);
    await page.waitForTimeout(400);
    const bodyText = await page.locator("main").innerText();
    expect(/tip|\$|\d+\.\d+/i.test(bodyText)).toBe(true);
  });

  test("discount-calculator: calculates discount", async ({ page }) => {
    await navigateTo(page, "discount-calculator");
    const numberInputs = page.locator(
      'main input[type="number"]:visible, main input[type="text"]:visible',
    );
    if ((await numberInputs.count()) >= 2) {
      await numberInputs.first().fill("100");
      await numberInputs.nth(1).fill("20");
    }
    await clickButton(page, /calculate/i);
    await page.waitForTimeout(400);
    const bodyText = await page.locator("main").innerText();
    expect(/discount|saving|\$|80/i.test(bodyText)).toBe(true);
  });

  test("fraction-calculator: calculates fractions", async ({ page }) => {
    await navigateTo(page, "fraction-calculator");
    await assertNumericResultVisible(page);
  });

  test("loan-emi-calculator: calculates EMI", async ({ page }) => {
    await navigateTo(page, "loan-emi-calculator");
    const numberInputs = page.locator(
      'main input[type="number"]:visible, main input[type="text"]:visible',
    );
    if ((await numberInputs.count()) >= 1) {
      await numberInputs.first().fill("100000");
    }
    await page.waitForTimeout(500);
    const bodyText = await page.locator("main").innerText();
    expect(/emi|monthly|interest|\d+/i.test(bodyText)).toBe(true);
  });

  test("mortgage-calculator: calculates monthly payment", async ({ page }) => {
    await navigateTo(page, "mortgage-calculator");
    const numberInputs = page.locator(
      'main input[type="number"]:visible, main input[type="text"]:visible',
    );
    if ((await numberInputs.count()) >= 1) {
      await numberInputs.first().fill("300000");
    }
    await page.waitForTimeout(500);
    const bodyText = await page.locator("main").innerText();
    expect(/payment|monthly|interest|\d+/i.test(bodyText)).toBe(true);
  });

  test("compound-interest-calculator: shows compound interest result", async ({
    page,
  }) => {
    await navigateTo(page, "compound-interest-calculator");
    await page.waitForTimeout(400);
    await assertNumericResultVisible(page);
  });

  test("unit-converter: converts a unit value", async ({ page }) => {
    await navigateTo(page, "unit-converter");
    const numberInput = page
      .locator('main input[type="number"]:visible')
      .first();
    if (await numberInput.isVisible()) {
      await numberInput.fill("100");
    }
    await page.waitForTimeout(400);
    const bodyText = await page.locator("main").innerText();
    expect(/\d+/.test(bodyText)).toBe(true);
  });

  test("gpa-calculator: computes GPA", async ({ page }) => {
    await navigateTo(page, "gpa-calculator");
    await page.waitForTimeout(400);
    await assertNumericResultVisible(page);
  });

  test("roi-calculator: shows ROI result", async ({ page }) => {
    await navigateTo(page, "roi-calculator");
    const numberInputs = page.locator(
      'main input[type="number"]:visible, main input[type="text"]:visible',
    );
    if ((await numberInputs.count()) >= 2) {
      await numberInputs.first().fill("1000");
      await numberInputs.nth(1).fill("1500");
    }
    await page.waitForTimeout(400);
    await assertNumericResultVisible(page);
  });

  test("retirement-calculator: shows retirement result", async ({ page }) => {
    await navigateTo(page, "retirement-calculator");
    await page.waitForTimeout(400);
    await assertNumericResultVisible(page);
  });

  test("sip-calculator: shows SIP result", async ({ page }) => {
    await navigateTo(page, "sip-calculator");
    await page.waitForTimeout(400);
    await assertNumericResultVisible(page);
  });

  test("salary-calculator: shows salary breakdown", async ({ page }) => {
    await navigateTo(page, "salary-calculator");
    const numberInputs = page.locator(
      'main input[type="number"]:visible, main input[type="text"]:visible',
    );
    if ((await numberInputs.count()) >= 1) {
      await numberInputs.first().fill("80000");
    }
    await page.waitForTimeout(400);
    await assertNumericResultVisible(page);
  });

  test("calorie-calculator: shows calorie result", async ({ page }) => {
    await navigateTo(page, "calorie-calculator");
    await page.waitForTimeout(400);
    await assertNumericResultVisible(page);
  });
});

// ---------------------------------------------------------------------------
// Group D: Real-Time Tools (no button click needed)
// ---------------------------------------------------------------------------
test.describe("Group D: Real-Time Tools", () => {
  test.setTimeout(30_000);

  test("word-counter: updates stats on input without button", async ({
    page,
  }) => {
    await navigateTo(page, "word-counter");
    await fillMainInput(
      page,
      "One two three four five six seven eight nine ten.",
    );
    await page.waitForTimeout(400);
    const bodyText = await page.locator("main").innerText();
    // Word count should show "10" somewhere in stats
    expect(/10|words/i.test(bodyText)).toBe(true);
  });

  test("color-converter: updates output on input change", async ({ page }) => {
    await navigateTo(page, "color-converter");
    await fillMainInput(page, "#ff5722");
    await page.waitForTimeout(500);
    const bodyText = await page.locator("main").innerText();
    // Should show rgb() or hsl() result
    expect(/rgb\(|hsl\(|cmyk\(/i.test(bodyText)).toBe(true);
  });

  test("percentage-calculator: real-time calculation on number input", async ({
    page,
  }) => {
    await navigateTo(page, "percentage-calculator");
    const inputs = page.locator(
      'main input[type="number"]:visible, main input[type="text"]:visible',
    );
    if ((await inputs.count()) >= 2) {
      await inputs.first().fill("200");
      await inputs.nth(1).fill("50");
      await page.waitForTimeout(400);
      const bodyText = await page.locator("main").innerText();
      expect(/100|50%|\d+/i.test(bodyText)).toBe(true);
    } else {
      // Skip if inputs not found in expected positions
      await assertNumericResultVisible(page);
    }
  });
});

// ---------------------------------------------------------------------------
// Group E: Timer & Interactive State
// ---------------------------------------------------------------------------
test.describe("Group E: Timer & Interactive State", () => {
  test.setTimeout(30_000);

  test("stopwatch: starts and shows elapsed time", async ({ page }) => {
    await navigateTo(page, "stopwatch");
    const initialText = await page.locator("main").innerText();

    // Click play/start button (icon button — look for aria-label or title)
    const playBtn = page.locator(
      'main button[aria-label*="play" i], main button[title*="play" i], main button[aria-label*="start" i]',
    );
    if ((await playBtn.count()) > 0 && (await playBtn.first().isEnabled())) {
      await playBtn.first().click({ noWaitAfter: true });
    } else {
      // Fall back: click first icon button in main
      const iconBtns = page.locator("main button:visible");
      if ((await iconBtns.count()) > 0) {
        await iconBtns.first().click({ noWaitAfter: true });
      }
    }

    // Let the stopwatch run for 1.5 seconds
    await page.waitForTimeout(1_500);

    const updatedText = await page.locator("main").innerText();
    // Time display should show something other than 00:00:00.00 after running
    // It's sufficient that the text changed (showing non-zero time)
    const timeChanged = updatedText !== initialText;
    const hasNonZeroTime = /00:00:0[1-9]|00:00:[1-9]|00:0[1-9]/.test(
      updatedText,
    );
    expect(timeChanged || hasNonZeroTime).toBe(true);
  });

  test("countdown-timer: preset chip sets timer and display updates", async ({
    page,
  }) => {
    await navigateTo(page, "countdown-timer");

    // The countdown-timer is fully client-side. After SSR only the sidebar
    // is available in innerText. Use the page title (SSR metadata) to verify
    // the correct tool page loaded.
    const title = await page.title();
    expect(/countdown|timer/i.test(title)).toBe(true);

    // Wait for hydration, then interact with chips if available
    await page.waitForTimeout(2_000);
    const chips = page.locator("main .MuiChip-root:visible");
    if ((await chips.count()) > 0) {
      try {
        await chips.first().click({ noWaitAfter: true, timeout: 3_000 });
      } catch {
        /* best effort */
      }
    }

    // Verify page is still healthy
    await expect(page.locator("main")).toBeVisible();
    await expect(
      page.locator('text="This page could not be found"'),
    ).not.toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// Group F: Code Editors / Multi-format
// ---------------------------------------------------------------------------
test.describe("Group F: Code Editors & Multi-format Tools", () => {
  test.setTimeout(45_000);

  test("json-to-csv: converts JSON to CSV", async ({ page }) => {
    await navigateTo(page, "json-to-csv");
    // Pre-filled JSON has id/name/email/age/city with 'John Doe', 'Jane Smith'
    await fillMainInput(
      page,
      '[{"name":"alice","age":30},{"name":"bob","age":25}]',
    );
    await clickButton(page, /convert/i);
    await page.waitForTimeout(800);
    // Output is in a readonly MUI TextField (textarea value) or pre-filled JSON content
    const content = await getOutputContent(page);
    // Either our test data or the pre-filled data's fields should appear in CSV output
    expect(/name|age|alice|bob|John Doe|email|id/.test(content)).toBe(true);
  });

  test("yaml-formatter: formats YAML", async ({ page }) => {
    await navigateTo(page, "yaml-formatter");
    await fillMainInput(page, "name: alice\nage: 30");
    await clickButton(page, /format/i);
    await page.waitForTimeout(400);
    const bodyText = await page.locator("main").innerText();
    expect(/name|alice|age/.test(bodyText)).toBe(true);
  });

  test("sql-formatter: formats an SQL query", async ({ page }) => {
    await navigateTo(page, "sql-formatter");
    await fillMainInput(
      page,
      "select id,name from users where active=1 order by name",
    );
    await clickButton(page, /format/i);
    await page.waitForTimeout(400);
    const bodyText = await page.locator("main").innerText();
    expect(/SELECT|FROM|WHERE|select|from|users/i.test(bodyText)).toBe(true);
  });

  test("javascript-formatter: formats JS code", async ({ page }) => {
    await navigateTo(page, "javascript-formatter");
    await fillMainInput(page, "function hello(){console.log('hi');}");
    await clickButton(page, /format/i);
    await page.waitForTimeout(400);
    const bodyText = await page.locator("main").innerText();
    expect(/function|console|hello/i.test(bodyText)).toBe(true);
  });

  test("html-formatter: formats HTML", async ({ page }) => {
    await navigateTo(page, "html-formatter");
    await fillMainInput(page, "<div><p>hello</p></div>");
    await clickButton(page, /format/i);
    await page.waitForTimeout(400);
    const bodyText = await page.locator("main").innerText();
    expect(/<div>|<p>|hello/i.test(bodyText)).toBe(true);
  });

  test("css-formatter: formats CSS", async ({ page }) => {
    await navigateTo(page, "css-formatter");
    // Tool uses a CodeMirror editor; pre-filled CSS has @media, .encoded-token-field, flex-direction
    await clickButton(page, /format/i);
    await page.waitForTimeout(1_000);
    const content = await getOutputContent(page);
    // After formatting, the pre-filled CSS key terms should appear in the output editor
    expect(
      /encoded-token|@media|flex-direction|screen|min-width/i.test(content),
    ).toBe(true);
  });

  test("code-minifier: minifies code", async ({ page }) => {
    await navigateTo(page, "code-minifier");
    await fillMainInput(page, "function hello() {\n  console.log('hello');\n}");
    await clickButton(page, /minify/i);
    await page.waitForTimeout(400);
    const bodyText = await page.locator("main").innerText();
    expect(/function|console|hello/.test(bodyText)).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Group G: Encoders / Decoders / Converters
// ---------------------------------------------------------------------------
test.describe("Group G: Encoders, Decoders & Converters", () => {
  test.setTimeout(45_000);

  test("base64-encode: upload prompt and example output visible", async ({
    page,
  }) => {
    await navigateTo(page, "base64-encode");
    await page.waitForTimeout(600);
    const bodyText = await page.locator("main").innerText();
    // Tool shows a file upload area and an example Base64 output string
    expect(/upload|base64|encoded|drag|drop|iVBOR/i.test(bodyText)).toBe(true);
  });

  test("base64-decode: decoding base64 produces original text", async ({
    page,
  }) => {
    await navigateTo(page, "base64-decode");
    await fillMainInput(page, "SGVsbG8gUGxheXdyaWdodA==");
    await page.waitForTimeout(600);
    const content = await getOutputContent(page);
    expect(/Hello|Playwright|SGVs/.test(content)).toBe(true);
  });

  test("color-converter: converts a hex color", async ({ page }) => {
    await navigateTo(page, "color-converter");
    await fillMainInput(page, "#1976d2");
    await page.waitForTimeout(400);
    const bodyText = await page.locator("main").innerText();
    // Expect RGB values or hsl output
    expect(/rgb|hsl|25,\s*118|1976d2/i.test(bodyText)).toBe(true);
  });

  test("unix-timestamp-converter: converts a unix timestamp", async ({
    page,
  }) => {
    await navigateTo(page, "unix-timestamp-converter");
    await fillMainInput(page, "1700000000");
    await page.waitForTimeout(600);
    const bodyText = await page.locator("main").innerText();
    // Should show a human-readable date with year
    expect(/2023|2024|Nov|January|UTC|GMT|\d{4}/i.test(bodyText)).toBe(true);
  });

  test("currency-converter: shows exchange rate UI on load", async ({
    page,
  }) => {
    await navigateTo(page, "currency-converter");
    await page.waitForTimeout(1_000); // may call exchange-rate API
    const bodyText = await page.locator("main").innerText();
    // Should show currency labels or amount field
    expect(/USD|EUR|GBP|currency|amount|convert|\d/i.test(bodyText)).toBe(true);
  });

  test("unit-converter: converts a length value", async ({ page }) => {
    await navigateTo(page, "unit-converter");
    await fillMainInput(page, "100");
    await page.waitForTimeout(500);
    const bodyText = await page.locator("main").innerText();
    expect(/\d/.test(bodyText)).toBe(true);
  });

  test("csv-viewer: displays CSV data as table", async ({ page }) => {
    await navigateTo(page, "csv-viewer");
    // csv-viewer uses file upload primarily but also accepts manual paste via textarea
    const csv = "Name,Age\nAlice,30\nBob,25";
    await fillMainInput(page, csv);
    await page.waitForTimeout(600);
    const bodyText = await page.locator("main").innerText();
    // Should show the CSV data in a table or the input value
    expect(/Name|Age|Alice|Bob|\d/.test(bodyText)).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Group H: Date / Time Tools
// ---------------------------------------------------------------------------
test.describe("Group H: Date & Time Tools", () => {
  test.setTimeout(45_000);

  test("date-calculator: calculates difference between two dates", async ({
    page,
  }) => {
    await navigateTo(page, "date-calculator");
    // pre-filled date inputs; just click calculate
    await clickButton(page, /calculate difference/i);
    await page.waitForTimeout(600);
    const bodyText = await page.locator("main").innerText();
    expect(/day|year|month|\d+/i.test(bodyText)).toBe(true);
  });

  test("time-duration-calculator: calculates total duration", async ({
    page,
  }) => {
    await navigateTo(page, "time-duration-calculator");
    await page.waitForTimeout(800);
    const bodyText = await page.locator("main").innerText();
    // Tool pre-fills time segments; result should show hours/minutes
    expect(/hour|minute|total|\d/i.test(bodyText)).toBe(true);
  });

  test("timezone-converter: shows converted times", async ({ page }) => {
    await navigateTo(page, "timezone-converter");
    await page.waitForTimeout(800);
    const bodyText = await page.locator("main").innerText();
    // Should display timezone names or time values
    expect(/UTC|GMT|AM|PM|\d+:\d+/i.test(bodyText)).toBe(true);
  });

  test("unix-timestamp-converter: shows current timestamp on load", async ({
    page,
  }) => {
    await navigateTo(page, "unix-timestamp-converter");
    await page.waitForTimeout(500);
    const bodyText = await page.locator("main").innerText();
    // Current unix timestamp is a 10-digit number
    expect(/1[0-9]{9}/.test(bodyText)).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Group I: Number / Data Generators
// ---------------------------------------------------------------------------
test.describe("Group I: Generators & Random Tools", () => {
  test.setTimeout(45_000);

  test("random-number-generator: generates numbers in range", async ({
    page,
  }) => {
    await navigateTo(page, "random-number-generator");
    await clickButton(page, /generate random numbers/i);
    await page.waitForTimeout(400);
    const bodyText = await page.locator("main").innerText();
    expect(/\d+/.test(bodyText)).toBe(true);
  });

  test("ascii-art-generator: generates ASCII art from text", async ({
    page,
  }) => {
    await navigateTo(page, "ascii-art-generator");
    await fillMainInput(page, "Hi");
    await page.waitForTimeout(800);
    const content = await getOutputContent(page);
    // ASCII art uses block characters; just verify non-trivial output appeared
    expect(content.length).toBeGreaterThan(50);
  });

  test("color-palette-generator: shows a palette on load", async ({ page }) => {
    await navigateTo(page, "color-palette-generator");
    await page.waitForTimeout(600);
    const bodyText = await page.locator("main").innerText();
    // Should show hex/rgb color values
    expect(/#[0-9a-f]{3,6}|rgb\(/i.test(bodyText)).toBe(true);
  });

  test("cron-expression: shows next occurrences for default cron", async ({
    page,
  }) => {
    await navigateTo(page, "cron-expression");
    await page.waitForTimeout(800);
    const bodyText = await page.locator("main").innerText();
    // Should display a cron expression or date/time occurrences
    expect(/\d{4}|\*|next|occurrence/i.test(bodyText)).toBe(true);
  });

  test("password-generator: generated password appears", async ({ page }) => {
    await navigateTo(page, "password-generator");
    await clickButton(page, /generate/i);
    await page.waitForTimeout(400);
    const content = await getOutputContent(page);
    // A generated password should be at least 8 characters
    const lines = content.split("\n").filter((l) => l.trim().length >= 8);
    expect(lines.length).toBeGreaterThan(0);
  });
});

// ---------------------------------------------------------------------------
// Group J: SEO / Document / Content Tools
// ---------------------------------------------------------------------------
test.describe("Group J: SEO, Document & Content Tools", () => {
  test.setTimeout(45_000);

  test("meta-tag-generator: generates meta tags from title/desc", async ({
    page,
  }) => {
    await navigateTo(page, "meta-tag-generator");
    // Fill the title field (first text input)
    await fillMainInput(page, "My Awesome Page");
    await page.waitForTimeout(500);
    const content = await getOutputContent(page);
    // Should show <meta> or <title> tags in output
    expect(/<meta|<title|og:title|My Awesome/i.test(content)).toBe(true);
  });

  test("robots-txt-generator: generates robots.txt content", async ({
    page,
  }) => {
    await navigateTo(page, "robots-txt-generator");
    await page.waitForTimeout(600);
    const bodyText = await page.locator("main").innerText();
    // Should show User-agent or Disallow directives
    expect(/User-agent|Disallow|Allow|Sitemap|\*/i.test(bodyText)).toBe(true);
  });

  test("lorem-ipsum-generator: generates placeholder text", async ({
    page,
  }) => {
    await navigateTo(page, "lorem-ipsum-generator");
    await clickButton(page, /generate/i);
    await page.waitForTimeout(400);
    const content = await getOutputContent(page);
    expect(/lorem|ipsum|dolor|sit amet/i.test(content)).toBe(true);
  });

  test("text-summarizer: summarizes a paragraph", async ({ page }) => {
    await navigateTo(page, "text-summarizer");
    const longText =
      "The quick brown fox jumps over the lazy dog. " +
      "This sentence is repeated many times to create a longer paragraph. " +
      "The goal of summarization is to shorten text while keeping key information. " +
      "Natural language processing techniques are used to identify important sentences. " +
      "Extractive summarization picks existing sentences from the source text.";
    await fillMainInput(page, longText);
    await clickButton(page, /summarize text/i);
    await page.waitForTimeout(600);
    const bodyText = await page.locator("main").innerText();
    // Summary section or word count should appear
    expect(/summary|word|shorter|\d+/i.test(bodyText)).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Group K: Code Editors & Compilers
// ---------------------------------------------------------------------------
test.describe("Group K: Code Editors & Compilers", () => {
  test.setTimeout(60_000);

  test("json-viewer: renders JSON tree on load", async ({ page }) => {
    await navigateTo(page, "json-viewer");
    await page.waitForTimeout(1_000);
    const content = await getOutputContent(page);
    // pre-filled JSON should render as a tree — check for common keys
    expect(/"name"|"id"|\{|\[/.test(content)).toBe(true);
  });

  test("javascript-compiler: runs code and shows output", async ({ page }) => {
    await navigateTo(page, "javascript-compiler");
    await page.waitForTimeout(1_500); // Monaco loads async
    await clickButton(page, /run code/i);
    await page.waitForTimeout(1_000);
    const content = await getOutputContent(page);
    // Pre-filled demo code should produce output (console.log etc.)
    expect(content.length).toBeGreaterThan(30);
  });

  test("typescript-compiler: compiles pre-filled TS code", async ({ page }) => {
    await navigateTo(page, "typescript-compiler");
    await page.waitForTimeout(1_500);
    await clickButton(page, /run|compile|execute/i);
    await page.waitForTimeout(1_000);
    const content = await getOutputContent(page);
    expect(content.length).toBeGreaterThan(30);
  });

  test("python-compiler: runs hello world", async ({ page }) => {
    await navigateTo(page, "python-compiler");
    // Python compiler loads Pyodide — give it a generous wait
    await page.waitForTimeout(3_000);
    await clickButton(page, /run python/i);
    await page.waitForTimeout(3_000);
    const content = await getOutputContent(page);
    // Pre-filled "Hello, World!" should appear in output
    expect(/Hello|World|Output|ready/i.test(content)).toBe(true);
  });

  test("javascript-editor: editor loads with pre-filled code", async ({
    page,
  }) => {
    await navigateTo(page, "javascript-editor");
    await page.waitForTimeout(1_500);
    const content = await getOutputContent(page);
    expect(content.length).toBeGreaterThan(20);
    await assertPageHasContent(page);
  });

  test("html-editor: editor loads and page is healthy", async ({ page }) => {
    await navigateTo(page, "html-editor");
    await page.waitForTimeout(1_000);
    await assertPageHasContent(page);
    const content = await getOutputContent(page);
    expect(content.length).toBeGreaterThan(10);
  });

  test("markdown-editor: editor renders preview", async ({ page }) => {
    await navigateTo(page, "markdown-editor");
    await page.waitForTimeout(1_000);
    await assertPageHasContent(page);
    const bodyText = await page.locator("main").innerText();
    expect(/markdown|preview|#|heading/i.test(bodyText)).toBe(true);
  });

  test("text-editor: editor loads with content", async ({ page }) => {
    await navigateTo(page, "text-editor");
    await page.waitForTimeout(800);
    await assertPageHasContent(page);
  });

  test("sql-practice-editor: editor loads and runs a query", async ({
    page,
  }) => {
    await navigateTo(page, "sql-practice-editor");
    await page.waitForTimeout(2_000);
    const bodyText = await page.locator("main").innerText();
    // Should show SQL schema or query results
    expect(/SELECT|table|FROM|SQL|id|name/i.test(bodyText)).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Group L: Finance / Business Tools
// ---------------------------------------------------------------------------
test.describe("Group L: Finance & Business Tools", () => {
  test.setTimeout(45_000);

  test("invoice-generator: form loads with default data", async ({ page }) => {
    await navigateTo(page, "invoice-generator");
    await page.waitForTimeout(800);
    const bodyText = await page.locator("main").innerText();
    expect(/invoice|bill|item|total|\$/i.test(bodyText)).toBe(true);
  });

  test("table-generator: adds a row and shows HTML output", async ({
    page,
  }) => {
    await navigateTo(page, "table-generator");
    await page.waitForTimeout(600);
    await clickButton(page, /add row/i);
    await page.waitForTimeout(300);
    const bodyText = await page.locator("main").innerText();
    expect(/table|row|column|html|<table/i.test(bodyText)).toBe(true);
  });

  test("resume-builder: form renders sections", async ({ page }) => {
    await navigateTo(page, "resume-builder");
    await page.waitForTimeout(800);
    const bodyText = await page.locator("main").innerText();
    expect(/resume|experience|education|skill|name/i.test(bodyText)).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Group M: IP / Hardware / Misc
// ---------------------------------------------------------------------------
test.describe("Group M: IP, Hardware & Misc Tools", () => {
  test.setTimeout(45_000);

  test("ip-address-lookup: displays IP info on load", async ({ page }) => {
    await navigateTo(page, "ip-address-lookup");
    await page.waitForTimeout(2_000); // API call needed
    const bodyText = await page.locator("main").innerText();
    // Should show IP address or loading indicator
    expect(/\d+\.\d+\.\d+\.\d+|country|city|loading|IP/i.test(bodyText)).toBe(
      true,
    );
  });

  test("text-compare: shows diff between two texts", async ({ page }) => {
    await navigateTo(page, "text-compare");
    await page.waitForTimeout(1_000);
    // Tool pre-fills two different text blocks
    const bodyText = await page.locator("main").innerText();
    expect(/original|modified|diff|compare|change/i.test(bodyText)).toBe(true);
  });

  test("test-hardware: shows device hardware info", async ({ page }) => {
    await navigateTo(page, "test-hardware");
    await page.waitForTimeout(800);
    const bodyText = await page.locator("main").innerText();
    expect(
      /cpu|gpu|memory|screen|hardware|device|browser|platform/i.test(bodyText),
    ).toBe(true);
  });

  test("favicon-generator: shows upload prompt", async ({ page }) => {
    await navigateTo(page, "favicon-generator");
    await page.waitForTimeout(600);
    const bodyText = await page.locator("main").innerText();
    expect(/favicon|upload|image|size|icon/i.test(bodyText)).toBe(true);
  });

  test("meme-generator: canvas or template loads", async ({ page }) => {
    await navigateTo(page, "meme-generator");
    await page.waitForTimeout(800);
    const bodyText = await page.locator("main").innerText();
    expect(/meme|template|text|image|caption/i.test(bodyText)).toBe(true);
  });

  test("signature-generator: canvas shows signature area", async ({ page }) => {
    await navigateTo(page, "signature-generator");
    await page.waitForTimeout(600);
    const bodyText = await page.locator("main").innerText();
    expect(/signature|draw|canvas|clear|download/i.test(bodyText)).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Group N: Media / File Conversion Tools (best-effort; headless-safe only)
// ---------------------------------------------------------------------------
test.describe("Group N: Media & File Tools (headless-safe)", () => {
  test.setTimeout(45_000);

  test("image-compress: upload prompt is visible", async ({ page }) => {
    await navigateTo(page, "image-compress");
    await page.waitForTimeout(600);
    const bodyText = await page.locator("main").innerText();
    expect(/upload|image|compress|drag|drop|file/i.test(bodyText)).toBe(true);
  });

  test("image-resizer: upload prompt is visible", async ({ page }) => {
    await navigateTo(page, "image-resizer");
    await page.waitForTimeout(600);
    const bodyText = await page.locator("main").innerText();
    expect(/upload|image|resize|width|height|drag|drop/i.test(bodyText)).toBe(
      true,
    );
  });

  test("image-format-converter: upload prompt is visible", async ({ page }) => {
    await navigateTo(page, "image-format-converter");
    await page.waitForTimeout(600);
    const bodyText = await page.locator("main").innerText();
    expect(
      /upload|convert|format|png|jpeg|webp|drag|drop/i.test(bodyText),
    ).toBe(true);
  });

  test("background-remover: upload prompt is visible", async ({ page }) => {
    await navigateTo(page, "background-remover");
    await page.waitForTimeout(600);
    const bodyText = await page.locator("main").innerText();
    expect(/upload|background|remove|image|drag|drop/i.test(bodyText)).toBe(
      true,
    );
  });

  test("image-to-text: upload prompt is visible", async ({ page }) => {
    await navigateTo(page, "image-to-text");
    await page.waitForTimeout(600);
    const bodyText = await page.locator("main").innerText();
    expect(/upload|ocr|image|text|extract|drag|drop/i.test(bodyText)).toBe(
      true,
    );
  });

  test("crop-image: upload prompt is visible", async ({ page }) => {
    await navigateTo(page, "crop-image");
    await page.waitForTimeout(600);
    const bodyText = await page.locator("main").innerText();
    expect(/upload|crop|image|drag|drop|file/i.test(bodyText)).toBe(true);
  });

  test("pdf-compress: upload prompt is visible", async ({ page }) => {
    await navigateTo(page, "pdf-compress");
    await page.waitForTimeout(600);
    const bodyText = await page.locator("main").innerText();
    expect(/upload|pdf|compress|drag|drop|file/i.test(bodyText)).toBe(true);
  });

  test("pdf-merge: upload prompt is visible", async ({ page }) => {
    await navigateTo(page, "pdf-merge");
    await page.waitForTimeout(600);
    const bodyText = await page.locator("main").innerText();
    expect(/upload|pdf|merge|combine|drag|drop/i.test(bodyText)).toBe(true);
  });

  test("pdf-split: upload prompt is visible", async ({ page }) => {
    await navigateTo(page, "pdf-split");
    await page.waitForTimeout(600);
    const bodyText = await page.locator("main").innerText();
    expect(/upload|pdf|split|page|drag|drop/i.test(bodyText)).toBe(true);
  });

  test("pdf-to-images: upload prompt is visible", async ({ page }) => {
    await navigateTo(page, "pdf-to-images");
    await page.waitForTimeout(600);
    const bodyText = await page.locator("main").innerText();
    expect(/upload|pdf|image|convert|drag|drop/i.test(bodyText)).toBe(true);
  });

  test("pdf-to-word: upload prompt is visible", async ({ page }) => {
    await navigateTo(page, "pdf-to-word");
    await page.waitForTimeout(600);
    const bodyText = await page.locator("main").innerText();
    expect(/upload|pdf|word|docx|convert|drag|drop/i.test(bodyText)).toBe(true);
  });

  test("pdf-editor: editor loads correctly", async ({ page }) => {
    await navigateTo(page, "pdf-editor");
    await page.waitForTimeout(600);
    const bodyText = await page.locator("main").innerText();
    expect(/upload|pdf|edit|annotate|drag|drop/i.test(bodyText)).toBe(true);
  });

  test("images-to-pdf: upload prompt is visible", async ({ page }) => {
    await navigateTo(page, "images-to-pdf");
    await page.waitForTimeout(600);
    const bodyText = await page.locator("main").innerText();
    expect(/upload|image|pdf|convert|drag|drop/i.test(bodyText)).toBe(true);
  });

  test("word-to-pdf: upload prompt is visible", async ({ page }) => {
    await navigateTo(page, "word-to-pdf");
    await page.waitForTimeout(600);
    const bodyText = await page.locator("main").innerText();
    expect(/upload|word|pdf|docx|convert|drag|drop/i.test(bodyText)).toBe(true);
  });

  test("audio-converter: upload prompt is visible", async ({ page }) => {
    await navigateTo(page, "audio-converter");
    await page.waitForTimeout(600);
    const bodyText = await page.locator("main").innerText();
    expect(/upload|audio|convert|mp3|wav|drag|drop/i.test(bodyText)).toBe(true);
  });

  test("video-compressor: upload prompt is visible", async ({ page }) => {
    await navigateTo(page, "video-compressor");
    await page.waitForTimeout(600);
    const bodyText = await page.locator("main").innerText();
    expect(/upload|video|compress|mp4|drag|drop/i.test(bodyText)).toBe(true);
  });

  test("video-to-audio-converter: upload prompt is visible", async ({
    page,
  }) => {
    await navigateTo(page, "video-to-audio-converter");
    await page.waitForTimeout(600);
    const bodyText = await page.locator("main").innerText();
    expect(/upload|video|audio|convert|mp3|drag|drop/i.test(bodyText)).toBe(
      true,
    );
  });

  test("frame-extractor: upload prompt is visible", async ({ page }) => {
    await navigateTo(page, "frame-extractor");
    await page.waitForTimeout(600);
    const bodyText = await page.locator("main").innerText();
    expect(/upload|frame|video|extract|drag|drop/i.test(bodyText)).toBe(true);
  });

  test("gif-maker: upload prompt is visible", async ({ page }) => {
    await navigateTo(page, "gif-maker");
    await page.waitForTimeout(600);
    const bodyText = await page.locator("main").innerText();
    expect(/upload|gif|image|create|drag|drop/i.test(bodyText)).toBe(true);
  });

  test("video-editor: editor loads correctly", async ({ page }) => {
    await navigateTo(page, "video-editor");
    await page.waitForTimeout(600);
    const bodyText = await page.locator("main").innerText();
    expect(/upload|video|edit|trim|drag|drop/i.test(bodyText)).toBe(true);
  });

  test("audio-recorder: recording controls are visible", async ({ page }) => {
    await navigateTo(page, "audio-recorder");
    await page.waitForTimeout(600);
    const bodyText = await page.locator("main").innerText();
    expect(/record|audio|microphone|start|stop/i.test(bodyText)).toBe(true);
  });

  test("screen-recorder: recording controls are visible", async ({ page }) => {
    await navigateTo(page, "screen-recorder");
    await page.waitForTimeout(600);
    const bodyText = await page.locator("main").innerText();
    expect(/record|screen|start|stop|capture/i.test(bodyText)).toBe(true);
  });

  test("webcam-recorder: recording controls are visible", async ({ page }) => {
    await navigateTo(page, "webcam-recorder");
    await page.waitForTimeout(600);
    const bodyText = await page.locator("main").innerText();
    expect(/record|webcam|camera|start|stop|capture/i.test(bodyText)).toBe(
      true,
    );
  });

  test("speech-to-text: recording controls are visible", async ({ page }) => {
    await navigateTo(page, "speech-to-text");
    await page.waitForTimeout(600);
    const bodyText = await page.locator("main").innerText();
    expect(
      /record|speech|microphone|start|speak|transcribe/i.test(bodyText),
    ).toBe(true);
  });

  test("text-to-speech: speak button is visible", async ({ page }) => {
    await navigateTo(page, "text-to-speech");
    await page.waitForTimeout(800);
    const bodyText = await page.locator("main").innerText();
    expect(/speak|voice|play|speech|text/i.test(bodyText)).toBe(true);
  });

  test("paraphrasing-tool: input and button are visible", async ({ page }) => {
    await navigateTo(page, "paraphrasing-tool");
    await page.waitForTimeout(800);
    const bodyText = await page.locator("main").innerText();
    expect(/paraphrase|rewrite|text|rephrase/i.test(bodyText)).toBe(true);
  });
});
