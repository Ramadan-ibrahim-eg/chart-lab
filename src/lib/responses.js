// lib/responses.js
// Responsibility: build Response objects with correct content types.
// No business logic, no routing.

export function htmlResponse(html, status = 200) {
  return new Response(html, {
    status,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=300",
    },
  });
}

export function textResponse(text, status = 200, contentType = "text/plain; charset=utf-8") {
  return new Response(text, {
    status,
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=3600",
    },
  });
}

export function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

export function xmlResponse(xml, status = 200) {
  return new Response(xml, {
    status,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

export function jsResponse(js, status = 200) {
  return new Response(js, {
    status,
    headers: {
      "Content-Type": "application/javascript; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

export function svgResponse(svg, status = 200) {
  return new Response(svg, {
    status,
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}

// Error responses use a consistent shape across the whole app.
// Shape matches the Divctor API error schema so the frontend can handle both.
export function errorResponse(status, code, message) {
  return jsonResponse(
    {
      error: message,
      code: code,
      docs: "https://www.chart-lab.workers.dev/about",
    },
    status
  );
}
