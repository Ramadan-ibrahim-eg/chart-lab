// views/create.js
// Responsibility: render the /create page — the chart form + preview area.
// Page-specific content only. Layout is applied by the caller.

import { CHART_TYPES, CUSTOMIZE_OPTIONS } from "../content/strings.js";

export function renderCreate() {
  const typeOptions = CHART_TYPES.map(
    (t) => `
      <label class="type-option">
        <input type="radio" name="type" value="${t.value}" required>
        <span class="type-name">${t.label}</span>
        <span class="type-desc">${t.description}</span>
      </label>`
  ).join("");

  return `
    <section class="create-header">
      <h1>Create a chart</h1>
      <p>Fill in the fields below. All chart options are optional.</p>
    </section>

    <form id="chart-form" class="chart-form" novalidate>
      <fieldset class="form-section">
        <legend>1. Chart type</legend>
        <div class="type-grid">${typeOptions}</div>
      </fieldset>

      <fieldset class="form-section">
        <legend>2. Your data</legend>

        <div class="field">
          <label for="data">Data <span class="required">*</span></label>
          <input type="text" id="data" name="data" required
                 placeholder="10,20,30,40" autocomplete="off">
          <p class="hint" id="data-hint">Numbers separated by commas (max 100).</p>
        </div>

<div class="field" id="extra-data-fields" hidden>
  <label>Additional datasets <span class="optional">(optional)</span></label>
  <p class="hint">Use these for grouped or stacked charts. Each dataset must have the same number of values.</p>
  <input type="text" id="data2" name="data2" placeholder="Dataset 2: 30,40,35,50" autocomplete="off">
  <input type="text" id="data3" name="data3" placeholder="Dataset 3: 20,25,18,30" autocomplete="off">
  <input type="text" id="data4" name="data4" placeholder="Dataset 4: 15,20,25,30" autocomplete="off">
  <input type="text" id="data5" name="data5" placeholder="Dataset 5: 5,10,15,20" autocomplete="off">
</div>

        <div class="field" id="scatter-fields" hidden>
          <label for="scatter-data">Scatter points</label>
          <textarea id="scatter-data" name="scatterData" rows="4"
                    placeholder="1,10&#10;2,20&#10;3,15"></textarea>
          <p class="hint">One point per line, written as x,y (for example 2,20). Up to 100 points.</p>
        </div>

        <div class="field">
          <label for="labels">Labels <span class="optional">(optional)</span></label>
          <input type="text" id="labels" name="labels" placeholder="Q1,Q2,Q3,Q4" autocomplete="off">
          <p class="hint">Must match the number of data points.</p>
        </div>

        <div class="field">
          <label for="title">Title <span class="optional">(optional)</span></label>
          <input type="text" id="title" name="title" maxlength="120" autocomplete="off">
        </div>
      </fieldset>

      <details class="form-section customize">
        <summary>3. Customize (optional)</summary>
        <div class="customize-grid">
          ${CUSTOMIZE_OPTIONS.map((opt) => renderCustomizeField(opt)).join("")}
        </div>
      </details>

      <div class="form-actions">
        <button type="submit" class="btn btn-primary" id="generate-btn">Generate chart</button>
        <p class="form-error" id="form-error" role="alert" hidden></p>
      </div>
    </form>

    <section id="preview" class="preview" hidden>
      <h2>Preview</h2>
      <div class="preview-box" id="preview-box"></div>
      <div class="preview-actions">
        <a class="btn btn-secondary" id="download-svg" download="chart.svg">Download SVG</a>
        <a class="btn btn-secondary" id="download-png" href="/download">Download PNG</a>
        <button type="button" class="btn btn-secondary" id="copy-svg">Copy SVG code</button>
      </div>
    </section>
  `;
}

function renderCustomizeField(opt) {
  if (opt.type === "select") {
    const options = opt.options
      .map((o) => `<option value="${o.value}">${o.label}</option>`)
      .join("");
    return `
      <div class="field">
        <label for="${opt.name}">${opt.label}</label>
        <select id="${opt.name}" name="${opt.name}">${options}</select>
      </div>`;
  }
  if (opt.type === "range") {
    return `
      <div class="field">
        <label for="${opt.name}">${opt.label}: <output id="${opt.name}-out">${opt.default}</output></label>
        <input type="range" id="${opt.name}" name="${opt.name}"
               min="${opt.min}" max="${opt.max}" value="${opt.default}">
      </div>`;
  }
  if (opt.type === "checkbox") {
    return `
      <div class="field field-checkbox">
        <label>
          <input type="checkbox" id="${opt.name}" name="${opt.name}" ${opt.default ? "checked" : ""}>
          ${opt.label}
        </label>
      </div>`;
  }
  return "";
}
