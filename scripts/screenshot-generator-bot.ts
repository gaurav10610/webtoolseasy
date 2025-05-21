import { spawn } from "child_process";
import chalk from "chalk";

function runCombinedServer(): ReturnType<typeof spawn> {
  return spawn("bash", ["-c", "npm run build && npm run start"], {
    cwd: process.cwd(),
    env: process.env,
    stdio: ["pipe", "pipe", "pipe"],
  });
}

function waitForServerReady(
  serverProcess: ReturnType<typeof spawn>,
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

function runScreenshots(): Promise<void> {
  return new Promise((resolve, reject) => {
    const screenshot = spawn("npm", ["run", "generate:screenshots"], {
      cwd: process.cwd(),
      stdio: "inherit",
    });

    screenshot.on("exit", (code) => {
      if (code === 0) {
        console.log(chalk.green("🖼️ Screenshots generated."));
        resolve();
      } else {
        reject(new Error(`❌ Screenshot script failed with code ${code}`));
      }
    });
  });
}

async function generatePageScreenshots() {
  console.log(chalk.cyan("🚀 Starting build + server process..."));

  const serverProcess = runCombinedServer();

  try {
    await waitForServerReady(serverProcess, "Ready in"); // Change if your server logs something else
    console.log(
      chalk.green("✅ Server is ready. Starting screenshot process...")
    );

    await runScreenshots();
  } catch (err) {
    console.error(chalk.red(err.message));
  } finally {
    console.log(chalk.yellow("🧹 Stopping server..."));
    serverProcess.kill("SIGKILL");
  }
}

generatePageScreenshots().catch((err) => {
  console.error(chalk.red("❌ Unhandled Error:"), err.message);
});
