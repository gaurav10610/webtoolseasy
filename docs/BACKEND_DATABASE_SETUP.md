# Backend Database Integration Guide

**Status**: TB-159, TB-160, TB-161 Documentation  
**Purpose**: Setup and maintenance of local PostgreSQL for metadata sync track

## Quick Start

### Prerequisites

- Docker and Docker Compose installed
- Node.js 18+
- Environment variables configured

### Local Database Setup

#### 1. Start PostgreSQL with Docker Compose

```bash
# Create docker-compose.yml in project root
docker-compose up -d

# Verify it's running
docker ps | grep postgres
```

#### 2. Configure Environment

Create `.env.local`:

```bash
DATABASE_URL=postgresql://webtoolseasy:webtoolseasy_dev@localhost:5432/webtoolseasy
MIGRATION_ENV=development
```

#### 3. Run Migrations

```bash
# Install Drizzle CLI
npm install -D drizzle-kit

# Generate initial migration from schema
npx drizzle-kit generate:pg

# Apply migrations to database
npx drizzle-kit up:pg
```

## Docker Compose Configuration

```yaml
# docker-compose.yml
version: "3.8"

services:
  postgres:
    image: postgres:16-alpine
    container_name: webtoolseasy-postgres
    environment:
      POSTGRES_USER: webtoolseasy
      POSTGRES_PASSWORD: webtoolseasy_dev
      POSTGRES_DB: webtoolseasy
    ports:
      - "5432:5432"
    volumes:
      - postgres-data:/var/lib/postgresql/data
      - ./scripts/init.sql:/docker-entrypoint-initdb.d/init.sql
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U webtoolseasy"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  postgres-data:
    driver: local
```

## Database Scripts

Add to `package.json`:

```json
{
  "scripts": {
    "db:up": "docker-compose up -d",
    "db:down": "docker-compose down",
    "db:logs": "docker-compose logs -f postgres",
    "db:reset": "docker-compose down -v && docker-compose up -d",
    "db:migrate": "drizzle-kit up:pg",
    "db:generate": "drizzle-kit generate:pg",
    "db:studio": "drizzle-kit studio"
  }
}
```

## Migration Workflow

### Creating a New Migration

```bash
# 1. Update schema in src/server/db/schema.ts
# 2. Generate migration
npm run db:generate

# 3. Verify generated migration in drizzle/migrations/
# 4. Apply migration
npm run db:migrate

# 5. Test changes in development
# 6. Commit migration files to git
```

### Squashing Migrations

For production, squash development migrations:

```bash
# Create squashed migration
npx drizzle-kit up:pg --env=production
```

### Rollback Strategy

```typescript
// Drizzle doesn't auto-rollback, use these strategies:

// 1. Reset to initial state
docker-compose down -v && docker-compose up -d && npm run db:migrate

// 2. Manual SQL rollback
docker-compose exec postgres psql -U webtoolseasy -d webtoolseasy -c "
  DROP TABLE IF EXISTS new_table;
  -- other rollback commands
"

// 3. Restore from backup
docker-compose down -v
docker run -v postgres-backup:/data postgres:16 bash -c 'pg_restore /data/backup.sql | psql ...'
```

## Privacy Guardrails

### TB-161: Server-Side Schema Guard

The schema is designed to prevent private file content persistence:

```typescript
// FORBIDDEN: File content in database
const schema = `
  CREATE TABLE files (
    content BYTEA  -- ❌ NEVER store file content
  );
`;

// ALLOWED: File metadata only
const schema = `
  CREATE TABLE artifacts (
    id UUID PRIMARY KEY,
    name VARCHAR,
    mimeType VARCHAR,
    sizeBytes INTEGER,
    checksum VARCHAR,  -- Only store hash, not content
    storagePath VARCHAR  -- Reference to S3, etc.
  );
`;
```

### Validation Rules

Add to API routes handling data:

```typescript
// Example API endpoint
export async function POST(req: Request) {
  const body = await req.json();

  // Guard 1: Validate no file content
  if (body.fileContent || body.rawData?.length > 1000) {
    throw new Error("File content forbidden - use artifacts only");
  }

  // Guard 2: Validate no API keys
  if (
    JSON.stringify(body).includes("password") ||
    JSON.stringify(body).includes("token") ||
    JSON.stringify(body).includes("key")
  ) {
    throw new Error("Credentials forbidden in database");
  }

  // Guard 3: Validate no PII
  if (body.email || body.phone || body.ssn) {
    throw new Error("PII forbidden - store user ID only");
  }

  // Proceed with safe data
  return await db.insert(workflows).values(body);
}
```

### Content Validation

```typescript
export function validateWorkflowData(data: any) {
  const issues: string[] = [];

  // Check step results for forbidden content
  if (data.stepResults) {
    const jsonStr = JSON.stringify(data.stepResults);

    if (jsonStr.length > 1000000) {
      issues.push("Step results too large (>1MB) - suspected file content");
    }

    if (jsonStr.includes("-----BEGIN") || jsonStr.includes("-----END")) {
      issues.push("Detected PEM/certificate content");
    }

    if (jsonStr.includes("token") && jsonStr.includes(":")) {
      issues.push("Detected likely credential content");
    }
  }

  return issues;
}
```

## Development Workflow

### Local Testing

```bash
# 1. Start database
npm run db:up

# 2. Apply migrations
npm run db:migrate

# 3. Test with Drizzle Studio
npm run db:studio

# 4. Develop and test
npm run dev

# 5. When done
npm run db:down
```

### Testing with Real Data

```bash
# Create test data
npm run db:seed

# Run full test suite
npm run test

# Clear database
npm run db:reset
```

## Production Considerations

### Connection Pooling

For production, use PgBouncer:

```yaml
# docker-compose.prod.yml
services:
  pgbouncer:
    image: edoburu/pgbouncer:latest
    ports:
      - "6432:6432"
    environment:
      DATABASE_URL: postgresql://postgres:password@postgres:5432/webtoolseasy
      PGBOUNCER_POOL_MODE: transaction
      PGBOUNCER_MAX_CLIENT_CONN: 1000
      PGBOUNCER_DEFAULT_POOL_SIZE: 25
    depends_on:
      - postgres
```

### Backup Strategy

```bash
# Daily backup
docker-compose exec postgres pg_dump -U webtoolseasy webtoolseasy > backup-$(date +%Y-%m-%d).sql

# Restore from backup
cat backup-2024-01-22.sql | docker-compose exec -T postgres psql -U webtoolseasy -d webtoolseasy
```

### Monitoring

Monitor database health:

```typescript
// Health check endpoint
export async function GET() {
  try {
    await db.execute(sql`SELECT 1`);
    return Response.json({ status: "healthy" });
  } catch (error) {
    return Response.json(
      { status: "unhealthy", error: error.message },
      { status: 500 },
    );
  }
}
```

## Troubleshooting

### Database Connection Refused

```bash
# Check if container is running
docker ps | grep postgres

# View logs
npm run db:logs

# Restart
npm run db:reset
```

### Migration Errors

```bash
# Check pending migrations
npx drizzle-kit up:pg --dry

# View full error
npm run db:migrate --verbose
```

### Schema Conflicts

```bash
# Reset to clean state
npm run db:reset

# Re-apply migrations
npm run db:migrate
```

## Resources

- [Drizzle ORM Documentation](https://orm.drizzle.team/)
- [PostgreSQL Docker Image](https://hub.docker.com/_/postgres)
- [Drizzle Kit Migration Guide](https://orm.drizzle.team/kit-docs/overview)
- [ADR-005: ORM Selection](./adr/ADR-005-orm-selection.md)
