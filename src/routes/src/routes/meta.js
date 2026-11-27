// routes/meta.js
// Responsibility: serve static meta files (robots, sitemap, llms, manifest, sw).
// These are generated in code, not stored as static assets.

import { textResponse, xmlResponse, jsonResponse, jsResponse } from "../lib/responses.js";

const SITE_URL = "https://www.chart-lab.workers.dev";

function robotsTxt() {
  return `User-agent: *
Allow: /

# AI crawlers — explicitly allowed so Chart Lab can be discovered
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
}

function sitemapXml() {
  const pages = ["/", "/create", "/about", "/privacy", "/cookies", "/terms"];
  const urls = pages
    .map(
      (p) =>
        `  <url><loc>${SITE_URL}${p}</loc><changefreq>monthly</changefreq><priority>${
          p === "/" ? "1.0" : p === "/create" ? "0.9" : "0.5"
        }</priority></url>`
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

function llmsTxt() {
  return `# Chart Lab

> A free, no-signup chart generator. Turn numbers into SVG or PNG charts in seconds.
> No account needed and no tracking cookies.

## What it does
- Generates 8 chart types: bar, line, pie, area, stacked-bar, donut, scatter, radar
- Outputs SVG (vector) and PNG (raster)
- Chart data is sent to the Divctor chart service to draw the chart; Chart Lab has no accounts or database. PNG files are made in the browser

## Install as an app
Chart Lab is a PWA. Add it to your home screen and it opens directly to the chart form at /create.

## Pages
- [Home](${SITE_URL}/): landing page
- [Create](${SITE_URL}/create): create a chart (app start page)
- [About](${SITE_URL}/about): what Chart Lab is
- [Privacy](${SITE_URL}/privacy): privacy policy
- [Cookies](${SITE_URL}/cookies): cookie policy
- [Terms](${SITE_URL}/terms): terms of use

## Contact
- GitHub: https://github.com/Ramadan-ibrahim-eg/chart-lab
`;
}

function manifestJson() {
  return {
    name: "Chart Lab — Chart Generator",
    short_name: "Chart Lab",
    description: "Turn numbers into charts in seconds. No sign-up needed.",
    start_url: "/create",
    scope: "/",
    display: "standalone",
    background_color: "#0f3c5c",
    theme_color: "#116782",
    icons: [
      {
        src: "/logo.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any maskable",
      },
    ],
  };
}

function serviceWorkerJs() {
  return `// Chart Lab service worker
const CACHE_NAME = "chart-lab-v2";
const APP_SHELL = [
  "/",
  "/create",
  "/styles.css",
  "/app.js",
  "/logo.svg",
  "/manifest.json",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Never cache API calls — chart data must always be fresh.
  if (url.pathname.startsWith("/api/")) {
    return;
  }

  // Network-first for pages, fall back to cache.
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response.ok && event.request.method === "GET") {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        }
        return response;
      })
      .catch(() => caches.match(event.request).then((r) => r || caches.match("/create")))
  );
});
`;
}

export async function handleMetaRoute(path) {
  switch (path) {
    case "/robots.txt":
      return textResponse(robotsTxt());
    case "/sitemap.xml":
      return xmlResponse(sitemapXml());
    case "/llms.txt":
      return textResponse(llmsTxt());
    case "/manifest.json":
      return jsonResponse(manifestJson());
    case "/sw.js":
      return jsResponse(serviceWorkerJs());
    default:
      return null;
  }
}
