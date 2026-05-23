const { chromium } = require('playwright');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const TOOLS = [
  "api-tester",
  "json-to-zod",
  "svg-to-react",
  "regex-explainer",
  "cron-explainer",
  "jwt-debugger",
  "rsa-generator",
  "sqlite-studio",
  "log-explorer",
  "code-to-image",
  "dev-lens",
  "screen-recorder",
  "css-effects",
  "yaml-json-converter",
  "sql-formatter",
  "docker-compose",
  "id-generator",
  "base64-file",
  "bcrypt-generator",
  "color-a11y",
  "diff-checker",
  "css-grid-architect"
];

const MOCK_APIS = [
  "ecommerce-products",
  "user-profiles",
  "blog-posts",
  "real-estate"
];

const TARGETS = [
  ...TOOLS.map(t => ({ url: `/tools/${t}`, output: `tools-${t}.png` })),
  ...MOCK_APIS.map(m => ({ url: `/mock-api/${m}`, output: `mock-api-${m}.png` }))
];

const OG_DIR = path.join(__dirname, '../public/og-images');

async function waitForServer(url) {
  return new Promise((resolve) => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch(url);
        if (res.ok) {
          clearInterval(interval);
          resolve();
        }
      } catch (e) {
        // Not ready yet
      }
    }, 1000);
  });
}

async function run() {
  if (!fs.existsSync(OG_DIR)) {
    fs.mkdirSync(OG_DIR, { recursive: true });
  }

  console.log("Starting Next.js server...");
  const server = spawn('npm', ['start'], { stdio: 'ignore' });

  // Make sure we kill the server if the script crashes
  process.on('SIGINT', () => server.kill());
  process.on('SIGTERM', () => server.kill());
  process.on('exit', () => server.kill());

  console.log("Waiting for http://localhost:3000 to be ready...");
  await waitForServer('http://localhost:3000');
  console.log("Server is ready!");

  console.log("Launching Playwright...");
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 2, // High DPI for better quality OG images
    colorScheme: 'dark',
  });

  console.log(`Taking ${TARGETS.length} screenshots in parallel...`);
  
  // To avoid hanging the system, we process in chunks of 5
  const chunkSize = 5;
  for (let i = 0; i < TARGETS.length; i += chunkSize) {
    const chunk = TARGETS.slice(i, i + chunkSize);
    
    await Promise.all(chunk.map(async (target) => {
      const page = await context.newPage();
      try {
        const fullUrl = `http://localhost:3000${target.url}`;
        console.log(`Navigating to ${fullUrl}...`);
        
        // Wait for 'load' instead of 'networkidle' to prevent timeouts
        await page.goto(fullUrl, { waitUntil: 'load' });
        
        // Hide the header/nav to make the tool take up more space in the OG image
        await page.evaluate(() => {
          const nav = document.querySelector('nav');
          if (nav) nav.style.display = 'none';
          const footer = document.querySelector('footer');
          if (footer) footer.style.display = 'none';
        });

        // Add a 3 second delay to ensure all canvas/webassembly/fonts are rendered
        await page.waitForTimeout(3000);

        const dest = path.join(OG_DIR, target.output);
        await page.screenshot({ path: dest });
        console.log(`✅ Saved ${target.output}`);
      } catch (err) {
        console.error(`❌ Failed on ${target.url}:`, err.message);
      } finally {
        await page.close();
      }
    }));
  }

  await browser.close();
  console.log("Finished taking all screenshots!");
  
  console.log("Shutting down Next.js server...");
  server.kill();
  process.exit(0);
}

run().catch(err => {
  console.error("Fatal error:", err);
  process.exit(1);
});
