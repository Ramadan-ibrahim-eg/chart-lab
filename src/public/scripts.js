// public/scripts.js
// Responsibility: export the client-side JavaScript for the /create page as a string.
// Served from /app.js. Only loaded on /create (not on the landing page).
// No inline scripts allowed (CSP).

export const APP_JS = `
(function () {
  "use strict";

  const form = document.getElementById("chart-form");
  if (!form) return;

  // Read the signed token from <meta> (set by layout.js on /create).
  const tokenMeta = document.querySelector('meta[name="chart-lab-token"]');
  const token = tokenMeta ? tokenMeta.getAttribute("content") : "";

  const generateBtn = document.getElementById("generate-btn");
  const formError = document.getElementById("form-error");
  const preview = document.getElementById("preview");
  const previewBox = document.getElementById("preview-box");
  const downloadSvg = document.getElementById("download-svg");
  const copySvg = document.getElementById("copy-svg");

  const dataInput = document.getElementById("data");
  const scatterFields = document.getElementById("scatter-fields");
  const scatterData = document.getElementById("scatter-data");

const MULTI_DATASET_TYPES = ["stacked-bar", "bar", "line", "area"];
const extraDataFields = document.getElementById("extra-data-fields");

form.addEventListener("change", function (e) {
  if (e.target.name === "type") {
    const selectedType = e.target.value;
    const isScatter = selectedType === "scatter";
    scatterFields.hidden = !isScatter;
    dataInput.closest(".field").hidden = isScatter;

    const showExtra = MULTI_DATASET_TYPES.includes(selectedType);
    if (extraDataFields) {
      extraDataFields.hidden = !showExtra;
    }
  }
});

  // Live output for range inputs.
  form.querySelectorAll('input[type="range"]').forEach(function (input) {
    const out = document.getElementById(input.name + "-out");
    if (out) {
      input.addEventListener("input", function () {
        out.textContent = input.value;
      });
    }
  });

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    clearError();

    const formData = new FormData(form);
    const type = formData.get("type");
    if (!type) {
      return showError("Please choose a chart type.");
    }

    const params = new URLSearchParams();
    params.set("type", type);
// Additional datasets (data2–data5).
for (let i = 2; i <= 5; i++) {
  const key = "data" + i;
  const val = formData.get(key);
  if (val && val.trim()) {
    params.set(key, val.trim());
  }
}
    if (type === "scatter") {
      const raw = scatterData.value.trim();
      if (!raw) return showError("Please enter scatter data.");
      const points = parseScatter(raw);
      if (!points) {
        return showError("Scatter points: write one point per line as x,y, for example 2,20.");
      }
      params.set("data", points);
    } else {
      const raw = dataInput.value.trim();
      if (!raw) return showError("Please enter some data.");
      params.set("data", raw);
    }

    const labels = formData.get("labels");
    if (labels) params.set("labels", labels);
    const title = formData.get("title");
    if (title) params.set("title", title);

    // Customize options.
    const pointStyle = formData.get("pointStyle");
    if (pointStyle) params.set("pointStyle", pointStyle);
    const pointSize = formData.get("pointSize");
    if (pointSize) params.set("pointSize", pointSize);
    const lineWidth = formData.get("lineWidth");
    if (lineWidth) params.set("lineWidth", lineWidth);
    const borderRadius = formData.get("borderRadius");
    if (borderRadius) params.set("borderRadius", borderRadius);
    const bgStyle = formData.get("bgStyle");
    if (bgStyle) params.set("bgStyle", bgStyle);
    const showValues = formData.get("showValues");
    if (showValues !== null) params.set("showValues", showValues ? "true" : "false");

    params.set("_t", token);

    setLoading(true);
    try {
      const res = await fetch("/api/chart?" + params.toString(), {
        headers: { "Origin": window.location.origin },
      });
      if (!res.ok) {
        const body = await res.json().catch(function () { return {}; });
        throw new Error(body.error || "Could not generate chart.");
      }
      const svg = await res.text();
      renderPreview(svg);
    } catch (err) {
      showError(err.message || "Could not generate chart.");
    } finally {
      setLoading(false);
    }
  });

  // Accepts "x,y" lines (easy form) or a JSON array (still supported).
  function parseScatter(raw) {
    if (raw.charAt(0) === "[") {
      try {
        const arr = JSON.parse(raw);
        return Array.isArray(arr) ? JSON.stringify(arr) : null;
      } catch (_) {
        return null;
      }
    }
    const NL = String.fromCharCode(10);
    const points = [];
    const lines = raw.split(NL);
    for (let i = 0; i < lines.length; i++) {
      const parts = lines[i].split(",").join(" ").split(";").join(" ").split(" ").filter(Boolean);
      if (parts.length === 0) continue;
      if (parts.length !== 2) return null;
      const x = Number(parts[0]);
      const y = Number(parts[1]);
      if (!isFinite(x) || !isFinite(y)) return null;
      points.push({ x: x, y: y });
    }
    return points.length ? JSON.stringify(points) : null;
  }

  function renderPreview(svg) {
    previewBox.innerHTML = svg;
    preview.hidden = false;

    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);

    downloadSvg.href = url;
    downloadSvg.download = "chart.svg";

    // Store for /download page.
    try {
      sessionStorage.setItem("chart-lab-svg", svg);
    } catch (_) {
      /* storage may be full or blocked */
    }

    preview.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  copySvg.addEventListener("click", async function () {
    const svg = previewBox.querySelector("svg");
    if (!svg) return;
    try {
      await navigator.clipboard.writeText(svg.outerHTML);
      copySvg.textContent = "Copied!";
      setTimeout(function () {
        copySvg.textContent = "Copy SVG code";
      }, 1500);
    } catch (_) {
      showError("Could not copy. Please select the SVG manually.");
    }
  });

  function setLoading(loading) {
    generateBtn.disabled = loading;
    generateBtn.textContent = loading ? "Generating…" : "Generate chart";
  }

  function showError(message) {
    formError.textContent = message;
    formError.hidden = false;
  }

  function clearError() {
    formError.textContent = "";
    formError.hidden = true;
  }
})();
`;
