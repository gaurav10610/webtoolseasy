# DB Backup and Restore Playbook (Metadata Only)

## Scope

This playbook covers backup and restore for optional metadata-sync PostgreSQL databases used by WebToolsEasy.

- Included: projects, runs, presets, recipes, moderation metadata.
- Excluded: raw file contents, credentials, secrets, or private artifacts.

## Backup Policy

- Daily logical backup: 02:00 UTC.
- Weekly retention: keep 8 weekly snapshots.
- Daily retention: keep 14 daily snapshots.
- Monthly retention: keep 6 monthly snapshots.

## Commands

### Full Logical Backup

```bash
pg_dump "$DATABASE_URL" --format=custom --file=backup-$(date +%Y%m%d-%H%M).dump
```

### Schema-Only Backup

```bash
pg_dump "$DATABASE_URL" --schema-only --file=schema-$(date +%Y%m%d-%H%M).sql
```

### Restore Full Backup

```bash
pg_restore --clean --if-exists --no-owner --dbname "$DATABASE_URL" backup-20260512-0200.dump
```

### Verify Restore

```bash
psql "$DATABASE_URL" -c "SELECT COUNT(*) FROM projects;"
psql "$DATABASE_URL" -c "SELECT COUNT(*) FROM recipes;"
psql "$DATABASE_URL" -c "SELECT COUNT(*) FROM runs;"
```

## Validation Checklist

- Backup file exists and non-empty.
- Restore command exits with zero status.
- Core table counts are within expected range.
- Latest migration version is present.
- No forbidden fields (raw file content, secrets) appear in restored metadata.

## Incident Recovery Procedure

1. Freeze writes to sync APIs.
2. Capture emergency snapshot of current DB.
3. Restore latest known-good backup to staging.
4. Run validation checklist.
5. Promote restored DB and re-enable writes.
6. Publish recovery summary and timeline.

## RTO/RPO Targets

- RTO: 60 minutes.
- RPO: 24 hours (daily backups).
