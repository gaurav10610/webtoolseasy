import { describe, expect, it } from "vitest";
import {
  _appendAuditEvent,
  _createAuditEvent,
  _filterAuditEvents,
  _getAuditSummary,
  _initializeAuditLogStore,
  _recordRecipePublication,
  _recordTemplateModeration,
  _sanitizeAuditMetadata,
} from "@/lib/auditLogging";

describe("Audit Logging for Publication and Moderation (TB-172)", () => {
  it("initializes empty audit store", () => {
    const store = _initializeAuditLogStore();
    expect(store.events).toEqual([]);
  });

  it("sanitizes sensitive metadata fields", () => {
    const metadata = _sanitizeAuditMetadata({
      decision: "approved",
      apiToken: "secret",
      password: "123",
      fileContent: "raw",
      attempts: 3,
      safe: true,
    });

    expect(metadata.decision).toBe("approved");
    expect(metadata.attempts).toBe(3);
    expect(metadata.safe).toBe(true);
    expect(metadata.apiToken).toBeUndefined();
    expect(metadata.password).toBeUndefined();
    expect(metadata.fileContent).toBeUndefined();
  });

  it("creates and appends audit events", () => {
    let store = _initializeAuditLogStore();

    const event = _createAuditEvent({
      action: "recipe_published",
      actorId: "user_1",
      resourceType: "recipe",
      resourceId: "recipe_1",
      outcome: "success",
      metadata: { source: "manual" },
    });

    store = _appendAuditEvent(store, event);

    expect(store.events).toHaveLength(1);
    expect(store.events[0].action).toBe("recipe_published");
    expect(store.events[0].eventId).toContain("audit_recipe_recipe_1");
  });

  it("records template moderation decisions", () => {
    let store = _initializeAuditLogStore();

    store = _recordTemplateModeration(store, {
      actorId: "moderator_1",
      templateId: "template_1",
      decision: "approved",
      reason: "Meets policy",
      metadata: { qualityScore: 92 },
    });

    expect(store.events).toHaveLength(1);
    expect(store.events[0].action).toBe("template_published");
    expect(store.events[0].resourceType).toBe("template");
    expect(store.events[0].reason).toBe("Meets policy");
  });

  it("records recipe publication/unpublication", () => {
    let store = _initializeAuditLogStore();

    store = _recordRecipePublication(store, {
      actorId: "user_2",
      recipeId: "recipe_2",
      published: true,
      metadata: { channel: "community" },
    });

    store = _recordRecipePublication(store, {
      actorId: "user_2",
      recipeId: "recipe_2",
      published: false,
      reason: "Deprecated",
    });

    expect(store.events).toHaveLength(2);
    expect(store.events[0].action).toBe("recipe_published");
    expect(store.events[1].action).toBe("recipe_unpublished");
  });

  it("filters audit events by query", () => {
    let store = _initializeAuditLogStore();

    store = _recordRecipePublication(store, {
      actorId: "user_a",
      recipeId: "recipe_x",
      published: true,
    });

    store = _recordTemplateModeration(store, {
      actorId: "user_b",
      templateId: "template_x",
      decision: "rejected",
      reason: "Spam risk",
    });

    const byRecipe = _filterAuditEvents(store, { resourceType: "recipe" });
    const byActor = _filterAuditEvents(store, { actorId: "user_b" });

    expect(byRecipe).toHaveLength(1);
    expect(byActor).toHaveLength(1);
    expect(byActor[0].resourceType).toBe("template");
  });

  it("builds audit summary", () => {
    let store = _initializeAuditLogStore();

    store = _recordRecipePublication(store, {
      actorId: "user_1",
      recipeId: "recipe_1",
      published: true,
    });

    store = _recordTemplateModeration(store, {
      actorId: "mod_1",
      templateId: "template_1",
      decision: "rejected",
    });

    const summary = _getAuditSummary(store);
    expect(summary.totalEvents).toBe(2);
    expect(summary.recipePublicationEvents).toBe(1);
    expect(summary.templateModerationEvents).toBe(1);
    expect(summary.failures).toBe(0);
  });
});
