# Screenshot Generation Scripts

This directory contains scripts for generating screenshots of web pages with parallel processing support.

## Scripts

### `generate-screenshots.ts`

Generates screenshots of all web pages (tools and blog posts) in parallel.

**Features:**

- Parallel screenshot generation using multiple browser pages
- Configurable degree of parallelism via `PARALLELISM` environment variable
- Default parallelism: 4 workers
- Automatic directory creation
- Progress logging with emojis
- Graceful error handling and process termination

**Usage:**

```bash
# Use default parallelism (4 workers)
npm run generate:screenshots

# Use custom parallelism (e.g., 8 workers)
PARALLELISM=8 npm run generate:screenshots
```

### `screenshot-generator-bot.ts`

Orchestrates the full screenshot generation process by:

1. Building the Next.js application
2. Starting the production server
3. Waiting for the server to be ready
4. Running the screenshot generation script
5. Cleaning up and terminating the server

**Features:**

- Passes `PARALLELISM` environment variable to screenshot script
- Graceful server shutdown with SIGTERM followed by SIGKILL fallback
- Proper process exit codes
- Signal handling (SIGINT, SIGTERM)
- Guaranteed process termination after completion

**Usage:**

```bash
# Use default parallelism (4 workers)
npm run bot

# Use custom parallelism (e.g., 6 workers)
PARALLELISM=6 npm run bot
```

## Configuration

### Parallelism

The `PARALLELISM` environment variable controls how many browser pages are used simultaneously:

- **Default:** 4 workers
- **Recommended range:** 2-8 workers (depending on system resources)
- **Higher values:** Faster completion but more memory/CPU usage
- **Lower values:** Slower but more stable on resource-constrained systems

### Examples

```bash
# Fast generation with 8 parallel workers
PARALLELISM=8 npm run generate:screenshots

# Conservative generation with 2 workers
PARALLELISM=2 npm run generate:screenshots

# Full bot process with custom parallelism
PARALLELISM=6 npm run bot
```

## Architecture

### Worker Pool Pattern

The screenshot generation uses a worker pool pattern:

1. All screenshot tasks are collected into a queue
2. N workers (browser pages) are created
3. Each worker picks tasks from the queue and processes them
4. Workers continue until the queue is empty
5. All workers close gracefully

### Process Flow

```
generate-screenshots.ts
├── Create browser instance
├── Create N worker pages (parallelism)
├── Distribute tasks among workers
│   ├── Worker 1: Take screenshots from queue
│   ├── Worker 2: Take screenshots from queue
│   ├── Worker N: Take screenshots from queue
│   └── Wait for all workers to complete
├── Close browser
└── Exit with appropriate code
```

## Improvements Made

1. **Parallelism:** Screenshots are now taken in parallel instead of sequentially
2. **Configurability:** Parallelism degree is configurable via environment variable
3. **Better logging:** Progress indicators and worker status messages
4. **Proper termination:** Scripts now properly exit after completion
5. **Error handling:** Better error messages and exit codes
6. **Type safety:** Full TypeScript typing throughout

## Performance

With 89 total screenshots (tools + blog + common pages):

- **Sequential (old):** ~10-15 minutes
- **Parallel (4 workers):** ~3-4 minutes
- **Parallel (8 workers):** ~2-3 minutes

_Actual times depend on page complexity and system resources._
