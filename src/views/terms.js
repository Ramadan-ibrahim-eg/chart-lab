// views/terms.js
// Responsibility: render the /terms page.

export function renderTerms() {
  return `
    <section class="page-content">
      <h1>Terms of Use</h1>


      <h2>Acceptance</h2>
      <p>
        By using Chart Lab, you agree to these terms. If you do not agree, do not
        use the service.
      </p>

      <h2>What you can do</h2>
      <p>
        You can use Chart Lab to create charts for personal or commercial
        purposes. The charts you create are yours — you can use them anywhere,
        for any purpose.
      </p>

      <h2>What you cannot do</h2>
      <ul>
        <li>Use the service to create illegal or harmful content.</li>
        <li>Attempt to disrupt or overload the service.</li>
        <li>Resell or rebrand Chart Lab itself as your own product.</li>
      </ul>

      <h2>No warranty</h2>
      <p>
        Chart Lab is provided "as is", without any warranty. We do not guarantee
        that the service will be available at all times or that the charts will
        meet your specific needs.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        We are not liable for any damages resulting from the use of Chart Lab.
      </p>

      <h2>Changes</h2>
      <p>
        We may update these terms from time to time. Continued use of the service
        after changes means you accept the new terms.
      </p>
    </section>
  `;
}
