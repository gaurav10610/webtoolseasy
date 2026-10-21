import { chromium } from "@playwright/test";

async function runHeadedVisualTest() {
  console.log("============================================================");
  console.log("  LAUNCHING VISIBLE BROWSER WINDOWS ON SCREEN FOR USER      ");
  console.log("============================================================");

  // Sender Browser (Headed, Left Side of Screen)
  console.log("\n[1/4] Launching Sender Window (Left Side)...");
  const senderBrowser = await chromium.launch({
    headless: false,
    args: [
      "--window-position=50,80",
      "--window-size=680,780",
      "--use-fake-ui-for-media-stream",
      "--use-fake-device-for-media-stream",
      "--autoplay-policy=no-user-gesture-required",
    ],
  });

  // Receiver Browser (Headed, Right Side of Screen)
  console.log("[2/4] Launching Receiver Window (Right Side)...");
  const receiverBrowser = await chromium.launch({
    headless: false,
    args: [
      "--window-position=750,80",
      "--window-size=680,780",
      "--use-fake-ui-for-media-stream",
      "--use-fake-device-for-media-stream",
      "--autoplay-policy=no-user-gesture-required",
    ],
  });

  const ctxSender = await senderBrowser.newContext({
    viewport: { width: 660, height: 720 },
    permissions: ["camera", "microphone"],
  });
  const pageSender = await ctxSender.newPage();

  const ctxReceiver = await receiverBrowser.newContext({
    viewport: { width: 660, height: 720 },
  });
  const pageReceiver = await ctxReceiver.newPage();

  pageSender.on("console", (msg) => console.log(`[Sender] ${msg.text()}`));
  pageReceiver.on("console", (msg) => console.log(`[Receiver] ${msg.text()}`));

  // -------------------------------------------------------------
  // Test Scenario: Sender Starts Stream -> Receiver joins live
  // -------------------------------------------------------------
  console.log("\n[3/4] Sender opening http://localhost:3000/beam...");
  await pageSender.goto("http://localhost:3000/beam", { waitUntil: "networkidle" });
  await pageSender.waitForTimeout(1000);

  console.log("Sender clicking '📷 Camera Stream'...");
  await pageSender.getByRole("button", { name: /Camera Stream/i }).click();
  await pageSender.waitForTimeout(3000);

  const roomCode = await pageSender.evaluate(() => {
    const el = document.querySelector(".font-mono.text-blue-600, .font-mono.text-lg");
    return el ? (el as HTMLElement).innerText.trim() : null;
  });
  console.log(`>>> Generated BeamSuite Room Code: [ ${roomCode} ]`);

  console.log(`\n[4/4] Receiver opening http://localhost:3000/beam?view=${roomCode}...`);
  await pageReceiver.goto(`http://localhost:3000/beam?view=${roomCode}`, { waitUntil: "networkidle" });

  console.log("\n>>> Both browser windows are now open side-by-side on your screen.");
  console.log(">>> Streaming live WebRTC frames between Sender and Receiver...");

  // Keep windows visible and live for 15 seconds so user sees the live automated streaming
  for (let s = 15; s > 0; s--) {
    const stats = await pageReceiver.evaluate(() => {
      const v = document.querySelector("video");
      return {
        paused: v ? v.paused : true,
        readyState: v ? v.readyState : 0,
        currentTime: v ? v.currentTime.toFixed(1) : "0",
        videoWidth: v ? v.videoWidth : 0,
        videoHeight: v ? v.videoHeight : 0,
      };
    });
    console.log(`[Live Playback] T-${s}s remaining | Video: ${stats.videoWidth}x${stats.videoHeight} | Playing: ${!stats.paused} | Time: ${stats.currentTime}s`);
    await pageReceiver.waitForTimeout(1000);
  }

  console.log("\nAutomated demonstration finished. Taking final screenshots...");
  await pageSender.screenshot({ path: "test-results/headed-sender.png" });
  await pageReceiver.screenshot({ path: "test-results/headed-receiver.png" });

  console.log("Closing headed browser windows...");
  await senderBrowser.close();
  await receiverBrowser.close();
  console.log("=== HEADED AUTOMATION COMPLETED SUCCESSFULLY ===");
}

runHeadedVisualTest().catch(console.error);
