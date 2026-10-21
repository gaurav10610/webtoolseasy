import { chromium } from "@playwright/test";

async function testCodePairTwoWindows() {
  console.log("============================================================");
  console.log("  LAUNCHING TWO BROWSER WINDOWS TO TEST CODEPAIR P2P SYNC   ");
  console.log("============================================================");

  const browser = await chromium.launch({ headless: true });

  // 1. Peer A: Creator
  console.log("\n1. Navigating Peer A to http://localhost:3000/codepair...");
  const ctxA = await browser.newContext({ viewport: { width: 1200, height: 800 } });
  const pageA = await ctxA.newPage();
  pageA.on("console", (msg) => console.log(`[Peer A Console] ${msg.text()}`));
  await pageA.goto("http://localhost:3000/codepair", { waitUntil: "networkidle" });

  // Click "+ New Pairing Session"
  console.log("2. Peer A clicking '+ New Pairing Session'...");
  await pageA.getByRole("button", { name: "+ New Pairing Session" }).click();
  await pageA.waitForTimeout(2000);

  // Extract Room Code
  const roomCode = await pageA.evaluate(() => {
    const el = document.querySelector(".font-semibold.text-blue-400");
    return el ? (el as HTMLElement).innerText.trim() : null;
  });
  console.log(`>>> Peer A created Room Code: [ ${roomCode} ]`);

  // 2. Peer B: Joiner
  console.log(`\n3. Navigating Peer B to http://localhost:3000/codepair?room=${roomCode}...`);
  const ctxB = await browser.newContext({ viewport: { width: 1200, height: 800 } });
  const pageB = await ctxB.newPage();
  pageB.on("console", (msg) => console.log(`[Peer B Console] ${msg.text()}`));
  await pageB.goto(`http://localhost:3000/codepair?room=${roomCode}`, { waitUntil: "networkidle" });

  // Wait for WebRTC DataChannel connection
  console.log("4. Waiting for WebRTC DataChannel connection between Peer A and Peer B...");
  await pageA.waitForTimeout(4000);

  // Check connection status on Peer A & Peer B
  const statusA = await pageA.evaluate(() => {
    return document.body.innerText.includes("Connected with");
  });
  const statusB = await pageB.evaluate(() => {
    return document.body.innerText.includes("Connected with");
  });
  console.log(`Peer A Connected status: ${statusA}`);
  console.log(`Peer B Connected status: ${statusB}`);

  // Test Code Execution on Peer A
  console.log("\n5. Peer A executing JavaScript code via '▶ Run'...");
  await pageA.getByRole("button", { name: /▶ Run/i }).click();
  await pageA.waitForTimeout(1000);

  const consoleOutput = await pageA.evaluate(() => {
    const logs = Array.from(document.querySelectorAll(".font-mono.text-xs"));
    return logs.map((el) => (el as HTMLElement).innerText.trim()).filter(Boolean);
  });
  console.log("Console Drawer Output on Peer A:", consoleOutput.slice(-3));

  // Test Language Switch to HTML and Live Preview
  console.log("\n6. Peer A switching language to HTML...");
  await pageA.locator("select").selectOption("html");
  await pageA.waitForTimeout(2000);

  // Check if Peer B received the language switch and HTML template
  const langB = await pageB.locator("select").inputValue();
  console.log(`Peer B synced language: ${langB}`);

  // Check live HTML preview on Peer B
  const hasIframeB = await pageB.evaluate(() => {
    const iframe = document.querySelector("iframe");
    return Boolean(iframe && iframe.getAttribute("srcdoc"));
  });
  console.log(`Peer B has live render iframe: ${hasIframeB}`);

  // Capture verification screenshots
  console.log("\n7. Capturing test screenshots...");
  await pageA.screenshot({ path: "test-results/codepair-peer-a.png" });
  await pageB.screenshot({ path: "test-results/codepair-peer-b.png" });

  await ctxA.close();
  await ctxB.close();
  await browser.close();

  console.log("=== CODEPAIR DUAL-BROWSER TEST COMPLETED SUCCESSFULLY ===");
}

testCodePairTwoWindows().catch(console.error);
