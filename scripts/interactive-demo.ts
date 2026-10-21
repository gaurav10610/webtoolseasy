import { chromium } from "@playwright/test";

async function runLiveVisualDemo() {
  console.log("🚀 Launching visible browser windows on your screen...");

  // Launch a visible browser instance with slowMo so each step is clearly visible to the user
  const browser = await chromium.launch({
    headless: false,
    slowMo: 1200, // 1.2s delay between each action so the user can observe everything
    args: ["--window-size=1200,800"],
  });

  const contextA = await browser.newContext({
    viewport: { width: 900, height: 750 },
  });
  const contextB = await browser.newContext({
    viewport: { width: 900, height: 750 },
  });

  // Window 1: Peer A (Sender)
  console.log("💻 Opening Window 1: Peer A (Sender)...");
  const pageA = await contextA.newPage();
  await pageA.goto("http://localhost:3000/drop");

  // Step 1: Click "Create Transfer Room"
  console.log("⚡ Peer A clicking 'Create Transfer Room'...");
  await pageA.waitForTimeout(1000);
  await pageA.getByRole("button", { name: "Create Transfer Room" }).click();

  // Wait for room code
  const roomCodeElement = pageA.locator("span.font-mono.text-lg.font-bold");
  await roomCodeElement.waitFor({ state: "visible" });
  const roomCode = (await roomCodeElement.innerText()).trim();
  console.log(`🔑 Room Generated: ${roomCode}`);

  // Step 2: Show QR Code
  console.log("📱 Showing QR Code Modal for mobile pairing...");
  await pageA.getByRole("button", { name: "Show QR" }).click();
  await pageA.waitForTimeout(2500); // Leave modal open for 2.5s for user to see
  await pageA.getByRole("button", { name: "Close" }).click();

  // Window 2: Peer B (Receiver)
  console.log(`🔗 Opening Window 2: Peer B joining room ${roomCode}...`);
  const pageB = await contextB.newPage();
  await pageB.goto(`http://localhost:3000/drop?room=${roomCode}`);

  // Wait for connection
  console.log("🟢 Establishing WebRTC direct peer-to-peer connection...");
  await pageA.getByText("Connected to Peer:").waitFor({ state: "visible", timeout: 15000 });
  await pageB.getByText("Connected to Peer:").waitFor({ state: "visible", timeout: 15000 });
  console.log("🎉 Both peers successfully connected P2P!");

  // Step 3: Send Secret Note from Peer A to Peer B
  console.log("📝 Sending secret encrypted note over WebRTC DataChannel...");
  await pageA.getByRole("button", { name: /Secret Notes/i }).click();
  await pageB.getByRole("button", { name: /Secret Notes/i }).click();

  const noteInput = pageA.locator("input[placeholder*='note']");
  await noteInput.fill("Hello from Peer A! 🚀 P2P encryption working in browser!");
  await pageA.getByRole("button", { name: "Send" }).click();

  await pageB.getByText("Hello from Peer A!").waitFor({ state: "visible" });
  console.log("✅ Secret note received by Peer B!");
  await pageA.waitForTimeout(2000);

  // Step 4: Send File from Peer A to Peer B
  console.log("📁 Streaming file from Peer A to Peer B...");
  await pageA.getByRole("button", { name: /File Transfers/i }).click();
  await pageB.getByRole("button", { name: /File Transfers/i }).click();

  const fileInput = pageA.locator("input[type='file']");
  await fileInput.setInputFiles({
    name: "dropstream-demo.txt",
    mimeType: "text/plain",
    buffer: Buffer.from(
      "DropStream live browser demo content!\nStreaming peer-to-peer with zero server storage."
    ),
  });

  await pageA.getByText("Completed", { exact: true }).waitFor({ state: "visible", timeout: 10000 });
  await pageB.getByText("Completed", { exact: true }).waitFor({ state: "visible", timeout: 10000 });
  console.log("🎉 File transfer 100% completed and saved!");

  console.log("👀 Keeping the visible browser windows open for 15 seconds so you can inspect them...");
  await pageA.waitForTimeout(15000);

  await browser.close();
  console.log("✨ Demo completed successfully!");
}

runLiveVisualDemo().catch((err) => {
  console.error("Demo error:", err);
  process.exit(1);
});
