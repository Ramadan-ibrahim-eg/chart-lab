// public/download-scripts.js
// Responsibility: load SVG from sessionStorage, render it, convert to PNG.
// Served from /download.js. Only loaded on /download.

export const DOWNLOAD_JS = `
(function () {
  "use strict";

  const previewBox = document.getElementById("download-preview");
  const pngBtn = document.getElementById("download-png-btn");
  const svgLink = document.getElementById("download-svg-link");
  const note = document.getElementById("download-note");

  if (!previewBox) return;

  const svg = (function () {
    try {
      return sessionStorage.getItem("chart-lab-svg");
    } catch (_) {
      return null;
    }
  })();

  if (!svg) {
    previewBox.innerHTML =
      '<p class="error-text">No chart found. <a href="/create">Create one first</a>.</p>';
    pngBtn.disabled = true;
    svgLink.style.display = "none";
    return;
  }

  // Render the SVG in the preview box.
  previewBox.innerHTML = svg;

  // Wire up the SVG download link.
  const svgBlob = new Blob([svg], { type: "image/svg+xml" });
  const svgUrl = URL.createObjectURL(svgBlob);
  svgLink.href = svgUrl;

  // Wire up the PNG download button.
  pngBtn.addEventListener("click", function () {
    convertToPng(svg, function (err, pngBlob) {
      if (err) {
        note.textContent =
          "PNG conversion failed. Please download the SVG instead.";
        note.classList.add("error-text");
        return;
      }
      const url = URL.createObjectURL(pngBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "chart.png";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  });

  /**
   * Replace foreignObject blocks with SVG text so the canvas is not blocked.
   * The wording and colors of the credit are kept (for example "created by DIVCTOR").
   */
  function flattenForCanvas(svgString) {
    try {
      const doc = new DOMParser().parseFromString(svgString, "image/svg+xml");
      if (doc.querySelector("parsererror")) return svgString;
      const fos = doc.querySelectorAll("foreignObject");
      if (!fos.length) return svgString;
      const NS = "http://www.w3.org/2000/svg";
      fos.forEach(function (fo) {
        const x = parseFloat(fo.getAttribute("x")) || 0;
        const y = parseFloat(fo.getAttribute("y")) || 0;
        const w = parseFloat(fo.getAttribute("width")) || 0;
        const h = parseFloat(fo.getAttribute("height")) || 0;
        const link = fo.querySelector("a");
        const brand = link ? link.textContent.trim() : "";
        const all = Array.from(fo.textContent).map(function (c) {
          return c.trim() === "" ? " " : c;
        }).join("").split(" ").filter(Boolean).join(" ");
        const lead = brand && all.endsWith(brand) ? all.slice(0, all.length - brand.length).trim() : all;
        const text = doc.createElementNS(NS, "text");
        text.setAttribute("x", String(x + w / 2));
        text.setAttribute("y", String(y + h / 2 + 4));
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("font-family", "system-ui, sans-serif");
        text.setAttribute("font-size", "12");
        const t1 = doc.createElementNS(NS, "tspan");
        t1.setAttribute("fill", "#94a3b8");
        t1.textContent = lead + (brand ? " " : "");
        text.appendChild(t1);
        if (brand) {
          const t2 = doc.createElementNS(NS, "tspan");
          t2.setAttribute("fill", "#38bdf8");
          t2.setAttribute("font-weight", "600");
          t2.setAttribute("font-size", "13");
          t2.textContent = brand;
          text.appendChild(t2);
        }
        fo.parentNode.replaceChild(text, fo);
      });
      return new XMLSerializer().serializeToString(doc.documentElement);
    } catch (_) {
      return svgString;
    }
  }

  /**
   * Convert an SVG string to a PNG Blob using Canvas.
   * Calls back with (err, blob).
   */
  function convertToPng(svgString, callback) {
    // Extract width/height from the SVG.
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgString, "image/svg+xml");
    const svgEl = doc.documentElement;
    const width = parseInt(svgEl.getAttribute("width"), 10) || 800;
    const height = parseInt(svgEl.getAttribute("height"), 10) || 500;

    // The returned SVG is used as-is for the SVG download. Only for the PNG,
    // the footer credit (an HTML foreignObject, which browsers refuse to draw
    // to a canvas) is redrawn as plain SVG text with the same wording.
    const blob = new Blob([flattenForCanvas(svgString)], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const img = new Image();

    img.onload = function () {
      try {
      const canvas = document.createElement("canvas");
      canvas.width = width * 2;   // 2x for sharper output
      canvas.height = height * 2;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);

      canvas.toBlob(function (pngBlob) {
        if (!pngBlob) {
          callback(new Error("toBlob returned null"));
          return;
        }
        callback(null, pngBlob);
      }, "image/png");
      } catch (e) {
        URL.revokeObjectURL(url);
        callback(e);
      }
    };

    img.onerror = function () {
      URL.revokeObjectURL(url);
      callback(new Error("Failed to load SVG"));
    };

    img.src = url;
  }
})();
`;
