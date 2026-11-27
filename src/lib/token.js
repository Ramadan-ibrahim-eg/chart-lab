// lib/token.js
// Responsibility: sign and verify short-lived tokens for API access.
// Stateless — no storage. Uses HMAC-SHA256 + base64url (URL-safe).

const TOKEN_TTL_MS = 60 * 60 * 1000; // 1 hour

// base64url helpers — replace +, /, and strip = so tokens are URL-safe.
function toBase64Url(str) {
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(str) {
  const pad = str.length % 4 === 0 ? "" : "=".repeat(4 - (str.length % 4));
  return atob(str.replace(/-/g, "+").replace(/_/g, "/") + pad);
}

export async function createToken(secret) {
  const timestamp = Date.now().toString();
  const signature = await hmacSign(timestamp, secret);
  return `${toBase64Url(timestamp)}.${toBase64Url(signature)}`;
}

export async function verifyToken(token, secret) {
  if (!token || typeof token !== "string") {
    return { ok: false, reason: "missing" };
  }

  const parts = token.split(".");
  if (parts.length !== 2) {
    return { ok: false, reason: "malformed" };
  }

  let timestamp, signature;
  try {
    timestamp = fromBase64Url(parts[0]);
    signature = fromBase64Url(parts[1]);
  } catch (_) {
    return { ok: false, reason: "malformed" };
  }

  const age = Date.now() - Number(timestamp);
  if (isNaN(age) || age < 0 || age > TOKEN_TTL_MS) {
    return { ok: false, reason: "expired" };
  }

  const expected = await hmacSign(timestamp, secret);
  if (!timingSafeEqual(signature, expected)) {
    return { ok: false, reason: "invalid" };
  }

  return { ok: true };
}

async function hmacSign(data, secret) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(data));
  return String.fromCharCode(...new Uint8Array(sig));
}

function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}
