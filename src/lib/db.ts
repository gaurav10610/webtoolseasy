import { createClient } from "@libsql/client";

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

// Throw a more descriptive error if these are missing, but allow the app to 
// build if they are not strictly required for every single route.
export const db = url && authToken
  ? createClient({ url, authToken })
  : null;

export function getDb() {
  if (!db) {
    throw new Error(
      "Turso database credentials missing. Please set TURSO_DATABASE_URL and TURSO_AUTH_TOKEN."
    );
  }
  return db;
}
