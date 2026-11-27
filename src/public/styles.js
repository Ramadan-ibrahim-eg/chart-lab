// public/styles.js
// Responsibility: export CSS as a string.
// Served from /styles.css.

export const STYLES = `
/* --- Reset --- */
*, *::before, *::after { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
body {
  font-family: "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: #1f2937;
  background: #f8fafc;
}

/* --- Layout --- */
.container {
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  padding: 0 1rem;
}
main.container { padding-top: 2rem; padding-bottom: 2rem; }

/* --- Skip link (a11y) --- */
.skip-link {
  position: absolute;
  left: -999px;
  top: 0;
  background: #116782;
  color: #fff;
  padding: 0.5rem 1rem;
  z-index: 100;
}
.skip-link:focus { left: 0; }

/* --- Ad slots --- */
.ad-slot {
  background: #e5e7eb;
  border-top: 1px solid #d1d5db;
  border-bottom: 1px solid #d1d5db;
  text-align: center;
  padding: 0.5rem 1rem;
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.ad-label {
  font-size: 0.75rem;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* --- Header --- */
.site-header {
  background: #fff;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  z-index: 50;
}
.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}
.brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: #0f3c5c;
  font-weight: 700;
  font-size: 1.125rem;
}
.brand img { display: block; }
.site-nav { display: flex; gap: 1rem; flex-wrap: wrap; }
.site-nav a {
  color: #4b5563;
  text-decoration: none;
  font-size: 0.9375rem;
  padding: 0.25rem 0;
  border-bottom: 2px solid transparent;
}
.site-nav a:hover,
.site-nav a:focus-visible { color: #116782; border-bottom-color: #116782; }
.site-nav a[aria-current="page"] {
  color: #116782;
  border-bottom-color: #116782;
  font-weight: 600;
}

/* --- Footer --- */
.site-footer {
  background: #fff;
  border-top: 1px solid #e5e7eb;
  padding: 1.5rem 0;
  margin-top: 3rem;
  text-align: center;
  font-size: 0.875rem;
  color: #6b7280;
}
.footer-links a { color: #116782; text-decoration: none; }
.footer-links a:hover { text-decoration: underline; }
.footer-links a { display: inline-block; margin: 0.25rem 0.75rem; }
.footer-legal { margin: 0 0 0.5rem; }

/* --- Buttons --- */
.btn {
  display: inline-block;
  padding: 0.625rem 1.25rem;
  border-radius: 0.5rem;
  border: 1px solid transparent;
  font: inherit;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  transition: background 0.15s, border-color 0.15s;
}
.btn-primary { background: #116782; color: #fff; }
.btn-primary:hover,
.btn-primary:focus-visible { background: #0f3c5c; }
.btn-secondary { background: #fff; color: #116782; border-color: #116782; }
.btn-secondary:hover,
.btn-secondary:focus-visible { background: #e0f2f1; }
.btn-lg { padding: 0.875rem 1.75rem; font-size: 1.125rem; }
.btn:disabled { opacity: 0.6; cursor: not-allowed; }

/* --- Focus visible (a11y) --- */
:focus-visible { outline: 2px solid #116782; outline-offset: 2px; }

/* --- Landing: hero --- */
.landing-hero {
  text-align: center;
  padding: 3rem 1rem 2rem;
  max-width: 720px;
  margin: 0 auto;
}
.landing-hero h1 {
  margin: 0 0 1rem;
  font-size: 2.25rem;
  line-height: 1.2;
  color: #0f3c5c;
}
.landing-subtitle {
  margin: 0 0 1.5rem;
  font-size: 1.125rem;
  color: #4b5563;
}
.landing-note {
  margin: 1rem 0 0;
  font-size: 0.875rem;
  color: #6b7280;
}

/* --- Landing: sections --- */
.landing-section {
  padding: 2rem 0;
  border-top: 1px solid #e5e7eb;
}
.landing-section h2 {
  margin: 0 0 1.5rem;
  font-size: 1.5rem;
  color: #0f3c5c;
  text-align: center;
}

/* --- Landing: steps --- */
.steps {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
}
.step {
  text-align: center;
  padding: 1rem;
}
.step-num {
  display: inline-block;
  width: 2.5rem;
  height: 2.5rem;
  line-height: 2.5rem;
  border-radius: 50%;
  background: #116782;
  color: #fff;
  font-weight: 700;
  margin-bottom: 0.75rem;
}
.step h3 { margin: 0 0 0.5rem; font-size: 1.125rem; color: #1f2937; }
.step p { margin: 0; color: #4b5563; font-size: 0.9375rem; }

/* --- Landing: why --- */
.why-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
}
.why-item {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  padding: 1.25rem;
}
.why-item h3 { margin: 0 0 0.5rem; font-size: 1.0625rem; color: #116782; }
.why-item p { margin: 0; color: #4b5563; font-size: 0.9375rem; }

/* --- Landing: type cards --- */
.type-cards {
  list-style: none;
  padding: 0;
  margin: 0 0 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}
.type-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  padding: 1rem;
  text-align: center;
}
.type-card-name {
  display: block;
  font-weight: 700;
  color: #0f3c5c;
  margin-bottom: 0.25rem;
}
.type-card-desc { display: block; font-size: 0.875rem; color: #6b7280; }
.landing-cta { text-align: center; }

/* --- Landing: FAQ --- */
.faq { max-width: 720px; margin: 0 auto; }
.faq-item {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1rem 1.25rem;
  margin-bottom: 0.75rem;
}
.faq-item summary {
  cursor: pointer;
  font-weight: 600;
  color: #0f3c5c;
}
.faq-item p { margin: 0.75rem 0 0; color: #4b5563; }

/* --- Create page --- */
.create-header { text-align: center; margin-bottom: 2rem; }
.create-header h1 { margin: 0 0 0.5rem; color: #0f3c5c; }
.create-header p { margin: 0; color: #6b7280; }

.chart-form { max-width: 720px; margin: 0 auto 2rem; }
.form-section {
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  padding: 1.25rem;
  margin: 0 0 1.25rem;
  background: #fff;
}
.form-section legend {
  font-weight: 700;
  color: #0f3c5c;
  padding: 0 0.5rem;
}

/* --- Type grid --- */
.type-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 0.75rem;
}
.type-option {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s;
}
.type-option:hover { border-color: #116782; }
.type-option input { margin: 0 0 0.25rem; }
.type-option:has(input:checked) {
  border-color: #116782;
  background: #e0f2f1;
}
.type-name { font-weight: 600; color: #1f2937; }
.type-desc { font-size: 0.8125rem; color: #6b7280; }

/* --- Fields --- */
.field { margin-bottom: 1rem; }
.field label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: #1f2937;
}
.field input[type="text"],
.field textarea,
.field select {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font: inherit;
  background: #fff;
}
.field input:focus,
.field textarea:focus,
.field select:focus {
  border-color: #116782;
  outline: none;
  box-shadow: 0 0 0 3px rgba(17, 103, 130, 0.15);
}
.hint { margin: 0.25rem 0 0; font-size: 0.8125rem; color: #6b7280; }
.required { color: #dc2626; }
.optional { font-weight: 400; color: #6b7280; font-size: 0.875rem; }

/* --- Customize --- */
.customize summary {
  cursor: pointer;
  font-weight: 700;
  color: #0f3c5c;
  padding: 0.5rem 0;
}
.customize-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}
.field-checkbox label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 400;
}

/* --- Actions --- */
.form-actions { text-align: center; margin: 1.5rem 0; }
.form-error {
  color: #dc2626;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  margin: 1rem 0 0;
}

/* --- Preview --- */
.preview { margin: 2rem auto; max-width: 960px; }
.preview h2 { margin: 0 0 1rem; color: #0f3c5c; }
.preview-box {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  padding: 1rem;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-x: auto;
}
.preview-box svg { max-width: 100%; height: auto; }
.preview-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1rem;
  justify-content: center;
}

/* --- Download page --- */
.download-header { text-align: center; margin-bottom: 2rem; }
.download-header h1 { margin: 0 0 0.5rem; color: #0f3c5c; }
.download-header p { margin: 0; color: #6b7280; }

.download-preview {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin: 0 auto 1.5rem;
  max-width: 960px;
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-x: auto;
}
.download-preview svg { max-width: 100%; height: auto; }
.loading-text { color: #6b7280; }
.error-text { color: #dc2626; }

.download-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
  margin-bottom: 1.5rem;
}
.download-note {
  max-width: 720px;
  margin: 0 auto 0.75rem;
  font-size: 0.875rem;
  color: #6b7280;
  text-align: center;
}

/* --- Responsive --- */
@media (max-width: 640px) {
  .header-inner { flex-direction: column; align-items: flex-start; }
  .site-nav { width: 100%; }
  .type-grid { grid-template-columns: repeat(2, 1fr); }
  .customize-grid { grid-template-columns: 1fr; }
  .landing-hero h1 { font-size: 1.75rem; }
}
/* --- Page content (About, Privacy, Cookies, Terms) --- */
.page-content {
  max-width: 720px;
  margin: 0 auto;
  padding: 1rem 0 2rem;
}
.page-content h1 { margin: 0 0 1.5rem; color: #0f3c5c; font-size: 1.75rem; }
.page-content h2 {
  margin: 2rem 0 0.75rem;
  color: #116782;
  font-size: 1.25rem;
}
.page-content p { margin: 0 0 1rem; color: #4b5563; }
.page-content ul { margin: 0 0 1rem; padding-left: 1.5rem; color: #4b5563; }
.page-content li { margin-bottom: 0.25rem; }
.page-content a { color: #116782; text-decoration: underline; }
.page-content code {
  background: #f3f4f6;
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  font-size: 0.875em;
}
.last-updated { font-size: 0.875rem; color: #9ca3af; margin-bottom: 1.5rem; }

/* --- Theme toggle --- */
.theme-toggle {
  font: inherit;
  font-size: 0.875rem;
  color: #116782;
  background: transparent;
  border: 1px solid #116782;
  border-radius: 999px;
  padding: 0.2rem 0.75rem;
  cursor: pointer;
}
.theme-toggle:hover,
.theme-toggle:focus-visible { background: #e0f2f1; }

/* --- Dark theme --- */
html[data-theme="dark"] { color-scheme: dark; }
html[data-theme="dark"] body { color: #e5e7eb; background: #0b1220; }
html[data-theme="dark"] .ad-slot { background: #111827; border-color: #1f2937; }
html[data-theme="dark"] .ad-label { color: #9ca3af; }
html[data-theme="dark"] .site-header,
html[data-theme="dark"] .site-footer { background: #111827; border-color: #1f2937; }
html[data-theme="dark"] .site-footer { color: #9ca3af; }
html[data-theme="dark"] .brand { color: #e5e7eb; }
html[data-theme="dark"] .site-nav a { color: #cbd5e1; }
html[data-theme="dark"] .site-nav a:hover,
html[data-theme="dark"] .site-nav a:focus-visible,
html[data-theme="dark"] .site-nav a[aria-current="page"] { color: #5eead4; border-bottom-color: #5eead4; }
html[data-theme="dark"] .footer-links a,
html[data-theme="dark"] .page-content a { color: #5eead4; }
html[data-theme="dark"] .theme-toggle { color: #5eead4; border-color: #5eead4; }
html[data-theme="dark"] .theme-toggle:hover,
html[data-theme="dark"] .theme-toggle:focus-visible { background: #134e4a; }
html[data-theme="dark"] :focus-visible { outline-color: #5eead4; }
html[data-theme="dark"] .btn-primary { background: #0e7490; color: #fff; }
html[data-theme="dark"] .btn-primary:hover,
html[data-theme="dark"] .btn-primary:focus-visible { background: #0891b2; }
html[data-theme="dark"] .btn-secondary { background: transparent; color: #5eead4; border-color: #5eead4; }
html[data-theme="dark"] .btn-secondary:hover,
html[data-theme="dark"] .btn-secondary:focus-visible { background: #134e4a; }
html[data-theme="dark"] .landing-hero h1,
html[data-theme="dark"] .landing-section h2,
html[data-theme="dark"] .type-card-name,
html[data-theme="dark"] .faq-item summary,
html[data-theme="dark"] .create-header h1,
html[data-theme="dark"] .form-section legend,
html[data-theme="dark"] .customize summary,
html[data-theme="dark"] .preview h2,
html[data-theme="dark"] .download-header h1,
html[data-theme="dark"] .page-content h1 { color: #f1f5f9; }
html[data-theme="dark"] .landing-subtitle,
html[data-theme="dark"] .step p,
html[data-theme="dark"] .why-item p,
html[data-theme="dark"] .faq-item p,
html[data-theme="dark"] .page-content p,
html[data-theme="dark"] .page-content ul { color: #cbd5e1; }
html[data-theme="dark"] .landing-note,
html[data-theme="dark"] .type-card-desc,
html[data-theme="dark"] .type-desc,
html[data-theme="dark"] .hint,
html[data-theme="dark"] .optional,
html[data-theme="dark"] .create-header p,
html[data-theme="dark"] .download-header p,
html[data-theme="dark"] .download-note,
html[data-theme="dark"] .loading-text,
html[data-theme="dark"] .last-updated { color: #94a3b8; }
html[data-theme="dark"] .landing-section { border-top-color: #1f2937; }
html[data-theme="dark"] .step h3,
html[data-theme="dark"] .type-name,
html[data-theme="dark"] .field label { color: #e5e7eb; }
html[data-theme="dark"] .step-num { background: #0e7490; }
html[data-theme="dark"] .why-item h3,
html[data-theme="dark"] .page-content h2 { color: #5eead4; }
html[data-theme="dark"] .why-item,
html[data-theme="dark"] .type-card,
html[data-theme="dark"] .faq-item,
html[data-theme="dark"] .form-section,
html[data-theme="dark"] .preview-box,
html[data-theme="dark"] .download-preview { background: #111827; border-color: #1f2937; }
html[data-theme="dark"] .type-option { border-color: #374151; }
html[data-theme="dark"] .type-option:hover { border-color: #5eead4; }
html[data-theme="dark"] .type-option:has(input:checked) { border-color: #5eead4; background: #134e4a; }
html[data-theme="dark"] .field input[type="text"],
html[data-theme="dark"] .field textarea,
html[data-theme="dark"] .field select { background: #0b1220; color: #e5e7eb; border-color: #374151; }
html[data-theme="dark"] .field input[type="text"]::placeholder,
html[data-theme="dark"] .field textarea::placeholder { color: #64748b; }
html[data-theme="dark"] .field input:focus,
html[data-theme="dark"] .field textarea:focus,
html[data-theme="dark"] .field select:focus { border-color: #5eead4; box-shadow: 0 0 0 3px rgba(94, 234, 212, 0.2); }
html[data-theme="dark"] .required,
html[data-theme="dark"] .error-text { color: #f87171; }
html[data-theme="dark"] .form-error { color: #fecaca; background: #450a0a; border-color: #7f1d1d; }
html[data-theme="dark"] .page-content code { background: #1f2937; color: #e5e7eb; }
html[data-theme="dark"] .brand img { box-sizing: content-box; background: #f1f5f9; border-radius: 8px; padding: 3px; }
@media (max-width: 640px) {
  .ad-slot { min-height: 36px; padding: 0.25rem 1rem; }
  .site-footer { margin-top: 2rem; }
}
`;
