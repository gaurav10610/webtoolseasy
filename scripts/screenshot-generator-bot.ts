#!/usr/bin/env tsx

import { spawn, ChildProcess, exec } from "child_process";
import chalk from "chalk";
import { promisify } from "util";

const execAsync = promisify(exec);

// Get parallelism from environment variable, default to 4
const PARALLELISM = process.env.PARALLELISM || "4";

function runCombinedServer(): ChildProcess {
  return spawn("bash", ["-c", "npm run build && npm run start"], {
    cwd: process.cwd(),
    env: process.env,
    stdio: ["pipe", "pipe", "pipe"],
  });
}

// Function to kill process tree
async function killProcessTree(pid: number): Promise<void> {
  try {
    // Try using pkill to kill all child processes
    await execAsync(`pkill -P ${pid}`);
    console.log(chalk.yellow(`🔪 Killed child processes of PID ${pid}`));
  } catch {
    // pkill might fail if no children exist, that's okay
  }

  // Then kill the main process
  try {
    process.kill(pid, "SIGTERM");
    console.log(chalk.yellow(`📡 Sent SIGTERM to PID ${pid}`));
  } catch {
    // Process might already be dead
  }
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

    // Kill the entire process tree
    if (serverProcess.pid) {
      await killProcessTree(serverProcess.pid);

      // Wait for graceful shutdown
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Force kill if still running
      try {
        if (!serverProcess.killed) {
          console.log(chalk.yellow("🔨 Force killing server..."));
          process.kill(serverProcess.pid, "SIGKILL");

          // Also force kill any remaining children
          await execAsync(`pkill -9 -P ${serverProcess.pid}`).catch(() => {});
        }
      } catch {
        // Process might already be dead
        console.log(chalk.gray("Process already terminated"));
      }
    }

    // Wait a bit for final cleanup
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
