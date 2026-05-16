import { createClient } from "@libsql/client";
import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import "dotenv/config";

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url || !authToken) {
  console.error("❌ Missing TURSO_DATABASE_URL or TURSO_AUTH_TOKEN in environment variables.");
  process.exit(1);
}

const db = createClient({ url, authToken });

async function runMigrations() {
  console.log(`🚀 Connecting to Turso database at ${url}`);

  // Create a tracking table for migrations if it doesn't exist
  await db.execute(`
    CREATE TABLE IF NOT EXISTS _migrations (
      name TEXT PRIMARY KEY,
      applied_at INTEGER NOT NULL
    );
  `);

  const migrationsDir = resolve(process.cwd(), "src/lib/migrations");
  const files = readdirSync(migrationsDir).filter((file) => file.endsWith(".sql")).sort();

  for (const file of files) {
    const isApplied = await db.execute({
      sql: "SELECT name FROM _migrations WHERE name = ?",
      args: [file],
    });

    if (isApplied.rows.length > 0) {
      console.log(`⏩ Skipping ${file} (already applied)`);
      continue;
    }

    console.log(`⏳ Applying ${file}...`);
    const sql = readFileSync(resolve(migrationsDir, file), "utf-8");
    
    try {
      await db.execute(sql);
      await db.execute({
        sql: "INSERT INTO _migrations (name, applied_at) VALUES (?, ?)",
        args: [file, Date.now()],
      });
      console.log(`✅ Successfully applied ${file}`);
    } catch (error) {
      console.error(`❌ Failed to apply ${file}:`);
      console.error(error);
      process.exit(1);
    }
  }

  console.log("🎉 All migrations applied successfully.");
}

runMigrations().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
