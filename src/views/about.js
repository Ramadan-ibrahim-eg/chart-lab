// views/about.js
// Responsibility: render the /about page.

import { SITE } from "../content/strings.js";

export function renderAbout() {
  return `
    <section class="page-content">
      <h1>About Chart Lab</h1>

      <p>
        Chart Lab is a free, no-signup chart generator. It turns raw numbers into
        clean, professional charts you can download as SVG or PNG.
      </p>

      <h2>Why we built it</h2>
      <p>
        Most chart tools require an account, save your charts, or limit what you
        can create. Chart Lab does none of that. You open the page, enter your
        numbers, and download your chart. That's it.
      </p>

      <h2>How it works</h2>
      <p>
        When you create a chart, your numbers and labels are sent to a chart
        service (Divctor) that draws it, and the image comes back to you. The
        PNG file is made in your browser. Chart Lab has no accounts and no
        database. See the <a href="/privacy">privacy page</a> for details.
      </p>

      <h2>Who is behind it</h2>
      <p>
        Chart Lab is an independent project. You can find the source code on
        <a href="${SITE.githubUrl}" rel="noopener">GitHub</a>.
      </p>
    </section>
  `;
}
