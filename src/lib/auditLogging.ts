export type AuditAction =
  | "recipe_published"
  | "recipe_unpublished"
  | "template_moderated"
  | "template_published"
  | "template_rejected";

export interface AuditEvent {
  eventId: string;
  action: AuditAction;
  actorId: string;
  resourceType: "recipe" | "template";
  resourceId: string;
  outcome: "success" | "failure";
  reason?: string;
  metadata?: Record<string, unknown>;
  createdAt: Date;
}

export interface AuditLogStore {
  events: AuditEvent[];
}

export function _initializeAuditLogStore(): AuditLogStore {
  return {
    events: [],
  };
}

export function _sanitizeAuditMetadata(
  metadata: Record<string, unknown> = {},
): Record<string, unknown> {
  const safe: Record<string, unknown> = {};

  Object.entries(metadata).forEach(([key, value]) => {
    // Do not persist sensitive fields in audit metadata.
    if (/token|secret|password|credential|fileContent|raw/i.test(key)) {
      return;
    }

    if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean" ||
      value === null
    ) {
      safe[key] = value;
    }
  });

  return safe;
}

export function _createAuditEvent(input: {
  action: AuditAction;
  actorId: string;
  resourceType: "recipe" | "template";
  resourceId: string;
  outcome: "success" | "failure";
  reason?: string;
  metadata?: Record<string, unknown>;
}): AuditEvent {
  return {
    eventId: `audit_${input.resourceType}_${input.resourceId}_${Date.now()}`,
    action: input.action,
    actorId: input.actorId,
    resourceType: input.resourceType,
    resourceId: input.resourceId,
    outcome: input.outcome,
    reason: input.reason,
    metadata: _sanitizeAuditMetadata(input.metadata),
    createdAt: new Date(),
  };
}

export function _appendAuditEvent(
  store: AuditLogStore,
  event: AuditEvent,
): AuditLogStore {
  return {
    ...store,
    events: [...store.events, event],
  };
}

export function _recordTemplateModeration(
  store: AuditLogStore,
  input: {
    actorId: string;
    templateId: string;
    decision: "approved" | "rejected";
    reason?: string;
    metadata?: Record<string, unknown>;
  },
): AuditLogStore {
  const action =
    input.decision === "approved" ? "template_published" : "template_rejected";

  const event = _createAuditEvent({
    action,
    actorId: input.actorId,
    resourceType: "template",
    resourceId: input.templateId,
    outcome: "success",
    reason: input.reason,
    metadata: {
      decision: input.decision,
      ...(input.metadata || {}),
    },
  });

  return _appendAuditEvent(store, event);
}

export function _recordRecipePublication(
  store: AuditLogStore,
  input: {
    actorId: string;
    recipeId: string;
    published: boolean;
    reason?: string;
    metadata?: Record<string, unknown>;
  },
): AuditLogStore {
  const event = _createAuditEvent({
    action: input.published ? "recipe_published" : "recipe_unpublished",
    actorId: input.actorId,
    resourceType: "recipe",
    resourceId: input.recipeId,
    outcome: "success",
    reason: input.reason,
    metadata: input.metadata,
  });

  return _appendAuditEvent(store, event);
}

export function _filterAuditEvents(
  store: AuditLogStore,
  query: Partial<
    Pick<
      AuditEvent,
      "resourceType" | "resourceId" | "actorId" | "action" | "outcome"
    >
  >,
): AuditEvent[] {
  return store.events.filter((event) => {
    return (
      (query.resourceType ? event.resourceType === query.resourceType : true) &&
      (query.resourceId ? event.resourceId === query.resourceId : true) &&
      (query.actorId ? event.actorId === query.actorId : true) &&
      (query.action ? event.action === query.action : true) &&
      (query.outcome ? event.outcome === query.outcome : true)
    );
  });
}

export function _getAuditSummary(store: AuditLogStore): {
  totalEvents: number;
  recipePublicationEvents: number;
  templateModerationEvents: number;
  failures: number;
} {
  const recipePublicationEvents = store.events.filter((event) =>
    ["recipe_published", "recipe_unpublished"].includes(event.action),
  ).length;

  const templateModerationEvents = store.events.filter((event) =>
    ["template_moderated", "template_published", "template_rejected"].includes(
      event.action,
    ),
  ).length;

  const failures = store.events.filter(
    (event) => event.outcome === "failure",
  ).length;

  return {
    totalEvents: store.events.length,
    recipePublicationEvents,
    templateModerationEvents,
    failures,
  };
}
