// views/download.js
// Responsibility: render the /download page — large preview + download buttons.
// Page-specific content only. Layout is applied by the caller.

export function renderDownload() {
  return `
    <section class="download-header">
      <h1>Your chart is ready</h1>
      <p>Download it as PNG or SVG. The PNG is generated in your browser.</p>
    </section>

    <div class="download-preview" id="download-preview">
      <p class="loading-text">Loading chart…</p>
    </div>

    <div class="download-actions">
      <button type="button" class="btn btn-primary" id="download-png-btn">Download PNG</button>
      <a class="btn btn-secondary" id="download-svg-link" download="chart.svg">Download SVG</a>
      <a class="btn btn-secondary" href="/create">Back to Chart Lab</a>
    </div>

    <p class="download-note" id="download-note">
      PNG is generated in your browser. If it fails, download SVG instead.
    </p>

    <p class="download-note">
      Note: SVG files may be blocked by some email clients for security reasons.
      Use PNG if you plan to embed the chart in an email.
    </p>
  `;
}
