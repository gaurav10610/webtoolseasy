# Analytics Vendor Selection - Privacy-First Approach

**Purpose**: Document the selection of analytics infrastructure that respects user privacy while providing actionable insights for product development.

## Decision Summary

**Selected Approach**: Privacy-first analytics with **local-aggregation + optional telemetry**

- **Default**: No analytics collection (opt-in required)
- **Opt-in Vendor**: Plausible Analytics (privacy-first, no cookies, GDPR compliant)
- **Internal Storage**: Aggregated events in PostgreSQL (no PII)
- **Data Retention**: 30-day rolling window for trends

## Context

### Requirements

1. **User Privacy**: No forced tracking, transparent data collection
2. **Compliance**: GDPR (EU), CCPA (CA), other regulations
3. **Business Insights**: Page views, workflow usage, tool adoption
4. **Debugging**: Error tracking and performance monitoring
5. **Cost-Effective**: Reasonable pricing, no overages
6. **User Control**: Ability to opt-out, view data collected

### Analytics Use Cases

| Use Case         | Priority | Tools           | Notes                            |
| ---------------- | -------- | --------------- | -------------------------------- |
| Usage Trends     | P1       | Plausible       | Which workflows are popular?     |
| Feature Adoption | P1       | Internal DB     | When did users try new features? |
| Error Tracking   | P0       | Sentry          | Detect bugs in production        |
| Performance      | P1       | Web Vitals      | Core Web Vitals, load times      |
| User Retention   | P2       | Cohort analysis | Do users return?                 |
| Funnel Analysis  | P2       | Plausible       | Do users complete workflows?     |

## Vendor Evaluation

### Candidates Considered

#### 1. Google Analytics 4 (GA4)

**Pros**:

- Feature-rich, free tier available
- Great for traffic analysis
- Large documentation community

**Cons**:

- ❌ Collects PII by default (email, user ID)
- ❌ Requires explicit privacy configuration
- ❌ Sends data to Google (user concern)
- ❌ Difficult opt-out mechanism
- ❌ Complex privacy compliance

**Privacy Grade**: 🔴 High Risk
**Decision**: REJECTED - Default PII collection violates privacy principles

#### 2. Mixpanel

**Pros**:

- Good event tracking capabilities
- Flexible segmentation

**Cons**:

- ❌ Event tracking sends individual user actions to third party
- ❌ Cookie-based tracking by default
- ❌ Expensive ($999+/month)
- ❌ PII leakage risk in event properties

**Privacy Grade**: 🟠 Medium Risk
**Decision**: REJECTED - Too expensive, privacy concerns

#### 3. Amplitude

**Pros**:

- Strong product analytics
- Good free tier

**Cons**:

- ❌ Tracks individual user events
- ❌ Cookies used for tracking
- ❌ PII risk if not careful with event names
- ⚠ Not GDPR-compliant by default

**Privacy Grade**: 🟠 Medium Risk
**Decision**: REJECTED - Privacy default not sufficient

#### 4. Plausible Analytics ⭐ SELECTED

**Pros**:

- ✅ Privacy-first design (no cookies, no PII)
- ✅ Simple, easy to understand metrics
- ✅ GDPR, CCPA, PECR compliant
- ✅ No consent banner needed (privacy by design)
- ✅ Honest pricing ($20/month for <100k views)
- ✅ User data can be downloaded
- ✅ No third-party integrations (keeps data safe)
- ✅ Ethical data practices, GDPR compliant

**Cons**:

- Limited custom event tracking
- Smaller community vs GA4
- Manual data export needed (no API for some features)

**Privacy Grade**: 🟢 Privacy Approved
**Decision**: SELECTED for public website analytics

#### 5. Fathom Analytics

**Pros**:

- ✅ Privacy-first similar to Plausible
- ✅ GDPR compliant
- ✅ No cookies

**Cons**:

- More expensive ($29/month base)
- Smaller event tracking library
- Not substantially better than Plausible

**Privacy Grade**: 🟢 Privacy Approved (but not selected)
**Decision**: ALTERNATIVE - Could be used if Plausible unavailable

#### 6. Self-Hosted Analytics (Matomo)

**Pros**:

- ✅ Full data control
- ✅ Can be privacy-compliant if configured correctly
- ✅ Open source
- No vendor lock-in

**Cons**:

- ⚠ Requires self-hosting and maintenance
- ⚠ Complex privacy configuration
- Can inadvertently collect PII
- Server costs $20-50/month

**Privacy Grade**: 🟢 If Configured Right, but requires expertise
**Decision**: FUTURE OPTION - Consider if traffic grows significantly

#### 7. Sentry (Error Tracking)

**Pros**:

- ✅ Excellent error tracking for production bugs
- ✅ Source map support for debugging
- ✅ Performance monitoring
- ✅ Can exclude PII

**Cons**:

- Separate from analytics (not all-in-one)
- Costs $29/month (small team plan)
- Must be carefully configured for privacy

**Privacy Grade**: 🟡 With Configuration
**Decision**: COMPLEMENTARY - Use for error tracking alongside Plausible

### Comparison Matrix

| Vendor        | Privacy | Cost  | Features   | Compliance | Recommendation |
| ------------- | ------- | ----- | ---------- | ---------- | -------------- |
| GA4           | 🔴      | Free  | ⭐⭐⭐⭐⭐ | ❌         | Rejected       |
| Mixpanel      | 🟠      | $$$   | ⭐⭐⭐⭐   | ⚠          | Rejected       |
| Amplitude     | 🟠      | $     | ⭐⭐⭐⭐   | ⚠          | Rejected       |
| **Plausible** | **🟢**  | **$** | **⭐⭐⭐** | **✅**     | **Selected**   |
| Fathom        | 🟢      | $$    | ⭐⭐⭐     | ✅         | Alternative    |
| Matomo        | 🟢      | $     | ⭐⭐⭐     | ✅         | Future         |
| Sentry        | 🟡      | $     | ⭐⭐⭐⭐   | ⚠          | Complementary  |

## Selected Architecture

### Analytics Stack

```
┌─────────────────────────────────────────────────────────┐
│ User Browser                                            │
│                                                         │
│ ┌───────────────────────────────────────────────────┐  │
│ │ Page Load                                         │  │
│ │ Workflow Completion                               │  │
│ │ Error Events (if opt-in)                          │  │
│ └───────┬───────────────────────────────────────────┘  │
└─────────┼──────────────────────────────────────────────┘
          │ (if analytics enabled)
          ▼
  ┌─────────────────────────────────────────────┐
  │ Plausible Analytics (Privacy-First)         │
  │                                             │
  │ Collects:                                  │
  │ • Page views (with referrer, location)     │
  │ • Event names (workflow completed, etc)    │
  │ • Device info (browser, OS, screen)        │
  │                                             │
  │ Does NOT collect:                          │
  │ • Cookies or tracking IDs                  │
  │ • User IDs or email addresses              │
  │ • Detailed behavior (clicks, scrolls)      │
  │ • Third-party data                         │
  └─────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ Internal PostgreSQL Database (Optional)                 │
│                                                         │
│ Aggregated Events (for trends):                        │
│ • workflow_completions_daily: {date, count, type}     │
│ • tool_usage_daily: {date, tool_id, count}            │
│ • error_events: {timestamp, error_code, count}        │
│                                                         │
│ Privacy Guarantees:                                    │
│ • No user ID or email stored                          │
│ • Only aggregated metrics (no per-user rows)          │
│ • 30-day retention (auto-delete)                      │
│ • Local storage only (no third-party)                │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ Sentry (Error Tracking)                                │
│                                                         │
│ Collects:                                              │
│ • Error stack traces                                   │
│ • Browser and OS info                                  │
│ • Request URL (but NOT query params/body)             │
│                                                         │
│ Excluded:                                              │
│ • User emails and tokens                              │
│ • Sensitive headers                                    │
│ • Request body/query params with secrets              │
└─────────────────────────────────────────────────────────┘
```

### Data Flow Diagram

```
User Action
    │
    ├─→ Is Analytics Enabled? (localStorage)
    │      ├─→ NO: Skip tracking
    │      └─→ YES: Continue
    │
    ├─→ Is PII-Safe Event?
    │      ├─→ NO: Redact before sending
    │      └─→ YES: Send to analytics
    │
    └─→ Send Event to Plausible
         ├─→ {event: "workflow_completed", workflow: "api-cleanup"}
         ├─→ {event: "tool_used", tool: "json-formatter"}
         └─→ {event: "page_view", path: "/workflows/blog-publish"}
```

## Implementation Plan

### Phase 1: Plausible Integration (Week 1)

**What**: Add Plausible script to all pages, track basic metrics

```typescript
// src/components/analytics/PlausibleScript.tsx
import Script from 'next/script';

export const PlausibleScript = () => {
  const analyticsEnabled = localStorage.getItem('wte_analytics_enabled') === 'true';

  if (!analyticsEnabled) return null;

  return (
    <Script
      defer
      data-domain="webtoolseasy.com"
      src="https://plausible.io/js/script.js"
      strategy="afterInteractive"
    />
  );
};

// src/app/layout.tsx
import { PlausibleScript } from '@/components/analytics/PlausibleScript';

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <PlausibleScript />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

**Events Tracked**:

- Page views (automatic)
- `workflow_started`: user begins workflow
- `workflow_completed`: user completes workflow
- `export_downloaded`: user exports results
- `tool_viewed`: tool page accessed

**Setting**: Add to user settings "Share anonymous usage with us"

### Phase 2: Internal Aggregation (Week 2)

**What**: Create aggregated event tables in PostgreSQL

```sql
-- Aggregated daily metrics (no per-user data)
CREATE TABLE analytics_workflow_usage (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  workflow_pack_id BIGINT NOT NULL,
  completion_count INTEGER NOT NULL DEFAULT 0,
  error_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  UNIQUE (date, workflow_pack_id)
);

CREATE TABLE analytics_tool_usage (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  tool_id BIGINT NOT NULL,
  view_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  UNIQUE (date, tool_id)
);

-- Retention: 30 days
CREATE OR REPLACE FUNCTION prune_old_analytics()
RETURNS void AS $$
BEGIN
  DELETE FROM analytics_workflow_usage WHERE date < CURRENT_DATE - INTERVAL '30 days';
  DELETE FROM analytics_tool_usage WHERE date < CURRENT_DATE - INTERVAL '30 days';
END;
$$ LANGUAGE plpgsql;

-- Run daily via cron
SELECT cron.schedule('prune_analytics', '0 2 * * *', 'SELECT prune_old_analytics()');
```

### Phase 3: Sentry Error Tracking (Week 3)

**What**: Enable error tracking in production

```typescript
// src/lib/sentry.ts
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1, // 10% of requests

  // Privacy: Exclude sensitive data
  beforeSend(event) {
    // Remove query params that might contain secrets
    if (event.request?.url) {
      event.request.url = event.request.url.split("?")[0];
    }

    // Remove sensitive headers
    delete event.request?.headers["Authorization"];
    delete event.request?.headers["Cookie"];

    // Remove PII
    if (event.user) {
      delete event.user.email;
      delete event.user.ip_address;
    }

    return event;
  },

  integrations: [
    new Sentry.Replay({
      maskAllText: true, // Don't capture text content
      blockAllMedia: true, // Don't capture media
    }),
  ],
});
```

### Phase 4: Analytics Dashboard (Week 4)

**What**: Build internal dashboard for metrics (for team use only)

```typescript
// src/app/admin/analytics/page.tsx (protected endpoint)
import { getAggregatedMetrics } from '@/lib/analytics';

export default async function AnalyticsDashboard() {
  const dailyMetrics = await getAggregatedMetrics('last_30_days');

  return (
    <div>
      <h1>Analytics (Last 30 Days)</h1>

      {/* Workflow Trends */}
      <WorkflowTrendsChart data={dailyMetrics.workflows} />

      {/* Tool Usage */}
      <ToolUsageChart data={dailyMetrics.tools} />

      {/* Error Rate */}
      <ErrorRateChart data={dailyMetrics.errors} />

      {/* Note: No user-level data visible */}
      <p style={{fontSize: 'small', color: 'gray'}}>
        This dashboard shows aggregated metrics only. No user-level data is collected or displayed.
      </p>
    </div>
  );
}
```

## User Privacy Controls

### Settings Page

```typescript
// src/components/settings/AnalyticsSettings.tsx
export const AnalyticsSettings = () => {
  const [analyticsEnabled, setAnalyticsEnabled] = useState(
    localStorage.getItem('wte_analytics_enabled') === 'true'
  );

  const handleToggle = (enabled: boolean) => {
    localStorage.setItem('wte_analytics_enabled', String(enabled));
    setAnalyticsEnabled(enabled);

    // Notify Plausible to stop tracking
    if (!enabled && window.plausible) {
      window.plausible('event', { props: { analytics_opt_out: true } });
    }
  };

  return (
    <Card>
      <h3>Analytics & Privacy</h3>

      <FormControlLabel
        control={<Switch checked={analyticsEnabled} onChange={(e) => handleToggle(e.target.checked)} />}
        label="Share anonymous usage data"
      />

      <Typography variant="caption" display="block" sx={{ mt: 1 }}>
        When enabled, we collect:
        <ul>
          <li>Pages you visit</li>
          <li>Workflows you use (name only, no data)</li>
          <li>Your browser and device (for compatibility)</li>
        </ul>
        We do NOT collect:
        <ul>
          <li>Your name or email</li>
          <li>What content you process</li>
          <li>Your workflow data or results</li>
        </ul>
      </Typography>

      <Link href="https://plausible.io/privacy" target="_blank">
        View Plausible's Privacy Policy
      </Link>
    </Card>
  );
};
```

## Data Retention & Deletion

### Retention Policy

| Data Type          | Vendor     | Retention | Auto-Delete |
| ------------------ | ---------- | --------- | ----------- |
| Page views         | Plausible  | 90 days   | Yes         |
| Custom events      | Plausible  | 90 days   | Yes         |
| Error traces       | Sentry     | 90 days   | Yes         |
| Aggregated metrics | PostgreSQL | 30 days   | Yes         |
| Error logs         | PostgreSQL | 30 days   | Yes         |

### User Data Deletion

When user deletes account:

- [ ] Remove from active user tracking
- [ ] Anonymize in historical aggregates
- [ ] Request deletion from Plausible
- [ ] Request deletion from Sentry

```typescript
// User account deletion flow
async function deleteUserAccount(userId: number) {
  // 1. Delete user from app
  await db.users.delete({ where: { id: userId } });

  // 2. Anonymize analytics (set user_id to null in historical data)
  await db.analytics_events.updateMany({
    where: { user_id: userId },
    data: { user_id: null },
  });

  // 3. Request deletion from third-party services
  await plausible.deleteUser(email);
  await sentry.captureMessage(`User deletion: ${userId}`, "info");
}
```

## Monitoring & Compliance

### Regular Checks

```
□ Weekly: Review error rate and top errors (Sentry)
□ Monthly: Review usage trends (Plausible)
□ Quarterly: Audit analytics compliance with GDPR/CCPA
□ Annually: Review retention policies and update
```

### Compliance Requirements

**GDPR (EU)**:

- ✅ No cookies (Plausible compliant)
- ✅ User consent not required (privacy by design)
- ✅ Data available for download
- ✅ Erasure upon request

**CCPA (California)**:

- ✅ Non-personal information only
- ✅ No sale of data
- ✅ Privacy policy disclosure

**PECR (UK)**:

- ✅ No cookies or analytics consent needed (privacy by design)

## Cost Breakdown

| Service    | Monthly Cost | Annual   | Notes                    |
| ---------- | ------------ | -------- | ------------------------ |
| Plausible  | $20          | $240     | Up to 100k monthly views |
| Sentry     | $29          | $348     | Small team plan          |
| PostgreSQL | $15          | $180     | For aggregated metrics   |
| **Total**  | **$64**      | **$768** | Annual analytics budget  |

## Alternatives if Plausible Unavailable

1. **Fathom Analytics** ($29/month) - Similar privacy guarantees
2. **Simple Analytics** ($19/month) - Privacy-first, basic features
3. **Matomo Cloud** ($19/month) - Self-hosted alternative
4. **GoAccess** (Free) - Lightweight, requires self-hosting

## References

- [Plausible Analytics Documentation](https://plausible.io/docs)
- [Privacy by Design](https://en.wikipedia.org/wiki/Privacy_by_design)
- [GDPR Compliance Checklist](https://gdpr-info.eu/)
- [Sentry Privacy Policy](https://sentry.io/privacy/)
- [Web Analytics Without Cookies](https://plausible.io/blog)
