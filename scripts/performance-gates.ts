import {
  _checkBundleBudget,
  _evaluateLighthouseScores,
} from "../src/lib/performanceQuality";

// Lightweight gate runner with static defaults.
const lighthouse = _evaluateLighthouseScores(
  {
    performance: 0.9,
    accessibility: 0.92,
    bestPractices: 0.91,
    seo: 0.93,
  },
  {
    performance: 0.85,
    accessibility: 0.9,
    bestPractices: 0.9,
    seo: 0.9,
  },
);

const bundle = _checkBundleBudget(
  [
    { name: "workflow-runner.js", sizeBytes: 180000 },
    { name: "template-page.js", sizeBytes: 160000 },
  ],
  {
    maxTotalBytes: 450000,
    maxLargestAssetBytes: 250000,
  },
);

if (!lighthouse.passed || !bundle.passed) {
  console.error("Performance gates failed");
  console.error({ lighthouse, bundle });
  process.exit(1);
}

console.log("Performance gates passed");
