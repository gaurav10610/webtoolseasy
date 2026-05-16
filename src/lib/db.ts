import { Pool } from "pg";

const databaseUrl = process.env.DATABASE_URL;

declare global {
  // eslint-disable-next-line no-var
  var __webtoolseasyPgPool: Pool | undefined;
  // eslint-disable-next-line no-var
  var __webtoolseasyPgSchemaReady: Promise<void> | undefined;
}

function createPool() {
  if (!databaseUrl) {
    return null;
  }

  return new Pool({
    connectionString: databaseUrl,
    ssl:
      process.env.NODE_ENV === "production"
        ? { rejectUnauthorized: false }
        : undefined,
  });
}

export const db = globalThis.__webtoolseasyPgPool ?? createPool();

if (db && !globalThis.__webtoolseasyPgPool) {
  globalThis.__webtoolseasyPgPool = db;
}

export function getDb() {
  if (!db) {
    throw new Error("Postgres database URL missing. Please set DATABASE_URL.");
  }

  return db;
}

export async function ensureArchitectureTable() {
  if (!db) {
    throw new Error("Postgres database URL missing. Please set DATABASE_URL.");
  }

  if (!globalThis.__webtoolseasyPgSchemaReady) {
    globalThis.__webtoolseasyPgSchemaReady = db
      .query(
        `
      CREATE TABLE IF NOT EXISTS architectures (
        id TEXT PRIMARY KEY,
        slug TEXT UNIQUE NOT NULL,
        data TEXT NOT NULL,
        created_at BIGINT NOT NULL,
        view_count INTEGER NOT NULL DEFAULT 0
      )
    `,
      )
      .then(() => undefined);
  }

  return globalThis.__webtoolseasyPgSchemaReady;
}
