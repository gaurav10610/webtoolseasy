import { test, expect } from "@playwright/test";

test.use({
  launchOptions: {
    args: [
      "--use-fake-ui-for-media-stream",
      "--use-fake-device-for-media-stream",
    ],
  },
});

test.describe("BeamSuite P2P OBS Camera & Screen Bridge", () => {
  test("renders initial UI and creates an OBS camera source room", async ({ page }) => {
    await page.goto("/beam");

    // Check title and badges
    await expect(page.locator("h1")).toContainText("BeamSuite");
    await expect(page.getByText("WebRTC OBS Camera")).toBeVisible();
    await expect(page.getByRole("button", { name: "Create OBS Camera Source" })).toBeVisible();

    // Click Create OBS Camera Source
    await page.getByRole("button", { name: "Create OBS Camera Source" }).click();

    // Verify room code appears
    const roomCodeElement = page.locator("span.font-mono.text-lg.font-bold");
    await expect(roomCodeElement).toBeVisible({ timeout: 10000 });
    const roomCode = (await roomCodeElement.innerText()).trim();
    expect(roomCode.length).toBeGreaterThan(0);

    // Verify QR modal opens
    await page.getByRole("button", { name: /Scan with Phone/i }).click();
    await expect(page.locator("img[alt='Camera Stream QR Code']")).toBeVisible();
    await page.screenshot({ path: "test-results/beamsuite-qr-modal.png" });
    await page.getByRole("button", { name: "Close" }).click();

    // Verify OBS guide displays the correct URL
    await expect(page.getByText("OBS Studio Quick Integration Guide")).toBeVisible();
    await expect(page.locator("code").filter({ hasText: roomCode })).toBeVisible();
  });

  test("two peers connect as OBS Receiver and Camera Sender with live tally", async ({ context }) => {
    await context.grantPermissions(["camera", "microphone"]);

    // 1. Peer A (OBS Receiver / Studio)
    const pageA = await context.newPage();
    await pageA.goto("/beam");
    await pageA.getByRole("button", { name: "Create OBS Camera Source" }).click();

    const roomCodeElement = pageA.locator("span.font-mono.text-lg.font-bold");
    await expect(roomCodeElement).toBeVisible({ timeout: 10000 });
    const roomCode = (await roomCodeElement.innerText()).trim();

    // 2. Peer B (Camera Sender / Mobile Simulator)
    const pageB = await context.newPage();
    await pageB.goto(`/beam?push=${roomCode}`);

    // Verify Peer B opens camera and connects
    await expect(pageB.locator("span").filter({ hasText: "LIVE ON AIR" })).toBeVisible({ timeout: 15000 });

    // Verify Peer A receives the stream and goes live
    await expect(pageA.locator("span").filter({ hasText: "LIVE ON AIR" })).toBeVisible({ timeout: 15000 });

    // Take screenshot of connected studio view
    await pageA.screenshot({ path: "test-results/beamsuite-studio-receiver.png" });
    await pageB.screenshot({ path: "test-results/beamsuite-camera-sender.png" });

    // 3. Test Clean View mode for OBS Browser Source
    const pageObs = await context.newPage();
    await pageObs.goto(`/beam?view=${roomCode}`);
    await expect(pageObs.locator("video")).toBeVisible();
    await pageObs.screenshot({ path: "test-results/beamsuite-obs-clean-view.png" });
  });
});
