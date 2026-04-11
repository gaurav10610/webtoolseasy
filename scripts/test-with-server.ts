#!/usr/bin/env tsx

import { spawn, type ChildProcess, execSync } from "child_process";
import http from "http";
import { promisify } from "util";

const sleep = promisify(setTimeout);

const PORT = 3000;
const HOST = "localhost";
const MAX_WAIT_TIME = 60000;
const CHECK_INTERVAL = 500;

let devServerProcess: ChildProcess | null = null;
let isServerReady = false;

async function checkServerHealth(): Promise<boolean> {
  return new Promise((resolve) => {
    const req = http.get(`http://${HOST}:${PORT}`, (res) => {
      const statusCode = res.statusCode ?? 0;
      resolve(statusCode >= 200 && statusCode < 500);
    });
    req.on("error", () => resolve(false));
    req.setTimeout(2000, () => {
      req.destroy();
      resolve(false);
    });
  });
}

async function waitForServer(): Promise<boolean> {
  const startTime = Date.now();
  console.log("⏳ Waiting for app server to be ready...");

  while (Date.now() - startTime < MAX_WAIT_TIME) {
    if (await checkServerHealth()) {
      console.log("✓ Dev server is ready!");
      isServerReady = true;
      return true;
    }
    await sleep(CHECK_INTERVAL);
    process.stdout.write(".");
  }

  console.log("\n✗ Timeout waiting for app server");
  return false;
}

async function startDevServer(): Promise<void> {
  return new Promise((resolve, reject) => {
    console.log("🏗️ Building app for E2E tests...");
    execSync("npm run build", {
      stdio: "inherit",
      env: {
        ...process.env,
        PORT: String(PORT),
      },
    });

    console.log(`🚀 Starting app server on http://${HOST}:${PORT} ...`);

    devServerProcess = spawn(
      "npm",
      ["run", "start", "--", "--port", String(PORT)],
      {
        stdio: ["ignore", "pipe", "pipe"],
        shell: true,
        env: {
          ...process.env,
          PORT: String(PORT),
        },
      },
    );

    devServerProcess.stdout?.on("data", (data: Buffer) => {
      const output = data.toString();
      process.stdout.write(output);

      if (output.includes("Ready in") || output.includes("Ready on")) {
        console.log("✓ App server started");
        resolve();
      }
    });

    devServerProcess.stderr?.on("data", (data: Buffer) => {
      process.stderr.write(data.toString());
    });

    devServerProcess.on("error", (error: Error) => {
      console.error("✗ Failed to start dev server:", error.message);
      reject(error);
    });

    devServerProcess.on("exit", (code: number | null) => {
      if (code !== 0 && !isServerReady) {
        console.error(`✗ Dev server exited with code ${code}`);
        reject(new Error(`App server exited with code ${code}`));
      }
    });

    setTimeout(() => {
      if (!isServerReady) {
        resolve();
      }
    }, 10000);
  });
}

async function runTests(): Promise<number> {
  return new Promise((resolve) => {
    console.log("\n🧪 Running Playwright tests...\n");

    const testProcess = spawn("npx", ["playwright", "test"], {
      stdio: "inherit",
      shell: true,
      env: {
        ...process.env,
        PORT: String(PORT),
        BASE_URL: `http://${HOST}:${PORT}`,
      },
    });

    testProcess.on("exit", (code: number | null) => {
      resolve(code ?? 1);
    });
  });
}

async function stopDevServer(): Promise<void> {
  if (!devServerProcess) return;

  console.log("\n🛑 Stopping app server...");

  return new Promise((resolve) => {
    devServerProcess?.on("exit", () => {
      console.log("✓ App server stopped");
      resolve();
    });

    devServerProcess?.kill("SIGTERM");

    setTimeout(() => {
      if (devServerProcess && !devServerProcess.killed) {
        devServerProcess.kill("SIGKILL");
      }
      resolve();
    }, 3000);
  });
}

async function cleanup(): Promise<void> {
  await stopDevServer();

  try {
    const pid = execSync(`lsof -ti:${PORT}`).toString().trim();
    if (pid) {
      execSync(`kill -9 ${pid}`);
      console.log(`✓ Cleaned up port ${PORT}`);
    }
  } catch {
    // Port already free
  }
}

async function main(): Promise<void> {
  let exitCode = 0;

  try {
    await startDevServer();
    const serverReady = await waitForServer();

    if (!serverReady) {
      console.error("✗ App server failed to become ready");
      exitCode = 1;
    } else {
      exitCode = await runTests();

      if (exitCode === 0) {
        console.log("\n✓ All tests passed!");
      } else {
        console.log(`\n✗ Tests failed with exit code ${exitCode}`);
      }
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("✗ Error:", errorMessage);
    exitCode = 1;
  } finally {
    await cleanup();
    process.exit(exitCode);
  }
}

process.on("SIGINT", async () => {
  console.log("\n\n⚠️  Interrupted by user");
  await cleanup();
  process.exit(130);
});

process.on("SIGTERM", async () => {
  await cleanup();
  process.exit(143);
});

main().catch(async (error) => {
  console.error("Fatal error:", error);
  await cleanup();
  process.exit(1);
});
