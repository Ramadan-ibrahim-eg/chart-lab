// views/privacy.js
// Responsibility: render the /privacy page.

import { SITE } from "../content/strings.js";

export function renderPrivacy() {
  return `
    <section class="page-content">
      <h1>Privacy Policy</h1>
      <p class="last-updated">Last updated: 2026-11-25</p>

      <h2>What we collect</h2>
      <p>
        Chart Lab does not require an account and does not use cookies for
        tracking. It has no database and does not save your charts or build a
        profile of you.
      </p>

      <h2>Your chart data</h2>
      <p>
        The numbers, labels and title you enter are sent to our server and then
        to a chart service (Divctor) that draws the chart. The finished chart is
        cached for up to one hour so that repeat requests are fast. The image
        is returned to your browser.
      </p>
      <p>
        Until 25 November 2026, Chart Lab's server kept request logs that
        included the full request address, which contains the numbers, labels
        and title. Chart Lab no longer keeps persisted request logs. Older log
        entries are not deleted by that change and expire under Cloudflare's own
        retention rules. The services we rely on (Cloudflare and Divctor) may
        keep their own technical records under their own policies.
      </p>

      <h2>Cookies</h2>
      <p>
        Chart Lab does not use cookies. See our
        <a href="/cookies">cookie policy</a> for details.
      </p>

      <h2>Third-party services</h2>
      <p>
        We use the Divctor chart service to generate images. It receives only the
        chart settings you provide (type, numbers, labels, title and style
        options), not any personal information.
      </p>

      <h2>Your rights</h2>
      <p>
        Chart Lab has no account or profile for you, so there is nothing to
        access, correct or delete on that side. If you have questions, contact
        us via <a href="${SITE.githubUrl}" rel="noopener">GitHub</a>.
      </p>
    </section>
  `;
}
