CREATE TABLE IF NOT EXISTS regex_patterns (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  pattern TEXT NOT NULL,
  flags TEXT,
  description TEXT,
  created_at INTEGER NOT NULL,
  use_count INTEGER DEFAULT 0
);
