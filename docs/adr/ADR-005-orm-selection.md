# ADR-005: ORM Selection for Optional Backend Sync Track

**Date**: 2025-01-22  
**Status**: Accepted  
**Deciders**: Architecture Team  
**Affected Components**: Backend database layer, metadata sync APIs

## Context

WebToolsEasy requires a database abstraction layer for the optional backend sync track. Users can optionally sync their workflows, presets, and runs to a PostgreSQL database. The ORM choice must support:

1. **Type Safety**: Full TypeScript support with strict typing (no `any` types)
2. **Migration Management**: First-class migrations with version control
3. **Query Building**: Type-safe query construction and validation
4. **Performance**: Minimal overhead for metadata operations
5. **Developer Experience**: Quick iteration and schema updates
6. **Relationships**: Flexible support for complex foreign key relationships
7. **Database Independence**: Works with PostgreSQL (and potentially other databases)
8. **Community Support**: Active maintenance and good documentation

## Decision

We select **Drizzle ORM** as the primary ORM for the optional backend sync track.

### Drizzle ORM Advantages

1. **Type Safety**
   - Full TypeScript-first design
   - Compile-time type checking for queries
   - No runtime reflection needed
   - Strict null checking compatible

2. **Lightweight**
   - Zero dependencies
   - Minimal bundle size (~10KB)
   - Exceptional performance
   - Direct SQL compilation

3. **SQL-First Approach**
   - Generates clean, readable SQL
   - Manual SQL fallback always available
   - No magic or surprises
   - Excellent for complex queries

4. **Schema Definition**
   - Declarative schema in TypeScript
   - Single source of truth
   - Zero-cost abstractions
   - Can generate migrations

5. **Developer Experience**
   - Quick iteration cycle
   - Clear error messages
   - IDE autocompletion
   - Logical relation API

6. **Migrations**
   - Auto-generation capability
   - Version control friendly
   - Rollback support
   - Atomic transactions

### Example Usage

```typescript
// Schema definition
export const workflows = pgTable(
  "workflows",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id"),
    name: varchar("name", { length: 255 }).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => ({
    userIdIdx: index("idx_workflows_user_id").on(table.userId),
  }),
);

// Type-safe query
const userWorkflows = await db
  .select()
  .from(workflows)
  .where(eq(workflows.userId, userId))
  .execute();
```

## Alternatives Considered

### 1. Prisma ORM

**Rejected because:**

- Large bundle size (~1.5MB)
- Node.js only (TypeScript on top of Node)
- Complex type generation
- Heavy runtime overhead
- Overkill for metadata-only operations

### 2. TypeORM

**Rejected because:**

- Decorator-based design (less clean)
- Significant runtime reflection
- Heavier bundle
- Community fragmentation
- More complex to learn

### 3. Sequelize

**Rejected because:**

- JavaScript-first design
- Weak TypeScript support
- Older patterns and conventions
- Declining community adoption

### 4. Raw PostgreSQL (node-postgres)

**Rejected because:**

- No schema validation
- No type safety
- Manual query building error-prone
- Difficult migrations
- Scalability challenges

### 5. Knex.js

**Rejected because:**

- Query builder only (no ORM features)
- Still significant overhead
- Less type-safe than modern options

## Implementation Strategy

### Phase 1: Schema Design

1. Define tables using Drizzle schema
2. Establish relationships and constraints
3. Generate initial migration

### Phase 2: Basic CRUD

1. Implement Create operations for workflows/presets/runs
2. Implement Read operations with filtering
3. Implement Update and Delete operations
4. Add transaction support for atomic operations

### Phase 3: Complex Queries

1. Implement joins for related data retrieval
2. Add aggregation queries for analytics
3. Optimize with proper indexing

### Phase 4: Migration System

1. Set up migration runner
2. Integrate with development workflow
3. Document migration patterns

### Phase 5: Conflict Resolution

1. Implement last-write-wins strategy
2. Add conflict detection logging
3. Support manual intervention

## Technology Stack

- **Database**: PostgreSQL 14+
- **ORM**: Drizzle ORM 0.28+
- **Migration Tool**: Drizzle Kit
- **Type System**: TypeScript strict mode
- **Driver**: postgres (node-postgres)

## Configuration

## Schema Definition

### Core Tables

**Users** (optional for logged-in sync)

```typescript
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 255 }).unique(),
  name: varchar("name", { length: 255 }),
  encryptionKey: text("encryption_key"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
```

**Workflows** (project workspaces)

```typescript
export const workflows = pgTable("workflows", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id"),
  workflowPackId: varchar("workflow_pack_id", { length: 255 }).notNull(),
  name: varchar("name", { length: 500 }).notNull(),
  description: text("description"),
  tags: text("tags"),
  isPublic: boolean("is_public").default(false),
  isTemplate: boolean("is_template").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  lastUsedAt: timestamp("last_used_at"),
});
```

**Runs** (individual workflow executions)

```typescript
export const runs = pgTable("runs", {
  id: uuid("id").primaryKey().defaultRandom(),
  workflowId: uuid("workflow_id").notNull(),
  status: varchar("status", { length: 50 }).notNull(), // pending, completed, failed
  stepResults: text("step_results"), // JSON array of step data
  errors: text("errors"), // JSON errors if failed
  durationSeconds: integer("duration_seconds"),
  createdAt: timestamp("created_at").defaultNow(),
});
```

**Presets** (reusable step configurations)

```typescript
export const presets = pgTable("presets", {
  id: uuid("id").primaryKey().defaultRandom(),
  workflowId: uuid("workflow_id").notNull(),
  name: varchar("name", { length: 500 }).notNull(),
  stepConfigs: text("step_configs").notNull(), // JSON configuration
  usageCount: integer("usage_count").default(0),
  isPublic: boolean("is_public").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});
```

**Recipes** (encrypted workflow exports)

```typescript
export const recipes = pgTable("recipes", {
  id: uuid("id").primaryKey().defaultRandom(),
  workflowId: uuid("workflow_id").notNull(),
  title: varchar("title", { length: 500 }).notNull(),
  recipeType: varchar("recipe_type", { length: 100 }).notNull(),
  content: text("content").notNull(), // JSON recipe
  checksum: varchar("checksum", { length: 64 }).notNull(), // SHA-256
  isEncrypted: boolean("is_encrypted").default(false),
  cloneCount: integer("clone_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});
```

**Sync Status** (conflict resolution tracking)

```typescript
export const syncStatus = pgTable("sync_status", {
  id: uuid("id").primaryKey().defaultRandom(),
  workflowId: uuid("workflow_id").notNull(),
  resourceType: varchar("resource_type", { length: 100 }).notNull(),
  resourceId: uuid("resource_id").notNull(),
  lastSyncAt: timestamp("last_sync_at").defaultNow(),
  status: varchar("status", { length: 50 }).default("synced"),
  conflicts: text("conflicts"), // JSON if any
});
```

## Configuration

```typescript
// drizzle.config.ts
import type { Config } from "drizzle-kit";

export default {
  schema: "./src/server/db/schema.ts",
  out: "./drizzle/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
} satisfies Config;
```

## Trade-offs

### Advantages

- Minimal runtime overhead
- Type-safe by design
- Clean, readable generated SQL
- Easy to understand and debug
- Excellent TypeScript integration
- Perfect for metadata-only operations

### Disadvantages

- Smaller ecosystem than Prisma
- Fewer "batteries included" features
- Requires more manual query writing
- Migrations require explicit generation
- Less magic (more explicitness needed)

## Success Criteria

1. ✅ Schema defined and type-safe
2. ✅ Full CRUD operations implemented
3. ✅ Migrations working reliably
4. ✅ Queries compile to correct SQL
5. ✅ Performance meets requirements (< 100ms for most queries)
6. ✅ Type safety prevents common errors
7. ✅ Team understands patterns

## Future Considerations

1. **Database Support**: Could extend to MySQL/SQLite if needed
2. **Query Performance**: Monitor and optimize slow queries
3. **Connection Pooling**: Consider PgBouncer for production
4. **Monitoring**: Integrate with APM for query tracking
5. **Caching**: Consider Redis for frequently accessed metadata

## Related Documentation

- [ADR-002: Local-First Storage Architecture](./ADR-002-local-first-storage.md)
- [DB Schema Naming Conventions](../DB_SCHEMA_NAMING_CONVENTIONS.md)
- [Telemetry Stack](./ADR-004-telemetry-stack.md)

## References

- [Drizzle ORM Documentation](https://orm.drizzle.team/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Drizzle Kit Migrations](https://orm.drizzle.team/kit-docs/overview)
