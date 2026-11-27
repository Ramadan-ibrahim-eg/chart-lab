// views/cookies.js
// Responsibility: render the /cookies page.

export function renderCookies() {
  return `
    <section class="page-content">
      <h1>Cookie Policy</h1>
      <p class="last-updated">Last updated: 2026-11-25</p>

      <h2>What are cookies?</h2>
      <p>
        Cookies are small text files that websites store in your browser. They
        are used to remember information between visits.
      </p>

      <h2>Does Chart Lab use cookies?</h2>
      <p>
        No. Chart Lab does not set any cookies — not for tracking, not for
        analytics, not for advertising.
      </p>

      <h2>What about local storage?</h2>
      <p>
        When you create a chart, the resulting SVG is temporarily stored in your
        browser's <code>sessionStorage</code> so it can be shown on the download
        page. This browser copy is cleared when you close the tab and is not
        sent anywhere. (The numbers you enter are sent to draw the chart. See the
        <a href="/privacy">privacy page</a>.)
      </p>

      <p>
        If you press the Dark mode or Light mode button in the header, your
        choice is saved in your browser's <code>localStorage</code> under the
        key <code>chart-lab-theme</code>. The value is only "dark" or "light".
        It stays on your device, is never sent to our servers, and you can
        remove it by clearing this site's data in your browser. Until you press
        the button, Chart Lab follows your device's light or dark setting.
      </p>

      <h2>Third-party cookies</h2>
      <p>
        Chart Lab does not load any third-party scripts that set cookies. If this
        changes in the future, this policy will be updated.
      </p>
    </section>
  `;
}
