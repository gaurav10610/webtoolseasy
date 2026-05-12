const CACHE_NAME = "webtoolseasy-wasm-v2";
const WORKFLOW_SHELL_CACHE_NAME = "webtoolseasy-workflow-shell-v1";
const ENABLE_WORKFLOW_SHELL_CACHE = true;

const WASM_ASSETS = ["/vendor/sql/sql-wasm.wasm", "/pdf.worker.min.mjs"];
const WORKFLOW_SHELL_ROUTES = [
  "/workflows",
  "/workflows/api-payload-cleanup",
  "/workflows/blog-publish",
  "/workflows/technical-seo-quick-audit",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    Promise.all([
      caches
        .open(CACHE_NAME)
        .then((cache) => cache.addAll(WASM_ASSETS))
        .catch(() => Promise.resolve()),
      ENABLE_WORKFLOW_SHELL_CACHE
        ? caches
            .open(WORKFLOW_SHELL_CACHE_NAME)
            .then((cache) => cache.addAll(WORKFLOW_SHELL_ROUTES))
            .catch(() => Promise.resolve())
        : Promise.resolve(),
    ]),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter(
              (key) =>
                key !== CACHE_NAME &&
                (!ENABLE_WORKFLOW_SHELL_CACHE ||
                  key !== WORKFLOW_SHELL_CACHE_NAME),
            )
            .map((key) => caches.delete(key)),
        ),
      ),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);
  const shouldCache =
    url.origin === self.location.origin &&
    WASM_ASSETS.some((asset) => url.pathname === asset);

  const shouldCacheWorkflowShell =
    ENABLE_WORKFLOW_SHELL_CACHE &&
    url.origin === self.location.origin &&
    WORKFLOW_SHELL_ROUTES.includes(url.pathname);

  if (!shouldCache && !shouldCacheWorkflowShell) return;

  if (shouldCacheWorkflowShell) {
    event.respondWith(
      caches.open(WORKFLOW_SHELL_CACHE_NAME).then(async (cache) => {
        const cached = await cache.match(event.request);

        const networkFetch = fetch(event.request)
          .then((response) => {
            if (response && response.ok) {
              cache.put(event.request, response.clone());
            }
            return response;
          })
          .catch(() => cached);

        return cached || networkFetch;
      }),
    );
    return;
  }

  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      const cached = await cache.match(event.request);
      const networkFetch = fetch(event.request)
        .then((response) => {
          if (response && response.ok) {
            cache.put(event.request, response.clone());
          }
          return response;
        })
        .catch(() => cached);

      return cached || networkFetch;
    }),
  );
});
