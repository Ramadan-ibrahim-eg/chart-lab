// views/landing.js
// Responsibility: render the landing page — hero, how it works, why, chart types, FAQ.
// Page-specific content only. Layout is applied by the caller.

import { SITE, LANDING } from "../content/strings.js";

export function renderLanding() {
  const howItWorks = LANDING.howItWorks
    .map(
      (step, i) => `
        <li class="step">
          <span class="step-num">${i + 1}</span>
          <h3>${step.title}</h3>
          <p>${step.description}</p>
        </li>`
    )
    .join("");

  const why = LANDING.why
    .map(
      (item) => `
        <li class="why-item">
          <h3>${item.title}</h3>
          <p>${item.description}</p>
        </li>`
    )
    .join("");

  const types = LANDING.chartTypes
    .map(
      (t) => `
        <li class="type-card">
          <span class="type-card-name">${t.label}</span>
          <span class="type-card-desc">${t.description}</span>
        </li>`
    )
    .join("");

  const faq = LANDING.faq
    .map(
      (item) => `
        <details class="faq-item">
          <summary>${item.question}</summary>
          <p>${item.answer}</p>
        </details>`
    )
    .join("");

  return `
    <section class="landing-hero">
      <h1>${LANDING.hero.title}</h1>
      <p class="landing-subtitle">${LANDING.hero.subtitle}</p>
      <a class="btn btn-primary btn-lg" href="/create">Create a chart</a>
      <p class="landing-note">${LANDING.hero.note}</p>
    </section>

    <section class="landing-section">
      <h2>How it works</h2>
      <ol class="steps">${howItWorks}</ol>
    </section>

    <section class="landing-section">
      <h2>Why Chart Lab</h2>
      <ul class="why-list">${why}</ul>
    </section>

    <section class="landing-section">
      <h2>8 chart types</h2>
      <ul class="type-cards">${types}</ul>
      <p class="landing-cta">
        <a class="btn btn-primary" href="/create">Create a chart</a>
      </p>
    </section>

    <section class="landing-section">
      <h2>Frequently asked questions</h2>
      <div class="faq">${faq}</div>
    </section>
  `;
}

/**
 * FAQPage JSON-LD for the landing page.
 * Helps search engines and AI crawlers understand the FAQ.
 */
export function landingJsonLd() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: SITE.name,
      url: SITE.url,
      description: SITE.description,
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: LANDING.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ];
}
