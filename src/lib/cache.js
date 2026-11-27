// lib/cache.js
// Responsibility: wrap Cloudflare Cache API for SVG responses.
// Key is built from chart parameters, so identical requests share a cache entry.
// No user data is stored — only the rendered SVG.

const CACHE_TTL_SECONDS = 3600; // 1 hour

/**
 * Build a deterministic cache key from chart parameters.
 * Order matters: we sort keys so {a,b} and {b,a} produce the same key.
 */
function buildCacheKey(params) {
  const sorted = Object.keys(params)
    .filter((k) => params[k] !== undefined && params[k] !== null && params[k] !== "")
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join("&");
  return `https://chart-lab.workers.dev/__cache/chart?${sorted}`;
}

/**
 * Try to read an SVG from cache.
 * Returns { hit: true, svg } or { hit: false }.
 */
export async function getCachedChart(params) {
  const cache = caches.default;
  const key = buildCacheKey(params);
  const response = await cache.match(key);
  if (!response) return { hit: false };
  const svg = await response.text();
  return { hit: true, svg };
}

/**
 * Store an SVG in cache.
 * Fire-and-forget: caller does not need to wait.
 */
export async function cacheChart(params, svg, ctx) {
  const cache = caches.default;
  const key = buildCacheKey(params);
  const response = new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": `public, max-age=${CACHE_TTL_SECONDS}`,
    },
  });
  // Use ctx.waitUntil if available so the response is not delayed.
  const promise = cache.put(key, response);
  if (ctx && typeof ctx.waitUntil === "function") {
    ctx.waitUntil(promise);
  } else {
    await promise;
  }
}
