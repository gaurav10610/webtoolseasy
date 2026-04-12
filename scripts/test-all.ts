#!/usr/bin/env tsx

import { spawnSync } from "child_process";

type Step = {
  name: string;
  command: string;
  args: string[];
};

const steps: Step[] = [
  { name: "Build", command: "npm", args: ["run", "build"] },
  { name: "Unit Tests", command: "npm", args: ["run", "test:unit"] },
  { name: "E2E Tests", command: "npm", args: ["run", "test:e2e"] },
];

function runStep(step: Step): void {
  console.log(`\n=== ${step.name} ===`);
  const result = spawnSync(step.command, step.args, {
    stdio: "inherit",
    shell: true,
    env: process.env,
  });

  if (result.status !== 0) {
    console.error(`\n${step.name} failed with exit code ${result.status ?? 1}`);
    process.exit(result.status ?? 1);
  }
}

function main(): void {
  for (const step of steps) {
    runStep(step);
  }
  console.log("\nAll checks passed: build, unit tests, and E2E tests.");
}

main();
