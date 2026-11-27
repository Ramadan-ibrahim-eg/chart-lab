// routes/api.js
// Responsibility: handle /api/* routes. Validate input, call divctor,
// return SVG or a structured error. No HTML, no views.

import { guardApiRequest } from "../lib/guard.js";
import { generateChart } from "../lib/divctor.js";
import { validateChartParams } from "../lib/validate.js";
import { svgResponse, errorResponse } from "../lib/responses.js";
import { getCachedChart, cacheChart } from "../lib/cache.js";

export async function handleApiRoute(request, env, ctx) {
  const url = new URL(request.url);
  const path = url.pathname;

  if (path === "/api/chart" && request.method === "GET") {
    return handleGenerateChart(request, url, env, ctx);
  }

  return errorResponse(404, "NOT_FOUND", "The requested API endpoint does not exist.");
}

async function handleGenerateChart(request, url, env, ctx) {
  // Guard: only our own frontend may call this endpoint.
  const guard = await guardApiRequest(request, url, env);
  if (!guard.ok) {
    return errorResponse(guard.status, guard.code, guard.message);
  }

  // Collect query params into a plain object.
  const params = {};
  for (const [key, value] of url.searchParams.entries()) {
    params[key] = value;
  }

  // Validate before calling Divctor.
  const validation = validateChartParams(params);
  if (!validation.ok) {
    return errorResponse(400, "INVALID_DATA", validation.message);
  }

  // Try cache first.
  const cached = await getCachedChart(validation.params);
  if (cached.hit) {
    return svgResponse(cached.svg);
  }

  // Cache miss — call Divctor.
  const result = await generateChart(validation.params, env);
  if (!result.ok) {
    return errorResponse(result.status, result.error.code, result.error.message);
  }

  // Store in cache (fire-and-forget).
  await cacheChart(validation.params, result.svg, ctx);

  // Return SVG.
  return svgResponse(result.svg);
}
