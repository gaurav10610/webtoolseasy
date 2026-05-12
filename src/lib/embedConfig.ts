/**
 * TB-137 & TB-138: Embed-mode route for lightweight workflows with security headers
 * Provides embed-mode functionality for selected workflows with origin restrictions
 */

export interface EmbedWorkflow {
  /** Workflow slug for embedding */
  slug: string;
  /** Display name */
  name: string;
  /** Can be embedded */
  isEmbeddable: boolean;
  /** Allowed origins for CORS (empty = no embed) */
  allowedOrigins: string[];
  /** Use iframe sandbox attributes */
  sandboxAttributes: string[];
  /** Description for embed preview */
  description: string;
  /** Icon for embed UI */
  icon?: string;
  /** Category for organization */
  category: string;
}

export interface EmbedConfig {
  /** Enable embed mode */
  enabled: boolean;
  /** List of embeddable workflows */
  workflows: EmbedWorkflow[];
  /** Default sandbox attributes */
  defaultSandboxAttrs: string[];
  /** Security policy */
  securityPolicy: {
    /** Require HTTPS */
    requireHttps: boolean;
    /** Max frame depth */
    maxFrameDepth: number;
    /** Allowed referrer policy */
    referrerPolicy: "no-referrer" | "origin" | "same-origin" | "strict-origin";
  };
}

export interface EmbedRequest {
  /** Workflow slug to embed */
  workflowSlug: string;
  /** Requesting origin */
  origin: string;
  /** Request timestamp */
  timestamp: Date;
  /** User agent */
  userAgent?: string;
  /** Referrer URL */
  referrer?: string;
}

export interface EmbedSecurityHeaders {
  /** X-Frame-Options header */
  "X-Frame-Options": "DENY" | "SAMEORIGIN" | "ALLOW-FROM";
  /** Content-Security-Policy header */
  "Content-Security-Policy": string;
  /** X-Content-Type-Options header */
  "X-Content-Type-Options": string;
  /** Referrer-Policy header */
  "Referrer-Policy": string;
  /** Permissions-Policy header */
  "Permissions-Policy": string;
}

export interface EmbedAccessLog {
  /** Log entry */
  entries: Array<{
    workflow: string;
    origin: string;
    timestamp: Date;
    allowed: boolean;
    reason?: string;
  }>;
  /** Total allowed requests */
  totalAllowed: number;
  /** Total denied requests */
  totalDenied: number;
}

export const DEFAULT_EMBEDDABLE_WORKFLOWS: EmbedWorkflow[] = [
  {
    slug: "csv-to-json",
    name: "CSV to JSON",
    isEmbeddable: true,
    allowedOrigins: ["*"], // Allow all origins for public demo
    sandboxAttributes: ["allow-forms", "allow-scripts", "allow-same-origin"],
    description: "Convert CSV data to JSON format",
    category: "data-conversion",
  },
  {
    slug: "json-formatter",
    name: "JSON Formatter",
    isEmbeddable: true,
    allowedOrigins: ["*"],
    sandboxAttributes: ["allow-forms", "allow-scripts", "allow-same-origin"],
    description: "Format and validate JSON",
    category: "data-tools",
  },
  {
    slug: "markdown-preview",
    name: "Markdown Preview",
    isEmbeddable: true,
    allowedOrigins: ["*"],
    sandboxAttributes: ["allow-same-origin"],
    description: "Preview Markdown in real-time",
    category: "text-tools",
  },
  {
    slug: "color-converter",
    name: "Color Converter",
    isEmbeddable: true,
    allowedOrigins: ["*"],
    sandboxAttributes: ["allow-forms", "allow-scripts"],
    description: "Convert between color formats",
    category: "design-tools",
  },
];

export const DEFAULT_EMBED_CONFIG: EmbedConfig = {
  enabled: true,
  workflows: DEFAULT_EMBEDDABLE_WORKFLOWS,
  defaultSandboxAttrs: ["allow-scripts", "allow-same-origin", "allow-forms"],
  securityPolicy: {
    requireHttps: true,
    maxFrameDepth: 1,
    referrerPolicy: "strict-origin",
  },
};

/**
 * Initialize embed configuration
 */
export function _initializeEmbedConfig(
  config?: Partial<EmbedConfig>,
): EmbedConfig {
  return {
    ...DEFAULT_EMBED_CONFIG,
    ...(config || {}),
  };
}

/**
 * Check if origin is allowed for workflow
 */
export function _isOriginAllowed(
  workflowSlug: string,
  origin: string,
  config: EmbedConfig,
): boolean {
  const workflow = config.workflows.find((w) => w.slug === workflowSlug);

  if (!workflow || !workflow.isEmbeddable) {
    return false;
  }

  // Check allowed origins
  if (workflow.allowedOrigins.includes("*")) {
    return true;
  }

  // Exact match or wildcard match
  return workflow.allowedOrigins.some((allowed) => {
    if (allowed === "*") return true;
    if (allowed === origin) return true;
    // Support wildcard domains like *.example.com
    if (allowed.startsWith("*.")) {
      const domain = allowed.substring(2); // Remove *.
      return origin.endsWith("." + domain) || origin === domain;
    }
    return false;
  });
}

/**
 * Validate embed request
 */
export function _validateEmbedRequest(
  request: EmbedRequest,
  config: EmbedConfig,
): {
  allowed: boolean;
  reason?: string;
  securityHeaders: EmbedSecurityHeaders;
} {
  // Check if embed mode is enabled
  if (!config.enabled) {
    return {
      allowed: false,
      reason: "Embed mode is disabled",
      securityHeaders: _getSecurityHeaders(false),
    };
  }

  // Check if workflow exists and is embeddable
  const workflow = config.workflows.find(
    (w) => w.slug === request.workflowSlug,
  );
  if (!workflow || !workflow.isEmbeddable) {
    return {
      allowed: false,
      reason: "Workflow not available for embedding",
      securityHeaders: _getSecurityHeaders(false),
    };
  }

  // Check origin
  if (!_isOriginAllowed(request.workflowSlug, request.origin, config)) {
    return {
      allowed: false,
      reason: `Origin ${request.origin} not allowed`,
      securityHeaders: _getSecurityHeaders(false),
    };
  }

  // Validate referrer if present
  if (request.referrer && config.securityPolicy.requireHttps) {
    if (!request.referrer.startsWith("https://")) {
      return {
        allowed: false,
        reason: "Referrer must use HTTPS",
        securityHeaders: _getSecurityHeaders(false),
      };
    }
  }

  return {
    allowed: true,
    securityHeaders: _getSecurityHeaders(true, workflow),
  };
}

/**
 * Generate security headers for embed response
 */
export function _getSecurityHeaders(
  allowed: boolean,
  workflow?: EmbedWorkflow,
): EmbedSecurityHeaders {
  if (!allowed) {
    return {
      "X-Frame-Options": "DENY",
      "Content-Security-Policy": "default-src 'none'",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "no-referrer",
      "Permissions-Policy": "geolocation=(), microphone=(), camera=()",
    };
  }

  const sandboxAttrs =
    workflow?.sandboxAttributes.join(", ") || "allow-scripts";

  return {
    "X-Frame-Options": "ALLOW-FROM",
    "Content-Security-Policy": `frame-ancestors 'self' ${(workflow?.allowedOrigins || []).join(" ")}; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'`,
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin",
    "Permissions-Policy": `geolocation=(), microphone=(), camera=(), payment=(), usb=()`,
  };
}

/**
 * Get embed URL for workflow
 */
export function _getEmbedUrl(
  workflowSlug: string,
  baseUrl: string,
  params?: Record<string, string>,
): string {
  const url = new URL(`/embed/${workflowSlug}`, baseUrl);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }

  return url.toString();
}

/**
 * Get embed iframe HTML
 */
export function _generateEmbedIframe(
  workflowSlug: string,
  baseUrl: string,
  config: EmbedConfig,
  options?: {
    width?: string;
    height?: string;
    title?: string;
    style?: string;
  },
): string {
  const workflow = config.workflows.find((w) => w.slug === workflowSlug);

  if (!workflow || !workflow.isEmbeddable) {
    return "<!-- Workflow not available for embedding -->";
  }

  const sandbox = workflow.sandboxAttributes.join(" ");
  const width = options?.width || "100%";
  const height = options?.height || "600px";
  const title = options?.title || workflow.name;
  const embedUrl = _getEmbedUrl(workflowSlug, baseUrl);

  return `<iframe 
    src="${embedUrl}"
    width="${width}"
    height="${height}"
    frameborder="0"
    title="${title}"
    sandbox="${sandbox}"
    style="${options?.style || "border: 1px solid #ccc; border-radius: 4px;"}"
  ></iframe>`;
}

/**
 * Get embed code snippet for documentation
 */
export function _getEmbedCodeSnippet(
  workflowSlug: string,
  baseUrl: string,
  language: "html" | "markdown" | "react" = "html",
): string {
  const embedUrl = _getEmbedUrl(workflowSlug, baseUrl);

  if (language === "html") {
    return `<iframe src="${embedUrl}" width="100%" height="600" frameborder="0" sandbox="allow-scripts allow-same-origin allow-forms"></iframe>`;
  }

  if (language === "markdown") {
    return `[View ${workflowSlug} Tool](${embedUrl})`;
  }

  if (language === "react") {
    return `<iframe src="${embedUrl}" width="100%" height={600} frameBorder={0} sandbox="allow-scripts allow-same-origin allow-forms" />`;
  }

  return "";
}

/**
 * Log embed access
 */
export function _logEmbedAccess(
  log: EmbedAccessLog,
  workflow: string,
  origin: string,
  allowed: boolean,
  reason?: string,
): EmbedAccessLog {
  return {
    entries: [
      ...log.entries,
      {
        workflow,
        origin,
        timestamp: new Date(),
        allowed,
        reason,
      },
    ],
    totalAllowed: log.totalAllowed + (allowed ? 1 : 0),
    totalDenied: log.totalDenied + (allowed ? 0 : 1),
  };
}

/**
 * Get embed statistics
 */
export function _getEmbedStatistics(log: EmbedAccessLog): {
  totalRequests: number;
  allowedCount: number;
  deniedCount: number;
  allowRate: number;
  topWorkflows: Array<{ workflow: string; count: number }>;
  topOrigins: Array<{ origin: string; count: number }>;
} {
  const total = log.entries.length;
  const allowed = log.totalAllowed;
  const denied = log.totalDenied;
  const allowRate = total > 0 ? Math.round((allowed / total) * 100) : 0;

  // Count by workflow
  const workflowCounts = new Map<string, number>();
  log.entries.forEach((entry) => {
    workflowCounts.set(
      entry.workflow,
      (workflowCounts.get(entry.workflow) || 0) + 1,
    );
  });

  // Count by origin
  const originCounts = new Map<string, number>();
  log.entries.forEach((entry) => {
    originCounts.set(entry.origin, (originCounts.get(entry.origin) || 0) + 1);
  });

  return {
    totalRequests: total,
    allowedCount: allowed,
    deniedCount: denied,
    allowRate,
    topWorkflows: Array.from(workflowCounts.entries())
      .map(([workflow, count]) => ({ workflow, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5),
    topOrigins: Array.from(originCounts.entries())
      .map(([origin, count]) => ({ origin, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5),
  };
}

/**
 * Check if origin matches policy
 */
export function _validateOriginSecurity(
  origin: string,
  requireHttps: boolean,
): boolean {
  if (requireHttps && !origin.startsWith("https://")) {
    return false;
  }

  try {
    new URL(origin);
    return true;
  } catch {
    return false;
  }
}

/**
 * Generate embed manifest for discovery
 */
export function _generateEmbedManifest(
  config: EmbedConfig,
  baseUrl: string,
): {
  version: string;
  workflows: Array<{
    slug: string;
    name: string;
    description: string;
    embedUrl: string;
    category: string;
  }>;
} {
  return {
    version: "1.0.0",
    workflows: config.workflows
      .filter((w) => w.isEmbeddable)
      .map((w) => ({
        slug: w.slug,
        name: w.name,
        description: w.description,
        embedUrl: _getEmbedUrl(w.slug, baseUrl),
        category: w.category,
      })),
  };
}
