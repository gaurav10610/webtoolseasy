import { test, expect } from "@playwright/test";

test.describe("DropStream P2P Transfer", () => {
  test("renders initial UI and creates a room with QR code", async ({ page }) => {
    await page.goto("/drop");

    // Check title and badges
    await expect(page.locator("h1")).toContainText("DropStream");
    await expect(page.getByText("100% Peer-to-Peer")).toBeVisible();
    await expect(page.getByRole("button", { name: "Create Transfer Room" })).toBeVisible();

    // Click Create Transfer Room
    await page.getByRole("button", { name: "Create Transfer Room" }).click();

    // Verify room code appears (format: XXX-XXX)
    const roomCodeElement = page.locator("span.font-mono.text-lg.font-bold");
    await expect(roomCodeElement).toBeVisible({ timeout: 10000 });
    const roomCode = (await roomCodeElement.innerText()).trim();
    expect(roomCode.length).toBeGreaterThan(0);

    // Verify Show QR button works
    await page.getByRole("button", { name: "Show QR" }).click();
    await expect(page.locator("img[alt='Room QR Code']")).toBeVisible();
    await page.screenshot({ path: "test-results/qr-modal.png" });

    // Close QR modal
    await page.getByRole("button", { name: "Close" }).click();
    await expect(page.locator("img[alt='Room QR Code']")).not.toBeVisible();

    // Verify waiting status
    await expect(page.getByText("Waiting for peer to join")).toBeVisible();
  });

  test("two peers connect and exchange secret notes and files", async ({ context }) => {
    // 1. Peer A creates room
    const pageA = await context.newPage();
    await pageA.goto("/drop");
    await pageA.getByRole("button", { name: "Create Transfer Room" }).click();

    const roomCodeElement = pageA.locator("span.font-mono.text-lg.font-bold");
    await expect(roomCodeElement).toBeVisible({ timeout: 10000 });
    const roomCode = (await roomCodeElement.innerText()).trim();
    expect(roomCode).toMatch(/^[A-Z0-9]{3}-[A-Z0-9]{3}$/);

    // 2. Peer B joins room
    const pageB = await context.newPage();
    await pageB.goto(`/drop?room=${roomCode}`);

    // Verify both peers reach 'Connected to Peer'
    await expect(pageA.getByText("Connected to Peer:")).toBeVisible({ timeout: 15000 });
    await expect(pageB.getByText("Connected to Peer:")).toBeVisible({ timeout: 15000 });

    // Take screenshot of connected state
    await pageA.screenshot({ path: "test-results/peer-a-connected.png" });
    await pageB.screenshot({ path: "test-results/peer-b-connected.png" });

    // 3. Test Secret Notes exchange
    await pageA.getByRole("button", { name: /Secret Notes/i }).click();
    await pageB.getByRole("button", { name: /Secret Notes/i }).click();

    const testSecret = `Hello-From-Peer-A-${Date.now()}`;
    await pageA.locator("input[placeholder*='note']").fill(testSecret);
    await pageA.getByRole("button", { name: "Send" }).click();

    // Verify message appears on Peer B
    await expect(pageB.getByText(testSecret)).toBeVisible({ timeout: 5000 });
    await pageB.screenshot({ path: "test-results/secret-notes-received.png" });

    // 4. Test File Transfer from Peer A to Peer B
    await pageA.getByRole("button", { name: /File Transfers/i }).click();
    await pageB.getByRole("button", { name: /File Transfers/i }).click();

    // Create a mock file and send via hidden file input
    const testFileName = "test-document.txt";
    const testFileBuffer = Buffer.from("DropStream P2P Transfer End-to-End Test Payload Content");

    const fileInput = pageA.locator("input[type='file']");
    await fileInput.setInputFiles({
      name: testFileName,
      mimeType: "text/plain",
      buffer: testFileBuffer,
    });

    // Verify transfer progress and completion on both sides
    await expect(pageA.getByText("Completed", { exact: true })).toBeVisible({ timeout: 10000 });
    await expect(pageB.getByText("Completed", { exact: true })).toBeVisible({ timeout: 10000 });
    await expect(pageB.getByText(testFileName)).toBeVisible();
    await expect(pageB.getByRole("link", { name: "Save" })).toBeVisible();

    // Take screenshot of completed transfer
    await pageA.screenshot({ path: "test-results/transfer-complete-peera.png" });
    await pageB.screenshot({ path: "test-results/transfer-complete-peerb.png" });
  });
});
