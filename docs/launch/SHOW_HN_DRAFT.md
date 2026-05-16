# Show HN Draft

Title: Show HN: DevLens + ArchCost (local-first data inspector and visual AWS cost planner)

I built WebToolsEasy after repeatedly context-switching between small one-off web tools and custom local scripts.

The project has two technical pillars:

1. DevLens Smart Paste engine

- A deterministic detector classifies pasted input types (JWT, JSON, regex, timestamps, certs, etc.) with confidence levels.
- Each type maps to a specialist renderer that exposes structure and semantics (for example JWT claim explanation, regex token breakdown, XML/XPath, CSV type inference).
- The design goal was low-latency local parsing with minimal dependency overhead.

2. ArchCost visual cost modeling

- AWS service nodes are schema-driven (single registry for config forms + defaults + pricing mapping).
- Pricing data is pulled into a compact generated dataset with fallback baselines.
- Edge-level transfer pricing is first-class, so cost includes service-to-service bandwidth (often missed in rough estimates).
- Added side-by-side comparison mode to evaluate two architecture options and compute monthly/yearly deltas.

Implementation notes:

- Next.js app router + client-heavy local processing
- Zustand + temporal history for canvas interactions
- React Flow for graph editing
- Playwright + Vitest for focused regression coverage
- PNG/PDF/CSV export flows run client-side

Would love feedback on:

- detector heuristics for ambiguous payloads
- pricing-model assumptions by service
- better approaches for keeping geolocation/pricing datasets compact and fresh

If you try it, I recommend starting with /studio, then /canvas.
