import { chromium } from "@playwright/test";

async function testTwoWindows() {
  console.log("=== LAUNCHING TWO BROWSER WINDOWS FOR BEAMSUITE ===");

  const browser = await chromium.launch({
    headless: true,
    args: [
      "--use-fake-ui-for-media-stream",
      "--use-fake-device-for-media-stream",
    ],
  });

  // =========================================================================
  // TEST SCENARIO A: Receiver Creates Room First -> Sender Joins via Room Code
  // =========================================================================
  console.log("\n--- SCENARIO A: Receiver First (OBS workflow) ---");
  const ctxReceiverA = await browser.newContext();
  const pageReceiverA = await ctxReceiverA.newPage();

  pageReceiverA.on("console", (msg) => console.log(`[Receiver A Console] ${msg.type()}: ${msg.text()}`));
  pageReceiverA.on("pageerror", (err) => console.log(`[Receiver A Error] ${err.message}`));

  console.log("A1. Navigating Receiver to http://localhost:3000/beam...");
  await pageReceiverA.goto("http://localhost:3000/beam", { waitUntil: "networkidle" });
  await pageReceiverA.getByRole("button", { name: "Create OBS Camera Source" }).click();
  await pageReceiverA.waitForTimeout(2000);

  const roomA = await pageReceiverA.evaluate(() => {
    const el = document.querySelector(".font-mono.text-blue-600, .font-mono.text-lg");
    return el ? (el as HTMLElement).innerText.trim() : null;
  });
  console.log(`A2. Room Code generated on Receiver: ${roomA}`);

  // Sender joins with that room code
  const ctxSenderA = await browser.newContext({ permissions: ["camera", "microphone"] });
  const pageSenderA = await ctxSenderA.newPage();
  pageSenderA.on("console", (msg) => console.log(`[Sender A Console] ${msg.type()}: ${msg.text()}`));
  pageSenderA.on("pageerror", (err) => console.log(`[Sender A Error] ${err.message}`));

  console.log(`A3. Sender opening http://localhost:3000/beam and entering ${roomA}...`);
  await pageSenderA.goto("http://localhost:3000/beam", { waitUntil: "networkidle" });
  await pageSenderA.fill("input[placeholder*='Room Code']", roomA!);
  await pageSenderA.getByRole("button", { name: "Join" }).click();

  console.log("A4. Waiting 8s for WebRTC negotiation...");
  await pageSenderA.waitForTimeout(8000);

  const reportA = await pageReceiverA.evaluate(() => {
    const v = document.querySelector("video");
    const tracks = v && v.srcObject ? (v.srcObject as MediaStream).getTracks().map(t => ({ kind: t.kind, enabled: t.enabled, readyState: t.readyState, muted: t.muted })) : [];
    return {
      hasVideoEl: Boolean(v),
      hasSrcObject: v ? Boolean(v.srcObject) : false,
      tracks,
      width: v ? v.videoWidth : 0,
      height: v ? v.videoHeight : 0,
      paused: v ? v.paused : true,
      muted: v ? v.muted : false,
      readyState: v ? v.readyState : 0,
      currentTime: v ? v.currentTime : 0,
    };
  });
  console.log("Scenario A Receiver Report:", JSON.stringify(reportA, null, 2));
  await pageReceiverA.screenshot({ path: "test-results/scenario-a-receiver.png" });

  await ctxReceiverA.close();
  await ctxSenderA.close();

  // =========================================================================
  // TEST SCENARIO B: Sender Starts Camera Stream First -> Receiver Opens Link
  // =========================================================================
  console.log("\n--- SCENARIO B: Sender First (Phone Camera Start) ---");
  const ctxSenderB = await browser.newContext({ permissions: ["camera", "microphone"] });
  const pageSenderB = await ctxSenderB.newPage();
  pageSenderB.on("console", (msg) => console.log(`[Sender B Console] ${msg.type()}: ${msg.text()}`));
  pageSenderB.on("pageerror", (err) => console.log(`[Sender B Error] ${err.message}`));

  console.log("B1. Sender opening http://localhost:3000/beam and clicking Camera Stream...");
  await pageSenderB.goto("http://localhost:3000/beam", { waitUntil: "networkidle" });
  await pageSenderB.getByRole("button", { name: /Camera Stream/i }).click();
  await pageSenderB.waitForTimeout(3000);

  const roomB = await pageSenderB.evaluate(() => {
    const el = document.querySelector(".font-mono.text-blue-600, .font-mono.text-lg");
    return el ? (el as HTMLElement).innerText.trim() : null;
  });
  console.log(`B2. Room Code created by Sender: ${roomB}`);

  // Receiver opens clean view: /beam?view=ROOM
  const ctxReceiverB = await browser.newContext();
  const pageReceiverB = await ctxReceiverB.newPage();
  pageReceiverB.on("console", (msg) => console.log(`[Receiver B Console] ${msg.type()}: ${msg.text()}`));
  pageReceiverB.on("pageerror", (err) => console.log(`[Receiver B Error] ${err.message}`));

  console.log(`B3. Receiver opening http://localhost:3000/beam?view=${roomB}...`);
  await pageReceiverB.goto(`http://localhost:3000/beam?view=${roomB}`, { waitUntil: "networkidle" });

  console.log("B4. Waiting 8s for WebRTC negotiation...");
  await pageReceiverB.waitForTimeout(8000);

  const reportB = await pageReceiverB.evaluate(() => {
    const v = document.querySelector("video");
    const tracks = v && v.srcObject ? (v.srcObject as MediaStream).getTracks().map(t => ({ kind: t.kind, enabled: t.enabled, readyState: t.readyState, muted: t.muted })) : [];
    return {
      hasVideoEl: Boolean(v),
      hasSrcObject: v ? Boolean(v.srcObject) : false,
      tracks,
      width: v ? v.videoWidth : 0,
      height: v ? v.videoHeight : 0,
      paused: v ? v.paused : true,
      muted: v ? v.muted : false,
      readyState: v ? v.readyState : 0,
      currentTime: v ? v.currentTime : 0,
    };
  });
  console.log("Scenario B Receiver Report:", JSON.stringify(reportB, null, 2));
  await pageReceiverB.screenshot({ path: "test-results/scenario-b-receiver.png" });

  await ctxSenderB.close();
  await ctxReceiverB.close();
  await browser.close();
}

testTwoWindows().catch(console.error);
