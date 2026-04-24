import { buildFitExamples, buildMailtoHref, escapeHtml, resolveSecondaryAction } from './site-helpers.mjs';

const text = escapeHtml;
const attr = escapeHtml;

function externalLinkAttributes(isExternal) {
  return isExternal ? 'target="_blank" rel="noopener noreferrer"' : '';
}

export function renderSite(content) {
  const {
    brand,
    offer,
    cta,
    contact,
    images,
    sections
  } = content;

  const primaryHref = buildMailtoHref(contact.email, cta.primarySubject, cta.primaryBodyLines);
  const secondaryAction = resolveSecondaryAction(cta, contact, primaryHref);
  const secondaryAttrs = externalLinkAttributes(secondaryAction.isExternal);

  return `
    <a class="skip-link" href="#main-content">Skip to content</a>
    <div id="top"></div>
    <header class="site-header">
      <div class="section-inner header-inner">
        <a class="brand-mark" href="#top">
          <span class="brand-name">${text(brand.name)}</span>
          <span class="brand-label">${text(brand.label)}</span>
        </a>
        <nav class="site-nav" aria-label="Primary">
          ${brand.navigation
            .map((item) => `<a href="${attr(item.href)}">${text(item.label)}</a>`)
            .join('')}
        </nav>
        <a class="button button-small button-ghost" href="${attr(primaryHref)}">${text(cta.primaryLabel)}</a>
      </div>
    </header>

    <main id="main-content">
      <section class="hero-band">
        <div class="section-inner hero-layout">
          <div class="hero-copy reveal">
            <p class="eyebrow">Spreadsheet Rescue Sprint</p>
            <h1>${text(offer.headline)}</h1>
            <p class="lead">${text(offer.supportingText)}</p>
            <p class="proof-line">${text(offer.proofLine)}</p>

            <div class="hero-actions">
              <a class="button button-primary" href="${attr(primaryHref)}">
                <span>${text(cta.primaryLabel)}</span>
                <span aria-hidden="true">&rarr;</span>
              </a>
              <a
                class="button button-secondary"
                href="${attr(secondaryAction.href)}"
                ${secondaryAttrs}
              >
                <span>${text(secondaryAction.label)}</span>
              </a>
            </div>

            <ul class="hero-emphasis" aria-label="Offer highlights">
              ${offer.emphasis.map((item) => `<li>${text(item)}</li>`).join('')}
            </ul>

            <div class="hero-fit">
              <p>Typical rescue candidates</p>
              <ul>
                ${buildFitExamples(offer.fitExamples)}
              </ul>
            </div>
          </div>

          <figure class="hero-visual reveal">
            <div class="visual-shell">
              <div class="visual-topline">
                <span>Spreadsheet rescue view</span>
                <span>Illustrative mock data</span>
              </div>
              <img
                src="${attr(images.hero)}"
                alt="Stylized spreadsheet workflow cleanup view with highlighted status columns and automation cues."
                width="1600"
                height="1680"
                fetchpriority="high"
              />
            </div>
            <figcaption>
              Illustrative mock data. Fixed-scope entry sprint. Clean structure. Practical automation. Handoff included.
            </figcaption>
          </figure>
        </div>
      </section>

      <section id="problems" class="content-band">
        <div class="section-inner">
          <div class="section-head reveal">
            <p class="eyebrow">${text(sections.problems.eyebrow)}</p>
            <h2>${text(sections.problems.title)}</h2>
            <p>${text(sections.problems.intro)}</p>
          </div>
          <div class="split-list">
            ${sections.problems.items
              .map(
                (item) => `
                  <article class="list-item reveal">
                    <h3>${text(item.title)}</h3>
                    <p>${text(item.text)}</p>
                  </article>
                `
              )
              .join('')}
          </div>
        </div>
      </section>

      <section id="includes" class="content-band content-band-contrast">
        <div class="section-inner">
          <div class="section-head reveal">
            <p class="eyebrow">${text(sections.includes.eyebrow)}</p>
            <h2>${text(sections.includes.title)}</h2>
            <p>${text(sections.includes.intro)}</p>
          </div>
          <div class="detail-grid">
            ${sections.includes.items
              .map(
                (item) => `
                  <article class="detail-row reveal">
                    <h3>${text(item.title)}</h3>
                    <p>${text(item.text)}</p>
                  </article>
                `
              )
              .join('')}
          </div>
          <p class="section-note reveal">${text(sections.includes.note)}</p>
        </div>
      </section>

      <section id="process" class="content-band">
        <div class="section-inner">
          <div class="section-head reveal">
            <p class="eyebrow">${text(sections.process.eyebrow)}</p>
            <h2>${text(sections.process.title)}</h2>
          </div>
          <div class="process-grid">
            ${sections.process.steps
              .map(
                (step) => `
                  <article class="process-step reveal">
                    <p class="process-index">${text(step.step)}</p>
                    <h3>${text(step.title)}</h3>
                    <p>${text(step.text)}</p>
                  </article>
                `
              )
              .join('')}
          </div>
        </div>
      </section>

      <section id="audience" class="content-band content-band-contrast">
        <div class="section-inner audience-layout">
          <div class="section-head reveal">
            <p class="eyebrow">${text(sections.audience.eyebrow)}</p>
            <h2>${text(sections.audience.title)}</h2>
            <p>${text(sections.audience.intro)}</p>
          </div>
          <div class="audience-copy reveal">
            <ul class="bullet-list">
              ${sections.audience.profiles.map((profile) => `<li>${text(profile)}</li>`).join('')}
            </ul>
            <p class="section-note">${text(sections.audience.caution)}</p>
          </div>
        </div>
      </section>

      <section id="difference" class="content-band">
        <div class="section-inner">
          <div class="section-head reveal">
            <p class="eyebrow">${text(sections.difference.eyebrow)}</p>
            <h2>${text(sections.difference.title)}</h2>
          </div>
          <div class="comparison-table reveal">
            <div class="comparison-head">
              <p>${text(brand.name)}</p>
              <p>Generic spreadsheet help</p>
            </div>
            ${sections.difference.rows
              .map(
                (row) => `
                  <div class="comparison-row">
                    <p>${text(row.left)}</p>
                    <p>${text(row.right)}</p>
                  </div>
                `
              )
              .join('')}
          </div>
        </div>
      </section>

      <section id="offer" class="content-band content-band-accent">
        <div class="section-inner offer-layout">
          <div class="section-head reveal">
            <p class="eyebrow">${text(sections.offerCta.eyebrow)}</p>
            <h2>${text(sections.offerCta.title)}</h2>
            <p>${text(sections.offerCta.intro)}</p>
          </div>
          <div class="offer-copy reveal">
            <ul class="bullet-list">
              ${sections.offerCta.bullets.map((bullet) => `<li>${text(bullet)}</li>`).join('')}
            </ul>
            <p class="offer-pricing">${text(offer.entryPriceLabel ?? offer.pricingNote)}</p>
            <p class="section-note">${text(offer.scopeNote)}</p>
            <div class="hero-actions">
              <a class="button button-primary" href="${attr(primaryHref)}">
                <span>${text(cta.primaryLabel)}</span>
                <span aria-hidden="true">&rarr;</span>
              </a>
              <a
                class="button button-secondary"
                href="${attr(secondaryAction.href)}"
                ${secondaryAttrs}
              >
                <span>${text(secondaryAction.label)}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" class="content-band">
        <div class="section-inner contact-layout reveal">
          <div class="section-head">
            <p class="eyebrow">${text(sections.contact.eyebrow)}</p>
            <h2>${text(sections.contact.title)}</h2>
            <p>${text(sections.contact.intro)}</p>
          </div>
          <div class="contact-panel">
            ${
              contact.operatorName && contact.location
                ? `<p class="operator-line">${text(contact.operatorName)} · ${text(contact.location)}</p>`
                : ''
            }
            <a class="contact-link" href="${attr(primaryHref)}">${text(contact.emailLabel ?? contact.email)}</a>
            <p>${text(contact.note)}</p>
            <p class="response-time">${text(contact.responseTime)}</p>
          </div>
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <div class="section-inner footer-inner">
        <p>${text(brand.name)}</p>
        <p>One messy workflow. One sharp fix.</p>
      </div>
    </footer>
  `;
}

export function renderDocument(content) {
  const { meta } = content;

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${attr(meta.description)}" />
    <meta name="theme-color" content="#101217" />
    <meta property="og:title" content="${attr(meta.title)}" />
    <meta property="og:description" content="${attr(meta.description)}" />
    <meta property="og:image" content="${attr(meta.ogImage)}" />
    <title>${text(meta.title)}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <script>document.documentElement.classList.add('js');</script>
    <link
      href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:wght@400;500;600;700&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="./assets/css/styles.css" />
  </head>
  <body>
    <div class="site-chrome" aria-hidden="true"></div>
    <div id="app">${renderSite(content)}</div>
    <script type="module" src="./assets/js/app.mjs"></script>
  </body>
</html>
`;
}
