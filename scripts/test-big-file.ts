import { chromium } from "@playwright/test";
import * as path from "path";
import * as fs from "fs";

async function testBigFileTransfer() {
  const filePath = path.resolve("/Users/gaurav/Downloads/Electric_Vehicle_Population_Data.csv");

  if (!fs.existsSync(filePath)) {
    console.error(`File not found at ${filePath}`);
    process.exit(1);
  }

  const stat = fs.statSync(filePath);
  const sizeMB = (stat.size / (1024 * 1024)).toFixed(2);
  console.log(`📦 Testing real system file: ${path.basename(filePath)} (${sizeMB} MB)`);

  console.log("🚀 Launching visible browser windows...");
  const browser = await chromium.launch({
    headless: false,
    args: ["--window-size=1280,850"],
  });

  const contextA = await browser.newContext({ viewport: { width: 900, height: 800 } });
  const contextB = await browser.newContext({ viewport: { width: 900, height: 800 } });

  // 1. Peer A (Sender)
  const pageA = await contextA.newPage();
  await pageA.goto("http://localhost:3000/drop");
  await pageA.getByRole("button", { name: "Create Transfer Room" }).click();

  const roomCodeElement = pageA.locator("span.font-mono.text-lg.font-bold");
  await roomCodeElement.waitFor({ state: "visible", timeout: 10000 });
  const roomCode = (await roomCodeElement.innerText()).trim();
  console.log(`🔑 Room Generated: ${roomCode}`);

  // 2. Peer B (Receiver)
  const pageB = await contextB.newPage();
  await pageB.goto(`http://localhost:3000/drop?room=${roomCode}`);

  console.log("🟢 Waiting for direct WebRTC P2P connection...");
  await pageA.getByText("Connected to Peer:").waitFor({ state: "visible", timeout: 15000 });
  await pageB.getByText("Connected to Peer:").waitFor({ state: "visible", timeout: 15000 });
  console.log("🎉 P2P WebRTC connection established!");

  // 3. Initiate 58MB file transfer
  console.log(`⚡ Starting 58MB file stream from Peer A to Peer B...`);
  const startTime = Date.now();
  const fileInput = pageA.locator("input[type='file']");
  await fileInput.setInputFiles(filePath);

  // Monitor progress
  let completed = false;
  while (!completed) {
    await pageA.waitForTimeout(500);

    const progressPillA = pageA.locator("span.text-xs.px-2\\.5.py-1.rounded-full.font-medium");
    if (await progressPillA.count() > 0) {
      const textA = (await progressPillA.first().innerText()).trim();
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
      process.stdout.write(`\r⏳ Transferring: ${textA} | Elapsed: ${elapsed}s`);

      if (textA === "Completed") {
        completed = true;
      }
    }
  }
  const totalSeconds = ((Date.now() - startTime) / 1000).toFixed(2);
  const avgSpeedMBps = (Number(sizeMB) / Number(totalSeconds)).toFixed(2);
  console.log(`\n\n🎉 File transfer COMPLETED in ${totalSeconds}s! Average speed: ${avgSpeedMBps} MB/s`);

  // Verify on Peer B
  await pageB.getByText("Completed", { exact: true }).waitFor({ state: "visible", timeout: 10000 });
  await pageB.getByText("Electric_Vehicle_Population_Data.csv").waitFor({ state: "visible" });
  console.log("✅ Peer B verified receipt of the 58MB file!");

  // Save screenshots
  await pageA.screenshot({ path: "test-results/58mb-transfer-peera.png" });
  await pageB.screenshot({ path: "test-results/58mb-transfer-peerb.png" });

  console.log("👀 Keeping visible windows open for 10 seconds so you can see the result...");
  await pageA.waitForTimeout(10000);

  await browser.close();
  console.log("✨ Big file test finished successfully!");
}

testBigFileTransfer().catch((err) => {
  console.error("Big file test error:", err);
  process.exit(1);
});
