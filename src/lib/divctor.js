// lib/divctor.js
// Responsibility: talk to the Divctor API. Build the request, send it,
// interpret the response, and return a normalized result.
// No routing, no response formatting, no validation.

const DEFAULT_BASE_URL = "https://api.divct.workers.dev";
const TIMEOUT_MS = 15000;

/**
 * Generate a chart via the Divctor API.
 *
 * @param {object} params - Query parameters for /chart (type, data, labels, ...)
 * @param {object} env - Worker environment (contains DIVCTOR_API_KEY)
 * @returns {Promise<{ok: boolean, svg?: string, error?: {code: string, message: string}, status: number}>}
 */
export async function generateChart(params, env) {
  const baseUrl = env.DIVCTOR_BASE_URL || DEFAULT_BASE_URL;
  const apiKey = env.DIVCTOR_API_KEY;

  if (!apiKey) {
    return {
      ok: false,
      status: 500,
      error: {
        code: "INTERNAL_ERROR",
        message: "Chart service is not configured. Please try again later.",
      },
    };
  }

  const url = new URL("/chart", baseUrl);
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

  let response;
  try {
    response = await fetch(url.toString(), {
      method: "GET",
      signal: controller.signal,
      headers: { Accept: "image/svg+xml", Authorization: "Bearer " + apiKey },
    });
  } catch (err) {
    clearTimeout(timeoutId);
    if (err.name === "AbortError") {
      return {
        ok: false,
        status: 504,
        error: {
          code: "SERVICE_UNAVAILABLE",
          message: "The chart service took too long to respond. Please try again.",
        },
      };
    }
    return {
      ok: false,
      status: 502,
      error: {
        code: "SERVICE_UNAVAILABLE",
        message: "Could not reach the chart service. Please try again.",
      },
    };
  }
  clearTimeout(timeoutId);

  if (response.ok) {
    const svg = await response.text();
    return { ok: true, status: 200, svg };
  }

  // Divctor returns JSON errors. Try to read them, fall back to generic.
  let errorBody = null;
  try {
    errorBody = await response.json();
  } catch (_) {
    // ignore — not JSON
  }

  return {
    ok: false,
    status: response.status,
    error: {
      code: errorBody?.code || mapStatusToCode(response.status),
      message: errorBody?.error || "The chart service returned an error. Please try again.",
    },
  };
}

function mapStatusToCode(status) {
  switch (status) {
    case 400: return "INVALID_DATA";
    case 401: return "UNAUTHORIZED";
    case 403: return "FORBIDDEN";
    case 429: return "RATE_LIMITED";
    default:  return "SERVICE_UNAVAILABLE";
  }
}
