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
            <div class="visual-shell rescue-visual">
              <div class="visual-topline">
                <span>72-hour rescue map</span>
                <span>One workflow</span>
              </div>
              <div class="rescue-flow" aria-label="Spreadsheet rescue workflow from brittle sheet to clean handoff">
                <div class="rescue-card rescue-card-before">
                  <p class="rescue-label">Before</p>
                  <h3>Brittle sheet</h3>
                  <ul>
                    <li>Manual follow-up</li>
                    <li>Hidden formula risk</li>
                    <li>No clear owner</li>
                  </ul>
                </div>
                <div class="rescue-arrow" aria-hidden="true">&rarr;</div>
                <div class="rescue-card rescue-card-after">
                  <p class="rescue-label">Sprint fix</p>
                  <h3>Cleaner workflow</h3>
                  <ul>
                    <li>Validated structure</li>
                    <li>Light automation</li>
                    <li>Handoff notes</li>
                  </ul>
                </div>
              </div>
              <div class="rescue-output">
                <p>What gets delivered</p>
                <div class="output-grid">
                  <span>Cleaned file</span>
                  <span>Automation pass</span>
                  <span>Owner handoff</span>
                  <span>One small revision</span>
                </div>
              </div>
            </div>
            <figcaption>
              A focused operating fix for one spreadsheet process, not generic spreadsheet help.
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
                ? `<p class="operator-line">${text(contact.operatorName)} | ${text(contact.location)}</p>`
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
  const canonicalUrl = meta.url ?? 'https://hardik-s.github.io/spreadsheet-rescue-sprint-site/';
  const ogImageUrl = meta.ogImage.startsWith('http')
    ? meta.ogImage
    : new URL(meta.ogImage, canonicalUrl).toString();
  const ogImageAltMeta = meta.ogImageAlt
    ? `    <meta property="og:image:alt" content="${attr(meta.ogImageAlt)}" />\n`
    : '';
  const ogImageWidthMeta = meta.ogImageWidth
    ? `    <meta property="og:image:width" content="${attr(meta.ogImageWidth)}" />\n`
    : '';
  const ogImageHeightMeta = meta.ogImageHeight
    ? `    <meta property="og:image:height" content="${attr(meta.ogImageHeight)}" />\n`
    : '';
  const twitterImageAltMeta = meta.ogImageAlt
    ? `    <meta name="twitter:image:alt" content="${attr(meta.ogImageAlt)}" />\n`
    : '';

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${attr(meta.description)}" />
    <meta name="theme-color" content="#101217" />
    <link rel="canonical" href="${attr(canonicalUrl)}" />
    <meta property="og:title" content="${attr(meta.title)}" />
    <meta property="og:description" content="${attr(meta.description)}" />
    <meta property="og:url" content="${attr(canonicalUrl)}" />
    <meta property="og:image" content="${attr(ogImageUrl)}" />
${ogImageAltMeta}${ogImageWidthMeta}${ogImageHeightMeta}    <meta property="og:site_name" content="${attr(meta.title)}" />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${attr(meta.title)}" />
    <meta name="twitter:description" content="${attr(meta.description)}" />
    <meta name="twitter:image" content="${attr(ogImageUrl)}" />
${twitterImageAltMeta}    <meta name="twitter:url" content="${attr(canonicalUrl)}" />
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
