// views/layout.js
// Responsibility: wrap any page with the common HTML shell.
// Includes <head> metadata, header, ad slots, footer, and PWA links.
// No page-specific content here.

import { SITE, NAV, AD_SLOTS } from "../content/strings.js";

/**
 * Escape a string for safe HTML insertion.
 * Used for titles/descriptions that may contain user-controlled text.
 */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Build the full HTML page.
 *
 * @param {object} opts
 * @param {string} opts.title       - page title (without site name)
 * @param {string} opts.description - meta description
 * @param {string} opts.path        - current path (for canonical + active nav)
 * @param {string} opts.content     - page-specific HTML
 * @param {string} [opts.token]     - optional signed token (home page only)
 * @param {object} [opts.jsonLd]    - optional JSON-LD object
 */
export function renderLayout({ title, description, path, content, token, jsonLd }) {
  const fullTitle = title === SITE.name ? title : `${title} — ${SITE.name}`;
  const canonical = `${SITE.url}${path}`;
  const navHtml = NAV.map(
    (item) =>
      `<a href="${item.path}"${item.path === path ? ' aria-current="page"' : ""}>${item.label}</a>`
  ).join("");

  const tokenMeta = token
    ? `<meta name="chart-lab-token" content="${escapeHtml(token)}">`
    : "";

  // jsonLd can be an object or an array of objects.
  const jsonLdScripts = jsonLd
    ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd])
        .map((obj) => `<script type="application/ld+json">${JSON.stringify(obj)}</script>`)
        .join("\n  ")
    : "";

  // Only the /create page loads the form script.
  const appScript =
  path === "/create"
    ? '<script src="/app.js" defer></script>'
    : path === "/download"
    ? '<script src="/download.js" defer></script>'
    : "";

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(fullTitle)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <link rel="canonical" href="${canonical}">
  <meta name="theme-color" content="#116782">

  <!-- Open Graph -->
  <meta property="og:title" content="${escapeHtml(fullTitle)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${SITE.url}/og-image.png">
  <meta property="og:image:type" content="image/png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(fullTitle)}">
  <meta name="twitter:description" content="${escapeHtml(description)}">
  <meta name="twitter:image" content="${SITE.url}/og-image.png">

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">

  <!-- Icons & PWA -->
  <link rel="icon" type="image/svg+xml" href="${SITE.logoUrl}">
  <link rel="apple-touch-icon" href="${SITE.logoUrl}">
  <link rel="manifest" href="/manifest.json">

  <!-- Styles -->
  <link rel="stylesheet" href="/styles.css">
  <script src="/theme.js"></script>

  ${tokenMeta}
  ${jsonLdScripts}
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>

  <div class="ad-slot ad-top" role="complementary" aria-label="Advertisement">
    <span class="ad-label">${AD_SLOTS.top.label}</span>
  </div>

  <header class="site-header">
    <div class="container header-inner">
      <a class="brand" href="/" aria-label="${SITE.name} home">
        <img src="${SITE.logoUrl}" alt="" width="36" height="36">
        <span>${SITE.name}</span>
      </a>
      <nav class="site-nav" aria-label="Main navigation">
        ${navHtml}
        <button type="button" class="theme-toggle" id="theme-toggle" aria-pressed="false" aria-label="Switch to dark mode">Dark mode</button>
      </nav>
    </div>
  </header>

  <main id="main" class="container">
    ${content}
  </main>

  <div class="ad-slot ad-bottom" role="complementary" aria-label="Advertisement">
    <span class="ad-label">${AD_SLOTS.bottom.label}</span>
  </div>

  <footer class="site-footer">
    <div class="container">
      <p>© ${new Date().getFullYear()} ${SITE.name}. All rights reserved.</p>
      <p class="footer-links">
        <a href="${SITE.githubUrl}" rel="noopener">GitHub</a>
      </p>
    </div>
  </footer>
  ${appScript}
</body>
</html>`;
}

/**
 * JSON-LD for the home page — WebApplication schema.
 */
export function homeJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };
}
