// worker.js — Chart Lab entry point
// Responsibility: route requests + add security headers. No business logic.

import { renderLayout } from "./views/layout.js";
import { renderLanding, landingJsonLd } from "./views/landing.js";
import { renderCreate } from "./views/create.js";
import { SITE } from "./content/strings.js";
import { createToken } from "./lib/token.js";
import { STYLES } from "./public/styles.js";
import { APP_JS } from "./public/scripts.js";
import { LOGO_SVG } from "./public/logo.js";
import { htmlResponse, jsonResponse, errorResponse } from "./lib/responses.js";
import { handleMetaRoute } from "./routes/meta.js";
import { handleApiRoute } from "./routes/api.js";
import { renderDownload } from "./views/download.js";
import { DOWNLOAD_JS } from "./public/download-scripts.js";
import { THEME_JS } from "./public/theme-script.js";
import { renderAbout } from "./views/about.js";
import { renderPrivacy } from "./views/privacy.js";
import { renderCookies } from "./views/cookies.js";
import { renderTerms } from "./views/terms.js";
import { OG_IMAGE_BASE64, OG_IMAGE_MIME } from "./public/og-image.js";
// Security headers applied to every response.
const SECURITY_HEADERS = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
"Content-Security-Policy":
  "default-src 'self'; " +
  "img-src 'self' data: blob:; " +
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
  "script-src 'self'; " +
  "connect-src 'self'; " +
  "font-src 'self' https://fonts.gstatic.com; " +
  "base-uri 'self'; " +
  "form-action 'self'; " +
  "frame-ancestors 'none';",
};

function withSecurityHeaders(response) {
  const headers = new Headers(response.headers);
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    headers.set(key, value);
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    try {
      // Static assets served from the Worker itself.
      if (path === "/styles.css" && method === "GET") {
        return withSecurityHeaders(
          new Response(STYLES, {
            headers: {
              "Content-Type": "text/css; charset=utf-8",
              "Cache-Control": "public, max-age=86400",
            },
          })
        );
      }

      if (path === "/logo.svg" && method === "GET") {
        return withSecurityHeaders(
          new Response(LOGO_SVG, {
            headers: {
              "Content-Type": "image/svg+xml; charset=utf-8",
              "Cache-Control": "public, max-age=86400",
            },
          })
        );
      }

if (path === "/og-image.png" && method === "GET") {
  if (!OG_IMAGE_BASE64) {
    // Fallback: serve the SVG logo.
    return withSecurityHeaders(
      new Response(LOGO_SVG, {
        headers: {
          "Content-Type": "image/svg+xml; charset=utf-8",
          "Cache-Control": "public, max-age=86400",
        },
      })
    );
  }
  // Decode base64 via fetch on a data URL (works in Workers, no atob/Buffer).
  const dataUrl = `data:${OG_IMAGE_MIME};base64,${OG_IMAGE_BASE64}`;
  const upstream = await fetch(dataUrl);
  const bytes = await upstream.arrayBuffer();
  return withSecurityHeaders(
    new Response(bytes, {
      headers: {
        "Content-Type": OG_IMAGE_MIME,
        "Cache-Control": "public, max-age=86400",
      },
    })
  );
}


      if (path === "/app.js" && method === "GET") {
        return withSecurityHeaders(
          new Response(APP_JS, {
            headers: {
              "Content-Type": "application/javascript; charset=utf-8",
              "Cache-Control": "public, max-age=3600",
            },
          })
        );
      }

      if (path === "/theme.js" && method === "GET") {
        return withSecurityHeaders(
          new Response(THEME_JS, {
            headers: {
              "Content-Type": "application/javascript; charset=utf-8",
              "Cache-Control": "public, max-age=3600",
            },
          })
        );
      }

      if (path === "/download.js" && method === "GET") {
  return withSecurityHeaders(
    new Response(DOWNLOAD_JS, {
      headers: {
        "Content-Type": "application/javascript; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    })
  );
}

if (path === "/about" && method === "GET") {
  const html = renderLayout({
    title: "About",
    description: "Learn about Chart Lab — a free, no-signup chart generator.",
    path: "/about",
    content: renderAbout(),
  });
  return withSecurityHeaders(htmlResponse(html));
}

if (path === "/privacy" && method === "GET") {
  const html = renderLayout({
    title: "Privacy Policy",
    description: "Chart Lab privacy policy. We do not collect or store your data.",
    path: "/privacy",
    content: renderPrivacy(),
  });
  return withSecurityHeaders(htmlResponse(html));
}

if (path === "/cookies" && method === "GET") {
  const html = renderLayout({
    title: "Cookie Policy",
    description: "Chart Lab cookie policy. We do not use cookies.",
    path: "/cookies",
    content: renderCookies(),
  });
  return withSecurityHeaders(htmlResponse(html));
}

if (path === "/terms" && method === "GET") {
  const html = renderLayout({
    title: "Terms of Use",
    description: "Chart Lab terms of use.",
    path: "/terms",
    content: renderTerms(),
  });
  return withSecurityHeaders(htmlResponse(html));
}

if (path === "/download" && method === "GET") {
  const html = renderLayout({
    title: "Download your chart",
    description: "Download your chart as PNG or SVG.",
    path: "/download",
    content: renderDownload(),
  });
  return withSecurityHeaders(htmlResponse(html));
}

      // Health check.
      if (path === "/health" && method === "GET") {
        return withSecurityHeaders(jsonResponse({ status: "ok" }));
      }

      // API routes.
      if (path.startsWith("/api/")) {
        return withSecurityHeaders(await handleApiRoute(request, env, ctx));
      }

      // Meta routes: robots.txt, sitemap.xml, llms.txt, manifest.json, sw.js.
      const metaResponse = await handleMetaRoute(path);
      if (metaResponse) {
        return withSecurityHeaders(metaResponse);
      }

      // Landing page.
      if (path === "/" && method === "GET") {
        const html = renderLayout({
          title: SITE.name,
          description: SITE.description,
          path: "/",
          content: renderLanding(),
          jsonLd: landingJsonLd(),
        });
        return withSecurityHeaders(htmlResponse(html));
      }

      // Create page (form + token).
      if (path === "/create" && method === "GET") {
        const token = await createToken(env.SIGNING_SECRET);
        const html = renderLayout({
          title: "Create a chart",
          description:
            "Create a bar, line, pie, area, stacked bar, donut, scatter, or radar chart. No sign-up required.",
          path: "/create",
          content: renderCreate(),
          token,
          jsonLd: {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: SITE.name,
            url: `${SITE.url}/create`,
            description: SITE.description,
            applicationCategory: "UtilitiesApplication",
            operatingSystem: "Any",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          },
        });
        return withSecurityHeaders(htmlResponse(html));
      }

      // All other paths: 404.
      return withSecurityHeaders(
        errorResponse(404, "NOT_FOUND", "The requested page does not exist.")
      );
    } catch (err) {
      // Never leak internal errors to the user.
      return withSecurityHeaders(
        errorResponse(500, "INTERNAL_ERROR", "Something went wrong. Please try again.")
      );
    }
  },
};
