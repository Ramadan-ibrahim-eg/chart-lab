// lib/validate.js
// Responsibility: validate and normalize chart parameters.
// Returns { ok, params, message }. Never throws.

const VALID_TYPES = new Set([
  "bar", "line", "pie", "area", "stacked-bar", "donut", "scatter", "radar",
]);
const VALID_POINT_STYLES = new Set(["circle", "square", "star", "emoji", "none"]);
const VALID_BG_STYLES = new Set(["none", "dots", "grid", "snow"]);
const MAX_DATA_POINTS = 100;

export function validateChartParams(raw) {
  const type = raw.type;
  if (!type) {
    return fail("Chart type is required.");
  }
  if (!VALID_TYPES.has(type)) {
    return fail("Invalid chart type.");
  }

  const data = raw.data;
  if (!data) {
    return fail("Data is required.");
  }

  // Scatter charts accept JSON array; all others accept comma-separated numbers.
  if (type === "scatter") {
    const scatterCheck = validateScatterData(data);
    if (!scatterCheck.ok) return scatterCheck;
  } else {
    const numbersCheck = validateNumbers(data, MAX_DATA_POINTS);
    if (!numbersCheck.ok) return numbersCheck;
  }

  // data2–data5 are optional additional datasets (for grouped/stacked charts).
  const extraData = {};
  for (let i = 2; i <= 5; i++) {
    const key = "data" + i;
    const val = raw[key];
    if (val !== undefined && val !== "") {
      const check = validateNumbers(val, MAX_DATA_POINTS);
      if (!check.ok) return check;
      extraData[key] = val;
    }
  }

  // Labels (optional)
  let labels = undefined;
  if (raw.labels !== undefined && raw.labels !== "") {
    const labelsCheck = validateLabels(raw.labels);
    if (!labelsCheck.ok) return labelsCheck;
    labels = raw.labels;
  }

  // Numeric params
  const pointSize = parseBoundedInt(raw.pointSize, 2, 10);
  if (pointSize === null && raw.pointSize !== undefined) {
    return fail("Point size must be between 2 and 10.");
  }

  const lineWidth = parseBoundedInt(raw.lineWidth, 1, 5);
  if (lineWidth === null && raw.lineWidth !== undefined) {
    return fail("Line width must be between 1 and 5.");
  }

  const borderRadius = parseBoundedInt(raw.borderRadius, 0, 32);
  if (borderRadius === null && raw.borderRadius !== undefined) {
    return fail("Border radius must be between 0 and 32.");
  }

  // Enums
  if (raw.pointStyle && !VALID_POINT_STYLES.has(raw.pointStyle)) {
    return fail("Invalid point style.");
  }
  if (raw.bgStyle && !VALID_BG_STYLES.has(raw.bgStyle)) {
    return fail("Invalid background style.");
  }

  // Booleans
  const showValues = raw.showValues !== undefined ? raw.showValues === "true" : undefined;

  // Explicitly reject save (we don't support it).
  if (raw.save !== undefined) {
    return fail("Saving charts is not supported. Download the chart instead.");
  }

  // Build normalized params.
  const params = { type, data };
  if (labels !== undefined) params.labels = labels;
  if (raw.title) params.title = String(raw.title).slice(0, 120);
  for (const [key, value] of Object.entries(extraData)) {
    params[key] = value;
  }
  if (raw.pointStyle) params.pointStyle = raw.pointStyle;
  if (raw.pointEmoji) params.pointEmoji = String(raw.pointEmoji).slice(0, 8);
  if (pointSize !== null) params.pointSize = pointSize;
  if (lineWidth !== null) params.lineWidth = lineWidth;
  if (borderRadius !== null) params.borderRadius = borderRadius;
  if (raw.bgStyle) params.bgStyle = raw.bgStyle;
  if (showValues !== undefined) params.showValues = showValues;

  return { ok: true, params };
}

function fail(message) {
  return { ok: false, message };
}

function validateNumbers(raw, max) {
  const parts = String(raw).split(",").map((s) => s.trim()).filter(Boolean);
  if (parts.length === 0) return fail("Data cannot be empty.");
  if (parts.length > max) return fail(`Data cannot exceed ${max} values.`);
  for (const p of parts) {
    if (!/^-?\d+(\.\d+)?$/.test(p)) {
      return fail("Data must be numbers separated by commas.");
    }
  }
  return { ok: true };
}

function validateScatterData(raw) {
  let arr;
  try {
    arr = JSON.parse(raw);
  } catch (_) {
    return fail("Scatter data must be a JSON array of {x, y} objects.");
  }
  if (!Array.isArray(arr) || arr.length === 0) {
    return fail("Scatter data must be a non-empty array.");
  }
  if (arr.length > MAX_DATA_POINTS) {
    return fail(`Scatter data cannot exceed ${MAX_DATA_POINTS} points.`);
  }
  for (const p of arr) {
    if (typeof p !== "object" || p === null || typeof p.x !== "number" || typeof p.y !== "number") {
      return fail("Each scatter point must have numeric x and y.");
    }
  }
  return { ok: true };
}

function validateLabels(raw) {
  const parts = String(raw).split(",").map((s) => s.trim());
  if (parts.some((p) => p.length > 40)) {
    return fail("Each label must be 40 characters or fewer.");
  }
  return { ok: true };
}

function parseBoundedInt(raw, min, max) {
  if (raw === undefined || raw === "") return null;
  const n = Number(raw);
  if (!Number.isInteger(n) || n < min || n > max) return null;
  return n;
}
