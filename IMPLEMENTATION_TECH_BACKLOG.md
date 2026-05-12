# WebToolsEasy Master Technical Backlog (Flat List)

This is a single comprehensive backlog list for implementing everything in PRODUCT_STRATEGY_REIMAGINATION_2026.md.

Rules applied in this backlog:

- No phased roadmap sections.
- No epic timeline sequencing.
- One flat itemized list with IDs.
- Covers product, architecture, UX, SEO, telemetry, experiments, privacy, quality, and optional Docker local DB sync.

Priority legend:

- P0 = required for workflow pivot launch
- P1 = required for retention/growth loops
- P2 = optimization/hardening

Estimate legend:

- XS (0.5-1d), S (1-2d), M (3-5d), L (1-2w)

## Status Summary

- DONE: implementation complete and validated in this repo
- PARTIAL: baseline scaffold exists but full backlog intent not yet complete
- TODO: not implemented yet

## Master Backlog Items

1. TB-001 | P0 | S | Define workflow domain glossary in code comments and docs (pack, step, run, artifact, preset, recipe). | Status: PARTIAL
2. TB-002 | P0 | M | Create TypeScript workflow core types for packs, steps, transitions, and outputs. | Status: DONE
3. TB-003 | P0 | M | Add runtime schema validation for workflow pack configs. | Status: PARTIAL
4. TB-004 | P0 | S | Add config linting utility to fail invalid pack definitions in CI. | Status: PARTIAL
5. TB-005 | P0 | S | Add reusable typed workflow error model (validation, transform, export, unknown). | Status: PARTIAL
6. TB-006 | P0 | S | Add workflow state machine model (idle, running, blocked, completed, failed). | Status: PARTIAL
7. TB-007 | P0 | S | Add feature flags for workflow-first navigation and page exposure. | Status: DONE
8. TB-008 | P0 | XS | Add feature flag defaults in environment template. | Status: DONE
9. TB-009 | P0 | S | Add typed server/client boundary utilities for local-only step enforcement. | Status: DONE
10. TB-010 | P0 | M | Implement per-step privacy metadata contract (local-only/network/export-only). | Status: DONE
11. TB-011 | P0 | S | Build privacy badge component for workflow steps. | Status: DONE
12. TB-012 | P0 | S | Build per-step "how data flows" explanation panel. | Status: DONE
13. TB-013 | P0 | S | Add guard utility that blocks accidental upload calls for local-only steps. | Status: PARTIAL
14. TB-014 | P0 | S | Add ESLint/custom static check for disallowed imports in local-only steps. | Status: PARTIAL
15. TB-015 | P0 | M | Build workflow runner shell page with step rail and execution panel. | Status: DONE
16. TB-016 | P0 | S | Implement step lifecycle UI states (loading/success/error/retry). | Status: DONE
17. TB-017 | P0 | S | Add run-level summary panel showing changed outputs. | Status: DONE
18. TB-018 | P0 | S | Add workflow cancellation and safe reset behavior. | Status: PARTIAL
19. TB-019 | P0 | M | Build workflow step adapter interface for wrapping existing tools. | Status: PARTIAL
20. TB-020 | P0 | M | Implement JSON tool adapters (format/validate/transform). | Status: PARTIAL
21. TB-021 | P0 | M | Implement markdown/content adapters. | Status: PARTIAL
22. TB-022 | P0 | M | Implement image optimization adapters. | Status: PARTIAL
23. TB-023 | P0 | M | Implement SEO audit adapters (robots/sitemap/meta/schema checks). | Status: PARTIAL
24. TB-024 | P0 | S | Implement diff snapshot adapter. | Status: PARTIAL
25. TB-025 | P0 | S | Build standardized artifact model (name, type, sourceStep, checksum, size). | Status: PARTIAL
26. TB-026 | P0 | S | Build artifact export pipeline and multi-file bundle download. | Status: PARTIAL
27. TB-027 | P0 | S | Add run summary JSON export. | Status: PARTIAL
28. TB-028 | P0 | XS | Add user-visible output manifest in completion UI. | Status: PARTIAL
29. TB-029 | P0 | M | Implement Workflow Pack: API Payload Cleanup (end-to-end). | Status: PARTIAL
30. TB-030 | P0 | L | Implement Workflow Pack: Blog Publish (end-to-end). | Status: PARTIAL
31. TB-031 | P0 | L | Implement Workflow Pack: Technical SEO Quick Audit (end-to-end). | Status: PARTIAL
32. TB-032 | P1 | L | Implement Workflow Pack: Private Document Prep. | Status: PARTIAL
33. TB-033 | P1 | L | Implement Workflow Pack: Media Publish. | Status: PARTIAL
34. TB-034 | P0 | M | Add IndexedDB storage layer for projects, runs, presets, and recent activity. | Status: DONE
35. TB-035 | P0 | S | Add local storage schema versioning and migration utility. | Status: PARTIAL
36. TB-036 | P0 | M | Implement presets CRUD (create/rename/clone/delete). | Status: DONE
37. TB-037 | P0 | S | Implement "run from preset" one-click action. | Status: DONE
38. TB-038 | P0 | L | Implement project workspace model and project switcher. | Status: PARTIAL
39. TB-039 | P0 | M | Implement assignment of runs/artifacts to project context. | Status: PARTIAL
40. TB-040 | P1 | S | Build recent timeline and continue-last-run shortcut. | Status: DONE
41. TB-041 | P1 | S | Add smart next-step recommendation engine (rule-based v1). | Status: DONE
42. TB-042 | P1 | S | Add cross-tool chaining hints on completion screens. | Status: DONE
43. TB-043 | P1 | M | Add pre-export validation checks (lint/quality/security basics). | Status: DONE
44. TB-044 | P1 | S | Add pre-export validation report UI. | Status: DONE
45. TB-045 | P1 | S | Define recipe serialization schema. | Status: PARTIAL
46. TB-046 | P1 | S | Add recipe schema validator and integrity checks. | Status: PARTIAL
47. TB-047 | P1 | M | Implement shareable recipe URL generation. | Status: PARTIAL
48. TB-048 | P1 | M | Implement recipe import-from-URL flow. | Status: DONE
49. TB-049 | P1 | S | Add recipe clone action into runner. | Status: DONE
50. TB-050 | P1 | M | Build templates index page. | Status: DONE
51. TB-051 | P1 | M | Build template detail page with clone/run CTA. | Status: DONE
52. TB-052 | P1 | S | Add template filters by workflow category/use case. | Status: DONE
53. TB-053 | P1 | S | Add template quality scoring heuristic to prevent low-value duplicates. | Status: DONE
54. TB-054 | P0 | M | Rewrite primary navigation to workflow-first IA. | Status: DONE
55. TB-055 | P0 | M | Redesign homepage hero and messaging from tool-count to outcome-focused. | Status: DONE
56. TB-056 | P0 | S | Demote tools directory to secondary navigation and discovery routes. | Status: DONE
57. TB-057 | P1 | S | Add bridge CTAs from high-traffic tool pages to relevant workflows. | Status: DONE
58. TB-058 | P1 | S | Add "This is better as workflow" inline hints in selected tool pages. | Status: DONE
59. TB-059 | P1 | M | Create workflows listing page with pack cards and benefits. | Status: DONE
60. TB-060 | P1 | M | Create dedicated landing pages for each workflow pack. | Status: DONE
61. TB-061 | P0 | S | Add SEO metadata for workflow pages (title/description/canonical). | Status: DONE
62. TB-062 | P0 | S | Add structured data for workflow pages and template pages. | Status: PARTIAL
63. TB-063 | P1 | S | Add FAQ/HowTo schema for workflow guides where applicable. | Status: DONE
64. TB-064 | P1 | M | Build JSON-LD script injection components and hooks. | Status: DONE
65. TB-065 | P1 | M | Create initial workflow-focused blog content set for launch packs. | Status: TODO
66. TB-066 | P1 | S | Add internal linking map between workflows, templates, and blog posts. | Status: TODO
67. TB-067 | P1 | S | Add crawl/index quality checks for new workflow/template routes. | Status: TODO
68. TB-068 | P0 | M | Define privacy-safe analytics event schema. | Status: DONE
69. TB-069 | P0 | S | Implement event emitter utility with strict payload typing. | Status: DONE
70. TB-070 | P0 | S | Track workflow_opened event. | Status: DONE
71. TB-071 | P0 | S | Track step_completed event. | Status: DONE
72. TB-072 | P0 | S | Track workflow_completed event. | Status: DONE
73. TB-073 | P0 | S | Track export_generated event. | Status: DONE
74. TB-074 | P1 | S | Track preset_saved event. | Status: DONE
75. TB-075 | P1 | S | Track recipe_shared event. | Status: DONE
76. TB-076 | P1 | S | Track template_cloned event. | Status: DONE
77. TB-077 | P0 | XS | Add event payload redaction tests to ensure no raw file content leaves browser. | Status: DONE
78. TB-078 | P1 | S | Build WCW metric computation service (client/server compatible). | Status: TODO
79. TB-079 | P1 | S | Build funnel metrics for entry, completion, and drop-off by step. | Status: TODO
80. TB-080 | P1 | S | Create founder dashboard view for activation/retention/growth metrics. | Status: TODO
81. TB-081 | P0 | S | Add A/B test framework hooks for workflow-first vs tools-first entry messaging. | Status: PARTIAL
82. TB-082 | P1 | S | Implement experiment 1 instrumentation (workflow entry intent). | Status: TODO
83. TB-083 | P1 | S | Implement experiment 2 instrumentation (preset utility). | Status: TODO
84. TB-084 | P1 | S | Implement experiment 3 instrumentation (recipe growth loop). | Status: TODO
85. TB-085 | P1 | S | Implement experiment 4 instrumentation (privacy message specificity). | Status: TODO
86. TB-086 | P1 | XS | Add experiment readout templates and decision criteria in docs. | Status: TODO
87. TB-087 | P0 | M | Add unit test suite for workflow config parsing and validation. | Status: DONE
88. TB-088 | P0 | M | Add unit test suite for runner transitions and error handling. | Status: PARTIAL
89. TB-089 | P0 | M | Add E2E tests for API Payload Cleanup pack. | Status: DONE
90. TB-090 | P0 | M | Add E2E tests for Blog Publish pack. | Status: DONE
91. TB-091 | P0 | M | Add E2E tests for Technical SEO Quick Audit pack. | Status: DONE
92. TB-092 | P0 | S | Add privacy regression test to detect unexpected outbound network in local-only steps. | Status: DONE
93. TB-093 | P1 | S | Add synthetic performance tests for workflow completion under common file sizes. | Status: TODO
94. TB-094 | P1 | S | Add accessibility checks for runner, templates, and workflow landing pages. | Status: TODO
95. TB-095 | P1 | S | Add localization-ready string key extraction for new workflow surfaces. | Status: TODO
96. TB-096 | P0 | XS | Define coding conventions for new workflow module directories. | Status: DONE
97. TB-097 | P0 | S | Add workflow module scaffold generator script for rapid pack creation. | Status: DONE
98. TB-098 | P1 | S | Add developer docs for creating new pack adapters. | Status: DONE
99. TB-099 | P1 | S | Add troubleshooting docs for privacy guardrail failures. | Status: DONE
100. TB-100 | P1 | XS | Add architecture decision record for workflow engine design choices. | Status: DONE
101. TB-101 | P1 | XS | Add architecture decision record for local-first storage approach. | Status: DONE
102. TB-102 | P1 | XS | Add architecture decision record for recipe sharing format. | Status: DONE
103. TB-103 | P1 | XS | Add architecture decision record for telemetry stack choice. | Status: DONE
104. TB-104 | P0 | S | Add robots/sitemap updates for new workflow and template routes. | Status: DONE
105. TB-105 | P1 | S | Add automated sitemap inclusion tests for workflow/template/blog clusters. | Status: DONE
106. TB-106 | P1 | XS | Add canonical consistency checker for duplicate path patterns. | Status: DONE
107. TB-107 | P1 | M | Add category landing rewrites emphasizing outcomes not tool count. | Status: TODO
108. TB-108 | P1 | S | Add quality gates for template page uniqueness (title/meta/content overlap thresholds). | Status: DONE
109. TB-109 | P1 | S | Add anti-thin-content checks for generated template pages. | Status: DONE
110. TB-110 | P1 | S | Add observable "time-to-first-output" metric and alarms. | Status: DONE
111. TB-111 | P1 | S | Add "completion under 2 minutes" success indicator per pack. | Status: DONE
112. TB-112 | P1 | S | Add retention cohort tracking for users with vs without presets. | Status: DONE
113. TB-113 | P1 | S | Add repeat usage tracking by project workspace utilization. | Status: DONE
114. TB-114 | P1 | S | Add recipe viewer-to-clone conversion tracking. | Status: DONE
115. TB-115 | P1 | XS | Add baseline KPI docs aligned to WCW and funnel goals. | Status: DONE
116. TB-116 | P0 | S | Ensure all existing tool URLs continue to resolve after IA changes. | Status: DONE
117. TB-117 | P0 | S | Add regression test for tool route continuity and canonical integrity. | Status: DONE
118. TB-118 | P1 | S | Add migration messaging for old tool users entering workflow-first UI. | Status: DONE
119. TB-119 | P1 | S | Add in-product onboarding tooltip flow for new workflow users. | Status: DONE
120. TB-120 | P1 | XS | Add sample input datasets for each launch workflow pack. | Status: DONE
121. TB-121 | P1 | XS | Add one-click "try sample" button to reduce cold-start friction. | Status: DONE
122. TB-122 | P1 | S | Add export naming convention utility for predictable file outputs. | Status: DONE
123. TB-123 | P1 | S | Add artifact checksum and integrity verification in exported manifests. | Status: DONE
124. TB-124 | P1 | S | Add undo/back navigation support inside workflow runs where feasible. | Status: DONE
125. TB-125 | P1 | XS | Add warning for irreversible transformations before execution. | Status: PARTIAL
126. TB-126 | P1 | S | Add client resource usage warnings for very large files. | Status: DONE
127. TB-127 | P1 | XS | Add safe fallback for browsers lacking required APIs. | Status: DONE
128. TB-128 | P1 | XS | Add capability detection banner and degraded mode handling. | Status: DONE
129. TB-129 | P2 | S | Add pack execution queue for handling multi-run requests gracefully. | Status: DONE
130. TB-130 | P2 | S | Add optional background processing UX for long-running client steps. | Status: DONE
131. TB-131 | P2 | XS | Add cache strategy for static workflow/template content assets. | Status: DONE
132. TB-132 | P2 | S | Add memory pressure recovery strategy for large browser processing jobs. | Status: DONE
133. TB-133 | P2 | S | Add retry strategy standardization for network-required non-local steps. | Status: DONE
134. TB-134 | P2 | S | Add resilience tests for interrupted sessions and tab reloads. | Status: DONE
135. TB-135 | P2 | XS | Add workflow run archival policy for local storage cleanup. | Status: DONE
136. TB-136 | P2 | XS | Add configurable local retention limits for runs/artifacts. | Status: DONE
137. TB-137 | P1 | S | Add embed-mode route for selected lightweight workflows. | Status: DONE
138. TB-138 | P1 | XS | Add embed security headers and origin restrictions. | Status: DONE
139. TB-139 | P1 | S | Add template submission flow for community-contributed recipes (local draft first). | Status: TODO
140. TB-140 | P1 | S | Add moderation checklist pipeline for public template publication. | Status: TODO
141. TB-141 | P1 | XS | Add abuse/spam prevention checks for template titles/descriptions. | Status: DONE
142. TB-142 | P1 | XS | Add template versioning and update history metadata. | Status: DONE
143. TB-143 | P1 | XS | Add template clone count and popularity ranking logic. | Status: DONE
144. TB-144 | P1 | XS | Add challenge page framework for benchmark/before-after storytelling. | Status: TODO
145. TB-145 | P1 | S | Add workflow benchmark data capture method (privacy-safe aggregate only). | Status: TODO
146. TB-146 | P1 | XS | Add "why this workflow" proof section component for pages. | Status: TODO
147. TB-147 | P1 | XS | Add trust badge component for transparent local-processing claims. | Status: TODO
148. TB-148 | P1 | XS | Add privacy disclaimer update to align with workflow-specific behavior. | Status: TODO
149. TB-149 | P1 | XS | Add legal copy for recipe sharing and template publication terms. | Status: TODO
150. TB-150 | P1 | XS | Add support/contact hooks on workflow completion pages. | Status: TODO
151. TB-151 | P0 | XS | Select ORM for optional backend sync track (Drizzle recommended). | Status: DONE
152. TB-152 | P0 | XS | Select DB schema naming and migration conventions. | Status: DONE
153. TB-153 | P0 | XS | Select analytics vendor/stack with privacy constraints. | Status: DONE
154. TB-154 | P1 | XS | Select auth approach for optional sync login (or anonymous-only mode). | Status: TODO
155. TB-155 | P1 | XS | Select recipe link signing/encryption format and size limits. | Status: TODO
156. TB-156 | P0 | XS | Add local Docker compose for Postgres (metadata sync track). | Status: DONE
157. TB-157 | P0 | XS | Add DB startup/shutdown/log scripts to package scripts. | Status: DONE
158. TB-158 | P0 | XS | Add local DATABASE_URL environment configuration docs. | Status: DONE
159. TB-159 | P0 | S | Add migration runner integration with local Docker Postgres. | Status: DONE
160. TB-160 | P0 | M | Create metadata sync DB schema (projects, runs, presets, recipes, optional users). | Status: DONE
161. TB-161 | P0 | S | Enforce server-side schema guard to block private file-content persistence. | Status: DONE
162. TB-162 | P1 | M | Build CRUD APIs for projects, presets, runs, and recipes. | Status: PARTIAL
163. TB-163 | P1 | S | Add sync conflict handling strategy (last-write-wins v1). | Status: PARTIAL
164. TB-164 | P1 | S | Add manual sync and status indicators in UI. | Status: PARTIAL
165. TB-165 | P1 | M | Add optional authentication for cross-device metadata sync. | Status: TODO
166. TB-166 | P1 | XS | Keep anonymous local mode parity when auth is absent. | Status: TODO
167. TB-167 | P1 | S | Add DB health endpoint and startup readiness checks. | Status: DONE
168. TB-168 | P1 | S | Add CI service container for migration and API integration tests. | Status: TODO
169. TB-169 | P2 | S | Add production DB abstraction for future Neon/Supabase/D1 portability. | Status: TODO
170. TB-170 | P2 | XS | Add DB backup/restore playbook (metadata only). | Status: TODO
171. TB-171 | P2 | XS | Add DB cost and usage monitoring thresholds. | Status: TODO
172. TB-172 | P2 | XS | Add audit logging for recipe publication and template moderation actions. | Status: TODO
173. TB-173 | P1 | XS | Add security headers review for workflow/template/embed routes. | Status: TODO
174. TB-174 | P1 | XS | Add CSP review for new runner and template pages. | Status: TODO
175. TB-175 | P1 | XS | Add dependency review for new workflow-related libraries. | Status: TODO
176. TB-176 | P1 | S | Add Lighthouse checks for workflow and template core pages. | Status: TODO
177. TB-177 | P1 | XS | Add bundle size budget checks after runner integration. | Status: TODO
178. TB-178 | P1 | S | Add core web vitals tracking for workflow pages. | Status: TODO
179. TB-179 | P1 | XS | Add changelog process for major workflow pack updates. | Status: TODO
180. TB-180 | P1 | XS | Add release checklist for workflow pack publication. | Status: TODO
181. TB-181 | P1 | XS | Add launch rollback switch via feature flags. | Status: TODO
182. TB-182 | P1 | XS | Add post-release watch window playbook for metrics triage. | Status: TODO
183. TB-183 | P2 | XS | Add long-term pack deprecation policy and redirects. | Status: TODO
184. TB-184 | P2 | XS | Add telemetry schema versioning policy. | Status: TODO
185. TB-185 | P2 | XS | Add template archival policy for stale/low-quality entries. | Status: TODO
186. TB-186 | P2 | XS | Add project export/import backup for local-only users. | Status: TODO
187. TB-187 | P2 | XS | Add optional offline-ready caching for workflow shell routes. | Status: TODO
188. TB-188 | P2 | XS | Add fallback static rendering for key workflow landing pages. | Status: TODO
189. TB-189 | P2 | XS | Add synthetic SEO smoke checks for workflow page discoverability. | Status: TODO
190. TB-190 | P2 | XS | Add monthly strategy-to-metrics review template tied to WCW and retention. | Status: TODO

## Notes

- This list intentionally avoids phase grouping.
- You can execute items in any order, but dependency awareness is still required for implementation.
- Existing tool URLs and metadata continuity remain non-negotiable constraints throughout execution.
