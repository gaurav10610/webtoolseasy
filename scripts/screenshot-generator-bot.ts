#!/usr/bin/env tsx

import { spawn, ChildProcess } from "child_process";
import chalk from "chalk";

// Get parallelism from environment variable, default to 4
const PARALLELISM = process.env.PARALLELISM || "4";

function runCombinedServer(): ChildProcess {
  return spawn("bash", ["-c", "npm run build && npm run start"], {
    cwd: process.cwd(),
    env: process.env,
    stdio: ["pipe", "pipe", "pipe"],
  });
}

function waitForServerReady(
  serverProcess: ChildProcess,
  readySignal: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    serverProcess.stdout!.on("data", (data) => {
      const message = data.toString();
      process.stdout.write(chalk.gray(`[server] ${message}`));

      if (message.includes(readySignal)) {
        resolve();
      }
    });

    serverProcess.stderr!.on("data", (data) => {
      process.stderr.write(chalk.red(`[server error] ${data}`));
    });

    serverProcess.on("exit", (code) => {
      reject(
        new Error(`❌ Server process exited prematurely with code ${code}`)
      );
    });
  });
}

function runScreenshots(): Promise<number> {
  return new Promise((resolve, reject) => {
    const screenshot = spawn("npm", ["run", "generate:screenshots"], {
      cwd: process.cwd(),
      env: {
        ...process.env,
        PARALLELISM,
      },
      stdio: "inherit",
    });

    screenshot.on("exit", (code) => {
      if (code === 0) {
        console.log(chalk.green("🖼️ Screenshots generated successfully."));
        resolve(0);
      } else {
        console.error(
          chalk.red(`❌ Screenshot script failed with code ${code}`)
        );
        resolve(code ?? 1);
      }
    });

    screenshot.on("error", (error) => {
      console.error(chalk.red(`❌ Screenshot script error: ${error.message}`));
      reject(error);
    });
  });
}

async function generatePageScreenshots(): Promise<void> {
  console.log(
    chalk.cyan(
      `🚀 Starting build + server process with parallelism: ${PARALLELISM}...`
    )
  );

  const serverProcess = runCombinedServer();
  let exitCode = 0;

  try {
    await waitForServerReady(serverProcess, "Ready in");
    console.log(
      chalk.green("✅ Server is ready. Starting screenshot process...")
    );

    exitCode = await runScreenshots();
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error(chalk.red(errorMessage));
    exitCode = 1;
  } finally {
    console.log(chalk.yellow("🧹 Stopping server..."));

    // Try graceful shutdown first
    serverProcess.kill("SIGTERM");

    // Force kill after 3 seconds if still running
    setTimeout(() => {
      if (!serverProcess.killed) {
        console.log(chalk.yellow("🔨 Force killing server..."));
        serverProcess.kill("SIGKILL");
      }
    }, 3000);

    // Wait a bit for cleanup
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log(chalk.cyan(`✨ Process completed with exit code: ${exitCode}`));
    process.exit(exitCode);
  }
}

// Handle process signals
process.on("SIGINT", () => {
  console.log(chalk.yellow("\n⚠️  Interrupted by user"));
  process.exit(130);
});

process.on("SIGTERM", () => {
  console.log(chalk.yellow("\n⚠️  Terminated"));
  process.exit(143);
});

// Main execution
generatePageScreenshots().catch((err) => {
  const errorMessage = err instanceof Error ? err.message : String(err);
  console.error(chalk.red("❌ Unhandled Error:"), errorMessage);
  process.exit(1);
});
