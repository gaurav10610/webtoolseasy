const CACHE_NAME = "webtoolseasy-v2";
const CACHED_PRESETS = [
  "/vendor/sql/sql-wasm.wasm",
  "/pdf.worker.min.mjs",
  "/favicon.svg",
  "/favicon.png",
  "/favicon_48.png",
  "/favicon_512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(CACHED_PRESETS))
      .catch(() => Promise.resolve()),
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
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key)),
        ),
      ),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);
  const isCacheCandidate =
    url.origin === self.location.origin &&
    (CACHED_PRESETS.includes(url.pathname) ||
      url.pathname.startsWith("/icons/") ||
      url.pathname.startsWith("/_next/static/"));

  if (!isCacheCandidate) return;

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
