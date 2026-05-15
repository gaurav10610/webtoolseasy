# Product Strategy: Reimagining WebToolsEasy from the Ground Up

**Version:** 1.0 — For founder review  
**Date:** May 2026  
**Status:** Draft — Awaiting approval before implementation begins

---

## 1. Honest Diagnosis: Why 2+ Years Produced Zero Traction

Before prescribing a direction, we need to be clinically honest about what went wrong.

### 1.1 The Root Cause: We Built Supply, Not Demand

The web tools factory approach assumed: "if we build 110 tools, Google will send traffic." That is not how organic search works in 2026. Google rewards **topical authority** and **depth**, not breadth. A site with 110 shallow tool pages is algorithmically identical to a content farm. Each page competes against category leaders (Convertio, ILovePDF, SmallPDF, JSONFormatter) that have thousands of backlinks, years of domain authority, and entire teams doing SEO. We cannot outrank them.

### 1.2 The Pivot Confusion

The codebase shows three distinct product pivots:

1. **Web Tools Factory** (110+ tools) — abandoned
2. **Private Data Canvas** (node-based developer pipeline) — half-built, abandoned
3. **ArchCost** (visual AWS cost estimator) — current, also incomplete

Each pivot was directionally sound, but none was executed to the depth required to earn user trust and search rankings. The result is a codebase that is architecturally confused and a product that has no clear identity. Users who land on the site today see an AWS cost estimator with 6 service types and no undo button. They leave in 30 seconds.

### 1.3 The Canvas Problem

The ReactFlow canvas (ArchCost) has the right bones but critical UX gaps:

- No undo/redo
- No keyboard shortcuts
- No node alignment or snapping tools
- No shareable URLs (share button is a placeholder)
- Only 6 AWS services (EC2, RDS, S3, Lambda, CloudFront, ALB)
- No architecture templates
- No export to PDF/PNG/CSV
- No comparison mode

A developer landing on this from "aws cost estimator online" will immediately go back to the AWS Pricing Calculator, which at least has breadth even if it's terrible UX.

### 1.4 What Actually Drives Organic Traffic for Tools Sites

Study these examples to understand the pattern:

- **regex101.com** — 1 tool, done incredibly deeply. Explains every part of every regex in plain English. Saves patterns to shareable URLs. Gets millions of monthly visitors.
- **jwt.io** — 1 tool, done properly. Every JWT debugger query in the world routes through it.
- **transform.tools** — ~20 converters, each one clean and fast. Gets significant developer traffic.
- **CyberChef** — Complex, but GitHub hosts it and it gets linked constantly for its specific use cases.

The pattern: **go narrow and become best-in-class**. Not 110 tools at grade C, but 4-5 tools at grade A+.

---

## 2. The Strategic Choice: What To Build

Given the domain name (webtoolseasy.com), the existing ReactFlow infrastructure, the single-founder constraint, and the requirement for real user value, there are two viable directions:

### Option A: Developer Data Workbench (Greenfield)

Build a privacy-first, multi-panel browser workbench for everyday developer data tasks. Think: "VS Code for data manipulation."

### Option B: Polish ArchCost into a Best-in-Class Cloud Planning Tool

Double down on the visual cloud architecture + cost estimator, but build it to the depth it needs. Fix UX, add 50+ services, shareable diagrams, templates, and comparison features.

### Option C (Recommended): Hybrid — Two Best-in-Class Tools + a Growth Engine

Neither Option A nor B alone is sufficient for a single founder to win organic traffic quickly. The recommendation is to build **two flagship tools** — one for the developer data manipulation space and one for cloud cost estimation — each done to depth that earns backlinks and search rankings. Use a **"programmatic SEO" growth engine** to build long-tail organic traffic systematically.

---

## 3. The New Product Vision: "WebToolsEasy Developer Studio"

**Positioning**: _The privacy-first developer studio — where data makes sense and cloud costs become visible._

**Tagline**: _Paste anything. Understand everything. Plan confidently._

**Core Philosophy**:

1. **Zero Trust by Default** — No payload ever touches a server. All processing is client-side. We don't even have the ability to see user data. This is the brand moat.
2. **Depth over Breadth** — Every tool we ship is the best version of that tool on the internet.
3. **Explain, Don't Just Execute** — Every tool teaches. A JWT decoder shows not just the decoded payload but explains what each claim means and why it matters.
4. **Shareable by Design** — Every tool state can be shared via a URL. Sharing the URL shares the tool configuration, never the data.

---

## 4. The Product: Two Flagship Tools

### 4.1 Flagship 1: DevLens — The Universal Developer Data Inspector

**The problem it solves**: Developers constantly encounter opaque data — a JWT they need to debug, a JSON response they need to query, an encoded string they can't read, a timestamp they can't parse. They currently bounce between 8-10 different websites, each ad-ridden and potentially logging their sensitive data.

**The solution**: A single-page "smart workbench" — paste any blob of developer data, and DevLens auto-identifies it and gives you the best possible interactive view of it immediately.

#### The "Smart Paste" Core Mechanic

This is the signature interaction that no other tool has:

```
User pastes:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwi...

DevLens detects: JWT Token
Instantly shows:
  ┌─────────────────────────────────┐
  │ Header      │ Payload    │ Sig  │
  │ alg: HS256  │ sub: 123.. │ ✓    │
  │ typ: JWT    │ iat: 1699..│      │
  └─────────────────────────────────┘

  📋 Claim Explanations (collapsible):
  sub: "Subject" — identifies the user this token represents
  iat: "Issued At" — token was created on Oct 15 2023 at 14:32 UTC
  exp: "Expiration" — token expires in 23 minutes ⚠️
```

**Supported data types and their specialist views**:

| Input Type            | Auto-Detection                  | Specialist View                                                                          |
| --------------------- | ------------------------------- | ---------------------------------------------------------------------------------------- |
| JWT Token             | Header: `eyJ` + two dots        | Decoded header/payload, claim explanations, expiry countdown, signature status indicator |
| JSON                  | Valid JSON                      | Tree view + table view + JSONPath query editor + schema validator + minify/prettify      |
| Base64 (encoded text) | Only base64 chars + `=` padding | Decoded text with charset detection                                                      |
| Base64 (image/PDF)    | Data URL prefix                 | Inline preview + metadata                                                                |
| URL-encoded string    | `%XX` patterns                  | Decoded URL with each param highlighted                                                  |
| Unix Timestamp        | 10-13 digit number              | Calendar date in all major timezones + relative time ("3 days ago")                      |
| UUID                  | UUID pattern                    | Version detection, decoded timestamp (for v1), namespace                                 |
| IPv4 / IPv6           | IP pattern                      | Geolocation (via client-side DB, no API call), CIDR calculator, private/public detection |
| Hex Color             | `#rrggbb`                       | Color swatch, RGB, HSL, named color match, WCAG contrast ratios                          |
| Regex Pattern         | Starts with `/` or flagged      | Real-time test against sample data, explanation in plain English per token               |
| YAML                  | YAML structure                  | Converted to JSON view, validated                                                        |
| XML                   | XML structure                   | Tree view, XPath query editor                                                            |
| CSV                   | Comma/tab separated             | Table view, sort/filter, charts for numeric columns, export to JSON                      |
| Environment File      | `KEY=value` lines               | Table editor, masked secrets toggle, export .env.local format                            |
| Cron Expression       | `* * * * *` pattern             | Next 10 trigger times, human-readable description                                        |
| SQL Query             | SQL keywords                    | Formatted, explained per clause                                                          |
| PEM Certificate       | `-----BEGIN`                    | Decoded fields, expiry, subject, issuer, SAN                                             |

#### Secondary Features

- **Multi-panel mode**: Open up to 4 panels side-by-side. Each panel gets its own detected type and specialist view. Drag output from one panel as input to another.
- **Transform chain**: Within a panel, apply sequential transforms (e.g., URL decode → base64 decode → JSON parse → JSONPath query).
- **History**: Last 20 inputs stored in localStorage, never on server. One-click recall.
- **Shareable configs**: Share the tool configuration (which panels are open, what transforms are active) via URL. The data is never in the URL.
- **Keyboard-first**: Power users can do everything without a mouse.

#### Why This Gets Organic Traffic

Each data type becomes a content-rich landing page:

- `/tools/jwt-decoder` — "How to decode a JWT token: complete guide" (targets: "decode jwt", "jwt token debugger", "jwt claims explained")
- `/tools/json-query` — "Query JSON data online with JSONPath" (targets: "jsonpath online", "query json online", "json to table")
- `/tools/timestamp-converter` — "Unix timestamp to date converter" (targets: "epoch time converter", "unix timestamp online")
- `/tools/regex-tester` — "Regex tester with explanation" (targets: "regex tester", "test regular expression online", "explain regex")

**Each page** includes: the interactive tool + comprehensive educational guide + common use cases + FAQ structured data + canonical link. This is topical authority, not link farming.

**Programmatic SEO pages** (low effort, high volume):

- `/jwt/claims/{claim-name}` — e.g., `/jwt/claims/exp` explains the `exp` claim, when to use it, security implications. Pre-loads the JWT tool with an example. ~40 pages, each targeting a specific query.
- `/regex/patterns/{pattern-name}` — e.g., `/regex/patterns/email-validation` with pre-loaded regex example. ~100 pages.
- `/timestamps/{timezone}` — e.g., `/timestamps/asia-kolkata` — current time + converter with that timezone pre-selected.

---

### 4.2 Flagship 2: ArchCost — Visual Cloud Architecture + Cost Planner (Revamped)

**The current ArchCost is the right idea, badly executed.** The AWS Pricing Calculator is notoriously terrible — complex, unintuitive, and requires deep AWS knowledge to use correctly. There is genuine search volume and user pain here.

The revamped ArchCost keeps the ReactFlow canvas but rebuilds it with the depth it needs to become best-in-class.

#### What "Best-in-Class" Means for ArchCost

**Canvas UX (non-negotiable basics — fix first)**:

- Full undo/redo (`Cmd+Z` / `Ctrl+Z`)
- Multi-select nodes (shift+click or drag selection)
- Keyboard shortcuts (delete to remove, arrow keys to nudge)
- Auto-snap and alignment guides
- Right-click context menu on nodes
- Node copy/paste (`Cmd+C/V`)
- Pan with space+drag or middle mouse button

**Architecture depth**:

Expand from 6 to 40+ AWS services across categories:

| Category      | Services                                                                  |
| ------------- | ------------------------------------------------------------------------- |
| Compute       | EC2, Lambda, ECS (Fargate), EKS, Lightsail, Elastic Beanstalk             |
| Database      | RDS (MySQL/Postgres/Aurora), DynamoDB, ElastiCache, DocumentDB, Neptune   |
| Storage       | S3, EFS, EBS, FSx, Glacier                                                |
| Networking    | ALB, NLB, API Gateway, CloudFront, Route 53, VPC NAT Gateway, PrivateLink |
| AI/ML         | Bedrock (per-token pricing), SageMaker endpoints, Textract, Rekognition   |
| Messaging     | SQS, SNS, EventBridge, Kinesis                                            |
| Dev Tools     | CodeBuild, CodePipeline, Secrets Manager, KMS                             |
| Observability | CloudWatch (metrics + logs + alarms)                                      |

**Pricing depth**:

- On-demand vs Reserved vs Spot instance comparison within the node config
- Data transfer costs between nodes (the most commonly missed cost)
- Region pricing differences
- Free tier awareness (highlights what is within free tier)
- Monthly cost breakdown as a pie chart in the sidebar

**Power features**:

- **Architecture Templates**: "Startup Baseline" (EC2 + RDS + S3 + CloudFront), "Serverless API" (Lambda + API Gateway + DynamoDB), "ML Pipeline" (SageMaker + S3 + Lambda). One click to load. Immediately useful.
- **Cost Comparison Mode**: Create two side-by-side architecture canvases and compare their costs. "What if I go serverless vs VM-based?"
- **Shareable Diagrams**: Serialize the full architecture to a compressed URL parameter (no server needed). Send to your CTO, your team, your AWS sales rep. The shared URL is read-only; recipient can click "fork to edit."
- **Export**: PNG (for documentation), PDF (for proposals), CSV (cost breakdown per service), Terraform scaffold (future phase).
- **Annotations**: Add sticky notes/comments to the canvas explaining architecture decisions. Included in exports.
- **GCP Support** (Phase 2): Add Google Cloud services. This doubles the addressable market and creates a "compare AWS vs GCP cost" feature no competitor has.

#### Why ArchCost Gets Organic Traffic

The search queries are high-intent and underserved:

| Query                           | Monthly Volume | Current Leader                 | Our Advantage                  |
| ------------------------------- | -------------- | ------------------------------ | ------------------------------ |
| "aws cost estimator"            | 33,000         | AWS Calculator (terrible UX)   | Visual, instant, no login      |
| "aws ec2 pricing calculator"    | 18,000         | AWS pricing page               | Interactive, shows total stack |
| "aws architecture diagram tool" | 8,100          | draw.io, Lucidchart (overkill) | Cost-integrated, AWS-native    |
| "aws lambda cost calculator"    | 6,600          | Various calculators            | Connected to full stack cost   |
| "serverless architecture cost"  | 2,400          | Blog posts                     | Interactive estimator          |

Programmatic pages (static generation, no server cost):

- `/calculators/aws-ec2-{instance-type}` — e.g., "AWS t3.medium monthly cost" with pre-loaded canvas showing just that instance. ~30 pages.
- `/architectures/{template-slug}` — e.g., "serverless-api-cost" with a pre-loaded architecture. ~20 pages.
- `/compare/{service-a}-vs-{service-b}` — e.g., "ec2-vs-lambda" with split canvas. ~15 pages.

---

## 5. What to Throw Away

Be ruthless. The following **should be removed or archived** to eliminate confusion, reduce maintenance burden, and improve site cohesion:

| What                                                  | Why Remove                                                |
| ----------------------------------------------------- | --------------------------------------------------------- |
| 110-tool factory (case converter, word counter, etc.) | No differentiation, zero chance of ranking, dilutes brand |
| "Workflow Packs" system                               | Too abstract, no real usage, complex to maintain          |
| Tool categories page                                  | Irrelevant once tools are removed                         |
| Blog posts tied to old tools                          | Update or archive to align with new positioning           |
| Python compiler, JS editor, etc.                      | Dominated by Replit, CodePen, etc. — no way to compete    |
| PDF editor, video tools                               | Dominated by category leaders with massive link profiles  |
| Text summarizer, paraphrasing tool                    | Now completely outclassed by ChatGPT-based tools          |

**Keep**:

- The Next.js / TypeScript / ReactFlow stack — it's solid and appropriate
- The canvas architecture (ArchCost) — refactor and expand
- The domain webtoolseasy.com — redirect old tool URLs to either new tools or a 410 page

---

## 6. Technical Architecture

### 6.1 Stack (Minimal Changes from Current)

```
Frontend:     Next.js (App Router) + React + TypeScript — keep as-is
Styling:      Tailwind CSS — keep as-is
Canvas:       ReactFlow — keep for ArchCost
State:        Zustand — keep for canvas state
WASM:         Add: sql.js-httpvfs or DuckDB-WASM for CSV querying
              Add: regex WASM library for explanation engine
Storage:      localStorage for history/favorites (no server needed)
Database:     Turso (libSQL/SQLite) — ONLY for shared content features:
              - Saved regex patterns (user can name and share)
              - Saved ArchCost architectures (shareable URLs with slugs)
              Free tier: 500MB storage, 1B row reads/month — more than enough
Hosting:      Vercel (current) — keep
CDN/Images:   Vercel's built-in CDN
```

### 6.2 Database Schema (Frugal — Only What's Needed)

Only needed for the "share by short URL" feature. Everything else uses URL parameters or localStorage.

```sql
-- Named/shared ArchCost architectures
CREATE TABLE architectures (
  id         TEXT PRIMARY KEY,  -- nanoid, 8 chars
  slug       TEXT UNIQUE,       -- human-readable optional name
  data       TEXT NOT NULL,     -- JSON: {nodes, edges, meta}
  created_at INTEGER NOT NULL,
  view_count INTEGER DEFAULT 0
);

-- Community shared regex patterns (opt-in, user names their pattern)
CREATE TABLE regex_patterns (
  id          TEXT PRIMARY KEY,
  slug        TEXT UNIQUE,      -- e.g., "email-validation"
  pattern     TEXT NOT NULL,
  flags       TEXT,
  description TEXT,
  created_at  INTEGER NOT NULL,
  use_count   INTEGER DEFAULT 0
);
```

No user accounts. No authentication. Share by URL. Simple, frugal, zero auth maintenance.

### 6.3 URL Structure

```
/                          — Landing page (DevLens + ArchCost combined pitch)
/studio                    — DevLens workbench (the multi-panel smart paste tool)
/tools/jwt-decoder         — JWT tool landing page (SEO + inline tool)
/tools/json-query          — JSON tool landing page
/tools/regex-tester        — Regex tool landing page
/tools/timestamp-converter — Timestamp tool landing page
/tools/base64              — Base64 tool landing page
/tools/env-file-editor     — .env file tool landing page
/canvas                    — ArchCost canvas
/calculators/aws-ec2-t3-medium — Programmatic calculator page (pre-loaded canvas)
/architectures/serverless-api  — Architecture template page (pre-loaded canvas)
/shared/{id}               — Load a shared architecture
/patterns/{slug}           — Load a shared regex pattern
```

### 6.4 Performance Constraints (Frugal)

- All tool pages: static generation (no server-side computation)
- WASM loaded lazily on tool interaction, not on page load
- Turso is queried only for share/load operations (< 100 req/day expected initially)
- No image processing on server — all client-side via Canvas API
- Target: < 100ms TTFB, < 2.5s LCP on all tool pages

---

## 7. Phased Roadmap

### Phase 0: Foundation Cleanup (Week 1-2)

_"Clear the deck before building the ship"_

- [ ] Remove all 110 tool pages from the site (404 or 410 redirect old URLs)
- [ ] Remove Workflow Packs system
- [ ] Fix ArchCost canvas UX blocking issues: undo/redo, multi-select, keyboard delete
- [ ] Add shareable URL to ArchCost (base64 encode canvas state into URL param)
- [ ] Add 3 architecture templates (Startup, Serverless API, Data Pipeline)
- [ ] Rewrite landing page to position both DevLens and ArchCost clearly
- [ ] Update sitemap, robots.txt, and redirects

### Phase 1: DevLens MVP (Week 3-6)

_"Make the Smart Paste magic real"_

- [ ] Build the core Smart Paste engine: auto-detect data type from clipboard
- [ ] Implement JWT Specialist View (decode + claim explanations + expiry countdown)
- [ ] Implement JSON Specialist View (tree + table + JSONPath query + prettify/minify)
- [ ] Implement Base64 Specialist View (decode + encode + image preview if base64 data URL)
- [ ] Implement Timestamp Specialist View (date in 6 major timezones + relative time)
- [ ] Implement URL-encoded Specialist View (decoded params as table)
- [ ] Single-panel `/studio` page live with auto-detection
- [ ] Write deep SEO content for each tool's landing page (`/tools/jwt-decoder`, etc.)

### Phase 2: ArchCost Expansion (Week 7-10)

_"Make the cost estimator actually useful"_

- [ ] Expand to 30+ AWS services (see service list in Section 4.2)
- [ ] Add data transfer costs between connected nodes
- [ ] Add On-demand vs Reserved cost comparison in node config
- [ ] Add cost breakdown pie chart in sidebar
- [ ] Export to PNG, PDF, CSV
- [ ] Turso integration for shareable architecture URLs (`/shared/{id}`)
- [ ] Build 20 programmatic calculator pages with pre-loaded canvas
- [ ] Write deep SEO content for ArchCost landing page

### Phase 3: DevLens Depth (Week 11-14)

_"Go deeper on the tools people actually use"_

- [ ] Multi-panel mode (up to 4 panels)
- [ ] Regex Specialist View with plain-English explanation per token
- [ ] CSV/TSV Specialist View with sortable table and basic charts
- [ ] Env file Specialist View with masked secrets toggle
- [ ] UUID Specialist View (version detect, timestamp decode for v1)
- [ ] PEM Certificate Specialist View
- [ ] Cron Expression Specialist View (next 10 runs + human description)
- [ ] History panel (last 20 inputs in localStorage)
- [ ] Programmatic SEO pages: `/jwt/claims/*`, `/regex/patterns/*`

### Phase 4: Growth & Community (Month 4-5)

_"Turn users into distribution"_

- [ ] Community regex library: users can name and share patterns (`/patterns/{slug}`)
- [ ] GCP services added to ArchCost
- [ ] Architecture comparison mode (two canvases side-by-side)
- [ ] "Fork this architecture" button on shared architecture pages
- [ ] VS Code extension (optional): right-click any selected text → "Open in DevLens"
- [ ] Import from Postman/Insomnia collection to pre-populate JWT/JSON tools

### Phase 5: Monetization Hooks (Month 6+)

_"Keep it free forever for individuals, optional pro for teams"_

Even though the product stays free, leave hooks for optional future monetization:

- [ ] Turso: unlimited saved architectures (current free tier: generous)
- [ ] Consider a "Pro" tier later: team shared workspaces, private pattern library, export to Terraform/Pulumi (never required for core features)

---

## 8. SEO & Growth Strategy

### 8.1 The Content Moat

The single most important SEO investment is creating genuinely educational, comprehensive content around each tool. Not "SEO content" — actual documentation that developers would bookmark and reference.

**For DevLens tools**: Each landing page should answer:

- "What is [data format] and how does it work?"
- "How do I read/debug [data format]?"
- "What are common [data format] errors and how to fix them?"
- "Security considerations for [data format]"
- Interactive tool embedded in the page (not just linked to)

**For ArchCost**: Each calculator page should answer:

- "How is [service] priced?"
- "What are the hidden costs of [service]?"
- "Real-world cost examples for [service]"
- Pre-loaded interactive estimator

### 8.2 Backlink Strategy (Realistic for Solo Founder)

- **GitHub**: Open source the entire codebase (already done). Developer tools that are open source get linked from developer blogs and GitHub Awesome lists naturally.
- **Hacker News**: A genuine "Show HN" for the Smart Paste feature. This is exactly the kind of thing HN loves: clever, technically interesting, privacy-respecting.
- **Twitter/X developer community**: Post demos of the Smart Paste feature. Short screen recordings of pasting a JWT and getting instant decoded explanations. Developers share these.
- **Dev.to / Hashnode**: Write "I built a privacy-first JWT debugger" articles linking back to the tool.
- **Reddit** (r/webdev, r/programming): "What tools do you use to debug JWTs? I built something that auto-detects..." — genuine community engagement.
- **Product Hunt**: Launch with a strong focus on the privacy angle ("0 bytes sent to any server").

### 8.3 The "Privacy" Brand Angle

This is the key differentiator that is both true and shareable:

> _"Every tool on WebToolsEasy runs 100% in your browser. Your JWT tokens, API keys, and sensitive data never leave your machine — not because we promise it, but because our server has no ability to receive it. Open source and verifiable."_

This resonates deeply with security-conscious developers, gets shared on Twitter, and creates a durable SEO angle: "jwt decoder no data uploaded", "base64 decode offline", "json formatter privacy", etc.

---

## 9. Success Metrics

### 3-Month Targets

- 500+ daily active users on DevLens
- 200+ daily active users on ArchCost
- 10+ organic backlinks from developer blogs/tools lists
- Top 10 ranking for at least 5 long-tail queries (e.g., "decode jwt claims online", "aws ec2 cost estimator visual")

### 6-Month Targets

- 2,000+ daily active users
- 50+ community-shared regex patterns
- 100+ community-shared architectures (saved and linked)
- Top 3 ranking for 20+ queries
- Featured in at least 1 major developer newsletter (TLDR, JavaScript Weekly, etc.)

### 12-Month Targets

- 10,000+ monthly active users
- Organic search as primary traffic channel (> 60% of sessions)
- At least one "brand search" — users actively searching "webtoolseasy jwt" or "archcost estimator"

---

## 10. What Makes This Different from Every Previous Attempt

| Previous Approach                         | New Approach                                                    |
| ----------------------------------------- | --------------------------------------------------------------- |
| 110 shallow tools                         | 10 deep tools, each best-in-class                               |
| Collection of disconnected tools          | One unified workbench + one flagship canvas                     |
| Build and pray for SEO                    | Active content strategy per tool                                |
| Complex pipelines for simple tasks        | Smart auto-detection: paste and instantly understand            |
| Generic positioning ("free online tools") | Specific positioning ("privacy-first developer data inspector") |
| No sharing/virality mechanism             | Shareable URLs for everything                                   |
| UX afterthought                           | UX is the product: keyboard-first, explain-while-doing          |
| Half-built feature after feature          | Fewer features, each polished to production quality             |

---

## 11. Decision Points for Founder Review

Before implementation begins, please confirm:

1. **Product scope**: Do you want to pursue both DevLens + ArchCost, or focus exclusively on one? Recommendation: do both, ArchCost in Phase 0-1 (it's closer to done), DevLens in parallel.

2. **Database**: Turso (libSQL, generous free tier, SQLite-compatible) for shared architecture URLs. No auth needed. Acceptable?

3. **Domain**: webtoolseasy.com stays. ArchCost is a named product at `/canvas`. DevLens is a named product at `/studio`. Both under the same domain. Or do you want to eventually move ArchCost to archcost.io? For now, stay on webtoolseasy.com.

4. **Old tools**: 301 redirect them to the new tools pages where there is overlap (e.g., `/tools/json-formatter` → `/tools/json-query`), 410 (Gone) for the rest (case converter, word counter, etc.). Agree?

5. **Branding**: "WebToolsEasy Developer Studio" as the product name, with DevLens and ArchCost as the two tool brands? Or prefer a different name for the suite?

---

_This document represents a complete reimagining of the product. Once confirmed, implementation can begin with Phase 0 (cleanup + ArchCost UX fixes) in Week 1._
