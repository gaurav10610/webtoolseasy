# Database Schema Naming Conventions & Patterns

**Purpose**: Establish consistent naming conventions and design patterns for the WebToolsEasy database schema to ensure maintainability, clarity, and consistency across all database artifacts.

## Overview

These conventions apply to:

- PostgreSQL tables, columns, indexes, constraints
- Foreign key relationships
- Enum types and constants
- Migration files
- Query builders and ORMs (Prisma, Drizzle)

## Table Naming Conventions

### Base Rules

| Element          | Convention               | Examples                             | Notes                                  |
| ---------------- | ------------------------ | ------------------------------------ | -------------------------------------- |
| Table Names      | `snake_case`, **plural** | `users`, `workflow_runs`, `api_logs` | Always plural; represents a collection |
| Abbreviations    | Avoid in main names      | ❌ `wf_runs` ✅ `workflow_runs`      | Use full words for clarity             |
| Reserved Words   | Avoid or quote           | ❌ `user` ✅ `users` or ❌ `select`  | PostgreSQL keywords need quoting       |
| Max Length       | 63 characters            | -                                    | PostgreSQL identifier limit            |
| Underscore Count | Single underscores only  | ❌ `user__email` ✅ `user_email`     | No double underscores                  |

### Domain-Based Table Categories

```sql
-- User & Authentication Domain
users                          -- Core user accounts
user_profiles                  -- Extended user metadata
user_sessions                  -- Active login sessions
user_api_tokens               -- API key storage (encrypted)

-- Workflow Domain
workflow_packs                -- Definition of workflow packs
workflow_runs                 -- User executions of packs
workflow_steps               -- Individual steps within a run
workflow_artifacts           -- Outputs/exports from runs
workflow_presets             -- User-saved configurations

-- Tool Domain
tools                        -- Catalog of available tools
tool_categories              -- Tool taxonomy
tool_usage_logs              -- Activity tracking

-- Content Domain
blog_posts                   -- Blog articles
blog_drafts                  -- Unpublished posts
content_revisions            -- Version history

-- System Domain
audit_logs                   -- Security/compliance logs
system_events               -- Platform events
feature_flags               -- Feature toggles
error_logs                  -- Application errors
analytics_events            -- Privacy-safe metrics
```

### Domain Prefixes (Optional)

For larger schemas, consider prefixes to group related tables:

```sql
-- Option 1: No prefix (cleaner)
users
workflow_runs
blog_posts

-- Option 2: Domain prefix (more explicit for >50 tables)
user_accounts        -- Instead of: users
user_profiles        -- Extended data
auth_sessions        -- Authentication-specific

workflow_definitions -- Metadata
workflow_executions  -- Runtime instances
workflow_artifacts   -- Outputs

content_posts        -- Blog content
content_versions     -- Version history
content_revisions    -- Granular changes
```

**Decision**: Use **no prefix** for clarity until schema exceeds 50 tables. Revisit if needed.

## Column Naming Conventions

### Base Rules

| Element         | Convention                 | Examples                             | Notes                              |
| --------------- | -------------------------- | ------------------------------------ | ---------------------------------- |
| Column Names    | `snake_case`, **singular** | `user_id`, `created_at`, `is_active` | One attribute per column           |
| Boolean Columns | `is_*` or `has_*` prefix   | `is_active`, `has_workspace`         | Boolean intent clear               |
| Count Columns   | `*_count` suffix           | `attempt_count`, `download_count`    | Never allow NULL for counts        |
| Foreign Keys    | `{table_singular}_id`      | `user_id`, `workflow_run_id`         | Explicit source table              |
| Timestamps      | `created_at`, `updated_at` | -                                    | Always UTC, never nullable         |
| Soft Deletes    | `deleted_at`               | -                                    | NULL = active, timestamp = deleted |
| Status          | `status`, not `*_status`   | -                                    | Use ENUM type for constraints      |
| Enum Columns    | `snake_case_enum` type     | `execution_mode`, `user_role`        | Type defined separately            |

### Specific Column Patterns

```sql
-- Primary Keys
id BIGSERIAL PRIMARY KEY        -- Auto-incrementing ID (PostgreSQL standard)
-- OR
id UUID PRIMARY KEY DEFAULT gen_random_uuid()  -- UUID for distributed systems

-- Identifiers & References
user_id BIGINT NOT NULL REFERENCES users(id)
workflow_run_id BIGINT NOT NULL REFERENCES workflow_runs(id)

-- Booleans
is_active BOOLEAN NOT NULL DEFAULT true
is_deleted BOOLEAN NOT NULL DEFAULT false
has_premium_access BOOLEAN NOT NULL DEFAULT false
is_verified_email BOOLEAN NOT NULL DEFAULT false

-- Timestamps
created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
deleted_at TIMESTAMP                           -- NULL = active
expires_at TIMESTAMP                           -- TTL column
completed_at TIMESTAMP                         -- Event completion time

-- Text Fields
email VARCHAR(255) NOT NULL UNIQUE
slug VARCHAR(255) NOT NULL UNIQUE
name VARCHAR(255) NOT NULL
description TEXT                               -- Longer unstructured text
metadata JSONB                                 -- Flexible schema storage

-- Counts & Metrics
retry_count INTEGER NOT NULL DEFAULT 0
attempt_count INTEGER NOT NULL DEFAULT 0
total_bytes_processed BIGINT NOT NULL DEFAULT 0

-- Enums
status workflow_status NOT NULL DEFAULT 'pending'
execution_mode execution_mode_enum NOT NULL DEFAULT 'local-only'
user_role user_role_enum NOT NULL DEFAULT 'user'
priority priority_level NOT NULL DEFAULT 'normal'

-- Hashes & Checksums
content_hash VARCHAR(64)                       -- SHA-256 hex
file_checksum VARCHAR(32)                      -- MD5 or similar
```

## Foreign Key Naming

### Rules

| Pattern            | Format                  | Example                   | Notes                               |
| ------------------ | ----------------------- | ------------------------- | ----------------------------------- |
| FK Constraint Name | `fk_{source}__{target}` | `fk_workflow_runs__users` | Double underscore separator         |
| OR (Short)         | `fk_{table1}_{table2}`  | `fk_runs_users`           | If column names match               |
| Index on FK        | `idx_{column}`          | `idx_user_id`             | Automatic on FK, explicit otherwise |

### Examples

```sql
-- Long form (recommended for clarity)
ALTER TABLE workflow_runs
ADD CONSTRAINT fk_workflow_runs__users
FOREIGN KEY (user_id) REFERENCES users(id);

ALTER TABLE workflow_steps
ADD CONSTRAINT fk_workflow_steps__workflow_runs
FOREIGN KEY (workflow_run_id) REFERENCES workflow_runs(id);

-- Junction Tables (many-to-many)
CREATE TABLE user_workflow_subscriptions (
  user_id BIGINT NOT NULL REFERENCES users(id),
  workflow_pack_id BIGINT NOT NULL REFERENCES workflow_packs(id),
  subscribed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (user_id, workflow_pack_id),
  CONSTRAINT fk_subscriptions__users FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT fk_subscriptions__packs FOREIGN KEY (workflow_pack_id) REFERENCES workflow_packs(id)
);
```

## Enum Type Naming

### Rules

| Element        | Convention             | Examples                                | Notes                           |
| -------------- | ---------------------- | --------------------------------------- | ------------------------------- |
| Enum Type Name | `snake_case_enum`      | `user_role_enum`, `execution_mode_enum` | Suffix with `_enum`             |
| Enum Values    | `SCREAMING_SNAKE_CASE` | `'ADMIN'`, `'USER'`                     | Uppercase for clarity           |
| Value Grouping | Logical order          | See examples                            | Order by frequency or hierarchy |

### Standard Enums

```sql
-- User Roles
CREATE TYPE user_role_enum AS ENUM (
  'admin',           -- Full system access
  'moderator',       -- Moderation privileges
  'user',            -- Standard user
  'viewer'           -- Read-only access
);

-- Workflow Execution Modes
CREATE TYPE execution_mode_enum AS ENUM (
  'local-only',      -- No network calls
  'network',         -- API calls allowed
  'export-only'      -- Prepare for export
);

-- Workflow Run Status
CREATE TYPE workflow_status_enum AS ENUM (
  'pending',         -- Awaiting execution
  'running',         -- Currently processing
  'completed',       -- Finished successfully
  'failed',          -- Error occurred
  'cancelled',       -- User stopped
  'blocked'          -- Awaiting input
);

-- User Account Status
CREATE TYPE account_status_enum AS ENUM (
  'active',          -- Good standing
  'suspended',       -- Temporary block
  'deleted',         -- Soft deleted
  'archived'         -- Inactive for 1yr+
);

-- Priority Levels
CREATE TYPE priority_level_enum AS ENUM (
  'low',
  'normal',
  'high',
  'critical'
);
```

## Index Naming

### Rules

| Type          | Format                             | Example                                | When to Create                  |
| ------------- | ---------------------------------- | -------------------------------------- | ------------------------------- |
| Single Column | `idx_{table}_{column}`             | `idx_users_email`                      | FK columns, frequently searched |
| Composite     | `idx_{table}_{col1}_{col2}`        | `idx_workflow_runs_user_id_created_at` | Common WHERE + ORDER BY pairs   |
| Unique        | `idx_unique_{table}_{column}`      | `idx_unique_users_email`               | Alternate keys                  |
| Full Text     | `idx_fts_{table}_{column}`         | `idx_fts_blog_posts_content`           | Text search columns             |
| Partial       | `idx_{table}_{column}_{condition}` | `idx_users_email_deleted_null`         | Only active records             |

### Examples

```sql
-- Foreign Key Index (usually automatic)
CREATE INDEX idx_workflow_runs_user_id
ON workflow_runs(user_id);

-- Composite Index for Common Queries
CREATE INDEX idx_workflow_runs_user_created
ON workflow_runs(user_id, created_at DESC);

-- Unique Index for Business Key
CREATE UNIQUE INDEX idx_unique_users_email
ON users(LOWER(email));

-- Partial Index (only active records)
CREATE INDEX idx_active_users
ON users(created_at)
WHERE deleted_at IS NULL;

-- Full-text Search
CREATE INDEX idx_fts_blog_posts
ON blog_posts USING gin(to_tsvector('english', content));
```

## Constraint Naming

### Rules

| Type        | Format                    | Example                  |
| ----------- | ------------------------- | ------------------------ |
| Primary Key | `pk_{table}`              | `pk_users`               |
| Unique      | `uq_{table}_{column}`     | `uq_users_email`         |
| Check       | `chk_{table}_{condition}` | `chk_users_age_positive` |
| Default     | Implicit in column        | -                        |

### Examples

```sql
CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  age INTEGER NOT NULL,

  CONSTRAINT pk_users PRIMARY KEY (id),
  CONSTRAINT uq_users_email UNIQUE (email),
  CONSTRAINT chk_users_age_positive CHECK (age > 0),
  CONSTRAINT chk_users_email_format CHECK (email ~ '@')
);
```

## Schema Organization Strategy

### Approach: Domain-Driven Grouping

Organize related tables by business domain within migrations:

```sql
-- Migration: 001_create_user_domain.sql
CREATE TABLE users (...)
CREATE TABLE user_profiles (...)
CREATE TABLE user_api_tokens (...)

-- Migration: 002_create_workflow_domain.sql
CREATE TABLE workflow_packs (...)
CREATE TABLE workflow_runs (...)
CREATE TABLE workflow_steps (...)

-- Migration: 003_create_content_domain.sql
CREATE TABLE blog_posts (...)
CREATE TABLE blog_drafts (...)

-- Migration: 004_create_system_domain.sql
CREATE TABLE audit_logs (...)
CREATE TABLE error_logs (...)
CREATE TABLE analytics_events (...)
```

### Table Dependency Graph

```
users
├─ user_profiles (1:1 to users)
├─ user_api_tokens (1:many to users)
├─ user_sessions (1:many to users)
└─ workflow_runs (many to users)

workflow_packs (independent)

workflow_runs (many to users)
├─ workflow_steps (1:many to workflow_runs)
└─ workflow_artifacts (1:many to workflow_runs)

tools (independent)
└─ tool_usage_logs (many to tools)

blog_posts (many to users)
├─ blog_drafts (optional parent)
└─ content_revisions (1:many)

audit_logs (system logging)
analytics_events (system analytics)
error_logs (system logging)
```

## Common Pitfalls & How to Avoid

### ❌ Pitfall 1: Singular Table Names

```sql
-- WRONG
CREATE TABLE user (...)
SELECT * FROM user;

-- RIGHT
CREATE TABLE users (...)
SELECT * FROM users;

-- Reason: Plural is standard SQL convention, clearer in queries
```

### ❌ Pitfall 2: Ambiguous Foreign Keys

```sql
-- WRONG
CREATE TABLE workflow_runs (
  id BIGSERIAL PRIMARY KEY,
  created_by BIGINT,  -- Ambiguous: created by what?
);

-- RIGHT
CREATE TABLE workflow_runs (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id),
);
```

### ❌ Pitfall 3: Status Instead of Enum

```sql
-- WRONG
CREATE TABLE workflow_runs (
  status VARCHAR(255)  -- Could be 'pending', 'pend', 'waiting', etc
);

-- RIGHT
CREATE TYPE workflow_status_enum AS ENUM ('pending', 'running', 'completed', 'failed');
CREATE TABLE workflow_runs (
  status workflow_status_enum NOT NULL DEFAULT 'pending'
);
```

### ❌ Pitfall 4: Missing Timestamps

```sql
-- WRONG
CREATE TABLE workflow_runs (
  id BIGSERIAL PRIMARY KEY,
  workflow_pack_id BIGINT
  -- Missing: when was this created? When updated?
);

-- RIGHT
CREATE TABLE workflow_runs (
  id BIGSERIAL PRIMARY KEY,
  workflow_pack_id BIGINT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

### ❌ Pitfall 5: No Index on Foreign Keys

```sql
-- WRONG
CREATE TABLE workflow_runs (
  user_id BIGINT NOT NULL REFERENCES users(id)
  -- No index: queries like "SELECT * FROM workflow_runs WHERE user_id = ?" are slow
);

-- RIGHT
CREATE TABLE workflow_runs (
  user_id BIGINT NOT NULL REFERENCES users(id)
);
CREATE INDEX idx_workflow_runs_user_id ON workflow_runs(user_id);
```

## ORM/Migration Considerations

### Prisma Schema

```prisma
// Following these conventions makes Prisma schemas clear

model User {
  id        Int       @id @default(autoincrement())
  email     String    @unique
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  deletedAt DateTime?

  // Relations
  workflowRuns   WorkflowRun[]
  apiTokens      UserApiToken[]

  @@map("users")  // Maps to table name
}

model WorkflowRun {
  id              Int    @id @default(autoincrement())
  userId          Int
  user            User   @relation(fields: [userId], references: [id])
  workflowPackId  Int
  status          String @default("pending")
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  workflowSteps   WorkflowStep[]
  artifacts       WorkflowArtifact[]

  @@index([userId])
  @@index([createdAt])
  @@map("workflow_runs")
}
```

### Drizzle ORM Schema

```typescript
import {
  pgTable,
  serial,
  varchar,
  timestamp,
  foreignKey,
  index,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const workflowRuns = pgTable(
  "workflow_runs",
  {
    id: serial("id").primaryKey(),
    userId: serial("user_id").notNull(),
    workflowPackId: serial("workflow_pack_id").notNull(),
    status: varchar("status").notNull().default("pending"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => ({
    userIdIdx: index("idx_workflow_runs_user_id").on(table.userId),
    userIdFk: foreignKey({
      columns: [table.userId],
      foreignColumns: [users.id],
      name: "fk_workflow_runs__users",
    }),
  }),
);
```

## Migration Naming Convention

```
migrations/
├── 001_create_user_domain.sql         -- Initial schema
├── 002_create_workflow_domain.sql
├── 003_create_content_domain.sql
├── 004_add_user_api_tokens.sql        -- New table
├── 005_add_email_verification.sql     -- Add column
├── 006_add_workflow_run_index.sql     -- Add index
└── 007_add_audit_logging.sql          -- New feature
```

**Format**: `{sequence}_{description}.sql`

## Testing Queries

```sql
-- Verify naming consistency
SELECT table_name, column_name
FROM information_schema.columns
WHERE table_schema = 'public'
ORDER BY table_name, ordinal_position;

-- Check for non-standard naming (identify violations)
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_name !~ '^[a-z_]+$';  -- Should match snake_case

-- Verify all foreign keys are indexed
SELECT constraint_name, table_name, column_name
FROM information_schema.constraint_column_usage
WHERE table_schema = 'public'
  AND constraint_type = 'FOREIGN KEY'
  AND NOT EXISTS (
    SELECT 1 FROM pg_indexes
    WHERE schemaname = 'public'
      AND tablename = table_name
  );
```

## References

- [PostgreSQL Naming Best Practices](https://www.postgresql.org/docs/current/)
- [Database Naming Conventions](https://dev.mysql.com/doc/refman/8.0/en/identifiers.html)
- Prisma Docs: Schema organization
- Drizzle ORM: Type-safe schema definition
