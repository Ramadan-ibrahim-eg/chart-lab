// public/theme-script.js
// Responsibility: light/dark theme. Follows the system setting until the
// visitor picks one with the header button; the choice is kept in localStorage.
// Served from /theme.js (loaded in <head> so the page never flashes light).

export const THEME_JS = `
(function () {
  "use strict";
  var KEY = "chart-lab-theme";
  var root = document.documentElement;
  var mq = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;

  function stored() {
    try {
      var v = localStorage.getItem(KEY);
      return v === "dark" || v === "light" ? v : null;
    } catch (_) { return null; }
  }
  function resolved() {
    return stored() || (mq && mq.matches ? "dark" : "light");
  }
  function apply(theme) {
    root.setAttribute("data-theme", theme);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "dark" ? "#0b1220" : "#116782");
    var btn = document.getElementById("theme-toggle");
    if (btn) {
      var dark = theme === "dark";
      btn.setAttribute("aria-pressed", dark ? "true" : "false");
      btn.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
      btn.textContent = dark ? "Light mode" : "Dark mode";
    }
  }

  apply(resolved());

  document.addEventListener("DOMContentLoaded", function () {
    apply(resolved());
    var btn = document.getElementById("theme-toggle");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      try { localStorage.setItem(KEY, next); } catch (_) {}
      apply(next);
    });
  });

  if (mq && mq.addEventListener) {
    mq.addEventListener("change", function () { if (!stored()) apply(resolved()); });
  }
})();
`;
