# ADR-004: Telemetry Stack - Privacy-First Event Collection

**Date**: 2026-05-12  
**Status**: Accepted  
**Deciders**: Web Tools Team

## Context

WebToolsEasy needs insights into:

- How users discover and adopt workflows
- Which features drive engagement
- Where users encounter friction
- Platform stability and error rates

### Constraints

1. **User Privacy**: Default no tracking
2. **GDPR/CCPA Compliance**: Minimal PII collection
3. **User Control**: Clear opt-in/opt-out
4. **Transparency**: Users know what's tracked
5. **Data Ownership**: User data not sold or used for targeting
6. **Cost Efficiency**: Should be $50-100/month

### Problem Statement

**No Telemetry** (Current):

- Can't see if features work
- Don't know which workflows are popular
- Can't identify bugs
- No product insights

**Traditional Analytics** (Privacy Issues):

- GA4 collects PII by default
- Users tracked across sites
- Data stored by ad networks
- Trust barrier with users

**Custom Telemetry** (Engineering Burden):

- Requires building infrastructure
- Complex PII filtering
- Requires privacy law expertise
- Maintenance overhead

## Decision

Implement **Privacy-First Telemetry Stack** with:

### Components

1. **Frontend Analytics**: Plausible Analytics (privacy-compliant)
2. **Error Tracking**: Sentry (with PII scrubbing)
3. **Internal Events Database**: PostgreSQL aggregated tables
4. **Performance Monitoring**: Web Vitals collection
5. **Dashboard**: Internal metrics view for team

### Architecture

```
┌──────────────────────────────────────────────────────────┐
│ User Browser                                             │
│                                                          │
│ Privacy-Safe Events:                                    │
│ • Page loaded: /workflows/blog-publish                  │
│ • Event: workflow_started (no step data)                │
│ • Event: workflow_completed (no output data)            │
│ • Event: tool_viewed                                    │
│ • JS Error: TypeError at widget.tsx:123                 │
│                                                          │
│ User Control:                                           │
│ □ Share anonymous usage with Plausible (opt-in)        │
│ □ Help improve with error reports via Sentry (opt-in)  │
└──────────────────────────────────────────────────────────┘
         │                              │
         ▼                              ▼
┌─────────────────────────┐    ┌─────────────────────────┐
│ Plausible Analytics     │    │ Sentry Error Tracking   │
│                         │    │                         │
│ Metrics:               │    │ Captures:              │
│ • Page views           │    │ • JS errors            │
│ • User sessions        │    │ • Performance issues   │
│ • Referrer source      │    │ • API failures         │
│ • Device info          │    │                        │
│ • Geographic origin    │    │ Data Scrubbed:        │
│                        │    │ • No email/tokens     │
│ Retention: 90 days    │    │ • No request body     │
│ No PII: ✓             │    │ • No query params     │
│ GDPR: ✓               │    │ • No auth headers     │
└─────────────────────────┘    └─────────────────────────┘
         │                              │
         └──────────────┬───────────────┘
                        ▼
        ┌─────────────────────────────────────────┐
        │ Internal PostgreSQL (Optional)           │
        │                                         │
        │ Aggregated Daily Metrics:              │
        │ • workflows_used (workflow, count)      │
        │ • tools_viewed (tool, count)           │
        │ • completion_rate (pack_id, rate)      │
        │ • error_frequency (error_code, count)  │
        │ • page_performance (page, avg_load_ms) │
        │                                         │
        │ Privacy Guarantees:                    │
        │ • No user IDs                          │
        │ • Only aggregated counts               │
        │ • 30-day retention                     │
        │ • Local storage only                   │
        └─────────────────────────────────────────┘
                        │
                        ▼
        ┌──────────────────────────────┐
        │ Team Metrics Dashboard       │
        │ (Internal, password-protected)
        │                              │
        │ • Usage trends               │
        │ • Popular workflows          │
        │ • Error rates               │
        │ • Performance metrics        │
        │ • Funnel analysis            │
        └──────────────────────────────┘
```

## Event Taxonomy

### Guardrails

**Never Track**:

- User email, name, or ID
- File content or size details
- API keys or secrets
- Search queries
- Authentication tokens
- Workflow output/results

**Always Safe to Track**:

- Workflow name (e.g., "api-payload-cleanup")
- Tool name (e.g., "json-formatter")
- Workflow step (step number, not content)
- Page URL (without query params)
- Errors (type and line, not full stack)
- Device type (mobile, desktop)
- Geographic region (country level)
- Browser type/version

### Events Schema

```typescript
interface TelemetryEvent {
  // Required
  timestamp: string; // ISO 8601 UTC
  eventName: string; // e.g., "workflow_started"
  source: "browser" | "api" | "server";

  // Workflow Events
  workflowId?: string; // e.g., "wf-api-cleanup"
  workflowName?: string; // e.g., "API Payload Cleanup"
  stepNumber?: number; // 1, 2, 3, etc (not step content)

  // Tool Events
  toolId?: string; // e.g., "json-formatter"
  toolName?: string; // Human-friendly name

  // Navigation Events
  pageUrl?: string; // Without query params or fragments
  referrer?: string; // Previous page

  // Error Events
  errorCode?: string; // e.g., "JSON_PARSE_ERROR"
  errorMessage?: string; // Generic message, no user data
  errorLocation?: string; // e.g., "file.ts:123"

  // Performance Events
  duration?: number; // milliseconds
  resourceSize?: string; // "small" | "medium" | "large"

  // Context
  deviceType?: string; // "desktop" | "mobile" | "tablet"
  browserName?: string; // "Chrome" | "Firefox" | "Safari"
  osName?: string; // "macOS" | "Windows" | "iOS"
  countryCode?: string; // "US" | "DE" | "JP"

  // User Control
  analyticsOptIn?: boolean; // Did user enable analytics?
}

// Concrete Examples
const events: TelemetryEvent[] = [
  {
    timestamp: "2026-05-12T10:30:00Z",
    eventName: "workflow_started",
    source: "browser",
    workflowId: "wf-api-cleanup",
    workflowName: "API Payload Cleanup",
    deviceType: "desktop",
    browserName: "Chrome",
    countryCode: "US",
    analyticsOptIn: true,
  },
  {
    timestamp: "2026-05-12T10:35:15Z",
    eventName: "workflow_completed",
    source: "browser",
    workflowId: "wf-api-cleanup",
    duration: 315000, // 5 minutes 15 seconds
    stepNumber: 4, // Made it to final step
    analyticsOptIn: true,
  },
  {
    timestamp: "2026-05-12T10:36:00Z",
    eventName: "export_downloaded",
    source: "browser",
    workflowId: "wf-api-cleanup",
    resourceSize: "large", // >5MB
    analyticsOptIn: true,
  },
  {
    timestamp: "2026-05-12T11:00:00Z",
    eventName: "error_occurred",
    source: "browser",
    errorCode: "JSON_PARSE_ERROR",
    errorMessage: "Invalid JSON at line X", // Generic, no content
    errorLocation: "parsers.ts:456",
    workflowId: "wf-api-cleanup",
  },
];
```

## Event Categories

### User Journey Events

```
workflow_discovered
  └─ referrer: "search" | "direct" | "link" | "category"

workflow_started
  └─ workflow_id, workflow_name

step_completed
  └─ workflow_id, step_number, duration

workflow_completed
  └─ workflow_id, total_duration, all_steps_completed

export_initiated
  └─ workflow_id, export_format

export_downloaded
  └─ workflow_id, file_size_category

workflow_abandoned
  └─ workflow_id, step_number (where they left)
```

### Tool Events

```
tool_viewed
  └─ tool_id, tool_name

tool_used (from workflow)
  └─ tool_id, workflow_id, context: "standalone" | "workflow"

tool_searched
  └─ search_query (generic, no sensitive terms), result_count
```

### Feature Events

```
preset_created
  └─ workflow_id

preset_used
  └─ preset_id, workflow_id

recipe_imported
  └─ recipe_source: "file" | "link" | "registry"

settings_changed
  └─ setting_name, setting_value_type: "bool" | "option" | "string"
```

### Performance Events

```
page_performance
  └─ page_url, dom_interactive_ms, page_load_ms

workflow_step_duration
  └─ workflow_id, step_id, duration_ms, success: true|false

export_generation_duration
  └─ workflow_id, format, duration_ms, file_size
```

### Error Events

```
js_error
  └─ error_code, error_message, error_location, browser

api_error
  └─ endpoint, status_code, error_type

workflow_error
  └─ workflow_id, step_id, error_code, error_message
```

## Implementation: Client-Side Collection

```typescript
// src/lib/telemetry/client.ts
import { useEffect } from "react";

class TelemetryClient {
  private enabled: boolean;
  private eventQueue: TelemetryEvent[] = [];
  private batchSize = 10;
  private batchInterval = 30000; // 30 seconds

  constructor() {
    this.enabled = localStorage.getItem("wte_analytics_enabled") === "true";
    this.startBatching();
  }

  /**
   * Track a custom event
   */
  trackEvent(event: Partial<TelemetryEvent>) {
    if (!this.enabled) return;

    const fullEvent: TelemetryEvent = {
      timestamp: new Date().toISOString(),
      source: "browser",
      ...event,
      analyticsOptIn: this.enabled,
    };

    // Sanitize before storing
    this.sanitizeEvent(fullEvent);

    this.eventQueue.push(fullEvent);

    // Flush if batch full
    if (this.eventQueue.length >= this.batchSize) {
      this.flush();
    }
  }

  /**
   * Ensure no PII in event
   */
  private sanitizeEvent(event: TelemetryEvent) {
    // Remove any field that might contain user data
    const banned = [
      "userId",
      "email",
      "token",
      "apiKey",
      "password",
      "secret",
      "content",
      "data",
    ];

    banned.forEach((field) => {
      delete (event as any)[field];
    });

    // Strip query params from URLs
    if (event.pageUrl?.includes("?")) {
      event.pageUrl = event.pageUrl.split("?")[0];
    }
  }

  /**
   * Send batch to server
   */
  private async flush() {
    if (this.eventQueue.length === 0) return;

    const events = this.eventQueue.splice(0, this.batchSize);

    try {
      await fetch("/api/telemetry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ events }),
      });
    } catch (error) {
      // Silently fail - don't impact user experience
      console.error("Telemetry send failed", error);
      // Re-queue events if failed
      this.eventQueue.unshift(...events);
    }
  }

  /**
   * Batch processing interval
   */
  private startBatching() {
    setInterval(() => this.flush(), this.batchInterval);
  }

  /**
   * Helper: Track workflow start
   */
  trackWorkflowStart(workflowId: string, workflowName: string) {
    this.trackEvent({
      eventName: "workflow_started",
      workflowId,
      workflowName,
    });
  }

  /**
   * Helper: Track workflow completion
   */
  trackWorkflowCompletion(workflowId: string, duration: number) {
    this.trackEvent({
      eventName: "workflow_completed",
      workflowId,
      duration,
    });
  }
}

// Singleton instance
export const telemetry = new TelemetryClient();

// React hook for tracking
export function useTelemetry() {
  useEffect(() => {
    telemetry.trackEvent({
      eventName: "page_view",
      pageUrl: window.location.pathname,
    });
  }, []);

  return telemetry;
}
```

## Server-Side Processing

```typescript
// src/app/api/telemetry/route.ts
import { NextRequest, NextResponse } from "next/server";
import { aggregateEvents } from "@/lib/telemetry/aggregation";

export async function POST(req: NextRequest) {
  const { events } = await req.json();

  // Additional server-side validation
  for (const event of events) {
    validateEvent(event);
    sanitizeEvent(event);
  }

  // Aggregate and store
  const aggregated = aggregateEvents(events);
  await storeAggregatedEvents(aggregated);

  return NextResponse.json({ received: events.length });
}

function validateEvent(event: TelemetryEvent) {
  // Ensure required fields
  if (!event.timestamp || !event.eventName) {
    throw new Error("Invalid event");
  }

  // Ensure timestamp is recent (within 1 hour)
  const age = Date.now() - new Date(event.timestamp).getTime();
  if (age > 3600000) {
    throw new Error("Event too old");
  }
}

function sanitizeEvent(event: TelemetryEvent) {
  // Server-side scrubbing as safety net
  const allowedFields = [
    "timestamp",
    "eventName",
    "source",
    "workflowId",
    "workflowName",
    "stepNumber",
    "toolId",
    "toolName",
    "pageUrl",
    "referrer",
    "errorCode",
    "errorMessage",
    "errorLocation",
    "duration",
    "resourceSize",
    "deviceType",
    "browserName",
    "osName",
    "countryCode",
  ];

  Object.keys(event).forEach((key) => {
    if (!allowedFields.includes(key)) {
      delete (event as any)[key];
    }
  });
}

async function storeAggregatedEvents(aggregated: any) {
  // Store in PostgreSQL aggregated tables
  // E.g., UPDATE analytics_workflows SET completion_count = completion_count + 1
}
```

## Privacy Settings UI

```typescript
// src/components/privacy/AnalyticsSettings.tsx
export function AnalyticsSettings() {
  const [enabled, setEnabled] = useState(
    localStorage.getItem('wte_analytics_enabled') === 'true'
  );

  const handleChange = (newValue: boolean) => {
    localStorage.setItem('wte_analytics_enabled', String(newValue));
    setEnabled(newValue);
  };

  return (
    <Card>
      <h2>Analytics & Performance</h2>

      <FormControlLabel
        control={<Switch checked={enabled} onChange={(e) => handleChange(e.target.checked)} />}
        label="Help improve WebToolsEasy by sharing usage"
      />

      {enabled && (
        <Box sx={{ mt: 2, p: 2, bgcolor: 'info.light' }}>
          <Typography variant="subtitle2">When enabled:</Typography>
          <ul style={{ fontSize: '0.875rem' }}>
            <li>We see which workflows you use</li>
            <li>We track workflow completion rates</li>
            <li>We monitor for JavaScript errors</li>
            <li>We measure page load performance</li>
          </ul>

          <Typography variant="subtitle2" sx={{ mt: 2 }}>We do NOT track:</Typography>
          <ul style={{ fontSize: '0.875rem' }}>
            <li>Your name, email, or identity</li>
            <li>Content you upload or process</li>
            <li>Workflow results or outputs</li>
            <li>Your browsing outside WebToolsEasy</li>
          </ul>

          <Typography variant="caption" sx={{ mt: 2, display: 'block' }}>
            <Link href="/privacy#analytics">Learn more about our analytics</Link>
          </Typography>
        </Box>
      )}
    </Card>
  );
}
```

## Data Retention & Cleanup

```typescript
// Automated cleanup job (runs daily)
export async function cleanupOldTelemetry() {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  await db.analytics_events.deleteMany({
    where: { createdAt: { lt: thirtyDaysAgo } },
  });

  console.log("Telemetry cleanup complete");
}

// Schedule via cron or task runner
schedule("0 2 * * *", cleanupOldTelemetry); // Daily at 2 AM UTC
```

## Alternatives Considered

### 1. Google Analytics 4

- Rejected: Collects PII by default, privacy violations

### 2. Amplitude

- Rejected: User event tracking, not privacy-first

### 3. Mixpanel

- Rejected: Expensive, privacy concerns, PII risk

### 4. No Telemetry

- Rejected: Can't identify bugs or user friction

## References

- [ANALYTICS_VENDOR_SELECTION.md](./ANALYTICS_VENDOR_SELECTION.md)
- [Privacy by Design Principles](https://www.ipc.on.ca/wp-content/uploads/2020/10/privacybydesign.pdf)
- [OWASP Data Minimization](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html)
- [Event Schema Design](https://www.rudderstack.com/blog/analytics-event-schema-design)
