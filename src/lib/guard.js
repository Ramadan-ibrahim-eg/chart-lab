// lib/guard.js
// Responsibility: enforce that API requests come from our own frontend.
// Two layers: Origin header check + short-lived signed token.

import { verifyToken } from "./token.js";

const ALLOWED_ORIGIN = "https://www.chart-lab.workers.dev";

/**
 * Check whether a request is allowed to use /api/chart.
 * Returns { ok: true } or { ok: false, status, code, message }.
 */
export async function guardApiRequest(request, url, env) {
  // Layer 1: verify the request comes from our own site.
  const origin = request.headers.get("Origin") || "";
  const referer = request.headers.get("Referer") || "";
  const fetchSite = request.headers.get("Sec-Fetch-Site") || "";

  const fromOurOrigin = origin.startsWith(ALLOWED_ORIGIN);
  const fromOurReferer = referer.startsWith(ALLOWED_ORIGIN);
  const isSameOrigin = fetchSite === "same-origin";

  if (!fromOurOrigin && !fromOurReferer && !isSameOrigin) {
    return {
      ok: false,
      status: 403,
      code: "FORBIDDEN",
      message: "This endpoint is only available from Chart Lab.",
    };
  }

  // Layer 2: signed token.
  const token = url.searchParams.get("_t");
  const secret = env.SIGNING_SECRET;
  if (!secret) {
    return {
      ok: false,
      status: 500,
      code: "INTERNAL_ERROR",
      message: "Service is not configured correctly.",
    };
  }

  const check = await verifyToken(token, secret);
  if (!check.ok) {
    return {
      ok: false,
      status: 403,
      code: "FORBIDDEN",
      message: "Your session has expired. Please refresh the page.",
    };
  }

  return { ok: true };
}
